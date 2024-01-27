import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    username:"",
    password:"",
    isAuthenticated:false,
    isWrongPassword:false,
    message:''
}

export const LoggedInUserSlice = createSlice({
    name:"loggedInUser",
    initialState,
    reducers:{
        setUsername: (state,action) =>{
            state.username = action.payload
        },
        setPassword: (state,action ) => {
            state.password = action.payload
        },
        setIsAuthenticated: (state,action) => {
            state.isAuthenticated = action.payload
        },
        setIsWrongPassword: (state,action) => {
            state.isWrongPassword = action.payload
        },
        setMessage: (state,action) => {
            state.message = action.payload
        }
    }
})

export const {setUsername,setPassword,setIsAuthenticated,setIsWrongPassword,setMessage} = LoggedInUserSlice.actions

export default LoggedInUserSlice.reducer