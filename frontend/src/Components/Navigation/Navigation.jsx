import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { IoTrailSignOutline } from "react-icons/io5";

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
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </div>
  );
}

export default Navigation;
