"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ============================================================================
// CONFIGURATION
// ============================================================================

const MAX_SIGNALS = 8;
const SIGNAL_SPEED = 0.15; // Progress per second along spine
const SIGNAL_SNAP_DISTANCE = 0.05; // For idempotency collapse
const EMISSION_INTERVAL = 2000; // ms
const EMISSION_CHANCE = 0.3; // 30% chance per interval

// ============================================================================
// TYPES
// ============================================================================

export interface Signal {
	id: string;
	progress: number; // [0, 1] along spine
	speed: number;
	active: boolean;
	collapsing?: boolean; // For collapse animation
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * useSignalPath - manages signal emission, lifecycle, and path-following
 * Replaces use-wave-compiler with spine-based signal system
 * Implements idempotency: duplicate signals collapse instantly
 */
export const useSignalPath = () => {
	const [signals, setSignals] = useState<Signal[]>([]);
	const signalIdCounter = useRef(0);

	// Emit a new signal at the start of the spine
	const emitSignal = useCallback(() => {
		setSignals((prev) => {
			// Don't exceed max signals
			if (prev.filter((s) => s.active && !s.collapsing).length >= MAX_SIGNALS) {
				return prev;
			}

			const newSignal: Signal = {
				id: `signal-${signalIdCounter.current++}`,
				progress: 0,
				speed: SIGNAL_SPEED + (Math.random() - 0.5) * 0.05, // Slight speed variation
				active: true,
			};

			return [...prev, newSignal];
		});
	}, []);

	// Remove a signal by id
	const removeSignal = useCallback((id: string) => {
		setSignals((prev) => prev.filter((s) => s.id !== id));
	}, []);

	// Mark signal for collapse animation
	const collapseSignal = useCallback((id: string) => {
		setSignals((prev) =>
			prev.map((s) => (s.id === id ? { ...s, collapsing: true } : s)),
		);
	}, []);

	// Auto-emit signals periodically
	useEffect(() => {
		const interval = setInterval(() => {
			if (Math.random() < EMISSION_CHANCE) {
				emitSignal();
			}
		}, EMISSION_INTERVAL);

		return () => clearInterval(interval);
	}, [emitSignal]);

	// Check for duplicates and mark for collapse
	const checkIdempotency = useCallback(
		(currentSignals: Signal[]) => {
			const progressBuckets = new Map<number, Signal[]>();

			// Group signals by progress bucket
			currentSignals.forEach((s) => {
				if (s.active && !s.collapsing) {
					const bucket = Math.floor(s.progress / SIGNAL_SNAP_DISTANCE);
					if (!progressBuckets.has(bucket)) {
						progressBuckets.set(bucket, []);
					}
					progressBuckets.get(bucket)!.push(s);
				}
			});

			// Collapse duplicates (keep first in each bucket)
			progressBuckets.forEach((bucket) => {
				if (bucket.length > 1) {
					// Keep first, collapse others
					bucket.slice(1).forEach((s) => collapseSignal(s.id));
				}
			});
		},
		[collapseSignal],
	);

	return {
		signals,
		emitSignal,
		removeSignal,
		checkIdempotency,
	};
};
