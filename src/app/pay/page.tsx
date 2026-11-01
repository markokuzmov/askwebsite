'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CreditCard, ShieldCheck, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function PayPage() {
  const [amount, setAmount] = useState('250');
  const [clientName, setClientName] = useState('');
  const [invoiceRef, setInvoiceRef] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </Link>

      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Online Payment Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Pay for your accounting, bookkeeping, or consultation services securely.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
            <h2 className="text-xl font-bold text-slate-900">Payment Request Generated</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Ready to process payment of <strong className="text-slate-900">${amount}</strong> for{' '}
              <strong>{clientName || 'Valued Client'}</strong>.
            </p>
            <p className="text-xs text-slate-400">
              *(This can be directly connected to Stripe Checkout or Stripe Elements via API)*
            </p>
            <div className="pt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                Modify payment details
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Pre-Agreed Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  step="any"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg font-bold text-slate-900"
                  placeholder="250.00"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {['150', '250', '500', '1000'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`text-xs px-3 py-1 rounded-md border transition-colors ${
                      amount === val
                        ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Client / Company Name
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. John Doe / Rumed Inc."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Invoice or Service Reference (Optional)
                </label>
                <input
                  type="text"
                  value={invoiceRef}
                  onChange={(e) => setInvoiceRef(e.target.value)}
                  placeholder="e.g. Oct Monthly Retainer"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Total to Pay</span>
              <span className="text-2xl font-black text-slate-900">${amount || '0'}</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Lock className="w-4 h-4" />
              <span>Proceed to Secure Payment</span>
            </button>

            <div className="flex items-center justify-center gap-6 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>256-Bit SSL Encrypted</span>
              </span>
              <span>•</span>
              <span>Visa, Mastercard, Amex, PayPal</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
