
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBftiakQv5z0uzIIW4Hi_wsdW5ahW4voZ4",
  authDomain: "bitionvest-5f8dd.firebaseapp.com",
  projectId: "bitionvest-5f8dd",
  storageBucket: "bitionvest-5f8dd.firebasestorage.app",
  messagingSenderId: "698492831473",
  appId: "1:698492831473:web:28634757eb906952498b50"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
