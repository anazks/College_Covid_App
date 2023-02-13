import React, { useEffect, useState } from 'react'
import Banner from '../Banner'
import Map from '../Map'
import Navbar from '../Navbar'
import Footer from '../Footer'
import "./home.css"
import { useAuth } from '../../../store/AuthContext'
import { firestore } from '../../../firebase/config'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const { currentUser } = useAuth()
    const [std, setStd] = useState(false)
    const navigate = useNavigate()
    async function checkStudent() {
        firestore.collection('userdata').where('email', '==', currentUser.email).get().then((result) => {
            if (result.size == 0) {
                navigate("/login")
            } else {
                setStd(true)
            }
        })
    }
    useEffect(() => {
        checkStudent();
    }, [])
    return (
        <>
            {
                std &&
                <div>
                    <Navbar feeds />
                    <Banner />
                    <Map />
                    <Footer />
                </div>
            }
        </>
    )
}

export default HomePage