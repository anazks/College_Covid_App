import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Alert, Button, FormLabel, MenuItem, Select, TextField } from '@mui/material'
import { useRef, useState } from "react";
import { useAuth } from "../../store/AuthContext"
import { useNavigate } from "react-router-dom";

const NewExam = ({ title }) => {

    const { sendMessage } = useAuth();

    const titleRef = useRef();
    const subjectRef = useRef();
    const msgRef = useRef();
    const examDateRef = useRef();
    const [department, setDepartment] = useState()



    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const submitted = async (e) => {
        e.preventDefault();
        let examObj = {
            title: titleRef.current.value,
            subject: subjectRef.current.value,
            department,
            msg: msgRef.current.value,
            examDate: examDateRef.current.value,
            from: 'admin',
            appliedUsers: []
        }
        console.log(examObj)
        try {
            setError("")
            setLoading(true)
            let result = await sendMessage(examObj)
            console.log(result)
            navigate("/admin/students/exams");
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
                                    placeholder="Exam Title"
                                    id="outlined-multiline-flexible"
                                    inputRef={titleRef}
                                />
                            </div>
                            <div className="formInput">
                                <TextField
                                    required
                                    id="standard-helperText"
                                    placeholder="Subject Name"
                                    type="text"
                                    inputRef={subjectRef}
                                />
                            </div>
                            <div className="formInput">
                                <TextField
                                    required
                                    id="standard-helperText"
                                    placeholder="Description"
                                    type="text"
                                    inputRef={msgRef}
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
                                <FormLabel id="demo-radio-buttons-group-label"> Date of Examination</FormLabel>
                                <TextField
                                    required
                                    id="standard-helperText"
                                    type="date"
                                    inputRef={examDateRef}
                                />
                            </div>

                            <div className="formInput">
                                <Button disabled={loading} variant="contained" onClick={submitted}>Add Exam</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewExam;
