"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders assistant-generated markdown with styles tuned for the chat thread:
 * tight paragraph rhythm, soft code blocks, refined lists, no surprise margins.
 */
export function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="prose-msg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-5 mb-2 text-[18px] font-semibold tracking-tight text-slate-900 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-5 mb-2 text-[16px] font-semibold tracking-tight text-slate-900 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-4 mb-1.5 text-[14px] font-semibold tracking-tight text-slate-900 first:mt-0">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="my-2 text-sm leading-relaxed text-slate-800 first:mt-0 last:mb-0">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-2.5 ml-4 list-disc space-y-1 text-sm leading-relaxed text-slate-800 marker:text-slate-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2.5 ml-4 list-decimal space-y-1 text-sm leading-relaxed text-slate-800 marker:text-slate-400">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#8B5CF6] underline decoration-violet-200 underline-offset-2 transition hover:decoration-[#8B5CF6]"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-2 border-violet-200 bg-violet-50/40 py-1 pl-3 text-sm italic text-slate-700">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className?.includes("language-");
            if (isInline) {
              return (
                <code
                  className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[12.5px] font-mono text-slate-800"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className={`block overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-[12.5px] leading-relaxed text-slate-100 ${className ?? ""}`}
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className="my-3 not-prose">{children}</pre>,
          hr: () => <hr className="my-4 border-slate-200" />,
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-slate-200 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {children}
            </thead>
          ),
          th: ({ children }) => <th className="px-3 py-2">{children}</th>,
          td: ({ children }) => (
            <td className="border-b border-slate-100 px-3 py-2 text-slate-700">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
