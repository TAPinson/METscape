import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
} from 'reactstrap';
import { UserProfileContext } from '../providers/UserProfileProvider';
import './AppHeader.css';
import logo from "../images/logo.png";

const AppHeader = () => {
    const { getCurrentUser, logout } = useContext(UserProfileContext);
    const user = getCurrentUser();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const logoutAndReturn = () => {
        return logout().then(() => {
            toast.dark('You are now logged out');
            history.push('/login');
        });
    };

    return (

        <Navbar dark expand="md">
            <NavbarBrand tag={Link} to="/">
                <img
                    id="header-logo"
                    src={logo}
                    height="120"
                    className="mr-2 site-logo-img"
                    alt="Logo"
                />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Nav navbar>
                {user ? (
                    <>
                        <div className="navbar-spacer">
                            <NavItem>
                                <NavLink to="/myfeed" tag={Link}>
                                    My Feed
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/categorybrowser" tag={Link}>
                                    Browser
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/myexhibits" tag={Link}>
                                    My Gallery
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/friends" tag={Link}>
                                    Friends
                                    </NavLink>
                            </NavItem>
                            <div className="navbar-right-side">
                                <NavItem>
                                    <NavLink className="pointer" onClick={logoutAndReturn}>
                                        Logout
                                    </NavLink>
                                </NavItem>
                                <NavbarText>
                                    Welcome {user.userName}!
                            </NavbarText>
                            </div>
                        </div>
                    </>
                ) : (
                        <>
                            <NavItem>
                                <NavLink to="/login" tag={Link}>
                                    Login
                                        </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/register" tag={Link}>
                                    Register
                                        </NavLink>
                            </NavItem>
                        </>
                    )}
            </Nav>
        </Navbar>

    );
};

export default AppHeader;