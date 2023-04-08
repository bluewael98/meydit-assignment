import React from "react";
import meyditlogo from "../Assets/meyditlogo.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="header finisher-header w-screen h-screen flex justify-center items-center font-sans">
      <div className="bg-primary px-14 py-7 rounded-lg flex flex-col justify-center items-center">
        <img src={meyditlogo} alt="meyditlogo" />
        <div className="my-4 flex justify-center items-center gap-5 font-semibold text-lg">
          <Link to="/maker">
            <button className="px-7 py-2 bg-lavender text-primary rounded-lg hover:bg-primary hover:text-lavender transition duration-300 shadow-md ">
              &nbsp;&nbsp; Maker &nbsp; &nbsp;
            </button>
          </Link>
          <Link to="/consumer">
            <button className="px-7 py-2 bg-lavender text-primary rounded-lg hover:bg-primary hover:text-lavender transition duration-300 shadow-md ">
              Consumer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
