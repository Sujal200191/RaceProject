import React, { useState } from "react";
import { Button, Container, Col, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './Login.scss';

import Header from './Header';

const Loader = () => {
    return (
        <div className="spinner-container">
          <div className="loading-spinner">
          </div>
        </div>
    );
}

const Login = () => {
    const   navigate = useNavigate();

    const   [ userName, setUserName ] = useState(''),
            [ userPassword, setUserPassword ] = useState(''),
            [ loading, setLoading ] = useState(false);


    const handleChange = (event) => {
        if(event.target.name === 'username'){
            setUserName(event.target.value)
        }else{
            setUserPassword(event.target.value)
        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));


    const handleUserLogin = async() => {
        setLoading(true);
        await delay(5000);
        setLoading(false);
        navigate(`/main-page`, { state: {firstName: userName }}); 
    } 
    
    if(loading){
        return(
            <div className="loaderContainer">
                <Loader />
            </div>         
        );
    }else{
        return(
            <>
                <Header isLoginRegister={ true }/>
                <Container fluid className="loginContainer">
                    <Form role='form' className="formContainer">
                        <Col className='form-group user-name-form-group'>
                            <label className='form-label user-name-form-label' htmlFor='username'>User Name</label>
                            <input
                                name='username'
                                type='text'
                                id='username'
                                className='user-name-form-input'
                                value={userName}
                                onChange={handleChange}
                                placeholder='Enter Name'
                                required />
                        </Col>
                        <Col className='form-group user-password-form-group'>
                            <label className='form-label user-password-form-label' htmlFor='password'>Password</label>
                            <input
                                type='password'
                                className='user-password-form-input'
                                name='password'
                                value={userPassword}
                                onChange={handleChange}
                                placeholder='Enter Password'
                                required />
                        </Col>
                    </Form>
                    <Col className='row create-new-user-header-row'>
                        <Button
                            className="loginButton"
                            onClick={handleUserLogin}
                            type="submit"
                        >Login
                        </Button>
                    </Col>
                </Container>
            </>
        );
    }  
}

export default Login;