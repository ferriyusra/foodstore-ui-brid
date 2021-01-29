import React from 'react'

import { LayoutOne, Card, Text, Button } from 'upkit';
import { Link } from 'react-router-dom';


export default function RegisterSuccess() {

    return (
        <div className="mt-10">
            <LayoutOne size="small">
                <Card color="white">
                    <div className="text-center">
                        <Text as="h3">
                            Pendaftaran Akun Berhasil
                        </Text>
                        <Text>
                            Silahkan Masuk Aplikasi untuk mencoba
                        </Text>
                        <br />

                        <Link to="/login">
                            <Button
                                fitContainer
                            >
                                Masuk
                            </Button>
                        </Link>

                    </div>
                </Card>
            </LayoutOne>
        </div>

    )

}