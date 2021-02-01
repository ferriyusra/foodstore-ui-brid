import store from './store'

import { saveCart } from '../api/cart'

// definisikan variabel tanpa nilai awal 
let currentAuth

let currentCart

// mendefenisikan fungsi listener
function listener() {
    // buat variabel previousAuth dan berikan currentAuth sebagai nilai
    let previousAuth = currentAuth

    let previousCart = currentCart

    // update nilai currentAuth dari nilai state terbaru 
    currentAuth = store.getState().auth

    // update nilai currentCArt dari nilai state terbaru 
    currentCart = store.getState().cart

    let { token } = currentAuth

    //  cek apakah nilai state `auth` berubah dari nilai sebelumnya 
    if (currentAuth !== previousAuth) {
        //  jika berubah simpan ke localStorage
        localStorage.setItem('auth', JSON.stringify(currentAuth))

        // saveCart saat `auth` berubah
        saveCart(token, currentCart)
    }

    // apakah nilai state cart berubah
    if (currentCart !== previousCart) {
        // simpan state cart ke Local Storage
        localStorage.setItem('cart', JSON.stringify(currentCart))

        //  saveCart saat `cart` berubah
        saveCart(token, currentCart)

    }


}


// buat fungsi listen
function listen() {

    // dengarkan perubahan store
    store.subscribe(listener)

}


// export fungsi listen supaya bisa digunakan di file lain 
export { listen }