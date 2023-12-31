import React, { useEffect, useState } from "react";
import { motion, useAnimate, stagger, animate } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/LogoAudiophile.svg";
import logocut from "../assets/logoCut.svg";
import img from "../assets/admin.png";

// Styled Background component
const Background = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
  width: 96vw;
  height: 95vh;

  margin: 2rem;
  border: 0;
  border-radius: 2rem;
  background: #eff1e9;
  z-index: -2;
`;

// Styled Navigation component with framer motion integrated
const Nav = styled(motion.div)`
  position: absolute;
  top: 40px;
  left: 50%;
  height: 50px;
  transform: translateX(-50%);
  z-index: 2;

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin: 16px;
      a {
        padding: 10px;
        text-decoration: none;
        border-radius: 5px;
        font-size: 1rem;
        font-weight: 300;
        color: #363636;

        &:hover ::after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          background: #363636;
          margin-top: 5px;
          z-index: 3;
        }
      }
    }
  }
`;

const Logo = styled(motion.img)`
  position: absolute;
  top: 3rem;
  left: 3rem;
  cursor: pointer;
  z-index: 3;
`;
const Logocut = styled(motion.img)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 1;
`;

const logoVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const staggerMenuItems = stagger(0.1, { delay: 0.1 });

function usenavAnimation(isOpen) {
  const [scope, useAnimation] = useAnimate();

  useEffect(() => {
    animate(
      "li",
      {
        opacity: [0, 1],
        x: [30, 0],
        y: [20, 0],
        rotate: [40, 0],
        blur: [10, 0],
      },
      { duration: 0.5, delay: staggerMenuItems, ease: "backInOut" }
    );
  }, [isOpen]);
  return scope;
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(true);
  const scope = usenavAnimation(isOpen);

  return (
    <>
      <div className="topNav">
        <Logo
          src={logo}
          alt="logo"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        />
        <Logocut
          src={logocut}
          alt="logo"
          variants={logoVariants}
          initial={{
            x: "-26rem",
            y: "-10rem",
            scale: 0,
          }}
          animate={{
            x: 0,
            y: 0,
            scale: 1,
            transition: {
              delay: 0.4,
              duration: 0.5,
              type: "spring",
              stiffness: 160,
              damping: 30,
            },
          }}
        />
        <Nav ref={scope}>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/sales">Sales</Link>
            </li>
          </ul>
        </Nav>
        <Profile userLastname={"Scott"} userType={"admin"} />
      </div>

      {/*  spring animation fromframer motion */}
      <Background
        as={motion.div}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 160,
          damping: 20,
        }}
      />
    </>
  );
};

const PfHloder = styled(motion.div)`
  position: absolute;
  top: 3rem;
  right: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  text-align: left;
  width: 160px;
  height: 3rem;
  z-index: 3;
  cursor: pointer;
  img {
    width: 2.63rem;
    height: 2.63rem;
    border-radius: 0.5rem;
    object-fit: cover;
    /* margin-right: 10px; */
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: nowrap;
    p {
      margin: 0;
    }
  }
`;

const Profile = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userLastname, userType } = props;

  return (
    <PfHloder onMouseOver={(isOpen) => setIsOpen(!isOpen)}>
      <img src={img} alt="profile picture" />
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "3rem",
            right: "3rem",
            width: "160px",
            height: "3rem",
            background: "#d85050",
            borderRadius: "0.5rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
            zIndex: "3",
          }}
        >
          <p>Logout</p>
        </div>
      )}
      <div className="info">
        <p
          style={{
            fonWeight: 600,
            fontSize: "1.2rem",
            lineHeight: "21px",
          }}
        >
          {userLastname}
        </p>
        <p
          style={{
            fonWeight: 300,
            fontSize: "14px",
            lineHeight: "16px",
          }}
        >
          {userType}
        </p>
      </div>
    </PfHloder>
  );
};

export default Navigation;
