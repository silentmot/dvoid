import EcoopsOverview from "@/components/sections/ecoops-overview";
import SwmsOverview from "@/components/sections/swms-overview";
import RealityCompilerHeroClient from "@/components/hero/reality-compiler-hero.client";

export default function HomePage() {
	return (
		<>
			{/* Hero Section */}
			<RealityCompilerHeroClient
				title="D-VOID"
				subtitle="Technical Operations Specialist"
				tagline="Compiling industrial systems into operational reality"
			/>

			{/* SWMS Platform Overview - Pinned Section 1 */}
			<SwmsOverview />

			{/* EcoOps Dashboard Overview - Pinned Section 2 */}
			<EcoopsOverview />

			{/* Skills Section */}
			<section className="py-24 px-6 bg-background">
				<div className="mx-auto max-w-6xl">
					<div className="text-center mb-16">
						<p className="text-sm font-mono text-primary/70 tracking-widest uppercase mb-4">
							Expertise
						</p>
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
							Technical Stack
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{/* Backend */}
						<div className="p-6 rounded-lg bg-card border border-border/50">
							<h3 className="text-lg font-semibold text-foreground mb-4">
								Backend
							</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>NestJS / Express</li>
								<li>PostgreSQL / Redis</li>
								<li>Prisma ORM</li>
								<li>Docker / Kubernetes</li>
								<li>WebSockets / MQTT</li>
							</ul>
						</div>

						{/* Frontend */}
						<div className="p-6 rounded-lg bg-card border border-border/50">
							<h3 className="text-lg font-semibold text-foreground mb-4">
								Frontend
							</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>Next.js / React</li>
								<li>TypeScript</li>
								<li>Tailwind CSS</li>
								<li>Three.js / R3F</li>
								<li>Motion / GSAP</li>
							</ul>
						</div>

						{/* Industrial IoT */}
						<div className="p-6 rounded-lg bg-card border border-border/50">
							<h3 className="text-lg font-semibold text-foreground mb-4">
								Industrial IoT
							</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>ZKTeco Integration</li>
								<li>Hikvision ISAPI</li>
								<li>Mettler Toledo DDE</li>
								<li>RS232 / Modbus</li>
								<li>ONVIF Protocol</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 px-6 bg-muted/30">
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
						Ready to build something?
					</h2>
					<p className="text-lg text-muted-foreground mb-8">
						Let&apos;s discuss your project and explore how I can help bring
						your vision to life.
					</p>
					<a
						href="/contact"
						className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
					>
						Get in Touch
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
					</a>
				</div>
			</section>
		</>
	);
}
