"use client";

import Image from "next/image";
import { useState } from "react";
import Nav from "@/src/components/nav";
import Ribbon from "@/src/components/ribbon";
import Footer from "@/src/components/footer";

const mugs = [
  { id:1, name:"Romantic Mug Duo", price:2800, badge:"Popular", img:"/images/gifts/lovemug.webp", hoverImg:"/images/gifts/photoframe1.webp", desc:"Matching 'You & Me' porcelain mugs for couples", material:"Porcelain", capacity:"350ml", rating:4, reviews:62 },
  { id:2, name:"Floral Tea Gift Set", price:3300, badge:"New", img:"/images/gifts/photoframe1.webp", hoverImg:"/images/gifts/lovemug.webp", desc:"4 artisan teas + 2 floral hand-painted cups", material:"Ceramic", capacity:"280ml", rating:4, reviews:41 },
  { id:3, name:"Personalised Photo Mug", price:1800, badge:"Custom", img:"/images/gifts/lovemug.webp", hoverImg:"/images/gifts/boxwithflower1.jpg", desc:"Upload your photo — printed with archival ink", material:"Ceramic", capacity:"300ml", rating:4, reviews:167 },
  { id:4, name:"Gold-Rim Luxury Mug Set", price:4200, badge:"Premium", img:"/images/gifts/photoframe1.webp", hoverImg:"/images/gifts/wallet1.webp", desc:"Set of 4 ceramic mugs with 22k gold rim", material:"Fine Ceramic", capacity:"320ml", rating:5, reviews:38 },
  { id:5, name:"Travel Mug with Engraving", price:2600, badge:"", img:"/images/gifts/lovemug.webp", hoverImg:"/images/gifts/mensgift1.webp", desc:"Double-wall stainless steel, custom engraved", material:"Stainless Steel", capacity:"450ml", rating:5, reviews:55 },
  { id:6, name:"His & Hers Matching Set", price:3600, badge:"Popular", img:"/images/gifts/photoframe1.webp", hoverImg:"/images/gifts/lovemug.webp", desc:"Two mugs, two hearts — perfect couple gift", material:"Porcelain", capacity:"380ml", rating:5, reviews:91 },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  .mugs-page { font-family: 'Outfit', sans-serif; background: #fafaf8; }

  /* HERO */
  .mugs-hero {
    background: linear-gradient(135deg, #e8f4f8 0%, #f0f4ff 50%, #fde8ef 100%);
    padding: 72px 48px 56px; position: relative; overflow: hidden;
  }
  .mugs-hero::after {
    content: '☕'; position: absolute; right: 60px; top: 50%;
    transform: translateY(-50%); font-size: 200px; opacity: 0.06;
    pointer-events: none;
  }
  .mugs-hero-inner { max-width: 1280px; margin: 0 auto; }
  .g-breadcrumb { display: flex; gap: 6px; align-items: center; font-size: 0.82rem; color: #7a7a9a; margin-bottom: 14px; }
  .g-breadcrumb a { color: #5a7fd4; text-decoration: none; }
  .mugs-hero h1 {
    font-family: 'Libre Baskerville', serif; font-size: clamp(2.2rem, 4.5vw, 3.5rem);
    color: #2a3060; margin-bottom: 12px; line-height: 1.15;
  }
  .mugs-hero h1 em { font-style: italic; color: #5a7fd4; }
  .mugs-hero p { color: #5a5a7a; font-size: 1rem; max-width: 480px; line-height: 1.7; }

  .g-section { padding: 64px 48px; max-width: 1280px; margin: 0 auto; }
  .g-section-head { margin-bottom: 40px; }
  .g-label { display: block; color: #5a7fd4; font-size: 0.78rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
  .g-title { font-family: 'Libre Baskerville', serif; font-size: clamp(1.8rem, 3vw, 2.4rem); color: #2a3060; margin-bottom: 6px; }

  /* GRID */
  .mugs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 28px;
  }

  /* CARD — slide-up reveal overlay */
  .mc-card {
    background: white; border-radius: 22px; overflow: hidden;
    box-shadow: 0 4px 20px rgba(42,48,96,0.08);
    border: 1px solid rgba(90,127,212,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative;
  }
  .mc-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(90,127,212,0.18);
  }

  .mc-img-wrap { position: relative; height: 230px; overflow: hidden; background: linear-gradient(135deg, #e8f4f8, #f0f4ff); }
  .mc-img-main { position: absolute; inset: 0; transition: transform 0.5s ease; }
  .mc-card:hover .mc-img-main { transform: scale(1.06); }

  /* Slide-up overlay with alt image */
  .mc-img-overlay {
    position: absolute; left: 0; right: 0; bottom: 0; height: 0;
    overflow: hidden;
    transition: height 0.45s cubic-bezier(0.4,0,0.2,1);
  }
  .mc-card:hover .mc-img-overlay { height: 60%; }
  .mc-img-overlay-inner { position: absolute; bottom: 0; left: 0; right: 0; height: 230px; }

  .mc-badge {
    position: absolute; top: 14px; left: 14px; z-index: 3;
    padding: 5px 14px; border-radius: 50px;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.5px;
    color: white; text-transform: uppercase;
    background: linear-gradient(135deg, #5a7fd4, #2a3060);
  }
  .mc-badge.custom { background: linear-gradient(135deg, #7b3f8c, #e8547a); }
  .mc-badge.premium { background: linear-gradient(135deg, #b8860b, #d4a843); }

  .wishlist-btn {
    position: absolute; top: 14px; right: 14px; z-index: 3;
    background: white; border: none; border-radius: 50%;
    width: 34px; height: 34px; cursor: pointer; font-size: 1rem;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: transform 0.2s;
  }
  .wishlist-btn:hover { transform: scale(1.2); }

  .mc-info { padding: 20px 22px 22px; }
  .mc-specs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
  .mc-spec {
    background: rgba(90,127,212,0.08); color: #2a3060;
    font-size: 0.7rem; font-weight: 600; padding: 3px 10px; border-radius: 50px;
  }
  .mc-stars { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; }
  .mc-stars-val { color: #f5c842; font-size: 0.85rem; }
  .mc-stars-count { font-size: 0.75rem; color: #8a8aaa; }
  .mc-name { font-family: 'Libre Baskerville', serif; font-size: 1.05rem; color: #2a3060; margin-bottom: 4px; font-weight: 700; }
  .mc-desc { font-size: 0.8rem; color: #5a5a7a; margin-bottom: 14px; line-height: 1.5; }
  .mc-footer { display: flex; align-items: center; justify-content: space-between; }
  .mc-price { font-family: 'Libre Baskerville', serif; font-weight: 700; font-size: 1.15rem; color: #5a7fd4; }
  .mc-cart {
    background: linear-gradient(135deg, #2a3060, #5a7fd4);
    color: white; border: none; padding: 9px 18px; border-radius: 50px;
    font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 0.8rem;
    cursor: pointer; transition: all 0.2s;
  }
  .mc-cart:hover { transform: scale(1.05); box-shadow: 0 4px 14px rgba(90,127,212,0.35); }

  /* CUSTOM BANNER */
  .custom-mug-banner {
    background: linear-gradient(135deg, rgba(90,127,212,0.06), rgba(232,84,122,0.06));
    border-radius: 24px; padding: 52px 48px;
    display: flex; gap: 48px; align-items: center; flex-wrap: wrap;
    margin-top: 64px; border: 2px dashed rgba(90,127,212,0.25);
    position: relative; overflow: hidden;
  }
  .custom-mug-banner::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 80% 50%, rgba(90,127,212,0.04) 0%, transparent 70%);
    pointer-events: none;
  }
  .custom-mug-visual { font-size: 6rem; flex-shrink: 0; filter: drop-shadow(0 8px 16px rgba(90,127,212,0.2)); }
  .custom-mug-banner h3 { font-family: 'Libre Baskerville', serif; font-size: 1.7rem; color: #2a3060; margin-bottom: 10px; }
  .custom-mug-banner p { color: #5a5a7a; line-height: 1.7; margin-bottom: 20px; max-width: 460px; }
  .g-btn { display: inline-flex; align-items: center; padding: 13px 30px; border-radius: 50px; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 0.9rem; text-decoration: none; cursor: pointer; border: none; transition: all 0.2s; }
  .g-btn-blue { background: linear-gradient(135deg, #2a3060, #5a7fd4); color: white; box-shadow: 0 4px 16px rgba(90,127,212,0.3); }
  .g-btn-blue:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(90,127,212,0.4); }

  /* TOAST */
  .g-toast {
    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg, #2a3060, #5a7fd4);
    color: white; padding: 14px 28px; border-radius: 50px;
    font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 0.9rem;
    box-shadow: 0 8px 24px rgba(42,48,96,0.3); z-index: 9999;
    animation: toastIn 0.3s ease;
  }
  @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }

  @media(max-width:768px) {
    .mugs-hero, .g-section { padding: 48px 20px; }
    .custom-mug-banner { padding: 36px 24px; flex-direction: column; }
  }
`;

export default function MugsPage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  return (
    <>
      <style>{styles}</style>
      <Nav cartCount={2} />
      <div className="mugs-page">
        <Ribbon />
        <div className="mugs-hero">
          <div className="mugs-hero-inner">
            <div className="g-breadcrumb"><a href="/">Home</a> › Mugs &amp; Keepsakes</div>
            <h1>Mugs &amp; <em>Keepsakes</em> ☕</h1>
            <p>Beautiful mugs that hold warmth, memories, and the perfect cup</p>
          </div>
        </div>

        <div className="g-section">
          <div className="g-section-head">
            <span className="g-label">Curated Collection</span>
            <h2 className="g-title">Find Your Perfect Mug</h2>
          </div>

          <div className="mugs-grid">
            {mugs.map(m => (
              <div key={m.id} className="mc-card">
                <div className="mc-img-wrap">
                  {m.badge && (
                    <span className={`mc-badge${m.badge==="Custom"?" custom":m.badge==="Premium"?" premium":""}`}>
                      {m.badge}
                    </span>
                  )}
                  <button className="wishlist-btn" onClick={() => setWishlist(w => w.includes(m.id) ? w.filter(x=>x!==m.id) : [...w,m.id])}>
                    {wishlist.includes(m.id) ? "❤️" : "🤍"}
                  </button>
                  <div className="mc-img-main">
                    <Image src={m.img} alt={m.name} fill sizes="320px" style={{ objectFit:"cover" }} />
                  </div>
                  <div className="mc-img-overlay">
                    <div className="mc-img-overlay-inner">
                      <Image src={m.hoverImg} alt={m.name + " detail"} fill sizes="320px" style={{ objectFit:"cover" }} />
                    </div>
                  </div>
                </div>
                <div className="mc-info">
                  <div className="mc-specs">
                    <span className="mc-spec">{m.material}</span>
                    <span className="mc-spec">{m.capacity}</span>
                  </div>
                  <div className="mc-stars">
                    <span className="mc-stars-val">{"★".repeat(m.rating)}{"☆".repeat(5-m.rating)}</span>
                    <span className="mc-stars-count">({m.reviews})</span>
                  </div>
                  <div className="mc-name">{m.name}</div>
                  <div className="mc-desc">{m.desc}</div>
                  <div className="mc-footer">
                    <div className="mc-price">Rs. {m.price.toLocaleString()}</div>
                    <button className="mc-cart" onClick={() => showToast(`☕ Added to cart!`)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="custom-mug-banner">
            <div className="custom-mug-visual">☕</div>
            <div>
              <h3>Create a Personalised Mug ✍️</h3>
              <p>Upload a photo, add a name, or write a message — we&apos;ll print it on a beautiful mug and gift-wrap it for you.</p>
              <a href="#" className="g-btn g-btn-blue">Design Your Mug →</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}
