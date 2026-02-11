"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// ============================================================================
// CONFIGURATION
// ============================================================================

const PARALLAX_STRENGTH = 0.3;
const PARALLAX_SMOOTHING = 0.05;

// ============================================================================
// HOOK
// ============================================================================

/**
 * useParallax - calculates camera parallax offset based on pointer position
 * Returns a ref containing the smoothed offset vector
 */
export const useParallax = () => {
	const { pointer } = useThree();
	const parallaxOffset = useRef(new THREE.Vector2());
	const targetOffset = useRef(new THREE.Vector2());

	useFrame(() => {
		// Calculate target offset from pointer position [-1, 1]
		targetOffset.current.set(
			pointer.x * PARALLAX_STRENGTH,
			pointer.y * PARALLAX_STRENGTH,
		);

		// Smooth interpolation to target
		parallaxOffset.current.x +=
			(targetOffset.current.x - parallaxOffset.current.x) * PARALLAX_SMOOTHING;
		parallaxOffset.current.y +=
			(targetOffset.current.y - parallaxOffset.current.y) * PARALLAX_SMOOTHING;
	});

	return parallaxOffset;
};
