import {Link, Outlet} from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <header>
                <Link to="/"> Home </Link>
                <Link to="about"> About </Link>
                <Link to="contact"> Contact </Link>
                <Link to="payments"> Payments </Link>
            </header>
            <Outlet />
        </>
    )
}

export default Layout;