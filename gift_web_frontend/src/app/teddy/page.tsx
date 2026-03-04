"use client";
import { useState } from "react";
import { Nav, Footer, Ribbon } from "../layout";

const teddies = [
  { id:1, name:"Classic Cream Teddy Bear", price:1900, badge:"", emoji:"🧸", desc:"Extra-soft 30cm plush teddy, perfect for gifting", size:"30cm", rating:4, reviews:47 },
  { id:2, name:"Giant Cuddle Bear XL", price:4500, badge:"Popular", emoji:"🐻", desc:"1.2m ultra-soft plush bear — the ultimate hug", size:"120cm", rating:5, reviews:113 },
  { id:3, name:"Heart Teddy with Message", price:2400, badge:"Romantic", emoji:"💗", desc:"Holds a satin heart with your personalised message", size:"40cm", rating:5, reviews:89 },
  { id:4, name:"Rainbow Panda Plush", price:2200, badge:"New", emoji:"🐼", desc:"Colourful panda plush, great for kids & adults", size:"35cm", rating:4, reviews:31 },
  { id:5, name:"Luxury Bunny Plush Set", price:3100, badge:"", emoji:"🐰", desc:"Velvet-soft bunny with bow ribbon in gift box", size:"45cm", rating:5, reviews:55 },
  { id:6, name:"Teddy Bear Gift Bundle", price:5200, badge:"Bundle Deal", emoji:"🎁", desc:"30cm teddy + chocolate box + greeting card", size:"30cm", rating:5, reviews:74 },
];

const styles = `
  .teddy-hero-bg {
    background: linear-gradient(135deg, #fff0e8 0%, var(--rose-pale) 50%, #f5f0ff 100%);
  }
  .size-tag {
    display: inline-block; background: var(--gold-light); color: #8a6a00;
    font-size: 0.72rem; font-weight: 800; padding: 3px 10px; border-radius: 50px; margin-bottom: 8px;
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
  .teddy-product-img { background: linear-gradient(135deg, #fff0e8, #fde8ef) !important; }
  .teddy-cta {
    text-align: center; background: linear-gradient(135deg, var(--rose-pale), #fff0e8);
    border-radius: var(--radius); padding: 56px 40px; margin-top: 64px; border: 1px solid var(--rose-light);
  }
  .teddy-cta h3 { font-family: var(--font-display); font-size: 2rem; color: var(--plum); margin-bottom: 12px; }
  .teddy-cta p { color: var(--text-soft); margin-bottom: 24px; }
`;

export default function TeddiesPage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  return (
    <>
      <style>{styles}</style>
      <Nav cartCount={2} />
      <div className="g-page">
        <Ribbon />
        <div className={`g-page-hero teddy-hero-bg`}>
          <div className="g-page-hero-content">
            <div className="g-breadcrumb"><a href="/">Home</a> › Teddy Bears</div>
            <h1>Teddy Bears & Plush 🧸</h1>
            <p>Soft, snuggly, and full of love — the hug that keeps on giving</p>
          </div>
        </div>

        <div className="g-section">
          <div className="g-section-head">
            <span className="g-label">Plush Collection</span>
            <h2 className="g-title">Find the Perfect Cuddle Companion</h2>
          </div>

          <div className="g-products-grid">
            {teddies.map(t => (
              <div key={t.id} className="g-product-card">
                <div className="g-product-img teddy-product-img">
                  {t.badge && <span className="g-product-badge">{t.badge}</span>}
                  <button className="wishlist-btn" onClick={() => setWishlist(w => w.includes(t.id) ? w.filter(x=>x!==t.id) : [...w,t.id])}>
                    {wishlist.includes(t.id) ? "❤️" : "🤍"}
                  </button>
                  <span>{t.emoji}</span>
                </div>
                <div className="g-product-info">
                  <span className="size-tag">📏 {t.size}</span>
                  <div className="product-stars">
                    <span className="g-stars">{"★".repeat(t.rating)}</span>
                    <small>({t.reviews})</small>
                  </div>
                  <div className="g-product-name">{t.name}</div>
                  <div className="g-product-desc">{t.desc}</div>
                  <div className="g-product-footer">
                    <div className="g-product-price">Rs. {t.price.toLocaleString()}</div>
                    <button className="g-add-cart" onClick={() => showToast(`${t.emoji} Added!`)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="teddy-cta">
            <div style={{ fontSize:"4rem", marginBottom:16 }}>🧸</div>
            <h3>Add a Personalised Message</h3>
            <p>Attach a handwritten note or custom message tag to any teddy bear — it's free!</p>
            <a href="/shop" className="g-btn g-btn-rose">Shop All Gifts 💕</a>
          </div>
        </div>
      </div>
      <Footer />
      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}
