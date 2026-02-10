"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// ============================================================================
// TYPES
// ============================================================================

export interface Wave {
	id: string;
	position: THREE.Vector2; // normalized screen coordinates [0,1]
	time: number; // creation timestamp
	strength: number; // 0-1, decays over time
}

export interface WaveCompiler {
	waves: Wave[];
	addWave: (position: THREE.Vector2) => void;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const WAVE_LIFETIME = 5; // seconds
const AUTO_PULSE_MIN = 3000; // ms
const AUTO_PULSE_MAX = 5000; // ms

// ============================================================================
// HOOK
// ============================================================================

/**
 * Manages cursor-triggered compilation waves for the 3D network scene.
 * Waves decay over 5 seconds and are automatically cleaned up.
 * Auto-pulses every 3-5 seconds from center of screen for visual interest.
 */
export function useWaveCompiler(): WaveCompiler {
	const [waves, setWaves] = useState<Wave[]>([]);
	const autoPulseTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
	const updateIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

	// Add a new wave at position
	const addWave = (position: THREE.Vector2) => {
		const newWave: Wave = {
			id: Math.random().toString(36).substring(7),
			position: position.clone(),
			time: Date.now() / 1000,
			strength: 1,
		};
		setWaves((prev) => [...prev, newWave]);
	};

	// Auto-pulse from center
	const scheduleAutoPulse = () => {
		if (autoPulseTimeoutRef.current) {
			clearTimeout(autoPulseTimeoutRef.current);
		}

		const delay = Math.random() * (AUTO_PULSE_MAX - AUTO_PULSE_MIN) + AUTO_PULSE_MIN;
		autoPulseTimeoutRef.current = setTimeout(() => {
			addWave(new THREE.Vector2(0.5, 0.5)); // Center of screen
			scheduleAutoPulse();
		}, delay);
	};

	// Wave decay and cleanup loop
	useEffect(() => {
		updateIntervalRef.current = setInterval(() => {
			const currentTime = Date.now() / 1000;

			setWaves((prevWaves) => {
				// Update strength based on decay
				const updated = prevWaves.map((wave) => ({
					...wave,
					strength: Math.max(
						0,
						1 - (currentTime - wave.time) / WAVE_LIFETIME,
					),
				}));

				// Remove dead waves
				return updated.filter((wave) => wave.strength > 0);
			});
		}, 100); // 10fps update rate is sufficient for wave decay

		return () => {
			if (updateIntervalRef.current) {
				clearInterval(updateIntervalRef.current);
			}
		};
	}, []);

	// Start auto-pulse on mount
	useEffect(() => {
		scheduleAutoPulse();

		return () => {
			if (autoPulseTimeoutRef.current) {
				clearTimeout(autoPulseTimeoutRef.current);
			}
		};
	}, []);

	return {
		waves,
		addWave,
	};
}
