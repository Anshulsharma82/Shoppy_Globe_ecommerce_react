import { useSelector } from "react-redux"
import CartItem from "./CartItem"
import '../stylesheet/Cart.css'
import { Link } from "react-router-dom"
export default function Cart() {
    // using useSelector to get the cart items details stored in the cart.
    const cartData = useSelector((store) => store.cartItems.cartItems)
    const totalPrize = useSelector((store) => store.cartItems.totalPrize)
    return (
        <>
            <div className="container_cart">
                <div className="checkoutSection">
                    {totalPrize === 0 ? "" : <>
                        <p className="bold_pp">Subtotal <b>$ {totalPrize}</b></p>
                        <p className="free_pp">Your Order is eligible for free delivery</p>
                        <Link to='/payment'>
                            <button>Checkout</button>
                        </Link>
                    </>}
                    
                </div>
                <div className="detailContainer_cart">
                {/* If cart is empty display the empty cart message else display the items available in the cart. */}
                {
                    cartData.length === 0 ? <p className="emtyp_cart_p">Your Shopping Cart is empty</p>: cartData.map((item) => {
                        return <CartItem key={item.id} item={item} />
                    })
                }
                    {}
                </div>
            </div>
        </>
    )
}