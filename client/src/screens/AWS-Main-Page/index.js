import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import {
    faAws,
} from "@fortawesome/free-brands-svg-icons";

import Header from "../Header";
import Loader from "../../components/Loader";

import BackButton from '../../assets/images/back-button.svg';
import './index.scss';

const AWSMainPage = () => {
    // eslint-disable-next-line no-unused-vars
    const [apiData, setApiData] = useState(null);
    const [loading, setLoader] = useState(true);

    const navigate = useNavigate();
    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        delay(3000);
        fetch("/api/v1/aws-iam/get-account-summary")
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-console
                console.log("Data in useEffect: ", data);
                setApiData(data)
            });
        setLoader(false);
    }, []);

    const handleUsersClick = () => {
        console.log("Inside handleUsersClick function: ");
        navigate('/list-users');
    }

    const handleBackButtonClick = () => {
        navigate('/main-page');
    }

    if(loading || apiData == null){
        return(
            <div className="loaderContainer">
                <Loader />
            </div> 
        );
    }else{
        return(
            <>
                <Header isLoginRegister={ false } firstName={location?.state?.firstName}/>
                <div className="container-fluid awsMainPageContainer">
                    <div className="row awsMainPagePrimaryRow">
                        <img className='back-button pr-3' onClick={handleBackButtonClick} src={BackButton} alt='Back button Icon'/>
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
                    {apiData !== null && 
                        <div className="col-xl-6 col-lg-6 col-md-6 offset-lg-3 awsMainPageAccountSummaryRow">
                            <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel" htmlFor='text'>Users: </label>                  
                                <p className="awsMainPageAccountSummaryValue underline" onClick={handleUsersClick}>{apiData?.Users || ''}</p>       
                            </div>
                            <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel" htmlFor='text'>Policies: </label>                  
                                <p className="awsMainPageAccountSummaryValue underline" onClick={handleUsersClick}>{apiData?.Policies || ''}</p>       
                            </div>
                            <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel" htmlFor='text'>Groups: </label>                  
                                <p className="awsMainPageAccountSummaryValue underline" onClick={handleUsersClick}>{apiData?.Groups || ''}</p>       
                            </div>
                            <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel" htmlFor='text'>Account MFA enabled: </label>                  
                                <p className="awsMainPageAccountSummaryValue">{apiData?.AccountMFAEnabled === 0 ? 'false' : 'true'}</p>       
                            </div>
                            <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel" htmlFor='text'>MFA Devices: </label>                  
                                <p className="awsMainPageAccountSummaryValue" onClick={handleUsersClick}>{apiData?.MFADevices === 0 ? 'false' : 'true'}</p>       
                            </div>
                            <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel" htmlFor='text'>MFADevicesInUse: </label>                  
                                <p className="awsMainPageAccountSummaryValue" onClick={handleUsersClick}>{apiData?.MFADevicesInUse === 0 ? 'false' : 'true'}</p>       
                            </div>
                            <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel " htmlFor='text'>Findings: </label>                  
                                <p className="awsMainPageAccountSummaryValue underline" onClick={handleUsersClick}>3</p>       
                            </div>
                        </div>
                    }                
                </div>
            </> 
        );
    }
} 

export default AWSMainPage;