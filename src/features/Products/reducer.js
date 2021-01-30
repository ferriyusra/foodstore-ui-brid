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

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

const initialState = {
    data: [],
    currentPage: 1,
    totalItems: -1,
    perPage: 6,
    keyword: '',
    category: '',
    tags: [],
    status: statusList.idle
}

export default function reducer(state = initialState, action) {

    switch (action.type) {

        // tangani `START_FETCHING_PRODUCT`
        case START_FETCHING_PRODUCT:
            return { ...state, status: statusList.process, data: [] }

        // tangani `ERROR_FETCHING_PRODUCT`
        case ERROR_FETCHING_PRODUCT:
            return { ...state, status: statusList.error }

        // tangani `SUCCESS_FETCHING_PRODUCT`
        case SUCCESS_FETCHING_PRODUCT:
            return { ...state, data: action.data, totalItems: action.count, status: statusList.success }

        // menentukan halaman yang aktif
        case SET_PAGE:
            return { ...state, currentPage: action.currentPage }

        // menentukan keyword filter
        case SET_KEYWORD:
            return { ...state, keyword: action.keyword, category: '', tags: [] }

        // menentukan kategori produk yang aktif
        case SET_CATEGORY:
            return { ...state, currentPage: 1, tags: [], category: action.category, keyword: '' }

        // menentukan tags yang aktif
        case SET_TAGS:
            return { ...state, tags: action.tags }

        // menentukan toggle tag
        case TOGGLE_TAG:
            if (!state.tags.includes(action.tag)) {
                return { ...state, currentPage: 1, tags: [...state.tags, action.tag] }
            } else {
                return { ...state, currentPage: 1, tags: state.tags.filter(tag => tag !== action.tag) }
            }
        // menentukan action halaman berikutnya
        case NEXT_PAGE:
            return { ...state, currentPage: state.currentPage + 1 }

        // menentukan action halaman sebelumnya
        case PREV_PAGE:
            return { ...state, currentPage: state.currentPage - 1 }

        default:
            return state;
    }

}