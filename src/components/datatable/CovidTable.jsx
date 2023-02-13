import "./datatable.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CovidTable = ({ userList, teacherList }) => {
    const navigate = useNavigate()
    const [list, setList] = useState()
    useEffect(() => {
        // console.log(userList)
        // console.log(teacherList)
        if (userList)
            setList(userList)
        else if (teacherList)
            setList(teacherList)
    }, [])
    const viewUser = (obj) => {
        if (userList)
            navigate("/admin/students/student", { state: obj })
        else if (teacherList)
            navigate("/admin/teachers/teacher", { state: obj })
    }
    return (
        <div className="datatable">
            <div className="datatableTitle">
                {userList ? 'STUDENTS' : 'TEACHERS'} COVID-STATUS
            </div>
            <table className="datagrid" >
                <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Contact No</th>
                    <th>Mail Id</th>
                    <th>Covid Status</th>
                    <th>Action</th>
                </tr>
                {

                    list && list.map((user) => (
                        <tr>
                            <td>{user.name} </td>
                            <td>{user.department} </td>
                            <td>{user.phoneNumber} </td>
                            <td>{user.email} </td>
                            <td style={user.covidStatus == "yes" ? { backgroundColor: "#ff8c8c", borderRadius: '10px', width: '30px' } : { backgroundColor: "#96fa84", borderRadius: '10px' }}>{user.covidStatus} </td>
                            <td className="cellAction">
                                <button className="viewButton" onClick={() => { viewUser(user) }}>View</button></td>
                        </tr>
                    ))
                }
            </table>
        </div>
    );
};

export default CovidTable;
