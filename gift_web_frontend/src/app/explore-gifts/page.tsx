"use client";
import Link from "next/link";
import { useState } from "react";
import Nav from "@/src/components/nav";
import Ribbon from "@/src/components/ribbon";
import Footer from "@/src/components/footer";

const allGifts = [
  { id:1, name:"Luxury Pink Gift Box", price:4500, category:"Gift Boxes", badge:"Bestseller", emoji:"🎁", desc:"Satin-lined with chocolates & candle", rating:5, reviews:128, mood:"romantic" },
  { id:2, name:"Belgian Truffle Set", price:3200, category:"Chocolates", badge:"Popular", emoji:"🍫", desc:"24 handcrafted Belgian truffles", rating:5, reviews:84, mood:"sweet" },
  { id:3, name:"Giant Teddy Bear XL", price:4500, category:"Teddies", badge:"", emoji:"🐻", desc:"1.2m ultra-soft plush teddy", rating:5, reviews:113, mood:"fun" },
  { id:4, name:"Premium Love Anniversary Box", price:5500, category:"Gift Boxes", badge:"Limited", emoji:"💝", desc:"Rose petals, truffles & memory journal", rating:5, reviews:201, mood:"romantic" },
  { id:5, name:"Floral Tea Gift Set", price:3300, category:"Mugs", badge:"New", emoji:"🌸", desc:"4 artisan teas + 2 floral cups", rating:4, reviews:41, mood:"cozy" },
  { id:6, name:"Rose Gold Candle Trio", price:2200, category:"Candles", badge:"", emoji:"🕯️", desc:"3 soy wax candles, luxury scents", rating:5, reviews:33, mood:"cozy" },
  { id:7, name:"Milk Chocolate Heart Box", price:2400, category:"Chocolates", badge:"Popular", emoji:"💕", desc:"Heart-box filled with milk chocolates", rating:5, reviews:93, mood:"sweet" },
  { id:8, name:"Personalised Photo Mug", price:1800, category:"Mugs", badge:"Custom", emoji:"☕", desc:"Upload your photo, printed in 48hr", rating:4, reviews:167, mood:"personal" },
  { id:9, name:"Birthday Surprise Mega Box", price:3800, category:"Gift Boxes", badge:"Popular", emoji:"🎂", desc:"Personalised name, 3 chocolates & balloon", rating:5, reviews:156, mood:"fun" },
  { id:10, name:"Artisan Jewellery Box", price:4800, category:"Keepsakes", badge:"Premium", emoji:"💎", desc:"Velvet-lined box with gold keepsake inside", rating:5, reviews:52, mood:"romantic" },
  { id:11, name:"Spa & Relaxation Set", price:3600, category:"Wellness", badge:"New", emoji:"🛁", desc:"Bath salts, face mask & luxury towel", rating:4, reviews:29, mood:"cozy" },
  { id:12, name:"Nutty Praline Delight", price:2900, category:"Chocolates", badge:"", emoji:"🥜", desc:"Hazelnut & almond pralines in gift pack", rating:5, reviews:112, mood:"sweet" },
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
  .explore-hero {
    background: linear-gradient(135deg, var(--rose-pale) 0%, var(--plum-pale) 50%, var(--gold-light) 100%);
    padding: 72px 48px; text-align: center; position: relative; overflow: hidden;
  }
  .explore-floating { position: absolute; font-size: 60px; opacity: 0.06; user-select: none; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .mood-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 14px; margin-bottom: 40px;
  }
  .mood-btn {
    background: white; border: 2px solid var(--border); border-radius: var(--radius);
    padding: 16px 12px; text-align: center; cursor: pointer; transition: all 0.25s;
    font-family: var(--font-body);
  }
  .mood-btn:hover { border-color: var(--rose); transform: translateY(-3px); }
  .mood-btn.active { background: linear-gradient(135deg, var(--rose-pale), var(--plum-pale)); border-color: var(--rose); box-shadow: var(--shadow-soft); }
  .mood-btn-label { font-weight: 700; font-size: 0.88rem; color: var(--text); display: block; margin-bottom: 2px; }
  .mood-btn-desc { font-size: 0.75rem; color: var(--text-muted); }
  .explore-controls { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; margin-bottom: 32px; }
  .explore-select {
    padding: 9px 16px; border-radius: 50px; border: 2px solid var(--border);
    font-family: var(--font-body); font-size: 0.88rem; color: var(--text);
    background: white; cursor: pointer; outline: none;
  }
  .explore-results { color: var(--text-muted); font-size: 0.88rem; }
  .product-stars { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
  .product-stars small { font-size: 0.78rem; color: var(--text-muted); }
  .category-tag {
    display: inline-block; background: var(--rose-pale); color: var(--rose);
    font-size: 0.72rem; font-weight: 700; padding: 3px 10px; border-radius: 50px; margin-bottom: 8px;
  }
  .wishlist-btn {
    position: absolute; top: 14px; right: 14px; z-index: 2;
    background: white; border: none; border-radius: 50%;
    width: 32px; height: 32px; cursor: pointer; font-size: 1rem;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s;
  }
  .wishlist-btn:hover { transform: scale(1.15); }
  .personalize-banner {
    background: linear-gradient(90deg, var(--plum), var(--rose));
    border-radius: var(--radius); padding: 36px 40px;
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
    color: white; margin-top: 64px; flex-wrap: wrap;
  }
  .personalize-banner h3 { font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 6px; }
  .personalize-banner p { opacity: 0.85; font-size: 0.92rem; }
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
      <div className="g-page">
        <Ribbon />

        <div className="explore-hero">
          <span className="explore-floating" style={{ top: 20, left: "5%" }}>✨</span>
          <span className="explore-floating" style={{ bottom: 10, right: "8%" }}>🎁</span>
          <span className="explore-floating" style={{ top: "40%", right: "3%" }}>💕</span>
          <div className="g-page-hero-content">
            <div className="g-breadcrumb"><a href="/">Home</a> › Explore Gifts</div>
            <h1>Explore All Gifts ✨</h1>
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
              <button className="g-btn g-btn-rose" onClick={() => { setActiveMood("all"); setPriceRange("All Prices"); }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="g-products-grid">
              {filtered.map(g => (
                <div key={g.id} className="g-product-card">
                  <div className="g-product-img">
                    {g.badge && <span className="g-product-badge">{g.badge}</span>}
                    <button className="wishlist-btn" onClick={() => setWishlist(w => w.includes(g.id) ? w.filter(x=>x!==g.id) : [...w,g.id])}>
                      {wishlist.includes(g.id) ? "❤️" : "🤍"}
                    </button>
                    <span>{g.emoji}</span>
                  </div>
                  <div className="g-product-info">
                    <span className="category-tag">{g.category}</span>
                    <div className="product-stars">
                      <span className="g-stars">{"★".repeat(g.rating)}</span>
                      <small>({g.reviews})</small>
                    </div>
                    <div className="g-product-name">{g.name}</div>
                    <div className="g-product-desc">{g.desc}</div>
                    <div className="g-product-footer">
                      <div className="g-product-price">Rs. {g.price.toLocaleString()}</div>
                      <button className="g-add-cart" onClick={() => showToast(`${g.emoji} Added!`)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="personalize-banner">
            <div>
              <h3>Can't find the right gift? ✍️</h3>
              <p>We'll create a personalised gift box tailored to your person's interests and your budget.</p>
            </div>
            <a href="/contact" className="g-btn g-btn-lg" style={{ background:"white", color:"var(--plum)", fontFamily:"var(--font-body)", fontWeight:700, whiteSpace:"nowrap" }}>
              Request Custom Gift
            </a>
          </div>
        </div>
      </div>
      <Footer />
      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}
