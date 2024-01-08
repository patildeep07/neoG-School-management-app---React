import "./styles.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { StudentsPage } from "./pages/students/studentsPage";
import { StudentForm } from "./pages/students/studentForm";
import { StudentDetails } from "./pages/students/studentDetails";
import { SchoolView } from "./pages/school/schoolView";
import { ClassView } from "./pages/class/classView";
import { TeachersPage } from "./pages/teachers/teachersPage";
import { TeacherForm } from "./pages/teachers/teacherForm";
import { TeacherDetails } from "./pages/teachers/teacherDetails";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header>
        <h1 onClick={() => navigate("/")}>Schooler</h1>
        <nav className="navBar">
          {/* <li onClick={() => navigate("/")}>Home</li> */}
          <li onClick={() => navigate("/students")}>Students</li>
          <li onClick={() => navigate("/teachers")}>Teachers</li>
          <li onClick={() => navigate("/class")}>Class</li>
          <li onClick={() => navigate("/")}>School</li>
        </nav>
      </header>

      <div className="main-body">
        <Routes>
          <Route path="/" element={<SchoolView />} />

          {/* Student  routes */}
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/students/add" element={<StudentForm />} />
          <Route path="/students/edit/:studentId" element={<StudentForm />} />
          <Route path="/students/:studentId" element={<StudentDetails />} />

          {/* Class routes */}
          <Route path="/class" element={<ClassView />} />

          {/* Teacher routes */}
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/teachers/add" element={<TeacherForm />} />
          <Route path="/teachers/edit/:teacherId" element={<TeacherForm />} />
          <Route path="/teachers/:teacherId" element={<TeacherDetails />} />
        </Routes>
      </div>

      <br />
    </div>
  );
}
