import "./datatable.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const VaccinatedTable = ({ vList, vTeacherList }) => {
    const navigate = useNavigate()
    const [user, setuser] = useState()
    useEffect(() => {
        if (vList)
            setuser(vList)
        else if (vTeacherList)
            setuser(vTeacherList)
        console.log(user)

    }, [])
    const viewUser = (obj) => {
        navigate("/admin/students/student", { state: obj })
    }
    return (
        <div className="datatable">
            <div className="datatableTitle">
                VACCINATED {vList ? 'STUDENTS' : 'TEACHERS'}
            </div>
            <table className="datagrid" >
                <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Vaccination Status</th>
                    <th>Vaccinated Date</th>
                    <th>No of Doses</th>
                    <th>Action</th>
                </tr>
                {

                    user && user.map((obj) => (
                        <tr>
                            <td>{obj.name} </td>
                            <td>{obj.department} </td>
                            <td style={obj.vaccinated == "yes" ? { backgroundColor: "#96fa84", borderRadius: '10px' } : { backgroundColor: "#ff8c8c", borderRadius: '10px' }}>{obj.vaccinated} </td>
                            <td>{obj.vaccinationDate}</td>
                            <td>{obj.vaccinationDose}</td>
                            <td className="cellAction">
                                <button className="viewButton" onClick={() => { viewUser(obj) }}>View</button></td>
                        </tr>
                    ))
                }
            </table>
        </div>
    );
};

export default VaccinatedTable;
