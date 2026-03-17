"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Nav from "@/src/components/nav";
import Ribbon from "@/src/components/ribbon";
import Footer from "@/src/components/footer";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,600;1,400&family=Manrope:wght@300;400;500;600;700&display=swap');

  .rcg-page { font-family: 'Manrope', sans-serif; background: #f8f7ff; min-height: 100vh; }

  /* ── HERO ── */
  .rcg-hero {
    background: linear-gradient(135deg, #f0eeff 0%, #fde8ef 40%, #fff8e0 100%);
    padding: 80px 48px 64px; position: relative; overflow: hidden;
  }
  .rcg-hero::before {
    content: '✨'; position: absolute; right: 6%; top: 50%;
    transform: translateY(-50%); font-size: 220px; opacity: 0.05; pointer-events: none;
  }
  .rcg-hero-inner { max-width: 860px; margin: 0 auto; position: relative; z-index: 1; }
  .g-breadcrumb { display: flex; gap: 6px; align-items: center; font-size: 0.82rem; color: #8080a8; margin-bottom: 18px; }
  .g-breadcrumb a { color: #7060d4; text-decoration: none; }

  .rcg-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(112,96,212,0.08); border: 1px solid rgba(112,96,212,0.18);
    color: #7060d4; font-size: 0.72rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; padding: 6px 16px; border-radius: 50px; margin-bottom: 20px;
  }
  .rcg-hero h1 {
    font-family: 'Bitter', serif; font-size: clamp(2.6rem, 5.5vw, 4rem);
    color: #2a2060; line-height: 1.1; margin-bottom: 16px;
  }
  .rcg-hero h1 em { font-style: italic; color: #7060d4; }
  .rcg-hero p { color: #5a5880; font-size: 1rem; max-width: 540px; line-height: 1.75; margin-bottom: 36px; }

  /* step pills */
  .rcg-steps { display: flex; gap: 0; flex-wrap: nowrap; overflow-x: auto; }
  .rcg-step {
    display: flex; align-items: center; gap: 9px;
    padding: 9px 18px 9px 12px;
    background: rgba(112,96,212,0.05);
    border: 1px solid rgba(112,96,212,0.13);
    white-space: nowrap;
  }
  .rcg-step:first-child { border-radius: 50px 0 0 50px; }
  .rcg-step:last-child  { border-radius: 0 50px 50px 0; border-left: none; }
  .rcg-step:not(:first-child):not(:last-child) { border-left: none; }
  .rcg-step-num {
    width: 22px; height: 22px; border-radius: 50%;
    background: linear-gradient(135deg, #7060d4, #4040a0);
    color: white; font-size: 0.7rem; font-weight: 800;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .rcg-step-label { font-size: 0.78rem; font-weight: 600; color: #6a6a9a; }

  /* ── BODY ── */
  .rcg-body {
    max-width: 1120px; margin: 0 auto;
    padding: 60px 48px 80px;
    display: grid; grid-template-columns: 1fr 340px; gap: 36px; align-items: start;
  }
  @media(max-width:960px) { .rcg-body { grid-template-columns: 1fr; padding: 40px 24px; } }

  /* ── FORM CARD ── */
  .rcg-form-card {
    background: white; border-radius: 28px; padding: 48px;
    border: 1px solid rgba(112,96,212,0.1);
    box-shadow: 0 12px 40px rgba(42,32,96,0.08);
  }
  @media(max-width:600px) { .rcg-form-card { padding: 28px 20px; } }

  .rcg-block { margin-bottom: 36px; }
  .rcg-block:last-child { margin-bottom: 0; }
  .rcg-block-title {
    font-family: 'Bitter', serif; font-size: 1.1rem; color: #2a2060;
    margin-bottom: 20px; padding-bottom: 12px;
    border-bottom: 1px solid rgba(112,96,212,0.08);
    display: flex; align-items: center; gap: 10px;
  }
  .rcg-block-icon {
    width: 30px; height: 30px; border-radius: 50%;
    background: rgba(112,96,212,0.08); border: 1px solid rgba(112,96,212,0.15);
    display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0;
  }

  .rcg-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media(max-width:600px) { .rcg-row { grid-template-columns: 1fr; } }
  .rcg-field { margin-bottom: 18px; }
  .rcg-field:last-child { margin-bottom: 0; }
  .rcg-label { display: block; font-size: 0.78rem; font-weight: 700; color: #8080a8; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 8px; }
  .rcg-input, .rcg-select, .rcg-textarea {
    width: 100%; background: #faf9ff;
    border: 1.5px solid rgba(112,96,212,0.15); border-radius: 12px;
    padding: 13px 16px; font-family: 'Manrope', sans-serif;
    font-size: 0.9rem; color: #2a2060; outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .rcg-input::placeholder, .rcg-textarea::placeholder { color: #c0c0d8; }
  .rcg-input:focus, .rcg-select:focus, .rcg-textarea:focus { border-color: #7060d4; background: #f5f0ff; }
  .rcg-textarea { resize: vertical; min-height: 108px; line-height: 1.65; }

  /* chips */
  .rcg-chips { display: flex; gap: 9px; flex-wrap: wrap; }
  .rcg-chip {
    padding: 7px 15px; border-radius: 50px; cursor: pointer;
    font-size: 0.8rem; font-weight: 600;
    border: 1.5px solid rgba(112,96,212,0.15);
    color: #6a6a9a; background: white;
    transition: all 0.18s; user-select: none;
  }
  .rcg-chip:hover { border-color: #7060d4; color: #4040a0; }
  .rcg-chip.on { background: rgba(112,96,212,0.08); border-color: #7060d4; color: #7060d4; }

  /* budget */
  .rcg-slider-wrap { display: flex; align-items: center; gap: 16px; }
  .rcg-slider { flex: 1; appearance: none; height: 4px; border-radius: 4px; background: rgba(112,96,212,0.15); outline: none; cursor: pointer; }
  .rcg-slider::-webkit-slider-thumb { appearance: none; width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, #7060d4, #4040a0); box-shadow: 0 2px 8px rgba(112,96,212,0.3); cursor: pointer; }
  .rcg-slider-val { min-width: 100px; text-align: right; color: #7060d4; font-weight: 700; font-size: 0.9rem; }

  /* gift type cards */
  .rcg-type-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
  .rcg-type-card {
    border: 1.5px solid rgba(112,96,212,0.15); border-radius: 14px;
    padding: 14px 10px; text-align: center; cursor: pointer;
    transition: all 0.2s; background: white;
  }
  .rcg-type-card:hover { border-color: #7060d4; transform: translateY(-2px); box-shadow: 0 6px 18px rgba(112,96,212,0.12); }
  .rcg-type-card.on { background: rgba(112,96,212,0.06); border-color: #7060d4; box-shadow: 0 6px 18px rgba(112,96,212,0.14); }
  .rcg-type-card-icon { font-size: 1.8rem; display: block; margin-bottom: 6px; }
  .rcg-type-card-label { font-size: 0.75rem; font-weight: 700; color: #2a2060; }

  /* submit */
  .rcg-submit {
    width: 100%; display: flex; align-items: center; justify-content: center; gap: 12px;
    background: linear-gradient(135deg, #7060d4 0%, #4040a0 100%);
    color: white; padding: 18px 40px; border-radius: 50px;
    font-family: 'Manrope', sans-serif; font-weight: 800; font-size: 1rem;
    border: none; cursor: pointer; margin-top: 8px;
    box-shadow: 0 8px 28px rgba(112,96,212,0.25);
    transition: all 0.28s; position: relative; overflow: hidden;
  }
  .rcg-submit::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent); opacity: 0; transition: opacity 0.25s; }
  .rcg-submit:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(112,96,212,0.38); }
  .rcg-submit:hover::before { opacity: 1; }
  .rcg-submit-icon { width: 28px; height: 28px; background: rgba(255,255,255,0.18); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: transform 0.2s; }
  .rcg-submit:hover .rcg-submit-icon { transform: translateX(4px); }

  /* ── SIDEBAR ── */
  .rcg-sidebar { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 100px; }
  .rcg-scard { background: white; border-radius: 22px; padding: 26px; border: 1px solid rgba(112,96,212,0.1); box-shadow: 0 6px 24px rgba(42,32,96,0.07); }
  .rcg-scard-title { font-family: 'Bitter', serif; font-size: 1rem; color: #2a2060; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }

  .rcg-samples { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .rcg-sample-wrap { border-radius: 12px; overflow: hidden; height: 86px; position: relative; border: 1px solid rgba(112,96,212,0.08); }
  .rcg-sample-name { font-size: 0.7rem; color: #a0a0c0; font-weight: 600; margin-top: 5px; text-align: center; }

  .rcg-why { list-style: none; display: flex; flex-direction: column; gap: 13px; }
  .rcg-why-item { display: flex; align-items: flex-start; gap: 11px; }
  .rcg-why-icon { width: 30px; height: 30px; border-radius: 9px; flex-shrink: 0; background: rgba(112,96,212,0.08); border: 1px solid rgba(112,96,212,0.15); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; }
  .rcg-why-text strong { display: block; font-size: 0.83rem; color: #2a2060; margin-bottom: 1px; }
  .rcg-why-text span { font-size: 0.75rem; color: #8080a8; line-height: 1.4; }

  .rcg-review { background: rgba(112,96,212,0.04); border: 1px solid rgba(112,96,212,0.1); border-radius: 16px; padding: 18px; }
  .rcg-review-stars { color: #f5c842; font-size: 0.82rem; margin-bottom: 8px; }
  .rcg-review-text { font-family: 'Bitter', serif; font-style: italic; color: #4a4870; font-size: 0.88rem; line-height: 1.6; margin-bottom: 10px; }
  .rcg-review-author { font-size: 0.74rem; color: #7060d4; font-weight: 700; }

  /* success */
  .rcg-success { text-align: center; padding: 64px 40px; animation: fadeUp 0.5s ease; }
  @keyframes fadeUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform:translateY(0); } }
  .rcg-success-icon { font-size: 5rem; display: block; margin-bottom: 20px; }
  .rcg-success h2 { font-family: 'Bitter', serif; font-size: 2rem; color: #2a2060; margin-bottom: 12px; }
  .rcg-success p { color: #5a5880; line-height: 1.7; margin-bottom: 28px; max-width: 360px; margin-left: auto; margin-right: auto; }
  .rcg-back { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #7060d4, #4040a0); color: white; padding: 13px 28px; border-radius: 50px; font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 0.9rem; text-decoration: none; transition: all 0.2s; }
  .rcg-back:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(112,96,212,0.3); }

  @media(max-width:768px) { .rcg-hero { padding: 56px 20px 48px; } .rcg-sidebar { position: static; } }
`;

const giftTypes = [
  { icon:"🎁", label:"Gift Box" },
  { icon:"🍫", label:"Chocolates" },
  { icon:"🧸", label:"Teddy Bear" },
  { icon:"☕", label:"Mug Set" },
  { icon:"🕯️", label:"Candles" },
  { icon:"💐", label:"Flowers" },
  { icon:"🍷", label:"Hamper" },
  { icon:"💎", label:"Jewellery" },
];

const occasionOptions = ["Birthday","Anniversary","Wedding","Valentine's Day","Thank You","Corporate Gift","New Baby","Festival","Just Because"];
const budgetPresets = ["Under Rs. 2,000","Rs. 2,000–4,000","Rs. 4,000–6,000","Rs. 6,000–10,000","Over Rs. 10,000"];

export default function RequestCustomGiftPage() {
  const [submitted, setSubmitted] = useState(false);
  const [budget, setBudget] = useState(5000);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [occasion, setOccasion] = useState("");
  const [form, setForm] = useState({ name:"", email:"", phone:"", delivery:"", recipient:"", message:"" });

  const toggleType = (t: string) =>
    setSelectedTypes(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);

  return (
    <>
      <style>{styles}</style>
      <Nav cartCount={2} />
      <div className="rcg-page">
        <Ribbon />

        {/* HERO */}
        <div className="rcg-hero">
          <div className="rcg-hero-inner">
            <div className="g-breadcrumb">
              <a href="/">Home</a> › <a href="/explore-gifts">Explore Gifts</a> › Request Custom Gift
            </div>
            <span className="rcg-eyebrow">✦ Personalised Gift Service</span>
            <h1>Request a <em>Custom</em><br />Gift Box ✨</h1>
            <p>
              Can&apos;t find exactly what you need? Tell us your vision — we&apos;ll curate
              a completely personalised gift box tailored to your person and your budget.
            </p>
            <div className="rcg-steps">
              {["Tell us your vision","We curate options","You choose & confirm","We wrap & deliver"].map((s, i) => (
                <div key={s} className="rcg-step">
                  <div className="rcg-step-num">{i + 1}</div>
                  <span className="rcg-step-label">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rcg-body">

          {/* ── FORM ── */}
          <div className="rcg-form-card">
            {submitted ? (
              <div className="rcg-success">
                <span className="rcg-success-icon">🎁</span>
                <h2>We Got Your Request!</h2>
                <p>Our gifting team will put together personalised options and reach out within 24 hours.</p>
                <Link href="/explore-gifts" className="rcg-back">← Back to Explore Gifts</Link>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>

                {/* YOUR DETAILS */}
                <div className="rcg-block">
                  <div className="rcg-block-title"><div className="rcg-block-icon">👤</div>Your Details</div>
                  <div className="rcg-row">
                    <div className="rcg-field">
                      <label className="rcg-label">Your Name *</label>
                      <input required className="rcg-input" placeholder="e.g. Anika Perera"
                        value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
                    </div>
                    <div className="rcg-field">
                      <label className="rcg-label">Email Address *</label>
                      <input required type="email" className="rcg-input" placeholder="you@example.com"
                        value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
                    </div>
                  </div>
                  <div className="rcg-row">
                    <div className="rcg-field">
                      <label className="rcg-label">Phone Number</label>
                      <input className="rcg-input" placeholder="+94 77 000 0000"
                        value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
                    </div>
                    <div className="rcg-field">
                      <label className="rcg-label">Delivery Date Needed</label>
                      <input type="date" className="rcg-input"
                        value={form.delivery} onChange={e => setForm({...form, delivery:e.target.value})} />
                    </div>
                  </div>
                </div>

                {/* GIFT INFO */}
                <div className="rcg-block">
                  <div className="rcg-block-title"><div className="rcg-block-icon">🎁</div>About the Gift</div>
                  <div className="rcg-field">
                    <label className="rcg-label">Who is this gift for?</label>
                    <input className="rcg-input" placeholder="e.g. My wife, best friend, colleague..."
                      value={form.recipient} onChange={e => setForm({...form, recipient:e.target.value})} />
                  </div>
                  <div className="rcg-field" style={{ marginTop: 4 }}>
                    <label className="rcg-label">Occasion</label>
                    <div className="rcg-chips">
                      {occasionOptions.map(o => (
                        <span key={o} className={`rcg-chip${occasion === o ? " on" : ""}`}
                          onClick={() => setOccasion(o === occasion ? "" : o)}>{o}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* GIFT TYPE */}
                <div className="rcg-block">
                  <div className="rcg-block-title"><div className="rcg-block-icon">🌟</div>What to Include</div>
                  <div className="rcg-field">
                    <label className="rcg-label">Select gift types (choose multiple)</label>
                    <div className="rcg-type-grid">
                      {giftTypes.map(t => (
                        <div key={t.label}
                          className={`rcg-type-card${selectedTypes.includes(t.label) ? " on" : ""}`}
                          onClick={() => toggleType(t.label)}>
                          <span className="rcg-type-card-icon">{t.icon}</span>
                          <span className="rcg-type-card-label">{t.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BUDGET */}
                <div className="rcg-block">
                  <div className="rcg-block-title"><div className="rcg-block-icon">💰</div>Your Budget</div>
                  <div className="rcg-field">
                    <label className="rcg-label">Drag to set your budget</label>
                    <div className="rcg-slider-wrap">
                      <input type="range" className="rcg-slider"
                        min={1000} max={25000} step={500}
                        value={budget} onChange={e => setBudget(Number(e.target.value))} />
                      <span className="rcg-slider-val">Rs. {budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="rcg-block">
                  <div className="rcg-block-title"><div className="rcg-block-icon">✍️</div>Your Vision</div>
                  <div className="rcg-field">
                    <label className="rcg-label">Tell us more</label>
                    <textarea className="rcg-textarea"
                      placeholder="Describe what you have in mind — the recipient's personality, favourite things, colour preferences, any allergies, personalised message, or any other details..."
                      value={form.message} onChange={e => setForm({...form, message:e.target.value})} />
                  </div>
                </div>

                <button type="submit" className="rcg-submit">
                  Submit My Gift Request
                  <span className="rcg-submit-icon">→</span>
                </button>
              </form>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="rcg-sidebar">

            <div className="rcg-scard">
              <div className="rcg-scard-title">🎨 Gift Inspirations</div>
              <div className="rcg-samples">
                {[
                  { src:"/images/gifts/boxwithflower1.jpg", name:"Floral Luxury Box" },
                  { src:"/images/gifts/choco1.webp",        name:"Chocolate Set"     },
                  { src:"/images/gifts/teddy1.webp",        name:"Teddy Bear Bundle" },
                  { src:"/images/gifts/lovemug.webp",       name:"Mug Keepsake"      },
                ].map(s => (
                  <div key={s.name}>
                    <div className="rcg-sample-wrap">
                      <Image src={s.src} alt={s.name} fill sizes="150px" style={{ objectFit:"cover" }} />
                    </div>
                    <div className="rcg-sample-name">{s.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rcg-scard">
              <div className="rcg-scard-title">✦ Why Choose Us</div>
              <ul className="rcg-why">
                {[
                  ["🎁","Fully Customised","Tailored to your exact vision"],
                  ["⏱️","24hr Response","We reply with options fast"],
                  ["🎀","Free Gift Wrap","Beautiful packaging always included"],
                  ["🚀","Fast Delivery","Order confirmed &amp; shipped swiftly"],
                  ["💬","Personal Touch","Dedicated team support throughout"],
                ].map(([icon, title, desc]) => (
                  <li key={title} className="rcg-why-item">
                    <div className="rcg-why-icon">{icon}</div>
                    <div className="rcg-why-text">
                      <strong>{title}</strong>
                      <span dangerouslySetInnerHTML={{ __html: desc }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rcg-scard">
              <div className="rcg-scard-title">💬 Happy Customer</div>
              <div className="rcg-review">
                <div className="rcg-review-stars">★★★★★</div>
                <p className="rcg-review-text">
                  &ldquo;I had no idea what to get — they curated the most beautiful gift box and she absolutely loved it. The personalised note made it unforgettable.&rdquo;
                </p>
                <div className="rcg-review-author">— Anika T., Kandy</div>
              </div>
            </div>

          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}