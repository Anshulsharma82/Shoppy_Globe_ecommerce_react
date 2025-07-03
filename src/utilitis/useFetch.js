import { useEffect, useState } from "react";

function useFetch(url) {
    const [data, setData] = useState([])
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            async function callAPI() {
                const partialData = await fetch(url)
                // if status is 404 set error and return it.
                if(partialData?.status === 404) {
                    setErr('Something went wrong. Our development team is already looking into it. Please try again in some time....')
                    return;
                }
                const data = await partialData.json()
                if(data?.products ) {
                    setData(data?.products)
                }
                else {
                    setData(data)
                }
            }
            callAPI()
        } catch (error) {
            console.log('Error while calling API', error)
            setErr('Something went wrong. Our development team is already looking into it. Please try again in some time')
        } finally {
            // set loading to false whether API succeed or failed.
            setLoading(false)
        }
    }, [url])

    return { data, err, loading }
}

export default useFetch;