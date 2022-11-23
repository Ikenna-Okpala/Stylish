
import "./components/category-menu/category-menu.component"
import Home from "./routes/home/home.component"
import { Routes, Route } from "react-router-dom"
import Navigation from "./routes/navigation/navigation.component"
import Authentication from "./components/authentication/authentication.component"
//use this syntax when importing
import Shop from "./routes/shop/shop.component"
import Checkout from "./routes/checkout/checkout.component"

import { useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getCurrentUser } from "./utils/firebase/firebase.utils";

import { checkUserSession, setCurrentUser } from "./store/user/user.action"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()
  //take all your compoenent in an image
  //add style directly to html elementys using style object
  //routes registers the application as routable
  //parental component is going to render unless we tell it otherwise
  //nested routing
  //index = true tells router to use base elmenet when base uyrl is matched
  useEffect(() => {
    dispatch(checkUserSession())

  }, [])


  return (

    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index="true" element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />

      </Route>

    </Routes >


  )
}

export default App;
