import { useEffect, useState, useRef } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import * as sessionsActions from "../../store/session";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import OpenModalButton from '../OpenModalButton';
import "./ProfileButton.css";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
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
    navigate('/current')
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionsActions.logout());
    closeMenu();
    navigate("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const HamburgerMenu = () => {
    return (
      <div style={{ color: "black", fontSize: "22px", marginRight: "8px" }}>
        <RxHamburgerMenu />
      </div>
    );
  };

  return (
    <div>
      <div >
        <button className="button" onClick={toggleMenu}>
          <HamburgerMenu className="fa-circle-user"/>
          <FaCircleUser className="fa-circle-user" />
        </button>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p>Hello,</p>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <div className="profile-buttons">
              <li>
                <button className="manage-spot-button" onClick={manageSpots}>Manage Spots</button>
              </li>
              <li>
                <button  className="logout-button" onClick={logout}>Log Out</button>
              </li>
            </div>

          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
