import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "@phosphor-icons/react";
import Header from "../components/Header";

export default function Profile() {
  const [selectedImg, setSelectedImg] = useState(null);
  const { authUser, updateProfilePic, updateProfile } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: authUser.fullName,
    email: authUser.email,
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
    };

    await updateProfilePic(formData);
  };

  const validateForm = () => {
    const { fullName, email } = formData;
    if (!fullName || !email) {
      toast.error("All fields must be provided");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) {
      updateProfile(formData);
    }
  };

  return (
    <>
      <Header />
      <div className="h-[90vh] bg-gray-100 flex justify-center items-center p-6">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={
                    selectedImg || authUser.profilePic
                      ? process.env.API_URL + authUser.profilePic
                      : "" || "/avatar.png"
                  }
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 "
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  
                `}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={authUser.role === "Viewer"}
                  />
                </label>
              </div>
            </div>
            <h2 className="text-2xl mt-4 font-bold text-gray-800 mb-6">
              Edit Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
