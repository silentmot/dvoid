"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { type FC, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Capability {
	id: string;
	title: string;
	description: string;
}

const CAPABILITIES: Capability[] = [
	{
		id: "device-orchestration",
		title: "Device-Driven Automation",
		description:
			"Physical device events (LPR, UHF, weighbridge) initiate and progress trips without manual intervention",
	},
	{
		id: "authorization-first",
		title: "Authorization-First Access",
		description:
			"Contract-based vehicle permissions enforce site, zone, and time-window access at every gate",
	},
	{
		id: "weight-correlation",
		title: "Weight Correlation Engine",
		description:
			"Scale readings automatically correlate to active trips via device detection at each weighbridge",
	},
	{
		id: "event-sourced",
		title: "Event-Sourced Lifecycle",
		description:
			"Immutable event trail enables state reconstruction, audit compliance, and forensic analysis",
	},
];

const TECH_STACK = [
	".NET Core",
	"Entity Framework",
	"Temporal.io",
	"Angular",
	"Next.js",
	"React Native",
	"PostgreSQL",
	"MongoDB",
	"Redis",
	"Kubernetes",
];

const SwmsOverview: FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const capabilitiesRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (prefersReducedMotion) return;

		const capabilities = capabilitiesRef.current.filter(Boolean);

		capabilities.forEach((capability, index) => {
			gsap.fromTo(
				capability,
				{ opacity: 0, y: 60 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: capability,
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
						Event-driven waste management platform automating C&D recycling
						operations through device orchestration and real-time trip lifecycle
						management
					</p>
				</div>

				{/* Architecture Highlights */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
					{[
						{ label: "Microservices", detail: "Domain-driven" },
						{ label: "Multi-Platform", detail: "Web + Mobile" },
						{ label: "Multi-Vendor", detail: "Hardware layer" },
						{ label: "Multi-Site", detail: "Operations" },
					].map((item) => (
						<div
							key={item.label}
							className="text-center p-6 rounded-lg bg-card border border-border/50"
						>
							<div className="text-xl md:text-2xl font-bold text-primary mb-2">
								{item.label}
							</div>
							<div className="text-sm text-muted-foreground">{item.detail}</div>
						</div>
					))}
				</div>

				{/* Core Capabilities */}
				<div className="mb-20">
					<h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
						Core Capabilities
					</h3>
					<div className="grid md:grid-cols-2 gap-6">
						{CAPABILITIES.map((capability, index) => (
							<div
								key={capability.id}
								ref={(el) => {
									if (el) capabilitiesRef.current[index] = el;
								}}
								className="relative p-6 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-colors"
							>
								<h4 className="text-lg font-medium text-foreground mb-2">
									{capability.title}
								</h4>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{capability.description}
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
