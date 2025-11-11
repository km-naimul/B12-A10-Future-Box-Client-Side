import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    signInUser(loginData.email, loginData.password)
      .then(() => {
        toast.success("✅ Login successful!", { position: "top-right", autoClose: 2000 });
        setTimeout(() => (window.location.href = "/"), 1500);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          toast.error("❌ Email not found!", { position: "top-right", autoClose: 2500 });
        } else if (error.code === "auth/wrong-password") {
          toast.error("❌ Incorrect password!", { position: "top-right", autoClose: 2500 });
        } else {
          toast.error("❌ " + error.message, { position: "top-right", autoClose: 2500 });
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("✅ Logged in with Google!", { position: "top-right", autoClose: 2000 });
        setTimeout(() => (window.location.href = "/"), 1500);
      })
      .catch((error) => {
        toast.error("❌ " + error.message, { position: "top-right", autoClose: 2500 });
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl py-10 m-10">
      <h1 className="text-5xl font-bold text-center">Sign In now!</h1>
      <div className="card-body">
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-neutral mt-4">
              Sign in
            </button>
          </fieldset>
        </form>

        <h2 className="text-center mt-2">or</h2>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          Login with Google
        </button>

        <div className="font-semibold text-center pt-4">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-primary">
            Register Now
          </NavLink>
        </div>
      </div>

      {/* ✅ Toast container (must include once per page) */}
      <ToastContainer />
    </div>
  );
};

export default Login;
