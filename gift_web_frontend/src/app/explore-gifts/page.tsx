"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Nav from "@/src/components/nav";
import Ribbon from "@/src/components/ribbon";
import Footer from "@/src/components/footer";

const allGifts = [
  { id:1, name:"Luxury Pink Gift Box", price:4500, category:"Gift Boxes", badge:"Bestseller", img:"/images/gifts/boxwithflower1.jpg", hoverImg:"/images/gifts/black_box.jpg", desc:"Satin-lined with chocolates & candle", rating:5, reviews:128, mood:"romantic" },
  { id:2, name:"Belgian Truffle Set", price:3200, category:"Chocolates", badge:"Popular", img:"/images/gifts/choco1.webp", hoverImg:"/images/gifts/mensgift1.webp", desc:"24 handcrafted Belgian truffles", rating:5, reviews:84, mood:"sweet" },
  { id:3, name:"Giant Teddy Bear XL", price:4500, category:"Teddies", badge:"", img:"/images/gifts/teddy1.webp", hoverImg:"/images/gifts/wallet1.webp", desc:"1.2m ultra-soft plush teddy", rating:5, reviews:113, mood:"fun" },
  { id:4, name:"Premium Love Anniversary Box", price:5500, category:"Gift Boxes", badge:"Limited", img:"/images/gifts/black_box.jpg", hoverImg:"/images/gifts/boxwithflower1.jpg", desc:"Rose petals, truffles & memory journal", rating:5, reviews:201, mood:"romantic" },
  { id:5, name:"Floral Tea Gift Set", price:3300, category:"Mugs", badge:"New", img:"/images/gifts/lovemug.webp", hoverImg:"/images/gifts/photoframe1.webp", desc:"4 artisan teas + 2 floral cups", rating:4, reviews:41, mood:"cozy" },
  { id:6, name:"Rose Gold Candle Trio", price:2200, category:"Candles", badge:"", img:"/images/gifts/photoframe1.webp", hoverImg:"/images/gifts/lovemug.webp", desc:"3 soy wax candles, luxury scents", rating:5, reviews:33, mood:"cozy" },
  { id:7, name:"Milk Chocolate Heart Box", price:2400, category:"Chocolates", badge:"Popular", img:"/images/gifts/choco1.webp", hoverImg:"/images/gifts/boxwithflower1.jpg", desc:"Heart-box filled with milk chocolates", rating:5, reviews:93, mood:"sweet" },
  { id:8, name:"Personalised Photo Mug", price:1800, category:"Mugs", badge:"Custom", img:"/images/gifts/lovemug.webp", hoverImg:"/images/gifts/photoframe1.webp", desc:"Upload your photo, printed in 48hr", rating:4, reviews:167, mood:"personal" },
  { id:9, name:"Birthday Surprise Mega Box", price:3800, category:"Gift Boxes", badge:"Popular", img:"/images/gifts/boxwithflower1.jpg", hoverImg:"/images/gifts/choco1.webp", desc:"Personalised name, 3 chocolates & balloon", rating:5, reviews:156, mood:"fun" },
  { id:10, name:"Artisan Jewellery Box", price:4800, category:"Keepsakes", badge:"Premium", img:"/images/gifts/black_box.jpg", hoverImg:"/images/gifts/wallet1.webp", desc:"Velvet-lined box with gold keepsake inside", rating:5, reviews:52, mood:"romantic" },
  { id:11, name:"Spa & Relaxation Set", price:3600, category:"Wellness", badge:"New", img:"/images/gifts/photoframe1.webp", hoverImg:"/images/gifts/lovemug.webp", desc:"Bath salts, face mask & luxury towel", rating:4, reviews:29, mood:"cozy" },
  { id:12, name:"Nutty Praline Delight", price:2900, category:"Chocolates", badge:"", img:"/images/gifts/choco1.webp", hoverImg:"/images/gifts/mensgift1.webp", desc:"Hazelnut & almond pralines in gift pack", rating:5, reviews:112, mood:"sweet" },
];

const moods = [
  { key:"all", label:"🎉 All Gifts", desc:"Browse everything" },
  { key:"romantic", label:"💕 Romantic", desc:"For that special someone" },
  { key:"sweet", label:"🍭 Sweet Treats", desc:"Chocolate & confections" },
  { key:"fun", label:"🎈 Fun & Playful", desc:"Bring on the smiles" },
  { key:"cozy", label:"🕯️ Cozy & Calm", desc:"Warmth and comfort" },
  { key:"personal", label:"✍️ Personal", desc:"Custom & unique" },
];

const priceRanges = ["All Prices","Under Rs. 2,000","Rs. 2,000–4,000","Rs. 4,000–6,000","Over Rs. 6,000"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,600;1,400&family=Manrope:wght@300;400;500;600&display=swap');

  .explore-page { font-family: 'Manrope', sans-serif; background: #f8f7ff; }

  /* HERO */
  .explore-hero-section {
    background: linear-gradient(135deg, #f0eeff 0%, #fde8ef 40%, #fff8e0 100%);
    padding: 72px 48px 56px; position: relative; overflow: hidden;
  }
  .explore-floating { position: absolute; font-size: 80px; opacity: 0.05; user-select: none; pointer-events: none; }
  .explore-hero-inner { max-width: 1280px; margin: 0 auto; }
  .g-breadcrumb { display: flex; gap: 6px; align-items: center; font-size: 0.82rem; color: #8080a8; margin-bottom: 14px; }
  .g-breadcrumb a { color: #7060d4; text-decoration: none; }
  .explore-hero-section h1 {
    font-family: 'Bitter', serif; font-size: clamp(2.4rem, 5vw, 3.8rem);
    color: #2a2060; margin-bottom: 12px; line-height: 1.1;
  }
  .explore-hero-section h1 em { font-style: italic; color: #7060d4; }
  .explore-hero-section p { color: #5a5880; font-size: 1rem; max-width: 480px; line-height: 1.7; }

  .g-section { padding: 64px 48px; max-width: 1280px; margin: 0 auto; }
  .g-section-head { margin-bottom: 32px; }
  .g-label { display: block; color: #7060d4; font-size: 0.78rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
  .g-title { font-family: 'Bitter', serif; font-size: clamp(1.8rem, 3vw, 2.4rem); color: #2a2060; margin-bottom: 6px; }

  /* MOOD GRID */
  .mood-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px; margin-bottom: 40px;
  }
  .mood-btn {
    background: white; border: 1.5px solid rgba(112,96,212,0.15);
    border-radius: 18px; padding: 18px 14px; text-align: center;
    cursor: pointer; transition: all 0.25s; font-family: 'Manrope', sans-serif;
    box-shadow: 0 2px 8px rgba(42,32,96,0.06);
  }
  .mood-btn:hover {
    border-color: #7060d4; transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(112,96,212,0.15);
  }
  .mood-btn.active {
    background: linear-gradient(135deg, #f0eeff, #fde8ef);
    border-color: #7060d4;
    box-shadow: 0 8px 24px rgba(112,96,212,0.2);
  }
  .mood-btn-label { font-weight: 700; font-size: 0.88rem; color: #2a2060; display: block; margin-bottom: 2px; }
  .mood-btn-desc { font-size: 0.73rem; color: #8080a8; }

  /* CONTROLS */
  .explore-controls { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; margin-bottom: 32px; }
  .explore-select {
    padding: 9px 18px; border-radius: 50px;
    border: 1.5px solid rgba(112,96,212,0.2);
    font-family: 'Manrope', sans-serif; font-size: 0.88rem; color: #2a2060;
    background: white; cursor: pointer; outline: none;
  }
  .explore-results { color: #8080a8; font-size: 0.88rem; }
  .explore-results strong { color: #7060d4; }

  /* GRID */
  .explore-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
    gap: 24px;
  }

  /* CARD — magnetic lift + diagonal image reveal */
  .ec-card {
    background: white; border-radius: 22px; overflow: hidden;
    box-shadow: 0 4px 20px rgba(42,32,96,0.08);
    border: 1px solid rgba(112,96,212,0.08);
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
    position: relative;
  }
  .ec-card:hover {
    transform: translateY(-10px) scale(1.01);
    box-shadow: 0 24px 56px rgba(112,96,212,0.18);
  }

  .ec-img-wrap { position: relative; height: 220px; overflow: hidden; background: linear-gradient(135deg, #f0eeff, #fde8ef); }
  .ec-img-main { position: absolute; inset: 0; transition: transform 0.5s ease; }
  .ec-card:hover .ec-img-main { transform: scale(1.05); }

  /* diagonal reveal */
  .ec-img-hover {
    position: absolute; inset: 0; opacity: 0;
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
    transition: clip-path 0.5s ease, opacity 0.3s ease;
  }
  .ec-card:hover .ec-img-hover {
    opacity: 1;
    clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
  }

  .ec-badge {
    position: absolute; top: 12px; left: 12px; z-index: 3;
    padding: 5px 14px; border-radius: 50px;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.5px;
    color: white; text-transform: uppercase;
    background: linear-gradient(135deg, #7060d4, #4040a0);
  }
  .wishlist-btn {
    position: absolute; top: 12px; right: 12px; z-index: 3;
    background: white; border: none; border-radius: 50%;
    width: 34px; height: 34px; cursor: pointer; font-size: 1rem;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: transform 0.2s;
  }
  .wishlist-btn:hover { transform: scale(1.2); }

  .ec-info { padding: 18px 20px 22px; }
  .ec-cat {
    display: inline-block; background: rgba(112,96,212,0.08); color: #6050b8;
    font-size: 0.7rem; font-weight: 700; padding: 3px 12px; border-radius: 50px; margin-bottom: 8px;
  }
  .ec-stars { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; }
  .ec-stars-val { color: #f5c842; font-size: 0.85rem; }
  .ec-stars-count { font-size: 0.75rem; color: #a0a0c0; }
  .ec-name { font-family: 'Bitter', serif; font-size: 1.05rem; color: #2a2060; margin-bottom: 4px; font-weight: 600; }
  .ec-desc { font-size: 0.8rem; color: #5a5880; margin-bottom: 14px; line-height: 1.5; }
  .ec-footer { display: flex; align-items: center; justify-content: space-between; }
  .ec-price { font-family: 'Bitter', serif; font-weight: 700; font-size: 1.15rem; color: #7060d4; }
  .ec-cart {
    background: linear-gradient(135deg, #7060d4, #4040a0);
    color: white; border: none; padding: 9px 18px; border-radius: 50px;
    font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 0.8rem;
    cursor: pointer; transition: all 0.2s;
  }
  .ec-cart:hover { transform: scale(1.05); box-shadow: 0 4px 14px rgba(112,96,212,0.35); }

  /* EMPTY */
  .g-empty { text-align: center; padding: 80px 40px; }
  .g-empty-icon { font-size: 4rem; display: block; margin-bottom: 16px; }
  .g-empty h3 { font-family: 'Bitter', serif; font-size: 1.8rem; color: #7060d4; margin-bottom: 8px; }
  .g-empty p { color: #5a5880; margin-bottom: 24px; }
  .g-btn { display: inline-flex; align-items: center; padding: 12px 28px; border-radius: 50px; font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 0.9rem; text-decoration: none; cursor: pointer; border: none; transition: all 0.2s; }
  .g-btn-purple { background: linear-gradient(135deg, #7060d4, #4040a0); color: white; box-shadow: 0 4px 16px rgba(112,96,212,0.3); }
  .g-btn-purple:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(112,96,212,0.4); }

  /* PERSONALIZE BANNER */
  .personalize-banner {
    background: linear-gradient(135deg, #7060d4, #e8547a);
    border-radius: 24px; padding: 40px 48px;
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
    color: white; margin-top: 64px; flex-wrap: wrap;
    position: relative; overflow: hidden;
  }
  .personalize-banner::before {
    content: '✨'; position: absolute; right: 180px; top: 50%;
    transform: translateY(-50%); font-size: 120px; opacity: 0.06; pointer-events: none;
  }
  .personalize-banner h3 { font-family: 'Bitter', serif; font-size: 1.5rem; margin-bottom: 6px; }
  .personalize-banner p { opacity: 0.85; font-size: 0.92rem; }
  .g-btn-white { background: white; color: #7060d4; box-shadow: 0 4px 16px rgba(0,0,0,0.12); white-space: nowrap; }
  .g-btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.18); }

  /* TOAST */
  .g-toast {
    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg, #7060d4, #e8547a);
    color: white; padding: 14px 28px; border-radius: 50px;
    font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 0.9rem;
    box-shadow: 0 8px 24px rgba(112,96,212,0.3); z-index: 9999;
    animation: toastIn 0.3s ease;
  }
  @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }

  @media(max-width:768px) {
    .explore-hero-section, .g-section { padding: 48px 20px; }
    .personalize-banner { padding: 32px 24px; flex-direction: column; }
  }
`;

export default function ExploreGiftsPage() {
  const [activeMood, setActiveMood] = useState("all");
  const [priceRange, setPriceRange] = useState("All Prices");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  let filtered = activeMood === "all" ? allGifts : allGifts.filter(g => g.mood === activeMood);
  if (priceRange === "Under Rs. 2,000") filtered = filtered.filter(g => g.price < 2000);
  else if (priceRange === "Rs. 2,000–4,000") filtered = filtered.filter(g => g.price >= 2000 && g.price <= 4000);
  else if (priceRange === "Rs. 4,000–6,000") filtered = filtered.filter(g => g.price >= 4000 && g.price <= 6000);
  else if (priceRange === "Over Rs. 6,000") filtered = filtered.filter(g => g.price > 6000);

  return (
    <>
      <style>{styles}</style>
      <Nav cartCount={2} />
      <div className="explore-page">
        <Ribbon />

        <div className="explore-hero-section">
          <span className="explore-floating" style={{ top: 20, left: "5%" }}>✨</span>
          <span className="explore-floating" style={{ bottom: 10, right: "8%" }}>🎁</span>
          <span className="explore-floating" style={{ top: "40%", right: "3%" }}>💕</span>
          <div className="explore-hero-inner">
            <div className="g-breadcrumb"><a href="/">Home</a> › Explore Gifts</div>
            <h1>Explore All <em>Gifts</em> ✨</h1>
            <p>Discover the perfect gift by mood, occasion, or budget — we have something for everyone</p>
          </div>
        </div>

        <div className="g-section">
          <div className="g-section-head">
            <span className="g-label">Shop by Mood</span>
            <h2 className="g-title">What are you gifting for?</h2>
          </div>

          <div className="mood-grid">
            {moods.map(m => (
              <button key={m.key} className={`mood-btn${activeMood===m.key?" active":""}`} onClick={() => setActiveMood(m.key)}>
                <span className="mood-btn-label">{m.label}</span>
                <span className="mood-btn-desc">{m.desc}</span>
              </button>
            ))}
          </div>

          <div className="explore-controls">
            <select className="explore-select" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
              {priceRanges.map(p => <option key={p}>{p}</option>)}
            </select>
            <span className="explore-results">Showing <strong>{filtered.length}</strong> gifts</span>
          </div>

          {filtered.length === 0 ? (
            <div className="g-empty">
              <span className="g-empty-icon">🔍</span>
              <h3>No gifts found</h3>
              <p>Try a different mood or price range</p>
              <button className="g-btn g-btn-purple" onClick={() => { setActiveMood("all"); setPriceRange("All Prices"); }}>Reset Filters</button>
            </div>
          ) : (
            <div className="explore-grid">
              {filtered.map(g => (
                <div key={g.id} className="ec-card">
                  <div className="ec-img-wrap">
                    {g.badge && <span className="ec-badge">{g.badge}</span>}
                    <button className="wishlist-btn" onClick={() => setWishlist(w => w.includes(g.id) ? w.filter(x=>x!==g.id) : [...w,g.id])}>
                      {wishlist.includes(g.id) ? "❤️" : "🤍"}
                    </button>
                    <div className="ec-img-main">
                      <Image src={g.img} alt={g.name} fill sizes="300px" style={{ objectFit:"cover" }} />
                    </div>
                    <div className="ec-img-hover">
                      <Image src={g.hoverImg} alt={g.name + " alt"} fill sizes="300px" style={{ objectFit:"cover" }} />
                    </div>
                  </div>
                  <div className="ec-info">
                    <span className="ec-cat">{g.category}</span>
                    <div className="ec-stars">
                      <span className="ec-stars-val">{"★".repeat(g.rating)}{"☆".repeat(5-g.rating)}</span>
                      <span className="ec-stars-count">({g.reviews})</span>
                    </div>
                    <div className="ec-name">{g.name}</div>
                    <div className="ec-desc">{g.desc}</div>
                    <div className="ec-footer">
                      <div className="ec-price">Rs. {g.price.toLocaleString()}</div>
                      <button className="ec-cart" onClick={() => showToast(`✨ Added to cart!`)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="personalize-banner">
            <div>
              <h3>Can&apos;t find the right gift? ✍️</h3>
              <p>We&apos;ll create a personalised gift box tailored to your person&apos;s interests and your budget.</p>
            </div>
            <a href="/explore-gifts/custom-allgift" className="g-btn g-btn-white">Request Custom Gift</a>
          </div>
        </div>
      </div>
      <Footer />
      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}
