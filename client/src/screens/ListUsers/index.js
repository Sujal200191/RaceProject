/* eslint-disable react/jsx-curly-newline */
import React,{ useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAws,
} from "@fortawesome/free-brands-svg-icons";

import Loader from "../../components/Loader";
import Header from '../Header';
import UserTable from "../../components/UserTable";
import BackButton from '../../assets/images/back-button.svg';
import './index.scss';

const ListUsers = () => {
    // eslint-disable-next-line no-unused-vars
    const [apiData, setApiData] = useState(null);
    const [loading, setLoader] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        delay(3000);
        fetch("/api/v1/aws-iam/get-users")
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-console
                console.log("Data in useEffect: ", data);
                setApiData(data)
            });
        setLoader(false);
    }, []);

    // const handleUsersClick = () => {
    //     console.log("Inside handleUsersClick function: ");
    //     navigate('/aws-main-page');
    // }

    const handleBackButtonClick = () => {
        navigate('/aws-main-page', { state: {firstName : location?.state?.firstName}});
    }

    if(loading || apiData == null){
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
                <Header isLoginRegister={ false } firstName={location?.state?.firstName}/>
                <div className="container-fluid listUsersPageContainer">
                    <div className="listUsersPagePrimaryRow">
                        <div className="listUserBackButtonContainer">
                            <img className='back-button pr-3' onClick={handleBackButtonClick} src={BackButton} alt='Back button Icon'/>
                        </div>
                        <div className="listUsersLogoContainer">
                            <div className="col-md-8 offset-md-2 listUsersPrimaryRowContainer">
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
                            </div>   
                        </div>                                 
                    </div>
                    {apiData !== null && 
                        <div className="row listUsersTableRow">
                            <div className='col-12 userTableContainer'> 
                                <UserTable users={apiData}/>
                            </div>  
                        </div>
                    }
                </div>        
            </> 
        );
    }
}

export default ListUsers;