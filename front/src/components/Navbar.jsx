import { myNavbar, myViews, buttonPad } from "../styles/NavBar.module.css"

const Navbar = () => {
    return(
        <nav className={myNavbar}>
            <ul className={myViews}>
                <li>Home</li>
                <li>Prueba1</li>
                <li>Prueba2</li>
            </ul>
            <div className={buttonPad}>
                <button>Register</button>
                <button>Login</button>
            </div>
        </nav>
    );
};

export default Navbar;