import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'

//creating login action
export const login = createAsyncThunk('auth/login' , async ({formValue, navigate, toast}, {rejectWithValue})=>{
    try{
        const response = await api.signin(formValue)
        toast.success("Login Successful")
        navigate('/')
        return response.data 
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})


export const signup = createAsyncThunk('auth/signup' , async ({formValue, navigate, toast}, {rejectWithValue})=>{
    try{
        const response = await api.signup(formValue)
        toast.success('User Registered Successfully')
        navigate('/login')
        return response.data
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})


//createAsyncThunk gennerates  promise lifecycle which needs to be handles in extrareducers in the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user: null,
        error: '',
        loading: false
    },
    extraReducers:{
        [login.pending] :(state,action)=>{
            state.loading = true
        },
        [login.fulfilled] : (state, action)=>{
            state.loading = false
            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            state.user = action.payload
        },
        [login.rejected] : (state,action)=>{
            state.loading = false
            state.error = action.payload.message
        },
        [signup.pending]: (state,action)=>{
            state.loading = true
        },
        [signup.fulfilled]: (state, action)=>{
            state.loading = false
            state.user = action.payload
        },
        [signup.rejected] : (state, action)=>{
            state.loading =false
            state.error = action.payload.message
        }
    }
})

export default authSlice.reducer