import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import MessageTable from "../../components/datatable/MessageTable"
import { useEffect, useState } from "react"
import { useAuth } from "../../store/AuthContext"
import VaccinatedTable from "../../components/datatable/VaccinatedTable"
import CovidTable from "../../components/datatable/CovidTable"
import ExamTable from "../../components/datatable/ExamTable"
import TeacherTable from "../../components/datatable/TeacherTable"

const List = ({ students, messages, vaccinated, covidStatus, exams, teachers, teacher, student }) => {
  const { getAllUsers, getAllMessages, getVaccinatedUsers, getVaccinatedTeachers, getAllTeachers } = useAuth()
  const [userList, setUserList] = useState()
  const [teacherList, setTeacherList] = useState()
  const [msgList, setMsgList] = useState();
  const [examList, setExamList] = useState();
  const [vList, setVList] = useState()
  const [vTeachersList, setVTeachersList] = useState()
  async function fetchAllUsers() {
    try {
      let snapshot = await getAllUsers();
      let list = []
      snapshot.forEach((obj) => {
        var data = obj.data()
        data.docID = obj.id
        if (data.course) {
          list.push(data)
        }
      })
      setUserList(list)
      console.log(userList)
    } catch (error) {
      console.log(error)
    }
  }
  async function fetchAllTeachers() {
    try {
      let snapshot = await getAllTeachers();
      let list = []
      snapshot.forEach((obj) => {
        var data = obj.data()
        data.docID = obj.id
        list.push(data)
      })
      setTeacherList(list)
      console.log(teacherList)
    } catch (error) {
      console.log(error)
    }
  }
  async function fetchVaccinatedUsers() {
    try {
      let snapshot = await getVaccinatedUsers();
      let list = []
      snapshot.forEach((obj) => {
        var data = obj.data()
        data.docID = obj.id
        list.push(data)
      })
      setVList(list)
      console.log(vList)
    } catch (error) {
      console.log(error)
    }
  }
  async function fetchVaccinatedTeachers() {
    try {
      let snapshot = await getVaccinatedTeachers();
      let list = []
      snapshot.forEach((obj) => {
        var data = obj.data()
        data.docID = obj.id
        list.push(data)
      })
      setVTeachersList(list)
      console.log(vList)
    } catch (error) {
      console.log(error)
    }
  }
  async function fetchAllMessages() {
    try {
      let snapshot = await getAllMessages();
      let list = [];
      let list2 = []
      snapshot.forEach((obj) => {
        var data = obj.data()
        if (data.from != "admin") {
          data.docID = obj.id
          list.push(data)
        } else {
          data.docID = obj.id
          list2.push(data)
        }
      })
      setMsgList(list)
      setExamList(list2)
      console.log(setMsgList)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (students)
      fetchAllUsers();
    else if (messages || exams)
      fetchAllMessages();
    else if (vaccinated && student)
      fetchVaccinatedUsers()
    else if (vaccinated && teacher)
      fetchVaccinatedTeachers()
    else if (teachers) {
      fetchAllTeachers();
    } else if (student) {
      fetchAllUsers();
    } else if (teacher) {
      fetchAllTeachers();
    }
  }, [])
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {students && userList && <Datatable userList={userList} />}
        {teachers && teacherList && <TeacherTable teacherList={teacherList} />}

        {covidStatus && student && userList && <CovidTable userList={userList} />}
        {covidStatus && teacher && teacherList && <CovidTable teacherList={teacherList} />}

        {messages && msgList && <MessageTable messages={msgList} />}
        {exams && examList && <ExamTable exams={examList} />}
        {student && vaccinated && vList && <VaccinatedTable vList={vList} />}
        {teacher && vaccinated && vTeachersList && <VaccinatedTable vTeacherList={vTeachersList} />}
      </div>
    </div>
  )
}

export default List