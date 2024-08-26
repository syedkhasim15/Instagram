import { createSlice } from "@reduxjs/toolkit"


const initialState = {

    accessToken: null,
    userDetails: {
        id : null,
        email: null,
        fullName: null,
        image: null,
        role: null,
        created: null

    }
}

export const userDataSlice = createSlice({
    name: "userdataslice",
    initialState,
    reducers: {
        addUserDetails: (state,action)=>{
            state.userDetails = action.payload
        },
        addToken: (state,action)=>{
            state.accessToken = action.payload
        }
    }
})

export const {addUserDetails,addToken} = userDataSlice.actions;
export default userDataSlice.reducer