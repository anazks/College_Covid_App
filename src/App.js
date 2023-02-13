import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthProvider } from "./store/AuthContext"

import StudentLogin from './components/Student/Pages/Login';
// import AdminLogin from './components/Admin/Login';
import Register from './components/Student/Pages/Register';
import HomePage from './components/Student/Pages/HomePage';
import ContactPage from './components/Student/Pages/ContactPage';
import Profile from './components/Student/Pages/Profile';
import UpdateProfile from './components/Student/Pages/UpdateProfile';
import Notifications from './components/Student/Pages/Notifications';
import ExamNotifications from './components/Student/Pages/ExamNotifications';
import StudentRoute from './components/StudentRoute';
import AdminRoute from './components/AdminRoute';
import NewExam from "./pages/new/NewExam";
import TeacherRegister from "./components/Teacher/pages/TeacherRegister";
import TeacherHomePage from "./components/Teacher/pages/TeacherHomePage";
import TeacherProfile from "./components/Teacher/pages/TeacherProfile";
import TeacherUpdateProfile from "./components/Teacher/pages/UpdateProfile";
import TeacherRoute from "./components/TeacherRoute";
import TeacherLogin from "./components/Teacher/pages/TeacherLogin";
import TeacherContactPage from "./components/Teacher/pages/TeacherContactPage";
import TeacherNotifications from "./components/Teacher/pages/TeacherNotifications";
import NewTeacher from "./pages/new/Newteacher";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin">
              <Route index element={<AdminRoute><Home /></AdminRoute>} />
              <Route path="login" element={<Login />} />
              <Route path="students">
                <Route index element={<AdminRoute><List students="Students" /></AdminRoute>} />
                <Route path="student" element={<AdminRoute><Single student /></AdminRoute>} />
                <Route path="vaccinated" element={<AdminRoute><List vaccinated="vaccinated" student /></AdminRoute>} />
                <Route path="covid-status" element={<AdminRoute><List covidStatus="covid-status" student /></AdminRoute>} />
                <Route path="add-notification" element={<AdminRoute><NewExam title="Add New Exam Notification" /></AdminRoute>} />
                <Route path="Exams" element={<AdminRoute><List exams="Exams" /></AdminRoute>} />
                <Route
                  path="new"
                  element={<AdminRoute><New title="Add New Student" /></AdminRoute>}
                />
              </Route>
              <Route path="messages" element={<AdminRoute><List messages="Messages" /></AdminRoute>} />
              <Route path="teachers">
                <Route index element={<AdminRoute><List teachers="Teachers" /></AdminRoute>} />
                <Route path="teacher" element={<AdminRoute><Single teacher /></AdminRoute>} />
                <Route
                  path="new"
                  element={<AdminRoute><NewTeacher title="Add New Teacher" /></AdminRoute>}
                />
                <Route path="covid-status" element={<AdminRoute><List covidStatus="covid-status" teacher /></AdminRoute>} />
                <Route path="vaccinated" element={<AdminRoute><List vaccinated="vaccinated" teacher /></AdminRoute>} />
              </Route>
            </Route>

            <Route path='/' >
              <Route path='register' element={<Register />} />
              <Route path='login' element={<StudentLogin />} />
              <Route index element={<StudentRoute><HomePage /></StudentRoute>} />
              <Route path='contact' element={<StudentRoute><ContactPage /></StudentRoute>} />
              <Route path='profile' element={<StudentRoute><Profile /></StudentRoute>} />
              <Route path='update-profile' element={<StudentRoute><UpdateProfile /></StudentRoute>} />
              <Route path='notifications' element={<StudentRoute><Notifications /></StudentRoute>} />
              <Route path='exam-notifications' element={<StudentRoute><ExamNotifications /></StudentRoute>} />
            </Route>

            <Route path='/teacher' >
              <Route path='register' element={<TeacherRegister />} />
              <Route path='login' element={<TeacherLogin />} />
              <Route index element={<TeacherRoute><TeacherHomePage /></TeacherRoute>} />
              <Route path='profile' element={<TeacherRoute><TeacherProfile /></TeacherRoute>} />
              <Route path='update-profile' element={<TeacherRoute><TeacherUpdateProfile /></TeacherRoute>} />
              <Route path='contact' element={<TeacherRoute><TeacherContactPage /></TeacherRoute>} />
              <Route path='notifications' element={<TeacherRoute><TeacherNotifications /></TeacherRoute>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
