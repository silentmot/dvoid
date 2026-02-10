"use client";

import { PerformanceMonitor } from "@react-three/drei";
import type { PerformanceMonitorProps } from "@react-three/drei";
import { type FC, useMemo, useState } from "react";

// ============================================================================
// TYPES
// ============================================================================

export interface PerformanceAdaptive {
	nodeCount: number;
	particleCount: number;
	dpr: number[];
	PerformanceMonitor: FC<PerformanceMonitorProps>;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const COUNT_LIMITS = {
	MIN_NODES: 50,
	MAX_NODES: 500,
	MIN_PARTICLES: 100,
	MAX_PARTICLES: 1000,
	INCREMENT_NODES: 50,
	INCREMENT_PARTICLES: 100,
};

const DEVICE_BASE_COUNTS = {
	desktop: { nodes: 200, particles: 500 },
	tablet: { nodes: 100, particles: 300 },
	mobile: { nodes: 50, particles: 100 },
};

type DeviceTier = "mobile" | "tablet" | "desktop";

// ============================================================================
// HOOK
// ============================================================================

/**
 * Wraps @react-three/drei's PerformanceMonitor for adaptive quality scaling.
 * Adjusts node and particle counts based on FPS performance.
 * Returns reactive counts and pre-configured PerformanceMonitor component.
 */
export function usePerformanceAdaptive(
	deviceTier: DeviceTier = "desktop",
): PerformanceAdaptive {
	const [nodeCount, setNodeCount] = useState(
		DEVICE_BASE_COUNTS[deviceTier].nodes,
	);
	const [particleCount, setParticleCount] = useState(
		DEVICE_BASE_COUNTS[deviceTier].particles,
	);

	// Pre-configured PerformanceMonitor component
	const ConfiguredPerformanceMonitor: FC<PerformanceMonitorProps> = useMemo(
		() =>
			function MonitorWrapper({ children, ...props }: PerformanceMonitorProps) {
				return (
					<PerformanceMonitor
						onIncline={() => {
							setNodeCount((prev) =>
								Math.min(
									prev + COUNT_LIMITS.INCREMENT_NODES,
									COUNT_LIMITS.MAX_NODES,
								),
							);
							setParticleCount((prev) =>
								Math.min(
									prev + COUNT_LIMITS.INCREMENT_PARTICLES,
									COUNT_LIMITS.MAX_PARTICLES,
								),
							);
						}}
						onDecline={() => {
							setNodeCount((prev) =>
								Math.max(
									prev - COUNT_LIMITS.INCREMENT_NODES,
									COUNT_LIMITS.MIN_NODES,
								),
							);
							setParticleCount((prev) =>
								Math.max(
									prev - COUNT_LIMITS.INCREMENT_PARTICLES,
									COUNT_LIMITS.MIN_PARTICLES,
								),
							);
						}}
						flipflops={3}
						{...props}
					>
						{children}
					</PerformanceMonitor>
				);
			},
		[],
	);

	return {
		nodeCount,
		particleCount,
		dpr: [1, 1.5],
		PerformanceMonitor: ConfiguredPerformanceMonitor,
	};
}
