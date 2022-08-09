import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAws,
} from "@fortawesome/free-brands-svg-icons";

import Loader from "../../components/Loader";
import Header from '../Header';
import GroupTable from "../../components/GroupTable";
import BackButton from '../../assets/images/back-button.svg';
import './index.scss';

const ListGroups = () => {
    // eslint-disable-next-line no-unused-vars
    const [apiData, setApiData] = useState(null);
    const [loading, setLoader] = useState(true);

    const navigate = useNavigate();
    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        delay(3000);
        fetch("/api/v1/aws-iam/get-groups")
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-console
                console.log("Data in useEffect: ", data);
                setApiData(data)
            });
        setLoader(false);
    }, []);

    const handleBackButtonClick = () => {
        navigate('/aws-main-page');
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
                <div className="container-fluid listGroupsPageContainer">
                    <div className="row listGroupsPagePrimaryRow">
                        <div className="listUserBackButtonContainer">
                            <img className='back-button pr-3' onClick={handleBackButtonClick} src={BackButton} alt='Back button Icon'/>
                        </div>
                        <div className="listGroupsLogoContainer">
                            <div className="col-md-8 offset-md-2 listGroupsPrimaryRowContainer">
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
                        <div className="row listGroupsTableRow">
                            <div className='col-12 userTableContainer'> 
                                <GroupTable groups={apiData}/>
                            </div>  
                        </div>
                    }
                </div>        
            </> 
        );
    }
}

export default ListGroups;