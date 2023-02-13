import { Alert, Button, Card, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { firestore } from '../../../firebase/config';
import { useAuth } from '../../../store/AuthContext';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('')

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { login, logout } = useAuth()
    const navigate = useNavigate();
    const submitted = async (e) => {
        try {
            setError("")
            setLoading(true)
            await login(email, password);
            firestore.collection('userdata').where("email", '==', email).get().then(async (result) => {
                if (result.size != 0) {
                    console.log(result.size)
                    navigate('/')
                } else {
                    setError('User Not Available')
                    await logout()
                }
            })

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
            height: "100vh"
        }}>
            <Card sx={{ maxWidth: 380, p: 3, minHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: "space-evenly" }}>
                <Typography color="text.secondary" fontSize={32} gutterBottom>
                    Student Login
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    error={false}
                    required
                    id="outlined-required"
                    label="Email id"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <br />
                <Button disabled={loading} variant="contained" onClick={submitted}>Login</Button>
                Doesn't have account <Link to="/register">register now</Link>
            </Card>
        </div>
    )
}

export default Login