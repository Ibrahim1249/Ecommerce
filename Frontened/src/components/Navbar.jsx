
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"

import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Profile } from "./Profile";

export function Navbar() {
  const [isLogin ,setIsLogin] = useState(false)
  return (
    (<nav className="flex items-center justify-between py-4 px-16 bg-gray-900 text-white">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          width={40}
          height={40}
          className="mr-2 invert" />
      </div>
      <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-indigo-400 transition-colors">Home</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Products</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Category</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
        </div>
     {isLogin ? <Profile/> :    <Link to="/login"><Button  variant="outline" className="text-slate-600 border-white hover:bg-slate-300">Login</Button></Link>}
    </nav>)
  );
}