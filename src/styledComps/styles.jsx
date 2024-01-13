import styled from "styled-components";
import { motion } from "framer-motion";
// Styled Background component
export const Background = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 96vw;
  height: 94vh;

  margin: 2rem;
  padding: 2rem;
  border: 0;
  border-radius: 2rem;
  background: #eff1e9;
  z-index: -2;
`;

export const Nav = styled(motion.div)`
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

// Styled Navigation component with framer motion integrated

export const Logo = styled(motion.img)`
  position: absolute;
  top: 3rem;
  left: 3rem;
  cursor: pointer;
  z-index: 3;
`;
export const Logocut = styled(motion.img)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 1;
`;

export const PfHloder = styled(motion.div)`
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
