import "./datatable.scss";
import { Link, useNavigate } from "react-router-dom";

const Datatable = ({ teacherList }) => {
    const navigate = useNavigate()
    const viewUser = (obj) => {
        navigate("/admin/teachers/teacher", { state: obj })
    }



    return (
        <div className="datatable">
            <div className="datatableTitle">
                TEACHERS
                <Link to="/admin/teachers/new" className="link">
                    Add New
                </Link>
            </div>
            <table className="datagrid" >
                <tr>
                    <th >Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>subject</th>
                    <th>Action</th>
                </tr>
                {

                    teacherList.map((teacher) => (
                        <tr>
                            <td>{teacher.name} </td>
                            <td>{teacher.phoneNumber}</td>
                            <td>{teacher.email} </td>
                            <td>{teacher.department} </td>
                            <td>{teacher.subject} </td>
                            <td className="cellAction">
                                <button className="viewButton" onClick={() => { viewUser(teacher) }}>View Profile</button></td>
                        </tr>
                    ))
                }
            </table>
        </div >
    );
};

export default Datatable;
