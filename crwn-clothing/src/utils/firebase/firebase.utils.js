import { initializeApp } from "firebase/app"
import {
    signOut,
    signInWithEmailAndPassword,
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth"

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from "firebase/firestore"

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey)

    //transaction is successful unit of work

    const batch = writeBatch(db)

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase())

        batch.set(docRef, object)
    })

    await batch.commit()

    console.log("Done")


}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories")

    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data()
        //setting key value pairs for object
        acc[title.toLowerCase()] = items
        return acc
    }, {})

    return categoryMap
}
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

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (authCallBack) => onAuthStateChanged(auth, authCallBack)