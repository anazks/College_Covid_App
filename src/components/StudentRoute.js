import React from 'react'
import { Navigate } from "react-router-dom"
import { useAuth } from '../store/AuthContext'

export default function StudentRoute({ children }) {
    const { currentUser } = useAuth()
    if (currentUser)
        return currentUser.displayName == "Student" ? children : <Navigate to="/login" />
    else return <Navigate to="/login" />
}
