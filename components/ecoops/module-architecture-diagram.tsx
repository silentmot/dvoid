"use client";

import { useEffect, useRef, useState } from "react";

interface ModuleNode {
	id: string;
	label: string;
	description: string;
	x: number;
	y: number;
	type: "core" | "foundational" | "calculated";
}

interface Connection {
	from: string;
	to: string;
	label?: string;
}

const MODULES: ModuleNode[] = [
	// Foundational Layer (bottom)
	{
		id: "sites",
		label: "Sites",
		description: "Multi-tenant facility management",
		x: 200,
		y: 320,
		type: "foundational",
	},
	{
		id: "users",
		label: "Users",
		description: "Three-tier RBAC system",
		x: 400,
		y: 320,
		type: "foundational",
	},

	// Core Operations Layer (middle)
	{
		id: "production",
		label: "Production",
		description: "Daily output tracking",
		x: 100,
		y: 180,
		type: "core",
	},
	{
		id: "dispatch",
		label: "Dispatch",
		description: "Material sales & delivery",
		x: 250,
		y: 180,
		type: "core",
	},
	{
		id: "received",
		label: "Received",
		description: "CDW intake records",
		x: 400,
		y: 180,
		type: "core",
	},
	{
		id: "equipment",
		label: "Equipment",
		description: "Utilization logging",
		x: 550,
		y: 180,
		type: "core",
	},
	{
		id: "manpower",
		label: "Manpower",
		description: "Attendance tracking",
		x: 175,
		y: 100,
		type: "core",
	},

	// Calculated Layer (top)
	{
		id: "inventory",
		label: "Inventory",
		description: "Auto-calculated stock",
		x: 400,
		y: 50,
		type: "calculated",
	},
];

const CONNECTIONS: Connection[] = [
	// Foundational → Core dependencies
	{ from: "sites", to: "production" },
	{ from: "sites", to: "dispatch" },
	{ from: "sites", to: "received" },
	{ from: "sites", to: "equipment" },
	{ from: "sites", to: "manpower" },
	{ from: "users", to: "production" },
	{ from: "users", to: "dispatch" },
	{ from: "users", to: "received" },
	{ from: "users", to: "equipment" },
	{ from: "users", to: "manpower" },

	// Core → Calculated data flow
	{ from: "production", to: "inventory", label: "+ produced" },
	{ from: "dispatch", to: "inventory", label: "- dispatched" },
];

const TYPE_COLORS = {
	core: {
		bg: "oklch(0.35 0.08 160)",
		border: "oklch(0.55 0.15 160)",
		text: "oklch(0.85 0.05 160)",
	},
	foundational: {
		bg: "oklch(0.30 0.06 260)",
		border: "oklch(0.50 0.12 260)",
		text: "oklch(0.85 0.03 260)",
	},
	calculated: {
		bg: "oklch(0.38 0.10 85)",
		border: "oklch(0.60 0.18 85)",
		text: "oklch(0.90 0.05 85)",
	},
};

function getNodeCenter(node: ModuleNode): { cx: number; cy: number } {
	return { cx: node.x + 60, cy: node.y + 25 };
}

export function ModuleArchitectureDiagram({
	className = "",
}: {
	className?: string;
}) {
	const svgRef = useRef<SVGSVGElement>(null);
	const [animationPhase, setAnimationPhase] = useState(0);
	const [hoveredNode, setHoveredNode] = useState<string | null>(null);

	useEffect(() => {
		const timers = [
			setTimeout(() => setAnimationPhase(1), 200),
			setTimeout(() => setAnimationPhase(2), 600),
			setTimeout(() => setAnimationPhase(3), 1000),
			setTimeout(() => setAnimationPhase(4), 1400),
		];
		return () => timers.forEach(clearTimeout);
	}, []);

	const getNodeOpacity = (type: ModuleNode["type"]) => {
		if (type === "foundational" && animationPhase >= 1) return 1;
		if (type === "core" && animationPhase >= 2) return 1;
		if (type === "calculated" && animationPhase >= 3) return 1;
		return 0;
	};

	const getConnectionOpacity = (conn: Connection) => {
		const fromNode = MODULES.find((m) => m.id === conn.from);
		const toNode = MODULES.find((m) => m.id === conn.to);
		if (!fromNode || !toNode) return 0;

		if (fromNode.type === "foundational" && animationPhase >= 2) return 0.4;
		if (fromNode.type === "core" && animationPhase >= 4) return 0.6;
		return 0;
	};

	return (
		<div className={`relative ${className}`}>
			<svg
				ref={svgRef}
				viewBox="0 0 660 400"
				className="w-full h-auto"
				style={{ maxHeight: "400px" }}
			>
				<defs>
					<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="3" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>

					<marker
						id="arrowhead"
						markerWidth="10"
						markerHeight="7"
						refX="9"
						refY="3.5"
						orient="auto"
					>
						<polygon
							points="0 0, 10 3.5, 0 7"
							fill="oklch(0.6 0.12 160 / 0.6)"
						/>
					</marker>

					<linearGradient id="flowGradient" x1="0%" y1="100%" x2="0%" y2="0%">
						<stop offset="0%" stopColor="oklch(0.55 0.12 260)" />
						<stop offset="50%" stopColor="oklch(0.55 0.15 160)" />
						<stop offset="100%" stopColor="oklch(0.60 0.18 85)" />
					</linearGradient>
				</defs>

				{/* Layer Labels */}
				<text
					x="20"
					y="55"
					fill="oklch(0.6 0.1 85)"
					fontSize="11"
					fontFamily="monospace"
					opacity={animationPhase >= 3 ? 0.7 : 0}
					style={{ transition: "opacity 0.5s ease" }}
				>
					CALCULATED
				</text>
				<text
					x="20"
					y="140"
					fill="oklch(0.6 0.1 160)"
					fontSize="11"
					fontFamily="monospace"
					opacity={animationPhase >= 2 ? 0.7 : 0}
					style={{ transition: "opacity 0.5s ease" }}
				>
					CORE OPS
				</text>
				<text
					x="20"
					y="325"
					fill="oklch(0.6 0.1 260)"
					fontSize="11"
					fontFamily="monospace"
					opacity={animationPhase >= 1 ? 0.7 : 0}
					style={{ transition: "opacity 0.5s ease" }}
				>
					FOUNDATIONAL
				</text>

				{/* Connections */}
				{CONNECTIONS.map((conn, i) => {
					const fromNode = MODULES.find((m) => m.id === conn.from);
					const toNode = MODULES.find((m) => m.id === conn.to);
					if (!fromNode || !toNode) return null;

					const from = getNodeCenter(fromNode);
					const to = getNodeCenter(toNode);

					const isDataFlow = conn.label !== undefined;
					const opacity = getConnectionOpacity(conn);

					return (
						<g key={`${conn.from}-${conn.to}`}>
							<line
								x1={from.cx}
								y1={from.cy}
								x2={to.cx}
								y2={to.cy}
								stroke={
									isDataFlow
										? "url(#flowGradient)"
										: "oklch(0.5 0.08 260 / 0.3)"
								}
								strokeWidth={isDataFlow ? 2 : 1}
								strokeDasharray={isDataFlow ? "none" : "4 2"}
								markerEnd={isDataFlow ? "url(#arrowhead)" : undefined}
								opacity={opacity}
								style={{ transition: "opacity 0.6s ease" }}
							/>
							{conn.label && opacity > 0 && (
								<text
									x={(from.cx + to.cx) / 2 + 10}
									y={(from.cy + to.cy) / 2}
									fill="oklch(0.7 0.1 160)"
									fontSize="10"
									fontFamily="monospace"
									opacity={opacity}
									style={{ transition: "opacity 0.6s ease" }}
								>
									{conn.label}
								</text>
							)}
						</g>
					);
				})}

				{/* Module Nodes */}
				{MODULES.map((node) => {
					const colors = TYPE_COLORS[node.type];
					const opacity = getNodeOpacity(node.type);
					const isHovered = hoveredNode === node.id;

					return (
						<g
							key={node.id}
							opacity={opacity}
							style={{ transition: "opacity 0.5s ease" }}
							onMouseEnter={() => setHoveredNode(node.id)}
							onMouseLeave={() => setHoveredNode(null)}
						>
							<rect
								x={node.x}
								y={node.y}
								width={120}
								height={50}
								rx={6}
								fill={colors.bg}
								stroke={colors.border}
								strokeWidth={isHovered ? 2 : 1}
								filter={isHovered ? "url(#glow)" : undefined}
								style={{ transition: "all 0.2s ease", cursor: "pointer" }}
							/>
							<text
								x={node.x + 60}
								y={node.y + 22}
								textAnchor="middle"
								fill={colors.text}
								fontSize="13"
								fontWeight="600"
							>
								{node.label}
							</text>
							<text
								x={node.x + 60}
								y={node.y + 38}
								textAnchor="middle"
								fill={colors.text}
								fontSize="9"
								opacity={0.7}
							>
								{node.description}
							</text>
						</g>
					);
				})}

				{/* Formula annotation */}
				<g
					opacity={animationPhase >= 4 ? 1 : 0}
					style={{ transition: "opacity 0.6s ease" }}
				>
					<rect
						x={480}
						y={35}
						width={170}
						height={40}
						rx={4}
						fill="oklch(0.2 0.02 260)"
						stroke="oklch(0.4 0.05 260)"
						strokeDasharray="3 2"
					/>
					<text
						x={565}
						y={52}
						textAnchor="middle"
						fill="oklch(0.75 0.08 85)"
						fontSize="10"
						fontFamily="monospace"
					>
						closing = opening
					</text>
					<text
						x={565}
						y={66}
						textAnchor="middle"
						fill="oklch(0.75 0.08 85)"
						fontSize="10"
						fontFamily="monospace"
					>
						+ produced - dispatched
					</text>
				</g>
			</svg>

			{/* Legend */}
			<div
				className="flex justify-center gap-6 mt-4 text-xs"
				style={{
					opacity: animationPhase >= 4 ? 1 : 0,
					transition: "opacity 0.5s ease",
				}}
			>
				<div className="flex items-center gap-2">
					<span
						className="w-3 h-3 rounded"
						style={{ background: TYPE_COLORS.foundational.border }}
					/>
					<span style={{ color: "oklch(0.7 0.03 260)" }}>Foundational</span>
				</div>
				<div className="flex items-center gap-2">
					<span
						className="w-3 h-3 rounded"
						style={{ background: TYPE_COLORS.core.border }}
					/>
					<span style={{ color: "oklch(0.7 0.05 160)" }}>Core Operations</span>
				</div>
				<div className="flex items-center gap-2">
					<span
						className="w-3 h-3 rounded"
						style={{ background: TYPE_COLORS.calculated.border }}
					/>
					<span style={{ color: "oklch(0.7 0.05 85)" }}>Calculated</span>
				</div>
			</div>
		</div>
	);
}

export default ModuleArchitectureDiagram;
