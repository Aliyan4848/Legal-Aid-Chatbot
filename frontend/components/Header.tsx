import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-lg group-hover:shadow-premium transition-all duration-300">
            <span className="text-white font-bold text-lg">⚖️</span>
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-lg text-white">Legal Aid</div>
            <div className="text-xs text-primary-400">Pakistan</div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-slate-300 hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/chat"
            className="text-slate-300 hover:text-white transition-colors duration-200"
          >
            Chat
          </Link>
          <Link
            href="/about"
            className="text-slate-300 hover:text-white transition-colors duration-200"
          >
            About
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/chat"
            className="btn-primary hidden sm:inline-block text-sm py-2 px-4"
          >
            Get Legal Help
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 md:hidden">
            <nav className="flex flex-col p-4 gap-2">
              <Link
                href="/"
                className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/chat"
                className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chat
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link href="/chat" className="btn-primary w-full text-center" onClick={() => setMobileMenuOpen(false)}>
                Get Legal Help
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
