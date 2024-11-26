import { PencilSimple, SignOut } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Header() {
  const { logout } = useAuthStore();
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-10">
      <Link to="/" className="text-lg font-semibold hidden lg:block ">
        Welcome to the Knowledge Platform
      </Link>
      <div className="space-x-4 flex ml-auto lg:ml-0">
        <Link
          to="/profile"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <PencilSimple size={20} />
          <span>Edit Profile</span>
        </Link>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
        >
          <SignOut size={20} />
        </button>
      </div>
    </div>
  );
}
