import React, {useContext,Fragment} from 'react'
import AuthContext from '../../context/authContext/authContext'
import {Link} from 'react-router-dom'

const Navbar = () => {

  const {logOut,clearError,userAuth,user}=useContext(AuthContext);

  const onLogOut=()=>{
    logOut();
    clearError();
  }

  const userLinks=(
    <Fragment>
        <li>Hello, {user && user.name}</li>
        <span className="sm-hide">|</span>
        <li>
          <a href="#!" onClick={onLogOut}>
            <span className="sm-hide">Logout</span>
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </li>
    </Fragment>
  )

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <span className="sm-hide">|</span>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar">
      <div className="logo">
        <h1><i className='fas fa-glass-cheers' />
          Party RSVP
        </h1>
        <p>Made with <span>❤</span> by omnixie</p>
      </div>
      <ul>
        {userAuth?userLinks:authLinks}
      </ul>
    </div>
  )
}

export default Navbar