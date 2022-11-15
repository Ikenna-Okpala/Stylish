import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const clearCartItem = (cartItems, cartItem) => cartItems.filter(item => item.id !== cartItem.id)
const removeCartItem = (cartItems, targetItem) => {
    let newCart

    if (targetItem.quantity <= 1) {
        newCart = [...cartItems]
        const index = newCart.indexOf(targetItem)
        newCart.splice(index, 1)
    }
    else {
        newCart = cartItems.map((cartItem) => {
            return cartItem.id === targetItem.id ? { ...targetItem, quantity: targetItem.quantity - 1 } : cartItem
        })
    }

    return newCart
}
const addCartItem = (cartItems, productToAdd) => {
    let newCart
    const item = cartItems.find(product => {
        return product.id === productToAdd.id
    })

    if (item) {
        newCart = cartItems.map((product) => {
            return product.id === productToAdd.id ? { ...product, quantity: product.quantity + 1 } : product
        })
    }
    else {
        newCart = [...cartItems, { ...productToAdd, quantity: 1 }]
    }

    return newCart
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemInCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, cartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItem)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)