import { Button, Card } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../../firebase/config';
import { useAuth } from '../../../store/AuthContext'
import Navbar from '../Navbar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SendIcon from '@mui/icons-material/Send';

function ExamNotifications() {
    const { currentUser, getAllMessages, applyExam } = useAuth();
    const [exams, setExams] = useState();
    const [appliedExams, setAppliedExams] = useState();
    const navigate = useNavigate()

    async function fetchMessage() {
        let examArr = []
        let appliedArr = []
        try {
            let result = await getAllMessages()
            result.forEach((m) => {
                var data = m.data()
                if (data.from == "admin") {
                    console.log(m.id)
                    if (data.appliedUsers.length != 0) {
                        let exist = false;
                        data.appliedUsers.forEach((mail) => {
                            if (mail == currentUser.email) {
                                console.log("equal", data.appliedUsers)
                                exist = true; //for checking wheather the email exist
                            }
                        })
                        if (!exist) examArr.push({ docId: m.id, ...m.data() })
                        else appliedArr.push({ docId: m.id, ...m.data() })
                    } else examArr.push({ docId: m.id, ...m.data() })
                }
            })

        } catch (error) {
            console.log(error)
        }
        // console.log("applied", appliedArr, "exam", examArr)
        setExams(examArr)
        setAppliedExams(appliedArr)
    }
    useEffect(() => {
        fetchMessage();
    }, [])
    const clickedApply = async (examObj) => {
        try {
            examObj.appliedUsers.push(currentUser.email);
            await applyExam(examObj, examObj.docId)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Navbar exams />
            <h1 style={{ marginLeft: '20vw', marginTop: '10vh' }}>
                Covid Special Exams
            </h1>
            <br />
            <div style={{ display: 'flex' }}>
                {exams &&
                    <div className='left' style={{ marginLeft: '20px', width: '40vw', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                        <h2 className="sub-title">Exam Notifications</h2>
                        {
                            exams.map(element => (
                                <Card style={{ padding: '20px', margin: '10px', backgroundColor: "#c2fffd", display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <p><strong>{element.title}</strong></p>
                                        <p>date : <strong>{element.examDate}</strong></p>
                                        <p>subject : <strong>{element.subject}</strong></p>
                                        <p>  {element.msg}</p>
                                        <p>Department : {element.department}</p>
                                        <p>from : {element.from}</p>
                                    </div>
                                    <div><Button variant="contained" style={{ marginTop: '20px' }} onClick={() => clickedApply(element)}><SendIcon />&nbsp;&nbsp;Apply</Button></div>
                                </Card>
                            ))
                        }
                    </div>
                }
                {appliedExams &&
                    <div className='left' style={{ marginLeft: '20px', width: '40vw', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                        <h2 className="sub-title">Applied Exams </h2>
                        {
                            appliedExams.map(element => (
                                <Card style={{ padding: '20px', margin: '10px', backgroundColor: "#bdffca", display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <p><strong>{element.title}</strong></p>
                                        <p>date : <strong>{element.examDate}</strong></p>
                                        <p>subject : <strong>{element.subject}</strong></p>
                                        <p>  {element.msg}</p>
                                        <p>Department : {element.department}</p>
                                        <p>from : {element.from}</p>
                                    </div>
                                    <div><Button color="success" variant="contained" style={{ marginTop: '20px' }} ><CheckCircleOutlineIcon />&nbsp; &nbsp;Applied</Button></div>
                                </Card>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default ExamNotifications