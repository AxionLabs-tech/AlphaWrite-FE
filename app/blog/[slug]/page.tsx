import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import LandingNav from "@/app/components/LandingNav";
import Footer from "@/app/components/Footer";
import { blogPosts } from "../posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} – AlphaWrite Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.imageUrl, alt: post.imageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#F7F5FF] text-slate-900">
      <LandingNav />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#8B5CF6]"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        {/* Preview image - hero at top of article */}
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
          <span className="absolute left-4 top-4 rounded-lg bg-slate-800/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        <article className="mt-8">
          <p className="text-sm text-slate-500">
            {post.date}
            <span className="mx-1.5" aria-hidden>•</span>
            {post.readTimeMinutes} min read
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {post.excerpt}
          </p>
          {post.body && post.body.length > 0 && (
            <div className="mt-8 space-y-6">
              {post.body.map((paragraph, i) => (
                <p key={i} className="text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
