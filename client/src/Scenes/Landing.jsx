import React from "react";
import meyditlogo from "../Assets/meyditlogo.png";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Landing = () => {
  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };

  return (
    <div className="App">
      <div className="header finisher-header w-screen h-screen flex justify-center items-center font-sans relative">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: {
              enable: true,
              zIndex: 1,
            },
            particles: {
              number: {
                value: 25,
                density: {
                  enable: false,
                  value_area: 800,
                },
              },
              color: {
                value: "#fff",
              },
              shape: {
                type: "circle",
                options: {
                  sides: 5,
                },
              },
              opacity: {
                value: 0.8,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 4,
                random: false,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false,
                },
              },
              rotate: {
                value: 0,
                random: true,
                direction: "clockwise",
                animation: {
                  enable: true,
                  speed: 5,
                  sync: false,
                },
              },
              line_linked: {
                enable: true,
                distance: 600,
                color: "#ffffff",
                opacity: 0.4,
                width: 2,
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            background: {
              color: "#8460C2",
              image: "",
              position: "50% 50%",
              repeat: "no-repeat",
              size: "cover",
            },
          }}
        />
        <div className=" px-14 py-7 rounded-lg flex flex-col justify-center items-center z-10">
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
    </div>
  );
};

export default Landing;
