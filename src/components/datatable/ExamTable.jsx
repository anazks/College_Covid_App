import "./datatable.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/config";
import { Alert, Button } from "@mui/material"
// import { useState } from "react";

const ExamTable = ({ exams }) => {
    // const [applied, setApplied] = useState(0)
    const [ex, setEx] = useState()
    useEffect(() => {

    }, [ex])
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const clickDelete = (id) => {
        firestore.collection('notifications').doc(id).delete().then(() => {
            setSuccess(true)
            navigate('/admin/')
        })
    }
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Exams Details
            </div>
            {
                success && <Alert >Deleted Exam Successfully</Alert>
            }
            <table className="datagrid" >
                <tr>
                    <th >Title</th>
                    <th>Date</th>
                    <th>Department</th>
                    <th>Number of Applicants</th>
                    <th></th>
                </tr>
                {

                    exams.map((exam) => (
                        <tr>
                            <td>{exam.title} </td>
                            <td>{exam.examDate}</td>
                            <td>{exam.department} </td>
                            <td>{exam && exam.appliedUsers.length}</td>
                            <td><Button variant="contained" color="error" onClick={() => { clickDelete(exam.docID) }}>Delete </Button></td>
                        </tr>
                    ))
                }
            </table>
        </div >
    );
};

export default ExamTable;
