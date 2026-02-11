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
// ============================================================================

/**
 * CSS-only fallback for mobile/touch/reduced-motion devices.
 * Black Ice themed: angular, technical, "CAD meets glass" aesthetic.
 * Uses subtle CSS animations that respect prefers-reduced-motion.
 */
const StaticFallback: FC<StaticFallbackProps> = ({ className = "" }) => (
	<div
		className={`absolute inset-0 z-0 ${className}`}
		style={{
			background: `
        radial-gradient(ellipse at 50% 50%, rgba(94, 234, 212, 0.08) 0%, transparent 60%),
        linear-gradient(180deg, #050505 0%, #0a0a0a 100%)
      `,
		}}
	>
		{/* Angular grid overlay - Black Ice technical pattern */}
		<div
			className="absolute inset-0"
			style={{
				backgroundImage: `
          linear-gradient(rgba(94, 234, 212, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(94, 234, 212, 0.08) 1px, transparent 1px)
        `,
				backgroundSize: "40px 40px",
			}}
		/>

		{/* Diagonal cross-hatch pattern */}
		<div
			className="absolute inset-0"
			style={{
				backgroundImage: `
          linear-gradient(45deg, transparent 48%, rgba(94, 234, 212, 0.03) 48%, rgba(94, 234, 212, 0.03) 52%, transparent 52%),
          linear-gradient(-45deg, transparent 48%, rgba(94, 234, 212, 0.03) 48%, rgba(94, 234, 212, 0.03) 52%, transparent 52%)
        `,
				backgroundSize: "80px 80px",
			}}
		/>

		{/* Angular node indicators - octahedron-like shapes */}
		<div className="absolute inset-0 pointer-events-none">
			<style>{`
				@keyframes angular-glow {
					0%, 100% { opacity: 0.1; transform: scale(1); }
					50% { opacity: 0.25; transform: scale(1.05); }
				}
				.angular-node {
					animation: angular-glow 4s ease-in-out infinite;
				}
				@media (prefers-reduced-motion: reduce) {
					.angular-node {
						animation: none !important;
					}
				}
			`}</style>

			{/* Node 1 - top left */}
			<div
				className="angular-node absolute"
				style={{
					top: "20%",
					left: "25%",
					width: "0",
					height: "0",
					borderLeft: "6px solid transparent",
					borderRight: "6px solid transparent",
					borderBottom: "10px solid rgba(94, 234, 212, 0.4)",
					animationDelay: "0s",
				}}
			/>
			<div
				className="absolute"
				style={{
					top: "calc(20% + 10px)",
					left: "calc(25% - 3px)",
					width: "12px",
					height: "12px",
					border: "1px solid rgba(94, 234, 212, 0.3)",
					transform: "rotate(45deg)",
				}}
			/>

			{/* Node 2 - center right */}
			<div
				className="angular-node absolute"
				style={{
					top: "45%",
					left: "70%",
					width: "0",
					height: "0",
					borderLeft: "4px solid transparent",
					borderRight: "4px solid transparent",
					borderBottom: "8px solid rgba(94, 234, 212, 0.3)",
					animationDelay: "1.5s",
				}}
			/>
			<div
				className="absolute"
				style={{
					top: "calc(45% + 8px)",
					left: "calc(70% - 2px)",
					width: "8px",
					height: "8px",
					border: "1px solid rgba(94, 234, 212, 0.25)",
					transform: "rotate(45deg)",
				}}
			/>

			{/* Node 3 - bottom left */}
			<div
				className="angular-node absolute"
				style={{
					top: "70%",
					left: "30%",
					width: "0",
					height: "0",
					borderLeft: "5px solid transparent",
					borderRight: "5px solid transparent",
					borderBottom: "9px solid rgba(94, 234, 212, 0.35)",
					animationDelay: "3s",
				}}
			/>
			<div
				className="absolute"
				style={{
					top: "calc(70% + 9px)",
					left: "calc(30% - 2.5px)",
					width: "10px",
					height: "10px",
					border: "1px solid rgba(94, 234, 212, 0.2)",
					transform: "rotate(45deg)",
				}}
			/>

			{/* Node 4 - top right */}
			<div
				className="angular-node absolute"
				style={{
					top: "30%",
					left: "75%",
					width: "0",
					height: "0",
					borderLeft: "3px solid transparent",
					borderRight: "3px solid transparent",
					borderBottom: "6px solid rgba(94, 234, 212, 0.25)",
					animationDelay: "2s",
				}}
			/>

			{/* Technical lines connecting nodes */}
			<svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
				<line
					x1="25%"
					y1="20%"
					x2="70%"
					y2="45%"
					stroke="rgba(94, 234, 212, 0.4)"
					strokeWidth="1"
				/>
				<line
					x1="30%"
					y1="70%"
					x2="25%"
					y2="20%"
					stroke="rgba(94, 234, 212, 0.3)"
					strokeWidth="1"
				/>
				<line
					x1="75%"
					y1="30%"
					x2="70%"
					y2="45%"
					stroke="rgba(94, 234, 212, 0.2)"
					strokeWidth="1"
				/>
			</svg>
		</div>

		{/* Sparse floating particles */}
		<div className="absolute inset-0 pointer-events-none">
			<style>{`
				@keyframes sparse-float {
					0%, 100% { opacity: 0.2; transform: translateY(0); }
					50% { opacity: 0.4; transform: translateY(-5px); }
				}
				.sparse-particle {
					animation: sparse-float 5s ease-in-out infinite;
				}
				@media (prefers-reduced-motion: reduce) {
					.sparse-particle {
						animation: none !important;
						opacity: 0.2;
					}
				}
			`}</style>
			<div
				className="sparse-particle absolute w-0.5 h-0.5 rounded-full bg-teal-400/30"
				style={{ top: "35%", left: "40%", animationDelay: "0.5s" }}
			/>
			<div
				className="sparse-particle absolute w-1 h-1 rounded-full bg-teal-400/20"
				style={{ top: "60%", left: "55%", animationDelay: "2s" }}
			/>
			<div
				className="sparse-particle absolute w-0.5 h-0.5 rounded-full bg-teal-400/25"
				style={{ top: "80%", left: "20%", animationDelay: "3.5s" }}
			/>
		</div>

		{/* Vignette overlay */}
		<div
			className="absolute inset-0 pointer-events-none"
			style={{
				background:
					"radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)",
			}}
		/>
	</div>
);

export default StaticFallback;
