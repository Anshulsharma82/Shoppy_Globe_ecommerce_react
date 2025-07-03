import '../stylesheet/Payment.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { clearCart } from '../utilitis/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
export default function Payment() {
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [msg,setMsg] = useState('')
    const totalPrize = useSelector((store) => store.cartItems.totalPrize)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //function to validate input fields,  clear the cart and navigate the user to home page.
    function handleFormSubmission(e) {
        e.preventDefault()
        if(fullName === '' || email === '' || phone === '' || address === '') {
            setMsg('All fields are mandatory')
            setTimeout(() => {
                setMsg('')
            },1500)
            return;
        }
        dispatch(clearCart())
        navigate('/')
    }
    return (
        <>
            <div className="payment_container">
            <h1>Payment Page</h1>
            <p>{msg}</p>
                <form onSubmit={handleFormSubmission}>
                    <div>
                        <label> Name </label>
                        <input type="text"  value={fullName} onChange={(e) => setFullName(e.target.value)}  />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Mobile No.</label>
                        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <label>Address</label>
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div>
                        <input type="submit" value={`Pay ${totalPrize}`} />
                    </div>
                    <Link to='/cart'>
                        <button>Cancel Payment</button>
                    </Link>
                </form>
            </div>
        </>
    )
}