import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const googleBtn = document.getElementById("googleBtn");

const provider = new GoogleAuthProvider();

signupBtn.addEventListener("click", async () => {

  if (!email.value || !password.value) {
    alert("Please enter your email and password.");
    return;
  }

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      demoBalance: 100,
      demoProfit: 0,
      isAdmin: false,
      createdAt: new Date().toISOString()
    });

    alert("Account created successfully!");

    window.location.href = "dashboard.html";

  } catch (error) {

    alert(error.message);

  }

});

loginBtn.addEventListener("click", async () => {

  if (!email.value || !password.value) {
    alert("Please enter your email and password.");
    return;
  }

  try {

    await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    window.location.href = "dashboard.html";

  } catch (error) {

    alert(error.message);

  }

});

googleBtn.addEventListener("click", async () => {

  try {

    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const userRef = doc(db, "users", user.uid);

    const snap = await getDoc(userRef);

    if (!snap.exists()) {

      await setDoc(userRef, {
        email: user.email,
        demoBalance: 100,
        demoProfit: 0,
        isAdmin: false,
        createdAt: new Date().toISOString()
      });

    }

    window.location.href = "dashboard.html";

  } catch (error) {

    alert(error.message);

  }

});
