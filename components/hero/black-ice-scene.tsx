"use client";

import { type FC, useEffect } from "react";
import { Backdrop } from "./components/backdrop";
import { CameraRig } from "./components/camera-rig";
import { Nodes } from "./components/nodes";
import { Signals } from "./components/signals";
import { Spine } from "./components/spine";
import { useSignalPath } from "./hooks/use-signal-path";

// ============================================================================
// TYPES
// ============================================================================

interface BlackIceSceneProps {
	nodeCount?: number;
	PerformanceMonitor?: FC<{ children: React.ReactNode }>;
}

// ============================================================================
// MAIN SCENE
// ============================================================================

/**
 * BlackIceScene - main scene container for Black Ice hero concept
 * Combines all Black Ice components:
 * - Backdrop (grid + noise)
 * - Spine (curve with glass edges)
 * - Nodes (octahedra + rings along spine)
 * - Signals (packets following spine with idempotency)
 * - CameraRig (parallax + drift)
 */
export const BlackIceScene: FC<BlackIceSceneProps> = ({
	nodeCount = 12,
	PerformanceMonitor,
}) => {
	const { signals, removeSignal, checkIdempotency } = useSignalPath();

	// Check for duplicate signals periodically
	useEffect(() => {
		const interval = setInterval(() => {
			checkIdempotency(signals);
		}, 100);

		return () => clearInterval(interval);
	}, [signals, checkIdempotency]);

	// Handle collapse animation completion
	const handleCollapseComplete = (id: string) => {
		removeSignal(id);
	};

	const sceneContent = (
		<CameraRig>
			{/* Backdrop layer */}
			<Backdrop />

			{/* Main elements */}
			<Spine />
			<Nodes nodeCount={nodeCount} />

			{/* Signals on top */}
			<Signals
				signals={signals}
				onRemove={removeSignal}
				onCollapseComplete={handleCollapseComplete}
			/>
		</CameraRig>
	);

	// Wrap with PerformanceMonitor if provided
	if (PerformanceMonitor) {
		return <PerformanceMonitor>{sceneContent}</PerformanceMonitor>;
	}

	return sceneContent;
};

export default BlackIceScene;
