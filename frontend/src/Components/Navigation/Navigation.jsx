import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { IoTrailSignOutline } from "react-icons/io5";
import CreateSpotButton from "./CreateSpotButton";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

 
  return (
    <div className="navigation">
      <li className="home">
        <NavLink to="/" className="trail-link">
          <IoTrailSignOutline className="trail-icon" />
          <span className="trail-text">Trail Home</span>
        </NavLink>
      </li>
      {isLoaded && (
        <div className="nav-buttons">
        <li className="new-spot-button">
          <CreateSpotButton user={sessionUser} />
        </li>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
        </div>
      )}
    </div>
  );
}

export default Navigation;
