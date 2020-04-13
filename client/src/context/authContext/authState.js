import React,{useReducer} from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import axios from 'axios'
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL,SET_ERROR, CLEAR_ERRORS } from '../types'


function AuthState(props) {
    const initialState={
        userAuth:null,
        errors:null
    }

    const [state,dispatch]=useReducer(authReducer,initialState);

    //register user
    const registerUser= async userData=>{
        const config ={
            header:{ 'Content-Type': 'application/json'}
        }

        try {
            const res = await axios.post('/register',userData,config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })

        } catch (error) {            
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data
            })
        }
    }

    //login user
    const loginUser= async userData=>{
        const config ={
            header:{ 'Content-Type': 'application/json'}
        }

        try {
            const res = await axios.post('/auth',userData,config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })

        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data
            })
        }
    }

    const setError = async err=>{
        dispatch({
            type: SET_ERROR,
            payload: err
        })
    }

    const clearError = ()=>{
        dispatch({
            type: CLEAR_ERRORS            
        })
    }

    return (
    <AuthContext.Provider value={{
        userAuth: state.userAuth,
        errors:state.errors,
        registerUser,
        loginUser,
        setError,
        clearError
    }} >{props.children}</AuthContext.Provider>
    )
}

export default AuthState
