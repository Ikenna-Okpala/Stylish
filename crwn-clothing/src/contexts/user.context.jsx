import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
//as the actual value uou want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})
// afunctional component re renders whener it state changtes or whenever its props changes
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)

        })
        return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}