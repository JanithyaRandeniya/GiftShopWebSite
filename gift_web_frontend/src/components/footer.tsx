import { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-purple-50 text-gray-700 py-8 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="font-bold mb-2">About</h3>
          <p>Your one-stop shop for gifts and surprises.</p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-2">Contact</h3>
          <p>Email: support@janugiftshop.com</p>
          <p>Phone: +94 71 234 5678</p>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-bold mb-2">Policies</h3>
          <p>Shipping | Returns | Privacy</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold mb-2">Newsletter</h3>
          <input
            type="email"
            placeholder="Your email"
            className="border rounded-full px-3 py-1 w-full"
          />
          <button className="mt-2 bg-purple-600 text-white px-4 py-1 rounded-full hover:bg-purple-700">
            Subscribe
          </button>
        </div>
      </div>

      <p className="text-center mt-8">&copy; 2026 Janu Gift Shop. All rights reserved.</p>
    </footer>
  );
}