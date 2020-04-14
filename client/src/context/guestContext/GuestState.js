import React,{useReducer} from 'react'
import GuestContext from './guestContext'
import GuestReducer from './GuestReducer';
import { TOGGLE_FILTER, SEARCH_GUEST, CLEAR_SEARCH, ADD_GUEST, REMOVE_GUEST, UPDATE_GUEST, EDIT_GUEST, CLEAR_EDIT, GET_GUESTS, GUESTS_ERROR, REQUEST_ENDPOINT } from '../types';
import axios from 'axios'
import setToken from '../../components/utils/setToken';

export const GuestState = (props) => {

    const initialState={
        requestedResponse:true,
        filterGuest:false,
        search:null,
        editable:null,
        guests:[],
        errors:null
    };

    const [state,dispatch]=useReducer(GuestReducer,initialState);

    //getGuests
    const getGuests=async  ()=>{
        // const config ={
        //     header:{ 'Content-Type': 'application/json'}
        // }
        dispatch({type: REQUEST_ENDPOINT});
        if(localStorage.token)
        {
            setToken(localStorage.token)
        }

        try {            
            const res = await axios.get('/guests');
            dispatch({
                type: GET_GUESTS,
                payload: res.data
            })

        } catch (error) {            
            dispatch({
                type: GUESTS_ERROR,
                payload: error.response.msg
            })
        }
    }

    const addGuest = async (guest)=>{
        if(guest.name===null ||guest.name==='')
        {
            return;
        }
        
        const config ={
            header:{ 'Content-Type': 'application/json'}
        }

        try {
            const res = await axios.post('/guests',guest,config);            
            dispatch({type: ADD_GUEST, payload:res.data});
        } catch (error) {
            dispatch({
                type: GUESTS_ERROR,
                payload: error.response.msg
            })
        }

    };

    const updateGuest= async (guest)=>{
        
        const config ={
            header:{ 'Content-Type': 'application/json'}
        }

        try {
            console.log(guest.dietary)
            const res= await axios.put(`/guests/${guest._id}`,guest,config);
            dispatch({type: UPDATE_GUEST, payload: res.data})
            
        } catch (error) {
            dispatch({
                type: GUESTS_ERROR,
                payload: error.response.msg
            })
        }
        
    }

    const removeGuest = async (id)=>{
        try {            
            await axios.delete(`/guests/${id}`);            
            dispatch({type: REMOVE_GUEST,payload:id});  
        } catch (error) {
            dispatch({
                type: GUESTS_ERROR,
                payload: "Error while removing guest"
            })
        }
    };

    const editGuest=(guest)=>{
        dispatch({type: EDIT_GUEST,payload:guest});  
    }

    const clearEdit=()=>{
        dispatch({type: CLEAR_EDIT});  
    }

    const toggleFilter = ()=>{        
        dispatch({type: TOGGLE_FILTER})
    };

    const searchGuest = (guest)=>{        
        dispatch({type: SEARCH_GUEST, payload: guest})
    };

    const clearSearch = (guest)=>{        
        dispatch({type: CLEAR_SEARCH})
    }; 

    return (        
            <GuestContext.Provider
            value={{
                requestedResponse:state.requestedResponse,
                guests: state.guests,
                filterGuest: state.filterGuest,
                search: state.search,
                editable: state.editable,
                toggleFilter,
                searchGuest,
                clearSearch,
                addGuest,
                removeGuest,
                updateGuest,
                editGuest,
                clearEdit,
                getGuests
            }}
            >{props.children}</GuestContext.Provider>        
    )
}
