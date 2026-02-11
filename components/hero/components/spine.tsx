"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { COLOR_INSTANCES, COLORS } from "../constants/colors";

// ============================================================================
// CONFIGURATION
// ============================================================================

const SPINE_BASE_THICKNESS = 0.15;
const SPINE_TIP_THICKNESS = 0.03;
const _SPINE_SEGMENTS = 128;
const SPINE_TUBULAR_SEGMENTS = 32;
const SPINE_RADIAL_SEGMENTS = 8;

// Control points for the spine curve (authority gradient flow)
const CONTROL_POINTS: THREE.Vector3[] = [
	new THREE.Vector3(-8, -4, 0),
	new THREE.Vector3(-3, -1, 1),
	new THREE.Vector3(2, 1, -0.5),
	new THREE.Vector3(6, 3, 0.5),
	new THREE.Vector3(10, 5, 0),
];

// ============================================================================
// SPINE COMPONENT
// ============================================================================

/**
 * Spine component - single clean spline with thickness taper (authority gradient)
 * Uses CatmullRomCurve3 for smooth curve path
 * TubeGeometry with varying radius for taper effect
 * MeshPhysicalMaterial with transmission for glass edge effect
 */
export const Spine = () => {
	// Create the curve
	const curve = useMemo(() => {
		return new THREE.CatmullRomCurve3(CONTROL_POINTS);
	}, []);

	// Create tube geometry with taper function
	const geometry = useMemo(() => {
		// Custom radius function for thickness taper (authority gradient)
		// Progress from 0 (base) to 1 (tip)
		const radiusFunction = (t: number): number => {
			const taper = 1 - t; // Inverse for base-to-tip
			return (
				SPINE_TIP_THICKNESS +
				(SPINE_BASE_THICKNESS - SPINE_TIP_THICKNESS) * taper
			);
		};

		// Create geometry with varying radius
		const geometry = new THREE.TubeGeometry(
			curve,
			SPINE_TUBULAR_SEGMENTS,
			SPINE_BASE_THICKNESS,
			SPINE_RADIAL_SEGMENTS,
			false,
		);

		// Apply radius taper by scaling radial segments
		const positions = geometry.attributes.position;
		for (let i = 0; i < positions.count; i++) {
			const x = positions.getX(i);
			const y = positions.getY(i);

			// Calculate which segment this vertex belongs to
			const segmentIndex = Math.floor(i / (SPINE_RADIAL_SEGMENTS + 1));
			const t = Math.min(1, segmentIndex / SPINE_TUBULAR_SEGMENTS);
			const scale = radiusFunction(t) / SPINE_BASE_THICKNESS;

			positions.setX(i, x * scale);
			positions.setY(i, y * scale);
		}

		geometry.computeVertexNormals();
		return geometry;
	}, [curve]);

	// Glass material with transmission
	const material = useMemo(() => {
		return new THREE.MeshPhysicalMaterial({
			color: COLORS.TEAL_400,
			metalness: 0.1,
			roughness: 0.2,
			transmission: 0.6,
			thickness: 0.5,
			clearcoat: 1.0,
			clearcoatRoughness: 0.1,
			emissive: COLORS.TEAL_400,
			emissiveIntensity: 0.1,
		});
	}, []);

	return <mesh geometry={geometry} material={material} />;
};

export default Spine;
