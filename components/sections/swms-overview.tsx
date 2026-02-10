"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { type FC, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface WorkflowStage {
	id: number;
	title: string;
	description: string;
	icon: string;
}

const WORKFLOW_STAGES: WorkflowStage[] = [
	{
		id: 1,
		title: "Gate Entry",
		description:
			"ZKTeco access control, ANPR camera integration, driver authentication",
		icon: "01",
	},
	{
		id: 2,
		title: "Weighbridge In",
		description:
			"Mettler Toledo scale integration, tare weight capture, load verification",
		icon: "02",
	},
	{
		id: 3,
		title: "Processing",
		description:
			"Material classification, sorting operations, quality assessment",
		icon: "03",
	},
	{
		id: 4,
		title: "Weighbridge Out",
		description:
			"Net weight calculation, automated ticketing, transaction completion",
		icon: "04",
	},
];

const TECH_STACK = [
	"NestJS",
	"Next.js",
	"PostgreSQL",
	"Prisma",
	"Redis",
	"Docker",
	"ZKTeco SDK",
	"Hikvision API",
	"Mettler Toledo DDE",
];

const SwmsOverview: FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const stagesRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (prefersReducedMotion) return;

		const stages = stagesRef.current.filter(Boolean);

		stages.forEach((stage, index) => {
			gsap.fromTo(
				stage,
				{ opacity: 0, y: 60 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: stage,
						start: "top 80%",
						toggleActions: "play none none reverse",
					},
					delay: index * 0.1,
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
			className="relative w-full min-h-screen bg-background py-24 px-6"
		>
			<div className="mx-auto max-w-6xl">
				{/* Header */}
				<div className="text-center mb-16">
					<p className="text-sm font-mono text-primary/70 tracking-widest uppercase mb-4">
						Case Study
					</p>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
						SWMS Platform
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Smart Waste Management System automating C&D recycling facility
						operations through a 4-stage workflow orchestration
					</p>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
					{[
						{ value: "4", label: "Years Development" },
						{ value: "4", label: "Workflow Stages" },
						{ value: "3", label: "Hardware Vendors" },
						{ value: "24/7", label: "Operation" },
					].map((stat) => (
						<div
							key={stat.label}
							className="text-center p-6 rounded-lg bg-card border border-border/50"
						>
							<div className="text-3xl md:text-4xl font-bold text-primary mb-2">
								{stat.value}
							</div>
							<div className="text-sm text-muted-foreground">{stat.label}</div>
						</div>
					))}
				</div>

				{/* Workflow Stages */}
				<div className="mb-20">
					<h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
						Workflow Orchestration
					</h3>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{WORKFLOW_STAGES.map((stage, index) => (
							<div
								key={stage.id}
								ref={(el) => {
									if (el) stagesRef.current[index] = el;
								}}
								className="relative p-6 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-colors"
							>
								<div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
									<span className="text-xs font-mono text-primary">
										{stage.icon}
									</span>
								</div>
								<h4 className="text-lg font-medium text-foreground mt-4 mb-2">
									{stage.title}
								</h4>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{stage.description}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Tech Stack */}
				<div className="mb-16">
					<h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
						Technology Stack
					</h3>
					<div className="flex flex-wrap justify-center gap-3">
						{TECH_STACK.map((tech) => (
							<span
								key={tech}
								className="px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground border border-border/50"
							>
								{tech}
							</span>
						))}
					</div>
				</div>

				{/* CTA */}
				<div className="text-center">
					<Link
						href="/case-studies/swms-platform"
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

export default SwmsOverview;
