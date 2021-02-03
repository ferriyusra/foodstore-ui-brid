import React from 'react'
import { Link } from 'react-router-dom';

import { LayoutOne, Text, Table, Button } from 'upkit';
import TopBar from '../../components/TopBar';
import { useAddressData } from '../../hooks/address';

const columns = [
    {
        Header: 'Nama',
        accessor: 'nama'
    },
    {
        Header: 'Detail',
        accessor: alamat => {
            return <div>
                {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan}, {alamat.kelurahan} <br />
                {alamat.detail}
            </div>
        }
    },
]

export default function UserAddress() {

    let {
        data,
        limit,
        page,
        status,
        count,
        setPage,
    } = useAddressData()



    return (
        <LayoutOne size="large">
            <div>
                <TopBar />
                <div className="mt-5">
                    <Text as="h3">Alamat Pengiriman</Text>
                </div>
                <br />
                <Link to="alamat-pengiriman/tambah">
                    <Button>
                        Tambah baru
                </Button>
                </Link>
                <br />
                <br />

                {status === 'success' && !data.length ? <div className="text-center p-10">
                    Kamu belum memiliki alamat pengiriman. <br />
                    <Link to="/alamat-pengiriman/tambah">
                        <Button>
                            Tambah Baru
                    </Button>
                    </Link>
                </div> : <Table
                        items={data}
                        columns={columns}
                        totalItems={count}
                        page={page}
                        isLoading={status === 'process'}
                        perPage={limit}
                        onPageChange={page => setPage(page)}
                    />
                }
            </div>

        </LayoutOne>
    )
}
