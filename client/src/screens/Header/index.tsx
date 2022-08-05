import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./index.scss";

const Header = () => {
    return(
        <Container fluid className="headerContainer">
            <Row className="headerPrimaryRow">
                <Col lg="4" className="buttonColumn">
                    <Button className="loginButton">Login</Button>
                    <Button className="registerButton">Register</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;