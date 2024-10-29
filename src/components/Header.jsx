import React from "react"
import { FaShoppingCart, FaHome } from 'react-icons/fa';
import "../css/Header.css"
import { Link } from "react-router-dom"


function Header() {
    return (
        <nav className='navbar'>
            <h2>SHOPPYGLOBE</h2>
            <div>
                <p><Link to="/"><FaHome />Home</Link></p>
                <p><Link to="/Cart"><FaShoppingCart />Cart</Link></p>
            </div>

        </nav>
    )
}

export default Header