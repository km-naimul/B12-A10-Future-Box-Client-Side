import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, updateUser, setUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });

  if (!user) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Please log in to view your profile.
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser({
      displayName: formData.name,
      photoURL: formData.photoURL,
    })
      .then(() => {
        setUser({
          ...user,
          displayName: formData.name,
          photoURL: formData.photoURL,
        });
        Swal.fire("Updated!", "Profile updated successfully!", "success");
        setEditMode(false);
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <div className="max-w-md mx-auto bg-sky-200 shadow-lg rounded-2xl p-6 m-10 text-center">
      <img
        src={user.photoURL || "https://i.ibb.co/3d8YQfP/default-user.png"}
        alt="Profile"
        className="w-24 h-24 mx-auto rounded-full border-2 border-primary object-cover"
      />
      <h2 className="text-2xl font-bold mt-4">{user.displayName || "User"}</h2>
      <p className="text-orange-500">{user.email}</p>

      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="btn btn-primary mt-4"
        >
          Update Profile
        </button>
      ) : (
        <form onSubmit={handleUpdate} className="mt-6 space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-success w-full">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="btn btn-ghost w-full"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default MyProfile;
