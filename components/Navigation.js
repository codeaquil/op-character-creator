'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/character', label: 'Character', icon: '👤' },
    { href: '/form', label: 'Create', icon: '✏️' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="bg-outer-space shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">⚓</span>
            <span className="text-ripe-mango font-bold text-lg hidden sm:block">
              OP Character Creator
            </span>
            <span className="text-ripe-mango font-bold text-lg sm:hidden">
              OPCC
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex flex-col items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors
                    min-w-[60px] sm:min-w-[80px]
                    ${isActive 
                      ? 'bg-ripe-mango text-outer-space' 
                      : 'text-diamond hover:text-ripe-mango hover:bg-outer-space/50'
                    }
                  `}
                >
                  <span className="text-lg mb-1">{item.icon}</span>
                  <span className="hidden sm:block">{item.label}</span>
                  <span className="sm:hidden text-[10px]">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
