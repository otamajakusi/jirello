import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBgaKuvfEiReOp7F3Q7rAgJkQ88zsbZ1rc",
  authDomain: "jirello.firebaseapp.com",
  databaseURL: "https://jirello.firebaseio.com",
  projectId: "jirello",
  storageBucket: "jirello.appspot.com",
  messagingSenderId: "311463575324"
};

firebase.initializeApp(config);

export default firebase;
