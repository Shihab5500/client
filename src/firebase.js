

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDnW-sal7-T1WGYRWGIEuTm9Ab_kURU49s",
  authDomain: "clean-city-client.firebaseapp.com",
  projectId: "clean-city-client",
  storageBucket: "clean-city-client.firebasestorage.app",
  messagingSenderId: "418136589595",
  appId: "1:418136589595:web:79a59e3b07ef3984027fbe"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);