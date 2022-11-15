import "./category.styles.jsx"
import { useParams } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import ProductCard from "../../components/product-card/product-card.component"
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx"
import { useSelector } from "react-redux"
import { selectCategories } from "../../store/categories/categories.selector.js"

const Category = () => {
    const { category } = useParams()

    console.log("render/re-rendering category component")
    //useelectors run regardless of the reducer targeted
    const categoriesMap = useSelector(selectCategories)

    const [products, setProducts] = useState(categoriesMap[category])



    useEffect(() => {
        console.log("effect fired calling setProducts")
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {
                    products && products.map(product => (<ProductCard key={product.id} product={product} />))
                }
            </CategoryContainer>
        </>

    )
}

export default Category