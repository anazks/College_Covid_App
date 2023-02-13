import React from 'react'
import ContactForm from '../ContactForm'
import Navbar from '../Navbar'

function ContactPage() {
    return (
        <div>
            <Navbar contact />
            <ContactForm />
        </div>
    )
}

export default ContactPage