import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import {
    faAws,
} from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "./Header";
import './MainPage.scss';

const MainPage = (props) => {
    const location = useLocation();

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log(props);
    }, [props]);

    // eslint-disable-next-line no-console
    console.log("props: ", props);
    return(
        <>
            <Header isLoginRegister={ false } firstName={location?.state?.firstName}/>
            <Container fluid className="mainPageContainer">
                <Row className="mainPagePrimaryRow">
                    <Col md="12">
                        <div className="mainPageServicesListContainer">
                            <p>Your Services: </p>
                        </div>
                    </Col>
                </Row>
                <Row className="mainPageSecondaryRow">
                    {/* <ul>
                        <li> */}
                            <a
                                href="/service"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faAws}
                                    color="#005F73"
                                    className="fa-medium fa-10x"
                                />
                            </a>
                        {/* </li>
                    </ul> */}
                </Row>
            </Container>
        </>     
    );
}

export default MainPage;