import React from 'react';
import '../styles/NavBar.css';
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        
            <div className='navbar'>
            
                <div className='navbar_list'>
                    <ul>
                        
                        <li>
                            <Link to="/login">Login</Link>
                        </li>

                        
                    </ul>
                </div>
            </div>
    )
}

export default Navbar;
