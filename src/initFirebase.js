import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import {getFirestore, collection, getDocs} from "@firebase/firestore";

// Configure Firebase.
//const config = {
 // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
 // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // Other configuration options, such as the Realtime Database / Firestore details...
//};

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwOkWBC-wDGVb2_aTPFQbO8hM58gFJUok",
  authDomain: "healthapp-23042.firebaseapp.com",
  projectId: "healthapp-23042",
  storageBucket: "healthapp-23042.appspot.com",
  messagingSenderId: "312027639734",
  appId: "1:312027639734:web:732735ab9352687f6d5b17"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function getUsers(){
  const userCollection = collection(db, 'User');
  const userSnapshot = await getDocs(userCollection);
  const userList = userSnapshot.docs.map(doc => doc.data());
  return userList
}

export async function getUserById(){
  //const userCollection = collection(db, 'User');
  //const userSnapshot = await getDocs(userCollection);
  //const userList = userSnapshot.docs.map(doc => doc.data());
  //return userList
}

export async function createUser(email,password){
 
   app.auth().createUserWithEmailAndPassword(email,password)
    .then(data => {  
       console.log("User ID :- ", data.user.uid);
       return true;
    })
    .catch(error => {
       console.log(error);
       return false;
    });
}

export async function getCurrentUser(){
  if(auth.getCurrentUser !== null){
    return auth.currentUser;
  }else{
    console.log("Couldn't find the current user..")
      return undefined;
  }
}

export async function updateCurrentUser(props){
  updateProfile(getCurrentUser, {
    displayName: props.displayName, photoURL: props.photoURL, 
  }).then(() => {
    // Profile updated!
    // ...
  }).catch((error) => {
    // An error occurred
    // ...
  });
}



