import "./cart-icon.styles.jsx"

import { CartContext } from "../../contexts/cart.context"
import { useContext } from "react"
import { CartIconContainer, ItemCount, ShoppingIconImg } from "./cart-icon.styles.jsx"

const CartIcon = () => {

    const { setIsCartOpen, isCartOpen, cartCount } = useContext(CartContext)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return (

        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconImg />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon