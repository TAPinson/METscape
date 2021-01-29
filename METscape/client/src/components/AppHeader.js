import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Collapse,
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
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">
                    <img
                        id="header-logo"
                        src="/placeholder.png"
                        width="30"
                        height="30"
                        className="mr-2"
                        alt="Logo"
                    />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />


                <Nav className="ml-auto" navbar>
                    {user ? (
                        <>
                            <NavItem>
                                <NavLink to="/myfeed" tag={Link}>
                                    My Feed
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/browser" tag={Link}>
                                    Browser
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/myexhibits" tag={Link}>
                                    My Exhibits
                                    </NavLink>
                            </NavItem>
                            <div className="navbar-spacer"></div>
                            <NavItem>
                                <NavLink to="/friends" tag={Link}>
                                    Friends
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="pointer" onClick={logoutAndReturn}>
                                    Logout
                                    </NavLink>
                            </NavItem>
                            <NavbarText>
                                Welcome {user.userName}
                            </NavbarText>

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
        </div>
    );
};

export default AppHeader;