import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "About",
	description:
		"Technical Operations Specialist with 4 years of experience architecting industrial IoT systems in Saudi Arabia's waste management sector.",
};

export default function AboutPage() {
	return (
		<div className="pt-24 pb-16 px-6">
			<div className="mx-auto max-w-3xl">
				{/* Header */}
				<header className="mb-16">
					<p className="text-sm font-mono text-primary/70 tracking-widest uppercase mb-4">
						About
					</p>
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
						Building the infrastructure that powers industrial operations
					</h1>
					<p className="text-lg text-muted-foreground leading-relaxed">
						I&apos;m a Technical Operations Specialist based in Saudi Arabia,
						focused on architecting systems that bridge the gap between hardware
						and software in industrial environments.
					</p>
				</header>

				{/* Content */}
				<div className="prose prose-invert max-w-none">
					<section className="mb-12">
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							Background
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							For the past four years, I&apos;ve been working in the Maintenance
							& Calibration Department, developing the Smart Waste Management
							System (SWMS) - a platform that automates Construction &
							Demolition waste recycling facility operations.
						</p>
						<p className="text-muted-foreground leading-relaxed">
							My work involves integrating multiple hardware vendors including
							ZKTeco access control systems, Hikvision camera networks, and
							Mettler Toledo weighing equipment into a unified 4-stage workflow
							orchestration system.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							Approach
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							I follow Domain-Driven Design principles with a backend-first
							approach. Every system I build starts with a clear understanding
							of the business domain and the operational requirements.
						</p>
						<p className="text-muted-foreground leading-relaxed">
							My protocol emphasizes zero assumptions, explicit source
							citations, and covering all requirements before writing a single
							line of code.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							Current Focus
						</h2>
						<ul className="space-y-3 text-muted-foreground">
							<li className="flex items-start gap-3">
								<span className="text-primary mt-1">-</span>
								Scaling SWMS to handle increased facility throughput
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary mt-1">-</span>
								Developing the EcoOps operational dashboard
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary mt-1">-</span>
								Automating file organization and workflow systems
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary mt-1">-</span>
								Contributing to MCP tool development
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							Beyond Code
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							When I&apos;m not building systems, I focus on documentation and
							knowledge management. I believe that well-documented systems are
							maintainable systems, and that the best code is code that explains
							itself.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
