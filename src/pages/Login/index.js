import React from 'react'
import {
    InputText, InputPassword, Button, FormControl, Card,
    LayoutOne
} from 'upkit';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { userLogin } from '../../features/Auth/actions';


import StoreLogo from '../../components/StoreLogo';
import { rules } from './validation'
import { login } from '../../api/auth'

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}


export default function Login() {

    const { register, handleSubmit, errors, setError } = useForm()
    const [status, setStatus] = React.useState(statusList.idle)
    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit = async ({ email, password }) => {
        //  fungsi untuk menangani submit form
        setStatus(statusList.process)

        //  kirim data ke Web API menggunakan helper `login`
        let { data } = await login(email, password)

        // cek apakah server mengembalikan error
        if (data.error) {
            // tangani error bertipe 'invalidCredential'
            setError('password', { type: 'invalidCredential', message: data.message })

            // set status menjadi error
            setStatus(statusList.error)
        } else {

            // berhasil login

            // ambil data `user` dan `token` dari respon server
            let { user, token } = data

            // dispatch ke Redux store, action `userLogin` dengan data `user` dan `token`
            dispatch(userLogin(user, token))

            // redirect ke halaman home
            history.push('/')
        }
        setStatus(statusList.success)

    }

    return (
        <div className="mt-10">
            <LayoutOne size="small">
                <br />
                <Card color="white">
                    <div className="text-center mb-5">
                        <StoreLogo />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl errorMessage={errors.email?.message}>
                            <InputText
                                placeholder="email"
                                fitContainer
                                name="email"
                                ref={register(rules.email)}
                            />
                        </FormControl>
                        <FormControl errorMessage={errors.password?.message}>
                            <InputPassword
                                placeholder="password"
                                name="password"
                                fitContainer
                                ref={register(rules.password)}
                            />
                        </FormControl>
                        <Button
                            color="blue"
                            fitContainer
                            size="large"
                            disabled={status ===
                                'process'}>
                            Login
                        </Button>
                    </form>

                    <div className="text-center mt-2">
                        Belum punya akun? <Link to="/register"><b>Daftar sekarang.</b></Link>
                    </div>
                </Card>
            </LayoutOne>
        </div>
    )

}
