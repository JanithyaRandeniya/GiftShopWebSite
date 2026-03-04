"use client";
import { Nav, Footer, Ribbon } from "../layout";

const team = [
  { name:"Priya Sharma", role:"Founder & CEO", emoji:"👩‍💼", bio:"Started Giftly in 2019 with a passion for making gifting meaningful." },
  { name:"Anika Perera", role:"Head of Curation", emoji:"👩‍🎨", bio:"Handpicks every product to ensure exceptional quality and beauty." },
  { name:"Rohan Malik", role:"Head of Delivery", emoji:"👨‍💻", bio:"Ensures every order arrives on time, perfectly wrapped." },
  { name:"Sara Nair", role:"Customer Happiness", emoji:"👩‍❤️‍💋‍👨", bio:"Dedicated to making every customer interaction feel special." },
];

const milestones = [
  { year:"2019", event:"Giftly Founded", desc:"Started in a small apartment with 5 gift box designs" },
  { year:"2020", event:"1,000 Orders", desc:"Reached our first major milestone during the holiday season" },
  { year:"2021", event:"Artisan Chocolates", desc:"Launched our signature handcrafted chocolate line" },
  { year:"2022", event:"Same-Day Delivery", desc:"Partnered with local couriers for lightning-fast delivery" },
  { year:"2023", event:"10,000 Happy Customers", desc:"A community of gift-givers who trust us with their special moments" },
  { year:"2024", event:"Award Winning", desc:"Won 'Best Gift Shop' at the National Retail Excellence Awards" },
];

const values = [
  { icon:"💝", title:"Made with Love", desc:"Every gift is curated and packed by hand with genuine care and attention to detail." },
  { icon:"🌿", title:"Sustainably Sourced", desc:"We partner with ethical suppliers and use eco-friendly packaging materials." },
  { icon:"✨", title:"Memorable Moments", desc:"We don't just sell gifts — we craft experiences that create lasting memories." },
  { icon:"🤝", title:"Community First", desc:"A portion of every sale goes to local women artisans and small businesses." },
];

const styles = `
  .about-hero {
    background: linear-gradient(135deg, #fff0f5 0%, #f5e8ff 60%, #fff8f0 100%);
    padding: 80px 48px; position: relative; overflow: hidden;
  }
  .about-hero-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  @media(max-width:900px){ .about-hero-inner { grid-template-columns: 1fr; } }
  .about-hero-text {}
  .about-hero-text h1 { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 3.8rem); color: var(--plum); line-height: 1.1; margin-bottom: 20px; }
  .about-hero-text h1 em { font-style: italic; color: var(--rose); display: block; }
  .about-hero-text p { color: var(--text-soft); line-height: 1.8; font-size: 1.05rem; margin-bottom: 28px; }
  .about-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .about-stat { background: white; border-radius: var(--radius-sm); padding: 20px 16px; text-align: center; box-shadow: var(--shadow-card); }
  .about-stat strong { display: block; font-family: var(--font-display); font-size: 1.8rem; color: var(--rose); }
  .about-stat span { font-size: 0.78rem; color: var(--text-soft); font-weight: 700; line-height: 1.3; display: block; }
  .about-hero-visual {
    background: white; border-radius: 24px; padding: 40px; text-align: center;
    box-shadow: var(--shadow-soft); position: relative;
  }
  .about-hero-visual::before {
    content: ''; position: absolute; inset: -2px; border-radius: 26px;
    background: linear-gradient(135deg, var(--rose-light), var(--plum-light));
    z-index: -1;
  }
  .hero-visual-emoji { font-size: 5rem; display: block; margin-bottom: 16px; }
  .hero-visual-quote {
    font-family: var(--font-display); font-style: italic; font-size: 1.15rem;
    color: var(--plum); line-height: 1.6;
  }
  .hero-visual-author { color: var(--rose); font-weight: 700; font-size: 0.9rem; margin-top: 12px; }
  .values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; }
  .value-card { background: white; border-radius: var(--radius); padding: 32px 24px; box-shadow: var(--shadow-card); border: 1px solid var(--border); }
  .value-icon { font-size: 2.5rem; display: block; margin-bottom: 14px; }
  .value-title { font-family: var(--font-display); font-size: 1.1rem; color: var(--plum); margin-bottom: 8px; }
  .value-desc { color: var(--text-soft); font-size: 0.88rem; line-height: 1.6; }
  .timeline { position: relative; padding: 40px 0; }
  .timeline::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: var(--rose-light); transform: translateX(-50%); }
  @media(max-width:768px){ .timeline::before { left: 24px; } }
  .tl-item { display: flex; justify-content: flex-end; padding-right: calc(50% + 32px); margin-bottom: 40px; position: relative; }
  .tl-item:nth-child(even) { justify-content: flex-start; padding-right: 0; padding-left: calc(50% + 32px); }
  @media(max-width:768px){
    .tl-item, .tl-item:nth-child(even) { justify-content: flex-start; padding-right: 0; padding-left: 60px; }
  }
  .tl-dot {
    position: absolute; left: 50%; top: 8px; transform: translateX(-50%);
    width: 14px; height: 14px; background: var(--rose); border-radius: 50%;
    border: 3px solid white; box-shadow: 0 0 0 3px var(--rose-light);
  }
  @media(max-width:768px){ .tl-dot { left: 24px; transform: translateX(-50%); } }
  .tl-card { background: white; border-radius: var(--radius-sm); padding: 20px 24px; box-shadow: var(--shadow-card); border: 1px solid var(--border); max-width: 360px; }
  .tl-year { color: var(--rose); font-weight: 800; font-size: 0.8rem; letter-spacing: 1px; margin-bottom: 4px; }
  .tl-event { font-weight: 700; color: var(--plum); margin-bottom: 4px; }
  .tl-desc { font-size: 0.85rem; color: var(--text-soft); line-height: 1.5; }
  .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; }
  .team-card {
    background: white; border-radius: var(--radius); padding: 32px 24px; text-align: center;
    box-shadow: var(--shadow-card); border: 1px solid var(--border); transition: all 0.3s;
  }
  .team-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); }
  .team-avatar {
    width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 16px;
    background: linear-gradient(135deg, var(--rose-pale), var(--plum-pale));
    display: flex; align-items: center; justify-content: center; font-size: 2.5rem;
    border: 3px solid white; box-shadow: 0 4px 16px rgba(232,84,122,0.2);
  }
  .team-name { font-weight: 700; color: var(--text); margin-bottom: 4px; }
  .team-role { color: var(--rose); font-size: 0.82rem; font-weight: 700; margin-bottom: 10px; }
  .team-bio { font-size: 0.85rem; color: var(--text-soft); line-height: 1.6; }
  .about-cta {
    background: linear-gradient(135deg, var(--rose) 0%, var(--plum) 100%);
    border-radius: 24px; padding: 64px; text-align: center; color: white;
  }
  .about-cta h2 { font-family: var(--font-display); font-size: 2.2rem; margin-bottom: 12px; }
  .about-cta p { opacity: 0.9; margin-bottom: 32px; }
  .about-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .values-bg { background: linear-gradient(180deg, var(--cream) 0%, #fff0f5 100%); }
`;

export default function AboutPage() {
  return (
    <>
      <style>{styles}</style>
      <Nav />
      <div className="g-page">
        <Ribbon />

        {/* HERO */}
        <div className="about-hero">
          <div className="about-hero-inner">
            <div className="about-hero-text">
              <div className="g-breadcrumb" style={{ justifyContent: "flex-start", marginBottom: 16 }}>
                <a href="/">Home</a> › About
              </div>
              <h1>We Believe Every<em>Moment Deserves</em>to Be Celebrated</h1>
              <p>Giftly was born from a simple belief: that thoughtful gifting has the power to strengthen bonds, express love, and make people feel truly seen.</p>
              <div className="about-stats">
                {[["10,000+","Happy Customers"],["5,000+","Gifts Delivered"],["4.9★","Average Rating"]].map(([val,label]) => (
                  <div key={label} className="about-stat"><strong>{val}</strong><span>{label}</span></div>
                ))}
              </div>
            </div>
            <div className="about-hero-visual">
              <span className="hero-visual-emoji">💝</span>
              <p className="hero-visual-quote">"A gift is not about the price tag — it's about the thought, the care, and the love wrapped inside."</p>
              <p className="hero-visual-author">— Priya Sharma, Founder</p>
            </div>
          </div>
        </div>

        {/* VALUES */}
        <div className="values-bg">
          <div className="g-section">
            <div className="g-section-head center">
              <span className="g-label">What Drives Us</span>
              <h2 className="g-title" id="story">Our Values</h2>
              <p className="g-sub">The principles behind every gift we create</p>
            </div>
            <div className="values-grid">
              {values.map((v,i) => (
                <div key={i} className="value-card">
                  <span className="value-icon">{v.icon}</span>
                  <div className="value-title">{v.title}</div>
                  <div className="value-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="g-section">
          <div className="g-section-head center">
            <span className="g-label">Our Journey</span>
            <h2 className="g-title">The Giftly Story</h2>
            <p className="g-sub">From a small idea to thousands of happy smiles</p>
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={i} className="tl-item">
                <div className="tl-dot" />
                <div className="tl-card">
                  <div className="tl-year">{m.year}</div>
                  <div className="tl-event">{m.event}</div>
                  <div className="tl-desc">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM */}
        <div className="values-bg">
          <div className="g-section">
            <div className="g-section-head center">
              <span className="g-label">The People</span>
              <h2 className="g-title" id="team">Meet the Team</h2>
              <p className="g-sub">The passionate people behind every perfectly wrapped gift</p>
            </div>
            <div className="team-grid">
              {team.map((t,i) => (
                <div key={i} className="team-card">
                  <div className="team-avatar">{t.emoji}</div>
                  <div className="team-name">{t.name}</div>
                  <div className="team-role">{t.role}</div>
                  <div className="team-bio">{t.bio}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="g-section">
          <div className="about-cta">
            <h2>Ready to Create a Memory?</h2>
            <p>Browse our full collection and find the perfect gift for someone special</p>
            <div className="about-cta-btns">
              <a href="/shop" className="g-btn g-btn-lg" style={{ background:"white", color:"var(--plum)", fontFamily:"var(--font-body)", fontWeight:700 }}>Browse All Gifts ✨</a>
              <a href="/gift-boxes" className="g-btn g-btn-lg g-btn-ghost">Explore Gift Boxes 🎁</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
