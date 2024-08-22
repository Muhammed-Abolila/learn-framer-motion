import { useState } from "react";
import "./App.css";
import img from "../public/7.jpg";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";
function App() {
  //######################
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);
  console.log(x);
  //######################
  const [showPopup, setShowPopup] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const transitionVariants = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  };
  //######################
  const [navActive, setNavActive] = useState(0);
  //######################
  const [counter, setCounter] = useState(0);
  //######################
  let scrollSectionRef = useRef(null);
  const [sectionTop, setSectionTop] = useState(0);
  useEffect(() => {
    const updateStartScrollY = () => {
      if (scrollSectionRef.current) {
        setSectionTop(scrollSectionRef.current.offsetTop);
      }
    };
    window.addEventListener("scroll", updateStartScrollY);
    return () => {
      window.removeEventListener("scroll", updateStartScrollY);
    };
  }, []);
  let { scrollY } = useScroll();
  // useTransform(اليوزسكرول من جايبها اللي القيمه,[البكسلز عدد],[هنزله بكسل كل مع هتحصل اللي التغيير قيمه])
  const rotateBgImg = useTransform(
    scrollY,
    [sectionTop, sectionTop + 200, sectionTop + 500, sectionTop + 800],
    [0, 20, 100, 180]
  );
  const scaleBgImg = useTransform(
    scrollY,
    [sectionTop, sectionTop + 200, sectionTop + 800],
    [1, 1.6, 1]
  );
  return (
    <div className="container">
      {/* ####################### */}
      <motion.div
        animate={{ x, y, rotate }}
        transition={{ duration: 1 }}
        className="box"
      ></motion.div>
      <div className="inputs">
        <div className="input-container">
          <label htmlFor="">x</label>
          <input type="number" onChange={(e) => setX(Number(e.target.value))} />
        </div>
        <div className="input-container">
          <label htmlFor="">y</label>
          <input type="number" onChange={(e) => setY(Number(e.target.value))} />
        </div>
        <div className="input-container">
          <label htmlFor="">rotate</label>
          <input
            type="number"
            onChange={(e) => setRotate(Number(e.target.value))}
          />
        </div>
      </div>
      {/* ############################ */}
      <motion.div
        className="top-btn"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95, rotate: "2deg" }}
        transition={{ type: "spring", stiffness: 500 }}
        onClick={() => setShowPopup(true)}
      >
        Click Me!
      </motion.div>
      {/* ############################ */}
      <AnimatePresence>
        {showPopup && (
          <div className="popup">
            <div className="popup-child">
              <MotionConfig transition={{ duration: 0.6 }}>
                <div className="inputs-container">
                  <motion.input animate={{}} type="text" />
                  <motion.input type="text" />
                  <motion.input type="text" />
                </div>

                <motion.ul
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ staggerChildren: 0.1 }}
                >
                  <motion.li variants={transitionVariants}>
                    first element
                  </motion.li>
                  <motion.li variants={transitionVariants}>
                    second element
                  </motion.li>
                  <motion.li variants={transitionVariants}>
                    third element
                  </motion.li>
                  <motion.li
                    onClick={() => setShowPopup(false)}
                    variants={transitionVariants}
                  >
                    fourth element
                  </motion.li>
                </motion.ul>
              </MotionConfig>
            </div>
          </div>
        )}
      </AnimatePresence>
      {/* ############################ */}

      <div>
        <div className="bottom-btn" onClick={() => setIsExpanded(!isExpanded)}>
          click
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            &#9650;
          </motion.span>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              Lorem ipsum dolor sit,
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* ############################ */}
      <div className="navbar">
        <ul>
          <li onClick={() => setNavActive(0)}>
            <p>home</p>
            <AnimatePresence>
              {navActive == 0 && (
                <motion.span
                  animate={{ left: 0 }}
                  exit={{ right: 100 }}
                  transition={{ duration: 0.5 }}
                  className="indecator"
                ></motion.span>
              )}
            </AnimatePresence>
          </li>
          <li onClick={() => setNavActive(1)}>
            <p>about</p>
            <AnimatePresence>
              {navActive == 1 && (
                <motion.span
                  animate={{ left: 0 }}
                  exit={{ right: 100 }}
                  transition={{ duration: 0.5 }}
                  className="indecator"
                ></motion.span>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </div>
      {/* ############################ */}
      <div className="second-navbar">
        <ul>
          <li onClick={() => setNavActive(0)}>
            <p>home</p>
            {navActive == 0 && (
              <motion.span layoutId="pppp" className="indecator"></motion.span>
            )}
          </li>
          <li onClick={() => setNavActive(1)}>
            <p>about</p>
            {navActive == 1 && (
              <motion.span layoutId="pppp" className="indecator"></motion.span>
            )}
          </li>
        </ul>
      </div>
      {/* ############################ */}
      <div className="counter-animate">
        <motion.div
          key={counter}
          animate={{ scale: [1, 1.7, 1] }}
          className="count"
        >
          {counter}
        </motion.div>
        <div className="btn" onClick={() => setCounter(counter + 1)}>
          +
        </div>
      </div>
      {/* ############################ */}
      <div className="scroll-animation" ref={scrollSectionRef}>
        <motion.img style={{ rotate: rotateBgImg ,scale:scaleBgImg}} src={img} alt="" />
        <div className="content">
          <h2>Lorem, ipsum dolor.</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
