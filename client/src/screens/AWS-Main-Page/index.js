import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faAws,
} from "@fortawesome/free-brands-svg-icons";

import Header from '../Header';

import './index.scss';

const AWSMainPage = () => {
    // eslint-disable-next-line no-unused-vars
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        fetch("/api/v1/aws-iam")
        .then((res) => res.json())
        .then((data) => {
            // eslint-disable-next-line no-console
            console.log("Data in useEffect: ", data);
            setApiData(data)
        });
    }, []);

    return(
        <>
            <Header isLoginRegister={ false } firstName={location?.state?.firstName}/>
            <Container fluid className="awsMainPageContainer">
                <Row>
                    <a
                        href="/services"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={faAws}
                            color="#005F73"
                            className="fa-medium fa-10x"
                        />
                    </a>
                </Row>
            </Container>
        </> 
   );
} 

export default AWSMainPage;