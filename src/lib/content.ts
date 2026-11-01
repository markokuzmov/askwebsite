import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface PageMeta {
  title: string;
  slug: string;
  original_url?: string;
  date?: string;
  template?: string;
  content_source?: string;
}

export interface PostMeta {
  title: string;
  slug: string;
  original_url?: string;
  date?: string;
  slug_decoded?: string;
}

export interface ContentItem<T> {
  meta: T;
  content: string;
  html: string;
}

/**
 * Configure marked renderer for clean output
 */
marked.setOptions({
  gfm: true,
  breaks: true,
});

export function getAllPageSlugs(): string[] {
  const pagesDir = path.join(CONTENT_DIR, 'pages');
  if (!fs.existsSync(pagesDir)) return [];
  return fs
    .readdirSync(pagesDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export async function getPageBySlug(slug: string): Promise<ContentItem<PageMeta> | null> {
  const filePath = path.join(CONTENT_DIR, 'pages', `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const html = await marked.parse(content);

  return {
    meta: {
      title: data.title || slug,
      slug: data.slug || slug,
      original_url: data.original_url,
      date: data.date,
      template: data.template,
      content_source: data.content_source,
    },
    content,
    html,
  };
}

export function getAllPostSlugs(): string[] {
  const postsDir = path.join(CONTENT_DIR, 'posts');
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export async function getPostBySlug(slug: string): Promise<ContentItem<PostMeta> | null> {
  const filePath = path.join(CONTENT_DIR, 'posts', `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const html = await marked.parse(content);

  return {
    meta: {
      title: data.title || slug,
      slug: data.slug || slug,
      original_url: data.original_url,
      date: data.date,
      slug_decoded: data.slug_decoded,
    },
    content,
    html,
  };
}

export async function getAllPosts(): Promise<ContentItem<PostMeta>[]> {
  const slugs = getAllPostSlugs();
  const posts: ContentItem<PostMeta>[] = [];
  for (const s of slugs) {
    const post = await getPostBySlug(s);
    if (post) posts.push(post);
  }
  // Sort descending by date
  return posts.sort((a, b) => {
    const da = a.meta.date ? new Date(a.meta.date).getTime() : 0;
    const db = b.meta.date ? new Date(b.meta.date).getTime() : 0;
    return db - da;
  });
}
