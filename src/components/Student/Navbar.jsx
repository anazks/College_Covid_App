import React, { useState } from 'react'
import { Alert, Button } from '@mui/material'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useNavigate } from "react-router-dom"

import "./navbar.css"
import { AccountCircle, LogoutOutlined } from '@mui/icons-material';
import { useAuth } from '../../store/AuthContext';

function Navbar({ feeds, contact, exams }) {
    const [error, setError] = useState();
    const { currentUser, logout } = useAuth();

    const navigate = useNavigate();

    const notificationClicked = () => {
        navigate('/notifications')
    }
    const examNotificationClicked = () => {
        navigate('/exam-notifications')
    }
    const feedsBtnClicked = () => {
        navigate('/')
    }
    const contactBtnClicked = () => {
        navigate('/contact')
    }
    const clickedProfile = () => {
        navigate("/profile")
    }
    const clickedLogout = async () => {
        setError("")
        try {
            await logout();
            navigate("/login")
        } catch (error) {
            setError("failed to logout")
        }
    }
    return (
        <>
            <div className='nav'>
                <NotificationsOutlinedIcon sx={{ fontSize: 30, mr: 3 }} onClick={notificationClicked} color={"primary"} />
                <Button id="nav-button" variant={exams ? "contained" : "outlined"} onClick={examNotificationClicked}>Exams</Button>
                <Button id="nav-button" variant={feeds ? "contained" : "outlined"} onClick={feedsBtnClicked}>Feeds</Button>
                <Button id="nav-button" variant={contact ? "contained" : "outlined"} onClick={contactBtnClicked}>Contact</Button>
                <div className="profile">
                    <span style={{ marginRight: '30px', color: "#000099", textTransform: 'uppercase', fontWeight: 600 }}>{currentUser && currentUser.displayName}</span>
                    <div className="options">
                        <span onClick={clickedProfile}><AccountCircle className="icon" color='primary' /> Profile</span>
                        <span onClick={clickedLogout}><LogoutOutlined color='primary' />Logout</span>
                    </div>
                </div>
            </div>
            {error && <Alert severity="error">{error}</Alert>}
        </>
    )
}

export default Navbar