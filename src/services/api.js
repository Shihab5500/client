

import { getAuth } from 'firebase/auth';


const API_BASE_URL = 'https://server-five-brown-34.vercel.app';


const getAuthToken = async () => {
  const user = getAuth().currentUser;
  if (!user) return null;
  return await user.getIdToken(true); 
};

// এটি প্রধান API কল করার ফাংশন
const api = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  
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
      return null; // 
    }

    
    return await response.json();
  } catch (err) {
    console.error(`API call failed for ${endpoint}:`, err);
    throw err;
  }
};

export default api;