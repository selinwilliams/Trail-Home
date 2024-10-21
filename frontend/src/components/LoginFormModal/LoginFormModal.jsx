import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { useModal } from "../../context/Modal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleDemoUser = () => {
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    ).then(closeModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="login-form">
      <h1 data-testid="user-menu-button">Log In</h1>
      <div className="login-info">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="login-credebtials">
              <label>
                <input
                  type="text"
                  data-testid="user-menu-button"
                  placeholder="Username or Email"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                <input
                  type="password"
                  data-testid="user-menu-button"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            {errors.credential && <p>{errors.credential}</p>}

            <button
              className="login-button"
              type="submit"
              disabled={credential.length < 4 || password.length < 6}
              data-testid="user-menu-button"
            >
              Log In
            </button>
            <button
              data-testid="user-menu-button"
              className="demo-user"
              onClick={handleDemoUser}
            >
              Demo User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
