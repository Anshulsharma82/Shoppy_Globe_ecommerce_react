import '../stylesheet/Cart.css'
import { useDispatch } from 'react-redux'
import { increaseItemQuantity,decreaseItemQuantity, removeItem } from '../utilitis/cartSlice'

export default function CartItem({item}) {
    const dispatch = useDispatch()
    // when user clicks on + button increase the item quantity by 1
    function incrementItem() {
        dispatch(increaseItemQuantity({id:item.id}))
        
    }
    // when user clicks on - button, if item is 1 remove the item from the cart else decrease the item quantity by -1
    function decrementItem() {
        if(item.orderedItemCount === 1) {
            dispatch(removeItem({id:item.id}))
            return;
        }
        dispatch(decreaseItemQuantity({id:item.id}))
    }
    return (
        <>
            <div className="cartItem">
                <div className='img_container'>
                    <img src={item.thumbnail} />
                </div>
                <div className='descrip_container'>
                    <p className='bold_p'> {item.title} </p>
                    <p className='descrip_p'> {item.description} </p>
                    <p className='bold_p'> PRICE: ${item.priceAfterDiscount} </p>
                    <div className='buttonSection'>
                        <button onClick={decrementItem}>-</button>
                        <p > {item.orderedItemCount} </p>
                        <button onClick={incrementItem}>+</button>
                       <button onClick={() => dispatch(removeItem({id:item.id}))} className='removeItem'>Remove Item</button>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}