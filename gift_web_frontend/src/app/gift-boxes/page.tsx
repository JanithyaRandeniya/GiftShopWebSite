"use client";
import Link from "next/link";
import { useState } from "react";
import { Nav, Footer, Ribbon } from "../layout";

const giftBoxes = [
  { id:1, name:"Luxury Pink Celebration Box", price:4500, badge:"Bestseller", emoji:"🎁", desc:"Satin-lined box with ribbon bow, chocolates, mini candle & handwritten card", rating:5, reviews:128, occasion:"Birthday" },
  { id:2, name:"Premium Love Anniversary Box", price:5500, badge:"Limited", emoji:"💝", desc:"Rose petals, chocolate truffles, mini perfume & memory journal", rating:5, reviews:201, occasion:"Anniversary" },
  { id:3, name:"Birthday Surprise Mega Box", price:3800, badge:"Popular", emoji:"🎂", desc:"Personalized with name, includes 3 chocolates, balloon & card", rating:5, reviews:156, occasion:"Birthday" },
  { id:4, name:"Anniversary Keepsake Premium", price:6200, badge:"Premium", emoji:"💍", desc:"Gold-foil box, luxury chocolates, scented candle & custom message locket", rating:5, reviews:89, occasion:"Anniversary" },
  { id:5, name:"New Baby Welcome Box", price:4200, badge:"New", emoji:"👶", desc:"Soft toy, baby keepsake card, sweet treats & pastel wrapping", rating:4, reviews:44, occasion:"New Baby" },
  { id:6, name:"Thank You Gratitude Box", price:2900, badge:"", emoji:"🙏", desc:"Gourmet cookies, tea selection & heartfelt card", rating:4, reviews:67, occasion:"Thank You" },
  { id:7, name:"Wedding Favour Box (Set of 10)", price:8500, badge:"Bulk Deal", emoji:"💒", desc:"10 mini boxes, personalized tags, each filled with 4 chocolates", rating:5, reviews:32, occasion:"Wedding" },
  { id:8, name:"Festive Celebration Hamper", price:7200, badge:"Seasonal", emoji:"✨", desc:"Deluxe hamper with premium sweets, dry fruits & decorative tray", rating:5, reviews:78, occasion:"Festival" },
];

const occasions = ["All", "Birthday", "Anniversary", "New Baby", "Thank You", "Wedding", "Festival"];

const styles = `
  .box-hero-cards {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
    max-width: 480px; margin: 40px auto 0;
  }
  .box-hero-card {
    background: rgba(255,255,255,0.7); backdrop-filter: blur(8px);
    border-radius: var(--radius-sm); padding: 16px; text-align: center;
    border: 1px solid rgba(232,84,122,0.15);
  }
  .box-hero-card span { display: block; font-size: 1.8rem; margin-bottom: 4px; }
  .box-hero-card p { font-size: 0.78rem; color: var(--text-soft); font-weight: 700; }
  .occasion-filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 36px; justify-content: center; }
  .occ-btn {
    padding: 8px 20px; border-radius: 50px; border: 2px solid var(--border);
    background: white; font-family: var(--font-body); font-weight: 700;
    font-size: 0.82rem; cursor: pointer; transition: all 0.2s; color: var(--text-soft);
  }
  .occ-btn:hover, .occ-btn.active { background: var(--plum); color: white; border-color: var(--plum); }
  .product-stars { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
  .product-stars small { font-size: 0.78rem; color: var(--text-muted); }
  .occasion-tag {
    display: inline-block; background: var(--plum-pale); color: var(--plum);
    font-size: 0.72rem; font-weight: 700; padding: 3px 10px; border-radius: 50px;
    margin-bottom: 8px;
  }
  .box-cta {
    background: linear-gradient(135deg, var(--plum) 0%, var(--rose) 100%);
    border-radius: 24px; padding: 64px 48px; text-align: center; color: white; margin-top: 80px;
  }
  .box-cta h2 { font-family: var(--font-display); font-size: 2.2rem; margin-bottom: 12px; }
  .box-cta p { opacity: 0.9; margin-bottom: 28px; font-size: 1rem; }
  .wishlist-btn {
    position: absolute; top: 14px; right: 14px; z-index: 2;
    background: white; border: none; border-radius: 50%;
    width: 32px; height: 32px; cursor: pointer; font-size: 1rem;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s;
  }
  .wishlist-btn:hover { transform: scale(1.15); }
`;

export default function GiftBoxesPage() {
  const [occasion, setOccasion] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const filtered = occasion === "All" ? giftBoxes : giftBoxes.filter(b => b.occasion === occasion);

  return (
    <>
      <style>{styles}</style>
      <Nav cartCount={2} />
      <div className="g-page">
        <Ribbon />

        <div className="g-page-hero">
          <div className="g-page-hero-content">
            <div className="g-breadcrumb"><a href="/">Home</a> › Gift Boxes</div>
            <h1>Luxury Gift Boxes 🎁</h1>
            <p>Every box is a masterpiece — crafted with care, wrapped with love</p>
            <div className="box-hero-cards">
              {[["🎀","Free Wrapping"],["✍️","Custom Note"],["🚀","Same Day"]].map(([icon,label]) => (
                <div key={label} className="box-hero-card"><span>{icon}</span><p>{label}</p></div>
              ))}
            </div>
          </div>
        </div>

        <div className="g-section">
          <div className="g-section-head center">
            <span className="g-label">Shop by Occasion</span>
            <h2 className="g-title">Find the Perfect Box</h2>
            <p className="g-sub">From birthdays to anniversaries — we have the right box for every moment</p>
          </div>

          <div className="occasion-filters">
            {occasions.map(o => (
              <button key={o} className={`occ-btn${occasion===o?" active":""}`} onClick={() => setOccasion(o)}>{o}</button>
            ))}
          </div>

          <div className="g-products-grid">
            {filtered.map(box => (
              <div key={box.id} className="g-product-card">
                <div className="g-product-img">
                  {box.badge && <span className="g-product-badge">{box.badge}</span>}
                  <button className="wishlist-btn" onClick={() => setWishlist(w => w.includes(box.id) ? w.filter(x=>x!==box.id) : [...w,box.id])}>
                    {wishlist.includes(box.id) ? "❤️" : "🤍"}
                  </button>
                  <span>{box.emoji}</span>
                </div>
                <div className="g-product-info">
                  <span className="occasion-tag">{box.occasion}</span>
                  <div className="product-stars">
                    <span className="g-stars">{"★".repeat(box.rating)}</span>
                    <small>({box.reviews} reviews)</small>
                  </div>
                  <div className="g-product-name">{box.name}</div>
                  <div className="g-product-desc">{box.desc}</div>
                  <div className="g-product-footer">
                    <div className="g-product-price">Rs. {box.price.toLocaleString()}</div>
                    <button className="g-add-cart" onClick={() => showToast(`${box.emoji} Added to cart!`)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="box-cta">
            <h2>Can't Find What You Need?</h2>
            <p>We create fully custom gift boxes tailored to your vision and budget</p>
            <a href="/contact" className="g-btn g-btn-lg" style={{ background:"white", color:"var(--plum)", fontFamily:"var(--font-body)", fontWeight:700 }}>
              Request Custom Box ✨
            </a>
          </div>
        </div>
      </div>
      <Footer />
      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}
