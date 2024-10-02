import React from "react";
import TypingAnimation from "./TypingAnimation";
import "./HeroSection.css"; // Create a CSS file for styling

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="overlay"></div>
      <div className="hero-content">
        
        <TypingAnimation/>
        <div className="action-buttons">
          {/* You can add buttons here if you want, or keep it clean */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
