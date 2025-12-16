import React, {useEffect, useState} from "react";
import {fetchProducts} from "../data";
import ProductCard from "../ProductCard";
import "../Products.css";
import "./TrendingGadgets.css";

const TrendingGadgets = ({setCartItems}) => {
    const [trending, setTrending] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const load = async () => {
            const data = await fetchProducts();
            const filtered = data.filter((item) => item.category === "electronics");
            setTrending(filtered.slice(0, 8)); // 8 ta mahsulot olib, 4 ta yonma-yon ko‘rinadi
        };
        load();
    }, []);

    const itemsPerSlide = 4;
    const maxIndex = trending.length - itemsPerSlide;

    const prevSlide = () => {
        setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    };

    const nextSlide = () => {
        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    };

    const addToCart = (product) => {
        if (!setCartItems) return;
        setCartItems((prev) => {
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                return prev.map((p) => (p.id === product.id ? {...p, quantity: (p.quantity || 1) + 1} : p));
            }
            return [
                ...prev,
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                },
            ];
        });
    };

    return (
        <div className="slider-wrapper">
            <h2 className="title">Trending Gadgets</h2>

            <div className="slider">
                <button className="slide-btn prev" onClick={prevSlide}>
                    ❮
                </button>

                <div
                    className="slides multi"
                    style={{
                        transform: `translateX(-${(index * 100) / itemsPerSlide}%)`,
                    }}
                >
                    {trending.map((item) => (
                        <div className="multi-slide-item" key={item.id}>
                            <ProductCard item={item} onAdd={addToCart} />
                        </div>
                    ))}
                </div>

                <button className="slide-btn next" onClick={nextSlide}>
                    ❯
                </button>
            </div>
        </div>
    );
};

export default TrendingGadgets;
