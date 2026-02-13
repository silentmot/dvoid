"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

/**
 * SignalNode - A single device signal that will correlate with others
 */
interface SignalNodeProps {
	id: number;
	initialX: number;
	initialY: number;
	targetX: number;
	targetY: number;
	delay: number;
	phase: "scattered" | "correlating" | "correlated";
}

function SignalNode({
	initialX,
	initialY,
	targetX,
	targetY,
	delay,
	phase,
}: SignalNodeProps) {
	const isCorrelating = phase === "correlating" || phase === "correlated";

	return (
		<motion.div
			className="absolute w-1.5 h-1.5 rounded-full"
			initial={{
				x: initialX,
				y: initialY,
				opacity: 0,
				scale: 0,
			}}
			animate={{
				x: isCorrelating ? targetX : initialX,
				y: isCorrelating ? targetY : initialY,
				opacity: phase === "scattered" ? [0, 0.6, 0.3] : 0.8,
				scale: phase === "correlated" ? 1.2 : 1,
				backgroundColor:
					phase === "correlated"
						? "rgb(45, 212, 191)" // teal-400
						: "rgb(148, 163, 184)", // slate-400
			}}
			transition={{
				duration: 1.2,
				delay: isCorrelating ? delay * 0.05 : delay * 0.02,
				ease: [0.23, 1, 0.32, 1],
				opacity: {
					duration: phase === "scattered" ? 2 : 0.8,
					repeat: phase === "scattered" ? Number.POSITIVE_INFINITY : 0,
					repeatType: "reverse",
				},
			}}
			style={{
				boxShadow:
					phase === "correlated"
						? "0 0 12px 2px rgba(45, 212, 191, 0.4)"
						: "none",
			}}
		/>
	);
}

/**
 * ConnectionLine - Lines that form between correlated signals
 */
interface ConnectionLineProps {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	delay: number;
	show: boolean;
}

function ConnectionLine({ x1, y1, x2, y2, delay, show }: ConnectionLineProps) {
	return (
		<motion.line
			x1={x1}
			y1={y1}
			x2={x2}
			y2={y2}
			stroke="rgb(45, 212, 191)"
			strokeWidth="1"
			initial={{ pathLength: 0, opacity: 0 }}
			animate={{
				pathLength: show ? 1 : 0,
				opacity: show ? 0.3 : 0,
			}}
			transition={{
				duration: 0.6,
				delay: delay * 0.08,
				ease: "easeOut",
			}}
		/>
	);
}

/**
 * DataPulse - Traveling pulse along connection lines
 */
interface DataPulseProps {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	delay: number;
	show: boolean;
}

function DataPulse({ x1, y1, x2, y2, delay, show }: DataPulseProps) {
	if (!show) return null;

	return (
		<motion.circle
			r="2"
			fill="rgb(45, 212, 191)"
			initial={{ opacity: 0 }}
			animate={{
				opacity: [0, 1, 1, 0],
				cx: [x1, x2],
				cy: [y1, y2],
			}}
			transition={{
				duration: 1.5,
				delay: delay * 0.1 + 0.5,
				repeat: Number.POSITIVE_INFINITY,
				repeatDelay: 2,
				ease: "linear",
			}}
			style={{
				filter: "drop-shadow(0 0 4px rgba(45, 212, 191, 0.8))",
			}}
		/>
	);
}

/**
 * CorrelationLoader - The main loading visualization
 * Philosophy: Scattered device signals finding meaning through correlation
 */
export function CorrelationLoader() {
	const [phase, setPhase] = useState<
		"scattered" | "correlating" | "correlated"
	>("scattered");
	const [textPhase, setTextPhase] = useState(0);
	const [signals, setSignals] = useState<SignalNodeProps[]>([]);

	// Generate scattered signal positions and their correlation targets (client-only)
	useEffect(() => {
		const nodes: SignalNodeProps[] = [];

		// Create a constellation pattern for correlated state
		const constellationPoints = [
			{ x: 0, y: -60 },
			{ x: 52, y: -30 },
			{ x: 52, y: 30 },
			{ x: 0, y: 60 },
			{ x: -52, y: 30 },
			{ x: -52, y: -30 },
			{ x: 0, y: 0 },
		];

		for (let i = 0; i < 24; i++) {
			// Random scattered positions (viewport-relative)
			const angle = (i / 24) * Math.PI * 2 + Math.random() * 0.5;
			const radius = 120 + Math.random() * 100;
			const initialX = Math.cos(angle) * radius;
			const initialY = Math.sin(angle) * radius;

			// Target constellation position
			const targetPoint = constellationPoints[i % constellationPoints.length];
			const jitter = i >= 7 ? (Math.random() - 0.5) * 20 : 0;

			nodes.push({
				id: i,
				initialX,
				initialY,
				targetX: targetPoint.x + jitter,
				targetY: targetPoint.y + jitter,
				delay: i,
				phase: "scattered",
			});
		}

		setSignals(nodes);
	}, []);

	// Connection lines between correlated nodes
	const connections = useMemo(() => {
		const lines: { x1: number; y1: number; x2: number; y2: number }[] = [
			{ x1: 0, y1: -60, x2: 52, y2: -30 },
			{ x1: 52, y1: -30, x2: 52, y2: 30 },
			{ x1: 52, y1: 30, x2: 0, y2: 60 },
			{ x1: 0, y1: 60, x2: -52, y2: 30 },
			{ x1: -52, y1: 30, x2: -52, y2: -30 },
			{ x1: -52, y1: -30, x2: 0, y2: -60 },
			{ x1: 0, y1: 0, x2: 0, y2: -60 },
			{ x1: 0, y1: 0, x2: 52, y2: 30 },
			{ x1: 0, y1: 0, x2: -52, y2: 30 },
		];
		return lines;
	}, []);

	// Phase progression
	useEffect(() => {
		const timers = [
			setTimeout(() => setTextPhase(1), 400),
			setTimeout(() => setTextPhase(2), 1200),
			setTimeout(() => setPhase("correlating"), 2000),
			setTimeout(() => setPhase("correlated"), 3200),
			setTimeout(() => setTextPhase(3), 3500),
		];

		return () => timers.forEach(clearTimeout);
	}, []);

	const loadingTexts = [
		"",
		"Devices speak",
		"Systems listen",
		"Correlating signals",
	];

	return (
		<div className="fixed inset-0 z-100 bg-[#050505] flex items-center justify-center overflow-hidden">
			{/* Ambient background glow */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<motion.div
					className="absolute right-[-20%] top-[-20%] w-150 h-150 rounded-full bg-teal-500/10 blur-[150px]"
					animate={{
						scale: [1, 1.1, 1],
						opacity: [0.1, 0.15, 0.1],
					}}
					transition={{
						duration: 4,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute left-[-10%] bottom-[-20%] w-125 h-125 rounded-full bg-blue-500/10 blur-[150px]"
					animate={{
						scale: [1, 1.15, 1],
						opacity: [0.1, 0.12, 0.1],
					}}
					transition={{
						duration: 5,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
						delay: 1,
					}}
				/>
			</div>

			{/* Grid background hint */}
			<div className="absolute inset-0 opacity-[0.03]">
				<svg className="w-full h-full">
					<defs>
						<pattern
							id="loader-grid"
							width="40"
							height="40"
							patternUnits="userSpaceOnUse"
						>
							<path
								d="M 40 0 L 0 0 0 40"
								fill="none"
								stroke="white"
								strokeWidth="1"
							/>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#loader-grid)" />
				</svg>
			</div>

			{/* Main visualization container */}
			<div className="relative w-80 h-80">
				{/* Signal nodes */}
				{signals.length > 0 &&
					signals.map((signal) => (
						<div
							key={signal.id}
							className="absolute left-1/2 top-1/2"
							style={{ transform: "translate(-50%, -50%)" }}
						>
							<SignalNode {...signal} phase={phase} />
						</div>
					))}

				{/* Connection lines SVG overlay */}
				<svg
					className="absolute inset-0 w-full h-full"
					style={{ overflow: "visible" }}
				>
					<g transform="translate(160, 160)">
						{connections.map((conn, i) => (
							<ConnectionLine
								key={`line-${i}`}
								{...conn}
								delay={i}
								show={phase === "correlated"}
							/>
						))}
						{connections.map((conn, i) => (
							<DataPulse
								key={`pulse-${i}`}
								{...conn}
								delay={i}
								show={phase === "correlated"}
							/>
						))}
					</g>
				</svg>

				{/* Central core */}
				<motion.div
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-400"
					initial={{ scale: 0, opacity: 0 }}
					animate={{
						scale: phase === "correlated" ? [1, 1.3, 1] : 0,
						opacity: phase === "correlated" ? 1 : 0,
					}}
					transition={{
						duration: 2,
						repeat: phase === "correlated" ? Number.POSITIVE_INFINITY : 0,
						ease: "easeInOut",
					}}
					style={{
						boxShadow: "0 0 20px 4px rgba(45, 212, 191, 0.5)",
					}}
				/>
			</div>

			{/* Text overlay */}
			<div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center">
				<AnimatePresence mode="wait">
					<motion.p
						key={textPhase}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 0.6, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.5 }}
						className="text-xs tracking-[0.3em] uppercase font-mono text-slate-400"
					>
						{loadingTexts[textPhase]}
					</motion.p>
				</AnimatePresence>
			</div>

			{/* Subtle progress bar */}
			<div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-px bg-slate-800 overflow-hidden rounded-full">
				<motion.div
					className="h-full bg-linear-to-r from-teal-500/50 to-teal-400"
					initial={{ width: "0%" }}
					animate={{ width: "100%" }}
					transition={{ duration: 4, ease: "easeInOut" }}
				/>
			</div>
		</div>
	);
}

export default CorrelationLoader;
