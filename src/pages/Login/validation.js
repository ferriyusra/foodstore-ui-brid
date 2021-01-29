const rules = {
    email: {
        required: {
            value: true, message: 'Email tidak boleh kosong.'
        },
        maxLength: {
            value: 100, message: 'Panjang email maksimal 100 karakter'
        }
    },
    password: {
        required: {
            value: true, message: 'Password tidak boleh kosong.'
        },
        maxLength: {
            value: 16, message: 'Panjang password maksimal 16 karakter.'
        }
    }

}

export { rules }