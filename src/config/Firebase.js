import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDDt9w-W8kKe1bLTcAR0fgc68MnSe4X0og",
  authDomain: "manage-bills-9fe1b.firebaseapp.com",
  databaseURL: "https://manage-bills-9fe1b-default-rtdb.firebaseio.com",
  projectId: "manage-bills-9fe1b",
  storageBucket: "manage-bills-9fe1b.appspot.com",
  messagingSenderId: "658814832620",
  appId: "1:658814832620:web:9d1a4b9459db9bc3c97ac9"
};

firebase.initializeApp(firebaseConfig)

export default firebase