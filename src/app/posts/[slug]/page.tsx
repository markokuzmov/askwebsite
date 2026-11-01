import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug } from '@/lib/content';
import { ChevronRight, Calendar, ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: `${post.meta.title} | ASK Business Solutions`,
    description: `Article from ASK Business Solutions: ${post.meta.title}`,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-8">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/faq" className="hover:text-blue-600 transition-colors">
          Advice & FAQ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-medium truncate">{post.meta.title}</span>
      </nav>

      <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-100 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          {post.meta.title}
        </h1>

        {post.meta.date && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium pb-4 border-b border-slate-100">
            <Calendar className="w-3.5 h-3.5" />
            <span>Published: {new Date(post.meta.date).toLocaleDateString()}</span>
          </div>
        )}

        <article
          className="mt-6 text-slate-700 leading-relaxed space-y-4 text-base
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-6 [&_h2]:mb-3
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:mt-5 [&_h3]:mb-2
            [&_p]:text-slate-600 [&_p]:leading-relaxed
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:text-slate-600
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:text-slate-600
            [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:bg-blue-50/50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-lg [&_blockquote]:italic
            [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-blue-800"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>

      <div className="flex justify-between items-center">
        <Link
          href="/faq"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to FAQ & Advice</span>
        </Link>
      </div>
    </div>
  );
}
