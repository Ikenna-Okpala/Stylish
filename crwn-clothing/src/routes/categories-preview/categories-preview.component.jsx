
import { useContext } from "react"
import CategoryPreview from "../../components/category-preview/category-preview.component"
import { useSelector } from "react-redux"
import { selectCategories, selectCategoriesIsLoading } from "../../store/categories/categories.selector"
import Spinner from "./../../components/spinner/spinner.component"
const CategoriesPreview = () => {
    //SHORTHAND FOR FRAGMENT <>
    //const { categoriesMap } = useContext(CategoriesContext)
    const categoriesMap = useSelector(selectCategories)

    const isLoading = useSelector(selectCategoriesIsLoading)
    return (
        <>
            {
                isLoading ? <Spinner /> :
                    (Object.keys(categoriesMap).map(title => {
                        const products = categoriesMap[title]
                        return <CategoryPreview key={title} title={title} products={products} />
                    }

                    ))
            }
        </>

    )
}

export default CategoriesPreview