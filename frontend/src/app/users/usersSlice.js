import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    firstName:"",
    lastName:"",
    username:"",
    password:""
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserName: (state,action) => {
            state.username = action.payload
        },
        setFistName: (state,action) => {
            state.firstName = action.payload
        },
        setLastName: (state,action) => {
            state.lastName = action.payload
        },
        setPassword: (state,action) => {
            state.password = action.payload
        }
    }
})

export const {setUserName,setFistName,setLastName,setPassword} = userSlice.actions
export default userSlice.reducer