// src/components/Payments/Payments.jsx
import React, { useState } from "react";
import "./Payments.css";
import Cart from "../Cart/Cart";
import { FaArrowLeft, FaCcVisa, FaCcMastercard, FaCreditCard } from "react-icons/fa";

const Payments = ({ total, onBack, onSuccess, cartItems, onAdd, onRemove, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    phone: "",
  });

  const BOT_TOKEN = "8532012992:AAHAwBSbx2KmGuNcZiqkOkxQmg-8xHN8Skc";
  const CHAT_ID = "-5096883340";

  const getCardType = (number) => {
    if (/^8600/.test(number)) return "UZCARD";
    if (/^9860/.test(number)) return "HUMO";
    if (/^4/.test(number)) return "VISA";
    if (/^5[1-5]/.test(number)) return "MASTERCARD";
    return "";
  };

  const cardIcons = {
    UZCARD: <FaCreditCard />,
    HUMO: <FaCreditCard />,
    VISA: <FaCcVisa />,
    MASTERCARD: <FaCcMastercard />,
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === "cardNumber") formatted = formatCardNumber(value);
    if (name === "expiry") formatted = formatExpiry(value);
    if (name === "cvv") formatted = value.replace(/\D/g, "").slice(0, 3);
    if (name === "phone") formatted = value.replace(/[^0-9+]/g, "");

    setFormData((prev) => ({ ...prev, [name]: formatted }));
  };

  const cardType = getCardType(formData.cardNumber.replace(/\s/g, ""));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const pureCardNumber = formData.cardNumber.replace(/\s/g, "");

    if (pureCardNumber.length !== 16) {
      alert("Karta raqami 16 ta raqamdan iborat bo‘lishi kerak");
      setLoading(false);
      return;
    }

    if ((cardType === "VISA" || cardType === "MASTERCARD") && formData.cvv.length !== 3) {
      alert("CVV 3 ta raqamdan iborat bo‘lishi kerak");
      setLoading(false);
      return;
    }

    const phoneRegex = /^\+?[0-9]{9,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Telefon raqami noto‘g‘ri");
      setLoading(false);
      return;
    }

    const maskedCard = pureCardNumber.slice(0, -4).replace(/\d/g, "*") + pureCardNumber.slice(-4);

    // --- TELEGRAM MESSAGE YARATISH ---
    let message = `🛒 Yangi buyurtma\n\n📦 Mahsulotlar:\n`;
    cartItems.forEach((item) => {
      const productName = item.name || item.title || "Noma'lum mahsulot";
      message += `- ${productName} x ${item.quantity} ($${(item.price * item.quantity).toFixed(2)})\n`;
    });

    message += `\n👤 Xaridor: ${formData.cardName}
📞 Telefon: ${formData.phone}
💳 Karta: ${maskedCard}
💰 Jami: $${total.toFixed(2)}`;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`
      );
      const data = await res.json();

      if (data.ok) {
        setSuccess(true);
        setTimeout(onSuccess, 2000);
      } else {
        alert("Buyurtma yuborilmadi");
      }
    } catch {
      alert("Internet xatosi");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="payment-card success">
        <h2>✅ To‘lov muvaffaqiyatli</h2>
        <p>Buyurtmangiz qabul qilindi</p>
      </div>
    );
  }

  return (
    <section className="payment-page">
      <div className="payment-layout">
        <div className="payment-cart">
          <Cart
            items={cartItems}
            onAdd={!loading ? onAdd : null}
            onRemove={!loading ? onRemove : null}
            onDelete={!loading ? onDelete : null}
            isCheckout
          />
        </div>

        <div className="payment-card">
          <h2>To‘lov sahifasi</h2>
          <p className="total">
            Jami summa: <b>${total.toFixed(2)}</b>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              name="cardName"
              placeholder="Karta egasi"
              value={formData.cardName}
              onChange={handleChange}
              required
            />

            <input
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength={19}
              inputMode="numeric"
              autoComplete="cc-number"
              required
            />

            {cardType && (
              <div className={`card-type ${cardType}`}>
                {cardIcons[cardType]} {cardType}
              </div>
            )}

            <div className="row">
              <input
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
                maxLength={5}
                required
              />

              {(cardType === "VISA" || cardType === "MASTERCARD") && (
                <input
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  inputMode="numeric"
                  required
                />
              )}
            </div>

            <input
              name="phone"
              placeholder="Telefon raqami"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "To‘lov amalga oshirilmoqda..." : "To‘lash"}
            </button>
          </form>

          <button className="back-btn" onClick={onBack}>
            <FaArrowLeft style={{ marginRight: 6 }} />
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    </section>
  );
};

export default Payments;
