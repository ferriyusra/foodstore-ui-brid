import React from 'react'
import axios from 'axios'
import { oneOf, number, oneOfType, string, func, shape } from 'prop-types';
import { config } from '../../config'
import { Select } from 'upkit';

export default function SelectWilayah({ tingkat, kodeInduk, onChange, value }) {
    // definisikan state lokal
    let [data, setData] = React.useState([])
    let [isFetching, setIsFetching] = React.useState(false)

    // dapatkan data wilayah dari web API
    React.useEffect(() => {

        setIsFetching(true)

        axios.get(`${config.api_host}/api/wilayah/${tingkat}?kode_induk=${kodeInduk}`)
            .then(({ data }) => {
                if (!data.error) {
                    setData(data)
                }
            })
            .finally(_ => setIsFetching(false))
    }, [kodeInduk, tingkat])

    return <Select
        options={data.map(wilayah => ({ label: wilayah.nama, value: wilayah.kode }))}
        onChange={onChange}
        value={value}
        isLoading={isFetching}
        isDisabled={isFetching || !data.length}
    />


}

SelectWilayah.defaultProps = {
    tingkat: 'provinsi'
}

SelectWilayah.propTypes = {
    tingkat: oneOf(['provinsi', 'kabupaten', 'kecamatan', 'desa']),
    kodeInduk: oneOfType([number, string]),
    onChange: func,
    value: shape({ label: string, value: oneOfType([string, number]) })
}