import React from 'react'

import { getAddress } from '../api/address'


const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}


export function useAddressData() {
    let [data, setData] = React.useState([])
    let [count, setCount] = React.useState(0)
    let [status, setStatus] = React.useState(statusList.idle)
    let [page, setPage] = React.useState(1)
    let [limit, setLimit] = React.useState(10)

    //  bungkus di dalam React.useCallback
    let fetchAddress = React.useCallback(async function () {
        // ubah status menjadi proses
        setStatus(statusList.process)

        // request data alamat pengiriman dari web API
        let { data: { data, count, error } } = await getAddress({ page, limit })

        // cek apakah terdapat error dari respon server
        if (error) {
            setStatus(statusList.error)
            return
        }

        //  data alamat pengiriman berhasil didapatkan
        setStatus(statusList.success)
        setData(data)
        setCount(count)
    }, [page, limit])

    // panggil `fetchAddress`, sudah aman untuk disave.
    React.useEffect(() => {
        fetchAddress();
    }, [fetchAddress]);


    //  kembalikan saja state lokal yang sudah kita buat
    return {
        data,
        count,
        status,
        page,
        limit,
        setPage,
        setLimit
    }
}
