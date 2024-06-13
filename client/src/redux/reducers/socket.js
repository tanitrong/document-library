import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  socketId: null,
  onlineUsers: [],
};
export const socketReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("SetSocketId", (state, action) => {
      state.socketId = action.payload;
    })
    .addCase("setOnlineUsers", (state, action) => {
      state.onlineUsers = action.payload;
    })
    .addCase("CloseSocket", (state) => {
      if (state.socketId) {
        state.socketId.close();
        state.socketId = null;
        state.onlineUsers = [];
      }
    });
});
