import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

import "./Header.scss";

const Header = (props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/', { state: {}});
    }

    if(props?.isLoginRegister){
        return(
            <Container fluid className="headerContainer">
                <Row className="headerPrimaryRow">
                    <Col lg="4" className="buttonColumn">
                        <Link to="/login" className="loginButton">
                            <span>Login</span>
                        </Link>
                        <Link to="/register" className="registerButton">
                            <span>Register</span>
                        </Link>
                    </Col>
                </Row>
            </Container>
        );
    }else{
        return(
            <Container fluid className="headerContainer">
                <Row className="headerSecondaryRow">
                    <Col className="welcomeMessage">
                        <p>Welcome {props.firstName || '...'}</p>
                    </Col>
                    <Col className="logoutButtonContainer" onClick={handleLogout}>
                        <p className="logoutText">Logout</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Header;