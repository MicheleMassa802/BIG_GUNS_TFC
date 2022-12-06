import {Link, Outlet} from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <header>
                <Link to="/"> Home </Link>
                <Link to="subscription"> Your Subscription </Link>
                <Link to="payment_history"> Your Payment History </Link>
                <Link to="about_us"> About Us </Link>
            </header>
            <Outlet />
        </>
    )
}

export default Layout;