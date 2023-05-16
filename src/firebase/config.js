import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB_4oQ0IYi0hqubL2cI_dp5QHS7dWsxOJQ",
  authDomain: "job-listing-f48a1.firebaseapp.com",
  projectId: "job-listing-f48a1",
  storageBucket: "job-listing-f48a1.appspot.com",
  messagingSenderId: "962887465375",
  appId: "1:962887465375:web:cdae243c3269d4aba1a5aa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
export { firebase, firestore };
