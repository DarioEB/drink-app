import React from 'react';
import logo from '../cosmo.png'
import '../styles/Header.css';

const Header = () => {
    return(
        <header className="container">
            <div>
                <img 
                    src={logo}
                    alt="Icono Drink App"
                />
            </div>
            <div>
                <a href="#!">Drink App</a>
            </div>
        </header>
    )
}

export default Header;