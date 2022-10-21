
import "./components/category-menu/category-menu.component"
import Home from "./routes/home/home.component"
import { Routes, Route } from "react-router-dom"
import Navigation from "./routes/navigation/navigation.component"
import Authentication from "./components/authentication/authentication.component"
//use this syntax when importing

const Shop = () => {
  return <h1>I am the shop page</h1>
}


const App = () => {

  //take all your compoenent in an image
  //add style directly to html elementys using style object
  //routes registers the application as routable
  //parental component is going to render unless we tell it otherwise
  //nested routing
  //index = true tells router to use base elmenet when base uyrl is matched

  return (

    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index="true" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />

      </Route>

    </Routes >


  )
}

export default App;
