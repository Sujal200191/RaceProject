import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import {
    faAws,
} from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Azure from '../../assets/images/azure-1.png';
import GCP from '../../assets/images/gcp.jpeg';

import Header from "../Header";
import './MainPage.scss';

const MainPage = (props) => {
    const [accessKey, setAccessKey] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const location = useLocation();

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log(props);
    }, [props]);

    const handleChange = (event) => {
        event.target.name === 'accesskey' ? setAccessKey(event.target.value) : setSecretKey(event.target.value);
    }

    // eslint-disable-next-line no-console
    console.log("props: ", props);
    return(
        <>
            <Header isLoginRegister={ false } firstName={location?.state?.firstName}/>
            <Container fluid className="mainPageContainer">
                <Row className="mainPagePrimaryRow">
                    <Col md="12">
                        <div className="mainPageServicesListContainer">
                            <p>Services: </p>
                        </div>
                    </Col>
                </Row>
                <Row className="mainPageSecondaryRow">
                    <Form role='form' className="formContainer">
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
                        <Col className='form-group user-password-form-group'>       
                            <label className='form-label user-password-form-label' htmlFor='password'>Access Key</label>                  
                            <input 
                                type='text' 
                                className='user-password-form-input' 
                                name='accesskey'
                                value={ accessKey }
                                onChange={ handleChange }
                                placeholder='Enter Access Key'
                                required
                            />      
                        </Col>
                        <Col className='form-group user-password-form-group'>       
                            <label className='form-label user-password-form-label' htmlFor='password'>Secret Key</label>                  
                            <input 
                                type='text' 
                                className='user-password-form-input' 
                                name='secretkey'
                                value={ secretKey }
                                onChange={ handleChange }
                                placeholder='Enter Secret Key'
                                required
                            />    
                        </Col>
                        <Col className="mainPageGoButtonContainer">
                            <Button
                                className="mainPageGoButton"
                            >
                            GO
                            </Button>  
                        </Col>                   
                    </Form>
                    <Form role='form' className="formContainer">
                        <a
                            href="/services"
                            rel="noreferrer"
                        >
                        <img
                            src={Azure}
                            width="150px"
                            height="100px"                    
                            alt="Azure"
                            className="img-fluid"
                        />
                        </a>
                        <Col className='form-group user-password-form-group'>       
                            <label className='form-label user-password-form-label' htmlFor='password'>Access Key</label>                  
                            <input 
                                type='text' 
                                className='user-password-form-input' 
                                name='accesskey'
                                value={ accessKey }
                                onChange={ handleChange }
                                placeholder='Enter Access Key'
                                required
                            />      
                        </Col>
                        <Col className='form-group user-password-form-group'>       
                            <label className='form-label user-password-form-label' htmlFor='password'>Secret Key</label>                  
                            <input 
                                type='text' 
                                className='user-password-form-input' 
                                name='secretkey'
                                value={ secretKey }
                                onChange={ handleChange }
                                placeholder='Enter Secret Key'
                                required
                            />    
                        </Col>
                        <Col className="mainPageGoButtonContainer">
                            <Button
                                className="mainPageGoButton"
                            >
                            GO
                            </Button>  
                        </Col>                   
                    </Form>
                    <Form role='form' className="formContainer">
                        <a
                            href="/services"
                            rel="noreferrer"
                        >
                        <img
                            src={GCP}
                            width="150px"
                            height="100px"                    
                            alt="Google Cloud platform"
                            className="img-fluid"
                        />
                        </a>
                        <Col className='form-group user-password-form-group'>       
                            <label className='form-label user-password-form-label' htmlFor='password'>Access Key</label>                  
                            <input 
                                type='text' 
                                className='user-password-form-input' 
                                name='accesskey'
                                value={ accessKey }
                                onChange={ handleChange }
                                placeholder='Enter Access Key'
                                required
                            />      
                        </Col>
                        <Col className='form-group user-password-form-group'>       
                            <label className='form-label user-password-form-label' htmlFor='password'>Secret Key</label>                  
                            <input 
                                type='text' 
                                className='user-password-form-input' 
                                name='secretkey'
                                value={ secretKey }
                                onChange={ handleChange }
                                placeholder='Enter Secret Key'
                                required
                            />    
                        </Col>
                        <Col className="mainPageGoButtonContainer">
                            <Button
                                className="mainPageGoButton"
                            >
                            GO
                            </Button>  
                        </Col>                   
                    </Form>
                </Row>
            </Container>
        </>     
    );
}

export default MainPage;