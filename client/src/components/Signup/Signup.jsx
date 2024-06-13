import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import "../../styles/Signup.scss";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  const handleSublmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post(`${server}/user/create-user`, formData)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setName("");
          setEmail("");
          setPassword("");
          setAvatar();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="div">
        <form className="signup-form" onSubmit={handleSublmit}>
          <div className="header-signup">Create an account</div>
          <label className="label-input">Username</label>
          <input
            type="text"
            name="name"
            className="input-form"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            type={visible ? "text" : "password"}
            name="password"
            className="input-form"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {visible ? (
            <AiOutlineEye
              className="absolute right-2 top-2 cursor-pointer"
              size={25}
              onClick={() => setVisible(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className={`absolute  right-2 ${
                password ? "" : "hidden"
              } top-2 cursor-pointer`}
              size={25}
              onClick={() => setVisible(true)}
            />
          )}
          <div className="validations">
            <div className="fl-col">
              <div className="col">
                <div className="dot" />
                <div className="validation">Use 8 or more characters</div>
              </div>
              <div className="col">
                <div className="dot" />
                <div className="validation">Use a number (e.g. 1234)</div>
              </div>
            </div>
            <div className="fl-col">
              <div className="col">
                <div className="dot" />
                <div className="validation">
                  Use upper and lower case letters (e.g. Aa)
                </div>
              </div>
              <div className="col">
                <div className="dot" />
                <div className="validation">Use a symbol (e.g. !@#$)</div>
              </div>
            </div>
          </div>
          <label htmlFor="avatar" className="avatar-label">
            <div>
              <span className="container-icon">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <RxAvatar
                    style={{ width: "2rem", height: "2rem", cursor: "pointer" }}
                  />
                )}
              </span>
              <label htmlFor="file-input" className="file-input-label">
                <span>Upload avatar</span>
                <input
                  type="file"
                  name="file"
                  id="file-input"
                  accept=".jpeg,.jpeg,.png"
                  className="input-avatar"
                  onChange={handleFileInputChange}
                />
              </label>
            </div>
          </label>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? (
              <FaSpinner className="loader-icon" /> // Hiển thị biểu tượng loader khi loading
            ) : (
              "Sign up"
            )}
          </button>

          <p className="policy">
            By creating an account, you agree to the{" "}
            <span className="underline">Terms of use</span> and{" "}
            <span className="underline">Privacy Policy.</span>
          </p>

          <div className="bottom-signup">
            <p className="login-message">
              Already have an ccount?
              <Link to={"/login"}> Log in </Link>
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

export default Signup;
