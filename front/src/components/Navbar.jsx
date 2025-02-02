import { myNavbar, navLogo, navViews, navUser, myViews } from "../styles/NavBar.module.css"
import NavUser from "./NavUser";
import ButtonPad from "./ButtonPad";
import { Link } from "react-router-dom";

const Navbar = ({isLogged}) => {
    return(
        <header className={myNavbar}>
            <div className={navLogo}>

            </div>
            <div className={navViews}>
                <h1>Liberty Bank</h1>
                <nav className={myViews} >
                    <Link to="/" >Home</Link>
                    <Link to="/my-appointments" >My Appointments</Link>
                </nav>
            </div>
            <div className={navUser}>
                {isLogged ? <NavUser /> : <ButtonPad />}
            </div>
        </header>
    );
};

export default Navbar;