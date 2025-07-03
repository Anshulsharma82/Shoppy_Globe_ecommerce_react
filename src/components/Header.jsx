import { Link, useLocation } from 'react-router-dom'
import '../App.css'
import { useSelector } from 'react-redux'

export default function Header() {
    // using useSelector to get the cart items details stored in the cart slice.
    const totalItems = useSelector((store) => store.cartItems.totalItems)    
    // using useLocation to find the route path to style the header list dynamically
    const route = useLocation().pathname;
    return (
        <>
            <header>
                <nav className='navStyling'>
                    <div className='img_heading_div'>
                    <img src='./images/logo.png' alt='logo' />
                    <h1>SHOPPY GLOBE</h1>
                    </div>
                    <ul>
                    {/* Using Link to create single page application, to prevent full page reload. */}
                        <Link className='no-underline' to='/'>
                            <li style={route === '/' ? {color: 'black'}: {color: 'white'}} >HOME</li>
                        </Link>
                        <Link className='no-underline' to='/products'>
                            <li style={route === '/products' ? {color: 'black'}: {color: 'white'}} >PRODUCTS</li>
                        </Link>              
                        <Link className='no-underline' to='/cart'>
                            <div className='cartHeader'>
                                <li style={route === '/cart' ? {color: 'black'}: {color: 'white'}} >CART</li>
                                <p> ({totalItems}) </p>
                                <i className="fa-solid fa-xl fa-cart-shopping"></i>
                            </div>
                        </Link>                     
                    </ul>
                </nav>
            </header>
        </>
    )
}