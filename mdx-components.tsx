import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: ({ children }) => (
			<h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">
				{children}
			</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-2xl font-semibold tracking-tight text-foreground mt-12 mb-4">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-xl font-medium text-foreground mt-8 mb-3">
				{children}
			</h3>
		),
		p: ({ children }) => (
			<p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
		),
		ul: ({ children }) => (
			<ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
				{children}
			</ul>
		),
		ol: ({ children }) => (
			<ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
				{children}
			</ol>
		),
		code: ({ children }) => (
			<code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">
				{children}
			</code>
		),
		pre: ({ children }) => (
			<pre className="p-4 rounded-lg bg-muted overflow-x-auto mb-4 font-mono text-sm">
				{children}
			</pre>
		),
		blockquote: ({ children }) => (
			<blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground my-4">
				{children}
			</blockquote>
		),
		a: ({ href, children }) => (
			<a
				href={href}
				className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
				target={href?.startsWith("http") ? "_blank" : undefined}
				rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
			>
				{children}
			</a>
		),
		...components,
	};
}
