import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Signup.scss";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  console.log(isAuthenticated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.user.role === "admin") {
          navigate("/admin/manage-docs");
          toast.success("Login successful");
        } else {
          toast.success("Login successful");
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
      });
  };

  return (
    <>
      <div className="div">
        <form
          className="signup-form"
          style={{ marginTop: "100px" }}
          onSubmit={handleSubmit}
        >
          <div className="header-signup">Login</div>

          <div className="label-input">Email</div>
          <input
            type="email"
            className="input-form"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="label-input">Password</div>
          <input
            type="password"
            name="password"
            className="input-form"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn-submit">
            Login
          </button>

          <p className="policy">
            By creating an account, you agree to the{" "}
            <span className="underline">Terms of use</span> and{" "}
            <span className="underline">Privacy Policy.</span>
          </p>

          <div className="bottom-signup">
            <p className="login-message">
              Already have an ccount?
              <Link to={"/sign-up"}> Sign up </Link>
            </p>
            <a href="" className="forgot-password">
              Forget your password?
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
