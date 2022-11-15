import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Routes, Route } from "react-router-dom"
import { setCategories, setCategoriesMap } from "../../store/categories/categories.actions"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"
const Shop = () => {

    const dispatch = useDispatch()
    //SHORTHAND FOR FRAGMENT <>
    useEffect(() => {
        //async function should be created and calledc inside use effect
        //any async functioon creeated sghould cereatewd asnbd used inside use effect

        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments()
            console.log(categoriesArray)
            dispatch(setCategories(categoriesArray))
        }

        getCategoriesMap()
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    )
}

export default Shop