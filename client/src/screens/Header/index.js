import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

import "./Header.scss";

const Header = (props) => {
    
    console.log("Props: ", props);

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
                <Row className="headerPrimaryRow">
                    <Col lg="4" className="welcomeMessage">
                        <p>Welcome {props.firstName || 'Sujal'}</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Header;