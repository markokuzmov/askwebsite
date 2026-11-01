'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, Menu, X, CreditCard, Calendar, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a
              href="tel:8135329928"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>813.532.9928</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a
              href="mailto:info@ask-for-solutions.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors hidden sm:flex"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>info@ask-for-solutions.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-[11px] hidden md:inline">
              Languages: English • Русский • Українська
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <Link
              href="/pay"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Payment Center</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex flex-col">
          <span className="font-bold text-xl tracking-tight text-slate-900">
            ASK <span className="text-blue-600">Business Solutions</span>
          </span>
          <span className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
            Full-Service Remote Accounting & Bookkeeping
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          <Link href="/#what-we-do" className="hover:text-blue-600 transition-colors">
            What We Do
          </Link>
          <Link href="/whom-we-can-help" className="hover:text-blue-600 transition-colors">
            Whom We Can Help
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-blue-600 transition-colors py-2">
              <span>Services</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in duration-150">
                <Link
                  href="/financial-planning"
                  className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors text-xs font-medium"
                >
                  Bookkeeping & Reporting
                </Link>
                <Link
                  href="/financial-planning"
                  className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors text-xs font-medium"
                >
                  Business Review & Analysis
                </Link>
                <Link
                  href="/financial-planning"
                  className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors text-xs font-medium"
                >
                  Planning & Setting Up
                </Link>
                <Link
                  href="/financial-planning"
                  className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors text-xs font-medium"
                >
                  Business Model Optimization
                </Link>
              </div>
            )}
          </div>

          <Link href="/about-us" className="hover:text-blue-600 transition-colors">
            About Us
          </Link>
          <Link href="/references" className="hover:text-blue-600 transition-colors">
            References
          </Link>
          <Link href="/faq" className="hover:text-blue-600 transition-colors">
            FAQ
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/pay"
            className="text-xs font-semibold px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5 text-slate-500" />
            <span>Pay Online</span>
          </Link>
          <Link
            href="/consultation"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-xs hover:shadow transition-all flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Free Consultation</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-5 shadow-lg space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-slate-800">
            <Link
              href="/#what-we-do"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              What We Do
            </Link>
            <Link
              href="/whom-we-can-help"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              Whom We Can Help
            </Link>
            <Link
              href="/financial-planning"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              Services
            </Link>
            <Link
              href="/about-us"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              About Us
            </Link>
            <Link
              href="/references"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              References & Testimonials
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              FAQ
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/consultation"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-sm font-semibold py-2.5 rounded-lg bg-blue-600 text-white shadow-xs"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/pay"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-sm font-semibold py-2.5 rounded-lg border border-slate-200 text-slate-700 bg-slate-50"
            >
              Online Payment Center
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
