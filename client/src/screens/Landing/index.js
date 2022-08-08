import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Web3 from "../../assets/images/web3.jpg";

import Header from "../Header";
import "./Landing.scss";

const Landing = () => {
    const navigate = useNavigate();

    const handleLoginButtonClick = () => {
        navigate(`/login`);
    }

    const handleRegisterButtonClick = () => {
        navigate(`/register`);
    }

    return(
        <>
            <Header />
            <section>
                <Container fluid className="landingContainer" id="home">
                    <Row className="landingImageContainer">
                        <img src={ Web3 } alt="Landing" className="landingMainImage" />
                    </Row>
                    <Row className="landingHeaderRow">
                        <h1 className="landingMainHeader">WELCOME TO POCKET USER MANAGEMENT SYSTEM</h1>
                        <h2 className="landingSecondaryHeader">IT IS YOUR PERSONAL USER MANAGEMENT SYSTEM FOR YOUR DIFFERENT WEB SERVICES</h2>

                        <h3>PLEASE SIGN UP OR LOGIN TO CONTINUE</h3>
                    </Row>
                    <Row className="landingPrimaryRow">
                        <Col lg="4" className="buttonColumn">
                            <button className="loginButton" onClick={handleLoginButtonClick}>
                                Login
                            </button>
                            
                            <button className="registerButton" onClick={handleRegisterButtonClick}>
                                Register
                            </button>
                        </Col>
                    </Row>
                </Container>
            </section>  
        </>         
    );
}

export default Landing;