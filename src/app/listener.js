import store from './store'

// definisikan variabel tanpa nilai awal 
let currentAuth

// mendefenisikan fungsi listener
function listener() {
    // buat variabel previousAuth dan berikan currentAuth sebagai nilai
    let previousAuth = currentAuth

    // update nilai currentAuth dari nilai state terbaru 
    currentAuth = store.getState().auth

    //  cek apakah nilai state `auth` berubah dari nilai sebelumnya 
    if (currentAuth !== previousAuth) {

        //  jika berubah simpan ke localStorage
        localStorage.setItem('auth', JSON.stringify(currentAuth))

    }

}


// buat fungsi listen
function listen() {

    // dengarkan perubahan store
    store.subscribe(listener)

}


// export fungsi listen supaya bisa digunakan di file lain 
export { listen }