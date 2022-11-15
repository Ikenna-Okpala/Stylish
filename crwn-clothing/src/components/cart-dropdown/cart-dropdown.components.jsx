import "./cart-dropdown.styles.jsx"
import Button from "./../button/button.component"
import CartItem from "../cart-item/cart-item.component"
import { useNavigate } from "react-router-dom"
import { CartDropDownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles.jsx"
import { useSelector } from "react-redux"
import { selectCartItems } from "../../store/cart/cart.selector.js"

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems)
    //console.log(cartItems)
    const navigate = useNavigate()

    const onCheckOutHandler = () => {
        navigate("/checkout")
    }
    return (
        <CartDropDownContainer>
            <CartItems>
                {
                    cartItems.length ? cartItems.map(item => (
                        <CartItem key={item.id} cartItem={item} />
                    )) : <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItems>
            <Button onClick={onCheckOutHandler}>GO TO CHECKOUT</Button>
        </CartDropDownContainer>
    )
}

export default CartDropdown