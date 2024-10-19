import Navigation from "../Navigation/Navigation";
import CreateASpotButton from '../CreateASpotButton/CreateASpotButton'
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import './Header.css'

function Header({ isLoaded }) {

  return (
    <div className="header">
      <NavLink to="/"><Logo /></NavLink>
      <div className="headerRight" >
        <NavLink to="/spots"><CreateASpotButton /></NavLink>
        <Navigation isLoaded={isLoaded}/>
      </div>
    </div>
  );
}

export default Header;