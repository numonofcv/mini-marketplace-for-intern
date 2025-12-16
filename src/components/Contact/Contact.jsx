import React, {useState} from "react";
import "./Contact.css";
import {FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaTelegramPlane} from "react-icons/fa";

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        message: "",
        agreeTerms: false,
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Yuborilayotgan ma'lumotlar:", formData);
        alert("Shakl yuborildi! (Aslida bu faqat namuna)");
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-info-panel">
                    <p className="panel-title">BIZ DOIMO ALOQADAMIZ</p>
                    <h1 className="panel-heading">Kontakt Markazi</h1>

                    <div className="contact-item">
                        <FaMapMarkerAlt className="icon location-icon" />
                        <div className="item-details">
                            <p className="item-label">Bosh Ofis</p>
                            <p className="item-value">Toshkent, Yunusobod tumani, T-5, Sh. Rashidov ko'chasi, 16</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <FaEnvelope className="icon email-icon" />
                        <div className="item-details">
                            <p className="item-label">Email</p>
                            <p className="item-value">info@minimarket2025.uz</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <FaPhoneAlt className="icon phone-icon" />
                        <div className="item-details">
                            <p className="item-label">Tezkor Raqam</p>
                            <p className="item-value">+998 98 158 00 51</p>
                        </div>
                    </div>

                    <div className="social-links">
                        <a href="#" className="social-icon">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="social-icon">
                            <FaInstagram />
                        </a>
                        <a href="#" className="social-icon">
                            <FaTelegramPlane />
                        </a>{" "}
                    </div>
                </div>

                <div className="contact-form-panel">
                    <h2 className="form-heading">Savol Yuborish Formasi</h2>
                    <p className="form-description">
                        Bizga xabar qoldiring, mutaxassislarimiz bir ish kuni ichida siz bilan bog'lanishadi.
                    </p>

                    <form onSubmit={handleSubmit} className="contact-form">
                        <label htmlFor="fullName">Ism va familiya</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="To'liq ismingizni kiriting"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="phone">Telefon raqami</label>
                        <div className="phone-input-group">
                            <span className="country-code">+998</span>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="XX XXX XX XX"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <label htmlFor="message">Xabar matni</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Savolingizni yoki taklifingizni batafsil yozing..."
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />

                        <div className="terms-checkbox-group">
                            <input
                                type="checkbox"
                                id="agreeTerms"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="agreeTerms" className="terms-label">
                                "Yuborish" tugmasini bosib orqali <a href="#">shartlarni</a> qabul qilasiz.
                            </label>
                        </div>

                        <button type="submit" className="submit-button" disabled={!formData.agreeTerms}>
                            Yuborish
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
