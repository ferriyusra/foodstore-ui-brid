// import constant
import { USER_LOGIN, USER_LOGOUT } from './constants'

// action userLogin
export default function userLogin(user, token) {
    return {
        type: USER_LOGIN,
        user,
        token
    }
}

// action userLogout
export default function userLogout() {
    return {
        type: USER_LOGOUT
    }
}