"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Nav from "@/src/components/nav";
import Ribbon from "@/src/components/ribbon";
import Footer from "@/src/components/footer";

const chocolates = [
  { id:1, name:"Belgian Truffle Collection", price:3200, badge:"Bestseller", img:"/images/gifts/choco1.webp", hoverImg:"/images/gifts/black_box.jpg", desc:"24 handcrafted Belgian truffles in 6 flavours", weight:"300g", type:"Truffle", rating:5, reviews:84 },
  { id:2, name:"Dark Chocolate Tower", price:4100, badge:"", img:"/images/gifts/choco1.webp", hoverImg:"/images/gifts/mensgift1.webp", desc:"Layered tower of premium dark assortments", weight:"450g", type:"Dark", rating:4, reviews:72 },
  { id:3, name:"Mini Truffle Box", price:1600, badge:"", img:"/images/gifts/choco1.webp", hoverImg:"/images/gifts/boxwithflower1.jpg", desc:"12 bite-sized truffles, perfect as a treat", weight:"150g", type:"Truffle", rating:4, reviews:58 },
  { id:4, name:"Milk Chocolate Heart Box", price:2400, badge:"Popular", img:"/images/gifts/choco1.webp", hoverImg:"/images/gifts/wallet1.webp", desc:"Heart-shaped box filled with milk chocolates", weight:"250g", type:"Milk", rating:5, reviews:93 },
  { id:5, name:"White Chocolate Bliss", price:2800, badge:"New", img:"/images/gifts/choco1.webp", hoverImg:"/images/gifts/photoframe1.webp", desc:"Creamy white chocolate with raspberry filling", weight:"200g", type:"White", rating:4, reviews:31 },
  { id:6, name:"Artisan Mixed Selection", price:3600, badge:"", img:"/images/gifts/choco1.webp", hoverImg:"/images/gifts/teddy1.webp", desc:"Handpainted chocolates, 18 pieces, all unique", weight:"280g", type:"Artisan", rating:5, reviews:47 },
  { id:7, name:"Nutty Praline Delight", price:2900, badge:"Popular", img:"/images/gifts/choco1.webp", hoverImg:"/images/gifts/choco1.webp", desc:"Hazelnut & almond pralines in gift packaging", weight:"320g", type:"Praline", rating:5, reviews:112 },
  { id:8, name:"Sugar-Free Luxury Box", price:3400, badge:"Healthy", img:"/images/gifts/choco1.webp", hoverImg:"/images/gifts/black_box.jpg", desc:"Indulge guilt-free — zero sugar, full flavour", weight:"260g", type:"Sugar-Free", rating:4, reviews:29 },
];

const types = ["All","Truffle","Dark","Milk","White","Artisan","Praline","Sugar-Free"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&family=Mulish:wght@300;400;500;600&display=swap');

  .choc-page { font-family: 'Mulish', sans-serif; background: #1a0d0d; }

  .choc-hero {
    background: linear-gradient(135deg, #1a0d0d 0%, #3d1a2e 40%, #5a2030 100%);
    padding: 80px 48px 64px; position: relative; overflow: hidden;
  }
  .choc-hero::before {
    content: '🍫'; position: absolute; right: 40px; top: 50%;
    transform: translateY(-50%) rotate(15deg); font-size: 220px; opacity: 0.05; pointer-events: none;
  }
  .choc-hero-inner { max-width: 1280px; margin: 0 auto; }
  .g-breadcrumb { display: flex; gap: 6px; align-items: center; font-size: 0.82rem; color: rgba(255,200,160,0.5); margin-bottom: 14px; }
  .g-breadcrumb a { color: #d4956a; text-decoration: none; }
  .choc-hero h1 { font-family: 'Bodoni Moda', serif; font-size: clamp(2.6rem, 5vw, 4.2rem); color: white; margin-bottom: 14px; line-height: 1.1; }
  .choc-hero h1 em { font-style: italic; color: #d4956a; }
  .choc-hero p { color: rgba(255,255,255,0.65); font-size: 1rem; max-width: 480px; line-height: 1.7; margin-bottom: 28px; }
  .choc-badges { display: flex; gap: 12px; flex-wrap: wrap; }
  .choc-badge { background: rgba(255,255,255,0.07); backdrop-filter: blur(8px); border: 1px solid rgba(212,149,106,0.2); color: rgba(255,255,255,0.75); padding: 8px 18px; border-radius: 50px; font-size: 0.82rem; font-weight: 600; }

  .choc-section { padding: 64px 48px; max-width: 1280px; margin: 0 auto; }
  .choc-section-head { margin-bottom: 40px; }
  .g-label { display: block; color: #d4956a; font-size: 0.78rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
  .choc-title { font-family: 'Bodoni Moda', serif; font-size: clamp(1.8rem, 3vw, 2.4rem); color: white; margin-bottom: 6px; }

  .type-filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 40px; }
  .type-btn { padding: 8px 20px; border-radius: 50px; border: 1.5px solid rgba(212,149,106,0.2); background: rgba(255,255,255,0.04); font-family: 'Mulish', sans-serif; font-weight: 600; font-size: 0.82rem; cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.6); }
  .type-btn:hover { border-color: #d4956a; color: #d4956a; }
  .type-btn.active { background: linear-gradient(135deg, #d4956a, #8a4020); color: white; border-color: transparent; box-shadow: 0 4px 16px rgba(212,149,106,0.3); }

  .choc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 24px; }

  .cc-card { background: linear-gradient(135deg, #2a1010, #3d1a2e); border-radius: 20px; overflow: hidden; border: 1px solid rgba(212,149,106,0.12); box-shadow: 0 8px 32px rgba(0,0,0,0.3); transition: transform 0.3s, box-shadow 0.3s; position: relative; }
  .cc-card:hover { transform: translateY(-8px); box-shadow: 0 24px 56px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,149,106,0.2); }
  .cc-img-wrap { position: relative; height: 220px; overflow: hidden; background: linear-gradient(135deg, #2a1010, #4a2020); }
  .cc-img-main { position: absolute; inset: 0; transition: transform 0.6s ease; }
  .cc-card:hover .cc-img-main { transform: scale(1.08); }
  .cc-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.12) 50%, transparent 75%); transform: translateX(-120%); transition: transform 0.7s ease; pointer-events: none; z-index: 2; }
  .cc-card:hover .cc-img-wrap::after { transform: translateX(120%); }
  .cc-img-alt { position: absolute; bottom: 0; left: 0; right: 0; height: 0; overflow: hidden; transition: height 0.4s ease; z-index: 1; }
  .cc-card:hover .cc-img-alt { height: 45%; }
  .cc-img-alt-inner { position: absolute; bottom: 0; left: 0; right: 0; height: 220px; }
  .cc-badge { position: absolute; top: 12px; left: 12px; z-index: 3; padding: 5px 14px; border-radius: 50px; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.5px; color: #1a0d0d; background: linear-gradient(135deg, #d4956a, #f0b870); text-transform: uppercase; }
  .wishlist-btn { position: absolute; top: 12px; right: 12px; z-index: 3; background: rgba(255,255,255,0.12); backdrop-filter: blur(8px); border: none; border-radius: 50%; width: 34px; height: 34px; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; transition: transform 0.2s, background 0.2s; }
  .wishlist-btn:hover { transform: scale(1.2); background: rgba(255,255,255,0.2); }
  .cc-info { padding: 18px 20px 22px; }
  .cc-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
  .cc-weight { background: rgba(212,149,106,0.15); color: #d4956a; font-size: 0.7rem; font-weight: 700; padding: 3px 10px; border-radius: 50px; }
  .cc-type { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.6); font-size: 0.7rem; font-weight: 600; padding: 3px 10px; border-radius: 50px; }
  .cc-stars { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; }
  .cc-stars-val { color: #f5c842; font-size: 0.85rem; }
  .cc-stars-count { font-size: 0.75rem; color: rgba(255,255,255,0.35); }
  .cc-name { font-family: 'Bodoni Moda', serif; font-size: 1.05rem; color: white; margin-bottom: 4px; font-weight: 700; }
  .cc-desc { font-size: 0.8rem; color: rgba(255,255,255,0.5); margin-bottom: 16px; line-height: 1.5; }
  .cc-footer { display: flex; align-items: center; justify-content: space-between; }
  .cc-price { font-family: 'Bodoni Moda', serif; font-weight: 700; font-size: 1.15rem; color: #d4956a; }
  .cc-cart { background: linear-gradient(135deg, #d4956a, #8a4020); color: white; border: none; padding: 9px 18px; border-radius: 50px; font-family: 'Mulish', sans-serif; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
  .cc-cart:hover { transform: scale(1.05); box-shadow: 0 4px 14px rgba(212,149,106,0.4); }

  .pairing-section { background: linear-gradient(135deg, #0d0505, #2a1010); border-radius: 24px; padding: 52px 48px; color: white; margin-top: 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; border: 1px solid rgba(212,149,106,0.1); }
  @media(max-width:768px){ .pairing-section { grid-template-columns: 1fr; } }
  .pairing-section h2 { font-family: 'Bodoni Moda', serif; font-size: 2rem; margin-bottom: 12px; color: white; }
  .pairing-section p { color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 24px; font-size: 0.95rem; }
  .pairing-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .pairing-list li { color: rgba(255,255,255,0.75); font-size: 0.9rem; }
  .pairing-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .pairing-item { background: rgba(255,255,255,0.05); border: 1px solid rgba(212,149,106,0.1); border-radius: 16px; padding: 20px; text-align: center; font-size: 2.5rem; transition: background 0.2s; }
  .pairing-item:hover { background: rgba(212,149,106,0.08); }
  .pairing-item p { font-size: 0.78rem; color: rgba(255,255,255,0.5); margin-top: 6px; }

  /* ══ PERSONALIZE BANNER — matches explore-gifts style ══ */
  .choc-custom-banner {
    background: linear-gradient(135deg, #d4956a 0%, #8a4020 50%, #3d1a2e 100%);
    border-radius: 24px; padding: 44px 48px;
    display: flex; align-items: center; justify-content: space-between; gap: 28px;
    color: white; margin-top: 64px; flex-wrap: wrap;
    position: relative; overflow: hidden;
  }
  .choc-custom-banner::before {
    content: '🍫';
    position: absolute; right: 220px; top: 50%; transform: translateY(-50%);
    font-size: 130px; opacity: 0.07; pointer-events: none;
  }
  .choc-custom-banner::after {
    content: '✨';
    position: absolute; left: 40%; top: -20px;
    font-size: 80px; opacity: 0.05; pointer-events: none;
  }
  .ccb-left { flex: 1; min-width: 260px; }
  .ccb-eyebrow {
    display: inline-block; background: rgba(255,255,255,0.15);
    color: white; font-size: 0.7rem; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    padding: 4px 14px; border-radius: 50px; margin-bottom: 12px;
    border: 1px solid rgba(255,255,255,0.2);
  }
  .ccb-title { font-family: 'Bodoni Moda', serif; font-size: clamp(1.4rem, 2.5vw, 1.9rem); margin-bottom: 8px; line-height: 1.2; }
  .ccb-title em { font-style: italic; color: rgba(255,255,255,0.85); }
  .ccb-desc { opacity: 0.82; font-size: 0.92rem; line-height: 1.65; max-width: 480px; }
  .ccb-btn {
    display: inline-flex; align-items: center; gap: 10px;
    background: white; color: #5a2010;
    padding: 15px 32px; border-radius: 50px;
    font-family: 'Mulish', sans-serif; font-weight: 800; font-size: 0.92rem;
    text-decoration: none; white-space: nowrap; flex-shrink: 0;
    box-shadow: 0 8px 24px rgba(0,0,0,0.18);
    transition: all 0.25s;
  }
  .ccb-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 14px 36px rgba(0,0,0,0.28); }
  .ccb-btn-arrow {
    width: 26px; height: 26px; border-radius: 50%;
    background: rgba(90,32,16,0.12); display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem; transition: transform 0.2s;
  }
  .ccb-btn:hover .ccb-btn-arrow { transform: translateX(4px); }

  /* TOAST */
  .g-toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #1a0d0d, #d4956a); color: white; padding: 14px 28px; border-radius: 50px; font-family: 'Mulish', sans-serif; font-weight: 600; font-size: 0.9rem; box-shadow: 0 8px 24px rgba(0,0,0,0.4); z-index: 9999; animation: toastIn 0.3s ease; }
  @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }

  @media(max-width:768px) {
    .choc-hero, .choc-section { padding: 48px 20px; }
    .pairing-section { padding: 36px 24px; }
    .choc-custom-banner { padding: 36px 24px; flex-direction: column; }
    .choc-custom-banner::before { display: none; }
  }
`;

export default function ChocolatesPage() {
  const [activeType, setActiveType] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };
  const filtered = activeType === "All" ? chocolates : chocolates.filter(c => c.type === activeType);

  return (
    <>
      <style>{styles}</style>
      <Nav cartCount={2} />
      <div className="choc-page">
        <Ribbon />

        <div className="choc-hero">
          <div className="choc-hero-inner">
            <div className="g-breadcrumb"><a href="/">Home</a> › Chocolates</div>
            <h1>Pure <em>Chocolate</em> Bliss 🍫</h1>
            <p>Handcrafted by artisan chocolatiers — every piece is a moment of joy</p>
            <div className="choc-badges">
              {["🌿 Natural Ingredients","✋ Handcrafted","🏆 Award-Winning","❄️ Fresh Daily"].map(b => (
                <span key={b} className="choc-badge">{b}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="choc-section">
          <div className="choc-section-head">
            <span className="g-label">Browse by Type</span>
            <h2 className="choc-title">Our Chocolate Range</h2>
          </div>

          <div className="type-filters">
            {types.map(t => (
              <button key={t} className={`type-btn${activeType===t?" active":""}`} onClick={() => setActiveType(t)}>{t}</button>
            ))}
          </div>

          <div className="choc-grid">
            {filtered.map(c => (
              <div key={c.id} className="cc-card">
                <div className="cc-img-wrap">
                  {c.badge && <span className="cc-badge">{c.badge}</span>}
                  <button className="wishlist-btn" onClick={() => setWishlist(w => w.includes(c.id) ? w.filter(x=>x!==c.id) : [...w,c.id])}>
                    {wishlist.includes(c.id) ? "❤️" : "🤍"}
                  </button>
                  <div className="cc-img-main">
                    <Image src={c.img} alt={c.name} fill sizes="300px" style={{ objectFit:"cover" }} />
                  </div>
                  <div className="cc-img-alt">
                    <div className="cc-img-alt-inner">
                      <Image src={c.hoverImg} alt={c.name + " alt"} fill sizes="300px" style={{ objectFit:"cover" }} />
                    </div>
                  </div>
                </div>
                <div className="cc-info">
                  <div className="cc-tags">
                    <span className="cc-weight">⚖️ {c.weight}</span>
                    <span className="cc-type">{c.type}</span>
                  </div>
                  <div className="cc-stars">
                    <span className="cc-stars-val">{"★".repeat(c.rating)}{"☆".repeat(5-c.rating)}</span>
                    <span className="cc-stars-count">({c.reviews})</span>
                  </div>
                  <div className="cc-name">{c.name}</div>
                  <div className="cc-desc">{c.desc}</div>
                  <div className="cc-footer">
                    <div className="cc-price">Rs. {c.price.toLocaleString()}</div>
                    <button className="cc-cart" onClick={() => showToast(`🍫 Added to cart!`)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PAIRING */}
          <div className="pairing-section">
            <div>
              <h2>Perfect Pairings 🍷</h2>
              <p>Our chocolatiers recommend pairing these fine chocolates with wine, tea, or coffee for the ultimate indulgence.</p>
              <ul className="pairing-list">
                <li>🍷 Dark Chocolate + Red Wine</li>
                <li>🍵 Milk Chocolate + Chai Tea</li>
                <li>☕ White Chocolate + Espresso</li>
                <li>🫐 Truffles + Sparkling Wine</li>
              </ul>
            </div>
            <div className="pairing-visual">
              {[["🍫","Dark"],["🍬","Truffle"],["🥛","Milk"],["⬜","White"]].map(([icon,label]) => (
                <div key={label} className="pairing-item">{icon}<p>{label}</p></div>
              ))}
            </div>
          </div>

          {/* ══ REQUEST CUSTOM CHOCOLATE BOX BANNER ══ */}
          <div className="choc-custom-banner">
            <div className="ccb-left">
              <span className="ccb-eyebrow">✦ Bespoke Service</span>
              <h3 className="ccb-title">
                Want a <em>custom chocolate box</em><br />made just for you? 🍫
              </h3>
              <p className="ccb-desc">
                Tell us your flavours, packaging &amp; budget — our artisan chocolatiers
                will handcraft a one-of-a-kind box exclusively for you or your loved ones.
              </p>
            </div>
            <Link href="/chocolates/custom-gifts" className="ccb-btn">
              Request Custom Chocolate Box
              <span className="ccb-btn-arrow">→</span>
            </Link>
          </div>

        </div>
      </div>
      <Footer />
      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}