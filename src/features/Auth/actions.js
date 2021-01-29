// import constant
import { USER_LOGIN, USER_LOGOUT } from './constants'

// action userLogin
export function userLogin(user, token) {
    return {
        type: USER_LOGIN,
        user,
        token
    }
}

// action userLogout
export function userLogout() {
    return {
        type: USER_LOGOUT
    }
}