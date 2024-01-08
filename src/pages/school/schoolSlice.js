import { createSlice } from "@reduxjs/toolkit";

export const SchoolSlice = createSlice({
  name: "school",
  initialState: {
    totalStudents: 0,
    averageAttendance: 0,
    averageMarks: 0,
    topStudent: null
  },
  reducers: {
    setSchoolDetails: (state, action) => {
      const {
        totalStudents,
        averageAttendance,
        averageMarks,
        topStudent
      } = action.payload;
      state.totalStudents = totalStudents;
      state.averageAttendance = averageAttendance;
      state.averageMarks = averageMarks;
      state.topStudent = topStudent;
    },
    setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    }
  }
});

export const { setSchoolDetails, setTopStudent } = SchoolSlice.actions;
export default SchoolSlice.reducer;
