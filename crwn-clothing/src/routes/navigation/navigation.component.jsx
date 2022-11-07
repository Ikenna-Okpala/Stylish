
import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { UserContext } from "../../contexts/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components"
import { CartContext } from "../../contexts/cart.context"

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./navigation.styles"
//Fragments are invisible 
//Link we use to leverage proper routing uusing the same broseer
const Navigation = () => {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext)
    const cartOnClickHandler = () => {
        console.log("Listening..")
    }

    const { currentUser } = useContext(UserContext)
    return (
        <Fragment>
            <NavigationContainer>

                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>

                <NavLinksContainer>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as="span" onClick={signOutUser}> SIGN OUT</NavLink>
                        ) : (
                            <NavLink to="/auth">
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinksContainer>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation