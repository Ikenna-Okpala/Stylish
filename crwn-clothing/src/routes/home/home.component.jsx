
import CategoryMenu from "../../components/category-menu/category-menu.component"
import { Outlet } from "react-router-dom"
//use this syntax when importing
const Home = () => {



    //take all your compoenent in an image
    //add style directly to html elementys using style object



    return (
        <div>

            <CategoryMenu />
            <Outlet />
        </div>

    )
}

export default Home;
