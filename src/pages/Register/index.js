import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, Link } from 'react-router-dom';


import { LayoutOne, Card, FormControl, InputText, InputPassword, Button } from 'upkit'
import { rules } from './validation'

import { registerUser } from '../../api/auth'
import StoreLogo from '../../components/StoreLogo'

// statusList
const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

export default function Register() {

    // keluarkan fungsi `register`, `handleSubmit`, `errors`, `setError` dari `useForm
    let { register, handleSubmit, errors, setError } = useForm()

    //  state status dengan nilai default `statuslist.idle`
    let [status, setStatus] = React.useState(statusList.idle)

    let history = useHistory();


    //  definisikan fungsi onSubmit untuk menangani submit form
    const onSubmit = async formData => {

        // validasi email
        // let { email } = formData
        // if (email === fields.email) {
        //     return setError('email', { type: 'equal', message: 'Email telah terdaftar' })
        // }

        // dapatkan variabel password dan password_confirmation
        let { password, password_confirmation } = formData

        // cek password dengan konfirmasi password
        if (password !== password_confirmation) {
            return setError('password_confirmation', { type: 'equality', message: 'Konfirmasi password harus sama dengan password' })
        }

        // set status = process
        setStatus(statusList.process)

        let { data } = await registerUser(formData)

        // cek apakah ada error
        if (data.error) {
            // dapatkan field terkait jika ada errors
            let fields = Object.keys(data.fields)

            // untuk masing-masing field kita terapkan error dan tangkap pesan errornya
            fields.forEach(field => {
                setError(field, {
                    type: 'server',
                    message:
                        data.fields[field]?.properties?.message
                })
            });
            setStatus(statusList.error);
        }
        setStatus(statusList.success);
        history.push('/register/berhasil');
    }
    return (
        <div className="mt-10">
            <LayoutOne size="small">
                <Card color="white">
                    {/* gunakan onSubmit dengan terlebih dahulu dimasukan dalam handleSubmit */}
                    <div className="text-center mb-5">
                        <StoreLogo />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* gunakan prop `errorMessage` untuk menampilkan pesan error jika ada */}
                        <FormControl errorMessage={errors.full_name?.message}>
                            <InputText
                                name="full_name"
                                placeholder="Masukkan Nama Lengkap..."
                                fitContainer
                                // {/* pasang validasi `full_name` */}
                                ref={register(rules.full_name)}
                            />
                        </FormControl>


                        <FormControl errorMessage={errors.email?.message}>
                            <InputText
                                name="email"
                                placeholder="Masukkan Alamat Email..."
                                fitContainer
                                // {/* gunakan ref={register(rules.email)} */}
                                ref={register(rules.email)}
                            />
                        </FormControl>


                        <FormControl errorMessage={errors.password?.message}>
                            <InputPassword
                                name="password"
                                placeholder="Masukkan Password..."
                                fitContainer
                                // {/* gunakan ref={register(rules.password)} */}
                                ref={register(rules.password)}
                            />
                        </FormControl>


                        <FormControl errorMessage={errors.password_confirmation?.message}>
                            <InputPassword
                                name="password_confirmation"
                                placeholder="Masukkan Konfirmasi Password..."
                                fitContainer
                                // {/* gunakan ref={register(rules.password_confirmation)} */}
                                ref={register(rules.password_confirmation)}
                            />
                        </FormControl>

                        <Button
                            size="large"
                            color="blue"
                            fitContainer
                            disabled={status === statusList.process}
                        > {status === statusList.process ? "Sedang memproses" : "Daftar"}
                        </Button>

                    </form>

                    <div className="text-center mt-2">
                        Sudah punya akun? <Link to="/login"> <b> Masuk Sekarang. </b> </Link>
                    </div>

                </Card>

            </LayoutOne>
        </div>
    )
}

