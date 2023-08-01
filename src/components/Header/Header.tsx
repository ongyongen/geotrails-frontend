import React, { useContext, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import styled from "styled-components";
import { Container, Navbar } from "react-bootstrap";
import { HeaderBrand, HeaderLink } from "../../themes/textStyles";
import { useNavigate } from "react-router-dom";
import { 
    HOME_PAGE_PATH, 
    GEOCACHES_PAGE_PATH,
    LOGIN_PAGE_PATH, 
    SIGNUP_PAGE_PATH, 
    USER_PROFILE_PAGE_PATH, 
    LOGOUT_PAGE_PATH 
} from "../../routes";
import { AuthContext } from "../../AuthProvider";
import { useHeaderHooks } from "./useHeaderHooks";
import { IHeader } from "./HeaderInterface";

export const Header: IHeader = () => {

    let navigate = useNavigate()
    
    const {user, auth} = useContext(AuthContext)
    const { methods } = useHeaderHooks()
    const { handleNavigate, logout } = methods

    return (
        <>
        {user === "" && 
            <Navbar collapseOnSelect expand="sm">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse>
                    <StyledNavMenu>
                        <Nav.Link>
                            <HeaderLink onClick={() => handleNavigate(HOME_PAGE_PATH)}>Geotrails</HeaderLink>
                        </Nav.Link>
                        <Nav.Link>
                            <HeaderLink onClick={() => handleNavigate(GEOCACHES_PAGE_PATH)}>Geocaches</HeaderLink>
                        </Nav.Link>
                        <Nav.Link>
                            <HeaderLink onClick={() => handleNavigate(LOGIN_PAGE_PATH)}>Log In</HeaderLink>
                        </Nav.Link>
                        <Nav.Link>
                            <HeaderLink onClick={() => handleNavigate(SIGNUP_PAGE_PATH)}>Sign Up</HeaderLink>
                        </Nav.Link>
                    </StyledNavMenu>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        }
        {user !== "" && 
            <Navbar collapseOnSelect expand="sm">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse>
                    <StyledNavMenu>
                        <Nav.Link>
                            <HeaderLink onClick={() => navigate(HOME_PAGE_PATH)}>Geotrails</HeaderLink>
                        </Nav.Link>
                        <Nav.Link>
                            <HeaderLink onClick={() => navigate(GEOCACHES_PAGE_PATH)}>Geocaches</HeaderLink>
                        </Nav.Link>
                        <Nav.Link>
                            <HeaderLink onClick={() => navigate(USER_PROFILE_PAGE_PATH)}>Profile</HeaderLink>
                        </Nav.Link>
                        <Nav.Link>
                            <HeaderLink onClick={() => logout()}>Log Out</HeaderLink>
                        </Nav.Link>
                    </StyledNavMenu>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        }
        </>
    )
}

const StyledNavMenu = styled(Nav)`
    text-align:start;
    margin-top:2vh;
`