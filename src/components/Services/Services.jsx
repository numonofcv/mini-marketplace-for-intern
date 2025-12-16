import "./Services.css";

function Services() {
    return (
        <div className="services-page">
            <div className="container">
                <h1 className="section-title">Xizmatlarimiz</h1>
                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon">🚚</div>
                        <h3>Yetkazib Berish</h3>
                        <p>
                            100,000 so'mdan yuqori xaridlarga bepul yetkazib berish, Butun mamlakat bo'ylab 1-3 kun
                            ichida ishonchli yetkazib berish xizmati.
                        </p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon">🔒</div>
                        <h3>Xavfsiz To'lov</h3>
                        <p>Barcha to'lov operatsiyalari zamonaviy shifrlash tizimlari orqali himoyalangan.</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon">💼</div>
                        <h3>24/7 Mijozlarga Xizmat</h3>
                        <p>Savollar va yordam uchun har qanday vaqtda mutaxassislarimiz bilan bog'laning</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon">✨</div>
                        <h3>Sifat Kafolati</h3>
                        <p>Mahsulot sizga yoqmasa, 30 kun ichida pulingizni qaytarib olish kafolati.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
