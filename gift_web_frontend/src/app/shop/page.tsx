"use client";
import Link from "next/link";
import { useState } from "react";
import Nav from "@/src/components/nav";
import Ribbon from "@/src/components/ribbon";
import Footer from "@/src/components/footer";

const allProducts = [
  { id:1, name:"Luxury Pink Gift Box", price:4500, category:"gift-boxes", badge:"Bestseller", emoji:"🎁", desc:"Elegantly wrapped with silk ribbon", rating:5, reviews:128 },
  { id:2, name:"Chocolate Truffle Set", price:3200, category:"chocolates", badge:"New", emoji:"🍫", desc:"24 handcrafted Belgian truffles", rating:5, reviews:84 },
  { id:3, name:"Romantic Mug Duo", price:2800, category:"mugs", badge:"Popular", emoji:"☕", desc:"Matching porcelain mugs for two", rating:4, reviews:62 },
  { id:4, name:"Premium Love Box", price:5500, category:"gift-boxes", badge:"Limited", emoji:"💝", desc:"Includes chocolates, candle & more", rating:5, reviews:201 },
  { id:5, name:"Teddy Bear Hug", price:1900, category:"teddies", badge:"", emoji:"🧸", desc:"Extra soft 30cm plush teddy", rating:4, reviews:47 },
  { id:6, name:"Rose Gold Candle Set", price:2200, category:"candles", badge:"New", emoji:"🕯️", desc:"Hand-poured soy wax, 3 scents", rating:5, reviews:33 },
  { id:7, name:"Birthday Surprise Box", price:3800, category:"gift-boxes", badge:"Popular", emoji:"🎂", desc:"Personalized birthday curation", rating:5, reviews:156 },
  { id:8, name:"Dark Chocolate Tower", price:4100, category:"chocolates", badge:"", emoji:"🍬", desc:"Assorted premium dark collection", rating:4, reviews:72 },
  { id:9, name:"Anniversary Keepsake", price:6200, category:"gift-boxes", badge:"Premium", emoji:"💍", desc:"Luxury box with memory journal", rating:5, reviews:89 },
  { id:10, name:"Floral Tea Set", price:3300, category:"mugs", badge:"", emoji:"🌸", desc:"4 teas + 2 floral-print cups", rating:4, reviews:41 },
  { id:11, name:"Mini Truffle Box", price:1600, category:"chocolates", badge:"", emoji:"🍭", desc:"12 bite-sized chocolate truffles", rating:4, reviews:58 },
  { id:12, name:"Giant Teddy XL", price:4500, category:"teddies", badge:"Popular", emoji:"🐻", desc:"1.2m plush bear, ultra cuddly", rating:5, reviews:113 },
];

const categories = ["All","gift-boxes","chocolates","mugs","teddies","candles"];
const sortOptions = ["Featured","Price: Low to High","Price: High to Low","Best Rated","Most Reviews"];

const styles = `
  .shop-filters {
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; flex-wrap: wrap; margin-bottom: 36px;
  }
  .shop-cats { display: flex; gap: 10px; flex-wrap: wrap; }
  .shop-cat-btn {
    padding: 8px 20px; border-radius: 50px; border: 2px solid var(--border);
    background: white; font-family: var(--font-body); font-weight: 700;
    font-size: 0.82rem; cursor: pointer; transition: all 0.2s; color: var(--text-soft);
    text-transform: capitalize;
  }
  .shop-cat-btn:hover, .shop-cat-btn.active {
    background: var(--rose); color: white; border-color: var(--rose);
  }
  .shop-sort {
    padding: 9px 16px; border-radius: var(--radius-sm); border: 2px solid var(--border);
    font-family: var(--font-body); font-size: 0.88rem; color: var(--text);
    background: white; cursor: pointer; outline: none;
  }
  .shop-search { display: flex; max-width: 380px; width: 100%; }
  .shop-search input {
    flex: 1; padding: 11px 18px; border: 2px solid var(--border);
    border-right: none; border-radius: 50px 0 0 50px;
    font-family: var(--font-body); font-size: 0.9rem; outline: none;
    transition: border-color 0.2s;
  }
  .shop-search input:focus { border-color: var(--rose-light); }
  .shop-search button {
    padding: 11px 20px; background: var(--rose); color: white; border: none;
    border-radius: 0 50px 50px 0; cursor: pointer; font-size: 1rem;
  }
  .product-stars { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
  .product-stars span { font-size: 0.8rem; color: var(--text-muted); }
  .wishlist-btn {
    position: absolute; top: 14px; right: 14px; z-index: 2;
    background: white; border: none; border-radius: 50%;
    width: 32px; height: 32px; cursor: pointer; font-size: 1rem;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;
  }
  .wishlist-btn:hover { transform: scale(1.15); }
  .results-bar {
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px 24px; background: white; border-radius: var(--radius-sm);
    border: 1px solid var(--border); margin-bottom: 28px; font-size: 0.88rem;
  }
`;

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  let filtered = allProducts.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === "Price: Low to High") filtered = [...filtered].sort((a,b) => a.price - b.price);
  else if (sort === "Price: High to Low") filtered = [...filtered].sort((a,b) => b.price - a.price);
  else if (sort === "Best Rated") filtered = [...filtered].sort((a,b) => b.rating - a.rating);
  else if (sort === "Most Reviews") filtered = [...filtered].sort((a,b) => b.reviews - a.reviews);

  return (
    <>
      <style>{styles}</style>
      <Nav cartCount={2} />
      <div className="g-page">
        <Ribbon />
        <div className="g-page-hero">
          <div className="g-page-hero-content">
            <div className="g-breadcrumb"><a href="/">Home</a> › Shop</div>
            <h1>Our Gift Collection</h1>
            <p>Discover beautifully curated gifts for every person and every occasion</p>
          </div>
        </div>
        <div className="g-section">
          <div className="shop-filters">
            <div className="shop-cats">
              {categories.map(c => (
                <button key={c} className={`shop-cat-btn${activeCategory===c?" active":""}`} onClick={() => setActiveCategory(c)}>
                  {c === "All" ? "All Products" : c.replace("-"," ")}
                </button>
              ))}
            </div>
            <div className="shop-search">
              <input placeholder="Search gifts..." value={search} onChange={e => setSearch(e.target.value)} />
              <button>🔍</button>
            </div>
            <select className="shop-sort" value={sort} onChange={e => setSort(e.target.value)}>
              {sortOptions.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="results-bar">
            <span>Showing <strong>{filtered.length}</strong> products</span>
            <span className="shop-count">Free delivery on orders over Rs. 5,000 🎁</span>
          </div>
          {filtered.length === 0 ? (
            <div className="g-empty">
              <span className="g-empty-icon">🔍</span>
              <h3>No gifts found</h3>
              <p>Try a different search or category</p>
              <button className="g-btn g-btn-rose" onClick={() => { setSearch(""); setActiveCategory("All"); }}>Clear filters</button>
            </div>
          ) : (
            <div className="g-products-grid">
              {filtered.map(p => (
                <div key={p.id} className="g-product-card">
                  <div className="g-product-img">
                    {p.badge && <span className="g-product-badge">{p.badge}</span>}
                    <button className="wishlist-btn" onClick={() => {
                      setWishlist(w => w.includes(p.id) ? w.filter(x=>x!==p.id) : [...w,p.id]);
                    }}>
                      {wishlist.includes(p.id) ? "❤️" : "🤍"}
                    </button>
                    <span>{p.emoji}</span>
                  </div>
                  <div className="g-product-info">
                    <div className="product-stars">
                      <span className="g-stars">{"★".repeat(p.rating)}{"☆".repeat(5-p.rating)}</span>
                      <span>({p.reviews})</span>
                    </div>
                    <div className="g-product-name">{p.name}</div>
                    <div className="g-product-desc">{p.desc}</div>
                    <div className="g-product-footer">
                      <div className="g-product-price">Rs. {p.price.toLocaleString()}</div>
                      <button className="g-add-cart" onClick={() => showToast(`${p.emoji} Added to cart!`)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}