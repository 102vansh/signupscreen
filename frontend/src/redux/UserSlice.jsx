import  {createSlice} from '@reduxjs/toolkit'
import { set } from 'mongoose'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})
export const {setUser} = userSlice.actions
export default userSlice.reducer