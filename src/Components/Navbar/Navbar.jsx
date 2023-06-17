import React, { useState } from "react";
import logo from "../../assets/news-logo.jpg";
export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <nav>
        <div className="shadow-md bg-white w-full sticky ">
          <div className="md:flex items-center justify-between container mx-auto py-4  px-2 ">
            <div className="font-bold  text-2xl cursor-pointer flex items-center text-gray-800">
              <span>
                {" "}
                <img src={logo} className="w-16 mr-1 pb-1" alt="" />
              </span>
              Breaking News
            </div>
            <div
              onClick={() => {
                setNavOpen(!navOpen);
              }}
              className="absolute right-6 top-5 md:hidden cursor-pointer"
            >
              {navOpen ? (
                //Close icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Menu Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              )}
            </div>
            <ul
              className={`md:flex md:items-center md:pb-0 pb-5 md:static absolute bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-2 capitalize ${
                navOpen ? null : "hidden"
              }`}
            >
              <li className=" md:ml-7 md:my-0 my-7 text-xl">
                <a
                  href=""
                  className="text-gray-800 hover:text-gray-400 duration-500"
                >
                  home
                </a>
              </li>
              <li className=" md:ml-7 md:my-0 my-7 text-xl">
                <a
                  href=""
                  className="text-gray-800 hover:text-gray-400 duration-500"
                >
                  About
                </a>
              </li>
              <li className=" md:ml-7 md:my-0 my-7 text-xl">
                <a
                  href=""
                  className="text-gray-800 hover:text-gray-400 duration-500"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
