// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { RouterProvider } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// import router from './router';
// import './styles/global.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <HelmetProvider>
//       <RouterProvider router={router} />
//     </HelmetProvider>
//   </React.StrictMode>
// );



import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AuthProvider } from './hooks/useAuth'; // <-- এখান থেকে নাও
import router from './router';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
