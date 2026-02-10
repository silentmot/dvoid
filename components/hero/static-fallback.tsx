"use client";

import { type FC } from "react";

// ============================================================================
// TYPES
// ============================================================================

interface StaticFallbackProps {
	className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================>

/**
 * CSS-only fallback for mobile/touch/reduced-motion devices.
 * Provides immediate content visibility with network-themed background.
 * Uses subtle CSS animations that respect prefers-reduced-motion.
 */
const StaticFallback: FC<StaticFallbackProps> = ({ className = "" }) => (
	<div
		className={`absolute inset-0 z-0 ${className}`}
		style={{
			background: `
        radial-gradient(ellipse at 30% 20%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 80%, rgba(13, 79, 79, 0.2) 0%, transparent 50%),
        linear-gradient(180deg, #000000 0%, #0a0a0a 100%)
      `,
		}}
	>
		{/* Grid overlay */}
		<div
			className="absolute inset-0 opacity-20"
			style={{
				backgroundImage: `
          linear-gradient(rgba(20, 184, 166, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(20, 184, 166, 0.3) 1px, transparent 1px)
        `,
				backgroundSize: "40px 40px",
			}}
		/>

		{/* Animated node pattern overlay */}
		<div
			className="absolute inset-0 opacity-30"
			style={{
				backgroundColor: "transparent",
				boxShadow: `
          10vw 20vh 0 1px rgba(20, 184, 166, 0.4),
          30vw 60vh 0 1px rgba(20, 184, 166, 0.3),
          50vw 30vh 0 1px rgba(20, 184, 166, 0.5),
          70vw 70vh 0 1px rgba(20, 184, 166, 0.3),
          85vw 25vh 0 1px rgba(20, 184, 166, 0.4),
          20vw 80vh 0 1px rgba(20, 184, 166, 0.3),
          60vw 85vh 0 1px rgba(20, 184, 166, 0.4),
          40vw 45vh 0 1px rgba(20, 184, 166, 0.3)
        `,
			}}
		/>

		{/* Pulsing glow effect */}
		<div className="absolute inset-0 overflow-hidden">
			<style>{`
				@keyframes subtle-pulse {
					0%, 100% { opacity: 0; }
					50% { opacity: 0.15; }
				}
				.pulse-glow {
					animation: subtle-pulse 4s ease-in-out;
					animation-iteration-count: 1;
				}
				@keyframes subtle-float {
					0%, 100% { transform: translateY(0); }
					50% { transform: translateY(-10px); }
				}
				.float-node {
					animation: subtle-float 6s ease-in-out infinite;
				}
				@media (prefers-reduced-motion: reduce) {
					.pulse-glow,
					.float-node {
						animation: none !important;
					}
				}
			`}</style>
			<div
				className="pulse-glow absolute rounded-full"
				style={{
					width: "300px",
					height: "300px",
					background: "radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, transparent 70%)",
					top: "20%",
					left: "30%",
				}}
			/>
			<div
				className="pulse-glow absolute rounded-full"
				style={{
					width: "200px",
					height: "200px",
					background: "radial-gradient(circle, rgba(13, 79, 79, 0.25) 0%, transparent 70%)",
					top: "60%",
					left: "60%",
					animationDelay: "2s",
				}}
			/>
		</div>

		{/* Floating node indicators */}
		<div className="absolute inset-0 pointer-events-none">
			<div
				className="float-node absolute w-1 h-1 rounded-full bg-teal-400/50"
				style={{ top: "25%", left: "20%", animationDelay: "0s" }}
			/>
			<div
				className="float-node absolute w-1 h-1 rounded-full bg-teal-400/40"
				style={{ top: "40%", left: "75%", animationDelay: "1s" }}
			/>
			<div
				className="float-node absolute w-1 h-1 rounded-full bg-teal-400/60"
				style={{ top: "70%", left: "35%", animationDelay: "2s" }}
			/>
			<div
				className="float-node absolute w-1 h-1 rounded-full bg-teal-400/30"
				style={{ top: "55%", left: "55%", animationDelay: "0.5s" }}
			/>
		</div>
	</div>
);

export default StaticFallback;
