export const selectCategories = (state) => {

    console.log("selector fired")
    return state.categories.categories.reduce((acc, category) => {
        const { title, items } = category
        //setting key value pairs for object
        acc[title.toLowerCase()] = items
        return acc
    }, {})
}