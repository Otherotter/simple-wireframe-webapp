import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyD4b--HGaqimotqcAezEf29061vM2K-WSE",
  authDomain: "wireframe-316.firebaseapp.com",
  databaseURL: "https://wireframe-316.firebaseio.com",
  projectId: "wireframe-316",
  storageBucket: "wireframe-316.appspot.com",
  messagingSenderId: "936087584401",
  appId: "1:936087584401:web:8b34f2cf6458bda258c930",
  measurementId: "G-2JVRP2JH4P"
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
//firebase.analytics();

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;