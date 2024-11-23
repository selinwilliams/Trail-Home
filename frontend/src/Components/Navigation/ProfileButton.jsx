import { useEffect, useState, useRef } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import * as sessionsActions from "../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionsActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <div >
      <button className="button"onClick={toggleMenu}>
        <FaCircleUser  style={{ fontSize: "50px", color: "FF5A5F"}} />
      </button>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        <li><p>Welcome,</p>{user.userName}</li>
        <li>
          {user.firstName} {user.lastName}
        </li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
