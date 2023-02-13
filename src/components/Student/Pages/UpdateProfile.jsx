import React, { useState, useEffect, useRef } from 'react'
import { Alert, Button, Card, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { useAuth } from "../../../store/AuthContext"
import { useLocation, useNavigate } from 'react-router-dom';

import Navbar from '../Navbar';

function UpdateProfile() {
    const [user, setUser] = useState();
    const { updateUserData } = useAuth();
    const location = useLocation()
    useEffect(() => {
        setLoading(true)
        setUser(location.state.user)
        setLoading(false)
        setCovidStatus(location.state.user && location.state.user.covidStatus)
        setVaccinated(location.state.user && location.state.user.vaccinated)
    }, [])
    const [showDiv, setShowDiv] = useState(false);

    const [covidStatus, setCovidStatus] = useState();
    const [vaccinated, setVaccinated] = useState();
    const nameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const regRef = useRef();
    const courseRef = useRef();
    const deptRef = useRef();
    const vaccinDateRef = useRef();
    const vaccinDoseRef = useRef();



    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const submitted = async (e) => {
        e.preventDefault();
        setCovidStatus(covidStatus ? covidStatus : user.covidStatus)
        console.log(covidStatus)
        setVaccinated(vaccinated ? vaccinated : user.vaccinated)
        let userObj = {
            name: nameRef.current.value,
            phoneNumber: phoneRef.current.value,
            email: emailRef.current.value,
            regNumber: regRef.current.value,
            department: deptRef.current.value,
            course: courseRef.current.value,
            covidStatus,
            vaccinated,
            vaccinationDate: (vaccinDateRef.current != null ? vaccinDateRef.current.value : false),
            vaccinationDose: (vaccinDoseRef.current != null ? vaccinDoseRef.current.value : false)
        }
        console.log(userObj, user.docId)
        try {
            setError("")
            setLoading(true)
            updateUserData(userObj, user.docId).then((result) => {
                console.log(result)
                navigate("/profile");
            })
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
        setLoading(false)
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
                    user &&

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
                            defaultValue={user.name}
                            inputRef={nameRef}
                        />
                        <TextField
                            required
                            id="standard-helperText"
                            placeholder="Mobile Number"
                            type="number"
                            defaultValue={parseInt(user.phoneNumber)}
                            inputRef={phoneRef}
                        />
                        <TextField
                            required
                            id="standard-helperText"
                            placeholder="Email id"
                            type="email"
                            defaultValue={user.email}
                            inputRef={emailRef}
                        />
                        <TextField
                            required
                            id="standard-helperText"
                            placeholder="Register Number"
                            type="number"
                            defaultValue={parseInt(user.regNumber)}
                            inputRef={regRef}
                        />
                        <TextField
                            required
                            id="standard-helperText"
                            placeholder="Departmnet"
                            type="text"
                            defaultValue={user.department}
                            inputRef={deptRef}
                        />
                        <TextField
                            required
                            id="standard-helperText"
                            placeholder="Course"
                            type="text"
                            defaultValue={user.course}

                            inputRef={courseRef}
                        />
                        <FormLabel style={{ fontSize: 22 }}>Covid Details</FormLabel>
                        <FormLabel id="demo-radio-buttons-group-label">Are you covid positive?</FormLabel>
                        {covidStatus == "yes" ? <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            required={true}
                            value="yes"

                        >
                            <FormControlLabel value="yes" onClick={(e) => { setCovidStatus("yes") }} control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" onClick={(e) => { setCovidStatus("no") }} control={<Radio />} label="No" />
                        </RadioGroup>
                            :
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                required={true}
                                value="no"
                            >
                                <FormControlLabel value="yes" onClick={(e) => { setCovidStatus("yes") }} control={<Radio />} label="Yes" />
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
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" onClick={(e) => { setShowDiv(true); setVaccinated("yes") }} />
                                    <FormControlLabel value="no" control={<Radio />} label="No" onClick={(e) => { setShowDiv(false); setVaccinated("no"); vaccinDateRef.current.value = false; vaccinDoseRef.current.value = false }} />
                                </RadioGroup>
                                :
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    required={true}
                                    value="no"

                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" onClick={(e) => { setShowDiv(true); setVaccinated("yes") }} />
                                    <FormControlLabel value="no" control={<Radio />} label="No" onClick={(e) => { setShowDiv(false); setVaccinated("no"); vaccinDateRef.current.value = false; vaccinDoseRef.current.value = false }} />
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
                                    defaultValue={user.vaccinationDate}

                                    inputRef={vaccinDateRef}
                                />
                                <TextField
                                    required
                                    id="standard-helperText"
                                    placeholder="Number of doses"
                                    type="number"
                                    defaultValue={user.vaccinationDose}
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