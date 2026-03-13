"use client";

export default function Ribbon() {
  const items = [
    "✦ FREE GIFT WRAPPING",
    "✦ SAME-DAY DELIVERY",
    "✦ CUSTOM MESSAGES",
    "✦ LUXURY PACKAGING",
    "✦ 100% HANDCRAFTED",
  ];
  return (
    <div className="g-ribbon">
      <div className="g-ribbon-inner">
        {[0, 1].map(r => (
          <span key={r} style={{ display: "flex", gap: "60px" }}>
            {items.map((it, i) => <span key={i}>{it}</span>)}
          </span>
        ))}
      </div>
    </div>
  );
}