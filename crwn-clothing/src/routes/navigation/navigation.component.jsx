
import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import "./navigation.styles.scss"
import { UserContext } from "../../contexts/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components"
import { CartContext } from "../../contexts/cart.context"
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
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}> SIGN OUT</span>
                        ) : (
                            <Link className="nav-link" to="/auth">
                                SIGN IN
                            </Link>
                        )
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation