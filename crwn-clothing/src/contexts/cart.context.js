import { createContext, useEffect, useState } from "react";

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
    cartCount: 0
})


export const CartProvider = ({ children }) => {


    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0
        )
        setCartCount(newCartCount)
    }, [cartItems])
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount }


    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
