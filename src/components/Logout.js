import React, {useEffect} from 'react';
import {navigate} from "react-big-calendar/lib/utils/constants";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthContext";

function LogoutButton() {
    const navigate = useNavigate();
    const{logout} = useAuth();
    useEffect(() => {
        handleLogout();
    })

    const handleLogout = () => {

        logout();
        navigate("/");
    };


}

export default LogoutButton;