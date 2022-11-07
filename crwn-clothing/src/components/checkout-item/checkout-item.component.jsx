import { useContext } from "react"
import "./checkout-item.styles.jsx"

import { CartContext } from "../../contexts/cart.context"
import { Arrow, CheckoutItemContainer, ImageContainer, Img, Name, Price, Quantity, RemoveButton, Value } from "./checkout-item.styles.jsx"

const CheckoutItem = ({ cartItem }) => {

    const { clearItemFromCart, addItemToCart, removeItemInCart } = useContext(CartContext)

    const clearItemHandler = () => clearItemFromCart(cartItem)
    const { name, imageUrl, price, quantity } = cartItem
    const addItemHandler = () => addItemToCart(cartItem)
    const removeItemHandler = () => removeItemInCart(cartItem)
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