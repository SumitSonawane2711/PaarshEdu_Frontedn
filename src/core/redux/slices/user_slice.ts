
import axiosClient from '@/core/axios/axiosClient';
import { signupSchema, loginSchema } from '@/core/schemas';
import { User, UserState } from '@/core/types/user';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  { AxiosError } from 'axios';
import { z } from 'zod';

//fetch all users
// Async thunk to fetch all users
export const getAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    'user/fetchAll',
    async (_, thunkAPI) => {
      try {
        const response = await axiosClient.get<{ data: User[] }>('/user');
        return response.data.data;
      } catch (error) {
        const typedError = error as AxiosError<{ message: string }>;
        const errorMessage = typedError.response?.data?.message || 'Failed to fetch all users';
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  )

type UserInput = z.infer<typeof signupSchema>;
// Async thunk for user registration
export const registerUser = createAsyncThunk<User, UserInput>(
    'user/register',
    async (userData, thunkAPI) => {
        try {
            const response = await axiosClient.post('/user/register', userData);
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
            const response = await axiosClient.post('/user/login', loginData);
            return response.data.data;
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
            
            const response = await axiosClient.post(`/user/deleteUser/${userId}`)
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
            const response = await axiosClient.post(
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
    items: [] as User[],
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    status: 'idle',
    error: null,
  };
 
 const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllUsers.pending, (state) => {
            state.status = 'loading';
            state.error = null;
          })
          .addCase(getAllUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
          })
          .addCase(getAllUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
          })
        .addCase(registerUser.fulfilled, (state, action) => {
         state.items.push(action.payload);
       })
       .addCase(loginUser.fulfilled,(state, action) => {
        state.items.push(action.payload)
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

 
 export default userSlice.reducer;

 export const selectAllUsers = (state: { user: UserState }) => state.user.items;
 export const selectCurrentUser = (state: { user: UserState }): UserState['user'] => state.user.user;
 export const selectUserStatus = (state: { user: UserState }): UserState['status'] => state.user.status;
 export const selectUserError = (state: { user: UserState }): UserState['error'] => state.user.error;
 export const selectIsLoggedIn = (state: { user: UserState }): boolean => state.user? true : false;
 