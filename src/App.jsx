import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Payments from "./pages/Payments";

import ScrollToHash from "./components/ScrollToHash/ScrollToHash";

function App() {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem("mini_marketplace_cart");
            return savedCart ? JSON.parse(savedCart) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("mini_marketplace_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Router>
            <ScrollToHash />
            <Navbar cartItems={cartItems} setCartItems={setCartItems} />

            <Routes>
                <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/payments" element={<Payments cartItems={cartItems} setCartItems={setCartItems} />} />
            </Routes>

            <Footer />
        </Router>
    );
}

export default App;
