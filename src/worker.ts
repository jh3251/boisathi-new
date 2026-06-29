import { Hono } from 'hono';
import api from './backend';

const app = new Hono<{ Bindings: { ASSETS: any } }>();

// Mount the backend API
app.route('/', api);

// SPA fallback for all other routes
app.get('*', async (c) => {
  const url = new URL(c.req.url);
  url.pathname = '/index.html';
  return c.env.ASSETS.fetch(new Request(url, c.req.raw));
});

export default app;
