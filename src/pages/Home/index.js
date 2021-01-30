import React from 'react'
import {
    SideNav,
    LayoutSidebar,
    Responsive,
    CardProduct
} from 'upkit'

import { useDispatch, useSelector } from 'react-redux';

import menus from './menus'
import TopBar from '../../components/TopBar'
import { config } from '../../config'
import { fetchProducts } from '../../features/Products/actions';



export default function Home() {

    let dispatch = useDispatch()
    let products = useSelector(state => state.products)

    React.useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <div>
            <LayoutSidebar
                sidebar={
                    <SideNav
                        color="blue"
                        items={menus}
                        verticalAlign="top"
                    />
                }
                content={
                    <div className="md:flex md:flex-row-reverse w-full mr-5 h-full min-h-screen">
                        <div className="w-full md:w-3/4 pl-5 pb-10">
                            <TopBar />
                            <Responsive desktop={3} items="stretch">
                                {products.data.map((product, index) => {
                                    return <div key={index} className="p-2">
                                        <CardProduct
                                            color="blue"
                                            title={product.name}
                                            imgUrl={`${config.api_host}/upload/${product.image_url}`}
                                            price={product.price}
                                            onAddToCart={_ => null}
                                        />
                                    </div>
                                })}
                            </Responsive>
                        </div>
                        <div className="w-full md:w-1/4 h-full shadow-lg border-r border-white bg-gray-100">
                            Keranjang belanja di sini
                        </div>
                    </div>
                }

                sidebarSize={80}

            />


        </div>
    )
}
