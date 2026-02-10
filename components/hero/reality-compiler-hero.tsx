"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type FC, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useDeviceCapability } from "./hooks/use-device-capability";
import { usePerformanceAdaptive } from "./hooks/use-performance-adaptive";
import { useWaveCompiler } from "./hooks/use-wave-compiler";
import { NetworkScene } from "./network-scene";
import { WaveParticles } from "./wave-particles";
import StaticFallback from "./static-fallback";

// ============================================================================
// TYPES
// ============================================================================

interface RealityCompilerHeroProps {
	title?: string;
	subtitle?: string;
	tagline?: string;
	scrollIndicator?: boolean;
}

// ============================================================================
// MAIN SCENE
// ============================================================================

const Scene: FC = () => {
	const { nodeCount } = usePerformanceAdaptive();
	const { waves, addWave } = useWaveCompiler();
	const { pointer } = useThree();
	const lastPointerRef = useRef({ x: 0, y: 0 });

	// Track cursor movement and emit waves
	useFrame(() => {
		// Convert pointer from [-1, 1] to [0, 1] for wave system
		const normalizedX = (pointer.x + 1) / 2;
		const normalizedY = (pointer.y + 1) / 2;

		// Calculate distance from last pointer position
		const dx = normalizedX - lastPointerRef.current.x;
		const dy = normalizedY - lastPointerRef.current.y;
		const dist = Math.sqrt(dx * dx + dy * dy);

		// Emit wave on significant cursor movement (throttled)
		if (dist > 0.05) {
			addWave(new THREE.Vector2(normalizedX, normalizedY));
			lastPointerRef.current = { x: normalizedX, y: normalizedY };
		}
	});

	return (
		<>
			<NetworkScene nodeCount={nodeCount} waves={waves} />
			<WaveParticles waves={waves} />
		</>
	);
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const RealityCompilerHero: FC<RealityCompilerHeroProps> = ({
	title = "D-VOID",
	subtitle = "Technical Operations Specialist",
	tagline = "Compiling industrial systems into operational reality",
	scrollIndicator = true,
}) => {
	const [isClient, setIsClient] = useState(false);
	const capability = useDeviceCapability();
	const { PerformanceMonitor } = usePerformanceAdaptive(capability.deviceTier);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const shouldShowStatic = capability.prefersReducedMotion || capability.isMobile;

	return (
		<section className="relative w-full h-screen bg-black overflow-hidden">
			{/* 3D Canvas or Static Fallback */}
			{isClient && !shouldShowStatic ? (
				<div className="absolute inset-0 z-0">
					<PerformanceMonitor>
						<Canvas
							camera={{ position: [0, 0, 12], fov: 50 }}
							dpr={[1, 1.5]}
							gl={{
								antialias: true,
								alpha: false,
								powerPreference: "high-performance",
							}}
						>
							<Scene />
						</Canvas>
					</PerformanceMonitor>
				</div>
			) : (
				<StaticFallback />
			)}

			{/* Content Overlay */}
			<div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none">
				<div className="text-center px-6">
					{/* Subtitle */}
					<p className="text-xs md:text-sm tracking-[0.4em] uppercase text-teal-400/70 mb-4 font-mono">
						{subtitle}
					</p>

					{/* Main Title */}
					<h1
						className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6"
						style={{ mixBlendMode: "difference" }}
					>
						{title}
					</h1>

					{/* Tagline */}
					<p className="text-sm md:text-base max-w-lg mx-auto text-white/50 font-light leading-relaxed">
						{tagline}
					</p>

					{/* Interaction hint (desktop only) */}
					{!capability.isMobile && !capability.prefersReducedMotion && (
						<p className="mt-8 text-xs text-teal-400/40 tracking-widest uppercase font-mono">
							Move cursor to compile reality
						</p>
					)}
				</div>
			</div>

			{/* Scroll Indicator */}
			{scrollIndicator && (
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
					<div
						className={`flex flex-col items-center gap-2 text-white/40 ${
							capability.prefersReducedMotion ? "" : "animate-bounce"
						}`}
					>
						<span className="text-xs tracking-[0.3em] uppercase font-mono">
							Scroll
						</span>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M19 14l-7 7m0 0l-7-7m7 7V3"
							/>
						</svg>
					</div>
				</div>
			)}

			{/* Vignette overlay */}
			<div
				className="absolute inset-0 z-5 pointer-events-none"
				style={{
					background:
						"radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
				}}
			/>
		</section>
	);
};

export default RealityCompilerHero;
