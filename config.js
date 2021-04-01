import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDM8losWtBz-pjOyDiEwW3bWINAfyLql5U",
    authDomain: "barter-system-687f9.firebaseapp.com",
    projectId: "barter-system-687f9",
    storageBucket: "barter-system-687f9.appspot.com",
    messagingSenderId: "656721397667",
    appId: "1:656721397667:web:51cd8a518f6be920e13c16"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();