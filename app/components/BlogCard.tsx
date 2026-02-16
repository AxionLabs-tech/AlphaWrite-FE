import Link from "next/link";
import Image from "next/image";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Full article body (paragraphs). Shown on the article page. */
  body?: string[];
  category: string;
  date: string;
  readTimeMinutes: number;
  imageUrl: string;
  imageAlt: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_8px_16px_-6px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_32px_-4px_rgba(15,23,42,0.1),0_12px_24px_-6px_rgba(15,23,42,0.06)]"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-t-2xl bg-slate-100">
        <Image
          src={post.imageUrl}
          alt={post.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-lg bg-slate-800/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs text-slate-500 sm:text-sm">
          {post.date}
          <span className="mx-1.5" aria-hidden>•</span>
          {post.readTimeMinutes} min read
        </p>
        <h3 className="mt-2 line-clamp-2 font-bold text-slate-900 group-hover:text-[#8B5CF6] sm:text-lg">
          {post.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-600">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
