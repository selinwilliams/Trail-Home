import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div>
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
          </div>
      )}
    </div>
  );
}

export default Navigation;
