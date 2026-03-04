"use client";
import { useState } from "react";
import { Nav, Footer, Ribbon } from "../layout";

const mugs = [
  { id:1, name:"Romantic Mug Duo", price:2800, badge:"Popular", emoji:"☕", desc:"Matching 'You & Me' porcelain mugs for couples", material:"Porcelain", capacity:"350ml", rating:4, reviews:62 },
  { id:2, name:"Floral Tea Gift Set", price:3300, badge:"New", emoji:"🌸", desc:"4 artisan teas + 2 floral hand-painted cups", material:"Ceramic", capacity:"280ml", rating:4, reviews:41 },
  { id:3, name:"Personalised Photo Mug", price:1800, badge:"Custom", emoji:"📸", desc:"Upload your photo — printed with archival ink", material:"Ceramic", capacity:"300ml", rating:4, reviews:167 },
  { id:4, name:"Gold-Rim Luxury Mug Set", price:4200, badge:"Premium", emoji:"✨", desc:"Set of 4 ceramic mugs with 22k gold rim", material:"Fine Ceramic", capacity:"320ml", rating:5, reviews:38 },
  { id:5, name:"Travel Mug with Engraving", price:2600, badge:"", emoji:"🚗", desc:"Double-wall stainless steel, custom engraved", material:"Stainless Steel", capacity:"450ml", rating:5, reviews:55 },
  { id:6, name:"His & Hers Matching Set", price:3600, badge:"Popular", emoji:"💑", desc:"Two mugs, two hearts — perfect couple gift", material:"Porcelain", capacity:"380ml", rating:5, reviews:91 },
];

const styles = `
  .product-stars { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
  .product-stars small { font-size: 0.78rem; color: var(--text-muted); }
  .spec-tag {
    display: inline-block; background: var(--plum-pale); color: var(--plum);
    font-size: 0.72rem; font-weight: 700; padding: 3px 10px; border-radius: 50px;
    margin-bottom: 8px; margin-right: 4px;
  }
  .wishlist-btn {
    position: absolute; top: 14px; right: 14px; z-index: 2;
    background: white; border: none; border-radius: 50%;
    width: 32px; height: 32px; cursor: pointer; font-size: 1rem;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s;
  }
  .wishlist-btn:hover { transform: scale(1.15); }
  .custom-mug-banner {
    background: linear-gradient(135deg, var(--plum-pale), var(--rose-pale));
    border-radius: var(--radius); padding: 48px 40px;
    display: flex; gap: 48px; align-items: center; flex-wrap: wrap;
    margin-top: 64px; border: 2px dashed var(--rose-light);
  }
  .custom-mug-banner h3 { font-family: var(--font-display); font-size: 1.8rem; color: var(--plum); margin-bottom: 10px; }
  .custom-mug-banner p { color: var(--text-soft); line-height: 1.7; margin-bottom: 20px; max-width: 460px; }
  .custom-mug-visual { font-size: 6rem; flex-shrink: 0; }
`;

export default function MugsPage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  return (
    <>
      <style>{styles}</style>
      <Nav cartCount={2} />
      <div className="g-page">
        <Ribbon />
        <div className="g-page-hero">
          <div className="g-page-hero-content">
            <div className="g-breadcrumb"><a href="/">Home</a> › Mugs & Keepsakes</div>
            <h1>Mugs & Keepsakes ☕</h1>
            <p>Beautiful mugs that hold warmth, memories, and the perfect cup</p>
          </div>
        </div>

        <div className="g-section">
          <div className="g-section-head">
            <span className="g-label">Curated Collection</span>
            <h2 className="g-title">Find Your Perfect Mug</h2>
          </div>

          <div className="g-products-grid">
            {mugs.map(m => (
              <div key={m.id} className="g-product-card">
                <div className="g-product-img">
                  {m.badge && <span className="g-product-badge">{m.badge === "Custom" ? "plum" : ""} {m.badge}</span>}
                  <button className="wishlist-btn" onClick={() => setWishlist(w => w.includes(m.id) ? w.filter(x=>x!==m.id) : [...w,m.id])}>
                    {wishlist.includes(m.id) ? "❤️" : "🤍"}
                  </button>
                  <span>{m.emoji}</span>
                </div>
                <div className="g-product-info">
                  <div>
                    <span className="spec-tag">{m.material}</span>
                    <span className="spec-tag">{m.capacity}</span>
                  </div>
                  <div className="product-stars">
                    <span className="g-stars">{"★".repeat(m.rating)}</span>
                    <small>({m.reviews})</small>
                  </div>
                  <div className="g-product-name">{m.name}</div>
                  <div className="g-product-desc">{m.desc}</div>
                  <div className="g-product-footer">
                    <div className="g-product-price">Rs. {m.price.toLocaleString()}</div>
                    <button className="g-add-cart" onClick={() => showToast(`${m.emoji} Added!`)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="custom-mug-banner">
            <div className="custom-mug-visual">☕</div>
            <div>
              <h3>Create a Personalised Mug ✍️</h3>
              <p>Upload a photo, add a name, or write a message — we'll print it on a beautiful mug and gift-wrap it for you.</p>
              <a href="#" className="g-btn g-btn-rose">Design Your Mug →</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}
