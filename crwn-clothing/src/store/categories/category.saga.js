
import { takeLatest, all, call, put } from "redux-saga/effects"

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"

import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./categories.actions"

import { CATEGORIES_ACTION_TYPE } from "./categories.types"

export function* fetchCategoriesAsync() {

    try {
        //effect
        const categoriesArray = yield call(getCategoriesAndDocuments)
        yield put(fetchCategoriesSuccess(categoriesArray))
    }
    catch (error) {
        yield put(fetchCategoriesFailed(error))
    }

}

export function* onFetchCategories() {
    //receive actions
    yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}