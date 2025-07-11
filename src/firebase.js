// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGQ6mYngDcFKu6h9TJC31oG0-QG_fLaXQ",
  authDomain: "netflix-clone-e894b.firebaseapp.com",
  projectId: "netflix-clone-e894b",
  storageBucket: "netflix-clone-e894b.firebasestorage.app",
  messagingSenderId: "748160422330",
  appId: "1:748160422330:web:bbc8ad165f8a68cf1f8d83",
  measurementId: "G-LKJJR5FJ6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);


const  signup = async (name, email, password) => {
    try{
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc (collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,

       });
    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}



const login = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);

    }
    catch(error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}



const logout = () => {
    signOut(auth);
}


export {auth, db, login, signup, logout};