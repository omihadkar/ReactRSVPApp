import React,{useContext} from 'react'
import AuthContext from '../../../context/authContext/authContext'
import {Route,Redirect} from 'react-router-dom'

function PrivateRoute({component: Component, ...rest}) {
    const {userAuth}= useContext(AuthContext);
    
    const data= localStorage.getItem("userAuth");
    
    console.log(userAuth);
    return (
        <Route
            {...rest}
            render={props=> !data? (<Redirect to='/login'></Redirect>): (<Component {...props}/>)}
        />
    )
}

export default PrivateRoute
