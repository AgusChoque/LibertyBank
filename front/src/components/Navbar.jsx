import { myNavbar, navLogo, navViews, navUser, myViews } from "../styles/NavBar.module.css"
import NavUser from "./NavUser";
import ButtonPad from "./ButtonPad";

const Navbar = ({isLogged}) => {
    return(
        <header className={myNavbar}>
            <div className={navLogo}>

            </div>
            <div className={navViews}>
                <h1>Liberty Bank</h1>
                <nav>
                    <ul className={myViews}>
                        <li>Home</li>
                        <li>My Appointments</li>
                        <li>Prueba 3</li>
                    </ul>
                </nav>
            </div>
            <div className={navUser}>
                {isLogged ? <NavUser /> : <ButtonPad />}
            </div>
        </header>
    );
};

export default Navbar;