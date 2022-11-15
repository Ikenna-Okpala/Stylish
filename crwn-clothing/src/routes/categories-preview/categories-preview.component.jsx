
import { useContext } from "react"
import CategoryPreview from "../../components/category-preview/category-preview.component"
import { useSelector } from "react-redux"
import { selectCategories } from "../../store/categories/categories.selector"
const CategoriesPreview = () => {
    //SHORTHAND FOR FRAGMENT <>
    //const { categoriesMap } = useContext(CategoriesContext)
    const categoriesMap = useSelector(selectCategories)
    return (
        <>
            {
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title]
                    return <CategoryPreview key={title} title={title} products={products} />
                }

                )
            }
        </>

    )
}

export default CategoriesPreview