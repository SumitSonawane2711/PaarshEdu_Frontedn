import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './slices/course_slice'
import usersReducer from './slices/user_slice'
import categoryReducer from './slices/category_slice'
import instructorReducer from './slices/instructor_slice'
const store = configureStore({
  reducer: {
    courses: coursesReducer,
    users: usersReducer,
    categories: categoryReducer,
    instructors: instructorReducer,
  },
});


// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export store
export default store;
