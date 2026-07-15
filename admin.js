import { auth, db } from "../firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


// Hide page until admin is verified
document.body.style.display = "none";


onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }


  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);


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


  // Load current figures
  const settingsRef = doc(db, "settings", "platform");

  const settingsSnap = await getDoc(settingsRef);


  if (settingsSnap.exists()) {

    const settings = settingsSnap.data();


    document.getElementById("demoBalance").value =
      settings.demoBalance || 100;


    document.getElementById("demoProfit").value =
      settings.demoProfit || 0;

  }


  // Update button
  const updateBtn = document.getElementById("updateBtn");


  if (updateBtn) {

    updateBtn.addEventListener("click", async () => {


      const balance =
        Number(document.getElementById("demoBalance").value);


      const profit =
        Number(document.getElementById("demoProfit").value);



      await updateDoc(settingsRef, {

        demoBalance: balance,
        demoProfit: profit,
        updatedAt: new Date()

      });


      alert("Figures updated successfully.");

    });

  }


});
