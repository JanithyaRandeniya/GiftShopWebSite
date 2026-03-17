"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Nav from "@/src/components/nav";
import Ribbon from "@/src/components/ribbon";
import Footer from "@/src/components/footer";

const flavourOptions = [
  "Dark Chocolate","Milk Chocolate","White Chocolate",
  "Hazelnut Praline","Raspberry","Caramel","Pistachio",
  "Sea Salt","Mint","Coffee","Orange Zest","Champagne",
];
const packagingOptions = [
  "Luxury Satin Gift Box","Clear Window Box",
  "Wooden Crate","Custom Printed Box","Silk Ribbon Bag","Magnetic Closure Box",
];
const occasionOptions = [
  "Birthday","Anniversary","Wedding","Valentine's Day",
  "Thank You","Corporate Gift","Festival","Just Because",
];
const qtyOptions = ["1 Box (12 pcs)","1 Box (24 pcs)","2 Boxes","5 Boxes","10 Boxes","20+ Boxes (Bulk)"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&family=Mulish:wght@300;400;500;600;700&display=swap');

  .rcc-page { font-family: 'Mulish', sans-serif; background: #120808; min-height: 100vh; }

  /* ── HERO ── */
  .rcc-hero {
    background: linear-gradient(135deg, #120808 0%, #3d1a2e 40%, #5a2010 100%);
    padding: 80px 48px 64px; position: relative; overflow: hidden;
  }
  .rcc-hero::before {
    content: '🍫'; position: absolute; right: 5%; top: 50%;
    transform: translateY(-50%) rotate(20deg); font-size: 260px; opacity: 0.04; pointer-events: none;
  }
  .rcc-hero-inner { max-width: 860px; margin: 0 auto; position: relative; z-index: 1; }
  .g-breadcrumb { display: flex; gap: 6px; align-items: center; font-size: 0.82rem; color: rgba(255,200,160,0.45); margin-bottom: 18px; }
  .g-breadcrumb a { color: #d4956a; text-decoration: none; }

  .rcc-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(212,149,106,0.1); border: 1px solid rgba(212,149,106,0.22);
    color: #d4956a; font-size: 0.72rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; padding: 6px 16px; border-radius: 50px; margin-bottom: 20px;
  }
  .rcc-hero h1 {
    font-family: 'Bodoni Moda', serif;
    font-size: clamp(2.6rem, 5.5vw, 4.2rem);
    color: white; line-height: 1.1; margin-bottom: 16px;
  }
  .rcc-hero h1 em { font-style: italic; color: #d4956a; }
  .rcc-hero p { color: rgba(255,255,255,0.55); font-size: 1rem; max-width: 540px; line-height: 1.75; margin-bottom: 36px; }

  /* step pills */
  .rcc-step-row { display: flex; gap: 0; flex-wrap: nowrap; overflow-x: auto; }
  .rcc-step {
    display: flex; align-items: center; gap: 9px;
    padding: 9px 18px 9px 12px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(212,149,106,0.13);
    white-space: nowrap;
  }
  .rcc-step:first-child { border-radius: 50px 0 0 50px; }
  .rcc-step:last-child  { border-radius: 0 50px 50px 0; border-left: none; }
  .rcc-step:not(:first-child):not(:last-child) { border-left: none; }
  .rcc-step-num {
    width: 22px; height: 22px; border-radius: 50%;
    background: linear-gradient(135deg, #d4956a, #8a4020);
    color: white; font-size: 0.7rem; font-weight: 800;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .rcc-step-label { font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.55); }

  /* ── BODY ── */
  .rcc-body {
    max-width: 1120px; margin: 0 auto;
    padding: 60px 48px 80px;
    display: grid; grid-template-columns: 1fr 340px; gap: 36px; align-items: start;
  }
  @media(max-width:960px) { .rcc-body { grid-template-columns: 1fr; padding: 40px 24px; } }

  /* ── FORM CARD ── */
  .rcc-form-card {
    background: linear-gradient(160deg, #1e0c0c, #2d1020);
    border-radius: 28px; padding: 48px;
    border: 1px solid rgba(212,149,106,0.12);
    box-shadow: 0 24px 64px rgba(0,0,0,0.5);
  }
  @media(max-width:600px) { .rcc-form-card { padding: 28px 20px; } }

  /* section block */
  .rcc-block { margin-bottom: 38px; }
  .rcc-block:last-child { margin-bottom: 0; }
  .rcc-block-title {
    font-family: 'Bodoni Moda', serif; font-size: 1.1rem; color: white;
    margin-bottom: 20px; padding-bottom: 12px;
    border-bottom: 1px solid rgba(212,149,106,0.1);
    display: flex; align-items: center; gap: 10px;
  }
  .rcc-block-icon {
    width: 30px; height: 30px; border-radius: 50%;
    background: rgba(212,149,106,0.12); border: 1px solid rgba(212,149,106,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0;
  }

  /* fields */
  .rcc-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media(max-width:600px) { .rcc-row { grid-template-columns: 1fr; } }
  .rcc-field { margin-bottom: 18px; }
  .rcc-field:last-child { margin-bottom: 0; }
  .rcc-label {
    display: block; font-size: 0.78rem; font-weight: 700;
    color: rgba(255,255,255,0.5); letter-spacing: 0.6px;
    text-transform: uppercase; margin-bottom: 8px;
  }
  .rcc-input, .rcc-select, .rcc-textarea {
    width: 100%; background: rgba(255,255,255,0.04);
    border: 1.5px solid rgba(212,149,106,0.15); border-radius: 12px;
    padding: 13px 16px; font-family: 'Mulish', sans-serif;
    font-size: 0.9rem; color: rgba(255,255,255,0.85); outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .rcc-input::placeholder, .rcc-textarea::placeholder { color: rgba(255,255,255,0.2); }
  .rcc-input:focus, .rcc-select:focus, .rcc-textarea:focus {
    border-color: #d4956a; background: rgba(212,149,106,0.05);
  }
  .rcc-select option { background: #2d1020; color: white; }
  .rcc-textarea { resize: vertical; min-height: 108px; line-height: 1.65; }

  /* chips */
  .rcc-chips { display: flex; gap: 9px; flex-wrap: wrap; }
  .rcc-chip {
    padding: 7px 15px; border-radius: 50px; cursor: pointer;
    font-size: 0.8rem; font-weight: 600;
    border: 1.5px solid rgba(212,149,106,0.16);
    color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.03);
    transition: all 0.18s; user-select: none;
  }
  .rcc-chip:hover { border-color: #d4956a; color: rgba(255,255,255,0.8); }
  .rcc-chip.on { background: rgba(212,149,106,0.18); border-color: #d4956a; color: #d4956a; }

  /* budget slider */
  .rcc-slider-wrap { display: flex; align-items: center; gap: 16px; }
  .rcc-slider {
    flex: 1; appearance: none; height: 4px; border-radius: 4px;
    background: rgba(212,149,106,0.2); outline: none; cursor: pointer;
  }
  .rcc-slider::-webkit-slider-thumb {
    appearance: none; width: 20px; height: 20px; border-radius: 50%;
    background: linear-gradient(135deg, #d4956a, #8a4020);
    box-shadow: 0 2px 8px rgba(212,149,106,0.4); cursor: pointer;
  }
  .rcc-slider-val { min-width: 100px; text-align: right; color: #d4956a; font-weight: 700; font-size: 0.9rem; }

  /* submit */
  .rcc-submit {
    width: 100%; display: flex; align-items: center; justify-content: center; gap: 12px;
    background: linear-gradient(135deg, #d4956a 0%, #8a4020 100%);
    color: white; padding: 18px 40px; border-radius: 50px;
    font-family: 'Mulish', sans-serif; font-weight: 800; font-size: 1rem;
    border: none; cursor: pointer; margin-top: 8px;
    box-shadow: 0 8px 28px rgba(212,149,106,0.28);
    transition: all 0.28s; position: relative; overflow: hidden; letter-spacing: 0.3px;
  }
  .rcc-submit::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent); opacity: 0; transition: opacity 0.25s; }
  .rcc-submit:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(212,149,106,0.42); }
  .rcc-submit:hover::before { opacity: 1; }
  .rcc-submit-icon { width: 28px; height: 28px; background: rgba(255,255,255,0.18); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: transform 0.2s; }
  .rcc-submit:hover .rcc-submit-icon { transform: translateX(4px); }

  /* ── SIDEBAR ── */
  .rcc-sidebar { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 100px; }

  .rcc-scard {
    background: linear-gradient(160deg, #1e0c0c, #2d1020);
    border-radius: 22px; padding: 26px;
    border: 1px solid rgba(212,149,106,0.1);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }
  .rcc-scard-title {
    font-family: 'Bodoni Moda', serif; font-size: 1rem; color: white;
    margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
  }

  /* sample grid */
  .rcc-samples { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .rcc-sample-wrap { border-radius: 12px; overflow: hidden; height: 86px; position: relative; border: 1px solid rgba(212,149,106,0.1); }
  .rcc-sample-wrap img { object-fit: cover; }
  .rcc-sample-name { font-size: 0.7rem; color: rgba(255,255,255,0.38); font-weight: 600; margin-top: 5px; text-align: center; }

  /* why us */
  .rcc-why { list-style: none; display: flex; flex-direction: column; gap: 13px; }
  .rcc-why-item { display: flex; align-items: flex-start; gap: 11px; }
  .rcc-why-icon { width: 30px; height: 30px; border-radius: 9px; flex-shrink: 0; background: rgba(212,149,106,0.1); border: 1px solid rgba(212,149,106,0.18); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; }
  .rcc-why-text strong { display: block; font-size: 0.83rem; color: rgba(255,255,255,0.78); margin-bottom: 1px; }
  .rcc-why-text span { font-size: 0.75rem; color: rgba(255,255,255,0.38); line-height: 1.4; }

  /* review */
  .rcc-review { background: rgba(212,149,106,0.06); border: 1px solid rgba(212,149,106,0.12); border-radius: 16px; padding: 18px; }
  .rcc-review-stars { color: #f5c842; font-size: 0.82rem; margin-bottom: 8px; }
  .rcc-review-text { font-family: 'Bodoni Moda', serif; font-style: italic; color: rgba(255,255,255,0.65); font-size: 0.88rem; line-height: 1.6; margin-bottom: 10px; }
  .rcc-review-author { font-size: 0.74rem; color: #d4956a; font-weight: 700; }

  /* ── SUCCESS ── */
  .rcc-success { text-align: center; padding: 64px 40px; animation: fadeUp 0.5s ease; }
  @keyframes fadeUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform:translateY(0); } }
  .rcc-success-icon { font-size: 5rem; display: block; margin-bottom: 20px; }
  .rcc-success h2 { font-family: 'Bodoni Moda', serif; font-size: 2rem; color: white; margin-bottom: 12px; }
  .rcc-success p { color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 28px; max-width: 360px; margin-left: auto; margin-right: auto; }
  .rcc-back { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #d4956a, #8a4020); color: white; padding: 13px 28px; border-radius: 50px; font-family: 'Mulish', sans-serif; font-weight: 700; font-size: 0.9rem; text-decoration: none; transition: all 0.2s; }
  .rcc-back:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,149,106,0.35); }

  /* TOAST */
  .g-toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #1a0d0d, #d4956a); color: white; padding: 14px 28px; border-radius: 50px; font-family: 'Mulish', sans-serif; font-weight: 600; font-size: 0.9rem; box-shadow: 0 8px 24px rgba(0,0,0,0.4); z-index: 9999; animation: toastIn 0.3s ease; }
  @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }

  @media(max-width:768px) {
    .rcc-hero { padding: 56px 20px 48px; }
    .rcc-sidebar { position: static; }
  }
`;

export default function RequestCustomChocolatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [budget, setBudget] = useState(5000);
  const [flavours, setFlavours] = useState<string[]>([]);
  const [packaging, setPackaging] = useState("");
  const [occasion, setOccasion] = useState("");
  const [qty, setQty] = useState("");
  const [form, setForm] = useState({ name:"", email:"", phone:"", delivery:"", message:"" });

  const toggleFlavour = (f: string) =>
    setFlavours(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);

  return (
    <>
      <style>{styles}</style>
      <Nav cartCount={2} />
      <div className="rcc-page">
        <Ribbon />

        {/* HERO */}
        <div className="rcc-hero">
          <div className="rcc-hero-inner">
            <div className="g-breadcrumb">
              <a href="/">Home</a> › <a href="/chocolates">Chocolates</a> › Request Custom Box
            </div>
            <span className="rcc-eyebrow">✦ Bespoke Chocolate Service</span>
            <h1>Design Your <em>Custom</em><br />Chocolate Box 🍫</h1>
            <p>
              Choose your flavours, packaging &amp; occasion — and our artisan
              chocolatiers will handcraft a beautiful box made exclusively for you.
            </p>
            <div className="rcc-step-row">
              {["Fill the form","We quote within 24hr","You confirm","We craft & deliver"].map((s, i) => (
                <div key={s} className="rcc-step">
                  <div className="rcc-step-num">{i + 1}</div>
                  <span className="rcc-step-label">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rcc-body">

          {/* ── FORM ── */}
          <div className="rcc-form-card">
            {submitted ? (
              <div className="rcc-success">
                <span className="rcc-success-icon">🍫</span>
                <h2>Request Received!</h2>
                <p>Our chocolatiers will review your request and send you a personalised quote within 24 hours.</p>
                <Link href="/chocolates" className="rcc-back">← Back to Chocolates</Link>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>

                {/* PERSONAL DETAILS */}
                <div className="rcc-block">
                  <div className="rcc-block-title"><div className="rcc-block-icon">👤</div>Your Details</div>
                  <div className="rcc-row">
                    <div className="rcc-field">
                      <label className="rcc-label">Full Name *</label>
                      <input required className="rcc-input" placeholder="e.g. Priya Sharma"
                        value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
                    </div>
                    <div className="rcc-field">
                      <label className="rcc-label">Email Address *</label>
                      <input required type="email" className="rcc-input" placeholder="you@example.com"
                        value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
                    </div>
                  </div>
                  <div className="rcc-row">
                    <div className="rcc-field">
                      <label className="rcc-label">Phone Number</label>
                      <input className="rcc-input" placeholder="+94 77 000 0000"
                        value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
                    </div>
                    <div className="rcc-field">
                      <label className="rcc-label">Delivery Date Needed</label>
                      <input type="date" className="rcc-input"
                        value={form.delivery} onChange={e => setForm({...form, delivery:e.target.value})} />
                    </div>
                  </div>
                </div>

                {/* GIFT DETAILS */}
                <div className="rcc-block">
                  <div className="rcc-block-title"><div className="rcc-block-icon">🎁</div>Gift Details</div>
                  <div className="rcc-field">
                    <label className="rcc-label">Occasion</label>
                    <div className="rcc-chips">
                      {occasionOptions.map(o => (
                        <span key={o} className={`rcc-chip${occasion === o ? " on" : ""}`}
                          onClick={() => setOccasion(o === occasion ? "" : o)}>{o}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rcc-row" style={{ marginTop: 18 }}>
                    <div className="rcc-field">
                      <label className="rcc-label">Quantity</label>
                      <select className="rcc-select" value={qty} onChange={e => setQty(e.target.value)}>
                        <option value="">Select quantity...</option>
                        {qtyOptions.map(q => <option key={q}>{q}</option>)}
                      </select>
                    </div>
                    <div className="rcc-field">
                      <label className="rcc-label">Packaging Style</label>
                      <select className="rcc-select" value={packaging} onChange={e => setPackaging(e.target.value)}>
                        <option value="">Select packaging...</option>
                        {packagingOptions.map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* FLAVOURS */}
                <div className="rcc-block">
                  <div className="rcc-block-title"><div className="rcc-block-icon">🍫</div>Choose Flavours</div>
                  <div className="rcc-field">
                    <label className="rcc-label">Select as many as you like</label>
                    <div className="rcc-chips">
                      {flavourOptions.map(f => (
                        <span key={f} className={`rcc-chip${flavours.includes(f) ? " on" : ""}`}
                          onClick={() => toggleFlavour(f)}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BUDGET */}
                <div className="rcc-block">
                  <div className="rcc-block-title"><div className="rcc-block-icon">💰</div>Your Budget</div>
                  <div className="rcc-field">
                    <label className="rcc-label">Drag to set your budget</label>
                    <div className="rcc-slider-wrap">
                      <input type="range" className="rcc-slider"
                        min={1000} max={25000} step={500}
                        value={budget} onChange={e => setBudget(Number(e.target.value))} />
                      <span className="rcc-slider-val">Rs. {budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* SPECIAL REQUESTS */}
                <div className="rcc-block">
                  <div className="rcc-block-title"><div className="rcc-block-icon">✍️</div>Special Requests</div>
                  <div className="rcc-field">
                    <label className="rcc-label">Notes / Message for recipient</label>
                    <textarea className="rcc-textarea"
                      placeholder="Describe your vision — colour theme, dietary needs, personalised message, allergies, branding for corporate gifts..."
                      value={form.message} onChange={e => setForm({...form, message:e.target.value})} />
                  </div>
                </div>

                <button type="submit" className="rcc-submit">
                  Submit My Custom Request
                  <span className="rcc-submit-icon">→</span>
                </button>

              </form>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="rcc-sidebar">

            {/* samples */}
            <div className="rcc-scard">
              <div className="rcc-scard-title">🎨 Past Creations</div>
              <div className="rcc-samples">
                {[
                  { src:"/images/gifts/choco1.webp",      name:"Truffle Assortment" },
                  { src:"/images/gifts/boxwithflower1.jpg",name:"Floral Gift Box"    },
                  { src:"/images/gifts/black_box.jpg",     name:"Premium Dark Box"   },
                  { src:"/images/gifts/mensgift1.webp",    name:"Men's Gift Set"     },
                ].map(s => (
                  <div key={s.name}>
                    <div className="rcc-sample-wrap">
                      <Image src={s.src} alt={s.name} fill sizes="150px" style={{ objectFit:"cover" }} />
                    </div>
                    <div className="rcc-sample-name">{s.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* why us */}
            <div className="rcc-scard">
              <div className="rcc-scard-title">✦ Why Choose Us</div>
              <ul className="rcc-why">
                {[
                  ["🍫","Artisan Crafted","Every piece made by expert chocolatiers"],
                  ["⏱️","24hr Quote","Fast response to your request"],
                  ["🎀","Free Gift Wrap","Beautiful packaging always included"],
                  ["🚀","Fast Delivery","Order processed &amp; delivered swiftly"],
                  ["💬","Personal Contact","Dedicated support throughout"],
                ].map(([icon, title, desc]) => (
                  <li key={title} className="rcc-why-item">
                    <div className="rcc-why-icon">{icon}</div>
                    <div className="rcc-why-text">
                      <strong>{title}</strong>
                      <span dangerouslySetInnerHTML={{ __html: desc }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* review */}
            <div className="rcc-scard">
              <div className="rcc-scard-title">💬 Customer Review</div>
              <div className="rcc-review">
                <div className="rcc-review-stars">★★★★★</div>
                <p className="rcc-review-text">
                  &ldquo;I ordered a fully custom chocolate box for my wife&apos;s birthday — they nailed every detail. The packaging was stunning and the flavours were divine.&rdquo;
                </p>
                <div className="rcc-review-author">— Rohan M., Colombo</div>
              </div>
            </div>

          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}