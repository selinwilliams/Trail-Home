import { IoTrailSignOutline } from "react-icons/io5";
import './Logo.css'

function Logo() {

  return (
    <div className="logo" data-testid='logo'>
      <IoTrailSignOutline className="logoImg"/>
      
      <span className="logoName">trailbnb</span>
    </div>
  )
}

export default Logo;