import { Button, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/AuthContext'
import Navbar from '../Navbar'
import "./profile.css"

function Profile() {
    const { currentUser, getUserData } = useAuth();
    const navigate = useNavigate()
    const [user, setUser] = useState()
    useEffect(async () => {
        let usermail = currentUser.email;
        try {
            let snapshot = await getUserData(usermail)
            snapshot.forEach((s) => {
                setUser({ docId: s.id, ...s.data() })
                console.log(user)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="img-section">
                    <img src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png" alt="profile" width="200" height="200" />
                    <Typography fontSize={'28px'} fontWeight={700}>{user && user.name} </Typography>
                    <Typography fontSize={'25px'}>{user && user.course} </Typography>
                </div>
                {user &&
                    <div className="data">
                        <div className="title-container">
                            <Typography fontSize={'25px'} fontWeight={500}>Your Profile</Typography>
                            <Button onClick={() => navigate("/update-profile", { state: { user } })} variant="contained">Update</Button>
                        </div>
                        <Card sx={{ minWidth: "50vw", p: 3, mb: 3, minHeight: '300px', display: 'flex', justifyContent: "space-evenly", alignItems: 'center' }}>
                            <div style={{ display: "flex", flexDirection: "column", height: '80%' }}>
                                <p>Name : {user.name}</p>
                                <p>Email : {user.email}</p>
                                <p>Number : {user.regNumber}</p>
                                <p>Dept : {user.department}</p>
                                <p>Course : {user.course}</p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", height: '80%' }}>
                                <p>Affected : {user.covidStatus}</p>
                                <p>Vaccinated : {user.vaccinated}</p>
                                {
                                    user.vaccinated == "yes" && <><p>Date : {user.vaccinationDate}</p>
                                        <p>Dose : {user.vaccinationDose}</p></>
                                }
                            </div>
                        </Card>
                    </div>
                }
            </div>
        </>
    )
}

export default Profile