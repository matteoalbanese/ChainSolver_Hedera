import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="../pages/buyer" activeStyle>
                        Login as Buyer 
                    </NavLink>
                    <NavLink to="../pages/worker" activeStyle>
                        Login as Worker
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;
