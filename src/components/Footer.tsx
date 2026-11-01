import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: Brand & Bio */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <span className="font-bold text-xl text-white tracking-tight">
              ASK <span className="text-blue-500">Business Solutions</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            Florida-based family-owned remote accounting & bookkeeping firm with over 15 years
            of experience. Providing tailored financial management and tax minimization
            to businesses nationwide.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Certified Professional Bookkeeping</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
            Navigation
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/#what-we-do" className="hover:text-white transition-colors">
                What We Do
              </Link>
            </li>
            <li>
              <Link href="/whom-we-can-help" className="hover:text-white transition-colors">
                Whom We Can Help
              </Link>
            </li>
            <li>
              <Link href="/financial-planning" className="hover:text-white transition-colors">
                Services & Pricing
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/references" className="hover:text-white transition-colors">
                Client References & Testimonials
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Languages & Solutions */}
        <div>
          <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
            Multilingual Support
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            We proudly serve clients in multiple languages:
          </p>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li>🇺🇸 English</li>
            <li>🇷🇺 Русский (Russian)</li>
            <li>🇺🇦 Українська (Ukrainian)</li>
            <li>🇵🇱 Polski (Polish)</li>
          </ul>
          <div className="mt-5 pt-4 border-t border-slate-800">
            <Link
              href="/pay"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              <span>Online Payment Center</span>
            </Link>
          </div>
        </div>

        {/* Col 4: Contact info */}
        <div>
          <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
            Contact & Office
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>2820 Graphite Ct, Valrico, FL 33594-5043 USA</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <a href="tel:8135329928" className="hover:text-white transition-colors">
                813.532.9928
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <a href="mailto:info@ask-for-solutions.com" className="hover:text-white transition-colors">
                info@ask-for-solutions.com
              </a>
            </div>
            <div className="pt-2">
              <Link
                href="/consultation"
                className="inline-block text-xs font-semibold px-3 py-2 bg-slate-800 text-white hover:bg-slate-700 rounded-md transition-colors"
              >
                Schedule Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2026 ASK Business Solutions, LLC. All rights reserved.</span>
          <span className="text-slate-600">Privacy Policy • Remote Services Nationwide</span>
        </div>
      </div>
    </footer>
  );
}
