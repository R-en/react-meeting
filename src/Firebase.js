import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyCPSVNUCHl0nSw7deDFs45ua4Ztd-U24Y8",
    authDomain: "react-spas-12013.firebaseapp.com",
    databaseURL: "https://react-spas-12013.firebaseio.com",
    projectId: "react-spas-12013",
    storageBucket: "react-spas-12013.appspot.com",
    messagingSenderId: "457768478521"
  };

  firebase.initializeApp(config);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

  export default firebase;