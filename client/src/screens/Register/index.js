import React, { useState } from "react";
import { Button, Container, Col, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import Header from '../Header';
import './Register.scss';

const Loader = () => {
    return (
        <div className="spinner-container">
          <div className="loading-spinner">
          </div>
        </div>
    );
}

const Register = () => {
    const   navigate = useNavigate();

    const   [ userName, setUserName ] = useState(''),
            [ firstName, setFirstName ] = useState(''),
            [ lastName, setLastName ] = useState(''), 
            [ userPassword, setUserPassword ] = useState(''),
            [ email, setEmail ] = useState(''),
            [ loading, setLoading] = useState(false);


    const handleChange = (event) => {
      event.target.name === 'username' ? setUserName(event.target.value) : setUserPassword(event.target.value);
      if(event.target.name === 'username'){
        setUserName(event.target.value)
      }else if(event.target.name === 'password'){
        setUserPassword(event.target.value)
      }else if(event.target.name === 'firstname'){
        setFirstName(event.target.value)
      }else if(event.target.name === 'lastname'){
        setLastName(event.target.value)
      }else if(event.target.name === 'email'){
        setEmail(event.target.value)
      }
    }

    // Utility function
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleCreateNewUser = async() => {
        setLoading(true);
        await delay(2000);
        setLoading(false);
        navigate(`/main-page`, { state: { firstName: firstName, userName : userName }}); 
    }
    
    if(loading){
        return(
            <>
                <Header isLoginRegister={ false } firstName={location?.state?.firstName}/>
                <div className="loaderContainer">
                    <Loader />
                </div> 
            </>            
        );
    }else{
        return(
            <>
                <Header isLoginRegister={ true }/>
                <Container fluid className="registerContainer">
                    <Form role='form' className="formContainer">
                        <Col className='form-group user-password-form-group'>       
                            <label className='form-label user-password-form-label' htmlFor='password'>First Name</label>                  
                            <input 
                                type='text' 
                                className='user-password-form-input' 
                                name='firstname'
                                value={ firstName }
                                onChange={ handleChange }
                                placeholder='Enter first name'
                                required
                            />      
                        </Col>
                        <Col className='form-group user-password-form-group'>       
                            <label className='form-label user-password-form-label' htmlFor='password'>Last Name</label>                  
                            <input 
                                type='text' 
                                className='user-password-form-input' 
                                name='lastname'
                                value={ lastName }
                                onChange={ handleChange }
                                placeholder='Enter first name'
                                required
                            />      
                        </Col>
                        <Col className='form-group user-password-form-group'>       
                            <label className='form-label user-password-form-label' htmlFor='password'>Email</label>                  
                            <input 
                                type='text' 
                                className='user-password-form-input' 
                                name='email'
                                value={ email }
                                onChange={ handleChange }
                                placeholder='Enter email'
                                required
                            />      
                        </Col>
                        <Col className='form-group user-name-form-group'>
                            <label className='form-label user-name-form-label' htmlFor='username'>User Name</label>
                            <input 
                                name='username'
                                type='text'
                                id='username' 
                                className='user-name-form-input' 
                                value={ userName }
                                onChange={ handleChange }
                                placeholder='Enter user name'
                                required 
                            />                  
                        </Col>                  
                        <Col className='form-group user-password-form-group'>       
                            <label className='form-label user-password-form-label' htmlFor='password'>Password</label>                  
                            <input 
                                type='password' 
                                className='user-password-form-input' 
                                name='password'
                                value={ userPassword }
                                onChange={ handleChange }
                                placeholder='Enter password'
                                required
                            />      
                        </Col>
                    </Form>
                    <Col className='row create-new-user-header-row'>
                        <Button
                        className="registerButton"
                        onClick = { handleCreateNewUser}
                        type="submit"
                        >Register
                        </Button>
                    </Col>
                </Container>
            </>     
        );
    }
    
}

export default Register;