"use client";
import { useState } from "react";
import Nav from "@/src/components/nav";
import Footer from "@/src/components/footer";

const styles = `
  .settings-layout { display: grid; grid-template-columns: 240px 1fr; gap: 32px; align-items: start; }
  @media(max-width:900px){ .settings-layout { grid-template-columns: 1fr; } }
  .settings-sidebar {
    background: white; border-radius: var(--radius); border: 1px solid var(--border);
    padding: 8px; position: sticky; top: 90px;
  }
  .settings-nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 16px; border-radius: var(--radius-sm);
    cursor: pointer; transition: all 0.2s; font-weight: 600;
    font-size: 0.88rem; color: var(--text-soft); border: none;
    background: transparent; font-family: var(--font-body); width: 100%; text-align: left;
  }
  .settings-nav-item:hover { background: var(--rose-pale); color: var(--rose); }
  .settings-nav-item.active { background: var(--rose-pale); color: var(--rose); }
  .settings-nav-item span:first-child { font-size: 1.1rem; }
  .settings-panel { background: white; border-radius: var(--radius); border: 1px solid var(--border); overflow: hidden; }
  .settings-panel-header {
    padding: 24px 28px; border-bottom: 1px solid var(--border);
    background: linear-gradient(135deg, var(--rose-pale) 0%, var(--plum-pale) 100%);
  }
  .settings-panel-header h2 { font-family: var(--font-display); font-size: 1.5rem; color: var(--plum); }
  .settings-panel-header p { color: var(--text-soft); font-size: 0.88rem; margin-top: 4px; }
  .settings-body { padding: 28px; }
  .settings-section { margin-bottom: 36px; }
  .settings-section h3 { font-weight: 800; font-size: 0.8rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 16px; }
  .toggle-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 0; border-bottom: 1px solid var(--border);
  }
  .toggle-row:last-child { border-bottom: none; }
  .toggle-info strong { display: block; font-size: 0.92rem; font-weight: 700; color: var(--text); margin-bottom: 2px; }
  .toggle-info span { font-size: 0.82rem; color: var(--text-soft); }
  .toggle {
    width: 44px; height: 24px; background: var(--border); border-radius: 50px;
    position: relative; cursor: pointer; transition: background 0.25s; border: none; flex-shrink: 0;
  }
  .toggle.on { background: var(--rose); }
  .toggle-knob {
    position: absolute; top: 3px; left: 3px;
    width: 18px; height: 18px; border-radius: 50%; background: white;
    transition: transform 0.25s; box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  }
  .toggle.on .toggle-knob { transform: translateX(20px); }
  .avatar-section { display: flex; align-items: center; gap: 20px; margin-bottom: 28px; }
  .avatar-circle {
    width: 72px; height: 72px; border-radius: 50%;
    background: linear-gradient(135deg, var(--rose-pale), var(--plum-pale));
    display: flex; align-items: center; justify-content: center;
    font-size: 2.2rem; border: 3px solid white; box-shadow: var(--shadow-card);
    flex-shrink: 0;
  }
  .avatar-actions {}
  .avatar-actions strong { display: block; font-weight: 700; margin-bottom: 4px; }
  .avatar-actions p { font-size: 0.82rem; color: var(--text-soft); margin-bottom: 10px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media(max-width:600px){ .form-row { grid-template-columns: 1fr; } }
  .order-card {
    display: flex; align-items: center; gap: 16px; padding: 16px;
    background: var(--cream); border-radius: var(--radius-sm); margin-bottom: 12px;
    border: 1px solid var(--border);
  }
  .order-emoji { font-size: 2rem; width: 48px; text-align: center; flex-shrink: 0; }
  .order-info { flex: 1; }
  .order-info strong { display: block; font-weight: 700; font-size: 0.9rem; }
  .order-info span { font-size: 0.8rem; color: var(--text-soft); }
  .order-status {
    font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 50px;
  }
  .status-delivered { background: #e8f5e9; color: #2e7d32; }
  .status-transit { background: #fff8e1; color: #f57f17; }
  .status-processing { background: var(--rose-pale); color: var(--rose); }
  .address-card {
    background: var(--cream); border-radius: var(--radius-sm); padding: 20px;
    border: 1px solid var(--border); margin-bottom: 12px; position: relative;
  }
  .address-card .default-tag {
    position: absolute; top: 12px; right: 12px;
    background: var(--rose); color: white; font-size: 0.7rem;
    font-weight: 700; padding: 2px 10px; border-radius: 50px;
  }
  .address-card strong { display: block; font-weight: 700; margin-bottom: 4px; }
  .address-card p { font-size: 0.85rem; color: var(--text-soft); line-height: 1.6; }
  .danger-zone { border: 2px solid #ffebee; border-radius: var(--radius-sm); padding: 24px; }
  .danger-zone h4 { color: #c62828; font-weight: 700; margin-bottom: 8px; }
  .danger-zone p { font-size: 0.85rem; color: var(--text-soft); margin-bottom: 16px; }
  .btn-danger { background: #c62828; color: white; border: none; padding: 10px 24px; border-radius: 50px; font-family: var(--font-body); font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: background 0.2s; }
  .btn-danger:hover { background: #b71c1c; }
  .settings-page-title {
    font-family: var(--font-display); font-size: 2rem; color: var(--plum); margin-bottom: 6px;
  }
`;

type Tab = "profile"|"orders"|"addresses"|"notifications"|"privacy";

const Toggle = ({ initial = false }: { initial?: boolean }) => {
  const [on, setOn] = useState(initial);
  return (
    <button className={`toggle${on?" on":""}`} onClick={() => setOn(!on)}>
      <div className="toggle-knob" />
    </button>
  );
};

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const navItems: { key: Tab; icon: string; label: string }[] = [
    { key:"profile", icon:"👤", label:"My Profile" },
    { key:"orders", icon:"📦", label:"My Orders" },
    { key:"addresses", icon:"📍", label:"Addresses" },
    { key:"notifications", icon:"🔔", label:"Notifications" },
    { key:"privacy", icon:"🔒", label:"Privacy & Security" },
  ];

  const tabTitles: Record<Tab,{title:string,sub:string}> = {
    profile: { title:"My Profile", sub:"Manage your personal information" },
    orders: { title:"My Orders", sub:"Track and manage your purchases" },
    addresses: { title:"Saved Addresses", sub:"Manage your delivery addresses" },
    notifications: { title:"Notifications", sub:"Control how we contact you" },
    privacy: { title:"Privacy & Security", sub:"Keep your account safe" },
  };

  return (
    <>
      <style>{styles}</style>
      <Nav />
      <div className="g-page">
        <div className="g-section" style={{ maxWidth: 1100 }}>
          <div className="g-breadcrumb" style={{ justifyContent:"flex-start", marginBottom:24 }}>
            <a href="/">Home</a> › Settings
          </div>
          <h1 className="settings-page-title">Account Settings ⚙️</h1>
          <p style={{ color:"var(--text-soft)", marginBottom:36 }}>Manage your Giftly account preferences</p>

          <div className="settings-layout">
            <div className="settings-sidebar">
              {navItems.map(item => (
                <button key={item.key} className={`settings-nav-item${tab===item.key?" active":""}`} onClick={() => setTab(item.key)}>
                  <span>{item.icon}</span><span>{item.label}</span>
                </button>
              ))}
              <hr style={{ border:"none", borderTop:"1px solid var(--border)", margin:"8px 0" }} />
              <button className="settings-nav-item" style={{ color:"#c62828" }}>
                <span>🚪</span><span>Sign Out</span>
              </button>
            </div>

            <div className="settings-panel">
              <div className="settings-panel-header">
                <h2>{tabTitles[tab].title}</h2>
                <p>{tabTitles[tab].sub}</p>
              </div>
              <div className="settings-body">

                {tab === "profile" && (
                  <>
                    <div className="avatar-section">
                      <div className="avatar-circle">👩</div>
                      <div className="avatar-actions">
                        <strong>Priya Sharma</strong>
                        <p>Member since January 2023</p>
                        <button className="g-btn g-btn-ghost g-btn-sm">Change Photo</button>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="g-field"><label className="g-label-field">First Name</label><input className="g-input" defaultValue="Priya" /></div>
                      <div className="g-field"><label className="g-label-field">Last Name</label><input className="g-input" defaultValue="Sharma" /></div>
                    </div>
                    <div className="g-field"><label className="g-label-field">Email Address</label><input className="g-input" defaultValue="priya@example.com" type="email" /></div>
                    <div className="g-field"><label className="g-label-field">Phone Number</label><input className="g-input" defaultValue="+94 77 123 4567" /></div>
                    <div className="g-field"><label className="g-label-field">Birthday (for special offers 🎂)</label><input className="g-input" type="date" defaultValue="1995-03-15" /></div>
                    <button className="g-btn g-btn-rose" onClick={() => showToast("✅ Profile saved!")}>Save Changes</button>
                  </>
                )}

                {tab === "orders" && (
                  <>
                    {[
                      { id:"#GF-2841", name:"Luxury Pink Gift Box", emoji:"🎁", date:"Feb 28, 2026", status:"Delivered", statusClass:"status-delivered" },
                      { id:"#GF-2712", name:"Chocolate Truffle Set × 2", emoji:"🍫", date:"Mar 1, 2026", status:"In Transit", statusClass:"status-transit" },
                      { id:"#GF-2698", name:"Premium Love Box", emoji:"💝", date:"Mar 3, 2026", status:"Processing", statusClass:"status-processing" },
                    ].map(o => (
                      <div key={o.id} className="order-card">
                        <div className="order-emoji">{o.emoji}</div>
                        <div className="order-info">
                          <strong>{o.name}</strong>
                          <span>{o.id} · {o.date}</span>
                        </div>
                        <span className={`order-status ${o.statusClass}`}>{o.status}</span>
                      </div>
                    ))}
                    <button className="g-btn g-btn-outline g-btn-sm" style={{ marginTop:16 }}>View All Orders</button>
                  </>
                )}

                {tab === "addresses" && (
                  <>
                    <div className="address-card">
                      <span className="default-tag">Default</span>
                      <strong>Home 🏠</strong>
                      <p>42/A, Flower Road<br/>Colombo 03, Western Province<br/>Sri Lanka · +94 77 123 4567</p>
                    </div>
                    <div className="address-card">
                      <strong>Office 🏢</strong>
                      <p>Level 5, Liberty Plaza<br/>R.A. De Mel Mawatha, Colombo 03<br/>Sri Lanka · +94 11 234 5678</p>
                    </div>
                    <button className="g-btn g-btn-rose g-btn-sm" style={{ marginTop:8 }}>+ Add New Address</button>
                  </>
                )}

                {tab === "notifications" && (
                  <div className="settings-section">
                    {[
                      { label:"Order Updates", desc:"Delivery status and order confirmations", on:true },
                      { label:"Promotional Offers", desc:"Discounts and exclusive deals", on:true },
                      { label:"New Arrivals", desc:"Be first to know about new products", on:false },
                      { label:"Birthday Reminders", desc:"Remind me to send gifts on important dates", on:true },
                      { label:"Email Newsletter", desc:"Monthly gift inspiration & ideas", on:false },
                      { label:"SMS Notifications", desc:"Text alerts for delivery updates", on:true },
                    ].map((n,i) => (
                      <div key={i} className="toggle-row">
                        <div className="toggle-info"><strong>{n.label}</strong><span>{n.desc}</span></div>
                        <Toggle initial={n.on} />
                      </div>
                    ))}
                  </div>
                )}

                {tab === "privacy" && (
                  <>
                    <div className="settings-section">
                      <h3>Password</h3>
                      <div className="g-field"><label className="g-label-field">Current Password</label><input className="g-input" type="password" placeholder="••••••••" /></div>
                      <div className="form-row">
                        <div className="g-field"><label className="g-label-field">New Password</label><input className="g-input" type="password" placeholder="••••••••" /></div>
                        <div className="g-field"><label className="g-label-field">Confirm Password</label><input className="g-input" type="password" placeholder="••••••••" /></div>
                      </div>
                      <button className="g-btn g-btn-plum g-btn-sm" onClick={() => showToast("🔒 Password updated!")}>Update Password</button>
                    </div>
                    <div className="settings-section">
                      <h3>Privacy Controls</h3>
                      {[
                        { label:"Two-Factor Authentication", desc:"Extra security layer for your account", on:false },
                        { label:"Data Personalisation", desc:"Allow us to personalise your experience", on:true },
                        { label:"Analytics Cookies", desc:"Help us improve the site experience", on:true },
                      ].map((n,i) => (
                        <div key={i} className="toggle-row">
                          <div className="toggle-info"><strong>{n.label}</strong><span>{n.desc}</span></div>
                          <Toggle initial={n.on} />
                        </div>
                      ))}
                    </div>
                    <div className="danger-zone">
                      <h4>Danger Zone ⚠️</h4>
                      <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
                      <button className="btn-danger">Delete Account</button>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {toast && <div className="g-toast">{toast}</div>}
    </>
  );
}
