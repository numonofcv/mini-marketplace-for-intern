import React, { useState } from 'react';
import TestimonialCard from './TestimonialCard';
import './Testimonials.css';

const testimonialsData = [
  {
    quote: "Ushbu saytning interfeysi juda qulay va zamonaviy. Mahsulotlarning keng assortimenti barcha ehtiyojlarimni qondirdi. Tezkor yetkazib berish xizmati uchun alohida rahmat!",
    name: "Jahongir Qodirov",
    title: "Innovator",
  },
  {
    quote: "Men doim onlayn xarid qilaman va bu platforma eng yaxshilaridan biri. Har bir kartochka o'ta aniqlik bilan ishlangan va o'zaro aloqa juda silliq. Dizaynerlarga qoyil!",
    name: "Farangiz Alimova",
    title: "UI/UX mutaxassisi",
  },
  {
    quote: "Menga mahsulotlarning tez yetkazilishi juda yoqdi. Har doim xursand bo'lib foydalanaman!",
    name: "Sardor Rahmonov",
    title: "Frontend Developer",
  },
  {
    quote: "Fikrlar va sharhlar orqali to'g'ri tanlov qilishim mumkin bo'ldi. Juda qulay va foydali sayt!",
    name: "Nilufar To'xtayeva",
    title: "Product Manager",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const itemsPerSlide = 2; // 1 yoki 2 kartani bir vaqtida ko'rsatish mumkin
  const maxIndex = testimonialsData.length - itemsPerSlide;

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="testimonials-section">
      <div className="section-header">
        <p className="section-subtitle">MIJOZLARIMIZ NIMA DEYISHADI?</p>
        <h2 className="section-title">Haridorlar Fikrlari</h2>
      </div>

      <div className="testimonials-slider">
        <button className="slide-btn prev" onClick={prevSlide}>❮</button>

        <div
          className="testimonials-track"
          style={{ transform: `translateX(-${(index * 100) / itemsPerSlide}%)` }}
        >
          {testimonialsData.map((testimonial, i) => (
            <div className="testimonial-slide" key={i}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        <button className="slide-btn next" onClick={nextSlide}>❯</button>
      </div>
    </section>
  );
};

export default Testimonials;
