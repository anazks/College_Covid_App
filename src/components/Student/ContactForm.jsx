import React, { useRef, useState } from 'react'
import { Alert, Button, Typography } from '@mui/material';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';

import "./cotactform.css"
import { useAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';

function ContactForm() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const messageRef = useRef()
    const { currentUser, sendMessage } = useAuth()
    const navigate = useNavigate();
    const handleSubmit = async () => {
        let msgObj = {
            from: currentUser.email,
            to: 'admin',
            message: messageRef.current.value,
            date: new Date(),
            dateString: new Date().toLocaleDateString()
        }
        console.log(msgObj)
        try {
            setError("")
            setLoading(true)
            let { id } = await sendMessage(msgObj)
            console.log(id)
            messageRef.current.value = ""
            setSuccess(true)
            navigate('/notifications')
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
        setLoading(false)
    }
    return (
        <div className='contact-form'>
            <Typography fontWeight={700} fontSize={'36px'}>Help Desk</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">MEssage sent </Alert>}
            <div className="icon-group">
                <CallRoundedIcon fontSize="large" color="info" />
                <ChatRoundedIcon fontSize="large" color="info" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <textarea
                    aria-label="minimum height"
                    rows="7"
                    ref={messageRef}
                    placeholder=" Message......"
                    style={{ width: 700, padding: '10px', fontSize: "20px", borderColor: '#426ff5', borderRadius: '10px' }}
                />
                <Button variant="contained" style={{ marginTop: '10px' }} onClick={handleSubmit}>Send Message</Button>
            </div>
            <div className="footer">
                <Typography fontWeight={700} fontSize={'32px'}>Covid Special Examination</Typography>
                <div className="para-container" style={{ display: "flex", justifyContent: "space-around" }}>
                    <p className="para">Live meeting Schedules for 00:00 - 00:00</p>
                    <Button disabled={loading} variant="contained" style={{ width: "200px" }}>Join</Button>
                </div>
            </div>

        </div>
    )
}

export default ContactForm