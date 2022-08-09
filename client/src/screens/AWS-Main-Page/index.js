/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from 'react-router-dom';
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
    const location = useLocation();

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
        // eslint-disable-next-line no-console
        console.log("Inside handleUsersClick function: ");
        navigate('/list-users', { state: {firstName : location?.state?.firstName}});
    }

    const handleGroupsClick = () => {
        // eslint-disable-next-line no-console
        console.log("Inside handleGroupsClick function: ");
        navigate('/list-groups' , { state: {firstName : location?.state?.firstName}});
    }

    const handlePoliciesClick = () => {
        // eslint-disable-next-line no-console
        console.log("Inside handlePoliciesClick function: ");
        navigate('/list-policies' , { state: {firstName : location?.state?.firstName}});
    }

    const handleBackButtonClick = () => {
        navigate('/main-page' , { state: {firstName : location?.state?.firstName}});
    }

    const handleAnalyticsClick = () => {
        navigate('/account-analytics' , { state: {firstName : location?.state?.firstName}})
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
                <div className="container-fluid awsMainPageContainer">
                    <div className="awsMainPagePrimaryRow">
                        <img className='back-button pr-3' onClick={handleBackButtonClick} src={BackButton} alt='Back button Icon'/>
                        <a
                            // href="/services"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon
                                icon={faAws}
                                color="#005F73"
                                className="fa-medium fa-10x"
                            />
                        </a>
                    </div>
                    <div className="row awsMainPageAccountSummaryRow">
                        <p className="awsMainPageAccountSummaryInfo">Here is the user account summary for your AWS account: </p>
                    </div>
                    {apiData !== null && 
                        <div className="col-xl-6 col-lg-6 col-md-6 awsMainPageAccountSummaryRow">
                            <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel" htmlFor='text'>Users: </label>                  
                                <p className="awsMainPageAccountSummaryValue underline" onClick={handleUsersClick}>{apiData?.Users || ''}</p>       
                            </div>
                            <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel" htmlFor='text'>Policies: </label>                  
                                <p className="awsMainPageAccountSummaryValue underline" onClick={handlePoliciesClick}>{apiData?.Policies || ''}</p>       
                            </div>
                            <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel" htmlFor='text'>Groups: </label>                  
                                <p className="awsMainPageAccountSummaryValue underline" onClick={handleGroupsClick}>{apiData?.Groups || ''}</p>       
                            </div>
                            {/* <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel" htmlFor='text'>Account MFA enabled: </label>                  
                                <p className="awsMainPageAccountSummaryValue">{apiData?.AccountMFAEnabled === 0 ? 'false' : 'true'}</p>       
                            </div> */}
                            <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel" htmlFor='text'>MFA Devices: </label>                  
                                <p className="awsMainPageAccountSummaryValue" onClick={handleUsersClick}>{apiData?.MFADevices}</p>       
                            </div>
                            <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel" htmlFor='text'>MFA Devices In Use: </label>                  
                                <p className="awsMainPageAccountSummaryValue" onClick={handleUsersClick}>{apiData?.MFADevicesInUse }</p>       
                            </div>
                            {/* <div className="awsMainPageAccountSummary">
                                <label className="awsMainPageAccountSummaryLabel " htmlFor='text'>Findings: </label>                  
                                <p className="awsMainPageAccountSummaryValue underline" onClick={handleAnalyticsClick}>3</p>       
                            </div> */}
                        </div>
                    }
                    <div className="row awsMainPageAccountSummaryRow">
                        <p className="findingsPara underline" onClick={handleAnalyticsClick}>Click here to view findings</p>
                    </div>                
                </div>
            </> 
        );
    }
} 

export default AWSMainPage;