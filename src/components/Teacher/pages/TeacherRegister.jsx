import React, { useState } from 'react'
import { Alert, Button, Card, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { useAuth } from "../../../store/AuthContext"
import { Link, useNavigate } from 'react-router-dom';

function StaffRegister() {
    const [showDiv, setShowDiv] = useState(false);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('')
    const [department, setDepartment] = useState("");
    const [subject, setSubject] = useState("");
    const [covidStatus, setCovidStatus] = useState("");
    const [vaccinated, setVaccinated] = useState("");
    const [vaccinationDate, setVaccinationDate] = useState();
    const [vaccinationDose, setVaccinationDose] = useState();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { signup, addTeachertoDB } = useAuth()
    const navigate = useNavigate();
    const submitted = async (e) => {
        e.preventDefault();
        console.log(name, phoneNumber, vaccinated, email, department, subject, covidStatus, vaccinationDate, vaccinationDose);
        let teacherObj = {
            name,
            phoneNumber,
            email,
            department,
            subject,
            covidStatus,
            vaccinated,
            vaccinationDate,
            vaccinationDose
        }

        console.log(teacherObj)
        try {
            setError("")
            setLoading(true)
            console.log(teacherObj)
            let result = await signup(email, password);
            await result.user.updateProfile({ displayName: "TEACHER" });
            teacherObj.id = result.user.uid
            result = await addTeachertoDB(teacherObj)
            console.log(result)
            navigate("/teacher");
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
        setLoading(false)
    }
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            padding: "10vh"
        }}>
            <Card sx={{ maxWidth: 380, p: 3, minHeight: 1200, display: 'flex', flexDirection: 'column', justifyContent: "space-evenly" }}>
                <Typography color="text.secondary" fontSize={32} fontWeight={600} gutterBottom>
                    Register as Teacher
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <FormLabel style={{ fontSize: 22 }}>Personal Details</FormLabel>
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    onChange={(e) => { setName(e.target.value) }}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Mobile Number"
                    type="number"
                    onChange={(e) => { setPhoneNumber(e.target.value) }}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Email id"
                    type="email"
                    onChange={(e) => { setEmail(e.target.value) }}
                />

                <TextField
                    error={false}
                    required
                    id="outlined-required"
                    label="Password"
                    onChange={(e) => { setPassword(e.target.value) }}
                    type="password"
                />
                <FormLabel >Department</FormLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Department"
                    placeholder='Department'
                    value={department}
                    onChange={(e) => { setDepartment(e.target.value) }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"CS"}>CS</MenuItem>
                    <MenuItem value={"CHEMISTRY"}>CHEMISTRY</MenuItem>
                    <MenuItem value={"MBA"}>MBA</MenuItem>
                    <MenuItem value={"MATHS"}>MATHS</MenuItem>
                    <MenuItem value={"COMMERCE"}>COMMERCE</MenuItem>
                    <MenuItem value={"ENGLISH"}>ENGLISH</MenuItem>
                </Select>
                <TextField
                    required
                    id="outlined-required"
                    label="Subject"
                    type="text"
                    onChange={(e) => { setSubject(e.target.value) }}
                />
                <FormLabel style={{ fontSize: 22 }}>Covid Details</FormLabel>
                <FormLabel id="demo-radio-buttons-group-label">Are you covid positive?</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    required={true}
                >
                    <FormControlLabel value="yes" onClick={(e) => { setCovidStatus(e.target.value) }} control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" onClick={(e) => { setCovidStatus(e.target.value) }} control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel style={{ fontSize: 22 }}>Vaccination Details</FormLabel>
                <FormLabel id="demo-radio-buttons-group-label">Are you vaccinated ?</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    required={true}
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" onClick={(e) => { setShowDiv(true); setVaccinated("yes"); }} />
                    <FormControlLabel value="no" control={<Radio />} label="No" onClick={(e) => { setShowDiv(false); setVaccinated("no"); setVaccinationDose(false); setVaccinationDate(false) }} />
                </RadioGroup>

                <FormLabel id="demo-radio-buttons-group-label">if yes when ?</FormLabel>
                <TextField
                    disabled={!showDiv}
                    required
                    id="outlined-required"
                    type="date"
                    onChange={(e) => { setVaccinationDate(e.target.value) }}
                />
                <TextField
                    disabled={!showDiv}
                    required
                    id="outlined-required"
                    label="Number of doses"
                    type="number"
                    onChange={(e) => { setVaccinationDose(e.target.value) }}
                />

                <Button disabled={loading} variant="contained" onClick={submitted}>Register as Teacher</Button>
                Already have an account <span><Link to="/teacher/login">login now</Link></span>
            </Card>
        </div >
    )
}

export default StaffRegister