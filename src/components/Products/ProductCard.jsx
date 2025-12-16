// ProductCard.jsx

import React, {useState} from "react";
import "./Products.css";
import {FaCartPlus, FaPlus, FaMinus} from "react-icons/fa";

const ProductCard = ({item, onAdd, onRemove}) => {
    const [quantity, setQuantity] = useState(0);

    const formattedPrice = `$${item.price.toFixed(2)}`;

    const displayCategory = item.category.toUpperCase().includes("CLOTHING")
        ? "MEN'S CLOTHING"
        : item.category.toUpperCase().includes("JEWEL")
        ? "JEWELERY"
        : item.category.toUpperCase();

    const handleAdd = () => {
        setQuantity((prev) => prev + 1);
        onAdd && onAdd(item);
    };

    const handleRemove = () => {
        if (quantity > 0) {
            setQuantity((prev) => prev - 1);
            onRemove && onRemove(item);
        }
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={item.image} alt={item.title} className="product-img" />
            </div>

            <div className="product-details">
                <p className="product-category">{displayCategory}</p>
                <h3 className="product-title">{item.title}</h3>
                <div className="product-footer">
                    <p className="product-price">{formattedPrice}</p>

                    {quantity === 0 ? (
                        <button className="btn" onClick={handleAdd}>
                            Savatga <FaCartPlus className="btn-icon" />
                        </button>
                    ) : (
                        <div className="quantity-controls-cart">
                            <button className="btn-quantity" onClick={handleRemove}>
                                <FaMinus />
                            </button>
                            <span className="quantity">{quantity}</span>
                            <button className="btn-quantity" onClick={handleAdd}>
                                <FaPlus />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
