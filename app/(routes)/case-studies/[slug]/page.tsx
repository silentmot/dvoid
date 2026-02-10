import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Placeholder case study data - replace with MDX loader
const CASE_STUDIES: Record<
	string,
	{
		title: string;
		description: string;
		client: string;
		duration: string;
		role: string;
		stack: string[];
		sections: {
			problem: string;
			scope: string;
			architecture: string;
			results: string;
		};
	}
> = {
	"swms-platform": {
		title: "SWMS Platform",
		description:
			"Smart Waste Management System automating C&D recycling facility operations through 4-stage workflow orchestration.",
		client: "Saudi Waste Management Company",
		duration: "4 years (ongoing)",
		role: "Technical Operations Specialist",
		stack: [
			"NestJS",
			"Next.js",
			"PostgreSQL",
			"Prisma",
			"Redis",
			"Docker",
			"ZKTeco SDK",
			"Hikvision API",
			"Mettler Toledo DDE",
		],
		sections: {
			problem:
				"Manual tracking of waste trucks through recycling facilities led to inconsistent data, unauthorized access, and inaccurate weight measurements. The facility needed a unified system to manage gate access, weighbridge operations, and material processing.",
			scope:
				"Design and implement a 4-stage workflow orchestration system integrating access control (ZKTeco), camera systems (Hikvision), and weighing equipment (Mettler Toledo). The system must handle 24/7 operations with minimal downtime.",
			architecture:
				"Domain-Driven Design with event-sourced workflow states. NestJS backend with PostgreSQL for persistence, Redis for real-time events, and dedicated hardware integration services. Next.js frontend with real-time WebSocket updates.",
			results:
				"Automated processing of trucks through all 4 stages. Eliminated manual data entry errors. Real-time visibility into facility operations. Integration with 3 hardware vendor ecosystems.",
		},
	},
	"ecoops-dashboard": {
		title: "EcoOps Dashboard",
		description:
			"Operational command center providing real-time visibility into recycling facility operations.",
		client: "Internal Project",
		duration: "6 months",
		role: "Full Stack Developer",
		stack: [
			"Next.js",
			"TypeScript",
			"Prisma",
			"PostgreSQL",
			"WebSocket",
			"Chart.js",
			"Tailwind CSS",
		],
		sections: {
			problem:
				"Operations managers lacked real-time visibility into facility performance. Reports were generated manually and delivered with significant delays, making proactive decision-making impossible.",
			scope:
				"Build a real-time dashboard with fleet management, inventory control, operational analytics, and scheduling capabilities. Must support multiple user roles and work offline.",
			architecture:
				"Next.js App Router with server components for initial data load. WebSocket connections for real-time updates. Role-based access control with JWT. PWA capabilities for offline support.",
			results:
				"Real-time KPI visibility. Reduced report generation time from hours to seconds. Mobile-friendly interface for field operations. Export capabilities for stakeholder reporting.",
		},
	},
};

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const study = CASE_STUDIES[slug];

	if (!study) {
		return { title: "Case Study Not Found" };
	}

	return {
		title: study.title,
		description: study.description,
	};
}

export function generateStaticParams() {
	return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: PageProps) {
	const { slug } = await params;
	const study = CASE_STUDIES[slug];

	if (!study) {
		notFound();
	}

	return (
		<article className="pt-24 pb-16 px-6">
			<div className="mx-auto max-w-3xl">
				{/* Back Link */}
				<Link
					href="/case-studies"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
				>
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M7 16l-4-4m0 0l4-4m-4 4h18"
						/>
					</svg>
					Back to Case Studies
				</Link>

				{/* Header */}
				<header className="mb-12">
					<p className="text-sm font-mono text-primary/70 tracking-widest uppercase mb-4">
						Case Study
					</p>
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
						{study.title}
					</h1>
					<p className="text-lg text-muted-foreground leading-relaxed">
						{study.description}
					</p>
				</header>

				{/* Meta Grid */}
				<div className="grid grid-cols-3 gap-6 p-6 rounded-lg bg-card border border-border/50 mb-12">
					<div>
						<span className="text-xs font-mono text-muted-foreground/70 uppercase tracking-wider block mb-1">
							Client
						</span>
						<span className="text-sm text-foreground">{study.client}</span>
					</div>
					<div>
						<span className="text-xs font-mono text-muted-foreground/70 uppercase tracking-wider block mb-1">
							Duration
						</span>
						<span className="text-sm text-foreground">{study.duration}</span>
					</div>
					<div>
						<span className="text-xs font-mono text-muted-foreground/70 uppercase tracking-wider block mb-1">
							Role
						</span>
						<span className="text-sm text-foreground">{study.role}</span>
					</div>
				</div>

				{/* Content Sections */}
				<div className="space-y-12">
					<section>
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							Problem
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							{study.sections.problem}
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							Scope
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							{study.sections.scope}
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							Architecture
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							{study.sections.architecture}
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							Results
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							{study.sections.results}
						</p>
					</section>
				</div>

				{/* Tech Stack */}
				<div className="mt-12 pt-12 border-t border-border/50">
					<h3 className="text-sm font-mono text-muted-foreground/70 uppercase tracking-wider mb-4">
						Technology Stack
					</h3>
					<div className="flex flex-wrap gap-2">
						{study.stack.map((tech) => (
							<span
								key={tech}
								className="px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground"
							>
								{tech}
							</span>
						))}
					</div>
				</div>
			</div>
		</article>
	);
}
