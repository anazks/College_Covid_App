import "./datatable.scss";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Button from '@mui/material/Button';
// import { firestore } from "../../firebase/config";

const MessageTable = ({ messages }) => {
    // const navigate = useNavigate()
    // const clickDelete = (id) => {
    //     firestore.collection('notifications').doc(id).delete().then(() => {
    //         navigate('/')
    //     })
    // }
    return (
        <div className="datatable">
            <div className="datatableTitle">
                MESSAGES
            </div>
            <table className="datagrid" >
                <tr>
                    <th >From</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
                {

                    messages.map((message) => (
                        <tr>
                            <td>{message.from} </td>
                            <td>{message.message}</td>
                            <td>{message.dateString} </td>
                            {/* <td><Button onClick={() => { clickDelete(message.docID) }}>Delete </Button></td> */}
                        </tr>
                    ))
                }
            </table>
        </div >
    );
};

export default MessageTable;
