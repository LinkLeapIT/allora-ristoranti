'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, PackagePlus, List, PlusSquare } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/product', label: 'Products', icon: Package },
  { href: '/admin/product/new-product', label: 'New Product', icon: PackagePlus },
  { href: '/admin/categories', label: 'Categories', icon: List },
  { href: '/admin/categories/new', label: 'New Category', icon: PlusSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <nav>
        <ul>
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center p-4 text-gray-700 hover:bg-gray-200 ${
                  pathname === href ? 'bg-gray-200' : ''
                }`}
              >
                <Icon className="mr-2 h-5 w-5" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
