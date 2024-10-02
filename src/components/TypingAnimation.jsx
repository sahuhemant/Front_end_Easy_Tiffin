import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypingAnimation = () => {
  return (
    <div
      style={{
        fontSize: "24px",
        color: "black",
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "10px ",
        padding: "20px",
        zIndex: "5555555",
      }}
    >
      <Typewriter
        words={["स्वाद और सेहत से भरपूर घर जैसा खाना, आपके दरवाज़े तक!"]}
        loop={5}
        cursor
        cursorStyle="_"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </div>
  );
};

export default TypingAnimation;
