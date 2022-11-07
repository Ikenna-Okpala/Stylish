
import Button, { BUTTON_TYPES_CLASSES } from "./../button/button.component"
import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"
import "./product-card.style.jsx"
import { Footer, Img, ProductCardContainer, Name, Price } from "./product-card.style.jsx"

const ProductCard = ({ product }) => {

    const { addItemToCart } = useContext(CartContext)
    const addProductToCart = () => addItemToCart(product)
    const { name, price, imageUrl } = product
    return (
        <ProductCardContainer>
            <Img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price >{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard