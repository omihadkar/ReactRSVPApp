import React, {useContext,useEffect} from 'react'
import Guest from './Guest'
import GuestContext from '../../context/guestContext/guestContext'

const Guests = () => {
const {guests, filterGuest,search,getGuests}= useContext(GuestContext)

useEffect(()=>{
  getGuests()
},[])

  return (
    <div className="guests">
      {search!=null? search.map(guest=> <Guest key={guest.id} guest={guest}/>):
      guests.filter(guest=> !filterGuest || guest.isconfirmed).map(guest=> <Guest key={guest.id} guest={guest}/>)}
    </div>
  )
}
export default Guests