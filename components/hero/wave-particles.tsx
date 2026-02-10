"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { type FC, useEffect, useRef } from "react";
import * as THREE from "three";

// ============================================================================
// TYPES
// ============================================================================

export interface WaveParticlesProps {
	waves: Array<{
		id: string;
		position: THREE.Vector2;
		time: number;
		strength: number;
	}>;
}

interface Particle {
	position: THREE.Vector3;
	velocity: THREE.Vector3;
	lifetime: number;
	maxLifetime: number;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const PARTICLES_PER_WAVE = 25;
const PARTICLE_MIN_SPEED = 2;
const PARTICLE_MAX_SPEED = 5;
const PARTICLE_LIFETIME = 2; // seconds
const PARTICLE_SIZE = 0.05;
const PARTICLE_COLOR = new THREE.Color(0x99f6e4); // teal-300

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Particle burst system that emits particles from wave positions.
 * Particles travel outward in 3D sphere pattern and fade over lifetime.
 * Uses InstancedMesh for efficient single-draw-call rendering.
 */
export const WaveParticles: FC<WaveParticlesProps> = ({ waves }) => {
	const meshRef = useRef<THREE.InstancedMesh>(null);
	const particlesRef = useRef<Particle[]>([]);
	const activeWavesRef = useRef<Set<string>>(new Set());
	const processedWavesRef = useRef<Set<string>>(new Set());

	const { camera, size } = useThree();

	// Calculate world-space bounds from camera
	const worldWidth = 20;
	const worldHeight = 15;

	// Convert normalized screen coordinates to world space
	const screenToWorld = (screenPos: THREE.Vector2): THREE.Vector2 => {
		return new THREE.Vector2(
			(screenPos.x - 0.5) * worldWidth,
			(screenPos.y - 0.5) * worldHeight,
		);
	};

	// Emit particles for new waves
	useEffect(() => {
		const newActiveWaves = new Set(waves.map((w) => w.id));

		// Find new waves that haven't been processed
		for (const wave of waves) {
			if (!processedWavesRef.current.has(wave.id)) {
				const worldPos = screenToWorld(wave.position);

				// Emit burst of particles
				for (let i = 0; i < PARTICLES_PER_WAVE; i++) {
					// Random direction in 3D sphere
					const theta = Math.random() * Math.PI * 2;
					const phi = Math.acos(2 * Math.random() - 1);
					const speed =
						PARTICLE_MIN_SPEED +
						Math.random() * (PARTICLE_MAX_SPEED - PARTICLE_MIN_SPEED);

					const velocity = new THREE.Vector3(
						Math.sin(phi) * Math.cos(theta) * speed,
						Math.sin(phi) * Math.sin(theta) * speed,
						Math.cos(phi) * speed * 0.5, // Less z-movement
					);

					particlesRef.current.push({
						position: new THREE.Vector3(worldPos.x, worldPos.y, 0),
						velocity,
						lifetime: 0,
						maxLifetime: PARTICLE_LIFETIME,
					});
				}

				processedWavesRef.current.add(wave.id);
			}
		}

		activeWavesRef.current = newActiveWaves;
	}, [waves]);

	// Update particle positions and lifetimes
	useFrame((state, delta) => {
		if (!meshRef.current) return;

		const dummy = new THREE.Object3D();
		const color = new THREE.Color();

		// Filter dead particles and update living ones
		const aliveParticles: Particle[] = [];

		for (const particle of particlesRef.current) {
			particle.lifetime += delta;

			if (particle.lifetime < particle.maxLifetime) {
				// Update position
				particle.position.addScaledVector(particle.velocity, delta);

				// Add slight drag
				particle.velocity.multiplyScalar(0.98);

				aliveParticles.push(particle);
			}
		}

		particlesRef.current = aliveParticles;

		// Update InstancedMesh
		const maxParticles = PARTICLES_PER_WAVE * 20; // Pre-allocate capacity

		for (let i = 0; i < maxParticles; i++) {
			if (i < particlesRef.current.length) {
				const particle = particlesRef.current[i];

				dummy.position.copy(particle.position);

				// Scale fades with lifetime
				const lifeProgress = particle.lifetime / particle.maxLifetime;
				const fadeOut = 1 - Math.pow(lifeProgress, 2); // Quadratic fade
				const scale = fadeOut;

				dummy.scale.setScalar(scale);
				dummy.updateMatrix();

				meshRef.current.setMatrixAt(i, dummy.matrix);

				// Color fades with lifetime
				color.copy(PARTICLE_COLOR);
				color.multiplyScalar(fadeOut);
				meshRef.current.setColorAt(i, color);
			} else {
				// Hide unused instances
				dummy.position.set(0, 0, -1000);
				dummy.scale.setScalar(0);
				dummy.updateMatrix();
				meshRef.current.setMatrixAt(i, dummy.matrix);
			}
		}

		meshRef.current.instanceMatrix.needsUpdate = true;
		if (meshRef.current.instanceColor) {
			meshRef.current.instanceColor.needsUpdate = true;
		}
	});

	return (
		<instancedMesh
			ref={meshRef}
			args={[
				new THREE.SphereGeometry(PARTICLE_SIZE, 6, 6),
				new THREE.MeshBasicMaterial({ color: 0xffffff }),
				PARTICLES_PER_WAVE * 20,
			]}
		/>
	);
};

export default WaveParticles;
