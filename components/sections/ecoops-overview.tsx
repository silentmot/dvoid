"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { type FC, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface DashboardModule {
	id: string;
	title: string;
	description: string;
}

const DASHBOARD_MODULES: DashboardModule[] = [
	{
		id: "production",
		title: "Production Monitoring",
		description:
			"Daily crusher output metrics with material categorization and target tracking",
	},
	{
		id: "dispatch",
		title: "Dispatch Management",
		description:
			"Transaction records for material shipments with customer and vehicle tracking",
	},
	{
		id: "inventory",
		title: "Inventory System",
		description:
			"Automated stock calculations from transaction data with opening/closing reconciliation",
	},
	{
		id: "equipment",
		title: "Equipment Utilization",
		description:
			"Operational hours and count tracking organized by equipment type classification",
	},
	{
		id: "manpower",
		title: "Manpower Attendance",
		description:
			"Shift-based labor hours and headcount records with role categorization",
	},
	{
		id: "sites",
		title: "Multi-Site Operations",
		description:
			"Dynamic site management with per-site configuration and aggregated views",
	},
];

const FEATURES = [
	"Hono RPC with React Query",
	"Three-tier RBAC system",
	"Multi-site architecture",
	"Dual data entry (forms + import)",
	"Automated inventory calculation",
	"Background job processing",
	"Multi-format export system",
	"Complete audit trail",
];

const EcoopsOverview: FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const modulesRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (prefersReducedMotion) return;

		const modules = modulesRef.current.filter(Boolean);

		modules.forEach((module, index) => {
			gsap.fromTo(
				module,
				{ opacity: 0, x: index % 2 === 0 ? -40 : 40 },
				{
					opacity: 1,
					x: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: module,
						start: "top 80%",
						toggleActions: "play none none reverse",
					},
				},
			);
		});

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative w-full min-h-screen bg-muted/30 py-24 px-6"
		>
			<div className="mx-auto max-w-6xl">
				{/* Header */}
				<div className="text-center mb-16">
					<p className="text-sm font-mono text-primary/70 tracking-widest uppercase mb-4">
						Case Study
					</p>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
						EcoOps Dashboard
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						C&D Recycling Facility Operations Management System transforming
						manual Excel workflows into a scalable web platform
					</p>
				</div>

				{/* Dashboard Preview */}
				<div className="mb-20 rounded-xl border border-border/50 bg-card overflow-hidden">
					<div className="p-4 border-b border-border/50 flex items-center gap-2">
						<div className="w-3 h-3 rounded-full bg-red-500/50" />
						<div className="w-3 h-3 rounded-full bg-yellow-500/50" />
						<div className="w-3 h-3 rounded-full bg-green-500/50" />
						<span className="ml-4 text-sm text-muted-foreground font-mono">
							dvoid.app
						</span>
					</div>
					<a
						href="https://dvoid.app"
						target="_blank"
						rel="noopener noreferrer"
						className="block transition-opacity hover:opacity-90"
					>
						<Image
							src="/assets/EcoOps-Operational.png"
							alt="EcoOps Dashboard"
							width={1920}
							height={1080}
							className="w-full h-auto"
							priority
						/>
					</a>
				</div>

				{/* Modules Grid */}
				<div className="mb-20">
					<h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
						Core Modules
					</h3>
					<div className="grid md:grid-cols-2 gap-6">
						{DASHBOARD_MODULES.map((module, index) => (
							<div
								key={module.id}
								ref={(el) => {
									if (el) modulesRef.current[index] = el;
								}}
								className="p-6 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-colors"
							>
								<div className="flex items-start gap-4">
									<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
										<span className="text-sm font-mono text-primary">
											{String(index + 1).padStart(2, "0")}
										</span>
									</div>
									<div>
										<h4 className="text-lg font-medium text-foreground mb-2">
											{module.title}
										</h4>
										<p className="text-sm text-muted-foreground leading-relaxed">
											{module.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Features */}
				<div className="mb-16">
					<h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
						Platform Capabilities
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{FEATURES.map((feature) => (
							<div
								key={feature}
								className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border/50"
							>
								<svg
									className="w-5 h-5 text-primary shrink-0"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<span className="text-sm text-foreground">{feature}</span>
							</div>
						))}
					</div>
				</div>

				{/* CTA */}
				<div className="text-center">
					<Link
						href="/case-studies/ecoops-dashboard"
						className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
					>
						View Case Study
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
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EcoopsOverview;
