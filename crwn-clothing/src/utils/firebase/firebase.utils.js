import { initializeApp } from "firebase/app"
import { signInWithEmailAndPassword, getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCDpGfW9PNGVFCY9tSzRFcinSCAUgwrflo",
    authDomain: "crwn-clothing-db-39b21.firebaseapp.com",
    projectId: "crwn-clothing-db-39b21",
    storageBucket: "crwn-clothing-db-39b21.appspot.com",
    messagingSenderId: "349009185082",
    appId: "1:349009185082:web:20d75b18172980f1d9a803"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//many providers
const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: "select_account"
})

//only one authentication needed
export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return
    const userDocRef = doc(db, "users", userAuth.uid)


    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        }
        catch (error) {
            console.log("Error creating user", error)
        }
    }

    //if user data does not exist
    //create user
    //else return doc

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password)
}
