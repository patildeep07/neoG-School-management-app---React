import { configureStore } from "@reduxjs/toolkit";
import { StudentSlice } from "./pages/students/studentSlice";
import { SchoolSlice } from "./pages/school/schoolSlice";
import { TeacherSlice } from "./pages/teachers/teacherSlice";

// console.log({ StudentSlice });

export default configureStore({
  reducer: {
    students: StudentSlice.reducer,
    school: SchoolSlice.reducer,
    teachers: TeacherSlice.reducer
  }
});
