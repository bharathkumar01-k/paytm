import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    username:"",
    password:"",
    isAuthenticated:false
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
        }
    }
})

export const {setUsername,setPassword,setIsAuthenticated} = LoggedInUserSlice.actions

export default LoggedInUserSlice.reducer