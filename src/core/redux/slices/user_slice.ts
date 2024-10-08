
import { formSchema, loginSchema } from '@/core/schemas';
import { User, UserState } from '@/core/types/user';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { z } from 'zod';

type UserInput = z.infer<typeof formSchema>;

// Async thunk for user registration
export const registerUser = createAsyncThunk<User, UserInput>(
    'user/register',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/register', userData);
            return response.data.user;
        } catch (error) {
            const typedError = error as AxiosError;
            const errorMessage = typedError.response?.data || 'Failed to register user';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Async thunk for user login
type LoginInput = z.infer<typeof loginSchema>;

export const loginUser = createAsyncThunk<User, LoginInput>(
    'user/login',
    async (loginData, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/login', loginData);
            return response.data.user;
        } catch (error) {
            const typedError = error as AxiosError;
            const errorMessage = typedError.response?.data || 'Failed to login';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const deleteUser = createAsyncThunk<number,number>(
    'user/delete',
    async(userId,thunkAPI) => {
        try {
            console.log("userId :",userId);
            
            const response = await axios.post(`http://localhost:3000/api/v1/courses/deleteuser/${userId}`)
            return response.data;
        } catch (error) {
            const typedError = error as AxiosError;
            return thunkAPI.rejectWithValue(typedError.response?.data || 'fail to delete instructor')
        }
    }
);

export const updateUser  = createAsyncThunk<User,{ userData: Partial<User> }>(  
    "user/update",
    async(userData,thunkAPI) => {        
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/courses/updateUser",
                userData
              );
              
              return response.data;
        } catch (error){
            const typedError = error as AxiosError;
            return thunkAPI.rejectWithValue(typedError.response?.data || "failed to update instructor")
        }
    }
)

const initialState: UserState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'), // Load user from localStorage
    status: 'idle',
    error: null,
  };
 
 const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            // console.log('action google payload : ', action.payload)
            state.user = action.payload;
          },
    },
    extraReducers: (builder) => {
       builder
          .addCase(registerUser.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(registerUser.fulfilled, (state, action) => {
             state.status = 'succeeded';
             state.user = action.payload;
             localStorage.setItem('user', JSON.stringify(action.payload)); // Save user to localStorage
          })
          .addCase(registerUser.rejected, (state, action) => {
             state.status = 'failed';
             state.error = action.error.message || 'Failed to register';
          })
          .addCase(loginUser.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(loginUser.fulfilled, (state, action) => {
             state.status = 'succeeded';
             state.user = action.payload;
             localStorage.setItem('user', JSON.stringify(action.payload)); // Save user to localStorage
          })
          .addCase(loginUser.rejected, (state, action) => {
             state.status = 'failed';
             state.error = action.error.message || 'Failed to login';
          })
          .addCase(updateUser.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(updateUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Save user to localStorage
         })
         .addCase(updateUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to update';
         })         
    },
 });
 
 export default userSlice.reducer;
  
 export const selectCurrentUser = (state: { user: UserState }): UserState['user'] => state.user.user;
 export const selectUserStatus = (state: { user: UserState }): UserState['status'] => state.user.status;
 export const selectUserError = (state: { user: UserState }): UserState['error'] => state.user.error;
 export const selectIsLoggedIn = (state: { user: UserState }): boolean => state.user? true : false;
 