import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import "./LoginFormModal.css";
import { useModal } from '../Context/Modal'; 

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
    <div className="login-page-form">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="username-email">
        <label >
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
         </div>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit"className="login-button" >
          Log In</button>

        <button className="demo-user" onClick={handleDemoUser}>
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
