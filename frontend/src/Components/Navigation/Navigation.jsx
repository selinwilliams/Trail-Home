import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    const sessionLinks = sessionUser ? (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      ) : (
        <>
          <li>
            <OpenModalButton buttonText="Log In" modalComponent={<LoginFormModal />}/>
          </li>
          <li>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
        </>
      );
    
      return (
        <div className="nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {isLoaded && sessionLinks}
        </ul>
        </div>
      );
    }
    
    export default Navigation;