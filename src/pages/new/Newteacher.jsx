import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Alert, Button, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import { useRef, useState } from "react";
import { useAuth } from "../../store/AuthContext"
import { useNavigate } from "react-router-dom";

const New = ({ title }) => {

    const { addTeachertoDB } = useAuth();

    const [showDiv, setShowDiv] = useState(false);

    const [covidStatus, setCovidStatus] = useState();
    const [vaccinated, setVaccinated] = useState();
    const [department, setDepartment] = useState('');

    const nameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const subjectRef = useRef();
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
            department,
            subject: subjectRef.current.value,
            covidStatus,
            vaccinated,
            vaccinationDate: vaccinDateRef.current.value,
            vaccinationDose: vaccinDoseRef.current.value
        }
        console.log(teacherObj)
        try {
            setError("")
            setLoading(true)
            let result = await addTeachertoDB(teacherObj)
            console.log(result)
            navigate("/admin");
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
        setLoading(false)
    }
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                            alt=""
                            style={{ marginTop: '30px' }}
                        />
                    </div>
                    <div className="right">
                        <form>
                            {error && <Alert severity="error">{error}</Alert>}

                            <div className="formInput">
                                <TextField
                                    required
                                    placeholder="Name"
                                    id="outlined-multiline-flexible"
                                    inputRef={nameRef}
                                />
                            </div>
                            <div className="formInput">
                                <TextField
                                    required
                                    id="standard-helperText"
                                    placeholder="Mobile Number"
                                    type="number"
                                    inputRef={phoneRef}
                                />
                            </div>
                            <div className="formInput">
                                <TextField
                                    required
                                    id="standard-helperText"
                                    placeholder="Email id"
                                    type="email"
                                    inputRef={emailRef}
                                />
                            </div>

                            <div className="formInput">
                                <FormLabel id="demo-radio-buttons-group-label">Department</FormLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="simple-select"
                                    style={{ width: '200px' }}
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
                            </div>
                            <div className="formInput">
                                <TextField
                                    required
                                    id="standard-helperText"
                                    placeholder="Subject"
                                    type="text"
                                    inputRef={subjectRef}
                                />
                            </div>
                            <div className="formInput">
                                <FormLabel id="demo-radio-buttons-group-label">Covid Status?</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    required={true}
                                >
                                    <FormControlLabel value="yes" onClick={(e) => { setCovidStatus(e.target.value) }} control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" onClick={(e) => { setCovidStatus(e.target.value) }} control={<Radio />} label="No" />
                                </RadioGroup>
                            </div>
                            <div className="formInput">
                                <FormLabel id="demo-radio-buttons-group-label"> vaccination Status ?</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    required={true}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" onClick={(e) => { setShowDiv(true); setVaccinated("yes") }} />
                                    <FormControlLabel value="no" control={<Radio />} label="No" onClick={(e) => { setShowDiv(false); setVaccinated("no") }} />
                                </RadioGroup>
                            </div>

                            <div className="formInput">
                                <FormLabel id="demo-radio-buttons-group-label">Vaccinated Date ?</FormLabel>
                                <TextField
                                    disabled={!showDiv}
                                    required
                                    id="standard-helperText"
                                    type="date"
                                    inputRef={vaccinDateRef}
                                />
                            </div>
                            <div className="formInput">
                                <TextField
                                    disabled={!showDiv}
                                    required
                                    id="standard-helperText"
                                    placeholder="Number of doses"
                                    type="number"
                                    inputRef={vaccinDoseRef}
                                />
                            </div>
                            <div className="formInput">
                                <Button disabled={loading} variant="contained" onClick={submitted}>Add Teacher</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New;
