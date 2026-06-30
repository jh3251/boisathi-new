/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';
import { BookListing, UserProfile, Conversation, ChatMessage } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

const mapUser = async (user: any): Promise<UserProfile & { emailVerified: boolean }> => {
  let username = "";
  let displayName = user.user_metadata?.displayName || 'Anonymous';
  let photoURL = user.user_metadata?.photoURL;
  try {
    const { data, error } = await supabase.from('users').select('*').eq('uid', user.id).single();
    if (data) {
      username = data.username || "";
      displayName = data.displayName || displayName;
      photoURL = data.photoURL || photoURL;
    } else if (error && error.code === 'PGRST116') {
      // User not found in public.users, let's create them to prevent foreign key errors
      const { error: upsertError } = await supabase.from('users').upsert({
        uid: user.id,
        displayName,
        email: user.email || '',
        photoURL,
        createdAt: new Date(user.created_at).getTime()
      });
      if (upsertError) {
        console.error("Failed to upsert user:", upsertError);
      }
    }
  } catch (e) {}

  return {
    uid: user.id,
    displayName,
    username,
    email: user.email || '',
    photoURL,
    emailVerified: !!user.email_confirmed_at,
    createdAt: new Date(user.created_at).getTime()
  };
};

export const api = {
  auth: {
    onAuthStateChanged: (callback: (user: UserProfile | null) => void) => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        callback(session?.user ? await mapUser(session.user) : null);
      });
      supabase.auth.getUser().then(async ({ data: { user } }) => {
        callback(user ? await mapUser(user) : null);
      });
      return () => subscription.unsubscribe();
    },
    reloadUser: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user ? await mapUser(user) : null;
    },
    signIn: async (email: string, pass: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pass });
      if (error) throw error;
      return await mapUser(data.user);
    },
    signUp: async (email: string, pass: string, name: string) => {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: pass,
        options: {
          data: { displayName: name.trim() }
        }
      });
      if (error) throw error;
      
      const user = data.user;
      if (user) {
        const userProfile = { 
           uid: user.id, 
           displayName: name.trim(), 
           email: email.trim(), 
           createdAt: Date.now(), 
           username: "" 
        };
        await supabase.from('users').insert(userProfile);
        return await mapUser(user);
      }
      throw new Error("Signup failed");
    },
    updateProfile: async (displayName: string, photoURL?: string, username?: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");
      
      await supabase.auth.updateUser({
        data: { displayName, photoURL }
      });
      
      await supabase.from('users').upsert({
        uid: user.id,
        displayName,
        photoURL,
        username,
        email: user.email,
        createdAt: new Date(user.created_at).getTime()
      });
    },
    resetPassword: async (email: string) => {
       const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
         redirectTo: window.location.origin + '/reset-password',
       });
       if (error) throw error;
    },
    confirmPasswordReset: async (code: string, newPass: string) => {
       const { error } = await supabase.auth.updateUser({ password: newPass });
       if (error) throw error;
    },
    verifyPasswordResetCode: async (code: string) => {
       return code;
    },
    signOut: async () => {
      await supabase.auth.signOut();
    },
    deleteAccount: async () => {
      await supabase.auth.signOut();
    }
  },

  db: {
    subscribeToListings: (callback: (listings: BookListing[]) => void) => {
      const fetchListings = async () => {
        const { data } = await supabase.from('bookListings').select('*').order('createdAt', { ascending: false });
        callback((data || []) as BookListing[]);
      };
      
      fetchListings();
      
      const channel = supabase.channel('public:bookListings')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'bookListings' }, fetchListings)
        .subscribe();
        
      return () => { supabase.removeChannel(channel); };
    },
    uploadBookImage: async (fileOrBlob: File | Blob): Promise<{ secure_url: string, delete_token?: string }> => {
      const formData = new FormData();
      formData.append("file", fileOrBlob);
      const response = await fetch(`/api/upload`, { method: "POST", body: formData });
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        throw new Error(`Server returned invalid response (Status ${response.status})`);
      }
      
      if (!response.ok) {
        throw new Error(data?.error || 'Upload failed');
      }
      return { secure_url: data.secure_url, delete_token: data.delete_token };
    },
    deleteImageByToken: async (deleteToken: string) => {
      try {
        await fetch(`/api/upload/${deleteToken}`, { method: "DELETE" });
      } catch (e) {}
    },
    compressImage: async (file: File): Promise<Blob> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            if (width > 1200) { height *= 1200 / width; width = 1200; }
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Compression failed')), 'image/jpeg', 0.8);
          };
        };
      });
    },
    addListing: async (listing: Omit<BookListing, 'id' | 'createdAt'>) => {
      // Ensure user exists in public.users before inserting
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error: findErr } = await supabase.from('users').select('uid').eq('uid', user.id).single();
          if (findErr && findErr.code === 'PGRST116') {
             await supabase.from('users').upsert({
                uid: user.id,
                displayName: user.user_metadata?.displayName || 'Anonymous',
                email: user.email || '',
                photoURL: user.user_metadata?.photoURL,
                createdAt: new Date(user.created_at).getTime()
             });
          }
        }
      } catch (e) {}

      const newListing = { ...listing, createdAt: Date.now() };
      const { data, error } = await supabase.from('bookListings').insert(newListing).select().single();
      if (error) throw error;
      return data as BookListing;
    },
    updateListing: async (id: string, data: Partial<BookListing>) => {
      const { error } = await supabase.from('bookListings').update(data).eq('id', id);
      if (error) throw error;
    },
    deleteListing: async (id: string) => {
      const { error } = await supabase.from('bookListings').delete().eq('id', id);
      if (error) throw error;
    },
    getListingById: async (id: string) => {
      const { data } = await supabase.from('bookListings').select('*').eq('id', id).single();
      return data as BookListing | null;
    },
    getUserById: async (uid: string) => {
      const { data } = await supabase.from('users').select('*').eq('uid', uid).single();
      return data as UserProfile | undefined;
    },
    getListings: async () => {
      const { data } = await supabase.from('bookListings').select('*').order('createdAt', { ascending: false });
      return (data || []) as BookListing[];
    },
    getUserListings: async (uid: string) => {
      const { data } = await supabase.from('bookListings').select('*').eq('sellerId', uid).order('createdAt', { ascending: false });
      return (data || []) as BookListing[];
    },
    createOrGetConversation: async (book: BookListing, buyer: UserProfile): Promise<string> => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.id === buyer.uid) {
          const { error: findErr } = await supabase.from('users').select('uid').eq('uid', user.id).single();
          if (findErr && findErr.code === 'PGRST116') {
             await supabase.from('users').upsert({
                uid: user.id,
                displayName: user.user_metadata?.displayName || 'Anonymous',
                email: user.email || '',
                photoURL: user.user_metadata?.photoURL,
                createdAt: new Date(user.created_at).getTime()
             });
          }
        }
      } catch (e) {}

      const participants = [buyer.uid, book.sellerId].sort();
      const conversationId = `${book.id}_${participants.join('_')}`;
      
      const { data: existing } = await supabase.from('conversations').select('*').eq('id', conversationId).single();
      
      if (!existing) {
        await supabase.from('conversations').insert({
          id: conversationId,
          bookId: book.id,
          bookTitle: book.title,
          bookImageUrl: book.imageUrl,
          participants,
          participantNames: { [buyer.uid]: buyer.displayName, [book.sellerId]: book.sellerName },
          updatedAt: Date.now()
        });
      }
      return conversationId;
    },
    subscribeToConversations: (userId: string, callback: (conversations: Conversation[]) => void) => {
      const fetchConvs = async () => {
        const { data } = await supabase.from('conversations').select('*').contains('participants', [userId]);
        callback((data || []) as Conversation[]);
      };
      
      fetchConvs();
      
      const channel = supabase.channel(`public:conversations:${userId}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, fetchConvs)
        .subscribe();
        
      return () => { supabase.removeChannel(channel); };
    },
    subscribeToMessages: (conversationId: string, callback: (messages: ChatMessage[]) => void) => {
      const fetchMsgs = async () => {
        const { data } = await supabase.from('messages').select('*').eq('conversationId', conversationId).order('createdAt', { ascending: true });
        callback((data || []) as ChatMessage[]);
      };
      
      fetchMsgs();
      
      const channel = supabase.channel(`public:messages:${conversationId}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'messages', filter: `conversationId=eq.${conversationId}` }, fetchMsgs)
        .subscribe();
        
      return () => { supabase.removeChannel(channel); };
    },
    sendMessage: async (conversationId: string, senderId: string, text: string) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.id === senderId) {
          const { error: findErr } = await supabase.from('users').select('uid').eq('uid', user.id).single();
          if (findErr && findErr.code === 'PGRST116') {
             await supabase.from('users').upsert({
                uid: user.id,
                displayName: user.user_metadata?.displayName || 'Anonymous',
                email: user.email || '',
                photoURL: user.user_metadata?.photoURL,
                createdAt: new Date(user.created_at).getTime()
             });
          }
        }
      } catch (e) {}

      await supabase.from('messages').insert({ conversationId, senderId, text, createdAt: Date.now() });
      await supabase.from('conversations').update({ lastMessage: text, updatedAt: Date.now() }).eq('id', conversationId);
    },
    getConversationById: async (id: string): Promise<Conversation | null> => {
      const { data } = await supabase.from('conversations').select('*').eq('id', id).single();
      return data as Conversation | null;
    }
  }
};