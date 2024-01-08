import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  teachers: [],
  status: "idle",
  error: null
};

// Functions

// 1. Fetch teachers

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await axios.get(
      "https://assignment-20.patildeep07.repl.co/teachers"
    );

    return response.data.teachers;
  }
);

// 2. Add teacher

export const addTeacherAsync = createAsyncThunk(
  "teachers/addTeacherAsync",
  async (newTeacher) => {
    const response = await axios.post(
      "https://assignment-20.patildeep07.repl.co/teachers",
      newTeacher
    );

    return response.data.teacher;
  }
);

// 3. Update teacher details

export const updateTeacherAsync = createAsyncThunk(
  "teachers/updateTeacherAsync",
  async ({ id, updatedTeacher }) => {
    console.log(id, updatedTeacher);
    const response = await axios.post(
      `https://assignment-20.patildeep07.repl.co/teachers/${id}`,
      updatedTeacher
    );

    console.log({ response });
    return response.data;
  }
);

// 4. Delete teacher object

export const deleteTeacherAsync = createAsyncThunk(
  "teachers/deleteTeacherAsync",
  async (id) => {
    const response = await axios.delete(
      `https://assignment-20.patildeep07.repl.co/teachers/${id}`
    );

    console.log({ response });
    return response.data.teacher;
  }
);

// Slice

export const TeacherSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: {
    // Fetch teachers
    [fetchTeachers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchTeachers.fulfilled]: (state, action) => {
      state.status = "success";

      state.teachers = action.payload;
    },
    [fetchTeachers.rejected]: (state, action) => {
      state.status = "error";
      console.log(action.error.message);
      state.error = action.error.message;
    },

    // Add teacher
    [addTeacherAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addTeacherAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.teachers = [...state.teachers, action.payload];
    },
    [addTeacherAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    // Update teacher details
    [updateTeacherAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateTeacherAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedTeacher = action.payload;

      state.teachers = state.teachers.map((teacher) => {
        if (teacher._id === updatedTeacher._id) {
          return { ...updatedTeacher };
        } else {
          return teacher;
        }
      });
    },
    [updateTeacherAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    // Delete teacher details
    [deleteTeacherAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteTeacherAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload._id
      );
    },
    [deleteTeacherAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export default TeacherSlice.reducer;
