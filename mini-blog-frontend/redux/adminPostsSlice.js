import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/admin/posts';

export const fetchAdminPosts = createAsyncThunk('admin/fetchPosts', async () => {
  const res = await fetch(API_URL);
  return await res.json();
});

export const addAdminPost = createAsyncThunk('admin/addPost', async (post) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  });
  return await res.json();
});

export const updateAdminPost = createAsyncThunk('admin/updatePost', async ({ id, ...post }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  });
  return await res.json();
});

export const deleteAdminPost = createAsyncThunk('admin/deletePost', async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return id;
});

const slice = createSlice({
  name: 'adminPosts',
  initialState: { posts: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(addAdminPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updateAdminPost.fulfilled, (state, action) => {
        const idx = state.posts.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) state.posts[idx] = action.payload;
      })
      .addCase(deleteAdminPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(p => p.id !== action.payload);
      });
  },
});

export default slice.reducer;
