import React,{useReducer} from 'react'
import GuestContext from './guestContext'
import GuestReducer from './GuestReducer';
import { TOGGLE_FILTER, SEARCH_GUEST, CLEAR_SEARCH, ADD_GUEST, REMOVE_GUEST, UPDATE_GUEST, EDIT_GUEST, CLEAR_EDIT } from '../types';

export const GuestState = (props) => {

    const initialState={
        filterGuest:false,
        search:null,
        editable:null,
        guests:[
            {
                id:1,
                name: 'Will Smith',
                dietary: 'Vegan',
                isconfirmed: false,
                phone: 9869
            },
            {
                id:2,
                name: 'MS Dhoni', 
                dietary: 'Non-Veg',
                isconfirmed: true,
                phone: 986988
            },
            {
                id:3,
                name: 'Virat Kohli',
                dietary: 'Pascatarian',
                isconfirmed: false,
                phone: 9869333
            }
        ]
    };

    const [state,dispatch]=useReducer(GuestReducer,initialState);

    const addGuest =(guest)=>{
        if(guest.name===null ||guest.name==='')
        {
            return;
        }
        guest.id=Date.now();
        guest.isconfirmed=false;
        dispatch({type: ADD_GUEST, payload:guest});
    };

    const updateGuest=(guest)=>{
        dispatch({type: UPDATE_GUEST, payload: guest})
    }

    const removeGuest =(id)=>{
      dispatch({type: REMOVE_GUEST,payload:id});  
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
                clearEdit
            }}
            >{props.children}</GuestContext.Provider>        
    )
}
