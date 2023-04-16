import React from "react";
import meyditlogo from "../Assets/meyditlogo.png";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";

const particlesOptions = {
  background: {
    color: {
      value: "#ffffff",
    },
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#000000",
    },
    links: {
      color: "#000000",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
};

const Landing = () => {
  return (
    <div className="header finisher-header w-screen h-screen flex justify-center items-center font-sans relative">
      <Particles
        className="absolute inset-0"
        options={particlesOptions}
        style={{ zIndex: 10 }}
      />
      <div className="bg-primary px-14 py-7 rounded-lg flex flex-col justify-center items-center z-10">
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
