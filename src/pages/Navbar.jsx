import React from 'react';
import '../styles/NavBar.css';
import {Link} from 'react-router-dom'

function Navbar() {
    return (
            <div className='navbar'>
            
                <div className='navbar_list'>
                    <ul>
                        <li>
                            <Link to="/app_buyer">Buyer</Link>
                        </li>

                        <li>
                            <Link to="/app_worker">Worker</Link>
                        </li>

                        <li>
                            <Link to="/login">Login</Link>
                        </li>

                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
    )
}

export default Navbar;
