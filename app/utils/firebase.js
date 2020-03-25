import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBRXfHaGBKJjxBN5JnTA6OEFtAD450ZDz0",
  authDomain: "tenedores-b79eb.firebaseapp.com",
  databaseURL: "https://tenedores-b79eb.firebaseio.com",
  projectId: "tenedores-b79eb",
  storageBucket: "tenedores-b79eb.appspot.com",
  messagingSenderId: "670425660206",
  appId: "1:670425660206:web:8c41b3599f11614f5318bf"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);