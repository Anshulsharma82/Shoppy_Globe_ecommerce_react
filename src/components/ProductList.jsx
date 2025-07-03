import '../stylesheet/ProductList.css'
import { useState, useEffect } from "react"
import ProductItem from "./ProductItem"
import useFetch from "../utilitis/useFetch"

export default function ProductList() {
    const [productData, setProductData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [inputValue, setInputValue] = useState('')
    // calling custom hook useFetch to fetch the product details from the API.
    const { data, err, loading } = useFetch('https://dummyjson.com/products')
    
    // function to search the product on the basis of title entered in the input element.
    function searchByTitle(e) {
        const value = e.target.value
        setInputValue(value)
        const updatedData = productData.filter((product) => product.title.toLowerCase().includes(value.toLowerCase()))
        setFilteredData(updatedData)
    }
    
    useEffect(() => {
        if (data) {
            setProductData(data)
            setFilteredData(data)
        }
    }, [data])
    if (loading) return <p>Data is Loading...</p>
    if (err) return <div className='errorContainer_list'> <p> {err} </p>  </div>

    return (
        <>
            <div className='searchContainer'>
                <input type='text' placeholder='Search by title' value={inputValue} onChange={searchByTitle} />
            </div>
            <div className='productListContainer'>
                {filteredData.map((product) => {
                    return <ProductItem key={product.id} product={product} />
                })}
            </div>
        </>
    )
}