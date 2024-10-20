import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalMenuItem from "./OpenModelMenuItem";
import { RxHamburgerMenu } from "react-icons/rx";
import "./ProfileButton.css";
import { useNavigate } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const manageSpots = (e) => {
    e.preventDefault();
    closeMenu();
    navigate("/spots/manage");
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate("/");
  };

  const FaUser = () => {
    return (
      <div style={{ color: "#999999", fontSize: "30px" }}>
        <FaUserCircle />
      </div>
    );
  };

  const HamburgerMenu = () => {
    return (
      <div style={{ color: "black", fontSize: "18px" }}>
        <RxHamburgerMenu />
      </div>
    );
  };
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button
        data-testid="user-menu-button"
        className="oval-button"
        onClick={toggleMenu}
      >
        <div className="profileIcon">
          <HamburgerMenu className="icon" />
          <FaUser className="icon" />
        </div>
      </button>
      <div className={ulClassName} id="profileMenu" ref={ulRef}>
        {user ? (
          <div>
            <div className="greeting" >Hello, <span className="username"> {user.username}</span></div>
            {/* <li>{user.firstName} {user.lastName}</li> */}
            <div className="user-email">{user.email}</div>
            <div>
              <button className="manageSpotsButton" onClick={manageSpots}>
                Manage Spots{" "}
              </button>
            </div>
            <div>
              <button className="logoutButton" onClick={logout}>
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="not-logged">
            <div className="login-profile">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="signup-button">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
