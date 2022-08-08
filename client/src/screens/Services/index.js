import React from "react";
import { Container, Row } from "react-bootstrap";

import Header from "../Header";
import Navigation from "../Navigation";
import './Services.scss';

const Services = () => {
    return(
        <>
            <Header isLoginRegister={ false } firstName={location?.state?.firstName}/>
            <div className="servicesNavigationContainer">
                <Navigation />
                <Container fluid className="servicesContainer">
                    <Row>
                        <h1>Hello11111111</h1>
                    </Row>
                </Container>
            </div>          
        </>       
    );
}

export default Services;