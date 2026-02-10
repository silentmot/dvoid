"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
		id: "fleet",
		title: "Fleet Management",
		description:
			"Real-time vehicle tracking, route optimization, driver assignment",
	},
	{
		id: "inventory",
		title: "Inventory Control",
		description:
			"Material stock levels, automated reorder points, bin management",
	},
	{
		id: "analytics",
		title: "Operational Analytics",
		description: "KPI dashboards, throughput metrics, efficiency reporting",
	},
	{
		id: "scheduling",
		title: "Scheduling Engine",
		description: "Shift management, resource allocation, capacity planning",
	},
];

const FEATURES = [
	"Real-time WebSocket updates",
	"Role-based access control",
	"Multi-tenant architecture",
	"Offline-first PWA",
	"Export to Excel/PDF",
	"Custom report builder",
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
						Operational command center providing real-time visibility into
						recycling facility operations
					</p>
				</div>

				{/* Dashboard Preview Placeholder */}
				<div className="mb-20 rounded-xl border border-border/50 bg-card overflow-hidden">
					<div className="p-4 border-b border-border/50 flex items-center gap-2">
						<div className="w-3 h-3 rounded-full bg-red-500/50" />
						<div className="w-3 h-3 rounded-full bg-yellow-500/50" />
						<div className="w-3 h-3 rounded-full bg-green-500/50" />
						<span className="ml-4 text-sm text-muted-foreground font-mono">
							ecoops.d-void.com
						</span>
					</div>
					<div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
						<div className="text-center">
							<div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
								<svg
									className="w-8 h-8 text-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
									/>
								</svg>
							</div>
							<p className="text-sm text-muted-foreground">
								Dashboard preview placeholder
							</p>
						</div>
					</div>
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
						Platform Features
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
