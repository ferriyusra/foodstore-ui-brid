import debounce from 'debounce-promise'

import {
    START_FETCHING_PRODUCT,
    ERROR_FETCHING_PRODUCT,
    SUCCESS_FETCHING_PRODUCT,
    SET_PAGE,
    SET_CATEGORY,
    SET_KEYWORD,
    SET_TAGS,
    NEXT_PAGE,
    PREV_PAGE,
    TOGGLE_TAG
} from './constants'

import { getProducts } from '../../api/product'

// bungkus `getProducts` dengan `debounce`
let debouncedFetchProducts = debounce(getProducts, 1000)


export const fetchProducts = () => {
    return async (dispatch, getState) => {

        // dispatch `startFetchingProducts` menandakan _request_ produk dimulai
        dispatch(startFetchingProducts())

        let perPage = getState().products.perPage || 9
        let currentPage = getState().products.currentPage || 1
        let tags = getState().products.tags || []
        let keyword = getState().products.keyword || ''
        let category = getState().products.category || ''

        const params = {
            limit: perPage,
            skip: (currentPage * perPage) - perPage,
            q: keyword,
            tags,
            category
        }

        // menggunakan `getProducts` untuk mendapatkan data produk dari API
        try {
            // ubah `getProducts` menjadi `debouncedFetchProducts`
            let { data: { data, count } } = await debouncedFetchProducts(params);

            dispatch(successFetchingProducts({ data, count }))

        } catch (err) {

            // jika terjadi `error` 
            dispatch(errorFetchingProducts())

        }

    }
}


export const startFetchingProducts = () => {
    return {
        type: START_FETCHING_PRODUCT
    }
}

export const successFetchingProducts = (payload) => {
    return {
        type: SUCCESS_FETCHING_PRODUCT,
        ...payload
    }
}

export const errorFetchingProducts = () => {
    return {
        type: ERROR_FETCHING_PRODUCT
    }
}


export const setPage = (number = 1) => {
    return {
        type: SET_PAGE,
        currentPage: number
    }
}

export const setKeyword = keyword => {
    return {
        type: SET_KEYWORD,
        keyword
    }
}

export const setCategory = category => {
    return {
        type: SET_CATEGORY,
        category
    }
}

export const setTags = tags => {
    return {
        type: SET_TAGS,
        tags
    }
}

export const toggleTag = tag => {
    return {
        type: TOGGLE_TAG,
        tag
    }
}

export const goToNextPage = () => {
    return {
        type: NEXT_PAGE
    }
}


export const goToPrevPage = () => {
    return {
        type: PREV_PAGE
    }
}