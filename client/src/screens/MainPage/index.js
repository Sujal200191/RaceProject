import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import {
    faAws,
    faGoogle,
    faMicrosoft
} from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../Header";
import './MainPage.scss';

const Loader = () => {
    return (
        <div className="spinner-container">
          <div className="loading-spinner">
          </div>
        </div>
    );
}

const MainPage = (props) => {
    const [awsAccessKey, setAwsAccessKey] = useState('');
    const [awsSecretKey, setAwsSecretKey] = useState('');
    const [azureAccessKey, setAzureAccessKey] = useState('');
    const [azureSecretKey, setAzureSecretKey] = useState('');
    const [gcpAccessKey, setGcpAccessKey] = useState('');
    const [gcpSecretKey, setGcpSecretKey] = useState('');
    const [ loading, setLoading ] = useState(false);
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log(props);
    }, [props]);

    const handleChange = (event) => {
        if(event.target.name === 'awsAccesskey'){
            setAwsAccessKey(event.target.value);
        }else if(event.target.name === 'awsSecretkey'){
            setAwsSecretKey(event.target.value);
        }else if(event.target.name === 'azureAccesskey'){
            setAzureAccessKey(event.target.value);
        }else if(event.target.name === 'azureSecretkey'){
            setAzureSecretKey(event.target.value);
        }else if(event.target.name === 'gcpAccesskey'){
            setGcpAccessKey(event.target.value);
        }else{
            setGcpSecretKey(event.target.value);
        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));


    const handleValidation = async() => {
        setLoading(true);
        await delay(5000);
        setLoading(false);
        navigate(`/aws-main-page`); 
    } 

    // eslint-disable-next-line no-console
    console.log("props: ", props);

    if(loading){
        return(
            <div className="loaderContainer">
                <Loader />
            </div>         
        );
    }else{
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
                                    name='awsAccesskey'
                                    value={ awsAccessKey }
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
                                    name='awsSecretkey'
                                    value={ awsSecretKey }
                                    onChange={ handleChange }
                                    placeholder='Enter Secret Key'
                                    required
                                />    
                            </Col>
                            <Col className="mainPageGoButtonContainer">
                                <Button
                                    className="mainPageGoButton"
                                    onClick={handleValidation}
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
                            <FontAwesomeIcon
                                icon={faMicrosoft}
                                color="#005F73"
                                className="fa-medium fa-10x"
                            />
                            </a>
                            <Col className='form-group user-password-form-group'>       
                                <label className='form-label user-password-form-label' htmlFor='password'>Access Key</label>                  
                                <input 
                                    type='text' 
                                    className='user-password-form-input' 
                                    name='azureAccesskey'
                                    value={ azureAccessKey }
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
                                    name='azureSecretkey'
                                    value={ azureSecretKey }
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
                            <FontAwesomeIcon
                                icon={faGoogle}
                                color="#005F73"
                                className="fa-medium fa-10x"
                            />
                            </a>
                            <Col className='form-group user-password-form-group'>       
                                <label className='form-label user-password-form-label' htmlFor='password'>Access Key</label>                  
                                <input 
                                    type='text' 
                                    className='user-password-form-input' 
                                    name='gcpAccesskey'
                                    value={ gcpAccessKey }
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
                                    name='gcpSecretkey'
                                    value={ gcpSecretKey }
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
}

export default MainPage;