import React from "react";

const Navbar = () => {
  return (
    <div className="mx-auto py-4 bg-[rgb(2,44,92)]">
      <div className="container px-7 mx-auto flex justify-between items-center">
        <h1 className="text-2xl text-white font-bold">Logo</h1>
        <ul className="flex gap-4 items-center">
          <li>
            <a href="#" className="text-white  hover:text-yellow-300 transition-colors">Home</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors">About</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors">Contact</a>
          </li>
          <li>
            <button className="bg-[#ffe600] border-2 text-[#043873] px-4 py-2 rounded-full font-bold hover:bg-white hover:text-[rgb(2,44,92)] transition-colors">
              Login
            </button>
          </li>
          <li>
            {/* <button className="bg-yellow-300 text-[rgb(2,44,92)] px-4 py-2 rounded-full font-bold hover:bg-white hover:text-[rgb(2,44,92)] transition-colors">
              Register
            </button> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;