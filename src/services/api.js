
// // client/src/services/api.js
// import axios from 'axios';
// import { auth } from '../firebase';

// // .env থেকে নেবে, না থাকলে ডিফল্ট লোকালহোস্ট
// export const API_BASE =
//   import.meta.env.VITE_API_BASE?.trim() || 'http://127.0.0.1:5000';

// // axios instance তৈরি
// const api = axios.create({
//   baseURL: API_BASE,
//   withCredentials: false, // Firebase token পাঠাবে, cookie না
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // 🔒 প্রতিটা রিকোয়েস্টে Firebase ID Token অ্যাটাচ করো
// api.interceptors.request.use(
//   async (config) => {
//     try {
//       const user = auth.currentUser;
//       const token = await user?.getIdToken?.(true); // force refresh token

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       } else {
//         // যদি user না থাকে → কেবল public GET গুলো যেতে দাও
//         const needsAuth = /post|put|patch|delete/i.test(config.method || '');
//         if (needsAuth) {
//           console.warn('⚠️ No auth token: this request requires login.');
//         }
//       }
//     } catch (e) {
//       console.error('Error attaching token:', e);
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 🔁 401 error গ্লোবালি হ্যান্ডেল করা
// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error?.response?.status === 401) {
//       console.warn('🚫 401 Unauthorized — Token missing or expired.');
//       // চাইলে এখানে auto-logout করতে পারো:
//       // import { signOut } from 'firebase/auth';
//       // signOut(auth);
//       // window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;





// // client/src/services/api.js
// import axios from 'axios';
// import { auth } from '../firebase';

// // .env থেকে নেবে, না থাকলে ডিফল্ট লোকালহোস্ট
// export const API_BASE =
//   import.meta.env.VITE_API_BASE?.trim() || 'http://127.0.0.1:5000';

// // axios instance তৈরি
// const api = axios.create({
//   baseURL: API_BASE,
//   withCredentials: false, // Firebase token পাঠাবে, cookie না
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // 🔒 প্রতিটা রিকোয়েস্টে Firebase ID Token অ্যাটাচ করো
// api.interceptors.request.use(
//   async (config) => {
//     try {
//       const user = auth.currentUser;
//       const token = await user?.getIdToken?.(true); // force refresh token

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       } else {
//         // যদি user না থাকে → কেবল public GET গুলো যেতে দাও
//         const needsAuth = /post|put|patch|delete/i.test(config.method || '');
//         if (needsAuth) {
//           console.warn('⚠️ No auth token: this request requires login.');
//         }
//       }
//     } catch (e) {
//       console.error('Error attaching token:', e);
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 🔁 401 error গ্লোবালি হ্যান্ডেল করা
// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error?.response?.status === 401) {
//       console.warn('🚫 401 Unauthorized — Token missing or expired.');
//       // চাইলে এখানে auto-logout করতে পারো:
//       // import { signOut } from 'firebase/auth';
//       // signOut(auth);
//       // window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;



// src/services/api.js

import { getAuth } from 'firebase/auth';

// আপনার সার্ভারের বেস URL
// const API_BASE_URL = 'http://127.0.0.1:5000';
const API_BASE_URL = 'https://server-five-brown-34.vercel.app';

// এই ফাংশনটি ফায়ারবেস থেকে বর্তমান ইউজারের টোকেন এনে দেয়
const getAuthToken = async () => {
  const user = getAuth().currentUser;
  if (!user) return null;
  return await user.getIdToken(true); // টোকেনটি পান
};

// এটি আপনার প্রধান API কল করার ফাংশন
const api = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // যদি টোকেন থাকে, তবে রিকোয়েস্টে 'Authorization' হেডার যোগ করুন
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  // যদি body থাকে (POST, PUT রিকোয়েস্টের জন্য), তবে JSON.stringify করুন
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // যদি সার্ভার 4xx বা 5xx এরর দেয়
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    // যদি রিকোয়েস্ট সফল হয় (যেমন DELETE রিকোয়েস্ট যার কোনো body নেই)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return null; // কোনো ডেটা নেই
    }

    // সফল রিকোয়েস্টের JSON ডেটা ফেরত দিন
    return await response.json();
  } catch (err) {
    console.error(`API call failed for ${endpoint}:`, err);
    throw err;
  }
};

export default api;