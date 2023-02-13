import React from 'react'
import { Navigate } from "react-router-dom"
import { useAuth } from '../store/AuthContext'

export default function TeacherRoute({ children }) {
    const { currentUser } = useAuth()
    if (currentUser)
        return currentUser.displayName == "TEACHER" ? children : <Navigate to="/teacher/login" />
    else return <Navigate to="/teacher/login" />
}
