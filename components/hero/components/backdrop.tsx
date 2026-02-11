"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { COLORS } from "../constants/colors";

// ============================================================================
// CONFIGURATION
// ============================================================================

const GRID_SIZE = 40;
const GRID_DIVISIONS = 40;
const GRID_OPACITY = 0.08;
const NOISE_OPACITY = 0.03;
const NOISE_SCALE = 3.0;
const NOISE_SPEED = 0.05;

// ============================================================================
// SHADERS
// ============================================================================

const noiseVertexShader = `
 varying vec2 vUv;
 void main() {
   vUv = uv;
   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
 }
`;

const noiseFragmentShader = `
 varying vec2 vUv;
 uniform float uTime;
 uniform float uOpacity;

 // Simple pseudo-random noise
 float random(vec2 st) {
   return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
 }

 float noise(vec2 st) {
   vec2 i = floor(st);
   vec2 f = fract(st);
   float a = random(i);
   float b = random(i + vec2(1.0, 0.0));
   float c = random(i + vec2(0.0, 1.0));
   float d = random(i + vec2(1.0, 1.0));
   vec2 u = f * f * (3.0 - 2.0 * f);
   return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
 }

 void main() {
   float n = noise(vUv * ${NOISE_SCALE.toFixed(1)} + uTime * ${NOISE_SPEED.toFixed(2)});
   gl_FragColor = vec4(0.0, 0.0, 0.0, n * uOpacity);
 }
`;

// ============================================================================
// NOISE FILM COMPONENT
// ============================================================================

/**
 * NoiseFilm - subtle animated noise overlay
 * Full-screen plane with shader material
 */
const NoiseFilm = () => {
	const uniforms = useMemo(
		() => ({
			uTime: { value: 0 },
			uOpacity: { value: NOISE_OPACITY },
		}),
		[],
	);

	useFrame((state) => {
		uniforms.uTime.value = state.clock.getElapsedTime();
	});

	const material = useMemo(() => {
		return new THREE.ShaderMaterial({
			vertexShader: noiseVertexShader,
			fragmentShader: noiseFragmentShader,
			uniforms,
			transparent: true,
			depthWrite: false,
		});
	}, [uniforms]);

	return (
		<mesh material={material}>
			<planeGeometry args={[50, 50]} />
		</mesh>
	);
};

// ============================================================================
// BACKDROP COMPONENT
// ============================================================================

/**
 * Backdrop component - faint world grid plane + soft noise film
 * Grid: very low alpha teal lines
 * Noise: subtle animated shader overlay
 */
export const Backdrop = () => {
	return (
		<group>
			{/* World grid plane */}
			<gridHelper
				args={[GRID_SIZE, GRID_DIVISIONS, COLORS.TEAL_400, COLORS.TEAL_400]}
				position={[0, 0, -5]}
				material-opacity={GRID_OPACITY}
				material-transparent={true}
				material-depthWrite={false}
			/>

			{/* Soft noise film */}
			<NoiseFilm />
		</group>
	);
};

export default Backdrop;
