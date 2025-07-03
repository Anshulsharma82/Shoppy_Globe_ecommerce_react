import { Link, useRouteError } from "react-router-dom"

export default function Error404() {
    // using useRouteError() to get the details related to error.
    const errorObj = useRouteError()
    return(
        <>
            <div className="errorContainer">
                <p className="header">Page Not Found.</p>
                <p className="error_p"> {errorObj?.data} </p>
                <p className="sorry_line">We're sorry. The Web address you entered is not a functioning page on our site.</p>
                <Link to='/'>
                    <button>Go to Home</button>
                </Link>
            </div>
        </>
    )
}