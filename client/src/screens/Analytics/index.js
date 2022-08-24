/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from "../Header";
import Loader from '../../components/Loader';

import BackButton from '../../assets/images/back-button.svg';
import './index.scss';

const Analytics = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoader] = useState(false);
    const [accountSummaryData, setAccountSummaryData] = useState(null);
    const [passwordPolicyData, setPasswordPolicyData] = useState(null);
    const [accountAuthorizationData, setAccountAuthorizationData] = useState(null);
    const [isNistActive, setIsNistActive] = useState(false);
    const [isIsoActive, setIsIsoActive] = useState(true);
    const [isPciActive, setIsPciActive] = useState(false);

    const handleISOClick = () => {
        if(!isIsoActive){
            setIsIsoActive(true);
            setIsNistActive(false);
            setIsPciActive(false);
        }else{
            setIsIsoActive(false);
        }
    }

    const handleNistClick = () => {
        if(!isNistActive){
            setIsNistActive(true);
            setIsIsoActive(false);
            setIsPciActive(false);
        }else{
            setIsNistActive(false);
        }
    }

    const handlePCIClick = () => {
        if(!isPciActive){
            setIsPciActive(true);
            setIsIsoActive(false);
            setIsNistActive(false);
        }else{
            setIsPciActive(false);
        }
    }

    useEffect(() => {
        setLoader(true);
        fetch("/api/v1/aws-iam/get-account-auth-details")
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-console
                console.log("Account auth details in useEffect: ", data);
                setAccountAuthorizationData(data)
            });
    }, []);

    useEffect(() => {
        fetch("/api/v1/aws-iam/get-password-policies")
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-console
                console.log("Password Policies details in useEffect: ", data);
                setPasswordPolicyData(data)
            });
    }, []);

    useEffect(() => {
        fetch("/api/v1/aws-iam/get-account-summary")
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-console
                console.log("Account summary in useEffect: ", data);
                setAccountSummaryData(data)
            });
        setLoader(false);
    }, []);

    const handleBackButtonClick = () => {
        navigate('/aws-main-page' , { state: {firstName : location?.state?.firstName}});
    }

    const mfaDisabledDevices = accountSummaryData?.Users - accountSummaryData?.MFADevicesInUse;
    const userDetailsList = accountAuthorizationData && accountAuthorizationData.UserDetailList;


    let filteredUsersDetailsList = userDetailsList && userDetailsList.map((element) => {
        return { ...element, subElements: element.AttachedManagedPolicies.filter((subElement) => subElement.PolicyName === "AdministratorAccess")}
    });

    let filteredCriticalUsers = filteredUsersDetailsList && filteredUsersDetailsList.filter((element) => element.subElements.length > 0);

    if(loading || accountSummaryData == null || passwordPolicyData == null || accountAuthorizationData == null){
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
                <div className="container-fluid analyticsContainer">
                    <div className="analyticsPrimaryRow">
                        <img className='back-button pr-3' onClick={handleBackButtonClick} src={BackButton} alt='Back button Icon'/>
                    </div>
                    <div className="row analyticsRow">
                        <div className="col-5 mfaDevicesAndOtherAnalyticsContainer">
                            <div className="mfaHeader">
                                <p>Multi-factor Authentication(MFA) analysis</p>
                            </div>
                            <div className="mfaDevicesAnalyticsContainer pl-0">
                                <div className="mfaTotalDevices">
                                    <p className="mfaTotalDevicesLabel">Total Users:</p>
                                    <p className="mfaTotalDevicesPara">{accountSummaryData?.Users}</p>
                                </div>
                                <div className="mfaEnabledDevices">
                                    <p className="mfaEnabledDevicesLabel">MFA enabled:</p>
                                    <p className="mfaEnabledDevicesPara">{accountSummaryData?.Users - mfaDisabledDevices}</p>
                                </div>
                                <p className="mfaFindingsMessage"><i>{ mfaDisabledDevices} of {accountSummaryData?.Users} users have <span className="dangerColor">MFA disabled</span></i></p>
                            </div>
                            <div className="mfaHeader">
                                <p>Critical Users</p>
                            </div>
                            <div className="mfaDevicesAnalyticsContainer pl-0">
                                {
                                    filteredCriticalUsers && filteredCriticalUsers.map((user, index) => {
                                        return(
                                            <ul key={index}>
                                                <li>
                                                    { user.UserName }
                                                </li>
                                            </ul>
                                        );
                                    })
                                }
                                <p className="mfaFindingsMessage"><i>{filteredCriticalUsers.length} of {accountSummaryData?.Users} users have <span className="dangerColor">critical user access</span>.</i></p>
                            </div>                       
                        </div>
                        <div className="col-5 passwordPolicyAnalyticsContainer">
                            <div className="passwordPolicyHeader">
                                <p>Password policy analysis</p>
                            </div>
                            <div className="tabContainer">
                                <ul className="nav tab-nav">
                                    <li className={`${isIsoActive ? 'active' : ''}`} onClick={handleISOClick}>ISO</li>
                                    <li className={`${isNistActive ? 'active' : ''}`} onClick={handleNistClick}>NIST</li>
                                    <li className={`${isPciActive ? 'active' : ''}`} onClick={handlePCIClick}>PCI DSS</li>
                                </ul>
                            </div>
                            {
                                isIsoActive && 
                                <div className="passwordPolicyAnalyticsTableContainer pl-0">
                                    <div className="policyHeaderRow">
                                        <div className="col-6 header">
                                            <p>Password Policy</p>
                                        </div>
                                        <div className="col-3 header">
                                            <p>Actual</p>
                                        </div>
                                        <div className="col-3 header">
                                            <p>Recommened</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Can user change password</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.AllowUsersToChangePassword == false ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.AllowUsersToChangePassword == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>YES</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Minimum password length</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.MinimumPasswordLength < 8 ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.MinimumPasswordLength}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>{`> 7`}</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Require symbols</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.RequireSymbols == false ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.RequireSymbols == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>YES</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Require numbers</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.RequireNumbers == false ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.RequireNumbers == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>YES</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Require uppercase characters</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.RequireUppercaseCharacters == false ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.RequireUppercaseCharacters == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>YES</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Require lowercase characters</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.RequireLowercaseCharacters == false ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.RequireLowercaseCharacters == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>YES</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Expire passwords</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.ExpirePasswords == false ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.ExpirePasswords == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>YES</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Max password age</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.MaxPasswordAge > 90 ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.MaxPasswordAge ? passwordPolicyData.MaxPasswordAge : '-'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>{`< 91`}</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Password reuse prevention</p>
                                        </div>
                                        <div className="col-3 policyActualValue">
                                            <p>{passwordPolicyData?.PasswordReusePrevention}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>Not mandatory</p>
                                        </div>
                                    </div>
                                </div>
                            }
                            { 
                                isNistActive &&
                                <div className="passwordPolicyAnalyticsTableContainer pl-0">
                                    <div className="policyHeaderRow">
                                        <div className="col-6 header">
                                            <p>Password Policy</p>
                                        </div>
                                        <div className="col-3 header">
                                            <p>Actual</p>
                                        </div>
                                        <div className="col-3 header">
                                            <p>Recommened</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Can user change password</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.AllowUsersToChangePassword == false ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.AllowUsersToChangePassword == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>YES</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Minimum password length</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.MinimumPasswordLength < 8 ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData?.MinimumPasswordLength}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>{`> 7`}</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Require symbols</p>
                                        </div>
                                        <div className="col-3 policyActualValue">
                                            <p>{passwordPolicyData.RequireSymbols == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>Not mandatory</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Require numbers</p>
                                        </div>
                                        <div className="col-3 policyActualValue">
                                            <p>{passwordPolicyData.RequireNumbers == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>Not mandatory</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Require uppercase characters</p>
                                        </div>
                                        <div className="col-3 policyActualValue">
                                            <p>{passwordPolicyData.RequireUppercaseCharacters == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>Not mandatory</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Require lowercase characters</p>
                                        </div>
                                        <div className="col-3 policyActualValue">
                                            <p>{passwordPolicyData.RequireLowercaseCharacters == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>Not mandatory</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Expire passwords</p>
                                        </div>
                                        <div className="col-3 policyActualValue">
                                            <p>{passwordPolicyData?.ExpirePasswords == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>Not Mandatory</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Max password age</p>
                                        </div>
                                        <div className="col-3 policyActualValue">
                                            <p>{passwordPolicyData?.MaxPasswordAge}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>Not Mandatory</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Password reuse prevention</p>
                                        </div>
                                        <div className="col-3 policyActualValue">
                                            <p>{passwordPolicyData?.PasswordReusePrevention}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>Not Mandatory</p>
                                        </div>
                                    </div>
                                </div>
                            }
                            { 
                                isPciActive &&
                                <div className="passwordPolicyAnalyticsTableContainer pl-0">
                                    <div className="policyHeaderRow">
                                        <div className="col-6 header">
                                            <p>Password Policy</p>
                                        </div>
                                        <div className="col-3 header">
                                            <p>Actual</p>
                                        </div>
                                        <div className="col-3 header">
                                            <p>Recommened</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Can user change password</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.AllowUsersToChangePassword == false ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.AllowUsersToChangePassword == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>YES</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Minimum password length</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.MinimumPasswordLength < 7 ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.MinimumPasswordLength}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>{`> 6`}</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Require symbols</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.RequireSymbols == false ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.RequireSymbols == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>YES</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Require numbers</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.RequireNumbers == false ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.RequireNumbers == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>YES</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Require uppercase characters</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.RequireUppercaseCharacters == false ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.RequireUppercaseCharacters == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>YES</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Require lowercase characters</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.RequireLowercaseCharacters == false ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.RequireLowercaseCharacters == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>YES</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Expire passwords</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.ExpirePasswords == false ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.ExpirePasswords == true ? 'YES' : 'NO'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>YES</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Max password age</p>
                                        </div>
                                        <div className={`col-3 policyActualValue ${passwordPolicyData?.MaxPasswordAge > 90 ? 'dangerColor': ''}`}>
                                            <p>{passwordPolicyData.MaxPasswordAge ? passwordPolicyData.MaxPasswordAge : '-'}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>{`< 91`}</p>
                                        </div>
                                    </div>
                                    <div className="policyHeaderRow">
                                        <div className="col-6 policyName">
                                            <p>Password reuse prevention</p>
                                        </div>
                                        <div className="col-3 policyActualValue">
                                            <p>{passwordPolicyData?.PasswordReusePrevention}</p>
                                        </div>
                                        <div className="col-3 policyRecommendedValue">
                                            <p>Not mandatory</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </>      
        );
    }    
}

export default Analytics;