"use client";

export default function Ribbon() {
  return (
    <div className="g-ribbon">
      <div className="g-ribbon-inner">
        {[0, 1].map((r) => (
          <span key={r} style={{ display: "flex", gap: "60px" }}>
            <span>✦ FREE GIFT WRAPPING</span>
            <span>✦ SAME-DAY DELIVERY</span>
            <span>✦ CUSTOM MESSAGES</span>
            <span>✦ LUXURY PACKAGING</span>
            <span>✦ 100% HANDCRAFTED</span>
          </span>
        ))}
      </div>
    </div>
  );
}