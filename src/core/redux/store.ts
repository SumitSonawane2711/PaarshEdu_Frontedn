import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './slices/course_slice'
import usersReducer from './slices/user_slice'
import categoryReducers from './slices/category_slice'
import instructorReducer from './slices/instructor_slice'
const store = configureStore({
  reducer: {
    courses: coursesReducer,
    users: usersReducer,
    categories: categoryReducers,
    instructors: instructorReducer,
  },
});

export default store;

// Optional: Export RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
