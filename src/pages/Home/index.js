import React from 'react'
import {
    SideNav,
    LayoutSidebar,
    Responsive,
    CardProduct,
    Pagination,
    InputText,
    ButtonCircle,
    Pill
} from 'upkit'

import { useDispatch, useSelector } from 'react-redux';
// import BounceLoader from 'react-spinners/BounceLoader'
import HashLoader from 'react-spinners/HashLoader'
import FaSearch from '@meronex/icons/fa/FaSearch';


import menus from './menus'
import TopBar from '../../components/TopBar'
import { tags } from './tags'
import { config } from '../../config'
import {
    fetchProducts,
    goToNextPage,
    goToPrevPage,
    setPage,
    setKeyword,
    setCategory,
    toggleTag
} from '../../features/Products/actions';



export default function Home() {

    let dispatch = useDispatch()
    let products = useSelector(state => state.products)

    React.useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch, products.currentPage, products.keyword, products.category, products.tags])

    return (
        <div>
            <LayoutSidebar
                sidebar={
                    <SideNav
                        color="blue"
                        items={menus}
                        verticalAlign="top"
                        active={products.category}
                        onChange={category => dispatch(setCategory(category))}

                    />
                }
                content={
                    <div className="md:flex md:flex-row-reverse w-full mr-5 h-full min-h-screen">
                        <div className="w-full md:w-3/4 pl-5 pb-10">
                            <TopBar />

                            <div className="w-full text-center mb-10 mt-5">
                                <InputText
                                    iconBefore={
                                        <ButtonCircle
                                            size="small"
                                            color="#3182CE"
                                            icon={<FaSearch color="#3182CE" />} />
                                    }
                                    fullRound
                                    value={products.keyword}
                                    placeholder="cari makanan disini..."
                                    fitContainer
                                    onChange={e => dispatch(setKeyword(e.target.value))}
                                />

                                <div className="mb-5 pl-2 flex w-3/3 overflow-auto pb-5 mt-5">
                                    {tags[products.category].map((tag, index) => {
                                        return <div key={index}>
                                            <Pill
                                                text={tag}
                                                icon={tag.slice(0, 1).toUpperCase()}
                                                isActive={products.tags.includes(tag)}
                                                onClick={_ => dispatch(toggleTag(tag))}
                                            />
                                        </div>
                                    })}
                                </div>

                            </div>

                            {products.status === 'process' && !products.data.length ?
                                <div className="flex justify-center text-center">
                                    <HashLoader
                                        color="#3182CE"
                                    />
                                </div>
                                : null}

                            <Responsive desktop={3} items="stretch">
                                {
                                    products.data.length === 0 ? <div>Tidak ada data makanan</div> :
                                        products.data.map((product, index) => {
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

                            <div className="text-center my-10">
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
