import React, { useState } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import { MenuRounded } from "@mui/icons-material";
import { CloseRounded } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import meyditlogo from "../Assets/meyditlogo.png";

const variants = {
  visible: { x: "0%" },
  hidden: { x: "-100%" },
  exit: { x: "-100%" },
  exitActive: { x: 0 },
};

const Navbar = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1040px)");

  return (
    <nav className="z-[80] w-full fixed top-0 pt-4 h-[80px] bg-primary">
      {/* DESKTOP NAV */}
      {isDesktop ? (
        <div className="flex items-center align-middle justify-between mx-auto w-5/6">
          <Link to="/" onClick={handleClick}>
            <img src={meyditlogo} alt="meydit" className="w-[70px]" />
          </Link>

          <div className="navbar flex items-center gap-8 justify-between font-Bebas font-semibold  text-primary">
            <Link
              to="/"
              onClick={handleClick}
              className="group text-lavender transition-all duration-300 ease-in-out"
            >
              <h2 className="bg-left-bottom bg-gradient-to-r from-lavender to-lavender bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] group-hover:opacity-80 transition-all duration-500 ease-out">
                HOME
              </h2>
            </Link>
            <Link
              to="/maker"
              onClick={handleClick}
              className="group text-lavender transition-all duration-300 ease-in-out"
            >
              <h2 className="bg-left-bottom bg-gradient-to-r from-lavender to-lavender bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] group-hover:opacity-80 transition-all duration-500 ease-out">
                MAKERS
              </h2>
            </Link>
            <Link
              to="/consumer"
              onClick={handleClick}
              className="group text-lavender transition-all duration-300 ease-in-out"
            >
              <h2 className="bg-left-bottom bg-gradient-to-r from-lavender to-lavender bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] group-hover:opacity-80 transition-all duration-500 ease-out">
                CONSUMERS
              </h2>
            </Link>
          </div>
        </div>
      ) : (
        <button
          className="rounded-full ml-5 mt-2"
          onClick={() => setIsMenuToggled(!isMenuToggled)}
        >
          {" "}
          <MenuRounded />{" "}
        </button>
      )}
      <AnimatePresence>
        {/* MOBILE MENU POPUP */}
        {!isDesktop && isMenuToggled && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeOut", duration: 0.2 }}
            exit="exit"
            className="fixed left-0 top-0 bottom-0 height[100%] bg-lavender p-2 w-[300px] transition-300 shadow-md"
          >
            {/* CLOSE ICON */}
            <div className="flex justify-end p-12">
              <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <CloseRounded />
              </button>
            </div>

            {/* MENU ITEMS */}
            <div
              className="flex flex-col gap-10 ml-5 text-2xl  font-Bebas text-primary font-semibold "
              onClick={() => setIsMenuToggled(false)}
            >
              <Link to="/" onClick={handleClick}>
                <h2>Home</h2>
              </Link>
              <Link to="/maker" onClick={handleClick}>
                <h2>Makers</h2>
              </Link>
              <Link to="/consumer" onClick={handleClick}>
                <h2>Consumers</h2>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
