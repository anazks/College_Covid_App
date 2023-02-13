import { Button, Card } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../../firebase/config';
import { useAuth } from '../../../store/AuthContext'
import Navbar from '../Navbar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SendIcon from '@mui/icons-material/Send';

function Notifications() {
    const { currentUser, getAllMessages } = useAuth();
    const [messages, setMessages] = useState()
    const navigate = useNavigate()
    const clickDelete = (id) => {
        firestore.collection('notifications').doc(id).delete().then(() => {
            navigate('/')
        })
    }
    async function fetchMessage() {
        let msgArr = []
        try {
            let result = await getAllMessages()
            result.forEach((m) => {
                var data = m.data()
                if (data.from == currentUser.email) {
                    msgArr.push({ docId: m.id, ...m.data() })
                }
            })
        } catch (error) {
            console.log(error)
        }
        console.log(msgArr)
        setMessages(msgArr)
    }
    useEffect(() => {
        fetchMessage();
    }, [])
    return (
        <div>
            <Navbar />
            <h1 style={{ marginLeft: '20vw', marginTop: '10vh' }}>
                Your Messages
            </h1>
            <br />
            <div style={{ display: 'flex' }}>
                {
                    messages &&
                    <div className='left' style={{ marginLeft: '20px', width: '80vw', padding: '20px', display: 'flex', flexDirection: 'column' }}>
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
            </div>
        </div>
    )
}

export default Notifications