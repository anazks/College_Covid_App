import React, { useContext, useState, useEffect } from "react"
import { auth, firestore } from "../firebase/config"


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        return auth.signOut()
    }


    function addUsertoDB(userdata) {
        return firestore.collection('userdata').add(userdata)
    }
    function getUserData(email) {
        return firestore.collection('userdata').where("email", "==", email).get()
    }
    function updateUserData(userdata, docId) {
        return firestore.collection('userdata').doc(docId).set(userdata)
    }
    function sendMessage(msgObj) {
        return firestore.collection('notifications').add(msgObj)
    }
    function getMessages(mail) {
        return firestore.collection('notifications').where("from", '==', mail).get()
    }
    function getExamNotifications() {
        return firestore.collection('notifications').where("from", '==', 'admin').get()
    }
    function adminLogin(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function getAllUsers() {
        return firestore.collection('userdata').get()
    }
    function getAllMessages() {
        return firestore.collection('notifications').get()
    }
    function getVaccinatedUsers() {
        return firestore.collection('userdata').where("vaccinated", "==", "yes").get()
    }

    function getUsersCount() {
        firestore.collection('userdata').get().then((snapshot) => {
            console.log(snapshot.size)
            return (snapshot.size)
        })
    }
    function deleteUser(docId) {
        return firestore.collection('userdata').doc(docId).delete()
    }
    function applyExam(examObj, docId) {
        return firestore.collection('notifications').doc(docId).set(examObj)
    }


    function getAllTeachers() {
        return firestore.collection('teacherdata').get()
    }
    function addTeachertoDB(data) {
        return firestore.collection('teacherdata').add(data)
    }
    function getTeacherData(email) {
        return firestore.collection('teacherdata').where("email", "==", email).get()
    }
    function updateTeacherData(data, id) {
        return firestore.collection('teacherdata').doc(id).set(data)
    }
    function deleteTeacher(docId) {
        return firestore.collection('teacherdata').doc(docId).delete()
    }
    function getVaccinatedTeachers() {
        return firestore.collection('teacherdata').where("vaccinated", "==", "yes").get()
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        addUsertoDB,
        getUserData,
        updateUserData,
        sendMessage,
        getMessages,
        adminLogin,
        getAllUsers,
        getAllMessages,
        getVaccinatedUsers,
        getUsersCount,
        deleteUser,
        getExamNotifications,
        applyExam,
        addTeachertoDB,
        getTeacherData,
        updateTeacherData,
        getAllTeachers,
        deleteTeacher,
        getVaccinatedTeachers
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}