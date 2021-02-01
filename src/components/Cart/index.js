import React from 'react'
import { arrayOf, string, shape, oneOfType, number, func } from 'prop-types';
import {
    CardItem,
    CardInfo
} from 'upkit';
import { config } from '../../config';


export default function Cart({ items, onItemInc, onItemDec }) {
    return (
        <div>
            {!items.length ? <div className="text-center text-sm text-blue-900">
                <div className="mx-5 my-5">
                    <CardInfo title="Belum ada item di keranjang" />
                </div>
            </div> : null}
            <div className="p-2">
                {items.map((item, index) => {
                    return <div key={index} className="mb-2">
                        <CardItem
                            imgUrl={`${config.api_host}/upload/${item.image_url}`}
                            name={item.name}
                            qty={item.qty}
                            color="blue"
                            onInc={_ => onItemInc(item)}
                            onDec={_ => onItemDec(item)}
                        />
                    </div>
                })}
            </div>
        </div>
    )
}

Cart.propTypes = {
    items: arrayOf(shape({
        _id: string.isRequired,
        name: string.isRequired,
        qty: oneOfType([string, number]).isRequired
    })),
    onItemInc: func,
    onItemDec: func
}
