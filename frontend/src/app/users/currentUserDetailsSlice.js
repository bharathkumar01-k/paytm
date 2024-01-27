import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    usersList:[]
}

export const currentUserDetailsSlice = createSlice({
    name:"currentUser",
    initialState,
    reducers:{
        setUserName:(state,action ) =>{
            state.username = action.payload
        },
        setFistName: (state,action) => {
            state.firstName = action.payload
        },
        setLastName: (state,action) => {
            state.lastName = action.payload
        },
        setBalance: (state,action) => {
            state.balance = action.payload
        },
        setUserId: (state,action) => {
            state.userId = action.payload
        },
        setUsersList: (state,action) =>{
            state.usersList = action.payload
        },
        setUserDetails: (state,action) => {
            state = action.payload
        }
    }
})

export const {setUserName,setUserId,setFistName,setLastName,setBalance,setUserDetails,setUsersList} = currentUserDetailsSlice.actions

export default currentUserDetailsSlice.reducer