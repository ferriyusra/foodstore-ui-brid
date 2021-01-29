import React from 'react'

import { LayoutOne, Card, FormControl, InputText, InputPassword, Button } from 'upkit'

export default function Register() {
    return (
        <div className="mt-10">
            <LayoutOne size="small">
                <Card color="white">
                    <form>
                        <FormControl>
                            <InputText
                                name="full_name"
                                placeholder="Masukkan Nama Lengkap..."
                                fitContainer
                            />
                        </FormControl>

                        <FormControl>
                            <InputText
                                name="email"
                                placeholder="Masukkan Alamat Email..."
                                fitContainer
                            />
                        </FormControl>

                        <FormControl>
                            <InputPassword
                                name="password"
                                placeholder="Masukkan Password..."
                                fitContainer
                            />
                        </FormControl>

                        <FormControl>
                            <InputPassword
                                name="password_confirmation"
                                placeholder="Masukkan Konfirmasi Password..."
                                fitContainer
                            />
                        </FormControl>

                        <Button
                            size="large"
                            color="blue"
                            fitContainer
                        >Daftar</Button>

                    </form>
                </Card>

            </LayoutOne>
        </div>
    )
}