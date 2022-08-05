import React from "react";
import { Container, Row } from "react-bootstrap";

import Web3 from "../../assets/images/web3.jpg";
import "./index.scss";

const Home = () => {
    return(
        <section>
            <Container fluid className="homeContainer" id="home">
                <Row className="homeImageContainer">
                    <img src={ Web3 } alt="home" className="homeMainImage" />
                </Row>
                <Row className="homeHeaderRow">
                    <h1 className="homeMainHeader">WELCOME TO POCKET USER MANAGEMENT SYSTEM</h1>
                    <h2 className="homeSecondaryHeader">IT IS YOUR PERSONAL USER MANAGEMENT SYSTEM FOR YOUR DIFFERENT WEB SERVICES</h2>

                    <h3>PLEASE SIGN UP OR LOGIN TO CONTINUE</h3>
                </Row>
            </Container>
        </section>    
    );
}

export default Home;