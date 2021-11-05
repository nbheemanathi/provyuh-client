import React,{useContext} from "react";
import { AuthContext } from "../../context/auth";

export default function WelcomeBanner() {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold mb-1">
          Welcome, {user.username} 👋
        </h1>
        <p>Here is what’s happening with your Provyuh Account today</p>
      </div>
    </div>
  );
}
