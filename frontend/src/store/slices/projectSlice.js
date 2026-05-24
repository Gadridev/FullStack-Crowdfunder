import { getInvestorsOfProject, getProjectById, listMyProjects } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk(
  "/projects",
  async (_, { rejectWithValue }) => {
    try {
      const data = await listMyProjects();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "failed");
    }
  },
);

export const getProject = createAsyncThunk(
  "/project",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getProjectById(id);
      if (!data) return rejectWithValue("Projet introuvable");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "failed");
    }
  },
);
export const getInvestorsProject = createAsyncThunk(
  "/project/investor",
  async (projectId, { rejectWithValue }) => {
    try {
      const data = await getInvestorsOfProject(projectId);
      if (!data) return rejectWithValue("Projet introuvable");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "failed");
    }
  },
);
const initialState = {
  projects: [],
  project: null,
  investors: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload.data.projects;
        state.loading = false;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "something went wrong";
      })
      .addCase(getProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.project = action.payload;
        state.loading = false;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "something went wrong";
      })
      .addCase(getInvestorsProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvestorsProject.fulfilled, (state, action) => {
        state.loading = false;
        state.investors = action.payload.data.investors ?? [];
      })
      .addCase(getInvestorsProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
