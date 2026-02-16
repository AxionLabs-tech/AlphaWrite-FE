import Link from "next/link";
import LandingNav from "@/app/components/LandingNav";
import Footer from "@/app/components/Footer";
import { BlogCard } from "@/app/components/BlogCard";
import { blogPosts } from "./posts";

export const metadata = {
  title: "Blog – AlphaWrite",
  description:
    "Discover the latest insights about AI writing, content humanization, and academic success.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F7F5FF] text-slate-900">
      <LandingNav />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Blog
          </h1>
          <p className="mt-2 text-slate-600 sm:text-lg">
            Discover the latest insights about AI writing, content humanization, and academic success.
          </p>
        </header>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
