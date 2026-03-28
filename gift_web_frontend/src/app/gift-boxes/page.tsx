"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Nav from "@/src/components/nav";
import Ribbon from "@/src/components/ribbon";
import Footer from "@/src/components/footer";
import { useCart } from "@/src/context/CartContext";

const giftBoxes = [
  { id:201, name:"Luxury Pink Celebration Box",    price:4500, badge:"Bestseller", img:"/images/gifts/pinkbox1.webp", hoverImg:"/images/gifts/black_box.jpg",      emoji:"🎁", desc:"Satin-lined box with ribbon bow, chocolates, mini candle & handwritten card", rating:5, reviews:128, occasion:"Birthday"    },
  { id:202, name:"Premium Love Anniversary Box",   price:5500, badge:"Limited",    img:"/images/gifts/lovebox1.webp",       hoverImg:"/images/gifts/boxwithflower1.jpg", emoji:"💝", desc:"Rose petals, chocolate truffles, mini perfume & memory journal",             rating:5, reviews:201, occasion:"Anniversary" },
  { id:203, name:"Birthday Surprise Mega Box",     price:3800, badge:"Popular",    img:"/images/gifts/boxwithflower1.webp", hoverImg:"/images/gifts/choco1.webp",        emoji:"🎂", desc:"Personalized with name, includes 3 chocolates, balloon & card",             rating:5, reviews:156, occasion:"Birthday"    },
  { id:204, name:"Anniversary Keepsake Premium",   price:6200, badge:"Premium",    img:"/images/gifts/black_box.jpg",       hoverImg:"/images/gifts/wallet1.webp",       emoji:"💍", desc:"Gold-foil box, luxury chocolates, scented candle & custom message locket",   rating:5, reviews:89,  occasion:"Anniversary" },
  { id:205, name:"New Baby Welcome Box",           price:4200, badge:"New",        img:"/images/gifts/babybox2.webp", hoverImg:"/images/gifts/babybox2.webp",        emoji:"👶", desc:"Soft toy, baby keepsake card, sweet treats & pastel wrapping",               rating:4, reviews:44,  occasion:"New Baby"    },
  { id:206, name:"Thank You Gratitude Box",        price:2900, badge:"",           img:"/images/gifts/black_box.jpg",       hoverImg:"/images/gifts/choco1.webp",        emoji:"🙏", desc:"Gourmet cookies, tea selection & heartfelt card",                            rating:4, reviews:67,  occasion:"Thank You"   },
  { id:207, name:"Wedding Favour Box (Set of 10)", price:8500, badge:"Bulk Deal",  img:"/images/gifts/boxwithflower1.webp", hoverImg:"/images/gifts/black_box.jpg",      emoji:"💒", desc:"10 mini boxes, personalized tags, each filled with 4 chocolates",           rating:5, reviews:32,  occasion:"Wedding"     },
  { id:208, name:"Festive Celebration Hamper",     price:7200, badge:"Seasonal",   img:"/images/gifts/black_box.jpg",       hoverImg:"/images/gifts/boxwithflower1.jpg", emoji:"🎊", desc:"Deluxe hamper with premium sweets, dry fruits & decorative tray",            rating:5, reviews:78,  occasion:"Festival"    },
];

const occasions = ["All","Birthday","Anniversary","New Baby","Thank You","Wedding","Festival"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');
  .boxes-page { font-family:'Jost',sans-serif; background:#fdfcf8; }
  .boxes-hero { background:linear-gradient(135deg,#fdf0e8 0%,#fde8ef 50%,#f5f0e0 100%); padding:72px 48px 56px; position:relative; overflow:hidden; }
  .boxes-hero::before { content:'🎁'; position:absolute; right:80px; bottom:-30px; font-size:240px; opacity:0.06; transform:rotate(-8deg); pointer-events:none; }
  .boxes-hero-inner { max-width:1280px; margin:0 auto; }
  .g-breadcrumb { display:flex; gap:6px; align-items:center; font-size:0.82rem; color:#a08060; margin-bottom:14px; }
  .g-breadcrumb a { color:#c87840; text-decoration:none; }
  .boxes-hero h1 { font-family:'Playfair Display',serif; font-size:clamp(2.4rem,5vw,4rem); color:#3d2010; margin-bottom:12px; line-height:1.1; }
  .boxes-hero h1 em { font-style:italic; color:#c87840; }
  .boxes-hero p { color:#7a5a3a; font-size:1rem; max-width:480px; line-height:1.7; margin-bottom:28px; }
  .box-hero-cards { display:flex; gap:12px; flex-wrap:wrap; }
  .box-hero-card { background:rgba(255,255,255,0.8); backdrop-filter:blur(8px); border-radius:14px; padding:14px 20px; text-align:center; border:1px solid rgba(200,120,64,0.15); min-width:110px; }
  .box-hero-card span { display:block; font-size:1.8rem; margin-bottom:4px; }
  .box-hero-card p { font-size:0.75rem; color:#7a5a3a; font-weight:600; }
  .g-section { padding:64px 48px; max-width:1280px; margin:0 auto; }
  .g-section-head { text-align:center; margin-bottom:32px; }
  .g-label { display:block; color:#c87840; font-size:0.78rem; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:8px; }
  .g-title { font-family:'Playfair Display',serif; font-size:clamp(1.8rem,3vw,2.4rem); color:#3d2010; margin-bottom:6px; }
  .g-sub { color:#7a5a3a; font-size:0.95rem; }
  .occasion-filters { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:40px; justify-content:center; }
  .occ-btn { padding:8px 20px; border-radius:50px; border:1.5px solid rgba(200,120,64,0.2); background:white; font-family:'Jost',sans-serif; font-weight:500; font-size:0.83rem; cursor:pointer; transition:all 0.2s; color:#7a5a3a; }
  .occ-btn:hover { border-color:#c87840; color:#c87840; transform:translateY(-1px); }
  .occ-btn.active { background:linear-gradient(135deg,#c87840,#3d2010); color:white; border-color:transparent; box-shadow:0 4px 16px rgba(200,120,64,0.3); }
  .boxes-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:28px; }
  .bc-card { background:white; border-radius:22px; overflow:hidden; box-shadow:0 4px 20px rgba(61,32,16,0.08); border:1px solid rgba(200,120,64,0.1); transition:transform 0.3s,box-shadow 0.3s; position:relative; }
  .bc-card:hover { transform:translateY(-8px); box-shadow:0 20px 48px rgba(200,120,64,0.2); }
  .bc-img-wrap { position:relative; height:230px; overflow:hidden; background:linear-gradient(135deg,#fdf0e8,#fde8ef); cursor:zoom-in; }
  .bc-img-main { position:absolute; inset:0; transition:transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
  .bc-card:hover .bc-img-main { transform:scale(1.12); }
  .bc-img-wrap::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 30%,rgba(255,220,120,0.18) 50%,transparent 70%); transform:translateX(-100%); transition:transform 0.6s ease; pointer-events:none; z-index:2; }
  .bc-card:hover .bc-img-wrap::after { transform:translateX(100%); }
  .bc-badge { position:absolute; top:14px; left:14px; z-index:3; padding:5px 14px; border-radius:50px; font-size:0.68rem; font-weight:700; letter-spacing:0.5px; color:white; text-transform:uppercase; background:linear-gradient(135deg,#c87840,#8a5020); }
  .wishlist-btn { position:absolute; top:14px; right:14px; z-index:3; background:white; border:none; border-radius:50%; width:34px; height:34px; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 10px rgba(0,0,0,0.1); transition:transform 0.2s; }
  .wishlist-btn:hover { transform:scale(1.2); }
  .bc-info { padding:20px 22px 22px; }
  .bc-occasion { display:inline-block; background:rgba(200,120,64,0.08); color:#8a5020; font-size:0.7rem; font-weight:700; padding:3px 12px; border-radius:50px; margin-bottom:8px; }
  .bc-stars { display:flex; align-items:center; gap:6px; margin-bottom:6px; }
  .bc-stars-val { color:#f5c842; font-size:0.85rem; }
  .bc-stars-count { font-size:0.75rem; color:#a08060; }
  .bc-name { font-family:'Playfair Display',serif; font-size:1.05rem; color:#3d2010; margin-bottom:4px; font-weight:700; }
  .bc-desc { font-size:0.8rem; color:#7a5a3a; margin-bottom:14px; line-height:1.5; }
  .bc-footer { display:flex; align-items:center; justify-content:space-between; }
  .bc-price { font-family:'Playfair Display',serif; font-weight:700; font-size:1.15rem; color:#c87840; }
  .bc-cart { background:linear-gradient(135deg,#3d2010,#c87840); color:white; border:none; padding:9px 18px; border-radius:50px; font-family:'Jost',sans-serif; font-weight:600; font-size:0.8rem; cursor:pointer; transition:all 0.2s; }
  .bc-cart:hover { transform:scale(1.05); box-shadow:0 4px 14px rgba(200,120,64,0.35); }
  .box-cta { background:linear-gradient(135deg,#3d2010 0%,#c87840 100%); border-radius:28px; padding:64px 48px; text-align:center; color:white; margin-top:80px; position:relative; overflow:hidden; }
  .box-cta::before { content:'✨'; position:absolute; right:60px; top:50%; transform:translateY(-50%); font-size:160px; opacity:0.06; pointer-events:none; }
  .box-cta h2 { font-family:'Playfair Display',serif; font-size:2.2rem; margin-bottom:12px; }
  .box-cta p { opacity:0.9; margin-bottom:28px; font-size:1rem; }
  .g-btn { display:inline-flex; align-items:center; padding:13px 30px; border-radius:50px; font-family:'Jost',sans-serif; font-weight:600; font-size:0.9rem; text-decoration:none; cursor:pointer; border:none; transition:all 0.2s; }
  .g-btn-gold { background:white; color:#3d2010; box-shadow:0 4px 16px rgba(0,0,0,0.15); }
  .g-btn-gold:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.2); }
  .g-toast { position:fixed; bottom:32px; left:50%; transform:translateX(-50%); background:linear-gradient(135deg,#3d2010,#c87840); color:white; padding:14px 28px; border-radius:50px; font-family:'Jost',sans-serif; font-weight:600; font-size:0.9rem; box-shadow:0 8px 24px rgba(61,32,16,0.3); z-index:9999; animation:toastIn 0.3s ease; }
  @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)} }
  @media(max-width:768px){ .boxes-hero,.g-section{padding:48px 20px} .box-cta{padding:48px 24px} }
`;

export default function GiftBoxesPage() {
  const { addToCart } = useCart();
  const [occasion, setOccasion] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toast, setToast]       = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const handleAdd = (box: typeof giftBoxes[0]) => {
    addToCart({ productId: box.id, name: box.name, price: box.price, image: box.img, emoji: box.emoji });
    showToast(`🎁 ${box.name} added to cart!`);
  };

  const filtered = occasion === "All" ? giftBoxes : giftBoxes.filter(b => b.occasion === occasion);

  return (
    <>
      <style>{styles}</style>
      <Nav />
      <div className="boxes-page">
        <Ribbon />
        <div className="boxes-hero">
          <div className="boxes-hero-inner">
            <div className="g-breadcrumb"><a href="/">Home</a> › Gift Boxes</div>
            <h1>Luxury <em>Gift Boxes</em> 🎁</h1>
            <p>Every box is a masterpiece — crafted with care, wrapped with love</p>
            <div className="box-hero-cards">
              {[["🎀","Free Wrapping"],["✍️","Custom Note"],["🚀","Same Day"],["🌟","Premium Quality"]].map(([icon,label]) => (
                <div key={label} className="box-hero-card"><span>{icon}</span><p>{label}</p></div>
              ))}
            </div>
          </div>
        </div>
        <div className="g-section">
          <div className="g-section-head">
            <span className="g-label">Shop by Occasion</span>
            <h2 className="g-title">Find the Perfect Box</h2>
            <p className="g-sub">From birthdays to anniversaries — we have the right box for every moment</p>
          </div>
          <div className="occasion-filters">
            {occasions.map(o => (
              <button key={o} className={`occ-btn${occasion===o?" active":""}`} onClick={() => setOccasion(o)}>{o}</button>
            ))}
          </div>
          <div className="boxes-grid">
            {filtered.map(box => (
              <div key={box.id} className="bc-card">
                <div className="bc-img-wrap">
                  {box.badge && <span className="bc-badge">{box.badge}</span>}
                  <button className="wishlist-btn" onClick={() => setWishlist(w => w.includes(box.id) ? w.filter(x=>x!==box.id) : [...w,box.id])}>
                    {wishlist.includes(box.id) ? "❤️" : "🤍"}
                  </button>
                  <div className="bc-img-main">
                    <Image src={box.img} alt={box.name} fill sizes="320px" style={{ objectFit:"cover" }} />
                  </div>
                </div>
                <div className="bc-info">
                  <span className="bc-occasion">{box.occasion}</span>
                  <div className="bc-stars">
                    <span className="bc-stars-val">{"★".repeat(box.rating)}</span>
                    <span className="bc-stars-count">({box.reviews} reviews)</span>
                  </div>
                  <div className="bc-name">{box.name}</div>
                  <div className="bc-desc">{box.desc}</div>
                  <div className="bc-footer">
                    <div className="bc-price">Rs. {box.price.toLocaleString()}</div>
                    <button className="bc-cart" onClick={() => handleAdd(box)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="box-cta">
            <h2>Can&apos;t Find What You Need?</h2>
            <p>We create fully custom gift boxes tailored to your vision and budget</p>
            <a href="/contact" className="g-btn g-btn-gold">Request Custom Box ✨</a>
          </div>
        </div>
      </div>
      <Footer />
      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}