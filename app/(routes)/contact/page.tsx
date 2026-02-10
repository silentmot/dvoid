import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Get in touch for project inquiries, collaborations, or just to say hello.",
};

export default function ContactPage() {
	return (
		<div className="pt-24 pb-16 px-6">
			<div className="mx-auto max-w-3xl">
				{/* Header */}
				<header className="mb-16">
					<p className="text-sm font-mono text-primary/70 tracking-widest uppercase mb-4">
						Contact
					</p>
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
						Get in Touch
					</h1>
					<p className="text-lg text-muted-foreground">
						Have a project in mind or want to discuss opportunities? I&apos;d
						love to hear from you.
					</p>
				</header>

				{/* Contact Methods */}
				<div className="grid md:grid-cols-2 gap-6 mb-16">
					<a
						href="mailto:contact@d-void.com"
						className="group p-6 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-all"
					>
						<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
							<svg
								className="w-6 h-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<h2 className="text-lg font-semibold text-foreground mb-2">
							Email
						</h2>
						<p className="text-sm text-muted-foreground">contact@d-void.com</p>
					</a>

					<a
						href="https://linkedin.com/in/dvoid"
						target="_blank"
						rel="noopener noreferrer"
						className="group p-6 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-all"
					>
						<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
							<svg
								className="w-6 h-6 text-primary"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</svg>
						</div>
						<h2 className="text-lg font-semibold text-foreground mb-2">
							LinkedIn
						</h2>
						<p className="text-sm text-muted-foreground">Connect with me</p>
					</a>

					<a
						href="https://github.com/dvoid"
						target="_blank"
						rel="noopener noreferrer"
						className="group p-6 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-all"
					>
						<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
							<svg
								className="w-6 h-6 text-primary"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
							</svg>
						</div>
						<h2 className="text-lg font-semibold text-foreground mb-2">
							GitHub
						</h2>
						<p className="text-sm text-muted-foreground">View my projects</p>
					</a>

					<div className="p-6 rounded-lg bg-card border border-border/50">
						<div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
							<svg
								className="w-6 h-6 text-muted-foreground"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</div>
						<h2 className="text-lg font-semibold text-foreground mb-2">
							Location
						</h2>
						<p className="text-sm text-muted-foreground">
							Riyadh, Saudi Arabia
						</p>
					</div>
				</div>

				{/* Availability */}
				<div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
					<div className="flex items-center gap-3 mb-3">
						<div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
						<span className="text-sm font-medium text-foreground">
							Available for Projects
						</span>
					</div>
					<p className="text-sm text-muted-foreground">
						I&apos;m currently open to new opportunities and collaborations.
						Response time is typically within 24-48 hours.
					</p>
				</div>
			</div>
		</div>
	);
}
