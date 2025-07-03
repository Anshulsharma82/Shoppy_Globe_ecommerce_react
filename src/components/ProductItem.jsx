import { Link } from 'react-router-dom'
import '../stylesheet/ProductItem.css'
import { addItem } from '../utilitis/cartSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export default function ProductItem({product}) {
    //calculating the discounted price on the basis of actual price and discount percentage.
    const priceAfterDiscount = Math.round(product?.price - (product?.price * (product?.discountPercentage / 100)))
    const dispatch = useDispatch()
    const [msg,setMsg] = useState('')

    // Function to add user selected items to the cart.
    function handleAddToCart(event, product) {
        const obj = {
            id: product.id,
            title: product.title,
            priceAfterDiscount,
            thumbnail: product.thumbnail,
            orderedItemCount: 1,
            description: product.description
        }
        dispatch(addItem(obj))
        setMsg('Added to the cart')
        setTimeout(() => {
            setMsg('')
        },2000)
    }

    return (
        <>
            <div className="container">
                <p> {msg} </p>
                <Link to={`/product/${product?.id}`} >
                    <div className="imageContainer">
                        <img src={product?.thumbnail} />
                    </div>
                </Link>
                <div className="descriptionContainer">
                    <p> <b> {product?.brand} </b>  </p>
                    <Link to={`/product/${product.id}`}>
                        <p> {product?.title} </p>
                    </Link>
                    <p> Rating:{product?.rating}/5 </p>
                    <p> $ {priceAfterDiscount} M.R.P: <del>${product?.price}</del>  ({product?.discountPercentage} % off) </p>
                    <p> FREE delivery <b>{product?.shippingInformation}</b>  </p>
                    <button onClick={(event) => handleAddToCart(event,product)}>Add to cart</button>
                </div>
            </div>
        </>
    )
}