import React, {useEffect, useState} from "react";
import {fetchProducts} from "./data";
import ProductCard from "./ProductCard";
import "./Products.css";
import {FaChevronDown} from "react-icons/fa";
const Products = ({setCartItems}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
            setLoading(false);
        };
        loadProducts();
    }, []);

    const addToCart = (product) => {
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

    const loadMore = () => {
        setVisibleCount((prev) => prev + 10);
    };

    return (
        <div className="products-container">
            <h2 className="title">Maxsulotlar</h2>

            <div className="products-grid">
                {loading ? (
                    <p className="loading">Ma'lumotlar yuklanmoqda...</p>
                ) : products.length === 0 ? (
                    <p className="error-message">Mahsulotlar topilmadi.</p>
                ) : (
                    products
                    .slice(0, visibleCount)
                    .map((item) => <ProductCard key={item.id} item={item} onAdd={addToCart} />)
                )}
            </div>

            {products.length > visibleCount && (
                <div className="load-more-wrapper">
                    <button className="load-more-btn" onClick={loadMore}>
                        Ko‘proq ko‘rish <FaChevronDown className="btn-icon" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Products;
