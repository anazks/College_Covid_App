import "./datatable.scss";
import { Link, useNavigate } from "react-router-dom";

const Datatable = ({ userList }) => {
  const navigate = useNavigate()
  const viewUser = (obj) => {
    navigate("/admin/students/student", { state: obj })
  }



  return (
    <div className="datatable">
      <div className="datatableTitle">
        STUDENTS
        <Link to="/admin/students/new" className="link">
          Add New
        </Link>
      </div>
      <table className="datagrid" >
        <tr>
          <th >Name</th>
          <th>Contact</th>
          <th>Email</th>
          <th>Register No</th>
          <th>Department</th>
          <th>Course</th>
          <th>Action</th>
        </tr>
        {

          userList.map((user) => (
            <tr>
              <td>{user.name} </td>
              <td>{user.phoneNumber}</td>
              <td>{user.email} </td>
              <td>{user.regNumber} </td>
              <td>{user.department} </td>
              <td>{user.course} </td>
              <td className="cellAction">
                <button className="viewButton" onClick={() => { viewUser(user) }}>View</button></td>
            </tr>
          ))
        }
      </table>
    </div >
  );
};

export default Datatable;
