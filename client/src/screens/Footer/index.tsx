import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./index.scss";

const Footer = () => {
    return (
        <Container fluid className="footerContainer">
            <Row className="footerRow">
                <Col md="6" className="footerCopyrights">
                    <h6>
                        Powered by Heroku
                    </h6>
                </Col>
                <Col md="6" className="footerCopyrights">
                    <h6>
                        Copyright @2022{" "}
                        <span className="footerCopyrightText">
                        <i>Sujal Patel</i>
                        </span>
                    </h6>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;