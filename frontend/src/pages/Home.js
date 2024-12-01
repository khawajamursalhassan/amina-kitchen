import React from "react";
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function Home() {

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <div className="home-page">
      {/* Header Section */}
      <header className="hero-section">
        <div className="hero-text">
          <h1>Welcome to Amina's Kitchen</h1>
          <p>Your go-to place for freshly baked goods made with love and care.</p>
          <Link to="/products" className="hero-button">
            Browse Products
          </Link>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          At Amina's Kitchen, we’ve been baking delightful treats for over a decade. What started as a
          small family passion has blossomed into a beloved bakery known for its rich flavors, premium
          ingredients, and a touch of home in every bite. Whether it's a warm loaf of bread, decadent
          cakes, or delicate pastries, every creation reflects our dedication to quality and taste.
        </p>
        <img
          src="https://i.postimg.cc/5ym40vR0/logo.png"
          alt="Amina baking in the kitchen"
          className="about-image"
        />
      </section>

      {/* Featured Products Section */}
      <section className="products-section">
        <h2>Our Best Sellers</h2>
        <div className="product-gallery">
          <img src="https://i.postimg.cc/RVXCx7tp/1.png" alt="Delicious Cake" />
          <img src="https://i.postimg.cc/7P1Ym8Zk/2.png" alt="Fresh Cookies" />
          <img src="https://i.postimg.cc/L8599JB9/4.png" alt="Freshly Baked Bread" />
        </div>
        <Link to="/products" className="products-link">
          See All Products
        </Link>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Have questions or special requests? We're here to help!</p>
        <Link to="/contact" className="contact-button">
          Get in Touch
        </Link>
      </section>
    </div>
      </div>
    
  );
}
