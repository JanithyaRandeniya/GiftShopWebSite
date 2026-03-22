"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const categories = [
  { name: "Gift Boxes", desc: "Curated luxury sets", link: "/category/gift-boxes", img: "/images/gifts/boxwithflower1.jpg", backImg: "/images/gifts/black_box.jpg" },
  { name: "Chocolates", desc: "Sweet indulgences", link: "/category/chocolates", img: "/images/gifts/chocalate2.webp", backImg: "/images/gifts/choclatebox1.webp" },
  { name: "Mugs", desc: "Memories to hold", link: "/category/mugs", img: "/images/gifts/mug2.webp", backImg: "/images/gifts/mug1.webp" },
  { name: "Teddy Bears", desc: "Huggable love", link: "/category/teddies", img: "/images/gifts/teddy3.webp", backImg: "/images/gifts/teedy4.webp" },
];

const products = [
  { name: "Luxury Pink Gift Box", price: "Rs. 4,500", badge: "Bestseller", img: "/images/gifts/boxwithflower1.jpg", backImg: "/images/gifts/black_box.jpg" },
  { name: "Chocolate Surprise Set", price: "Rs. 3,200", badge: "New", img: "/images/gifts/choco1.webp", backImg: "/images/gifts/mensgift1.webp" },
  { name: "Romantic Mug Duo", price: "Rs. 2,800", badge: "Popular", img: "/images/gifts/lovemug.webp", backImg: "/images/gifts/photoframe1.webp" },
  { name: "Premium Love Box", price: "Rs. 5,500", badge: "Limited", img: "/images/gifts/teddy1.webp", backImg: "/images/gifts/wallet1.webp" },
];

const testimonials = [
  { name: "Priya S.", text: "The gift box was absolutely stunning. She cried happy tears!", stars: 5 },
  { name: "Rohan M.", text: "Fast delivery, gorgeous packaging. Perfect anniversary gift!", stars: 5 },
  { name: "Anika T.", text: "Every detail was thoughtful. Will definitely order again.", stars: 5 },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@300;400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --rose: #e8547a;
    --rose-light: #f7a8be;
    --rose-pale: #fde8ef;
    --plum: #7b3f8c;
    --plum-light: #b07cc6;
    --cream: #fff8f5;
    --gold: #d4a843;
    --text: #3d1a2e;
    --text-soft: #7a5a6a;
    --white: #ffffff;
    --font-display: 'Playfair Display', serif;
    --font-body: 'Nunito', sans-serif;
    --shadow-soft: 0 8px 32px rgba(232,84,122,0.15);
    --shadow-card: 0 4px 20px rgba(123,63,140,0.1);
    --radius: 20px;
  }

  body {
    font-family: var(--font-body);
    background: var(--cream);
    color: var(--text);
    overflow-x: hidden;
  }

  @keyframes floatUp {
    0%   { transform: translateY(0) rotate(0deg); opacity: 0.8; }
    100% { transform: translateY(-100vh) rotate(45deg); opacity: 0; }
  }
  .heart-particle {
    position: fixed;
    pointer-events: none;
    z-index: 0;
    animation: floatUp linear infinite;
  }

  /* NAV */
  .g-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 48px;
    background: rgba(255,248,245,0.88);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(232,84,122,0.1);
    box-shadow: 0 2px 20px rgba(232,84,122,0.08);
  }
  .g-nav-logo {
    font-family: var(--font-display);
    font-size: 1.6rem; font-style: italic;
    color: var(--plum); text-decoration: none;
  }
  .g-nav-logo span { color: var(--rose); }
  .g-nav-links { display: flex; gap: 32px; list-style: none; }
  .g-nav-links a {
    font-size: 0.9rem; font-weight: 600; letter-spacing: 0.5px;
    color: var(--text-soft); text-decoration: none; transition: color 0.2s;
  }
  .g-nav-links a:hover { color: var(--rose); }
  .g-nav-actions { display: flex; gap: 14px; align-items: center; }
  .g-nav-btn {
    background: var(--rose); color: white; border: none;
    padding: 10px 24px; border-radius: 50px;
    font-family: var(--font-body); font-weight: 700; font-size: 0.85rem;
    cursor: pointer; text-decoration: none;
    box-shadow: 0 4px 15px rgba(232,84,122,0.35);
    transition: all 0.2s;
  }
  .g-nav-btn:hover { background: #d43d6a; transform: translateY(-1px); }

  /* HERO */
  .g-hero {
    position: relative; height: 100vh; min-height: 600px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .g-hero-img { object-fit: cover; object-position: center; }
  .g-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,248,245,0.4) 0%, rgba(255,220,230,0.15) 50%, rgba(123,63,140,0.05) 100%);
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .g-hero-content {
    position: relative; z-index: 2;
    text-align: center; padding: 0 24px;
    animation: fadeSlideUp 1s ease both;
  }
  .g-hero-eyebrow {
    display: inline-block;
    background: rgba(255,255,255,0.75);
    border: 1px solid rgba(232,84,122,0.3);
    color: var(--rose); font-size: 0.8rem; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    padding: 6px 18px; border-radius: 50px; margin-bottom: 20px;
    backdrop-filter: blur(8px);
  }
  .g-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 6vw, 5rem);
    color: var(--rose); font-weight: 400; line-height: 1.1;
    text-shadow: 0 2px 20px rgba(232,84,122,0.2);
    margin-bottom: 4px;
  }
  .g-hero-title em {
    display: block; font-style: italic;
    color: var(--plum);
    font-size: clamp(3.5rem, 7.5vw, 6.5rem); line-height: 1;
  }
  .g-hero-sub {
    font-size: 1.1rem; color: var(--text-soft);
    margin: 20px auto 32px; max-width: 480px; line-height: 1.7;
  }
  .g-hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

  /* BUTTONS */
  .g-btn-primary {
    background: var(--rose); color: white;
    padding: 16px 40px; border-radius: 50px;
    font-family: var(--font-body); font-weight: 700; font-size: 1rem;
    text-decoration: none; display: inline-block; border: none; cursor: pointer;
    box-shadow: 0 8px 25px rgba(232,84,122,0.4);
    transition: all 0.25s;
  }
  .g-btn-primary:hover { background: #d43d6a; transform: translateY(-2px); }
  .g-btn-outline {
    background: rgba(255,255,255,0.88); color: var(--plum);
    padding: 16px 40px; border-radius: 50px;
    font-family: var(--font-body); font-weight: 700; font-size: 1rem;
    text-decoration: none; display: inline-block;
    border: 2px solid rgba(123,63,140,0.25);
    backdrop-filter: blur(8px); transition: all 0.25s;
  }
  .g-btn-outline:hover { background: white; border-color: var(--plum); transform: translateY(-2px); }

  /* RIBBON */
  .g-ribbon {
    background: linear-gradient(90deg, var(--plum), var(--rose), var(--plum));
    color: white; padding: 14px; overflow: hidden;
    font-size: 0.85rem; font-weight: 600; letter-spacing: 1px;
  }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .g-ribbon-inner {
    display: flex; gap: 60px; white-space: nowrap;
    width: max-content; animation: ticker 22s linear infinite;
  }

  /* SECTIONS */
  .g-section { padding: 90px 48px; max-width: 1280px; margin: 0 auto; }
  .g-section-head { text-align: center; margin-bottom: 48px; }
  .g-section-label {
    display: block; color: var(--rose); font-size: 0.8rem;
    font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;
  }
  .g-section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    color: var(--plum); line-height: 1.2; margin-bottom: 8px;
  }
  .g-section-sub { color: var(--text-soft); font-size: 1rem; }

  /* ── 3-D FLIP CARD SHARED ── */
  .flip-scene {
    perspective: 1000px;
    cursor: pointer;
  }
  .flip-card {
    position: relative;
    width: 100%; height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(0.4,0.2,0.2,1);
    border-radius: var(--radius);
  }
  .flip-scene.flipped .flip-card { transform: rotateY(180deg); }
  .flip-front, .flip-back {
    position: absolute; inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: var(--radius);
    overflow: hidden;
  }
  .flip-back { transform: rotateY(180deg); }

  /* CATEGORIES */
  .g-cat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  .g-cat-scene {
    height: 280px;
    border-radius: var(--radius);
  }
  .g-cat-face {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: flex-end;
    padding-bottom: 24px;
    background: var(--rose-pale);
  }
  .g-cat-face-img {
    position: absolute; inset: 0;
  }
  .g-cat-face-img img { object-fit: cover; width: 100%; height: 100%; }
  .g-cat-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(61,26,46,0.7) 0%, transparent 60%);
  }
  .g-cat-label {
    position: relative; z-index: 2;
    text-align: center; color: white;
  }
  .g-cat-name { font-weight: 700; font-size: 1rem; margin-bottom: 2px; }
  .g-cat-desc { font-size: 0.8rem; opacity: 0.85; }
  .g-cat-back-face {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 12px; padding: 20px; text-align: center;
    background: var(--plum);
  }
  .g-cat-back-face img { border-radius: 12px; object-fit: cover; }
  .g-cat-back-face .g-cat-name { color: white; font-size: 1.1rem; }
  .g-cat-back-face .g-cat-desc { color: rgba(255,255,255,0.75); font-size: 0.85rem; }
  .g-cat-back-btn {
    background: var(--rose); color: white;
    border: none; padding: 8px 22px; border-radius: 50px;
    font-family: var(--font-body); font-weight: 700; font-size: 0.8rem;
    cursor: pointer; text-decoration: none; margin-top: 4px;
  }

  /* PRODUCTS */
  .g-products-bg { background: linear-gradient(180deg, var(--cream) 0%, #fff0f5 100%); }
  .g-product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
  }
  .g-product-scene {
    height: 380px;
    border-radius: var(--radius);
    box-shadow: var(--shadow-card);
  }
  .g-product-face {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    background: white;
  }
  .g-product-img-wrap {
    position: relative; flex: 1; overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;
  }
  .g-product-img-wrap img { object-fit: cover; width: 100%; height: 100%; transition: transform 0.4s; }
  .g-product-scene:hover .flip-front .g-product-img-wrap img { transform: scale(1.04); }
  .g-product-badge {
    position: absolute; top: 12px; left: 12px; z-index: 2;
    background: var(--rose); color: white;
    font-size: 0.7rem; font-weight: 700;
    padding: 4px 12px; border-radius: 50px;
  }
  .g-product-info { padding: 16px 20px 20px; }
  .g-product-name { font-weight: 700; font-size: 0.95rem; color: var(--text); margin-bottom: 4px; }
  .g-product-price { color: var(--rose); font-weight: 700; font-size: 1.05rem; margin-bottom: 12px; }
  .g-add-cart {
    width: 100%; background: var(--plum); color: white;
    border: none; padding: 10px; border-radius: 12px;
    font-family: var(--font-body); font-weight: 700; font-size: 0.85rem;
    cursor: pointer; transition: background 0.2s;
  }
  .g-add-cart:hover { background: var(--rose); }
  .g-product-back-face {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 14px; padding: 24px; text-align: center;
    background: linear-gradient(135deg, var(--plum), #4a1a60);
  }
  .g-product-back-face img { border-radius: 14px; object-fit: cover; box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  .g-product-back-face .g-product-name { color: white; font-size: 1rem; }
  .g-product-back-face .g-product-price { color: var(--rose-light); margin-bottom: 0; }
  .g-product-back-face .g-add-cart { background: var(--rose); border-radius: 50px; padding: 10px 28px; width: auto; }
  .g-product-back-face .g-add-cart:hover { background: #d43d6a; }
  .flip-hint {
    font-size: 0.72rem; color: rgba(255,255,255,0.55);
    margin-top: -4px; letter-spacing: 0.5px;
  }

  /* WHY US */
  .g-why-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
  }
  .g-why-card {
    text-align: center; padding: 32px 20px;
    background: white; border-radius: var(--radius);
    box-shadow: var(--shadow-card);
  }
  .g-why-icon { font-size: 2.5rem; margin-bottom: 14px; display: block; }
  .g-why-title { font-weight: 700; color: var(--plum); margin-bottom: 6px; }
  .g-why-text { font-size: 0.9rem; color: var(--text-soft); line-height: 1.6; }

  /* TESTIMONIALS */
  .g-testi-bg { background: linear-gradient(135deg, #fff0f5 0%, #f5e8ff 100%); }
  .g-testi-inner { padding: 90px 48px; max-width: 700px; margin: 0 auto; text-align: center; }
  .g-testi-box {
    background: white; border-radius: var(--radius);
    padding: 40px;
    box-shadow: var(--shadow-soft);
    border: 1px solid rgba(232,84,122,0.12);
  }
  .g-stars { color: #f5c842; font-size: 1.2rem; letter-spacing: 2px; margin-bottom: 16px; }
  .g-testi-text {
    font-family: var(--font-display); font-style: italic;
    font-size: 1.3rem; color: var(--text); line-height: 1.7; margin-bottom: 16px;
  }
  .g-testi-name { font-weight: 700; color: var(--rose); }
  .g-dots { display: flex; gap: 8px; justify-content: center; margin-top: 24px; }
  .g-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--rose-light); cursor: pointer;
    transition: all 0.2s; border: none;
  }
  .g-dot.active { background: var(--rose); transform: scale(1.4); }

  /* CTA */
  .g-cta {
    background: linear-gradient(135deg, var(--plum) 0%, var(--rose) 100%);
    padding: 90px 48px; text-align: center; color: white;
  }
  .g-cta-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 16px; font-weight: 400;
  }
  .g-cta-title em { font-style: italic; }
  .g-cta-sub { font-size: 1.05rem; opacity: 0.9; margin-bottom: 36px; }
  .g-btn-white {
    background: white; color: var(--plum);
    padding: 16px 44px; border-radius: 50px;
    font-family: var(--font-body); font-weight: 700; font-size: 1rem;
    text-decoration: none; display: inline-block;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    transition: all 0.25s;
  }
  .g-btn-white:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,0.2); }

  /* FOOTER */
  footer {
    background: #3d1a2e; color: rgba(255,255,255,0.6);
    padding: 40px 48px; text-align: center; font-size: 0.9rem;
  }
  footer a { color: #f7a8be; text-decoration: none; }

  @media (max-width: 768px) {
    .g-nav { padding: 14px 20px; }
    .g-nav-links { display: none; }
    .g-section, .g-testi-inner, .g-cta { padding: 60px 20px; }
    footer { padding: 32px 20px; }
  }
`;

// Reusable 3D Flip Scene component
function FlipScene({
  className,
  children,
}: {
  className?: string;
  children: [React.ReactNode, React.ReactNode];
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`flip-scene${flipped ? " flipped" : ""}${className ? " " + className : ""}`}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="flip-card">
        <div className="flip-front">{children[0]}</div>
        <div className="flip-back">{children[1]}</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveTestimonial((p) => (p + 1) % testimonials.length),
      4000
    );
    return () => clearInterval(t);
  }, []);

  const particles = [
    { left: "5%",  dur: "9s",  delay: "0s",   size: "14px", icon: "💕" },
    { left: "15%", dur: "12s", delay: "1.5s",  size: "10px", icon: "🌸" },
    { left: "28%", dur: "8s",  delay: "3s",    size: "16px", icon: "✨" },
    { left: "42%", dur: "11s", delay: "0.8s",  size: "12px", icon: "💖" },
    { left: "58%", dur: "10s", delay: "2.2s",  size: "14px", icon: "💕" },
    { left: "70%", dur: "13s", delay: "4s",    size: "10px", icon: "🌸" },
    { left: "82%", dur: "9s",  delay: "1s",    size: "16px", icon: "✨" },
    { left: "93%", dur: "11s", delay: "3.5s",  size: "12px", icon: "💖" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="heart-particle"
          style={{ left: p.left, bottom: "-20px", fontSize: p.size, animationDuration: p.dur, animationDelay: p.delay }}
        >
          {p.icon}
        </div>
      ))}

      {/* NAVBAR */}
      <nav className="g-nav">
        <a href="/" className="g-nav-logo">Gift<span>ly</span> ✦</a>
        <ul className="g-nav-links">
          <li><a href="/shop">Shop</a></li>
          <li><a href="/category/gift-boxes">Gift Boxes</a></li>
          <li><a href="/chocolates">Chocolates</a></li>
          <li><a href="/about">About</a></li>
        </ul>
        <div className="g-nav-actions">
          <a href="/cart" style={{ fontSize: "1.3rem", textDecoration: "none" }}>🛍️</a>
          <a href="/shop" className="g-nav-btn">Shop Now</a>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="g-hero">
          <Image
            src="/images/home/cover2.png"
            alt="Beautiful gift boxes for every occasion"
            fill priority sizes="100vw"
            className="g-hero-img"
          />
          <div className="g-hero-overlay" />
          <div className="g-hero-content">
            <span className="g-hero-eyebrow">✦ Free delivery over Rs. 5,000 ✦</span>
            <h1 className="g-hero-title">
              Make Every Moment
              <em>Special</em>
            </h1>
            <p className="g-hero-sub">
              Discover beautifully curated gifts for birthdays,
              anniversaries &amp; special celebrations
            </p>
            <div className="g-hero-btns">
              <Link href="/shop" className="g-btn-primary">Shop Now</Link>
              <Link href="/explore-gifts" className="g-btn-outline">Explore Gift Boxes</Link>
            </div>
          </div>
        </section>

        {/* RIBBON */}
        <div className="g-ribbon">
          <div className="g-ribbon-inner">
            {[0, 1].map((r) => (
              <span key={r} style={{ display: "flex", gap: "60px" }}>
                <span>✦ FREE GIFT WRAPPING</span>
                <span>✦ SAME-DAY DELIVERY</span>
                <span>✦ CUSTOM MESSAGES</span>
                <span>✦ LUXURY PACKAGING</span>
                <span>✦ 100% HANDCRAFTED</span>
              </span>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="g-section">
          <div className="g-section-head">
            <span className="g-section-label">Browse</span>
            <h2 className="g-section-title">Shop by Category</h2>
            <p className="g-section-sub">Click a card to reveal more — find the perfect gift for every occasion</p>
          </div>
          <div className="g-cat-grid">
            {categories.map((cat, i) => (
              <FlipScene key={i} className="g-cat-scene">
                {/* FRONT */}
                <div className="g-cat-face">
                  <div className="g-cat-face-img">
                    <Image src={cat.img} alt={cat.name} fill sizes="300px" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="g-cat-overlay" />
                  <div className="g-cat-label">
                    <div className="g-cat-name">{cat.name}</div>
                    <div className="g-cat-desc">{cat.desc}</div>
                  </div>
                </div>
                {/* BACK */}
                <div className="g-cat-back-face">
                  <Image src={cat.backImg} alt={cat.name + " back"} width={160} height={120} style={{ objectFit: "cover", borderRadius: 12 }} />
                  <div className="g-cat-name">{cat.name}</div>
                  <div className="g-cat-desc">{cat.desc}</div>
                  <Link href={cat.link} className="g-cat-back-btn" onClick={(e) => e.stopPropagation()}>
                    Shop Now →
                  </Link>
                </div>
              </FlipScene>
            ))}
          </div>
        </div>

        {/* FEATURED PRODUCTS */}
        <div className="g-products-bg">
          <div className="g-section">
            <div className="g-section-head">
              <span className="g-section-label">Handpicked</span>
              <h2 className="g-section-title">Featured Gifts</h2>
              <p className="g-section-sub">Click any card for a 3D reveal — our most-loved surprises</p>
            </div>
            <div className="g-product-grid">
              {products.map((p, i) => (
                <FlipScene key={i} className="g-product-scene">
                  {/* FRONT */}
                  <div className="g-product-face">
                    <div className="g-product-img-wrap">
                      <span className="g-product-badge">{p.badge}</span>
                      <Image src={p.img} alt={p.name} fill sizes="300px" style={{ objectFit: "cover" }} />
                    </div>
                    <div className="g-product-info">
                      <div className="g-product-name">{p.name}</div>
                      <div className="g-product-price">{p.price}</div>
                      <button className="g-add-cart" onClick={(e) => e.stopPropagation()}>Add to Cart 🛒</button>
                    </div>
                  </div>
                  {/* BACK */}
                  <div className="g-product-back-face">
                    <Image src={p.backImg} alt={p.name + " detail"} width={180} height={150} style={{ objectFit: "cover", borderRadius: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }} />
                    <div className="g-product-name">{p.name}</div>
                    <div className="g-product-price">{p.price}</div>
                    <button className="g-add-cart" onClick={(e) => e.stopPropagation()}>Add to Cart 🛒</button>
                    <span className="flip-hint">tap again to flip back</span>
                  </div>
                </FlipScene>
              ))}
            </div>
          </div>
        </div>

        {/* WHY US */}
        <div className="g-section">
          <div className="g-section-head">
            <span className="g-section-label">Why Choose Us</span>
            <h2 className="g-section-title">Gifting Made Effortless</h2>
            <p className="g-section-sub">Every detail is handled with love</p>
          </div>
          <div className="g-why-grid">
            {[
              { icon: "🎀", title: "Gift Wrapping", text: "Every order beautifully wrapped at no extra cost" },
              { icon: "🚀", title: "Same-Day Delivery", text: "Order before 2 PM for same-day delivery" },
              { icon: "💌", title: "Personal Messages", text: "Add a heartfelt note to make it unforgettable" },
              { icon: "⭐", title: "Curated Quality", text: "Only the finest products, handpicked with care" },
            ].map((w, i) => (
              <div key={i} className="g-why-card">
                <span className="g-why-icon">{w.icon}</span>
                <div className="g-why-title">{w.title}</div>
                <div className="g-why-text">{w.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="g-testi-bg">
          <div className="g-testi-inner">
            <div className="g-section-head">
              <span className="g-section-label">Love Stories</span>
              <h2 className="g-section-title">What Customers Say</h2>
            </div>
            <div className="g-testi-box">
              <div className="g-stars">{"★".repeat(testimonials[activeTestimonial].stars)}</div>
              <p className="g-testi-text">&ldquo;{testimonials[activeTestimonial].text}&rdquo;</p>
              <div className="g-testi-name">— {testimonials[activeTestimonial].name}</div>
            </div>
            <div className="g-dots">
              {testimonials.map((_, i) => (
                <button key={i} className={`g-dot${i === activeTestimonial ? " active" : ""}`} onClick={() => setActiveTestimonial(i)} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="g-cta">
          <h2 className="g-cta-title">Ready to Make Someone <em>Smile?</em></h2>
          <p className="g-cta-sub">Browse our full collection and find the perfect gift today</p>
          <Link href="/explore-gifts" className="g-btn-white">Explore All Gifts ✦</Link>
        </div>
      </main>

      <footer>
        <p>
          © 2026 Giftly. Made with 💗 &nbsp;|&nbsp;
          <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/contact">Contact</a>
        </p>
      </footer>
    </>
  );
}
