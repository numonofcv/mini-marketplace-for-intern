import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

import Dropdown from "../Dropdown/Dropdown";
import Cart from "../Cart/Cart";

import { FaCartArrowDown, FaChevronDown } from "react-icons/fa";

const Navbar = ({ cartItems, setCartItems }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCartOpen(false);
      setIsMobileMenuOpen(false);
      setIsProductsDropdownOpen(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  /* SCROLL */
  const scrollToId = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").replace("/#", "");

    if (location.pathname !== "/") {
      navigate(`/#${targetId}`);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setIsMobileMenuOpen(false);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsCartOpen(false);
  };

  const toggleProductsDropdownDesktop = () => {
    if (window.innerWidth > 768) {
      setIsProductsDropdownOpen(true);
    }
  };

  const closeProductsDropdownDesktop = () => {
    if (window.innerWidth > 768) {
      setIsProductsDropdownOpen(false);
    }
  };

  const handleMobileProductsClick = () => {
    if (window.innerWidth <= 768) {
      setIsProductsDropdownOpen((prev) => !prev);
    }
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        setIsProductsDropdownOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {" "}
        <div className="navbar-logo" onClick={() => {
    if (window.location.pathname !== "/") {
        window.location.href = "/mini-marketplace-for-intern/#hero"; 
    } else {
        const el = document.getElementById("hero");
        if(el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}}>
  Mini Market<span className="logo-dot">.</span>
</div>

        <ul className="desktop-menu">
          <li className="nav-item">
            <Link to="/#hero" onClick={scrollToId}>
              Bosh Sahifa
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/#services" onClick={scrollToId}>
              Xizmatlar
            </Link>
          </li>

          <li
            className="nav-item products-dropdown-container"
            onMouseEnter={toggleProductsDropdownDesktop}
            onMouseLeave={closeProductsDropdownDesktop}
          >
            <span>Mahsulotlar</span>
            <FaChevronDown className="dropdown-icon" />
            {isProductsDropdownOpen && <Dropdown scrollToId={scrollToId} />}
          </li>

          <li className="nav-item">
            <Link to="/#partners" onClick={scrollToId}>
              Hamkorlar
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/#testimonials" onClick={scrollToId}>
              Fikrlar
            </Link>
          </li>
        </ul>
        <div className="navbar-right-section">
          <div className="cart-dropdown-container">
            <div className="navbar-cart-icon" onClick={toggleCart}>
              <span className="cart-count">
                {cartItems.reduce((s, i) => s + i.quantity, 0)}
              </span>
              <div className="cart-icon-bg">
                <FaCartArrowDown />
              </div>
            </div>

            {isCartOpen && (
              <div className="cart-dropdown">
                <Cart
                  items={cartItems}
                  onAdd={(item) =>
                    setCartItems((prev) =>
                      prev.map((p) =>
                        p.id === item.id
                          ? { ...p, quantity: p.quantity + 1 }
                          : p
                      )
                    )
                  }
                  onRemove={(item) =>
                    setCartItems((prev) =>
                      prev.map((p) =>
                        p.id === item.id
                          ? { ...p, quantity: Math.max(p.quantity - 1, 1) }
                          : p
                      )
                    )
                  }
                  onDelete={(item) =>
                    setCartItems((prev) => prev.filter((p) => p.id !== item.id))
                  }
                />
              </div>
            )}
          </div>

          <div className="menu-icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? "✕" : "☰"}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          <li className="mobile-nav-item">
            <Link to="/#hero" onClick={scrollToId}>
              Bosh Sahifa
            </Link>
          </li>

          <li className="mobile-nav-item">
            <Link to="/#services" onClick={scrollToId}>
              Xizmatlar
            </Link>
          </li>

          <li className="mobile-nav-item" onClick={handleMobileProductsClick}>
            Mahsulotlar <FaChevronDown className="dropdown-icon" />
          </li>

          {/* Mobile dropdown */}
          <Dropdown
            scrollToId={scrollToId}
            isMobileOpen={isProductsDropdownOpen}
          />

          <li className="mobile-nav-item">
            <Link to="/#partners" onClick={scrollToId}>
              Hamkorlar
            </Link>
          </li>

          <li className="mobile-nav-item">
            <Link to="/#testimonials" onClick={scrollToId}>
              Fikrlar
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
