import React from 'react'
import {
    SideNav,
    LayoutSidebar,
    Responsive,
    CardProduct,
    Pagination,
} from 'upkit'

import { useDispatch, useSelector } from 'react-redux';
// import BounceLoader from 'react-spinners/BounceLoader'
import HashLoader from 'react-spinners/HashLoader'

import menus from './menus'
import TopBar from '../../components/TopBar'
import { config } from '../../config'
import { fetchProducts, goToNextPage, goToPrevPage, setPage } from '../../features/Products/actions';



export default function Home() {

    let dispatch = useDispatch()
    let products = useSelector(state => state.products)

    React.useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch, products.currentPage])

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

                            {products.status === 'process' && !products.data.length ?
                                <div className="flex justify-center text-center">
                                    <HashLoader
                                        color="#3182CE"
                                    />
                                </div>
                                : null}

                            <Responsive desktop={3} items="stretch">
                                {products.data.map((product, index) => {
                                    return <div key={index} className="p-2 mt-5">
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
                            <div className="text-center mt-10">
                                <Pagination
                                    color="blue"
                                    totalItems={products.totalItems}
                                    page={products.currentPage}
                                    perPage={products.perPage}
                                    onChange={page => dispatch(setPage(page))}
                                    onNext={_ => dispatch(goToNextPage())}
                                    onPrev={_ => dispatch(goToPrevPage())}
                                />
                            </div>

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
