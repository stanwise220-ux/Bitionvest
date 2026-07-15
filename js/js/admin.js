import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));

  if (!snap.exists()) {
    window.location.href = "dashboard.html";
    return;
  }

  const data = snap.data();

  if (!data.isAdmin) {
    alert("Access denied.");
    window.location.href = "dashboard.html";
    return;
  }

  document.body.style.display = "block";

});
