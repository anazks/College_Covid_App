import React, { useState, useEffect, useRef } from 'react'
import { Alert, Button, Card, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { useAuth } from "../../../store/AuthContext"
import { useLocation, useNavigate } from 'react-router-dom';

import Navbar from '../Navbar';

function UpdateProfile() {
    const [teacher, setTeacher] = useState();
    const { updateTeacherData } = useAuth();
    const location = useLocation()
    useEffect(() => {
        setLoading(true)
        setTeacher(location.state.teacher)
        setLoading(false)
        setCovidStatus(location.state.teacher && location.state.teacher.covidStatus)
        setVaccinated(location.state.teacher && location.state.teacher.vaccinated)
    }, [])

    const [covidStatus, setCovidStatus] = useState();
    const [vaccinated, setVaccinated] = useState();
    const nameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const subjectRef = useRef();
    const deptRef = useRef();
    const vaccinDateRef = useRef();
    const vaccinDoseRef = useRef();

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const submitted = async (e) => {
        e.preventDefault();
        let teacherObj = {
            name: nameRef.current.value,
            phoneNumber: phoneRef.current.value,
            email: emailRef.current.value,
            department: deptRef.current.value,
            subject: subjectRef.current.value,
            covidStatus,
            vaccinated,
            vaccinationDate: (vaccinDateRef.current != null ? vaccinDateRef.current.value : false),
            vaccinationDose: (vaccinDoseRef.current != null ? vaccinDoseRef.current.value : false)
        }
        console.log(teacherObj, teacher.docId)
        try {
            setError("")
            setLoading(true)
            updateTeacherData(teacherObj, teacher.docId).then((result) => {
                console.log(result)
                navigate("/teacher/profile");
            })
        } catch (error) {
            setError(error.message)
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div>
            <Navbar />
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                padding: "10vh"
            }}>
                {
                    teacher &&

                    <Card sx={{ maxWidth: 380, p: 3, minHeight: 1200, display: 'flex', flexDirection: 'column', justifyContent: "space-evenly" }}>
                        <Typography color="text.secondary" fontSize={32} fontWeight={600} gutterBottom>
                            Update Student Profile
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <FormLabel style={{ fontSize: 22 }}>Covid Details</FormLabel>
                        <TextField
                            required
                            placeholder="Name"
                            id="outlined-multiline-flexible"
                            defaultValue={teacher.name}
                            inputRef={nameRef}
                        />
                        <TextField
                            required
                            id="standard-helperText"
                            placeholder="Mobile Number"
                            type="number"
                            defaultValue={parseInt(teacher.phoneNumber)}
                            inputRef={phoneRef}
                        />
                        <TextField
                            required
                            id="standard-helperText"
                            placeholder="Email id"
                            type="email"
                            defaultValue={teacher.email}
                            inputRef={emailRef}
                        />

                        <TextField
                            required
                            id="standard-helperText"
                            placeholder="Departmnet"
                            type="text"
                            defaultValue={teacher.department}
                            inputRef={deptRef}
                        />
                        <TextField
                            required
                            id="standard-helperText"
                            placeholder="Subject"
                            type="text"
                            defaultValue={teacher.subject}

                            inputRef={subjectRef}
                        />
                        <FormLabel style={{ fontSize: 22 }}>Covid Details</FormLabel>
                        <FormLabel id="demo-radio-buttons-group-label">Are you covid positive?</FormLabel>

                        {covidStatus == "yes" ? <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            required={true}
                            value="yes"

                        >

                            <FormControlLabel value="yes" onClick={(e) => { setCovidStatus('yes') }} control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" onClick={(e) => { setCovidStatus('no') }} control={<Radio />} label="No" />
                        </RadioGroup>
                            :
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                required={true}
                                value="no"
                            >
                                <FormControlLabel value="yes" onClick={(e) => { setCovidStatus('yes') }} control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" onClick={(e) => { setCovidStatus("no") }} control={<Radio />} label="No" />
                            </RadioGroup>
                        }
                        <FormLabel style={{ fontSize: 22 }}>Vaccination Details</FormLabel>
                        <FormLabel id="demo-radio-buttons-group-label">Are you vaccinated ?</FormLabel>
                        {
                            vaccinated == "yes" ?
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    required={true}
                                    value="yes"
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" onClick={(e) => { setVaccinated("yes") }} />
                                    <FormControlLabel value="no" control={<Radio />} label="No" onClick={(e) => { setVaccinated("no"); vaccinDateRef.current.value = ""; vaccinDoseRef.current.value = "" }} />
                                </RadioGroup>
                                :
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    required={true}
                                    value="no"
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" onClick={(e) => { setVaccinated("yes") }} />
                                    <FormControlLabel value="no" control={<Radio />} label="No" onClick={(e) => { setVaccinated("no"); vaccinDateRef.current.value = ""; vaccinDoseRef.current.value = "" }} />
                                </RadioGroup>
                        }

                        {
                            vaccinated == "yes" &&
                            <>

                                <FormLabel id="demo-radio-buttons-group-label">if yes when ?</FormLabel>
                                <TextField

                                    required
                                    id="standard-helperText"
                                    type="date"
                                    defaultValue={teacher.vaccinationDate}

                                    inputRef={vaccinDateRef}
                                />
                                <TextField

                                    required
                                    id="standard-helperText"
                                    placeholder="Number of doses"
                                    type="number"
                                    defaultValue={teacher.vaccinationDose}
                                    inputRef={vaccinDoseRef}
                                />
                            </>
                        }
                        <Button disabled={loading} variant="contained" onClick={submitted}>Update data</Button>
                    </Card>
                }
            </div >
        </div>
    )
}

export default UpdateProfile