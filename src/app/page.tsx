import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  CreditCard,
  Phone,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sparkles,
  Users,
  CheckCircle,
  ArrowRight,
  FileCheck,
  Globe2,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white py-20 lg:py-28 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Family-Owned & Operated • Over 15 Years of Excellence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Full-Service Remote <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Accounting & Bookkeeping
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Florida-based accounting firm delivering nationwide services to small and medium
            businesses. We maintain your books, minimize your tax liability under the law, and
            provide actionable financial clarity.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link
              href="/consultation"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Consultation</span>
            </Link>

            <Link
              href="/pay"
              className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm transition-all flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Online Payment Center</span>
            </Link>

            <a
              href="tel:8135329928"
              className="px-5 py-3.5 rounded-xl text-slate-300 hover:text-white font-medium text-sm flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>813.532.9928</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="pt-10 border-t border-slate-800/80 flex flex-wrap justify-center gap-6 sm:gap-10 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Free Business Review Included</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-blue-400" />
              <span>English, Russian, Ukrainian & Polish</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Flat Monthly Fee ($250 - $600)</span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION CARDS */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
              1
            </div>
            <h3 className="font-bold text-lg text-slate-900">Free Business Review</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We conduct a complete review of your financial operation at no cost, analyzing P&L
              statements against federal, state, and county tax standards.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">
              2
            </div>
            <h3 className="font-bold text-lg text-slate-900">Substantial Fee Savings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We handle routine bookkeeping, payroll, and monthly reconciliations without costly CPA
              hourly rates, significantly cutting accounting overhead.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 font-bold">
              3
            </div>
            <h3 className="font-bold text-lg text-slate-900">Book Clean-Up & Catch-Up</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Behind on your books? We quickly untangle messy records, reconcile missing
              transactions, and bring your financials up to date with zero stress.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section id="what-we-do" className="py-16 px-4 sm:px-8 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Core Capabilities
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              What We Do For Your Business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <FileCheck className="w-8 h-8 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Full-Cycle Bookkeeping</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From daily data entry and bank reconciliations to monthly financial statement
                preparation and annual business income tax returns.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>General Ledger & Reconciliations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Payroll Management & Filing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Profit & Loss / Balance Sheet</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">Valuable Financial Insight</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advising you on choosing a legal entity, business model selection, cost analysis,
                cash flow forecasting, and debt restructuring.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cash Flow Forecasting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Entity Selection & Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Business Loan Paperwork Assistance</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-8 h-8 text-purple-600" />
              <h3 className="text-lg font-bold text-slate-900">Convenient & Tailored</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Secure remote workflows adapted to your schedule. We interface via email, secure
                document portal, or direct QuickBooks access.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600" />
                  <span>QuickBooks Online & Desktop</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600" />
                  <span>Dedicated Personal Cabinet Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600" />
                  <span>No Long-Term Contracts Required</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHOM WE CAN HELP */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Specialized Expertise
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Whom We Can Help
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              We specialize in custom financial management for business owners with specific
              regulatory requirements.
            </p>
          </div>
          <Link
            href="/whom-we-can-help"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            <span>Learn more about our client profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-slate-900">E-2 Treaty Investors</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Foreign national investors establishing or acquiring businesses in the US needing
              compliant bookkeeping.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-slate-900">Small Businesses</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              $300,000 to $2.5M in sales volume seeking dedicated financial tracking without hiring
              in-house staff.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-slate-900">New Startups</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Founders needing advice on legal entity registration, business planning, and chart of
              accounts setup.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-slate-900">Loan & Grant Applicants</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Businesses applying for federal or state funding needing certified P&L records and
              supporting docs.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING & PAYMENT PROMO */}
      <section className="py-16 px-4 sm:px-8 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Simple Fee Structure
            </h2>
            <h3 className="text-3xl font-extrabold tracking-tight">
              Flat Monthly Retainer or Transparent Hourly
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Whenever possible, we place our clients on a predictable monthly flat fee—usually
              between <strong>$250 and $600/mo</strong> based on transaction volume. If an hourly
              model is preferred, you receive a guaranteed hour estimate upfront.
            </p>
            <div className="pt-2">
              <Link
                href="/pay"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wide shadow-md transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>Visit Online Payment Center</span>
              </Link>
            </div>
          </div>

          <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Accepted Payment Methods
            </h4>
            <p className="text-xs text-slate-300">
              Existing clients can pay agreed fees directly online through our secure portal:
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 font-medium">
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-700/60 text-center">
                Visa & Mastercard
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-700/60 text-center">
                American Express
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-700/60 text-center">
                Debit Cards
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-700/60 text-center">
                PayPal
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Verified References
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            What Clients Say About Us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
              &quot;I&apos;ve worked with people from this company since 2007. They are very clever,
              resourceful, and professional. The results of my dealings with them exceeded my
              expectations. Most importantly, they saved me a substantial amount of money by getting
              to know all aspects of my business.&quot;
            </p>
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
              <div>
                <strong className="block text-slate-900">Olga Parsamyan</strong>
                <span className="text-slate-500">CEO, RUMED, Inc.</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-medium text-[11px]">
                Business Review
              </span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
              &quot;They are always there for me whenever monthly recording routine feels overwhelming,
              be it payroll or taxes. They look after my books in a timely, organized manner and I know
              my reporting is in safe hands.&quot;
            </p>
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
              <div>
                <strong className="block text-slate-900">Sandra Kinderyte</strong>
                <span className="text-slate-500">President, Quality Care, Inc.</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-medium text-[11px]">
                Bookkeeping & Reporting
              </span>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/references"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            <span>Read all client references & contact information</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* FINAL CONSULTATION CTA */}
      <section className="bg-blue-600 text-white py-14 px-4 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Ready to Get Your Financials in Order?
          </h2>
          <p className="text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Schedule a free consultation and business review. No long-term commitments, no hidden
            fees.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/consultation"
              className="px-6 py-3 rounded-xl bg-white text-blue-600 font-bold text-xs uppercase tracking-wider shadow-md hover:bg-blue-50 transition-all"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:8135329928"
              className="px-6 py-3 rounded-xl bg-blue-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-800 transition-all"
            >
              Call 813.532.9928
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
