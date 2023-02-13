import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./footer.css"

function Footer() {
    return (
        <div className='footer'>
            <Typography fontWeight={700} fontSize={'32px'}>Covid Special Examination</Typography>
            <div className="para-container" style={{ display: "flex", justifyContent: "space-around" }}>
                <p className="para">There May be Covid special exams  added by admin. Please go to Notifications section and find yousrself</p>
                <Link to="/notifications" style={{ textDecoration: 'none' }}><Button variant="contained" style={{ width: "200px" }} >View</Button></Link>
            </div>
        </div>
    )
}

export default Footer