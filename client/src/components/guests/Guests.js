import React, {useContext,useEffect,Fragment} from 'react'
import Guest from './Guest'
import GuestContext from '../../context/guestContext/guestContext'

const Guests = () => {
const {guests, filterGuest,search,getGuests,requestedResponse}= useContext(GuestContext)

useEffect(()=>{
  getGuests()
},[])

const guestLink = (
  <Fragment>
        {search!=null? search.map(guest=> <Guest key={guest.id} guest={guest}/>):
        guests.filter(guest=> !filterGuest || guest.isconfirmed).map(guest=> <Guest key={guest.id} guest={guest}/>)}
  </Fragment>
);


  return (    
    <div className="guests">
      {requestedResponse? "Loading...": guestLink}  
    </div>
  )
}
export default Guests