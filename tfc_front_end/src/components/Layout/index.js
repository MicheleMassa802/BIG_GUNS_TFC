import {Link, Outlet} from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <header>
                <Link to="/"> Home </Link>
                <Link to="get_sub"> Your Subscription </Link>
                <Link to="create_sub"> Create Subscription </Link>
                <Link to="update_sub"> Update Subscription </Link>
                <Link to="cancel_sub"> Cancel Subscription </Link>
                <Link to="payment_history"> Your Payment History </Link>
                <Link to="about_us"> About Us </Link>
                
                
            </header>
            <Outlet />
        </>
    )
}

export default Layout;