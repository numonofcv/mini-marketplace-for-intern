import React, { useState, useEffect, useCallback } from "react";
import { heroData } from "./heroData";
import "./Hero.css";
const HeroSlide = ({
  title,
  subtitle,
  buttonText,
  className,
  isActive,
  icon: Icon, 
}) => {
  return (
    <div className={`hero-slide ${className} ${isActive ? "active" : ""}`}>
      <div className="slide-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>

        <button className="hero-button">
          {buttonText}
          {Icon && <Icon className="hero-btn-icon" />}
        </button>
      </div>
    </div>
  );
};

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = heroData.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) =>
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  }, [totalSlides]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="hero-carousel-container">
      <div
        className="hero-carousel-wrapper"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {heroData.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            {...slide}
            isActive={index === activeIndex}
          />
        ))}
      </div>

      <div className="hero-indicators">
        {heroData.map((_, index) => (
          <span
            key={index}
            className={`indicator ${
              index === activeIndex ? "active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
