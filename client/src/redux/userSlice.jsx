import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id:"",
  name:"",
  email:"",
  profile_pic:"",
  token:"",
  onlineUser:[],
  socketConnect:  null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,action)=>{
        state._id =action.payload._id
        state.name = action.payload.name
        state.email = action.payload.name
        state.profile_pic = action.payload.profile_pic
    },
    setToken : (state,action)=>{
        state.token = action.payload
    },
    logout: (state,action)=>{
        state._id =""
        state.name = ""
        state.email = ""
        state.profile_pic = ""
        state.token =  ""
        state.socketConnect = null
    },
    setOnlineUser:  (state,action)=>{
      state.onlineUser = action.payload
    },
    setSocketConnection:(state,action)=>{
      state.socketConnect =  action.payload
    }
  },
})


export const {setUser,setToken,logout , setOnlineUser,setSocketConnection  } = userSlice.actions

export default userSlice.reducer