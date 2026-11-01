import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPageSlugs, getPageBySlug } from '@/lib/content';
import { ChevronRight, Calendar, ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPageSlugs();
  // Filter out 'home', which is handled by app/page.tsx
  return slugs
    .filter((s) => s !== 'home')
    .map((slug) => ({
      slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) {
    return { title: 'Page Not Found' };
  }
  return {
    title: `${page.meta.title} | ASK Business Solutions`,
    description: `ASK Business Solutions - ${page.meta.title}`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-8">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-medium truncate">{page.meta.title}</span>
      </nav>

      {/* Header Card */}
      <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-100 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          {page.meta.title}
        </h1>

        {page.meta.date && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium pb-4 border-b border-slate-100">
            <Calendar className="w-3.5 h-3.5" />
            <span>Updated: {new Date(page.meta.date).toLocaleDateString()}</span>
          </div>
        )}

        {/* Content Body */}
        <article
          className="mt-6 text-slate-700 leading-relaxed space-y-4 text-base
            [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:mt-8 [&_h1]:mb-4
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-6 [&_h2]:mb-3
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:mt-5 [&_h3]:mb-2
            [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-slate-900
            [&_h5]:text-sm [&_h5]:font-medium [&_h5]:text-blue-600 [&_h5]:uppercase [&_h5]:tracking-wider
            [&_p]:text-slate-600 [&_p]:leading-relaxed
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:text-slate-600
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:text-slate-600
            [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:bg-blue-50/50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-lg [&_blockquote]:italic [&_blockquote]:text-slate-700
            [&_table]:w-full [&_table]:border-collapse [&_table]:my-6
            [&_th]:bg-slate-50 [&_th]:border [&_th]:border-slate-200 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-xs [&_th]:text-slate-700
            [&_td]:border [&_td]:border-slate-200 [&_td]:p-3 [&_td]:text-sm [&_td]:text-slate-600
            [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium hover:[&_a]:text-blue-800
            [&_hr]:my-8 [&_hr]:border-slate-200
            [&_img]:rounded-xl [&_img]:shadow-sm [&_img]:my-4 [&_img]:max-w-full"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </div>

      {/* Back button */}
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
