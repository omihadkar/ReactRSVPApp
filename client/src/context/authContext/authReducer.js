import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, SET_ERROR, CLEAR_ERRORS, LOG_OUT,SET_USER, AUTH_ERROR } from '../types';

function authReducer(state, action) {
    switch (action.type) {      
        case SET_USER:
             return{
                 ...state,
                 user: action.payload,
                 userAuth:true,
                 errors:null
             }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOG_OUT:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                userAuth:null,
                errors: action.payload
            }                
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
                return{
                    ...state,
                    userAuth:true,
                    errors: null
                }
        case SET_ERROR:
                return{
                    ...state,
                    errors:action.payload
                }        
        case CLEAR_ERRORS:
                return{
                    ...state,
                    errors:null
                }        
        default:
            break;
    }
}

export default authReducer
