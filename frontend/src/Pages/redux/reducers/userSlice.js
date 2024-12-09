import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: JSON.parse(localStorage.getItem("userData")) || null,
    token: localStorage.getItem("userToken") || null,
  },
  reducers: {
    login: (state, current) => {
      state.data=current.payload.data
      localStorage.setItem("userData", JSON.stringify(current.payload.data))
      state.token=current.payload.token
      localStorage.setItem("userToken", current.payload.token)
    },
    logout: (state, current) => {
      state.data=null
      state.token=null
      localStorage.removeItem("userData");
      localStorage.removeItem("userToken");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;