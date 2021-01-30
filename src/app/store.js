// import module dari redux
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'

// import readux-thunk middleware
import thunk from 'redux-thunk'

import authReducer from '../features/Auth/reducer'

import productReducer from '../features/Products/reducer'

// buat composer enhancer untuk menghubungkan dengan chrome devTools Redux
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// import reducer auth

// gabung reducer, untuk sementara kosong, karena kita belum membuat reducer
const rootReducers = combineReducers({
    auth: authReducer,

    // product reducer sebagai _state_ `products`
    products: productReducer
})

// buat store dan gunakan composerEnhancer + middleware thunk
const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)))


// export store
export default store