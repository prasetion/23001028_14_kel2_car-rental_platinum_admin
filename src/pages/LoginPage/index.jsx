import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/features/login/loginSlice";
import "./style.css";

import BackgroundLogin from "../../assets/assets-login/background-login.png";
import Logo from "../../assets/assets-login/logo.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { error, loading } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = () => {
    const payload = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    // setErrorMessage("");

    dispatch(login(payload)).then(() => {
      navigate("/dashboard");
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <>
      <div className="d-flex">
        <div style={{ width: "65%", height: "100vh" }}>
          <img src={BackgroundLogin} alt="background-login" style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="m-auto d-flex flex-column justify-content-start gap-3" style={{ width: "25%" }}>
          <img src={Logo} alt="" style={{ width: "100px", height: "34px" }} />
          <h1>Welcome, Admin BCR</h1>
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
          <div style={{ width: "100%" }}>
            <p>Email</p>
            <input type="text" placeholder="Contoh: johndee@gmail.com" className="border rounded-1 p-2" style={{ width: "100%", color: "#A5A5A5" }} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} />
          </div>
          <div style={{ width: "100%" }}>
            <p>Password</p>
            <input type="password" placeholder="6+ karakter" className="border rounded-1 p-2" style={{ width: "100%", color: "#A5A5A5" }} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
          </div>
          <button type="button" className="btn mt-3 " style={{ backgroundColor: "#0D28A6", color: "white", borderRadius: "2px" }} onClick={handleSignIn}>
            Sign in
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
