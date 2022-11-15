import { useContext } from "react"
import "./checkout-item.styles.jsx"

import { Arrow, CheckoutItemContainer, ImageContainer, Img, Name, Price, Quantity, RemoveButton, Value } from "./checkout-item.styles.jsx"
import { useDispatch, useSelector } from "react-redux"
import { addItemToCart, clearItemFromCart, removeItemInCart } from "../../store/cart/cart.actions.js"
import { selectCartItems } from "../../store/cart/cart.selector.js"

const CheckoutItem = ({ cartItem }) => {

    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))
    const { name, imageUrl, price, quantity } = cartItem
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))
    const removeItemHandler = () => dispatch(removeItemInCart(cartItems, cartItem))
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <Img src={imageUrl} alt={`${name}`} />

            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem