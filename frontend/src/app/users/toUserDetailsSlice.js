import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    toUsername:"",
    toUserId:"",
    amount:'',
    isTransferSuccessful:false
}

const toUserSlice = createSlice({
    name:"toUserSlice",
    initialState,
    reducers:{
        setToUserName : (state,action) =>{
            state.toUsername = action.payload
        },
        setToUserId: (state,action) =>{
            state.toUserId = action.payload
        },
        setAmount: (state,action) => {
            state.amount = action.payload
        },
        setIsTransferSuccessful: (state, action) => {
            state.isTransferSuccessful = action.payload
        }
    }
})

export const {setToUserName,setToUserId ,setAmount, setIsTransferSuccessful} = toUserSlice.actions

export default toUserSlice.reducer