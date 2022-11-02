import { createContext, useEffect, useState } from "react";

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


export const CartProvider = ({ children }) => {


    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0
        )
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0
        )
        setCartTotal(newCartTotal)
    }, [cartItems])
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemInCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const clearItemFromCart = (cartItem) => {
        setCartItems(clearCartItem(cartItems, cartItem))
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
