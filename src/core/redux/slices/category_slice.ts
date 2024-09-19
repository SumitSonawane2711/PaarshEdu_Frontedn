import { Category, CategoryState } from "@/core/types/category";
import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Create an entity adapter for categories
const categoriesAdapter = createEntityAdapter<Category>();

// Thunks for async operations

// Fetch all categories
export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/v1/courses/catagories");
      return response.data as Category[];
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
  "categories/create",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("/api/v1/courses/createCategory", formData);
      return response.data as Category;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        typedError.response?.data || "Failed to create category"
      );
    }
  }
);

// Delete a category
export const deleteCategory = createAsyncThunk<number, number>(
  "categories/delete",
  async (categoryId, thunkAPI) => {
    try {
      await axios.post(`/api/v1/courses/delete-categories/${categoryId}`);
      return categoryId;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        typedError.response?.data || "Failed to delete category"
      );
    }
  }
);

// Update a category
export const updateCategory = createAsyncThunk<Category, { categoryData: Partial<Category> }>(
  "categories/update",
  async ({ categoryData }, thunkAPI) => {
    try {
      const response = await axios.post(`/api/v1/courses/updateCategory`, categoryData);
      return response.data as Category;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        typedError.response?.data || "Failed to update category"
      );
    }
  }
);

// Create the slice

const categorySlice = createSlice({
  name: "categories",
  initialState: categoriesAdapter.getInitialState<CategoryState>({
    items: [] as Category[],
    status: "idle",
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all categories
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        categoriesAdapter.setAll(state, action.payload);
      })
      // Create category
      .addCase(createCategory.fulfilled, (state, action) => {
        categoriesAdapter.addOne(state, action.payload);
      })
      // Delete category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        categoriesAdapter.removeOne(state, action.payload);
      })
      // Update category
      .addCase(updateCategory.fulfilled, (state, action) => {
        categoriesAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      })
      // Handle pending state
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      // Handle rejected state
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.type as string;
        }
      );
  },
});

// Selectors
export const selectAllCategories = (state: { category: CategoryState }) => state.category.items;
export const selectCategoryStatus = (state: { courses: CategoryState }) => state.courses.status;
export const selectCategoryError = (state: { courses: CategoryState }) => state.courses.error;

export default categorySlice.reducer;
