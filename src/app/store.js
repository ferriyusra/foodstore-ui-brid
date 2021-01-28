// import module dari redux
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'

// import readux-thunk middleware
import thunk from 'redux-thunk'

// buat composer enhancer untuk menghubungkan dengan chrome devTools Redux
import authReducer from '../features/Auth/reducer'

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// import reducer auth

// gabung reducer, untuk sementara kosong, karena kita belum membuat reducer
const rootReducers = combineReducers({
    auth: authReducer
})

// buat store dan gunakan composerEnhancer + middleware thunk
const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)))


// export store
export default store