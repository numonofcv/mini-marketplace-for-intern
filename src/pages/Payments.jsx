// src/pages/Payments.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentsComponent from "../components/Payments/Payments";

const Payments = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (cartItems.length === 0) navigate("/");
  }, [cartItems, navigate]);

  const handleBack = () => navigate(-1);

  const handleSuccess = () => {
    setCartItems([]);
    navigate("/");
  };

  // Savatdagi itemlarni boshqarish funksiyalari
  const handleAdd = (item) => {
    const exist = cartItems.find(i => i.id === item.id);
    if (exist) {
      setCartItems(cartItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemove = (item) => {
    const exist = cartItems.find(i => i.id === item.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter(i => i.id !== item.id));
    } else {
      setCartItems(cartItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
      ));
    }
  };

  const handleDelete = (item) => {
    setCartItems(cartItems.filter(i => i.id !== item.id));
  };

  return (
    <PaymentsComponent
      total={total}
      onBack={handleBack}
      onSuccess={handleSuccess}
      cartItems={cartItems}
      onAdd={handleAdd}
      onRemove={handleRemove}
      onDelete={handleDelete}
    />
  );
};

export default Payments;
