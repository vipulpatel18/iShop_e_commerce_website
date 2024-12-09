import { createSlice } from '@reduxjs/toolkit';


export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    data: JSON.parse(localStorage.getItem("adminData")) || null,
    token: localStorage.getItem("adminToken") || null,
  },
  reducers: {
    login: (state, current) => {
      state.data=current.payload.data
      localStorage.setItem("adminData", JSON.stringify(current.payload.data))
      state.token=current.payload.token
      localStorage.setItem("adminToken", current.payload.token)
    },
    logout: (state, current) => {
      state.data=null
      state.token=null
      localStorage.removeItem("adminData");
      localStorage.removeItem("adminToken");
    },
  },
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;