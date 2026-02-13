import type { Metadata } from "next";
import Link from "next/link";
import { EcoOpsLogo } from "@/components/ecoops/ecoops-logo";

export const metadata: Metadata = {
	title: "Case Studies",
	description:
		"In-depth case studies exploring the architecture, challenges, and solutions behind industrial IoT projects.",
};

interface CaseStudy {
	slug: string;
	title: string;
	description: string;
	client: string;
	duration: string;
	role: string;
	tags: string[];
	mediaComponent?: "ecoops-logo" | null;
}

const CASE_STUDIES: CaseStudy[] = [
	{
		slug: "swms-platform",
		title: "SWMS Platform",
		description:
			"Event-driven waste management platform automating C&D recycling operations through device orchestration and real-time trip lifecycle management.",
		client: "Sustainability Solutions Co.",
		duration: "4 years (architecture)",
		role: "System Architect",
		tags: [".NET Core", "Temporal.io", "Angular", "Industrial IoT"],
		mediaComponent: null,
	},
	{
		slug: "ecoops-dashboard",
		title: "EcoOps Dashboard",
		description:
			"C&D Recycling Facility Operations Management System transforming manual Excel workflows into a scalable web platform.",
		client: "Sustainability Solutions Co.",
		duration: "8 months",
		role: "Full Stack Developer",
		tags: ["Next.js 16", "Hono RPC", "Prisma", "Better Auth"],
		mediaComponent: "ecoops-logo",
	},
];

function CaseStudyMedia({ study, index }: { study: CaseStudy; index: number }) {
	if (study.mediaComponent === "ecoops-logo") {
		return (
			<div className="md:w-1/3 aspect-video rounded-md bg-gradient-to-br from-emerald-950/50 to-slate-900/80 flex items-center justify-center shrink-0 overflow-hidden border border-emerald-900/30">
				<EcoOpsLogo
					height={80}
					variant="full"
					animated={true}
					animationSpeed={0.6}
					enableGlow={true}
				/>
			</div>
		);
	}

	return (
		<div className="md:w-1/3 aspect-video rounded-md bg-muted/50 flex items-center justify-center shrink-0">
			<span className="text-4xl font-bold text-muted-foreground/30">
				{String(index + 1).padStart(2, "0")}
			</span>
		</div>
	);
}

export default function CaseStudiesPage() {
	return (
		<div className="pt-24 pb-16 px-6">
			<div className="mx-auto max-w-6xl">
				{/* Header */}
				<header className="mb-16">
					<p className="text-sm font-mono text-primary/70 tracking-widest uppercase mb-4">
						Case Studies
					</p>
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
						Deep Dives
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl">
						In-depth explorations of the architecture, challenges, and solutions
						behind industrial IoT projects.
					</p>
				</header>

				{/* Case Studies List */}
				<div className="space-y-8">
					{CASE_STUDIES.map((study, index) => (
						<Link
							key={study.slug}
							href={`/case-studies/${study.slug}`}
							className="group block p-8 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-all"
						>
							<div className="flex flex-col md:flex-row gap-8">
								{/* Preview */}
								<CaseStudyMedia study={study} index={index} />

								{/* Content */}
								<div className="flex-1">
									<h2 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
										{study.title}
									</h2>
									<p className="text-muted-foreground mb-6 leading-relaxed">
										{study.description}
									</p>

									{/* Meta */}
									<div className="grid grid-cols-3 gap-4 mb-6 text-sm">
										<div>
											<span className="text-muted-foreground/70 block mb-1">
												Client
											</span>
											<span className="text-foreground">{study.client}</span>
										</div>
										<div>
											<span className="text-muted-foreground/70 block mb-1">
												Duration
											</span>
											<span className="text-foreground">{study.duration}</span>
										</div>
										<div>
											<span className="text-muted-foreground/70 block mb-1">
												Role
											</span>
											<span className="text-foreground">{study.role}</span>
										</div>
									</div>

									{/* Tags */}
									<div className="flex flex-wrap gap-2">
										{study.tags.map((tag) => (
											<span
												key={tag}
												className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
