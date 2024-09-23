import { Category, CategoryState } from "@/core/types/category";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Initial state using the entity adapter's state management

// Fetch all categories
export const getAllCategories = createAsyncThunk(
  "courses/categories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/courses/catagories");
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        typedError.response?.data || "Failed to fetch categories"
      );
    }
  }
);

// Create a new category
export const createCategory = createAsyncThunk<Category, FormData>(
  "category/create",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/courses/createCategory",
        formData
      );
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        typedError.response?.data || "failed to create category"
      );
    }
  }
);


// Update a category
export const updateCategory = createAsyncThunk<
  Category,
  { categoryData: Partial<Category> }
>("category/update", async (categoryData, thunkAPI) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/courses/updateCategory`,
      categoryData
    );
    return response.data;
  } catch (error) {
    const typedError = error as AxiosError;

    return thunkAPI.rejectWithValue(
      typedError.response?.data || "Failed to update category"
    );
  }
});

//delete category
export const deleteCategory = createAsyncThunk<number, number>(
  "category/delete",
  async (categoryId: number, thunkAPI) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/courses/delete-categories/${categoryId}`);
      return categoryId;
    } catch (error) {
      const typedError = error as AxiosError;

      return thunkAPI.rejectWithValue(
        typedError.response?.data || "fail to delete-categories"
      );
    }
  }
);

// Create the slice
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [] as Category[] | null,
    status: "idle",
    error: null,
  } as CategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all categories
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      // Create category
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items?.push(action.payload);
      })
      // Delete category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items?.filter((item)=> item.id !== action.payload) || null
      })
      // Update category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items?.findIndex(
          (item) => item.id === action.payload.id
        );
        if (state.items && index !== undefined && index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Handle loading state
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      // Handle rejected state with proper error handling
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = 'failed';
          state.error = action.type;
        }
      );
  },
});


// Selectors for the categories
export const selectAllCategories = (state: {categories: CategoryState;}) => state.categories.items
export const selectCategoryStatus = (state: { categories: CategoryState }) => state.categories.status;
export const selectCategoryError = (state: { categories: CategoryState }) => state.categories.error;

export default categorySlice.reducer;
