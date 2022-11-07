import { createContext, useState, useEffect } from "react"
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils"

export const CategoriesContext = createContext({
    categories: {},
})

export const CategoriesProvider = ({ children }) => {

    const [categoriesMap, setCategoriesMap] = useState({})

    useEffect(() => {
        //async function should be created and calledc inside use effect
        //any async functioon creeated sghould cereatewd asnbd used inside use effect

        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap)
        }

        getCategoriesMap()
    }, [])

    const value = { categoriesMap }

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}