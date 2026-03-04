"use client";
import { useState } from "react";
import { Nav, Footer, Ribbon } from "../layout";

const chocolates = [
  { id:1, name:"Belgian Truffle Collection", price:3200, badge:"Bestseller", emoji:"🍫", desc:"24 handcrafted Belgian truffles in 6 flavours", weight:"300g", type:"Truffle", rating:5, reviews:84 },
  { id:2, name:"Dark Chocolate Tower", price:4100, badge:"", emoji:"🍬", desc:"Layered tower of premium dark assortments", weight:"450g", type:"Dark", rating:4, reviews:72 },
  { id:3, name:"Mini Truffle Box", price:1600, badge:"", emoji:"🍭", desc:"12 bite-sized truffles, perfect as a treat", weight:"150g", type:"Truffle", rating:4, reviews:58 },
  { id:4, name:"Milk Chocolate Heart Box", price:2400, badge:"Popular", emoji:"💕", desc:"Heart-shaped box filled with milk chocolates", weight:"250g", type:"Milk", rating:5, reviews:93 },
  { id:5, name:"White Chocolate Bliss", price:2800, badge:"New", emoji:"⬜", desc:"Creamy white chocolate with raspberry filling", weight:"200g", type:"White", rating:4, reviews:31 },
  { id:6, name:"Artisan Mixed Selection", price:3600, badge:"", emoji:"🎨", desc:"Handpainted chocolates, 18 pieces, all unique", weight:"280g", type:"Artisan", rating:5, reviews:47 },
  { id:7, name:"Nutty Praline Delight", price:2900, badge:"Popular", emoji:"🥜", desc:"Hazelnut & almond pralines in gift packaging", weight:"320g", type:"Praline", rating:5, reviews:112 },
  { id:8, name:"Sugar-Free Luxury Box", price:3400, badge:"Healthy", emoji:"💚", desc:"Indulge guilt-free — zero sugar, full flavour", weight:"260g", type:"Sugar-Free", rating:4, reviews:29 },
];

const types = ["All","Truffle","Dark","Milk","White","Artisan","Praline","Sugar-Free"];

const styles = `
  .choc-hero-bg {
    background: linear-gradient(135deg, #3d1a2e 0%, #7b3f8c 50%, #e8547a 100%);
    padding: 80px 48px; text-align: center; color: white; position: relative; overflow: hidden;
  }
  .choc-hero-bg::before {
    content: '🍫'; position: absolute; font-size: 200px; opacity: 0.04;
    top: -40px; right: -40px; transform: rotate(20deg);
  }
  .choc-hero-content { position: relative; z-index: 1; }
  .choc-hero-content .g-breadcrumb { justify-content: center; color: rgba(255,255,255,0.6); }
  .choc-hero-content .g-breadcrumb a { color: var(--rose-light); }
  .choc-hero-content h1 {
    font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem);
    color: white; margin-bottom: 14px; line-height: 1.1;
  }
  .choc-hero-content h1 em { font-style: italic; color: var(--rose-light); }
  .choc-hero-content p { color: rgba(255,255,255,0.8); max-width: 460px; margin: 0 auto 32px; line-height: 1.7; }
  .choc-badges { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-top: 8px; }
  .choc-badge {
    background: rgba(255,255,255,0.12); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2); color: white;
    padding: 8px 18px; border-radius: 50px; font-size: 0.82rem; font-weight: 700;
  }
  .type-filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 36px; }
  .type-btn {
    padding: 8px 20px; border-radius: 50px; border: 2px solid var(--border);
    background: white; font-family: var(--font-body); font-weight: 700;
    font-size: 0.82rem; cursor: pointer; transition: all 0.2s; color: var(--text-soft);
  }
  .type-btn.active { background: #3d1a2e; color: white; border-color: #3d1a2e; }
  .type-btn:hover:not(.active) { border-color: var(--rose); color: var(--rose); }
  .weight-tag {
    display: inline-block; background: var(--gold-light); color: var(--gold);
    font-size: 0.72rem; font-weight: 800; padding: 3px 10px; border-radius: 50px;
    margin-bottom: 8px;
  }
  .type-tag {
    display: inline-block; background: #3d1a2e; color: white;
    font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 50px;
    margin-bottom: 8px; margin-left: 6px;
  }
  .product-stars { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
  .product-stars small { font-size: 0.78rem; color: var(--text-muted); }
  .wishlist-btn {
    position: absolute; top: 14px; right: 14px; z-index: 2;
    background: white; border: none; border-radius: 50%;
    width: 32px; height: 32px; cursor: pointer; font-size: 1rem;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s;
  }
  .wishlist-btn:hover { transform: scale(1.15); }
  .choc-product-img { background: linear-gradient(135deg, #3d1a2e, #7b3f8c) !important; }
  .choc-product-img span:last-child { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3)); }
  .pairing-section {
    background: linear-gradient(135deg, #3d1a2e, #5a2a4a);
    border-radius: 24px; padding: 48px; color: white; margin-top: 80px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
  }
  @media(max-width:768px){ .pairing-section { grid-template-columns: 1fr; } }
  .pairing-section h2 { font-family: var(--font-display); font-size: 2rem; margin-bottom: 12px; }
  .pairing-section p { color: rgba(255,255,255,0.75); line-height: 1.7; margin-bottom: 24px; }
  .pairing-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .pairing-list li { display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.85); font-size: 0.9rem; }
  .pairing-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .pairing-item {
    background: rgba(255,255,255,0.08); border-radius: 16px; padding: 20px;
    text-align: center; font-size: 2.5rem;
  }
  .pairing-item p { font-size: 0.78rem; color: rgba(255,255,255,0.6); margin-top: 6px; }
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
      <div className="g-page">
        <Ribbon />

        <div className="choc-hero-bg">
          <div className="choc-hero-content">
            <div className="g-breadcrumb"><a href="/">Home</a> › Chocolates</div>
            <h1>Pure <em>Chocolate</em> Bliss</h1>
            <p>Handcrafted by artisan chocolatiers — every piece is a moment of joy</p>
            <div className="choc-badges">
              {["🌿 Natural Ingredients","✋ Handcrafted","🏆 Award-Winning","❄️ Fresh Daily"].map(b => (
                <span key={b} className="choc-badge">{b}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="g-section">
          <div className="g-section-head">
            <span className="g-label">Browse by Type</span>
            <h2 className="g-title">Our Chocolate Range</h2>
          </div>

          <div className="type-filters">
            {types.map(t => (
              <button key={t} className={`type-btn${activeType===t?" active":""}`} onClick={() => setActiveType(t)}>{t}</button>
            ))}
          </div>

          <div className="g-products-grid">
            {filtered.map(c => (
              <div key={c.id} className="g-product-card">
                <div className="g-product-img choc-product-img">
                  {c.badge && <span className="g-product-badge">{c.badge}</span>}
                  <button className="wishlist-btn" onClick={() => setWishlist(w => w.includes(c.id) ? w.filter(x=>x!==c.id) : [...w,c.id])}>
                    {wishlist.includes(c.id) ? "❤️" : "🤍"}
                  </button>
                  <span>{c.emoji}</span>
                </div>
                <div className="g-product-info">
                  <div>
                    <span className="weight-tag">⚖️ {c.weight}</span>
                    <span className="type-tag">{c.type}</span>
                  </div>
                  <div className="product-stars">
                    <span className="g-stars">{"★".repeat(c.rating)}</span>
                    <small>({c.reviews})</small>
                  </div>
                  <div className="g-product-name">{c.name}</div>
                  <div className="g-product-desc">{c.desc}</div>
                  <div className="g-product-footer">
                    <div className="g-product-price">Rs. {c.price.toLocaleString()}</div>
                    <button className="g-add-cart" onClick={() => showToast(`${c.emoji} Added to cart!`)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
        </div>
      </div>
      <Footer />
      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}
