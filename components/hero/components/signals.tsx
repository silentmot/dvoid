"use client";

import { useFrame } from "@react-three/fiber";
import { type FC, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { COLOR_INSTANCES, COLORS } from "../constants/colors";
import type { Signal } from "../hooks/use-signal-path";

// ============================================================================
// CONFIGURATION
// ============================================================================

const SIGNAL_SIZE = 0.08;
const SIGNAL_COLLAPSE_DURATION = 0.1; // seconds for snap animation
const MAX_INSTANCES = 32; // Pre-allocated capacity

// Spine control points (must match spine.tsx)
const CONTROL_POINTS: THREE.Vector3[] = [
	new THREE.Vector3(-8, -4, 0),
	new THREE.Vector3(-3, -1, 1),
	new THREE.Vector3(2, 1, -0.5),
	new THREE.Vector3(6, 3, 0.5),
	new THREE.Vector3(10, 5, 0),
];

// ============================================================================
// TYPES
// ============================================================================

interface SignalsProps {
	signals: Signal[];
	onRemove: (id: string) => void;
	onCollapseComplete: (id: string) => void;
}

interface CollapsingSignal {
	id: string;
	scale: number;
	targetScale: number;
	startTime: number;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Signals component - sparse packets traveling along spine
 * Path-following with idempotency (duplicate collapse)
 * Uses InstancedMesh for efficient rendering
 */
export const Signals: FC<SignalsProps> = ({
	signals,
	onRemove,
	onCollapseComplete,
}) => {
	const meshRef = useRef<THREE.InstancedMesh>(null);
	const collapsingRef = useRef<Map<string, CollapsingSignal>>(new Map());

	// Create spine curve for path following
	const spineCurve = useRef<THREE.CatmullRomCurve3 | null>(null);

	useEffect(() => {
		spineCurve.current = new THREE.CatmullRomCurve3(CONTROL_POINTS);
	}, []);

	// Create geometry and material
	const geometry = useMemo(
		() => new THREE.SphereGeometry(SIGNAL_SIZE, 8, 8),
		[],
	);

	const material = useMemo(
		() =>
			new THREE.MeshBasicMaterial({
				color: COLORS.TEAL_300,
			}),
		[],
	);

	// Update signal positions and handle collapse
	useFrame((state, delta) => {
		if (!meshRef.current || !spineCurve.current) return;

		const dummy = new THREE.Object3D();
		const color = new THREE.Color();
		const currentTime = state.clock.getElapsedTime();

		// Update collapsing signals
		for (const [id, collapsing] of collapsingRef.current) {
			const elapsed = currentTime - collapsing.startTime;

			if (elapsed >= SIGNAL_COLLAPSE_DURATION) {
				// Collapse complete
				onCollapseComplete(id);
				collapsingRef.current.delete(id);
			} else {
				// Animate scale down
				const t = elapsed / SIGNAL_COLLAPSE_DURATION;
				const eased = 1 - t * t; // Ease out
				collapsing.scale = collapsing.targetScale * eased;
			}
		}

		// Count active signals for instance update
		let activeIndex = 0;

		for (const signal of signals) {
			if (!signal.active) continue;

			// Check if signal is collapsing
			const collapsing = collapsingRef.current.get(signal.id);

			if (signal.collapsing && !collapsing) {
				// Start collapse animation
				collapsingRef.current.set(signal.id, {
					id: signal.id,
					scale: 1,
					targetScale: 0,
					startTime: currentTime,
				});
			}

			// Update progress for active signals
			if (!signal.collapsing) {
				signal.progress += signal.speed * delta;

				// Remove signal when it reaches end of spine
				if (signal.progress >= 1) {
					onRemove(signal.id);
					continue;
				}
			}

			// Get position along spine curve
			const position = spineCurve.current.getPointAt(
				Math.min(1, signal.progress),
			);
			const tangent = spineCurve.current.getTangentAt(
				Math.min(1, signal.progress),
			);

			dummy.position.copy(position);

			// Scale (normal or collapsing)
			const scale = collapsing ? collapsing.scale : 1;
			dummy.scale.setScalar(scale);

			// Orient along spine tangent
			dummy.lookAt(position.clone().add(tangent));

			dummy.updateMatrix();
			meshRef.current.setMatrixAt(activeIndex, dummy.matrix);

			// Bright color for signal
			color.copy(COLOR_INSTANCES.TEAL_300);
			if (collapsing) {
				color.multiplyScalar(scale); // Fade with collapse
			}
			meshRef.current.setColorAt(activeIndex, color);

			activeIndex++;
		}

		// Hide unused instances
		for (let i = activeIndex; i < MAX_INSTANCES; i++) {
			dummy.position.set(0, 0, -1000);
			dummy.scale.setScalar(0);
			dummy.updateMatrix();
			meshRef.current.setMatrixAt(i, dummy.matrix);
		}

		meshRef.current.instanceMatrix.needsUpdate = true;
		if (meshRef.current.instanceColor) {
			meshRef.current.instanceColor.needsUpdate = true;
		}
	});

	return (
		<instancedMesh ref={meshRef} args={[geometry, material, MAX_INSTANCES]} />
	);
};

export default Signals;
