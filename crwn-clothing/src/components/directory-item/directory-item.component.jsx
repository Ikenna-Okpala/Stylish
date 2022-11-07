import "./directory-item.styles.jsx"
import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles.jsx";
import { useNavigate } from "react-router-dom";
export const DirectoryItem = ({ category }) => {

    const navigate = useNavigate()

    const onNavigationHandler = () => navigate(route)

    const { imageUrl, title, route } = category
    return (
        <DirectoryItemContainer onClick={onNavigationHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
};
