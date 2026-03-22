"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/src/context/CartContext";

export default function Nav() {
  const path = usePathname();
  const { cartCount } = useCart();

  const links = [
    { href: "/shop",          label: "Shop"       },
    { href: "/gift-boxes",    label: "Gift Boxes" },
    { href: "/chocolates",    label: "Chocolates" },
    { href: "/explore-gifts", label: "Explore"    },
    { href: "/about",         label: "About"      },
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