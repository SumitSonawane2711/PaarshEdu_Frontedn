// features/coursesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  { AxiosError } from "axios";
import { Course, CoursesState } from "../../types/courses";
import axiosClient from '../../axios/axiosClient'


//
export const fetchCourses = createAsyncThunk<Course[]>(
  "courses/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("/courses");
      return response.data.data;
    } catch (error) {
      const typedError = error as AxiosError;

      return thunkAPI.rejectWithValue(
        typedError.response?.data || "Failed to fetch courses"
      );
    }
  }
);

//get course by catagoriesId
export const getCourseByCatagory = createAsyncThunk<Course[], number>(
  "courses/fetchByCatagory",
  async (categoryId: number, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/courses/catagories/${categoryId}`);
      return response.data; // Ensure this is an array of Course objects
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        typedError.response?.data || "Failed to fetch courses"
      );
    }
  }
);


//get course by ID
export const fetchCourseById = createAsyncThunk<Course, number>(
  "courses/fetchById",
  async (courseId, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        typedError.response?.data || "Failed to fetch course"
      );
    }
  }
);

export const addCourse = createAsyncThunk<Course, FormData>(
  "courses/add",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        "/courses/createCourse",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        typedError.response?.data || "Failed to add course"
      );
    }
  }
);

//update course
export const updateCourse = createAsyncThunk<Course, FormData>(
  "courses/update",
  async (courseData, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        `/courses/updateCourse`,
        courseData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        typedError.response?.data || "Failed to update course"
      );
    }
  }
);

export const deleteCourse = createAsyncThunk<number, number>(
  "courses/delete",
  async (courseId: number, thunkAPI) => {
    try {
      await axiosClient.post(`/courses/deleteCourse/${courseId}`);
      return courseId;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        typedError.response?.data || "Failed to delete course"
      );
    }
  }
);

// Create the slice
const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    items: [] as Course[],
    categories: [],
    currentItem: null as Course | null,
    status: "idle",
    error: null,
  } as CoursesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getCourseByCatagory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentItem = action.payload;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.status = "failed";
        }
      );
  },
});

export default coursesSlice.reducer;

// Selectors
export const selectAllCourses = (state: { courses: CoursesState }) =>
  state.courses.items;
export const selectCurrentCourse = (state: { courses: CoursesState }) =>
  state.courses.currentItem;
export const selectCoursesStatus = (state: { courses: CoursesState }) =>
  state.courses.status;
export const selectCoursesError = (state: { courses: CoursesState }) =>
  state.courses.error;
