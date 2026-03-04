"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav({ cartCount = 0 }: { cartCount?: number }) {
  const path = usePathname();
  const links = [
    { href: "/shop", label: "Shop" },
    { href: "/gift-boxes", label: "Gift Boxes" },
    { href: "/chocolates", label: "Chocolates" },
    { href: "/explore-gifts", label: "Explore" },
    { href: "/about", label: "About" },
  ];
  return (
    <nav className="g-nav">
      <Link href="/" className="g-nav-logo">Gift<span>ly</span> ✦</Link>
      <ul className="g-nav-links">
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} className={path?.startsWith(l.href) ? "active" : ""}>{l.label}</Link>
          </li>
        ))}
      </ul>
      <div className="g-nav-actions">
        <Link href="/cart" className="g-nav-icon">
          🛍️
          {cartCount > 0 && <span className="g-badge">{cartCount}</span>}
        </Link>
        <Link href="/settings" className="g-nav-icon">⚙️</Link>
        <Link href="/shop" className="g-nav-btn">Shop Now</Link>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="g-footer">
      <div className="g-footer-grid">
        <div>
          <Link href="/" className="g-footer-logo">Gift<span>ly</span> ✦</Link>
          <p className="g-footer-about">
            Beautifully curated gifts for every celebration. Made with love, delivered with care.
          </p>
          <div className="g-footer-social">
            <a href="#">💌</a>
            <a href="#">📸</a>
            <a href="#">🐦</a>
            <a href="#">▶️</a>
          </div>
        </div>
        <div className="g-footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link href="/shop">All Products</Link></li>
            <li><Link href="/gift-boxes">Gift Boxes</Link></li>
            <li><Link href="/chocolates">Chocolates</Link></li>
            <li><Link href="/explore-gifts">Explore More</Link></li>
          </ul>
        </div>
        <div className="g-footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="g-footer-col">
          <h4>Help</h4>
          <ul>
            <li><Link href="/settings">Account Settings</Link></li>
            <li><Link href="/cart">My Cart</Link></li>
          </ul>
        </div>
      </div>
      <div className="g-footer-bottom">
        <span>© 2026 Giftly. Made with 💗</span>
        <span><a href="#">Privacy</a> · <a href="#">Terms</a></span>
      </div>
    </footer>
  );
}

export function Ribbon() {
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