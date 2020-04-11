import React,{useReducer} from 'react'
import GuestContext from './guestContext'
import GuestReducer from './GuestReducer';
import { TOGGLE_FILTER, SEARCH_GUEST, CLEAR_SEARCH } from '../types';

export const GuestState = (props) => {

    const initialState={
        filterGuest:false,
        search:null,
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
                toggleFilter,
                searchGuest,
                clearSearch
            }}
            >{props.children}</GuestContext.Provider>        
    )
}
