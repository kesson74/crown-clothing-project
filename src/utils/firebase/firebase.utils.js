import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  FireStore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDq2zidgyGdpAXMQx1zGA5eng4l31v5nck",
  authDomain: "crown-clothing-db-96909.firebaseapp.com",
  projectId: "crown-clothing-db-96909",
  storageBucket: "crown-clothing-db-96909.appspot.com",
  messagingSenderId: "263480500695",
  appId: "1:263480500695:web:0efad9cdfef88bbf17eb92",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signinWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  console.log('userAuth.user.uid',  userAuth.uid);
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log("userDocRef", userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {displayName, email, createdAt});
    } catch (error) {
        console.log('Error creating the user', error.message);
    }
  }
  return userDocRef;
};
