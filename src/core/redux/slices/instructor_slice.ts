import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Instructor, InstructorState } from "@/core/types/user";


//fetch all instrucotrs
export const getAllInstrucotrs  = createAsyncThunk<Instructor[]>(
    'instructor/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/api/v1/courses/instructor');
            return response.data.data;
        } catch (error) {
            const typedError = error as AxiosError;
            return thunkAPI.rejectWithValue(typedError.response?.data || 'fail to fetch all Instructor')
        }
    }
);

export const createInstructor  = createAsyncThunk<Instructor,FormData>(
    'instructor/create',
    async(formData,thunkAPI) => {
        try {
            const response = await axios.post("/api/v1/courses/createInstructor",formData);
            return response.data;
        } catch (error) {
            const typedError = error as AxiosError;
            return thunkAPI.rejectWithValue(typedError.response?.data || 'fail to create instructor')
        }
    }
);

export const deleteInstructor = createAsyncThunk<number,number>(
    'instructor/delete',
    async(instructorId,thunkAPI) => {
        try {
            console.log("instructorId :",instructorId);
            
            const response = await axios.post(`/api/v1/courses/deleteinstructor/${instructorId}`)
            return response.data;
        } catch (error) {
            const typedError = error as AxiosError;
            return thunkAPI.rejectWithValue(typedError.response?.data || 'fail to delete instructor')
        }
    }
);

export const updateInstructor  = createAsyncThunk<
Instructor,
{ instructorData: Partial<Instructor> }
>(  "instructor/update",
    async(instructorData,thunkAPI) => {
        console.log("instructorData :",instructorData);
        
        try {
            const response = await axios.post(
                "/api/v1/courses/updateInstructor",
                instructorData
              );
              
              return response.data;
        } catch (error){
            const typedError = error as AxiosError;
            return thunkAPI.rejectWithValue(typedError.response?.data || "failed to update instructor")
        }
    }
)

//create the slice
const instructorSlice = createSlice({
    name: 'instructor',
    initialState : {
        items: [] as Instructor[],
        instructor:[],
        currenItem: null as Instructor | null,
        status: 'idle',
        error: null,
    } as InstructorState,
    reducers: {},
    extraReducers(builder) {
        builder
           .addCase(getAllInstrucotrs.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
           })
           .addCase(createInstructor.fulfilled, (state, action) => {
            state.items.push(action.payload);
          })
           .addMatcher(
            (action)=> action.type.endsWith('/pending'),
            (state) => {
                state.status = 'loading';
            }
           )
           .addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state) => {
                state.status = 'failed';
            } 
           );
    },
});

//

export default instructorSlice.reducer;

// selectors
export const selectAllInstructors = (state: {instructors: InstructorState}) => state.instructors.items;
