// src/pages/Home.jsx
import React, {useEffect} from "react";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import Partners from "../components/Partners/Partners";
import Products from "../components/Products/Products";
import TrendingGadgets from "../components/Products/TrendingGadgets/TrendingGadgets";
import Testimonials from "../components/Testimonials/Testimonials";
import Contact from "../components/Contact/Contact";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = ({cartItems, setCartItems}) => {
    useEffect(() => {
        AOS.init({
            duration: 1000, 
            once: false, 
            easing: "ease-in-out",
        });
    }, []);

    return (
        <div>
            <section id="hero" data-aos="fade-up">
                <Hero />
            </section>

            <section id="services" data-aos="fade-up">
                <Services />
            </section>

            <section id="partners" data-aos="fade-up">
                <Partners />
            </section>

            <section id="products" data-aos="fade-up">
                <Products cartItems={cartItems} setCartItems={setCartItems} />
            </section>

            <section id="trending" data-aos="fade-up">
                <TrendingGadgets cartItems={cartItems} setCartItems={setCartItems} />
            </section>

            <section id="testimonials" data-aos="fade-up">
                <Testimonials />
            </section>

            <section id="contact" data-aos="fade-up">
                <Contact />
            </section>
        </div>
    );
};

export default Home;
