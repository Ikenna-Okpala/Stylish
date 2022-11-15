
import { createSelector } from "reselect"

const selectCategoryReducer = (state) => {
    return state.categories

}

export const selectCategoriesMem = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        return categoriesSlice.categories
    }
)
export const selectCategories = createSelector(
    [selectCategoriesMem],
    (categories) => {
        return categories.reduce((acc, category) => {
            const { title, items } = category
            //setting key value pairs for object
            acc[title.toLowerCase()] = items
            return acc
        }, {})
    }

)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categorySlice) => categorySlice.isLoading
)