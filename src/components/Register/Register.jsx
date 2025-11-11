import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, signInWithGoogle , updateUser , setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔍 Password Validation
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLengthValid = password.length >= 6;

    if (!hasUppercase) {
      Swal.fire("Warning", "Password must contain at least one uppercase letter!", "warning");
      return false;
    }
    if (!hasLowercase) {
      Swal.fire("Warning", "Password must contain at least one lowercase letter!", "warning");
      return false;
    }
    if (!isLengthValid) {
      Swal.fire("Warning", "Password must be at least 6 characters long!", "warning");
      return false;
    }
    return true;
  };

  // 🔍 Photo URL validation
  const validatePhotoUrl = (photoUrl) => {
    if (!photoUrl || photoUrl.trim() === "") {
      Swal.fire("Warning", "Please provide your Photo URL!", "warning");
      return false;
    }
    return true;
  };

  // ✅ Register Function
  const handleRegister = (e) => {
    e.preventDefault();

    // Check photo & password
    if (!validatePhotoUrl(formData.photoUrl)) return;
    if (!validatePassword(formData.password)) return;

    createUser(formData.email, formData.password)
      .then((result) => {
        const user = result.user;

        updateUser({displayName: formData.name,
          photoURL: formData.photoUrl,}).then(()=>{
            setUser({...user, displayName: formData.name,
          photoURL: formData.photoUrl});
          })



        updateProfile(user, {
          displayName: formData.name,
          photoURL: formData.photoUrl,
        })
          .then(() => {
            Swal.fire("Success!", "Registration successful!", "success");
            window.location.href = "/login";
          })
          .catch(() => {
            Swal.fire("Error", "Failed to update profile!", "error");
          });
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
        setUser(user);
      });
  };

  // ✅ Google Sign-in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire("Success!", "Signed in with Google!", "success");
        window.location.href = "/";
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl py-10 m-10">
      <h1 className="text-4xl font-bold text-center">Register now!</h1>
      <div className="card-body">
        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Name"
              onChange={handleChange}
              required
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              className="input"
              placeholder="Photo URL"
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

            <button type="submit" className="btn btn-neutral mt-4">
              Register
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

        <div className="font-semibold text-center pt-2">
          Already have an account?{" "}
          <NavLink to="/login" className="text-primary">
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
