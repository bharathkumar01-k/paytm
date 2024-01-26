import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    username:"",
    password:""
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
        }
    }
})

export const {setUsername,setPassword} = LoggedInUserSlice.actions

export default LoggedInUserSlice.reducer