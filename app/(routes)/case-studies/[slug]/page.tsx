import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EcoOpsLogo } from "@/components/ecoops/ecoops-logo";
import { ModuleArchitectureDiagram } from "@/components/ecoops/module-architecture-diagram";

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
		features?: {
			heroMedia?: "ecoops-logo";
			architectureDiagram?: "module-architecture";
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
			"C&D Recycling Facility Operations Management System transforming manual Excel workflows into a scalable web platform.",
		client: "Sustainability Solutions Company",
		duration: "8 months",
		role: "Full Stack Developer",
		stack: [
			"Next.js 16",
			"TypeScript",
			"Hono RPC",
			"Prisma",
			"PostgreSQL",
			"Better Auth",
			"React Query",
			"Tailwind CSS v4",
			"Recharts",
		],
		sections: {
			problem:
				"Recycling facility operations relied entirely on manual Excel-based workflows. Daily production metrics, material dispatches, equipment utilization, and manpower attendance were tracked across disconnected spreadsheets with no centralized visibility, audit trail, or role-based access control.",
			scope:
				"Build a modular operations management platform digitizing the complete C&D recycling workflow. Core modules: Production, Dispatch, Received Materials, Equipment Utilization, Manpower Attendance, and automated Inventory calculations. Foundational modules: dynamic Site Management and three-tier RBAC User Management.",
			architecture:
				"Next.js 16 App Router with Hono RPC endpoints replacing traditional REST. React Query for client-side state with automatic cache invalidation. Better Auth for session-based authentication with module permissions, operation permissions, and user-specific overrides. Prisma ORM with PostgreSQL. Background job processing for bulk imports and multi-format exports.",
			results:
				"Real-time operational visibility across all facility metrics. Dual data entry supporting web forms and bulk CSV/Excel import. Automated inventory calculations eliminating reconciliation errors. Complete audit trail for regulatory compliance. Role-based access control with site-level granularity.",
		},
		features: {
			heroMedia: "ecoops-logo",
			architectureDiagram: "module-architecture",
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

function HeroMedia({ feature }: { feature?: "ecoops-logo" }) {
	if (feature === "ecoops-logo") {
		return (
			<div className="mb-12 p-8 rounded-lg bg-gradient-to-br from-emerald-950/40 to-slate-900/60 border border-emerald-900/20 flex items-center justify-center">
				<EcoOpsLogo
					height={120}
					variant="full"
					animated={true}
					animationSpeed={0.5}
					enableGlow={true}
				/>
			</div>
		);
	}
	return null;
}

function ArchitectureDiagram({ feature }: { feature?: "module-architecture" }) {
	if (feature === "module-architecture") {
		return (
			<div className="mt-8 p-6 rounded-lg bg-slate-900/50 border border-slate-800/50">
				<p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-4">
					Module Relationships
				</p>
				<ModuleArchitectureDiagram />
			</div>
		);
	}
	return null;
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

				{/* Hero Media */}
				<HeroMedia feature={study.features?.heroMedia} />

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
						<ArchitectureDiagram
							feature={study.features?.architectureDiagram}
						/>
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
