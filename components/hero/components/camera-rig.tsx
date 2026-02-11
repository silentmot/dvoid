"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { type FC, type ReactNode, useRef } from "react";
import * as THREE from "three";
import { useParallax } from "../hooks/use-parallax";

// ============================================================================
// CONFIGURATION
// ============================================================================

const BASE_CAMERA_POS = new THREE.Vector3(0, 0, 15);
const DRIFT_SPEED = 0.05;
const DRIFT_AMPLITUDE = 0.2;

// ============================================================================
// PROPS
// ============================================================================

interface CameraRigProps {
	children: ReactNode;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * CameraRig - provides stable camera with slow drift and pointer-tied parallax
 * Wraps children in a group that applies camera transforms
 */
export const CameraRig: FC<CameraRigProps> = ({ children }) => {
	const { camera } = useThree();
	const parallaxOffset = useParallax();
	const driftOffset = useRef(new THREE.Vector3());

	// Update camera position with drift and parallax
	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		// Calculate auto-drift using sine waves
		const driftX = Math.sin(time * DRIFT_SPEED) * DRIFT_AMPLITUDE;
		const driftY = Math.cos(time * DRIFT_SPEED * 0.7) * DRIFT_AMPLITUDE * 0.5;

		driftOffset.current.set(driftX, driftY, 0);

		// Combine base position + drift + parallax
		camera.position.x =
			BASE_CAMERA_POS.x + driftOffset.current.x + parallaxOffset.current.x;
		camera.position.y =
			BASE_CAMERA_POS.y + driftOffset.current.y + parallaxOffset.current.y;
		camera.position.z = BASE_CAMERA_POS.z;

		camera.lookAt(0, 0, 0);
	});

	return <group>{children}</group>;
};

export default CameraRig;
