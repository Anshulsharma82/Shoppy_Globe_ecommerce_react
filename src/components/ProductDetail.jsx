import '../stylesheet/ProductDetail.css'
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useFetch from "../utilitis/useFetch"
import { useDispatch } from 'react-redux'
import { addItem } from '../utilitis/cartSlice'

export default function ProductDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [productData, setProductData] = useState({})
    const [selectedValue, setSelectedValue] = useState(1)
    const [isValueMoreThan3, setValueMoreThan3] = useState(false)
    const [msg, setMsg] = useState('')
    const { data, err, loading } = useFetch(`https://dummyjson.com/products/${id}`)
    
    function handleOnSelect(e) {
        setSelectedValue(e.target.value)
        if (e.target.value === '3+') {
            setValueMoreThan3(true)
        }
    }
    // Calculating the discounted price on the basis of price and discount percentage
    let discountedPrice = Math.round(productData?.price - (productData?.price * (productData?.discountPercentage / 100)))

    // Function to add the item to the cart 
    function handleAddToCart() {
        const quantity = parseInt(selectedValue)
        // add only required information to the cart.
        const obj = {
            id: productData.id,
            title: productData.title,
            priceAfterDiscount: discountedPrice,
            thumbnail: productData.thumbnail,
            orderedItemCount: quantity,
            description: productData.description
        }
        // calling redux action function to add the item info to the cart.
        dispatch(addItem(obj))
        setMsg('Added to Cart...')
        setTimeout(() => {
            setMsg('')
        }, 2000)
    }
    useEffect(() => {
        if (data?.id) {
            setProductData(data)
        }
    }, [data])

    if (loading) return <p>Loading...</p>
    if (err) return <div className='errorContainer_list'> <p> {err} </p> </div>
    return (
        <>
            <h1 className='headingPD'>{productData?.title} ({productData?.category?.[0]?.toUpperCase()}{productData?.category?.slice(1, productData?.category?.length)}) </h1>
            <p className='headingPD'> {msg} </p>
            <div className="containerDetail">
                <div className="imageContainerDetail">
                    <img src={productData?.images?.[0]} alt="image_logo" />
                </div>
                <div className="detailContainerDetail">
                    <p className='description'> {productData?.description} </p>
                    <p className='rating'> Rating: <span> {productData?.rating}/5</span>  </p>
                    <hr />
                    <p className='price'><del>M.R.P: ${productData?.price} </del></p>
                    <p className='price'> <span>${discountedPrice}</span> {productData?.discountPercentage}%off  </p>
                    <div className='deliveryContainer'>
                        <div>
                            <i className="fa-solid fa-box-open fa-2xl"></i>
                            <p> {productData?.returnPolicy} </p>
                        </div>
                        <div>
                            <i className="fa-solid fa-truck fa-2xl"></i>
                            <p> Free Delivery </p>
                        </div>
                        <div>
                            <i className="fa-solid fa-money-bill-wave fa-2xl"></i>
                            <p> Pay on Delivery </p>
                        </div>
                    </div>
                    <div>
                        <span>Quantity:</span>
                        {/* // if user select 3+ from the dropdown list then create a input box so that user can add the number of items above 3. */}
                        {!isValueMoreThan3 ? <select onChange={(e) => handleOnSelect(e)} value={selectedValue}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option>3+</option>
                        </select> : <input type='number' value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} />}

                    </div>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
            {/* // Container to display the user comments. */}
            <div className="reviewContainer">
                <p>Top Reviews</p>
                {productData?.reviews?.map((review, index) => {
                    return <div className='reviewItem' key={index}>
                        <div className='userInfoContainer'>
                            <i className="fa-solid fa-user"></i>
                            <p>{review?.reviewerName}</p>
                        </div>
                        <p>Reviewed on: {new Date(review?.date)?.toDateString()} </p>
                        <p> {review?.comment} </p>
                    </div>
                })}
            </div>
        </>
    )
}