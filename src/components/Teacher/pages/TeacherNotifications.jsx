import { Button, Card } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../../firebase/config';
import { useAuth } from '../../../store/AuthContext'
import Navbar from '../Navbar';

function Notifications() {
    const { currentUser, getAllMessages, applyExam } = useAuth();
    const [messages, setMessages] = useState()
    const [exams, setExams] = useState();
    const navigate = useNavigate()
    const clickDelete = (id) => {
        firestore.collection('notifications').doc(id).delete().then(() => {
            navigate('/teacher')
        })
    }
    async function fetchMessage() {
        try {
            let result = await getAllMessages()
            let obj = []
            let obj2 = []
            result.forEach((m) => {
                var data = m.data()
                if (data.from == currentUser.email) {
                    obj.push({ docId: m.id, ...m.data() })
                }
                if (data.from == "admin") {
                    obj2.push({ docId: m.id, ...m.data() })
                }
            })
            setMessages(obj)
            setExams(obj2)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchMessage()
    }, [])
    return (
        <div>
            <Navbar />

            <h1 style={{ marginLeft: '20vw', marginTop: '10vh' }}>
                Notifications
            </h1>

            <br />
            <div style={{ display: 'flex' }}>
                {
                    messages &&
                    <div className='left' style={{ marginLeft: '20px', width: '40vw', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                        <h2 className="sub-title">Sent Messages</h2>
                        {
                            messages.map(element => (
                                <Card style={{ padding: '20px', margin: '10px', backgroundColor: "#b2d8f7" }}>
                                    <p>To : {element.to}</p>
                                    <p>message : {element.message}</p>
                                    <p>date : {element.dateString}</p>
                                    <td><Button variant="contained" color="error" style={{ marginTop: '20px' }} onClick={() => { clickDelete(element.docId) }}>Delete </Button></td>
                                </Card>
                            ))
                        }
                    </div>
                }
                {
                    exams &&
                    <div className='left' style={{ marginLeft: '20px', width: '40vw', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                        <h2 className="sub-title">Exam Notifications</h2>
                        {
                            exams.map(element => (
                                <Card style={{ padding: '20px', margin: '10px', backgroundColor: "#71f58f", display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <p><strong>{element.title}</strong></p>
                                        <p>date : <strong>{element.examDate}</strong></p>
                                        <p>subject : <strong>{element.subject}</strong></p>
                                        <p>  {element.msg}</p>
                                        <p>Department : {element.department}</p>
                                        <p>from : {element.from}</p>
                                    </div>

                                </Card>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Notifications