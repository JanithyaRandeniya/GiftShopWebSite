"use client";
import Link from "next/link";
import { useState } from "react";
import Nav from "@/src/components/nav";
import Footer from "@/src/components/footer";

const initItems = [
  { id:1, name:"Luxury Pink Gift Box", price:4500, emoji:"🎁", qty:1, note:"" },
  { id:2, name:"Chocolate Truffle Set", price:3200, emoji:"🍫", qty:2, note:"" },
  { id:4, name:"Premium Love Box", price:5500, emoji:"💝", qty:1, note:"Please add a birthday message card" },
];

const styles = `
  .cart-layout { display: grid; grid-template-columns: 1fr 360px; gap: 32px; align-items: start; }
  @media(max-width:900px){ .cart-layout { grid-template-columns: 1fr; } }
  .cart-item {
    display: grid; grid-template-columns: 80px 1fr auto; gap: 20px;
    align-items: center; padding: 24px; background: white;
    border-radius: var(--radius); border: 1px solid var(--border);
    margin-bottom: 16px; transition: box-shadow 0.2s;
  }
  .cart-item:hover { box-shadow: var(--shadow-card); }
  .cart-item-img {
    width: 80px; height: 80px; border-radius: var(--radius-sm);
    background: var(--rose-pale); display: flex; align-items: center;
    justify-content: center; font-size: 2.5rem; flex-shrink: 0;
  }
  .cart-item-name { font-weight: 700; font-size: 0.98rem; margin-bottom: 4px; }
  .cart-item-price { color: var(--rose); font-weight: 700; font-size: 1rem; margin-bottom: 10px; }
  .cart-item-note { font-size: 0.8rem; color: var(--text-muted); font-style: italic; margin-top: 4px; }
  .qty-control { display: flex; align-items: center; gap: 0; border: 2px solid var(--border); border-radius: 50px; overflow: hidden; }
  .qty-btn {
    width: 32px; height: 32px; border: none; background: white;
    font-size: 1.1rem; cursor: pointer; font-weight: 700; color: var(--rose);
    transition: background 0.15s; display: flex; align-items: center; justify-content: center;
  }
  .qty-btn:hover { background: var(--rose-pale); }
  .qty-num { min-width: 32px; text-align: center; font-weight: 700; font-size: 0.9rem; }
  .remove-btn {
    background: none; border: none; color: var(--text-muted);
    font-size: 1.2rem; cursor: pointer; transition: color 0.2s; padding: 4px;
  }
  .remove-btn:hover { color: var(--rose); }
  .cart-right { position: sticky; top: 100px; }
  .order-summary {
    background: white; border-radius: var(--radius); border: 1px solid var(--border);
    padding: 28px; margin-bottom: 20px;
  }
  .order-summary h3 {
    font-family: var(--font-display); font-size: 1.3rem; color: var(--plum);
    margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border);
  }
  .summary-row { display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 0.92rem; }
  .summary-row.total {
    font-weight: 800; font-size: 1.1rem; color: var(--text);
    border-top: 2px solid var(--border); padding-top: 14px; margin-top: 6px;
  }
  .summary-row.total span:last-child { color: var(--rose); }
  .promo-row { display: flex; gap: 0; margin: 20px 0; }
  .promo-input {
    flex: 1; padding: 11px 16px; border: 2px solid var(--border);
    border-right: none; border-radius: 50px 0 0 50px;
    font-family: var(--font-body); font-size: 0.88rem; outline: none;
  }
  .promo-input:focus { border-color: var(--rose-light); }
  .promo-btn {
    padding: 11px 20px; background: var(--plum); color: white; border: none;
    border-radius: 0 50px 50px 0; font-family: var(--font-body);
    font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: background 0.2s;
  }
  .promo-btn:hover { background: var(--rose); }
  .gift-wrap {
    display: flex; align-items: center; gap: 12px;
    background: var(--rose-pale); padding: 14px 18px; border-radius: var(--radius-sm);
    margin-bottom: 20px; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s;
  }
  .gift-wrap.active { border-color: var(--rose-light); }
  .gift-wrap-text { flex: 1; }
  .gift-wrap-text strong { display: block; font-size: 0.88rem; color: var(--text); }
  .gift-wrap-text span { font-size: 0.78rem; color: var(--text-soft); }
  .trust-badges { display: flex; gap: 12px; }
  .trust-badge { flex: 1; text-align: center; background: white; border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 12px 8px; }
  .trust-badge span { display: block; font-size: 1.3rem; margin-bottom: 4px; }
  .trust-badge p { font-size: 0.72rem; color: var(--text-soft); font-weight: 600; line-height: 1.3; }
  .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  .cart-header h2 { font-family: var(--font-display); font-size: 2rem; color: var(--plum); }
  .cart-actions { display: flex; gap: 12px; align-items: center; }
  .delivery-info {
    background: linear-gradient(135deg, var(--rose-pale), var(--plum-pale));
    border-radius: var(--radius-sm); padding: 14px 18px; margin-bottom: 20px;
    font-size: 0.85rem; color: var(--text-soft); text-align: center;
  }
  .delivery-info strong { color: var(--plum); }
  .continue-shopping { display: flex; align-items: center; gap: 6px; color: var(--text-soft); font-size: 0.88rem; text-decoration: none; transition: color 0.2s; }
  .continue-shopping:hover { color: var(--rose); }
`;

export default function CartPage() {
  const [items, setItems] = useState(initItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const updateQty = (id: number, delta: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ).filter(item => item.qty > 0));
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
    showToast("Item removed from cart");
  };

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const wrapFee = giftWrap ? 250 : 0;
  const delivery = subtotal > 5000 ? 0 : 350;
  const total = subtotal - discount + wrapFee + delivery;

  return (
    <>
      <style>{styles}</style>
      <Nav cartCount={items.length} />
      <div className="g-page">
        <div className="g-section" style={{ maxWidth: 1200 }}>
          <div className="g-breadcrumb" style={{ justifyContent: "flex-start", marginBottom: 24 }}>
            <a href="/">Home</a> › Cart
          </div>

          {items.length === 0 ? (
            <div className="g-empty">
              <span className="g-empty-icon">🛍️</span>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any gifts yet. Let's change that!</p>
              <Link href="/shop" className="g-btn g-btn-rose g-btn-lg">Browse Gifts ✨</Link>
            </div>
          ) : (
            <>
              <div className="cart-header">
                <h2>My Cart 🛍️</h2>
                <div className="cart-actions">
                  <Link href="/shop" className="continue-shopping">← Continue Shopping</Link>
                </div>
              </div>

              <div className="cart-layout">
                <div>
                  {items.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-img">{item.emoji}</div>
                      <div>
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">Rs. {(item.price * item.qty).toLocaleString()}</div>
                        <div className="qty-control" style={{ display: "inline-flex" }}>
                          <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                          <span className="qty-num">{item.qty}</span>
                          <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                        </div>
                        {item.note && <div className="cart-item-note">📝 {item.note}</div>}
                      </div>
                      <button className="remove-btn" onClick={() => removeItem(item.id)}>✕</button>
                    </div>
                  ))}

                  <div className="trust-badges">
                    {[
                      { icon: "🔒", text: "Secure Checkout" },
                      { icon: "🎀", text: "Free Gift Wrap" },
                      { icon: "🚀", text: "Fast Delivery" },
                    ].map((b, i) => (
                      <div key={i} className="trust-badge">
                        <span>{b.icon}</span><p>{b.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cart-right">
                  <div className="order-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row"><span>Subtotal ({items.length} items)</span><span>Rs. {subtotal.toLocaleString()}</span></div>
                    {promoApplied && <div className="summary-row" style={{ color: "var(--rose)" }}><span>Promo (GIFTLY10)</span><span>− Rs. {discount.toLocaleString()}</span></div>}
                    {giftWrap && <div className="summary-row"><span>Gift Wrapping 🎀</span><span>Rs. {wrapFee}</span></div>}
                    <div className="summary-row"><span>Delivery</span><span>{delivery === 0 ? <span style={{ color: "green" }}>FREE</span> : `Rs. ${delivery}`}</span></div>
                    <div className="summary-row total"><span>Total</span><span>Rs. {total.toLocaleString()}</span></div>

                    <div className="promo-row">
                      <input className="promo-input" placeholder="Promo code" value={promoCode} onChange={e => setPromoCode(e.target.value)} />
                      <button className="promo-btn" onClick={() => {
                        if (promoCode.toUpperCase() === "GIFTLY10") { setPromoApplied(true); showToast("🎉 10% discount applied!"); }
                        else showToast("Invalid promo code");
                      }}>Apply</button>
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 16 }}>Try code: GIFTLY10</p>
                  </div>

                  <div className={`gift-wrap${giftWrap ? " active" : ""}`} onClick={() => setGiftWrap(!giftWrap)}>
                    <span style={{ fontSize: "1.5rem" }}>🎀</span>
                    <div className="gift-wrap-text">
                      <strong>Add Gift Wrapping (+Rs. 250)</strong>
                      <span>Luxury paper, ribbon & gift tag included</span>
                    </div>
                    <span>{giftWrap ? "✅" : "⬜"}</span>
                  </div>

                  {delivery > 0 && (
                    <div className="delivery-info">
                      Add Rs. {(5001 - subtotal).toLocaleString()} more for <strong>FREE delivery</strong>!
                    </div>
                  )}

                  <Link href="/checkout" className="g-btn g-btn-rose g-btn-lg" style={{ width: "100%", justifyContent: "center", marginBottom: 12 }}>
                    Proceed to Checkout →
                  </Link>
                  <Link href="/shop" className="g-btn g-btn-outline g-btn-lg" style={{ width: "100%", justifyContent: "center" }}>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}
