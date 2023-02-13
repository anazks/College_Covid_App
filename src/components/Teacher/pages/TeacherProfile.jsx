import { Button, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/AuthContext'
import Navbar from '../Navbar'
import "./profile.css"

function Profile() {
    const { currentUser, getTeacherData } = useAuth();
    const navigate = useNavigate()
    const [teacher, setTeacher] = useState()
    useEffect(async () => {
        let teachermail = currentUser.email;
        try {
            let snapshot = await getTeacherData(teachermail)
            snapshot.forEach((t) => {
                let data = t.data()
                setTeacher({ docId: t.id, ...data })
            })
            console.log(teacher)
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="img-section">
                    <img src="https://thumbs.dreamstime.com/b/teacher-icon-vector-male-person-profile-avatar-book-teaching-school-college-university-education-glyph-113754458.jpg" alt="profile" width="200" height="200" />
                    <Typography fontSize={'28px'} fontWeight={700}>{teacher && teacher.name} </Typography>
                    <Typography fontSize={'25px'}>{teacher && teacher.department} </Typography>
                </div>
                {teacher &&
                    <div className="data">
                        <div className="title-container">
                            <Typography fontSize={'25px'} fontWeight={500}>Your Status</Typography>
                            <Button variant="contained" onClick={() => navigate("/teacher/update-profile", { state: { teacher } })}>Update</Button>
                        </div>


                        <Card sx={{ minWidth: "50vw", p: 3, mb: 3, minHeight: '300px', display: 'flex', justifyContent: "space-evenly", alignItems: 'center' }}>
                            <div style={{ display: "flex", flexDirection: "column", height: '80%' }}>
                                <p>Name : {teacher.name}</p>
                                <p>Email : {teacher.email}</p>
                                <p>Dept : {teacher.department}</p>
                                <p>Subject : {teacher.subject}</p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", height: '80%' }}>
                                <p>Affected : {teacher.covidStatus}</p>
                                <p>Vaccinated : {teacher.vaccinated}</p>
                                {
                                    teacher.vaccinated == "yes" && <><p>Date : {teacher.vaccinationDate}</p>
                                        <p>Dose : {teacher.vaccinationDose}</p></>
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