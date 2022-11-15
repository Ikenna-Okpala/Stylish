import { createContext, useEffect, useState, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const clearCartItem = (cartItems, cartItem) => cartItems.filter(item => item.id !== cartItem.id)

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
}
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
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    removeItemInCart: () => { },
    clearItemFromCart: () => { },
    cartTotal: 0
})

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

//REDUCERS SHOULD NOT CONTAIN BUSINESS LOGIC
const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload.isCartOpen
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}
export const CartProvider = ({ children }) => {
    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0
        )
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0
        )

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount }))


    }
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const removeItemInCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (cartItem) => {
        const newCartItems = clearCartItem(cartItems, cartItem)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, { isCartOpen: bool }))
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemInCart,
        clearItemFromCart,
        cartTotal
    }

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
