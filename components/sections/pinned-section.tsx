"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type FC, type ReactNode, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface PinnedSectionProps {
	id: string;
	children: ReactNode;
	className?: string;
}

const PinnedSection: FC<PinnedSectionProps> = ({
	id,
	children,
	className = "",
}) => {
	const sectionRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		const content = contentRef.current;

		if (!section || !content) return;

		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (prefersReducedMotion) return;

		const trigger = ScrollTrigger.create({
			trigger: section,
			start: "top top",
			end: "bottom bottom",
			pin: content,
			pinSpacing: false,
		});

		return () => {
			trigger.kill();
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			id={id}
			className={`relative min-h-[200vh] ${className}`}
		>
			<div
				ref={contentRef}
				className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
			>
				{children}
			</div>
		</section>
	);
};

export default PinnedSection;
