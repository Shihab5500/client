

// import { getAuth } from 'firebase/auth';


// // const API_BASE_URL = 'https://server-five-brown-34.vercel.app';

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";



// const getAuthToken = async () => {
//   const user = getAuth().currentUser;
//   if (!user) return null;
//   return await user.getIdToken(true); 
// };


// const api = async (endpoint, options = {}) => {
//   const token = await getAuthToken();
  
//   const headers = {
//     'Content-Type': 'application/json',
//     ...options.headers,
//   };

  
//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   const config = {
//     ...options,
//     headers,
//   };

  
//   if (options.body) {
//     config.body = JSON.stringify(options.body);
//   }

//   try {
//     const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Something went wrong');
//     }

    
//     if (response.status === 204 || response.headers.get('content-length') === '0') {
//       return null; // 
//     }

    
//     return await response.json();
//   } catch (err) {
//     console.error(`API call failed for ${endpoint}:`, err);
//     throw err;
//   }
// };

// export default api;



import { getAuth } from "firebase/auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getAuthToken = async () => {
  const user = getAuth().currentUser;
  if (!user) return null;
  return await user.getIdToken(true);
};

const api = async (endpoint, options = {}) => {
  const token = await getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const config = { ...options, headers };

  if (options.body) config.body = JSON.stringify(options.body);

  const res = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // better error handling (json or text)
  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    const errBody = contentType.includes("application/json")
      ? await res.json().catch(() => ({}))
      : await res.text().catch(() => "");
    throw new Error(errBody?.message || errBody || "Request failed");
  }

  if (res.status === 204) return null;

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return await res.json();
  return await res.text();
};

export default api;
