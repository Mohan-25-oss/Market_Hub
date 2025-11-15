// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnY6PIwhX-LhhlkIjCHY-9ziqAOG9QhQU",
  authDomain: "marketplace-838d4.firebaseapp.com",
  projectId: "marketplace-838d4",
  storageBucket: "marketplace-838d4.firebasestorage.app",
  messagingSenderId: "160916657827",
  appId: "1:160916657827:web:9ea37514b6580a14ffd116",
  measurementId: "G-LRN73GZ254"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();

// Default export
export default app;
