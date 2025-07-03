import { useEffect, useState } from "react"
import useFetch from "../utilitis/useFetch"
import { Link } from "react-router-dom"

export default function Home() {
    const [productData, setProductData] = useState([])
    // using custom hook useFetch to fetch the product data from the API.
    const { data, err, loading } = useFetch('https://dummyjson.com/products')
    useEffect(() => {
        if (data.length > 0) {
            setProductData(data)
        }
    }, [data])
    // filtering product where category is equal to groceries.
    const groceriesProducts = productData.filter((product) => {
        if (product.category === 'groceries' && product.title !== 'Beef Steak') {
            return product
        }
    })
    // filtering product where category is equal to fragrances.
    const fragrancesProducts = productData.filter((product) => product.category === 'fragrances')
    if (loading) return <p>Loading...</p>
    if (err) return <p>Something Went Wrong...</p>
    return (
        <>
            <p className="home_p">Groceries</p>
            <div className="itemContainerH">
                {groceriesProducts.map((product) => {
                    return (
                        <Link to={`/product/${product.id}`} key={product?.id}>
                            <img src={product?.thumbnail} />
                        </Link>
                    )
                })}
            </div>
            <p className="home_p">Fragrances</p>
            <div className="itemContainerH">
                {fragrancesProducts.map((product) => {
                    return (
                        <Link to={`/product/${product.id}`} key={product?.id}>
                            <img src={product?.thumbnail} />
                        </Link>
                    )
                })}
            </div>
        </>
    )
}