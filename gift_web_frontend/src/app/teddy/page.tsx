"use client";
import Image from "next/image";
import { useState } from "react";
import Nav from "@/src/components/nav";
import Ribbon from "@/src/components/ribbon";
import Footer from "@/src/components/footer";
import { useCart } from "@/src/context/CartContext";

const teddies = [
  { id:401, name:"Classic Cream Teddy Bear",  price:1900, badge:"",           img:"/images/gifts/teddy1.webp",        hoverImg:"/images/gifts/mensgift1.webp",    emoji:"🧸", desc:"Extra-soft 30cm plush teddy, perfect for gifting",         size:"30cm",  rating:4, reviews:47  },
  { id:402, name:"Giant Cuddle Bear XL",       price:4500, badge:"Popular",    img:"/images/gifts/teddy1.webp",        hoverImg:"/images/gifts/wallet1.webp",      emoji:"🐻", desc:"1.2m ultra-soft plush bear — the ultimate hug",           size:"120cm", rating:5, reviews:113 },
  { id:403, name:"Heart Teddy with Message",   price:2400, badge:"Romantic",   img:"/images/gifts/boxwithflower1.jpg", hoverImg:"/images/gifts/teddy1.webp",       emoji:"💝", desc:"Holds a satin heart with your personalised message",      size:"40cm",  rating:5, reviews:89  },
  { id:404, name:"Rainbow Panda Plush",        price:2200, badge:"New",        img:"/images/gifts/mensgift1.webp",     hoverImg:"/images/gifts/teddy1.webp",       emoji:"🐼", desc:"Colourful panda plush, great for kids & adults",          size:"35cm",  rating:4, reviews:31  },
  { id:405, name:"Luxury Bunny Plush Set",     price:3100, badge:"",           img:"/images/gifts/photoframe1.webp",   hoverImg:"/images/gifts/boxwithflower1.jpg",emoji:"🐰", desc:"Velvet-soft bunny with bow ribbon in gift box",            size:"45cm",  rating:5, reviews:55  },
  { id:406, name:"Teddy Bear Gift Bundle",     price:5200, badge:"Bundle Deal",img:"/images/gifts/black_box.jpg",      hoverImg:"/images/gifts/choco1.webp",       emoji:"🎁", desc:"30cm teddy + chocolate box + greeting card",              size:"30cm",  rating:5, reviews:74  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
  .teddy-page { font-family:'Plus Jakarta Sans',sans-serif; background:#fffaf8; }
  .teddy-hero { background:linear-gradient(160deg,#fff0e8 0%,#fde8ef 40%,#f5f0ff 100%); padding:72px 48px 56px; position:relative; overflow:hidden; }
  .teddy-hero::before { content:'🧸'; position:absolute; right:60px; bottom:-20px; font-size:220px; opacity:0.07; pointer-events:none; transform:rotate(-12deg); }
  .teddy-hero-inner { max-width:1280px; margin:0 auto; }
  .g-breadcrumb { display:flex; gap:6px; align-items:center; font-size:0.82rem; color:#a07060; margin-bottom:14px; }
  .g-breadcrumb a { color:#e8547a; text-decoration:none; }
  .teddy-hero h1 { font-family:'Fraunces',serif; font-size:clamp(2.4rem,5vw,3.8rem); color:#4a2040; margin-bottom:12px; line-height:1.1; }
  .teddy-hero h1 em { font-style:italic; color:#e8547a; }
  .teddy-hero p { color:#7a5a6a; font-size:1rem; max-width:480px; line-height:1.7; margin-bottom:28px; }
  .teddy-badges { display:flex; gap:12px; flex-wrap:wrap; }
  .teddy-badge { background:white; border:1.5px solid rgba(232,84,122,0.15); border-radius:50px; padding:8px 18px; font-size:0.82rem; font-weight:600; color:#4a2040; box-shadow:0 2px 8px rgba(232,84,122,0.08); }
  .g-section { padding:64px 48px; max-width:1280px; margin:0 auto; }
  .g-section-head { margin-bottom:40px; }
  .g-label { display:block; color:#e8547a; font-size:0.78rem; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:8px; }
  .g-title { font-family:'Fraunces',serif; font-size:clamp(1.8rem,3vw,2.4rem); color:#4a2040; margin-bottom:6px; }
  .teddy-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:28px; }
  .tc-card { background:white; border-radius:24px; overflow:hidden; box-shadow:0 6px 24px rgba(74,32,64,0.08); border:1px solid rgba(232,84,122,0.07); transition:transform 0.35s cubic-bezier(.22,.61,.36,1),box-shadow 0.35s; position:relative; cursor:pointer; }
  .tc-card:hover { transform:perspective(800px) rotateX(3deg) rotateY(-2deg) translateY(-8px); box-shadow:0 20px 48px rgba(232,84,122,0.2); }
  .tc-card::after { content:''; position:absolute; inset:0; border-radius:24px; background:linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 60%); opacity:0; transition:opacity 0.3s; pointer-events:none; z-index:5; }
  .tc-card:hover::after { opacity:1; }
  .tc-img-wrap { position:relative; height:240px; overflow:hidden; background:linear-gradient(135deg,#fff0e8,#fde8ef); }
  .tc-img-front,.tc-img-back { position:absolute; inset:0; transition:opacity 0.5s ease,transform 0.5s ease; }
  .tc-img-front { opacity:1; transform:scale(1); }
  .tc-img-back { opacity:0; transform:scale(1.08); }
  .tc-card:hover .tc-img-front { opacity:0; transform:scale(1.08); }
  .tc-card:hover .tc-img-back { opacity:1; transform:scale(1); }
  .tc-badge { position:absolute; top:14px; left:14px; z-index:3; padding:5px 14px; border-radius:50px; font-size:0.68rem; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:white; background:linear-gradient(135deg,#e8547a,#7b3f8c); }
  .wishlist-btn { position:absolute; top:14px; right:14px; z-index:3; background:white; border:none; border-radius:50%; width:34px; height:34px; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 10px rgba(0,0,0,0.1); transition:transform 0.2s; }
  .wishlist-btn:hover { transform:scale(1.2); }
  .tc-info { padding:20px 22px 22px; }
  .tc-size { display:inline-block; background:linear-gradient(135deg,#fff0e8,#fde8ef); color:#8a5040; font-size:0.72rem; font-weight:700; padding:3px 12px; border-radius:50px; margin-bottom:8px; }
  .tc-stars { display:flex; align-items:center; gap:6px; margin-bottom:6px; }
  .tc-stars-val { color:#f5c842; font-size:0.85rem; }
  .tc-stars-count { font-size:0.75rem; color:#a07060; }
  .tc-name { font-family:'Fraunces',serif; font-size:1.1rem; color:#3d1a2e; margin-bottom:4px; font-weight:600; }
  .tc-desc { font-size:0.8rem; color:#7a5a6a; margin-bottom:16px; line-height:1.5; }
  .tc-footer { display:flex; align-items:center; justify-content:space-between; }
  .tc-price { font-family:'Fraunces',serif; font-weight:700; font-size:1.2rem; color:#e8547a; }
  .tc-cart { background:linear-gradient(135deg,#4a2040,#e8547a); color:white; border:none; padding:9px 18px; border-radius:50px; font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; font-size:0.8rem; cursor:pointer; transition:all 0.2s; }
  .tc-cart:hover { transform:scale(1.05); box-shadow:0 4px 14px rgba(232,84,122,0.35); }
  .teddy-cta { text-align:center; background:linear-gradient(135deg,#fff0e8 0%,#fde8ef 50%,#f5e8ff 100%); border-radius:28px; padding:60px 40px; margin-top:64px; border:2px solid rgba(232,84,122,0.1); position:relative; overflow:hidden; }
  .teddy-cta h3 { font-family:'Fraunces',serif; font-size:2rem; color:#4a2040; margin-bottom:12px; }
  .teddy-cta p { color:#7a5a6a; margin-bottom:28px; max-width:400px; margin-left:auto; margin-right:auto; line-height:1.7; }
  .g-btn { display:inline-flex; align-items:center; padding:13px 30px; border-radius:50px; font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; font-size:0.9rem; text-decoration:none; cursor:pointer; border:none; transition:all 0.2s; }
  .g-btn-rose { background:linear-gradient(135deg,#e8547a,#c23060); color:white; box-shadow:0 4px 16px rgba(232,84,122,0.3); }
  .g-btn-rose:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(232,84,122,0.4); }
  .g-toast { position:fixed; bottom:32px; left:50%; transform:translateX(-50%); background:linear-gradient(135deg,#4a2040,#e8547a); color:white; padding:14px 28px; border-radius:50px; font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; font-size:0.9rem; box-shadow:0 8px 24px rgba(74,32,64,0.3); z-index:9999; animation:toastIn 0.3s ease; }
  @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)} }
  @media(max-width:768px){ .teddy-hero,.g-section{padding:48px 20px} }
`;

export default function TeddiesPage() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toast, setToast]       = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const handleAdd = (t: typeof teddies[0]) => {
    addToCart({ productId: t.id, name: t.name, price: t.price, image: t.img, emoji: t.emoji });
    showToast(`🧸 ${t.name} added to cart!`);
  };

  return (
    <>
      <style>{styles}</style>
      <Nav />
      <div className="teddy-page">
        <Ribbon />
        <div className="teddy-hero">
          <div className="teddy-hero-inner">
            <div className="g-breadcrumb"><a href="/">Home</a> › Teddy Bears</div>
            <h1>Teddy Bears &amp; <em>Plush</em> 🧸</h1>
            <p>Soft, snuggly, and full of love — the hug that keeps on giving</p>
            <div className="teddy-badges">
              {["🧸 Ultra-Soft Materials","🎀 Gift-Ready Packaging","💌 Add a Message","🚀 Same-Day Delivery"].map(b => (
                <span key={b} className="teddy-badge">{b}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="g-section">
          <div className="g-section-head">
            <span className="g-label">Plush Collection</span>
            <h2 className="g-title">Find the Perfect Cuddle Companion</h2>
          </div>
          <div className="teddy-grid">
            {teddies.map(t => (
              <div key={t.id} className="tc-card">
                <div className="tc-img-wrap">
                  {t.badge && <span className="tc-badge">{t.badge}</span>}
                  <button className="wishlist-btn" onClick={() => setWishlist(w => w.includes(t.id) ? w.filter(x=>x!==t.id) : [...w,t.id])}>
                    {wishlist.includes(t.id) ? "❤️" : "🤍"}
                  </button>
                  <div className="tc-img-front">
                    <Image src={t.img} alt={t.name} fill sizes="320px" style={{ objectFit:"cover" }} />
                  </div>
                  <div className="tc-img-back">
                    <Image src={t.hoverImg} alt={t.name+" alt"} fill sizes="320px" style={{ objectFit:"cover" }} />
                  </div>
                </div>
                <div className="tc-info">
                  <span className="tc-size">📏 {t.size}</span>
                  <div className="tc-stars">
                    <span className="tc-stars-val">{"★".repeat(t.rating)}{"☆".repeat(5-t.rating)}</span>
                    <span className="tc-stars-count">({t.reviews})</span>
                  </div>
                  <div className="tc-name">{t.name}</div>
                  <div className="tc-desc">{t.desc}</div>
                  <div className="tc-footer">
                    <div className="tc-price">Rs. {t.price.toLocaleString()}</div>
                    <button className="tc-cart" onClick={() => handleAdd(t)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="teddy-cta">
            <div style={{ fontSize:"4rem", marginBottom:16 }}>🧸</div>
            <h3>Add a Personalised Message</h3>
            <p>Attach a handwritten note or custom message tag to any teddy bear — it&apos;s free!</p>
            <a href="/shop" className="g-btn g-btn-rose">Shop All Gifts 💕</a>
          </div>
        </div>
      </div>
      <Footer />
      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}