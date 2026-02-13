import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "About",
	description:
		"System Architect working at the boundary where physical signals become operational truth.",
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
						Devices speak. Systems must listen.
					</h1>
					<p className="text-lg text-primary/70 leading-relaxed">
						I architect the interpretation layer—the space where raw signals
						become operational truth.
					</p>
				</header>

				{/* Content */}
				<div className="prose prose-invert max-w-none">
					<section className="mb-12">
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							The Correlation Problem
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							A weighbridge reports a number. It doesn&apos;t know which vehicle
							produced it. A camera captures a license plate. It doesn&apos;t
							know which trip it belongs to. An RFID reader detects a tag. It
							doesn&apos;t know if access should be granted.
						</p>
						<p className="text-muted-foreground leading-relaxed">
							The fundamental challenge of industrial IoT isn&apos;t
							connectivity—it&apos;s correlation. Devices generate fragments.
							Architecture creates meaning. My work lives in that gap: taking
							isolated signals and weaving them into authoritative records that
							survive audit, support decisions, and enforce rules the devices
							themselves know nothing about.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							Events, Not Intentions
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							I don&apos;t build systems that tell the physical world what
							happened. I build systems that listen to what the physical world
							reports, then derive state from that reality.
						</p>
						<p className="text-muted-foreground leading-relaxed">
							When a barrier opens, the system doesn&apos;t record &quot;we
							opened the barrier.&quot; It records &quot;the barrier reported it
							opened.&quot; When a scale stabilizes, the system doesn&apos;t
							record &quot;we weighed the truck.&quot; It records &quot;the
							scale reported a stable reading.&quot; The distinction is subtle
							but absolute: the event trail must reflect what was observed, not
							what was commanded. Only then can you reconstruct truth when
							things go wrong.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							Authorization Before Action
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							A contract isn&apos;t a business agreement. It&apos;s a capability
							container—a set of constraints that determine what a vehicle can
							do before it arrives. The system doesn&apos;t ask &quot;should
							this truck enter?&quot; It asks &quot;does this truck have
							remaining capacity under an active contract for this material type
							at this facility?&quot;
						</p>
						<p className="text-muted-foreground leading-relaxed">
							Authorization completes before the barrier command is ever sent.
							Not during. Not after. Before. The physical world moves slowly
							enough that we can afford to think first. Systems that open
							barriers and then check permissions have inverted the trust model.
							They&apos;ve made the default &quot;allow&quot; and the exception
							&quot;deny.&quot; I design for the opposite: silence is denial,
							and action requires proof.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							Constraints as Architecture
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							Every device limitation becomes an architectural decision. Scale
							indicators can&apos;t identify vehicles? Then detection must
							happen at every weighpoint—not just the gate. Barriers can&apos;t
							validate authorization? Then validation must complete before the
							command. Hardware can&apos;t guarantee delivery? Then the system
							must tolerate silence.
						</p>
						<p className="text-muted-foreground leading-relaxed">
							Vendors who fail my specifications try to work around these
							constraints. They assume gate detection can correlate with scale
							readings. They assume the barrier will wait. They assume the
							network will deliver. Assumptions are where systems die. I
							document constraints because the constraints are the architecture.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							The Specification Filter
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							I spend more time writing specifications than code. This seems
							inefficient until you watch a vendor misinterpret a requirement,
							build the wrong abstraction, and spend months recovering from an
							assumption a single sentence would have prevented.
						</p>
						<p className="text-muted-foreground leading-relaxed mb-4">
							The irony of detailed documentation is that it exposes capability
							gaps. The more precisely you specify a system, the fewer people
							can build it. When I hand a vendor a state machine challenge
							instead of a knowledge questionnaire, I learn quickly whether they
							understand orchestration or just claim to.
						</p>
						<p className="text-muted-foreground leading-relaxed">
							A specification no one can implement isn&apos;t a failure of the
							vendors—it&apos;s information about the gap between what&apos;s
							needed and what&apos;s possible. Sometimes the right response is
							to simplify. Sometimes to wait. Sometimes to build the operational
							layer yourself while the specification matures.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							Layers of Truth
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							Configuration defines what&apos;s possible. Authorization defines
							what&apos;s permitted. Operations record what happened. Analytics
							reveal what it means. Each layer has its own source of truth, its
							own rate of change, its own failure modes.
						</p>
						<p className="text-muted-foreground leading-relaxed">
							The foundation layer changes rarely—sites, zones, device
							locations. The supporting layer changes occasionally—contracts,
							vehicle registrations. The operations layer changes
							constantly—trips initiated, weights captured, states progressed.
							The intelligence layer synthesizes everything into decisions. When
							layers couple incorrectly, the fast layers drag the slow layers
							into instability. When they couple correctly, each layer can fail
							independently without corrupting the others.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-foreground mb-4">
							Ground Zero
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							I operate on a simple protocol: no assumptions. Every claim traces
							to a source. Every decision references a constraint. When I
							don&apos;t know something, I stop and ask rather than guess and
							apologize later.
						</p>
						<p className="text-muted-foreground leading-relaxed">
							This discipline isn&apos;t about being thorough—it&apos;s about
							being honest. Systems built on assumptions inherit the
							assumptions&apos; fragility. Systems built on verified constraints
							inherit the constraints&apos; strength. The difference compounds
							over time until one system is maintainable and the other is a
							museum of workarounds.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
