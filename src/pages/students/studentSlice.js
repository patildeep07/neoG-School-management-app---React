import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  students: [],
  status: "idle",
  error: null,
  classSortBy: "All",
  filter: "All",
  sortBy: "Select",
};

// Functions

// 1. Get all students

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://neog-school-management.onrender.com/students"
    );

    return response.data.student;
  }
);

// 2. Add a new student

export const addStudentAsync = createAsyncThunk(
  "students/addStudentAsync",
  async (newStudent) => {
    const response = await axios.post(
      "https://neog-school-management.onrender.com/students",
      newStudent
    );

    return response.data.student;
  }
);

// 3. Update a student details

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudentAsync",
  async ({ id, updatedStudent }) => {
    console.log(id, updatedStudent);
    const response = await axios.put(
      `https://neog-school-management.onrender.com/students/${id}`,
      updatedStudent
    );

    return response.data.student;
  }
);

// 4. Deleting student details

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudentAsync",
  async (id) => {
    const response = await axios.delete(
      `https://neog-school-management.onrender.com/students/${id}`
    );

    // console.log({ response });
    return response.data.student;
  }
);

// Creating slice

export const StudentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    // Class view functions
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.status = "success";

      state.students = action.payload;
    },
    [fetchStudents.rejected]: (state, action) => {
      state.status = "error";
      console.log(action.error.message);
      state.error = action.error.message;
    },

    // Add student
    [addStudentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addStudentAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.students = [...state.students, action.payload];
    },
    [addStudentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    // Update student details

    [updateStudentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateStudentAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload;

      state.students = state.students.map((student) => {
        if (student._id === updatedStudent._id) {
          return { ...updatedStudent };
        } else {
          return student;
        }
      });
    },
    [updateStudentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    // Delete student

    [deleteStudentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteStudentAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.students = state.students.filter(
        (student) => student._id !== action.payload._id
      );
    },
    [deleteStudentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    // Extra reducers ends
  },
});

export const { setFilter, setSortBy } = StudentSlice.actions;

export default StudentSlice.reducer;
