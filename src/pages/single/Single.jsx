import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthContext"

const Single = ({ teacher, student }) => {
  const location = useLocation();
  const [std, setStd] = useState();
  const [teacherObj, setTeacherObj] = useState();
  const { deleteTeacher } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (teacher) {
      setTeacherObj(location.state)
    } else if (student) {
      setStd(location.state)
    }

  }, [])
  console.log(std)
  const clickDeleteUser = async (docId) => {
    console.log(docId)
    await deleteTeacher(docId);
    navigate("/admin/teachers")
  }
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        <div className="top">
          <div className="left">
            {std && <div className="editButton" onClick={() => { clickDeleteUser(std.docID) }}> Delete</div>}
            {teacherObj && <div className="editButton" onClick={() => { clickDeleteUser(teacherObj.docID) }}> Delete</div>}
            <h1 className="title">{std ? 'Student' : 'Teacher'} Information</h1>
            {
              std &&
              <div className="item">
                <img
                  src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{std.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{std.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{std.phoneNumber}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Register Number:</span>
                    <span className="itemValue">{std.regNumber}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Department:</span>
                    <span className="itemValue">{std.department}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Course:</span>
                    <span className="itemValue">{std.course}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Vaccinated:</span>
                    <span className="itemValue">{std.vaccinated}</span>
                  </div>
                  {std.vaccinated == "yes" &&
                    <>
                      <div className="detailItem">
                        <span className="itemKey">No of Doses:</span>
                        <span className="itemValue">{std.vaccinationDose}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Vaccinated Date :</span>
                        <span className="itemValue">{std.vaccinationDate}</span>
                      </div>
                    </>
                  }

                  <div className="detailItem">
                    <span className="itemKey">Covid Status:</span>
                    <span className="itemValue">{std.covidStatus}</span>
                  </div>
                </div>
              </div>
            }
            {
              teacherObj &&
              <div className="item">
                <img
                  src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{teacherObj.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{teacherObj.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{teacherObj.phoneNumber}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Department:</span>
                    <span className="itemValue">{teacherObj.department}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Subject:</span>
                    <span className="itemValue">{teacherObj.subject}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Vaccinated:</span>
                    <span className="itemValue">{teacherObj.vaccinated}</span>
                  </div>
                  {teacherObj.vaccinated == "yes" &&
                    <>
                      <div className="detailItem">
                        <span className="itemKey">No of Doses:</span>
                        <span className="itemValue">{teacherObj.vaccinationDose}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Vaccinated Date :</span>
                        <span className="itemValue">{teacherObj.vaccinationDate}</span>
                      </div>
                    </>
                  }
                  <div className="detailItem">
                    <span className="itemKey">Covid Status:</span>
                    <span className="itemValue">{teacherObj.covidStatus}</span>
                  </div>
                </div>
              </div>
            }

          </div>
        </div>

      </div>
    </div >
  );
};

export default Single;
