import React,{useReducer} from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import axios from 'axios'
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL,SET_ERROR, CLEAR_ERRORS, LOG_OUT ,SET_USER, AUTH_ERROR} from '../types'
import setToken from '../../components/utils/setToken'


function AuthState(props) {
    const initialState={
        user:null,
        userAuth:null,
        errors:null
    }

    const [state,dispatch]=useReducer(authReducer,initialState);

    const getUser= async ()=>
    {
        if(localStorage.token)
        {
            setToken(localStorage.token)
        }

        try {
            const res=await axios.get('/auth');
            dispatch({
                type:SET_USER,
                payload: res.data
            })   
        } catch (err) {
            dispatch({
                type:AUTH_ERROR,
                payload: err
            })   
        }
    }


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

    const logOut = async err=>{
        dispatch({
            type: LOG_OUT
        })
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
        user:state.user,
        userAuth: state.userAuth,
        errors:state.errors,
        getUser:getUser,
        registerUser,
        loginUser,
        setError,
        clearError,
        logOut
    }} >{props.children}</AuthContext.Provider>
    )
}

export default AuthState
