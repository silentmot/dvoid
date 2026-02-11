import type { Metadata } from "next";
import Link from "next/link";
import { EcoOpsLogo } from "@/components/ecoops/ecoops-logo";

export const metadata: Metadata = {
	title: "Projects",
	description:
		"A collection of projects spanning industrial IoT, web applications, and developer tools.",
};

interface Project {
	slug: string;
	title: string;
	description: string;
	tags: string[];
	featured: boolean;
	previewComponent?: "ecoops-logo" | null;
}

const PROJECTS: Project[] = [
	{
		slug: "swms-platform",
		title: "SWMS Platform",
		description:
			"Smart Waste Management System automating C&D recycling facility operations through 4-stage workflow orchestration.",
		tags: ["NestJS", "Next.js", "PostgreSQL", "Industrial IoT"],
		featured: true,
		previewComponent: null,
	},
	{
		slug: "ecoops-dashboard",
		title: "EcoOps Dashboard",
		description:
			"C&D Recycling Facility Operations Management System transforming manual Excel workflows into a modular web platform with Hono RPC endpoints, three-tier RBAC, and automated inventory calculations.",
		tags: ["Next.js 16", "Hono RPC", "Prisma", "Better Auth", "React Query"],
		featured: true,
		previewComponent: "ecoops-logo",
	},
	{
		slug: "deskops",
		title: "DeskOps",
		description:
			"Desktop automation system for file organization with lifecycle-based processing.",
		tags: ["Automation", "PowerShell", "Node.js"],
		featured: false,
		previewComponent: null,
	},
];

function ProjectPreview({
	project,
}: {
	project: Project;
}) {
	if (project.previewComponent === "ecoops-logo") {
		return (
			<div className="aspect-video mb-4 rounded-md bg-gradient-to-br from-purple-950/40 via-blue-950/30 to-teal-950/40 border border-purple-900/20 flex items-center justify-center overflow-hidden">
				<EcoOpsLogo
					height={60}
					variant="full"
					animated={true}
					animationSpeed={0.6}
					enableGlow={true}
				/>
			</div>
		);
	}

	return (
		<div className="aspect-video mb-4 rounded-md bg-muted/50 flex items-center justify-center">
			<span className="text-sm text-muted-foreground">Preview</span>
		</div>
	);
}

export default function ProjectsPage() {
	const featuredProjects = PROJECTS.filter((p) => p.featured);
	const otherProjects = PROJECTS.filter((p) => !p.featured);

	return (
		<div className="pt-24 pb-16 px-6">
			<div className="mx-auto max-w-6xl">
				{/* Header */}
				<header className="mb-16">
					<p className="text-sm font-mono text-primary/70 tracking-widest uppercase mb-4">
						Projects
					</p>
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
						Selected Work
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl">
						A collection of projects spanning industrial IoT systems, web
						applications, and developer tools.
					</p>
				</header>

				{/* Featured Projects */}
				{featuredProjects.length > 0 && (
					<section className="mb-16">
						<h2 className="text-sm font-mono text-muted-foreground tracking-widest uppercase mb-8">
							Featured
						</h2>
						<div className="grid md:grid-cols-2 gap-6">
							{featuredProjects.map((project) => (
								<Link
									key={project.slug}
									href={`/case-studies/${project.slug}`}
									className="group block p-6 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-all"
								>
									<ProjectPreview project={project} />
									<h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
										{project.title}
									</h3>
									<p className="text-sm text-muted-foreground mb-4 leading-relaxed">
										{project.description}
									</p>
									<div className="flex flex-wrap gap-2">
										{project.tags.map((tag) => (
											<span
												key={tag}
												className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground"
											>
												{tag}
											</span>
										))}
									</div>
								</Link>
							))}
						</div>
					</section>
				)}

				{/* Other Projects */}
				{otherProjects.length > 0 && (
					<section>
						<h2 className="text-sm font-mono text-muted-foreground tracking-widest uppercase mb-8">
							Other Projects
						</h2>
						<div className="grid md:grid-cols-3 gap-6">
							{otherProjects.map((project) => (
								<div
									key={project.slug}
									className="p-6 rounded-lg bg-card border border-border/50"
								>
									<h3 className="text-lg font-semibold text-foreground mb-2">
										{project.title}
									</h3>
									<p className="text-sm text-muted-foreground mb-4 leading-relaxed">
										{project.description}
									</p>
									<div className="flex flex-wrap gap-2">
										{project.tags.map((tag) => (
											<span
												key={tag}
												className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
}
