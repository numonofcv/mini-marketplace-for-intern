import React from 'react';
import './TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => {
  const { quote, name, title } = testimonial;
  const initial = name ? name.charAt(0).toUpperCase() : '';

  return (
    <div className="testimonial-card">
      <span className="quote-icon">“</span>
      <p className="quote-text">{quote}</p>

      <div className="author-info">
        <div className="author-initial">{initial}</div>
        <div className="author-details">
          <p className="author-name">{name}</p>
          <p className="author-title">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
