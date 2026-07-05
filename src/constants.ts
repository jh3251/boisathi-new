import { Division, District, Upazila, Union } from './types';
import { DEFAULT_UNIONS } from './unions';
export { DEFAULT_UNIONS };

// Centralized Branding Assets
// To achieve "one domain", upload these to your Cloudinary account and update the URLs here.
export const SITE_LOGO_URL = "https://boisathi.com/book-Converted_etlhsv.png"; 
export const GOOGLE_PLAY_ICON_URL = "https://res.cloudinary.com/dxbqn8ms0/image/upload/v1769986572/google-play-png-logo-3798_eo3q9g.png";

export const CONDITIONS = [
  'Donation',
  'Rent',
  'Like New',
  'Good',
  'Fair',
  'Poor'
];

export const CLASSES = [
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'SSC',
  'HSC',
  'Admission Test',
  'Medical',
  'Honours 1st Year',
  'Honours 2nd Year',
  'Honours 3rd Year',
  'Honours 4th Year',
  'Masters',
  'IELTS',
  'Other'
];

export const DEFAULT_DIVISIONS: Division[] = [
  {
    "id": "1",
    "name": "Chattagram",
    "nameBn": "চট্টগ্রাম"
  },
  {
    "id": "2",
    "name": "Rajshahi",
    "nameBn": "রাজশাহী"
  },
  {
    "id": "3",
    "name": "Khulna",
    "nameBn": "খুলনা"
  },
  {
    "id": "4",
    "name": "Barisal",
    "nameBn": "বরিশাল"
  },
  {
    "id": "5",
    "name": "Sylhet",
    "nameBn": "সিলেট"
  },
  {
    "id": "6",
    "name": "Dhaka",
    "nameBn": "ঢাকা"
  },
  {
    "id": "7",
    "name": "Rangpur",
    "nameBn": "রংপুর"
  },
  {
    "id": "8",
    "name": "Mymensingh",
    "nameBn": "ময়মনসিংহ"
  }
];

export const DEFAULT_DISTRICTS: District[] = [
  {
    "id": "1",
    "divisionId": "1",
    "name": "Comilla",
    "nameBn": "কুমিল্লা"
  },
  {
    "id": "2",
    "divisionId": "1",
    "name": "Feni",
    "nameBn": "ফেনী"
  },
  {
    "id": "3",
    "divisionId": "1",
    "name": "Brahmanbaria",
    "nameBn": "ব্রাহ্মণবাড়িয়া"
  },
  {
    "id": "4",
    "divisionId": "1",
    "name": "Rangamati",
    "nameBn": "রাঙ্গামাটি"
  },
  {
    "id": "5",
    "divisionId": "1",
    "name": "Noakhali",
    "nameBn": "নোয়াখালী"
  },
  {
    "id": "6",
    "divisionId": "1",
    "name": "Chandpur",
    "nameBn": "চাঁদপুর"
  },
  {
    "id": "7",
    "divisionId": "1",
    "name": "Lakshmipur",
    "nameBn": "লক্ষ্মীপুর"
  },
  {
    "id": "8",
    "divisionId": "1",
    "name": "Chattogram",
    "nameBn": "চট্টগ্রাম"
  },
  {
    "id": "9",
    "divisionId": "1",
    "name": "Coxsbazar",
    "nameBn": "কক্সবাজার"
  },
  {
    "id": "10",
    "divisionId": "1",
    "name": "Khagrachhari",
    "nameBn": "খাগড়াছড়ি"
  },
  {
    "id": "11",
    "divisionId": "1",
    "name": "Bandarban",
    "nameBn": "বান্দরবান"
  },
  {
    "id": "12",
    "divisionId": "2",
    "name": "Sirajganj",
    "nameBn": "সিরাজগঞ্জ"
  },
  {
    "id": "13",
    "divisionId": "2",
    "name": "Pabna",
    "nameBn": "পাবনা"
  },
  {
    "id": "14",
    "divisionId": "2",
    "name": "Bogura",
    "nameBn": "বগুড়া"
  },
  {
    "id": "15",
    "divisionId": "2",
    "name": "Rajshahi",
    "nameBn": "রাজশাহী"
  },
  {
    "id": "16",
    "divisionId": "2",
    "name": "Natore",
    "nameBn": "নাটোর"
  },
  {
    "id": "17",
    "divisionId": "2",
    "name": "Joypurhat",
    "nameBn": "জয়পুরহাট"
  },
  {
    "id": "18",
    "divisionId": "2",
    "name": "Chapainawabganj",
    "nameBn": "চাঁপাইনবাবগঞ্জ"
  },
  {
    "id": "19",
    "divisionId": "2",
    "name": "Naogaon",
    "nameBn": "নওগাঁ"
  },
  {
    "id": "20",
    "divisionId": "3",
    "name": "Jashore",
    "nameBn": "যশোর"
  },
  {
    "id": "21",
    "divisionId": "3",
    "name": "Satkhira",
    "nameBn": "সাতক্ষীরা"
  },
  {
    "id": "22",
    "divisionId": "3",
    "name": "Meherpur",
    "nameBn": "মেহেরপুর"
  },
  {
    "id": "23",
    "divisionId": "3",
    "name": "Narail",
    "nameBn": "নড়াইল"
  },
  {
    "id": "24",
    "divisionId": "3",
    "name": "Chuadanga",
    "nameBn": "চুয়াডাঙ্গা"
  },
  {
    "id": "25",
    "divisionId": "3",
    "name": "Kushtia",
    "nameBn": "কুষ্টিয়া"
  },
  {
    "id": "26",
    "divisionId": "3",
    "name": "Magura",
    "nameBn": "মাগুরা"
  },
  {
    "id": "27",
    "divisionId": "3",
    "name": "Khulna",
    "nameBn": "খুলনা"
  },
  {
    "id": "28",
    "divisionId": "3",
    "name": "Bagerhat",
    "nameBn": "বাগেরহাট"
  },
  {
    "id": "29",
    "divisionId": "3",
    "name": "Jhenaidah",
    "nameBn": "ঝিনাইদহ"
  },
  {
    "id": "30",
    "divisionId": "4",
    "name": "Jhalakathi",
    "nameBn": "ঝালকাঠি"
  },
  {
    "id": "31",
    "divisionId": "4",
    "name": "Patuakhali",
    "nameBn": "পটুয়াখালী"
  },
  {
    "id": "32",
    "divisionId": "4",
    "name": "Pirojpur",
    "nameBn": "পিরোজপুর"
  },
  {
    "id": "33",
    "divisionId": "4",
    "name": "Barisal",
    "nameBn": "বরিশাল"
  },
  {
    "id": "34",
    "divisionId": "4",
    "name": "Bhola",
    "nameBn": "ভোলা"
  },
  {
    "id": "35",
    "divisionId": "4",
    "name": "Barguna",
    "nameBn": "বরগুনা"
  },
  {
    "id": "36",
    "divisionId": "5",
    "name": "Sylhet",
    "nameBn": "সিলেট"
  },
  {
    "id": "37",
    "divisionId": "5",
    "name": "Moulvibazar",
    "nameBn": "মৌলভীবাজার"
  },
  {
    "id": "38",
    "divisionId": "5",
    "name": "Habiganj",
    "nameBn": "হবিগঞ্জ"
  },
  {
    "id": "39",
    "divisionId": "5",
    "name": "Sunamganj",
    "nameBn": "সুনামগঞ্জ"
  },
  {
    "id": "40",
    "divisionId": "6",
    "name": "Narsingdi",
    "nameBn": "নরসিংদী"
  },
  {
    "id": "41",
    "divisionId": "6",
    "name": "Gazipur",
    "nameBn": "গাজীপুর"
  },
  {
    "id": "42",
    "divisionId": "6",
    "name": "Shariatpur",
    "nameBn": "শরীয়তপুর"
  },
  {
    "id": "43",
    "divisionId": "6",
    "name": "Narayanganj",
    "nameBn": "নারায়ণগঞ্জ"
  },
  {
    "id": "44",
    "divisionId": "6",
    "name": "Tangail",
    "nameBn": "টাঙ্গাইল"
  },
  {
    "id": "45",
    "divisionId": "6",
    "name": "Kishoreganj",
    "nameBn": "কিশোরগঞ্জ"
  },
  {
    "id": "46",
    "divisionId": "6",
    "name": "Manikganj",
    "nameBn": "মানিকগঞ্জ"
  },
  {
    "id": "47",
    "divisionId": "6",
    "name": "Dhaka",
    "nameBn": "ঢাকা"
  },
  {
    "id": "48",
    "divisionId": "6",
    "name": "Munshiganj",
    "nameBn": "মুন্সিগঞ্জ"
  },
  {
    "id": "49",
    "divisionId": "6",
    "name": "Rajbari",
    "nameBn": "রাজবাড়ী"
  },
  {
    "id": "50",
    "divisionId": "6",
    "name": "Madaripur",
    "nameBn": "মাদারীপুর"
  },
  {
    "id": "51",
    "divisionId": "6",
    "name": "Gopalganj",
    "nameBn": "গোপালগঞ্জ"
  },
  {
    "id": "52",
    "divisionId": "6",
    "name": "Faridpur",
    "nameBn": "ফরিদপুর"
  },
  {
    "id": "53",
    "divisionId": "7",
    "name": "Panchagarh",
    "nameBn": "পঞ্চগড়"
  },
  {
    "id": "54",
    "divisionId": "7",
    "name": "Dinajpur",
    "nameBn": "দিনা���পুর"
  },
  {
    "id": "55",
    "divisionId": "7",
    "name": "Lalmonirhat",
    "nameBn": "লালমনিরহাট"
  },
  {
    "id": "56",
    "divisionId": "7",
    "name": "Nilphamari",
    "nameBn": "নীলফামারী"
  },
  {
    "id": "57",
    "divisionId": "7",
    "name": "Gaibandha",
    "nameBn": "গাইবান্ধা"
  },
  {
    "id": "58",
    "divisionId": "7",
    "name": "Thakurgaon",
    "nameBn": "ঠাকুরগাঁও"
  },
  {
    "id": "59",
    "divisionId": "7",
    "name": "Rangpur",
    "nameBn": "রংপুর"
  },
  {
    "id": "60",
    "divisionId": "7",
    "name": "Kurigram",
    "nameBn": "কুড়িগ্রাম"
  },
  {
    "id": "61",
    "divisionId": "8",
    "name": "Sherpur",
    "nameBn": "শেরপুর"
  },
  {
    "id": "62",
    "divisionId": "8",
    "name": "Mymensingh",
    "nameBn": "ময়মনসিংহ"
  },
  {
    "id": "63",
    "divisionId": "8",
    "name": "Jamalpur",
    "nameBn": "জাম��লপুর"
  },
  {
    "id": "64",
    "divisionId": "8",
    "name": "Netrokona",
    "nameBn": "নেত্রকোণা"
  }
];

export const DEFAULT_UPAZILAS: Upazila[] = [
  {
    "id": "1",
    "districtId": "1",
    "name": "Debidwar",
    "nameBn": "দেবিদ্বার"
  },
  {
    "id": "2",
    "districtId": "1",
    "name": "Barura",
    "nameBn": "বরুড়া"
  },
  {
    "id": "3",
    "districtId": "1",
    "name": "Brahmanpara",
    "nameBn": "ব্রাহ্মণপাড়া"
  },
  {
    "id": "4",
    "districtId": "1",
    "name": "Chandina",
    "nameBn": "চান্দিনা"
  },
  {
    "id": "5",
    "districtId": "1",
    "name": "Chauddagram",
    "nameBn": "চৌদ্দগ্রাম"
  },
  {
    "id": "6",
    "districtId": "1",
    "name": "Daudkandi",
    "nameBn": "দাউদকান্দি"
  },
  {
    "id": "7",
    "districtId": "1",
    "name": "Homna",
    "nameBn": "হোমনা"
  },
  {
    "id": "8",
    "districtId": "1",
    "name": "Laksam",
    "nameBn": "লাকসাম"
  },
  {
    "id": "9",
    "districtId": "1",
    "name": "Muradnagar",
    "nameBn": "মুরাদনগর"
  },
  {
    "id": "10",
    "districtId": "1",
    "name": "Nangalkot",
    "nameBn": "নাঙ্গলকোট"
  },
  {
    "id": "11",
    "districtId": "1",
    "name": "Comilla Sadar",
    "nameBn": "কুমিল্লা সদর"
  },
  {
    "id": "12",
    "districtId": "1",
    "name": "Meghna",
    "nameBn": "মেঘনা"
  },
  {
    "id": "13",
    "districtId": "1",
    "name": "Monohargonj",
    "nameBn": "মনোহরগঞ্জ"
  },
  {
    "id": "14",
    "districtId": "1",
    "name": "Sadarsouth",
    "nameBn": "সদর দক্ষিণ"
  },
  {
    "id": "15",
    "districtId": "1",
    "name": "Titas",
    "nameBn": "তিতাস"
  },
  {
    "id": "16",
    "districtId": "1",
    "name": "Burichang",
    "nameBn": "বুড়িচং"
  },
  {
    "id": "17",
    "districtId": "1",
    "name": "Lalmai",
    "nameBn": "লালমাই"
  },
  {
    "id": "18",
    "districtId": "2",
    "name": "Chhagalnaiya",
    "nameBn": "ছাগলনাইয়া"
  },
  {
    "id": "19",
    "districtId": "2",
    "name": "Feni Sadar",
    "nameBn": "ফেনী সদর"
  },
  {
    "id": "20",
    "districtId": "2",
    "name": "Sonagazi",
    "nameBn": "সোনাগাজী"
  },
  {
    "id": "21",
    "districtId": "2",
    "name": "Fulgazi",
    "nameBn": "ফুলগাজী"
  },
  {
    "id": "22",
    "districtId": "2",
    "name": "Parshuram",
    "nameBn": "পরশুরাম"
  },
  {
    "id": "23",
    "districtId": "2",
    "name": "Daganbhuiyan",
    "nameBn": "দাগনভূঞা"
  },
  {
    "id": "24",
    "districtId": "3",
    "name": "Brahmanbaria Sadar",
    "nameBn": "ব্রাহ্মণবাড়িয়া সদর"
  },
  {
    "id": "25",
    "districtId": "3",
    "name": "Kasba",
    "nameBn": "কসবা"
  },
  {
    "id": "26",
    "districtId": "3",
    "name": "Nasirnagar",
    "nameBn": "নাসিরনগর"
  },
  {
    "id": "27",
    "districtId": "3",
    "name": "Sarail",
    "nameBn": "সরাইল"
  },
  {
    "id": "28",
    "districtId": "3",
    "name": "Ashuganj",
    "nameBn": "আশুগঞ্জ"
  },
  {
    "id": "29",
    "districtId": "3",
    "name": "Akhaura",
    "nameBn": "আখাউড়া"
  },
  {
    "id": "30",
    "districtId": "3",
    "name": "Nabinagar",
    "nameBn": "নবীনগর"
  },
  {
    "id": "31",
    "districtId": "3",
    "name": "Bancharampur",
    "nameBn": "বাঞ্ছারামপুর"
  },
  {
    "id": "32",
    "districtId": "3",
    "name": "Bijoynagar",
    "nameBn": "বিজয়নগর"
  },
  {
    "id": "33",
    "districtId": "4",
    "name": "Rangamati Sadar",
    "nameBn": "রাঙ্গামাটি ��দর"
  },
  {
    "id": "34",
    "districtId": "4",
    "name": "Kaptai",
    "nameBn": "কাপ্তাই"
  },
  {
    "id": "35",
    "districtId": "4",
    "name": "Kawkhali",
    "nameBn": "কাউখালী"
  },
  {
    "id": "36",
    "districtId": "4",
    "name": "Baghaichari",
    "nameBn": "বাঘাইছড়ি"
  },
  {
    "id": "37",
    "districtId": "4",
    "name": "Barkal",
    "nameBn": "বরকল"
  },
  {
    "id": "38",
    "districtId": "4",
    "name": "Langadu",
    "nameBn": "লংগদু"
  },
  {
    "id": "39",
    "districtId": "4",
    "name": "Rajasthali",
    "nameBn": "রাজস্থলী"
  },
  {
    "id": "40",
    "districtId": "4",
    "name": "Belaichari",
    "nameBn": "বিলাইছড়ি"
  },
  {
    "id": "41",
    "districtId": "4",
    "name": "Juraichari",
    "nameBn": "জুরাছড়ি"
  },
  {
    "id": "42",
    "districtId": "4",
    "name": "Naniarchar",
    "nameBn": "নানিয়ারচর"
  },
  {
    "id": "43",
    "districtId": "5",
    "name": "Noakhali Sadar",
    "nameBn": "নোয়াখালী সদর"
  },
  {
    "id": "44",
    "districtId": "5",
    "name": "Companiganj",
    "nameBn": "কোম্পানীগঞ্জ"
  },
  {
    "id": "45",
    "districtId": "5",
    "name": "Begumganj",
    "nameBn": "বেগমগঞ্জ"
  },
  {
    "id": "46",
    "districtId": "5",
    "name": "Hatia",
    "nameBn": "হাতিয়া"
  },
  {
    "id": "47",
    "districtId": "5",
    "name": "Subarnachar",
    "nameBn": "সুবর্ণচর"
  },
  {
    "id": "48",
    "districtId": "5",
    "name": "Kabirhat",
    "nameBn": "কবিরহাট"
  },
  {
    "id": "49",
    "districtId": "5",
    "name": "Senbug",
    "nameBn": "সেনবাগ"
  },
  {
    "id": "50",
    "districtId": "5",
    "name": "Chatkhil",
    "nameBn": "চাটখিল"
  },
  {
    "id": "51",
    "districtId": "5",
    "name": "Sonaimori",
    "nameBn": "সোনাইমুড়ী"
  },
  {
    "id": "52",
    "districtId": "6",
    "name": "Haimchar",
    "nameBn": "হাইমচর"
  },
  {
    "id": "53",
    "districtId": "6",
    "name": "Kachua",
    "nameBn": "কচুয়া"
  },
  {
    "id": "54",
    "districtId": "6",
    "name": "Shahrasti",
    "nameBn": "শাহরাস্তি\t"
  },
  {
    "id": "55",
    "districtId": "6",
    "name": "Chandpur Sadar",
    "nameBn": "চাঁদপুর সদর"
  },
  {
    "id": "56",
    "districtId": "6",
    "name": "Matlab South",
    "nameBn": "মতলব দ���্ষিণ"
  },
  {
    "id": "57",
    "districtId": "6",
    "name": "Hajiganj",
    "nameBn": "হাজীগঞ্জ"
  },
  {
    "id": "58",
    "districtId": "6",
    "name": "Matlab North",
    "nameBn": "মতলব উত্তর"
  },
  {
    "id": "59",
    "districtId": "6",
    "name": "Faridgonj",
    "nameBn": "ফরিদগঞ্জ"
  },
  {
    "id": "60",
    "districtId": "7",
    "name": "Lakshmipur Sadar",
    "nameBn": "লক্ষ্মীপুর সদর"
  },
  {
    "id": "61",
    "districtId": "7",
    "name": "Kamalnagar",
    "nameBn": "কমলনগর"
  },
  {
    "id": "62",
    "districtId": "7",
    "name": "Raipur",
    "nameBn": "রায়পুর"
  },
  {
    "id": "63",
    "districtId": "7",
    "name": "Ramgati",
    "nameBn": "রামগতি"
  },
  {
    "id": "64",
    "districtId": "7",
    "name": "Ramganj",
    "nameBn": "রামগঞ্জ"
  },
  {
    "id": "65",
    "districtId": "8",
    "name": "Rangunia",
    "nameBn": "রাঙ্গুনিয়া"
  },
  {
    "id": "66",
    "districtId": "8",
    "name": "Sitakunda",
    "nameBn": "সীতাকুন্ড"
  },
  {
    "id": "67",
    "districtId": "8",
    "name": "Mirsharai",
    "nameBn": "মীরসরাই"
  },
  {
    "id": "68",
    "districtId": "8",
    "name": "Patiya",
    "nameBn": "পটিয়া"
  },
  {
    "id": "69",
    "districtId": "8",
    "name": "Sandwip",
    "nameBn": "সন্দ্বীপ"
  },
  {
    "id": "70",
    "districtId": "8",
    "name": "Banshkhali",
    "nameBn": "বাঁশখালী"
  },
  {
    "id": "71",
    "districtId": "8",
    "name": "Boalkhali",
    "nameBn": "বোয়ালখালী"
  },
  {
    "id": "72",
    "districtId": "8",
    "name": "Anwara",
    "nameBn": "আনোয়ারা"
  },
  {
    "id": "73",
    "districtId": "8",
    "name": "Chandanaish",
    "nameBn": "চন্দনাইশ"
  },
  {
    "id": "74",
    "districtId": "8",
    "name": "Satkania",
    "nameBn": "সাতকানিয়া"
  },
  {
    "id": "75",
    "districtId": "8",
    "name": "Lohagara",
    "nameBn": "লোহাগাড়া"
  },
  {
    "id": "76",
    "districtId": "8",
    "name": "Hathazari",
    "nameBn": "হাটহাজারী"
  },
  {
    "id": "77",
    "districtId": "8",
    "name": "Fatikchhari",
    "nameBn": "ফটিকছড়ি"
  },
  {
    "id": "78",
    "districtId": "8",
    "name": "Raozan",
    "nameBn": "রাউজান"
  },
  {
    "id": "79",
    "districtId": "8",
    "name": "Karnafuli",
    "nameBn": "কর্ণফুলী"
  },
  {
    "id": "80",
    "districtId": "9",
    "name": "Coxsbazar Sadar",
    "nameBn": "কক্সবাজার সদর"
  },
  {
    "id": "81",
    "districtId": "9",
    "name": "Chakaria",
    "nameBn": "চকরিয়া"
  },
  {
    "id": "82",
    "districtId": "9",
    "name": "Kutubdia",
    "nameBn": "কুতুবদিয়া"
  },
  {
    "id": "83",
    "districtId": "9",
    "name": "Ukhiya",
    "nameBn": "উখিয়া"
  },
  {
    "id": "84",
    "districtId": "9",
    "name": "Moheshkhali",
    "nameBn": "মহেশখালী"
  },
  {
    "id": "85",
    "districtId": "9",
    "name": "Pekua",
    "nameBn": "পেকুয়া"
  },
  {
    "id": "86",
    "districtId": "9",
    "name": "Ramu",
    "nameBn": "রামু"
  },
  {
    "id": "87",
    "districtId": "9",
    "name": "Teknaf",
    "nameBn": "টেকনাফ"
  },
  {
    "id": "88",
    "districtId": "10",
    "name": "Khagrachhari Sadar",
    "nameBn": "খাগড়াছড়ি সদর"
  },
  {
    "id": "89",
    "districtId": "10",
    "name": "Dighinala",
    "nameBn": "দিঘীনালা"
  },
  {
    "id": "90",
    "districtId": "10",
    "name": "Panchari",
    "nameBn": "পানছড়ি"
  },
  {
    "id": "91",
    "districtId": "10",
    "name": "Laxmichhari",
    "nameBn": "লক্ষীছড়ি"
  },
  {
    "id": "92",
    "districtId": "10",
    "name": "Mohalchari",
    "nameBn": "মহালছড়ি"
  },
  {
    "id": "93",
    "districtId": "10",
    "name": "Manikchari",
    "nameBn": "মানিকছড়ি"
  },
  {
    "id": "94",
    "districtId": "10",
    "name": "Ramgarh",
    "nameBn": "রামগড়"
  },
  {
    "id": "95",
    "districtId": "10",
    "name": "Matiranga",
    "nameBn": "মাটিরাঙ্গা"
  },
  {
    "id": "96",
    "districtId": "10",
    "name": "Guimara",
    "nameBn": "গুইমারা"
  },
  {
    "id": "97",
    "districtId": "11",
    "name": "Bandarban Sadar",
    "nameBn": "বান্দরবান সদর"
  },
  {
    "id": "98",
    "districtId": "11",
    "name": "Alikadam",
    "nameBn": "আলীকদম"
  },
  {
    "id": "99",
    "districtId": "11",
    "name": "Naikhongchhari",
    "nameBn": "নাইক্ষ্যংছড়ি"
  },
  {
    "id": "100",
    "districtId": "11",
    "name": "Rowangchhari",
    "nameBn": "রোয়াংছড়ি"
  },
  {
    "id": "101",
    "districtId": "11",
    "name": "Lama",
    "nameBn": "���ামা"
  },
  {
    "id": "102",
    "districtId": "11",
    "name": "Ruma",
    "nameBn": "রুমা"
  },
  {
    "id": "103",
    "districtId": "11",
    "name": "Thanchi",
    "nameBn": "থানচি"
  },
  {
    "id": "104",
    "districtId": "12",
    "name": "Belkuchi",
    "nameBn": "বেলকুচি"
  },
  {
    "id": "105",
    "districtId": "12",
    "name": "Chauhali",
    "nameBn": "চৌহালি"
  },
  {
    "id": "106",
    "districtId": "12",
    "name": "Kamarkhand",
    "nameBn": "কামারখন্দ"
  },
  {
    "id": "107",
    "districtId": "12",
    "name": "Kazipur",
    "nameBn": "কাজীপুর"
  },
  {
    "id": "108",
    "districtId": "12",
    "name": "Raigonj",
    "nameBn": "রায়গঞ্জ"
  },
  {
    "id": "109",
    "districtId": "12",
    "name": "Shahjadpur",
    "nameBn": "শাহজাদপুর"
  },
  {
    "id": "110",
    "districtId": "12",
    "name": "Sirajganj Sadar",
    "nameBn": "সিরাজগঞ্জ সদর"
  },
  {
    "id": "111",
    "districtId": "12",
    "name": "Tarash",
    "nameBn": "তাড়াশ"
  },
  {
    "id": "112",
    "districtId": "12",
    "name": "Ullapara",
    "nameBn": "উল্লাপাড়া"
  },
  {
    "id": "113",
    "districtId": "13",
    "name": "Sujanagar",
    "nameBn": "সুজানগর"
  },
  {
    "id": "114",
    "districtId": "13",
    "name": "Ishurdi",
    "nameBn": "ঈশ্বরদী"
  },
  {
    "id": "115",
    "districtId": "13",
    "name": "Bhangura",
    "nameBn": "ভাঙ্গুড়া"
  },
  {
    "id": "116",
    "districtId": "13",
    "name": "Pabna Sadar",
    "nameBn": "পাবনা সদর"
  },
  {
    "id": "117",
    "districtId": "13",
    "name": "Bera",
    "nameBn": "বেড়া"
  },
  {
    "id": "118",
    "districtId": "13",
    "name": "Atghoria",
    "nameBn": "আটঘরিয়া"
  },
  {
    "id": "119",
    "districtId": "13",
    "name": "Chatmohar",
    "nameBn": "চাটমোহর"
  },
  {
    "id": "120",
    "districtId": "13",
    "name": "Santhia",
    "nameBn": "সাঁথিয়া"
  },
  {
    "id": "121",
    "districtId": "13",
    "name": "Faridpur",
    "nameBn": "ফরিদপুর"
  },
  {
    "id": "122",
    "districtId": "14",
    "name": "Kahaloo",
    "nameBn": "কাহালু"
  },
  {
    "id": "123",
    "districtId": "14",
    "name": "Bogra Sadar",
    "nameBn": "বগুড়া সদর"
  },
  {
    "id": "124",
    "districtId": "14",
    "name": "Shariakandi",
    "nameBn": "সারিয়াকান্দি"
  },
  {
    "id": "125",
    "districtId": "14",
    "name": "Shajahanpur",
    "nameBn": "শাজাহানপুর"
  },
  {
    "id": "126",
    "districtId": "14",
    "name": "Dupchanchia",
    "nameBn": "দুপচাচিঁয়া"
  },
  {
    "id": "127",
    "districtId": "14",
    "name": "Adamdighi",
    "nameBn": "আদমদিঘি"
  },
  {
    "id": "128",
    "districtId": "14",
    "name": "Nondigram",
    "nameBn": "নন্দিগ্রাম"
  },
  {
    "id": "129",
    "districtId": "14",
    "name": "Sonatala",
    "nameBn": "সোনাতলা"
  },
  {
    "id": "130",
    "districtId": "14",
    "name": "Dhunot",
    "nameBn": "ধুনট"
  },
  {
    "id": "131",
    "districtId": "14",
    "name": "Gabtali",
    "nameBn": "গাবতলী"
  },
  {
    "id": "132",
    "districtId": "14",
    "name": "Sherpur",
    "nameBn": "শেরপুর"
  },
  {
    "id": "133",
    "districtId": "14",
    "name": "Shibganj",
    "nameBn": "শিবগঞ্জ"
  },
  {
    "id": "134",
    "districtId": "15",
    "name": "Paba",
    "nameBn": "পবা"
  },
  {
    "id": "135",
    "districtId": "15",
    "name": "Durgapur",
    "nameBn": "দুর্গাপুর"
  },
  {
    "id": "136",
    "districtId": "15",
    "name": "Mohonpur",
    "nameBn": "মোহনপুর"
  },
  {
    "id": "137",
    "districtId": "15",
    "name": "Charghat",
    "nameBn": "চারঘাট"
  },
  {
    "id": "138",
    "districtId": "15",
    "name": "Puthia",
    "nameBn": "পুঠিয়া"
  },
  {
    "id": "139",
    "districtId": "15",
    "name": "Bagha",
    "nameBn": "বাঘা"
  },
  {
    "id": "140",
    "districtId": "15",
    "name": "Godagari",
    "nameBn": "গোদাগাড়ী"
  },
  {
    "id": "141",
    "districtId": "15",
    "name": "Tanore",
    "nameBn": "তানোর"
  },
  {
    "id": "142",
    "districtId": "15",
    "name": "Bagmara",
    "nameBn": "বাগমারা"
  },
  {
    "id": "143",
    "districtId": "16",
    "name": "Natore Sadar",
    "nameBn": "নাটোর সদর"
  },
  {
    "id": "144",
    "districtId": "16",
    "name": "Singra",
    "nameBn": "সিংড়া"
  },
  {
    "id": "145",
    "districtId": "16",
    "name": "Baraigram",
    "nameBn": "বড়াইগ্রাম"
  },
  {
    "id": "146",
    "districtId": "16",
    "name": "Bagatipara",
    "nameBn": "বাগাতিপাড়া"
  },
  {
    "id": "147",
    "districtId": "16",
    "name": "Lalpur",
    "nameBn": "লালপুর"
  },
  {
    "id": "148",
    "districtId": "16",
    "name": "Gurudaspur",
    "nameBn": "গুরুদাসপুর"
  },
  {
    "id": "149",
    "districtId": "16",
    "name": "Naldanga",
    "nameBn": "নলডাঙ্গা"
  },
  {
    "id": "150",
    "districtId": "17",
    "name": "Akkelpur",
    "nameBn": "আক্কেলপুর"
  },
  {
    "id": "151",
    "districtId": "17",
    "name": "Kalai",
    "nameBn": "কালাই"
  },
  {
    "id": "152",
    "districtId": "17",
    "name": "Khetlal",
    "nameBn": "ক্ষেতলাল"
  },
  {
    "id": "153",
    "districtId": "17",
    "name": "Panchbibi",
    "nameBn": "পাঁচবিবি"
  },
  {
    "id": "154",
    "districtId": "17",
    "name": "Joypurhat Sadar",
    "nameBn": "জয়পুরহাট সদর"
  },
  {
    "id": "155",
    "districtId": "18",
    "name": "Chapainawabganj Sadar",
    "nameBn": "চাঁপাইনবাবগঞ্জ সদর"
  },
  {
    "id": "156",
    "districtId": "18",
    "name": "Gomostapur",
    "nameBn": "গোমস্তাপুর"
  },
  {
    "id": "157",
    "districtId": "18",
    "name": "Nachol",
    "nameBn": "নাচোল"
  },
  {
    "id": "158",
    "districtId": "18",
    "name": "Bholahat",
    "nameBn": "ভোলাহাট"
  },
  {
    "id": "159",
    "districtId": "18",
    "name": "Shibganj",
    "nameBn": "শিবগঞ্জ"
  },
  {
    "id": "160",
    "districtId": "19",
    "name": "Mohadevpur",
    "nameBn": "মহাদেবপুর"
  },
  {
    "id": "161",
    "districtId": "19",
    "name": "Badalgachi",
    "nameBn": "বদলগাছী"
  },
  {
    "id": "162",
    "districtId": "19",
    "name": "Patnitala",
    "nameBn": "পত্নিতলা"
  },
  {
    "id": "163",
    "districtId": "19",
    "name": "Dhamoirhat",
    "nameBn": "ধামইরহাট"
  },
  {
    "id": "164",
    "districtId": "19",
    "name": "Niamatpur",
    "nameBn": "নিয়ামতপুর"
  },
  {
    "id": "165",
    "districtId": "19",
    "name": "Manda",
    "nameBn": "মান্দা"
  },
  {
    "id": "166",
    "districtId": "19",
    "name": "Atrai",
    "nameBn": "আত্রাই"
  },
  {
    "id": "167",
    "districtId": "19",
    "name": "Raninagar",
    "nameBn": "রাণীনগর"
  },
  {
    "id": "168",
    "districtId": "19",
    "name": "Naogaon Sadar",
    "nameBn": "নওগাঁ সদর"
  },
  {
    "id": "169",
    "districtId": "19",
    "name": "Porsha",
    "nameBn": "পোরশা"
  },
  {
    "id": "170",
    "districtId": "19",
    "name": "Sapahar",
    "nameBn": "সাপাহার"
  },
  {
    "id": "171",
    "districtId": "20",
    "name": "Manirampur",
    "nameBn": "মণিরামপুর"
  },
  {
    "id": "172",
    "districtId": "20",
    "name": "Abhaynagar",
    "nameBn": "অভয়নগর"
  },
  {
    "id": "173",
    "districtId": "20",
    "name": "Bagherpara",
    "nameBn": "বাঘারপাড়া"
  },
  {
    "id": "174",
    "districtId": "20",
    "name": "Chougachha",
    "nameBn": "চৌগাছা"
  },
  {
    "id": "175",
    "districtId": "20",
    "name": "Jhikargacha",
    "nameBn": "ঝিকরগাছা"
  },
  {
    "id": "176",
    "districtId": "20",
    "name": "Keshabpur",
    "nameBn": "কেশবপুর"
  },
  {
    "id": "177",
    "districtId": "20",
    "name": "Jessore Sadar",
    "nameBn": "যশোর সদর"
  },
  {
    "id": "178",
    "districtId": "20",
    "name": "Sharsha",
    "nameBn": "শার্শা"
  },
  {
    "id": "179",
    "districtId": "21",
    "name": "Assasuni",
    "nameBn": "আশাশুনি"
  },
  {
    "id": "180",
    "districtId": "21",
    "name": "Debhata",
    "nameBn": "দেবহাটা"
  },
  {
    "id": "181",
    "districtId": "21",
    "name": "Kalaroa",
    "nameBn": "কলারোয়া"
  },
  {
    "id": "182",
    "districtId": "21",
    "name": "Satkhira Sadar",
    "nameBn": "সাতক্ষীরা সদর"
  },
  {
    "id": "183",
    "districtId": "21",
    "name": "Shyamnagar",
    "nameBn": "শ্যামনগর"
  },
  {
    "id": "184",
    "districtId": "21",
    "name": "Tala",
    "nameBn": "তালা"
  },
  {
    "id": "185",
    "districtId": "21",
    "name": "Kaliganj",
    "nameBn": "কালিগঞ্জ"
  },
  {
    "id": "186",
    "districtId": "22",
    "name": "Mujibnagar",
    "nameBn": "মুজিবনগর"
  },
  {
    "id": "187",
    "districtId": "22",
    "name": "Meherpur Sadar",
    "nameBn": "মেহেরপুর সদর"
  },
  {
    "id": "188",
    "districtId": "22",
    "name": "Gangni",
    "nameBn": "গাংনী"
  },
  {
    "id": "189",
    "districtId": "23",
    "name": "Narail Sadar",
    "nameBn": "নড়াইল সদর"
  },
  {
    "id": "190",
    "districtId": "23",
    "name": "Lohagara",
    "nameBn": "লোহাগড়া"
  },
  {
    "id": "191",
    "districtId": "23",
    "name": "Kalia",
    "nameBn": "কালিয়া"
  },
  {
    "id": "192",
    "districtId": "24",
    "name": "Chuadanga Sadar",
    "nameBn": "চুয়াডাঙ্গা সদর"
  },
  {
    "id": "193",
    "districtId": "24",
    "name": "Alamdanga",
    "nameBn": "আলমডাঙ্গা"
  },
  {
    "id": "194",
    "districtId": "24",
    "name": "Damurhuda",
    "nameBn": "দামুড়হুদা"
  },
  {
    "id": "195",
    "districtId": "24",
    "name": "Jibannagar",
    "nameBn": "জীবননগর"
  },
  {
    "id": "196",
    "districtId": "25",
    "name": "Kushtia Sadar",
    "nameBn": "কুষ্টিয়া সদর"
  },
  {
    "id": "197",
    "districtId": "25",
    "name": "Kumarkhali",
    "nameBn": "কুমারখালী"
  },
  {
    "id": "198",
    "districtId": "25",
    "name": "Khoksa",
    "nameBn": "খোকসা"
  },
  {
    "id": "199",
    "districtId": "25",
    "name": "Mirpur",
    "nameBn": "মিরপুর"
  },
  {
    "id": "200",
    "districtId": "25",
    "name": "Daulatpur",
    "nameBn": "দৌলতপুর"
  },
  {
    "id": "201",
    "districtId": "25",
    "name": "Bheramara",
    "nameBn": "ভেড়ামারা"
  },
  {
    "id": "202",
    "districtId": "26",
    "name": "Shalikha",
    "nameBn": "শালিখা"
  },
  {
    "id": "203",
    "districtId": "26",
    "name": "Sreepur",
    "nameBn": "শ্রীপুর"
  },
  {
    "id": "204",
    "districtId": "26",
    "name": "Magura Sadar",
    "nameBn": "মাগুরা সদর"
  },
  {
    "id": "205",
    "districtId": "26",
    "name": "Mohammadpur",
    "nameBn": "মহম্মদপুর"
  },
  {
    "id": "206",
    "districtId": "27",
    "name": "Paikgasa",
    "nameBn": "পাইকগাছা"
  },
  {
    "id": "207",
    "districtId": "27",
    "name": "Fultola",
    "nameBn": "ফুলতলা"
  },
  {
    "id": "208",
    "districtId": "27",
    "name": "Digholia",
    "nameBn": "দিঘলিয়া"
  },
  {
    "id": "209",
    "districtId": "27",
    "name": "Rupsha",
    "nameBn": "রূপসা"
  },
  {
    "id": "210",
    "districtId": "27",
    "name": "Terokhada",
    "nameBn": "তেরখাদা"
  },
  {
    "id": "211",
    "districtId": "27",
    "name": "Dumuria",
    "nameBn": "ডুমুরিয়া"
  },
  {
    "id": "212",
    "districtId": "27",
    "name": "Botiaghata",
    "nameBn": "বটিয়াঘাটা"
  },
  {
    "id": "213",
    "districtId": "27",
    "name": "Dakop",
    "nameBn": "দাকোপ"
  },
  {
    "id": "214",
    "districtId": "27",
    "name": "Koyra",
    "nameBn": "কয়রা"
  },
  {
    "id": "215",
    "districtId": "28",
    "name": "Fakirhat",
    "nameBn": "ফকিরহাট"
  },
  {
    "id": "216",
    "districtId": "28",
    "name": "Bagerhat Sadar",
    "nameBn": "বাগেরহাট সদর"
  },
  {
    "id": "217",
    "districtId": "28",
    "name": "Mollahat",
    "nameBn": "মোল্লাহাট"
  },
  {
    "id": "218",
    "districtId": "28",
    "name": "Sarankhola",
    "nameBn": "শরণখোলা"
  },
  {
    "id": "219",
    "districtId": "28",
    "name": "Rampal",
    "nameBn": "রামপাল"
  },
  {
    "id": "220",
    "districtId": "28",
    "name": "Morrelganj",
    "nameBn": "মোড়েলগঞ্জ"
  },
  {
    "id": "221",
    "districtId": "28",
    "name": "Kachua",
    "nameBn": "কচুয়া"
  },
  {
    "id": "222",
    "districtId": "28",
    "name": "Mongla",
    "nameBn": "মোংলা"
  },
  {
    "id": "223",
    "districtId": "28",
    "name": "Chitalmari",
    "nameBn": "চিতলমারী"
  },
  {
    "id": "224",
    "districtId": "29",
    "name": "Jhenaidah Sadar",
    "nameBn": "ঝিনাইদহ সদর"
  },
  {
    "id": "225",
    "districtId": "29",
    "name": "Shailkupa",
    "nameBn": "শৈলকুপা"
  },
  {
    "id": "226",
    "districtId": "29",
    "name": "Harinakundu",
    "nameBn": "হরিণাকুন্ডু"
  },
  {
    "id": "227",
    "districtId": "29",
    "name": "Kaliganj",
    "nameBn": "কালীগঞ্জ"
  },
  {
    "id": "228",
    "districtId": "29",
    "name": "Kotchandpur",
    "nameBn": "কোটচাঁদপুর"
  },
  {
    "id": "229",
    "districtId": "29",
    "name": "Moheshpur",
    "nameBn": "মহেশপুর"
  },
  {
    "id": "230",
    "districtId": "30",
    "name": "Jhalakathi Sadar",
    "nameBn": "ঝালকাঠি সদর"
  },
  {
    "id": "231",
    "districtId": "30",
    "name": "Kathalia",
    "nameBn": "কাঠালিয়া"
  },
  {
    "id": "232",
    "districtId": "30",
    "name": "Nalchity",
    "nameBn": "নলছিটি"
  },
  {
    "id": "233",
    "districtId": "30",
    "name": "Rajapur",
    "nameBn": "রাজাপুর"
  },
  {
    "id": "234",
    "districtId": "31",
    "name": "Bauphal",
    "nameBn": "বাউফল"
  },
  {
    "id": "235",
    "districtId": "31",
    "name": "Patuakhali Sadar",
    "nameBn": "পটুয়াখালী সদর"
  },
  {
    "id": "236",
    "districtId": "31",
    "name": "Dumki",
    "nameBn": "দুমকি"
  },
  {
    "id": "237",
    "districtId": "31",
    "name": "Dashmina",
    "nameBn": "দশমিনা"
  },
  {
    "id": "238",
    "districtId": "31",
    "name": "Kalapara",
    "nameBn": "কলাপাড়া"
  },
  {
    "id": "239",
    "districtId": "31",
    "name": "Mirzaganj",
    "nameBn": "মির্জাগঞ্জ"
  },
  {
    "id": "240",
    "districtId": "31",
    "name": "Galachipa",
    "nameBn": "গলাচিপা"
  },
  {
    "id": "241",
    "districtId": "31",
    "name": "Rangabali",
    "nameBn": "রাঙ্গাবালী"
  },
  {
    "id": "242",
    "districtId": "32",
    "name": "Pirojpur Sadar",
    "nameBn": "পিরোজপুর সদর"
  },
  {
    "id": "243",
    "districtId": "32",
    "name": "Nazirpur",
    "nameBn": "নাজিরপুর"
  },
  {
    "id": "244",
    "districtId": "32",
    "name": "Kawkhali",
    "nameBn": "কাউখালী"
  },
  {
    "id": "245",
    "districtId": "32",
    "name": "Zianagar",
    "nameBn": "জিয়ানগর"
  },
  {
    "id": "246",
    "districtId": "32",
    "name": "Bhandaria",
    "nameBn": "ভান্ডারিয়া"
  },
  {
    "id": "247",
    "districtId": "32",
    "name": "Mathbaria",
    "nameBn": "মঠবাড়ীয়া"
  },
  {
    "id": "248",
    "districtId": "32",
    "name": "Nesarabad",
    "nameBn": "নেছারাবাদ"
  },
  {
    "id": "249",
    "districtId": "33",
    "name": "Barisal Sadar",
    "nameBn": "বরিশাল সদর"
  },
  {
    "id": "250",
    "districtId": "33",
    "name": "Bakerganj",
    "nameBn": "বাকেরগঞ্জ"
  },
  {
    "id": "251",
    "districtId": "33",
    "name": "Babuganj",
    "nameBn": "বাবুগঞ্জ"
  },
  {
    "id": "252",
    "districtId": "33",
    "name": "Wazirpur",
    "nameBn": "উজিরপুর"
  },
  {
    "id": "253",
    "districtId": "33",
    "name": "Banaripara",
    "nameBn": "বানারীপাড়া"
  },
  {
    "id": "254",
    "districtId": "33",
    "name": "Gournadi",
    "nameBn": "গৌরনদী"
  },
  {
    "id": "255",
    "districtId": "33",
    "name": "Agailjhara",
    "nameBn": "আগৈলঝাড়া"
  },
  {
    "id": "256",
    "districtId": "33",
    "name": "Mehendiganj",
    "nameBn": "মেহেন্দিগঞ্জ"
  },
  {
    "id": "257",
    "districtId": "33",
    "name": "Muladi",
    "nameBn": "মুলাদী"
  },
  {
    "id": "258",
    "districtId": "33",
    "name": "Hizla",
    "nameBn": "হিজলা"
  },
  {
    "id": "259",
    "districtId": "34",
    "name": "Bhola Sadar",
    "nameBn": "ভোলা সদর"
  },
  {
    "id": "260",
    "districtId": "34",
    "name": "Borhan Sddin",
    "nameBn": "বোরহান উদ্দিন"
  },
  {
    "id": "261",
    "districtId": "34",
    "name": "Charfesson",
    "nameBn": "চরফ্যাশন"
  },
  {
    "id": "262",
    "districtId": "34",
    "name": "Doulatkhan",
    "nameBn": "দৌলতখান"
  },
  {
    "id": "263",
    "districtId": "34",
    "name": "Monpura",
    "nameBn": "মনপুরা"
  },
  {
    "id": "264",
    "districtId": "34",
    "name": "Tazumuddin",
    "nameBn": "তজুমদ্দিন"
  },
  {
    "id": "265",
    "districtId": "34",
    "name": "Lalmohan",
    "nameBn": "লালমোহন"
  },
  {
    "id": "266",
    "districtId": "35",
    "name": "Amtali",
    "nameBn": "আমতলী"
  },
  {
    "id": "267",
    "districtId": "35",
    "name": "Barguna Sadar",
    "nameBn": "বরগুনা সদর"
  },
  {
    "id": "268",
    "districtId": "35",
    "name": "Betagi",
    "nameBn": "বেতাগী"
  },
  {
    "id": "269",
    "districtId": "35",
    "name": "Bamna",
    "nameBn": "বামনা"
  },
  {
    "id": "270",
    "districtId": "35",
    "name": "Pathorghata",
    "nameBn": "পাথরঘাটা"
  },
  {
    "id": "271",
    "districtId": "35",
    "name": "Taltali",
    "nameBn": "তালতলি"
  },
  {
    "id": "272",
    "districtId": "36",
    "name": "Balaganj",
    "nameBn": "বালাগঞ্জ"
  },
  {
    "id": "273",
    "districtId": "36",
    "name": "Beanibazar",
    "nameBn": "বিয়ানীবাজার"
  },
  {
    "id": "274",
    "districtId": "36",
    "name": "Bishwanath",
    "nameBn": "বিশ্বনাথ"
  },
  {
    "id": "275",
    "districtId": "36",
    "name": "Companiganj",
    "nameBn": "কোম্পানীগঞ্জ"
  },
  {
    "id": "276",
    "districtId": "36",
    "name": "Fenchuganj",
    "nameBn": "ফেঞ্চুগঞ্জ"
  },
  {
    "id": "277",
    "districtId": "36",
    "name": "Golapganj",
    "nameBn": "গোলাপগঞ্জ"
  },
  {
    "id": "278",
    "districtId": "36",
    "name": "Gowainghat",
    "nameBn": "গোয়াইনঘাট"
  },
  {
    "id": "279",
    "districtId": "36",
    "name": "Jaintiapur",
    "nameBn": "জৈন্তাপুর"
  },
  {
    "id": "280",
    "districtId": "36",
    "name": "Kanaighat",
    "nameBn": "কানাইঘাট"
  },
  {
    "id": "281",
    "districtId": "36",
    "name": "Sylhet Sadar",
    "nameBn": "সিলেট সদর"
  },
  {
    "id": "282",
    "districtId": "36",
    "name": "Zakiganj",
    "nameBn": "জকিগঞ্জ"
  },
  {
    "id": "283",
    "districtId": "36",
    "name": "Dakshinsurma",
    "nameBn": "দক্ষিণ সুরমা"
  },
  {
    "id": "284",
    "districtId": "36",
    "name": "Osmaninagar",
    "nameBn": "ওসমানী নগর"
  },
  {
    "id": "285",
    "districtId": "37",
    "name": "Barlekha",
    "nameBn": "বড়লেখা"
  },
  {
    "id": "286",
    "districtId": "37",
    "name": "Kamolganj",
    "nameBn": "কমলগঞ্জ"
  },
  {
    "id": "287",
    "districtId": "37",
    "name": "Kulaura",
    "nameBn": "কুলাউড়া"
  },
  {
    "id": "288",
    "districtId": "37",
    "name": "Moulvibazar Sadar",
    "nameBn": "মৌলভীবাজার সদর"
  },
  {
    "id": "289",
    "districtId": "37",
    "name": "Rajnagar",
    "nameBn": "রাজনগর"
  },
  {
    "id": "290",
    "districtId": "37",
    "name": "Sreemangal",
    "nameBn": "শ্রীমঙ্গল"
  },
  {
    "id": "291",
    "districtId": "37",
    "name": "Juri",
    "nameBn": "জুড়ী"
  },
  {
    "id": "292",
    "districtId": "38",
    "name": "Nabiganj",
    "nameBn": "নবীগঞ্জ"
  },
  {
    "id": "293",
    "districtId": "38",
    "name": "Bahubal",
    "nameBn": "বাহুবল"
  },
  {
    "id": "294",
    "districtId": "38",
    "name": "Ajmiriganj",
    "nameBn": "আজমিরীগঞ্জ"
  },
  {
    "id": "295",
    "districtId": "38",
    "name": "Baniachong",
    "nameBn": "বানিয়াচং"
  },
  {
    "id": "296",
    "districtId": "38",
    "name": "Lakhai",
    "nameBn": "লাখাই"
  },
  {
    "id": "297",
    "districtId": "38",
    "name": "Chunarughat",
    "nameBn": "চুনারুঘাট"
  },
  {
    "id": "298",
    "districtId": "38",
    "name": "Habiganj Sadar",
    "nameBn": "হবিগঞ্জ সদর"
  },
  {
    "id": "299",
    "districtId": "38",
    "name": "Madhabpur",
    "nameBn": "মাধবপুর"
  },
  {
    "id": "300",
    "districtId": "39",
    "name": "Sunamganj Sadar",
    "nameBn": "সুনামগঞ্জ সদর"
  },
  {
    "id": "301",
    "districtId": "39",
    "name": "South Sunamganj",
    "nameBn": "দক্ষিণ সুনামগঞ্জ"
  },
  {
    "id": "302",
    "districtId": "39",
    "name": "Bishwambarpur",
    "nameBn": "বিশ্বম্ভরপুর"
  },
  {
    "id": "303",
    "districtId": "39",
    "name": "Chhatak",
    "nameBn": "ছাতক"
  },
  {
    "id": "304",
    "districtId": "39",
    "name": "Jagannathpur",
    "nameBn": "জগন্নাথপুর"
  },
  {
    "id": "305",
    "districtId": "39",
    "name": "Dowarabazar",
    "nameBn": "দোয়ারাবাজার"
  },
  {
    "id": "306",
    "districtId": "39",
    "name": "Tahirpur",
    "nameBn": "তাহিরপুর"
  },
  {
    "id": "307",
    "districtId": "39",
    "name": "Dharmapasha",
    "nameBn": "ধর্মপাশা"
  },
  {
    "id": "308",
    "districtId": "39",
    "name": "Jamalganj",
    "nameBn": "জামালগঞ্জ"
  },
  {
    "id": "309",
    "districtId": "39",
    "name": "Shalla",
    "nameBn": "শাল্লা"
  },
  {
    "id": "310",
    "districtId": "39",
    "name": "Derai",
    "nameBn": "দিরাই"
  },
  {
    "id": "311",
    "districtId": "40",
    "name": "Belabo",
    "nameBn": "বেলাবো"
  },
  {
    "id": "312",
    "districtId": "40",
    "name": "Monohardi",
    "nameBn": "মনোহরদী"
  },
  {
    "id": "313",
    "districtId": "40",
    "name": "Narsingdi Sadar",
    "nameBn": "নরসিংদী সদর"
  },
  {
    "id": "314",
    "districtId": "40",
    "name": "Palash",
    "nameBn": "পলাশ"
  },
  {
    "id": "315",
    "districtId": "40",
    "name": "Raipura",
    "nameBn": "রায়পুরা"
  },
  {
    "id": "316",
    "districtId": "40",
    "name": "Shibpur",
    "nameBn": "শিবপুর"
  },
  {
    "id": "317",
    "districtId": "41",
    "name": "Kaliganj",
    "nameBn": "কালীগঞ্জ"
  },
  {
    "id": "318",
    "districtId": "41",
    "name": "Kaliakair",
    "nameBn": "কালিয়াকৈর"
  },
  {
    "id": "319",
    "districtId": "41",
    "name": "Kapasia",
    "nameBn": "কাপাসিয়া"
  },
  {
    "id": "320",
    "districtId": "41",
    "name": "Gazipur Sadar",
    "nameBn": "গাজীপুর সদর"
  },
  {
    "id": "321",
    "districtId": "41",
    "name": "Sreepur",
    "nameBn": "শ্রীপুর"
  },
  {
    "id": "322",
    "districtId": "42",
    "name": "Shariatpur Sadar",
    "nameBn": "শরিয়তপুর সদর"
  },
  {
    "id": "323",
    "districtId": "42",
    "name": "Naria",
    "nameBn": "নড়িয়া"
  },
  {
    "id": "324",
    "districtId": "42",
    "name": "Zajira",
    "nameBn": "জাজিরা"
  },
  {
    "id": "325",
    "districtId": "42",
    "name": "Gosairhat",
    "nameBn": "গোসাইরহাট"
  },
  {
    "id": "326",
    "districtId": "42",
    "name": "Bhedarganj",
    "nameBn": "ভেদরগঞ্জ"
  },
  {
    "id": "327",
    "districtId": "42",
    "name": "Damudya",
    "nameBn": "ডামুড্যা"
  },
  {
    "id": "328",
    "districtId": "43",
    "name": "Araihazar",
    "nameBn": "আড়াইহাজার"
  },
  {
    "id": "329",
    "districtId": "43",
    "name": "Bandar",
    "nameBn": "বন্দর"
  },
  {
    "id": "330",
    "districtId": "43",
    "name": "Narayanganj Sadar",
    "nameBn": "নারায়নগঞ্জ সদর"
  },
  {
    "id": "331",
    "districtId": "43",
    "name": "Rupganj",
    "nameBn": "রূপগঞ্জ"
  },
  {
    "id": "332",
    "districtId": "43",
    "name": "Sonargaon",
    "nameBn": "সোনারগাঁ"
  },
  {
    "id": "333",
    "districtId": "44",
    "name": "Basail",
    "nameBn": "বাসাইল"
  },
  {
    "id": "334",
    "districtId": "44",
    "name": "Bhuapur",
    "nameBn": "ভুয়াপুর"
  },
  {
    "id": "335",
    "districtId": "44",
    "name": "Delduar",
    "nameBn": "দেলদুয়ার"
  },
  {
    "id": "336",
    "districtId": "44",
    "name": "Ghatail",
    "nameBn": "ঘাটাইল"
  },
  {
    "id": "337",
    "districtId": "44",
    "name": "Gopalpur",
    "nameBn": "গোপালপুর"
  },
  {
    "id": "338",
    "districtId": "44",
    "name": "Madhupur",
    "nameBn": "মধুপুর"
  },
  {
    "id": "339",
    "districtId": "44",
    "name": "Mirzapur",
    "nameBn": "মির্���াপুর"
  },
  {
    "id": "340",
    "districtId": "44",
    "name": "Nagarpur",
    "nameBn": "নাগরপুর"
  },
  {
    "id": "341",
    "districtId": "44",
    "name": "Sakhipur",
    "nameBn": "সখিপুর"
  },
  {
    "id": "342",
    "districtId": "44",
    "name": "Tangail Sadar",
    "nameBn": "টাঙ্গাইল সদর"
  },
  {
    "id": "343",
    "districtId": "44",
    "name": "Kalihati",
    "nameBn": "কালিহাতী"
  },
  {
    "id": "344",
    "districtId": "44",
    "name": "Dhanbari",
    "nameBn": "ধনবাড়ী"
  },
  {
    "id": "345",
    "districtId": "45",
    "name": "Itna",
    "nameBn": "ইটনা"
  },
  {
    "id": "346",
    "districtId": "45",
    "name": "Katiadi",
    "nameBn": "কটিয়াদী"
  },
  {
    "id": "347",
    "districtId": "45",
    "name": "Bhairab",
    "nameBn": "ভৈরব"
  },
  {
    "id": "348",
    "districtId": "45",
    "name": "Tarail",
    "nameBn": "তাড়াইল"
  },
  {
    "id": "349",
    "districtId": "45",
    "name": "Hossainpur",
    "nameBn": "হোসেনপুর"
  },
  {
    "id": "350",
    "districtId": "45",
    "name": "Pakundia",
    "nameBn": "পাকুন্দিয়া"
  },
  {
    "id": "351",
    "districtId": "45",
    "name": "Kuliarchar",
    "nameBn": "কুলিয়ারচর"
  },
  {
    "id": "352",
    "districtId": "45",
    "name": "Kishoreganj Sadar",
    "nameBn": "কিশোরগঞ্জ সদর"
  },
  {
    "id": "353",
    "districtId": "45",
    "name": "Karimgonj",
    "nameBn": "করিমগঞ্জ"
  },
  {
    "id": "354",
    "districtId": "45",
    "name": "Bajitpur",
    "nameBn": "বাজিতপুর"
  },
  {
    "id": "355",
    "districtId": "45",
    "name": "Austagram",
    "nameBn": "অষ্টগ্রাম"
  },
  {
    "id": "356",
    "districtId": "45",
    "name": "Mithamoin",
    "nameBn": "মিঠামইন"
  },
  {
    "id": "357",
    "districtId": "45",
    "name": "Nikli",
    "nameBn": "নিকলী"
  },
  {
    "id": "358",
    "districtId": "46",
    "name": "Harirampur",
    "nameBn": "হরিরামপুর"
  },
  {
    "id": "359",
    "districtId": "46",
    "name": "Saturia",
    "nameBn": "সাটুরিয়া"
  },
  {
    "id": "360",
    "districtId": "46",
    "name": "Manikganj Sadar",
    "nameBn": "মানিকগঞ্জ সদর"
  },
  {
    "id": "361",
    "districtId": "46",
    "name": "Gior",
    "nameBn": "ঘিওর"
  },
  {
    "id": "362",
    "districtId": "46",
    "name": "Shibaloy",
    "nameBn": "শিবালয়"
  },
  {
    "id": "363",
    "districtId": "46",
    "name": "Doulatpur",
    "nameBn": "দৌলতপুর"
  },
  {
    "id": "364",
    "districtId": "46",
    "name": "Singiar",
    "nameBn": "সিংগাইর"
  },
  {
    "id": "365",
    "districtId": "47",
    "name": "Savar",
    "nameBn": "সাভার"
  },
  {
    "id": "366",
    "districtId": "47",
    "name": "Dhamrai",
    "nameBn": "ধামরাই"
  },
  {
    "id": "367",
    "districtId": "47",
    "name": "Keraniganj",
    "nameBn": "কেরাণীগঞ্জ"
  },
  {
    "id": "368",
    "districtId": "47",
    "name": "Nawabganj",
    "nameBn": "নবাবগঞ্জ"
  },
  {
    "id": "369",
    "districtId": "47",
    "name": "Dohar",
    "nameBn": "দোহার"
  },
  {
    "id": "370",
    "districtId": "48",
    "name": "Munshiganj Sadar",
    "nameBn": "মুন্সিগঞ্জ সদর"
  },
  {
    "id": "371",
    "districtId": "48",
    "name": "Sreenagar",
    "nameBn": "শ্রীনগর"
  },
  {
    "id": "372",
    "districtId": "48",
    "name": "Sirajdikhan",
    "nameBn": "সিরাজদিখান"
  },
  {
    "id": "373",
    "districtId": "48",
    "name": "Louhajanj",
    "nameBn": "লৌহজং"
  },
  {
    "id": "374",
    "districtId": "48",
    "name": "Gajaria",
    "nameBn": "গজারিয়া"
  },
  {
    "id": "375",
    "districtId": "48",
    "name": "Tongibari",
    "nameBn": "টংগীবাড়ি"
  },
  {
    "id": "376",
    "districtId": "49",
    "name": "Rajbari Sadar",
    "nameBn": "রাজবাড়ী সদর"
  },
  {
    "id": "377",
    "districtId": "49",
    "name": "Goalanda",
    "nameBn": "গোয়ালন্দ"
  },
  {
    "id": "378",
    "districtId": "49",
    "name": "Pangsa",
    "nameBn": "পাংশা"
  },
  {
    "id": "379",
    "districtId": "49",
    "name": "Baliakandi",
    "nameBn": "বালিয়াকান্দি"
  },
  {
    "id": "380",
    "districtId": "49",
    "name": "Kalukhali",
    "nameBn": "কালুখালী"
  },
  {
    "id": "381",
    "districtId": "50",
    "name": "Madaripur Sadar",
    "nameBn": "মাদারীপুর সদর"
  },
  {
    "id": "382",
    "districtId": "50",
    "name": "Shibchar",
    "nameBn": "শিবচর"
  },
  {
    "id": "383",
    "districtId": "50",
    "name": "Kalkini",
    "nameBn": "কালকিনি"
  },
  {
    "id": "384",
    "districtId": "50",
    "name": "Rajoir",
    "nameBn": "রাজৈর"
  },
  {
    "id": "385",
    "districtId": "51",
    "name": "Gopalganj Sadar",
    "nameBn": "গোপালগঞ্জ সদর"
  },
  {
    "id": "386",
    "districtId": "51",
    "name": "Kashiani",
    "nameBn": "কাশিয়ানী"
  },
  {
    "id": "387",
    "districtId": "51",
    "name": "Tungipara",
    "nameBn": "টুংগীপাড়া"
  },
  {
    "id": "388",
    "districtId": "51",
    "name": "Kotalipara",
    "nameBn": "কোটালীপাড়া"
  },
  {
    "id": "389",
    "districtId": "51",
    "name": "Muksudpur",
    "nameBn": "মুকসুদপুর"
  },
  {
    "id": "390",
    "districtId": "52",
    "name": "Faridpur Sadar",
    "nameBn": "ফরিদপুর সদর"
  },
  {
    "id": "391",
    "districtId": "52",
    "name": "Alfadanga",
    "nameBn": "আলফাডাঙ্গা"
  },
  {
    "id": "392",
    "districtId": "52",
    "name": "Boalmari",
    "nameBn": "বোয়ালমারী"
  },
  {
    "id": "393",
    "districtId": "52",
    "name": "Sadarpur",
    "nameBn": "সদরপুর"
  },
  {
    "id": "394",
    "districtId": "52",
    "name": "Nagarkanda",
    "nameBn": "নগরকান্দা"
  },
  {
    "id": "395",
    "districtId": "52",
    "name": "Bhanga",
    "nameBn": "ভাঙ্গা"
  },
  {
    "id": "396",
    "districtId": "52",
    "name": "Charbhadrasan",
    "nameBn": "চরভদ্রাসন"
  },
  {
    "id": "397",
    "districtId": "52",
    "name": "Madhukhali",
    "nameBn": "মধুখালী"
  },
  {
    "id": "398",
    "districtId": "52",
    "name": "Saltha",
    "nameBn": "সালথা"
  },
  {
    "id": "399",
    "districtId": "53",
    "name": "Panchagarh Sadar",
    "nameBn": "পঞ্চগড় সদর"
  },
  {
    "id": "400",
    "districtId": "53",
    "name": "Debiganj",
    "nameBn": "দেবীগঞ্জ"
  },
  {
    "id": "401",
    "districtId": "53",
    "name": "Boda",
    "nameBn": "বোদা"
  },
  {
    "id": "402",
    "districtId": "53",
    "name": "Atwari",
    "nameBn": "আটোয়ারী"
  },
  {
    "id": "403",
    "districtId": "53",
    "name": "Tetulia",
    "nameBn": "তেতুলিয়া"
  },
  {
    "id": "404",
    "districtId": "54",
    "name": "Nawabganj",
    "nameBn": "নবাবগঞ্জ"
  },
  {
    "id": "405",
    "districtId": "54",
    "name": "Birganj",
    "nameBn": "বীরগঞ্জ"
  },
  {
    "id": "406",
    "districtId": "54",
    "name": "Ghoraghat",
    "nameBn": "ঘোড়াঘাট"
  },
  {
    "id": "407",
    "districtId": "54",
    "name": "Birampur",
    "nameBn": "বিরামপুর"
  },
  {
    "id": "408",
    "districtId": "54",
    "name": "Parbatipur",
    "nameBn": "পার্বতীপুর"
  },
  {
    "id": "409",
    "districtId": "54",
    "name": "Bochaganj",
    "nameBn": "বোচাগঞ্জ"
  },
  {
    "id": "410",
    "districtId": "54",
    "name": "Kaharol",
    "nameBn": "কাহারোল"
  },
  {
    "id": "411",
    "districtId": "54",
    "name": "Fulbari",
    "nameBn": "ফুলবাড়ী"
  },
  {
    "id": "412",
    "districtId": "54",
    "name": "Dinajpur Sadar",
    "nameBn": "দিনাজপুর সদর"
  },
  {
    "id": "413",
    "districtId": "54",
    "name": "Hakimpur",
    "nameBn": "হাকিমপুর"
  },
  {
    "id": "414",
    "districtId": "54",
    "name": "Khansama",
    "nameBn": "খানসামা"
  },
  {
    "id": "415",
    "districtId": "54",
    "name": "Birol",
    "nameBn": "বিরল"
  },
  {
    "id": "416",
    "districtId": "54",
    "name": "Chirirbandar",
    "nameBn": "চিরিরবন্দর"
  },
  {
    "id": "417",
    "districtId": "55",
    "name": "Lalmonirhat Sadar",
    "nameBn": "লালমনিরহাট সদর"
  },
  {
    "id": "418",
    "districtId": "55",
    "name": "Kaliganj",
    "nameBn": "কালীগঞ্জ"
  },
  {
    "id": "419",
    "districtId": "55",
    "name": "Hatibandha",
    "nameBn": "হাতীবান্ধা"
  },
  {
    "id": "420",
    "districtId": "55",
    "name": "Patgram",
    "nameBn": "পাটগ্রাম"
  },
  {
    "id": "421",
    "districtId": "55",
    "name": "Aditmari",
    "nameBn": "আদিতমারী"
  },
  {
    "id": "422",
    "districtId": "56",
    "name": "Syedpur",
    "nameBn": "সৈয়দপুর"
  },
  {
    "id": "423",
    "districtId": "56",
    "name": "Domar",
    "nameBn": "ডোমার"
  },
  {
    "id": "424",
    "districtId": "56",
    "name": "Dimla",
    "nameBn": "ডিমলা"
  },
  {
    "id": "425",
    "districtId": "56",
    "name": "Jaldhaka",
    "nameBn": "জলঢাকা"
  },
  {
    "id": "426",
    "districtId": "56",
    "name": "Kishorganj",
    "nameBn": "কিশোরগঞ্জ"
  },
  {
    "id": "427",
    "districtId": "56",
    "name": "Nilphamari Sadar",
    "nameBn": "নীলফামারী সদর"
  },
  {
    "id": "428",
    "districtId": "57",
    "name": "Sadullapur",
    "nameBn": "সাদুল্লাপুর"
  },
  {
    "id": "429",
    "districtId": "57",
    "name": "Gaibandha Sadar",
    "nameBn": "গাইবান্ধা সদর"
  },
  {
    "id": "430",
    "districtId": "57",
    "name": "Palashbari",
    "nameBn": "পলাশবাড়ী"
  },
  {
    "id": "431",
    "districtId": "57",
    "name": "Saghata",
    "nameBn": "সাঘাটা"
  },
  {
    "id": "432",
    "districtId": "57",
    "name": "Gobindaganj",
    "nameBn": "গোবিন্দগঞ্জ"
  },
  {
    "id": "433",
    "districtId": "57",
    "name": "Sundarganj",
    "nameBn": "সুন্দরগঞ্জ"
  },
  {
    "id": "434",
    "districtId": "57",
    "name": "Phulchari",
    "nameBn": "ফুলছড়ি"
  },
  {
    "id": "435",
    "districtId": "58",
    "name": "Thakurgaon Sadar",
    "nameBn": "ঠাকুরগাঁও সদর"
  },
  {
    "id": "436",
    "districtId": "58",
    "name": "Pirganj",
    "nameBn": "পীরগঞ্জ"
  },
  {
    "id": "437",
    "districtId": "58",
    "name": "Ranisankail",
    "nameBn": "রাণীশংকৈল"
  },
  {
    "id": "438",
    "districtId": "58",
    "name": "Haripur",
    "nameBn": "হরিপুর"
  },
  {
    "id": "439",
    "districtId": "58",
    "name": "Baliadangi",
    "nameBn": "বালিয়াডাঙ্গী"
  },
  {
    "id": "440",
    "districtId": "59",
    "name": "Rangpur Sadar",
    "nameBn": "রংপুর সদর"
  },
  {
    "id": "441",
    "districtId": "59",
    "name": "Gangachara",
    "nameBn": "গংগাচড়া"
  },
  {
    "id": "442",
    "districtId": "59",
    "name": "Taragonj",
    "nameBn": "তারাগঞ্জ"
  },
  {
    "id": "443",
    "districtId": "59",
    "name": "Badargonj",
    "nameBn": "বদরগঞ্জ"
  },
  {
    "id": "444",
    "districtId": "59",
    "name": "Mithapukur",
    "nameBn": "মিঠাপুকুর"
  },
  {
    "id": "445",
    "districtId": "59",
    "name": "Pirgonj",
    "nameBn": "পীরগঞ্জ"
  },
  {
    "id": "446",
    "districtId": "59",
    "name": "Kaunia",
    "nameBn": "কাউনিয়া"
  },
  {
    "id": "447",
    "districtId": "59",
    "name": "Pirgacha",
    "nameBn": "পীরগাছা"
  },
  {
    "id": "448",
    "districtId": "60",
    "name": "Kurigram Sadar",
    "nameBn": "কুড়িগ্রাম সদর"
  },
  {
    "id": "449",
    "districtId": "60",
    "name": "Nageshwari",
    "nameBn": "নাগেশ্বরী"
  },
  {
    "id": "450",
    "districtId": "60",
    "name": "Bhurungamari",
    "nameBn": "ভুরুঙ্গামারী"
  },
  {
    "id": "451",
    "districtId": "60",
    "name": "Phulbari",
    "nameBn": "ফুলবাড়ী"
  },
  {
    "id": "452",
    "districtId": "60",
    "name": "Rajarhat",
    "nameBn": "রাজারহাট"
  },
  {
    "id": "453",
    "districtId": "60",
    "name": "Ulipur",
    "nameBn": "উলিপুর"
  },
  {
    "id": "454",
    "districtId": "60",
    "name": "Chilmari",
    "nameBn": "চিলমারী"
  },
  {
    "id": "455",
    "districtId": "60",
    "name": "Rowmari",
    "nameBn": "রৌমারী"
  },
  {
    "id": "456",
    "districtId": "60",
    "name": "Charrajibpur",
    "nameBn": "চর রাজিবপুর"
  },
  {
    "id": "457",
    "districtId": "61",
    "name": "Sherpur Sadar",
    "nameBn": "শেরপুর সদর"
  },
  {
    "id": "458",
    "districtId": "61",
    "name": "Nalitabari",
    "nameBn": "নালিতাবাড়ী"
  },
  {
    "id": "459",
    "districtId": "61",
    "name": "Sreebordi",
    "nameBn": "শ্রীবরদী"
  },
  {
    "id": "460",
    "districtId": "61",
    "name": "Nokla",
    "nameBn": "নকলা"
  },
  {
    "id": "461",
    "districtId": "61",
    "name": "Jhenaigati",
    "nameBn": "ঝিনাইগাতী"
  },
  {
    "id": "462",
    "districtId": "62",
    "name": "Fulbaria",
    "nameBn": "ফুলবাড়ীয়া"
  },
  {
    "id": "463",
    "districtId": "62",
    "name": "Trishal",
    "nameBn": "ত্রিশাল"
  },
  {
    "id": "464",
    "districtId": "62",
    "name": "Bhaluka",
    "nameBn": "ভালুকা"
  },
  {
    "id": "465",
    "districtId": "62",
    "name": "Muktagacha",
    "nameBn": "মুক্তাগাছা"
  },
  {
    "id": "466",
    "districtId": "62",
    "name": "Mymensingh Sadar",
    "nameBn": "ময়মনসিংহ সদর"
  },
  {
    "id": "467",
    "districtId": "62",
    "name": "Dhobaura",
    "nameBn": "ধোবাউড়া"
  },
  {
    "id": "468",
    "districtId": "62",
    "name": "Phulpur",
    "nameBn": "ফুলপুর"
  },
  {
    "id": "469",
    "districtId": "62",
    "name": "Haluaghat",
    "nameBn": "হালুয়াঘাট"
  },
  {
    "id": "470",
    "districtId": "62",
    "name": "Gouripur",
    "nameBn": "গৌরীপুর"
  },
  {
    "id": "471",
    "districtId": "62",
    "name": "Gafargaon",
    "nameBn": "গফরগাঁও"
  },
  {
    "id": "472",
    "districtId": "62",
    "name": "Iswarganj",
    "nameBn": "ঈশ্বরগঞ্জ"
  },
  {
    "id": "473",
    "districtId": "62",
    "name": "Nandail",
    "nameBn": "নান্দাইল"
  },
  {
    "id": "474",
    "districtId": "62",
    "name": "Tarakanda",
    "nameBn": "তারাকান্দা"
  },
  {
    "id": "475",
    "districtId": "63",
    "name": "Jamalpur Sadar",
    "nameBn": "জামালপুর সদর"
  },
  {
    "id": "476",
    "districtId": "63",
    "name": "Melandah",
    "nameBn": "মেলান্দহ"
  },
  {
    "id": "477",
    "districtId": "63",
    "name": "Islampur",
    "nameBn": "ইসলামপুর"
  },
  {
    "id": "478",
    "districtId": "63",
    "name": "Dewangonj",
    "nameBn": "দেওয়ানগঞ্জ"
  },
  {
    "id": "479",
    "districtId": "63",
    "name": "Sarishabari",
    "nameBn": "সরিষাবাড়ী"
  },
  {
    "id": "480",
    "districtId": "63",
    "name": "Madarganj",
    "nameBn": "মাদারগঞ্জ"
  },
  {
    "id": "481",
    "districtId": "63",
    "name": "Bokshiganj",
    "nameBn": "বকশীগঞ্জ"
  },
  {
    "id": "482",
    "districtId": "64",
    "name": "Barhatta",
    "nameBn": "বারহাট্টা"
  },
  {
    "id": "483",
    "districtId": "64",
    "name": "Durgapur",
    "nameBn": "দুর্গাপুর"
  },
  {
    "id": "484",
    "districtId": "64",
    "name": "Kendua",
    "nameBn": "কেন্দুয়া"
  },
  {
    "id": "485",
    "districtId": "64",
    "name": "Atpara",
    "nameBn": "আটপাড়া"
  },
  {
    "id": "486",
    "districtId": "64",
    "name": "Madan",
    "nameBn": "মদন"
  },
  {
    "id": "487",
    "districtId": "64",
    "name": "Khaliajuri",
    "nameBn": "খালিয়াজুরী"
  },
  {
    "id": "488",
    "districtId": "64",
    "name": "Kalmakanda",
    "nameBn": "কলমাকান্দা"
  },
  {
    "id": "489",
    "districtId": "64",
    "name": "Mohongonj",
    "nameBn": "মোহনগঞ্জ"
  },
  {
    "id": "490",
    "districtId": "64",
    "name": "Purbadhala",
    "nameBn": "পূর্বধলা"
  },
  {
    "id": "491",
    "districtId": "64",
    "name": "Netrokona Sadar",
    "nameBn": "নেত্রকোণা সদর"
  },
  {
    "id": "492",
    "districtId": "9",
    "name": "Eidgaon",
    "nameBn": "ঈদগাঁও"
  },
  {
    "id": "493",
    "districtId": "39",
    "name": "Madhyanagar",
    "nameBn": "মধ্যনগর"
  },
  {
    "id": "494",
    "districtId": "50",
    "name": "Dasar",
    "nameBn": "ডাসার"
  }
];



export let DIVISIONS: Division[] = [];
export let DISTRICTS: District[] = [];
export let UPAZILAS: Upazila[] = [];
export let UNIONS: Union[] = [];

export function syncLocationsWithStorage() {
  if (typeof window !== 'undefined') {
    try {
      const savedDivs = localStorage.getItem('bk_custom_divisions_v4');
      const savedDists = localStorage.getItem('bk_custom_districts_v4');
      const savedUpas = localStorage.getItem('bk_custom_upazilas_v4');
      const savedUnions = localStorage.getItem('bk_custom_unions_v4');

      const loadedDivs = savedDivs ? JSON.parse(savedDivs) : DEFAULT_DIVISIONS;
      const loadedDists = savedDists ? JSON.parse(savedDists) : DEFAULT_DISTRICTS;
      let loadedUpas = savedUpas ? JSON.parse(savedUpas) : DEFAULT_UPAZILAS;
      if (!loadedUpas || loadedUpas.length === 0) loadedUpas = DEFAULT_UPAZILAS;
      let loadedUnions = savedUnions ? JSON.parse(savedUnions) : DEFAULT_UNIONS;
      if (!loadedUnions || loadedUnions.length === 0) loadedUnions = DEFAULT_UNIONS;

      DIVISIONS = [...loadedDivs];
      DISTRICTS = [...loadedDists];
      UPAZILAS = [...loadedUpas];
      UNIONS = [...loadedUnions];
    } catch (e) {
      console.error("Failed to parse dynamic locations", e);
      DIVISIONS = [...DEFAULT_DIVISIONS];
      DISTRICTS = [...DEFAULT_DISTRICTS];
      UPAZILAS = [...DEFAULT_UPAZILAS];
      UNIONS = [...DEFAULT_UNIONS];
    }
  } else {
    DIVISIONS = [...DEFAULT_DIVISIONS];
    DISTRICTS = [...DEFAULT_DISTRICTS];
    UPAZILAS = [...DEFAULT_UPAZILAS];
    UNIONS = [...DEFAULT_UNIONS];
  }
}

export function saveLocationsToStorage(newDivs: Division[], newDists: District[], newUpas: Upazila[], newUnions?: Union[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('bk_custom_divisions_v4', JSON.stringify(newDivs));
      localStorage.setItem('bk_custom_districts_v4', JSON.stringify(newDists));
      localStorage.setItem('bk_custom_upazilas_v4', JSON.stringify(newUpas));
      if (newUnions) {
        localStorage.setItem('bk_custom_unions_v4', JSON.stringify(newUnions));
      } else {
        // preserve current unions if not passed
        localStorage.setItem('bk_custom_unions_v4', JSON.stringify(UNIONS));
      }
    } catch (e) {
      console.error("Failed to save dynamic locations", e);
    }
    console.log("DEFAULT_UNIONS length at sync time:", DEFAULT_UNIONS?.length);
syncLocationsWithStorage();
  }
}

// Initialize on load
syncLocationsWithStorage();