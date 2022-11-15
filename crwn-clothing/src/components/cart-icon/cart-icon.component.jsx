import "./cart-icon.styles.jsx"

import { CartIconContainer, ItemCount, ShoppingIconImg } from "./cart-icon.styles.jsx"
import { useDispatch, useSelector } from "react-redux"
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector.js"
import { setIsCartOpen } from "../../store/cart/cart.actions.js"

const CartIcon = () => {

    const dispatch = useDispatch()
    const isCartOpen = useSelector(selectIsCartOpen)
    const cartCount = useSelector(selectCartCount)

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

    return (

        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconImg />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon