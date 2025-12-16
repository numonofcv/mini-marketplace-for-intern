import React from "react";
import "./Cart.css";
import {FaTrash, FaCreditCard} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Cart = ({
    items = [],
    shipping = 0,
    onAdd,
    onRemove,
    onDelete,
    isCheckout = false, // Payment page uchun flag
}) => {
    const navigate = useNavigate();

    const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + shipping;

    const handleCheckout = () => {
        navigate("/payments");
    };

    return (
        <div className="card cart-card">
            <div className="card-header">
                <h3 className="header-title">Haridlar Savati</h3>
                <span className="item-count">{items.reduce((sum, i) => sum + i.quantity, 0)} ta mahsulot</span>
            </div>

            <div className="card-body">
                {items.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📦</div>
                        <p className="empty-message">Savatingiz bo‘sh. Mahsulot qo‘shing!</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.image} alt={item.title} className="cart-item-img" />
                            <div className="cart-details-wrapper">
                                <div className="cart-item-details">
                                    <p className="cart-item-title">{item.title}</p>
                                    <p className="cart-item-price">{formatCurrency(item.price * item.quantity)}</p>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => onRemove && onRemove(item)}
                                            disabled={!onRemove || item.quantity <= 1}
                                        >
                                            −
                                        </button>

                                        <span className="cart-item-quantity">{item.quantity}</span>

                                        <button
                                            className="quantity-btn"
                                            onClick={() => onAdd && onAdd(item)}
                                            disabled={!onAdd}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className="delete-btn"
                                        onClick={() => onDelete && onDelete(item)}
                                        disabled={!onDelete}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="card-footer">
                <div className="summary-row">
                    <span className="summary-label">Oraliq summa:</span>
                    <span className="summary-value">{formatCurrency(subtotal)}</span>
                </div>

                <div className="summary-row">
                    <span className="summary-label">Yetkazib berish:</span>
                    <span className="summary-value delivery-cost">
                        {shipping > 0 ? formatCurrency(shipping) : "Bepul"}
                    </span>
                </div>

                <div className="summary-row total-row">
                    <span className="summary-label">Jami:</span>
                    <span className="summary-value total-amount">{formatCurrency(total)}</span>
                </div>

                {!isCheckout && (
                    <button className="checkout-button" disabled={items.length === 0} onClick={handleCheckout}>
                        <FaCreditCard className="button-icon" />
                        To‘lovga o‘tish
                    </button>
                )}
            </div>
        </div>
    );
};

export default Cart;
