import Link from "next/link";
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { JSX } from "react";

export default function Header(): JSX.Element {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-purple-600">
        Janu Gift Shop
      </Link>

      {/* Search bar + icons */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-full py-1 px-3 w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <Link href="/cart">
          <ShoppingCartIcon className="w-6 h-6 text-gray-600 hover:text-purple-500 cursor-pointer" />
        </Link>
        <Link href="/account">
          <UserIcon className="w-6 h-6 text-gray-600 hover:text-purple-500 cursor-pointer" />
        </Link>
      </div>
    </header>
  );
}