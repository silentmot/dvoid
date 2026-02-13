"use client";

import { type ClassValue, clsx } from "clsx";
import {
	type MotionValue,
	motion,
	useAnimationFrame,
	useMotionTemplate,
	useMotionValue,
} from "framer-motion";
import {
	Eye,
	EyeOff,
	Layers,
	Monitor,
	Moon,
	MousePointer2,
	Sun,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import * as THREE from "three";

/**
 * UTILITIES
 * Simulating standard project utils
 */
function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * COMPONENT: GridPattern
 * Reusable SVG pattern for the infinite grid effect
 */
interface GridPatternProps {
	patternId: string;
	offsetX: MotionValue<number>;
	offsetY: MotionValue<number>;
}

function GridPattern({ patternId, offsetX, offsetY }: GridPatternProps) {
	return (
		<svg className="w-full h-full">
			<defs>
				<motion.pattern
					id={patternId}
					width="40"
					height="40"
					patternUnits="userSpaceOnUse"
					x={offsetX}
					y={offsetY}
				>
					<path
						d="M 40 0 L 0 0 0 40"
						fill="none"
						stroke="currentColor"
						strokeWidth="1"
						// Increased visibility: Removed /30 opacity modifier
						className="text-gray-500"
					/>
				</motion.pattern>
			</defs>
			<rect width="100%" height="100%" fill={`url(#${patternId})`} />
		</svg>
	);
}

/**
 * MAIN COMPONENT
 * Combined visualization with debug controls
 */
export interface DottedGridDemoProps {
	title?: string;
	subtitle?: string;
	tagline?: string;
	hideControls?: boolean;
	showScrollIndicator?: boolean;
}

export function DottedGridDemo({
	title = "Dotted Grid",
	subtitle = "Visual Synthesis Analysis",
	tagline,
	hideControls = false,
	showScrollIndicator = true,
}: DottedGridDemoProps) {
	// Visualization State
	const [theme, setTheme] = useState<"dark" | "light">("dark");
	const [showParticles, setShowParticles] = useState(true);
	const [showGrid, setShowGrid] = useState(true);
	const [showMask, setShowMask] = useState(true);

	// --- THREE.JS LAYER (Particles) ---
	const canvasContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!canvasContainerRef.current || !showParticles) return;

		// Constants
		const SEPARATION = 150;
		const AMOUNTX = 50; // Increased slightly for wider screens
		const AMOUNTY = 50;

		// Setup
		const scene = new THREE.Scene();
		// Adjust fog based on theme
		const fogColor = theme === "dark" ? 0x050505 : 0xffffff;
		scene.fog = new THREE.Fog(fogColor, 2000, 10000);

		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			10000,
		);
		// High angle camera
		camera.position.set(0, 400, 1200);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(scene.fog.color, 0); // 0 alpha for transparency

		// Mount
		const container = canvasContainerRef.current;
		// Clear any existing canvas (React Strict Mode safety)
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
		container.appendChild(renderer.domElement);

		// Particles Data
		const positions: number[] = [];
		const colors: number[] = [];
		const geometry = new THREE.BufferGeometry();

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
				positions.push(x, 0, z);

				// Color based on theme
				if (theme === "dark") {
					// Slight blue-ish tint for dark mode dots
					colors.push(0.3, 0.4, 0.5);
				} else {
					colors.push(0.1, 0.1, 0.1);
				}
			}
		}

		geometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(positions, 3),
		);
		geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({
			size: theme === "dark" ? 6 : 4,
			vertexColors: true,
			transparent: true,
			opacity: 0.6,
			sizeAttenuation: true,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		// Animation Loop
		let count = 0;
		let animationId = 0;

		const animate = () => {
			animationId = requestAnimationFrame(animate);

			const positionAttribute = geometry.attributes.position;
			const posArray = positionAttribute.array as Float32Array;

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					const index = i * 3;
					// Sine wave logic from original file
					posArray[index + 1] =
						Math.sin((ix + count) * 0.3) * 50 +
						Math.sin((iy + count) * 0.5) * 50;
					i++;
				}
			}

			positionAttribute.needsUpdate = true;
			renderer.render(scene, camera);

			// Slower animation speed (was 0.1)
			count += 0.02;
		};

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener("resize", handleResize);
		animate();

		return () => {
			window.removeEventListener("resize", handleResize);
			cancelAnimationFrame(animationId);

			// Cleanup Three.js resources
			geometry.dispose();
			material.dispose();
			renderer.dispose();
			if (container && renderer.domElement.parentNode === container) {
				container.removeChild(renderer.domElement);
			}
		};
	}, [theme, showParticles]);

	// --- FRAMER MOTION LAYER (Grid) ---
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		mouseX.set(e.clientX - rect.left);
		mouseY.set(e.clientY - rect.top);
	};

	const gridOffsetX = useMotionValue(0);
	const gridOffsetY = useMotionValue(0);

	useAnimationFrame(() => {
		gridOffsetX.set((gridOffsetX.get() + 0.5) % 40);
		gridOffsetY.set((gridOffsetY.get() + 0.5) % 40);
	});

	// Dynamic mask: if showMask is false, use a huge gradient that covers everything
	const maskImage = useMotionTemplate`radial-gradient(${showMask ? "300px" : "2000px"} circle at ${mouseX}px ${mouseY}px, black, transparent)`;

	// --- RENDER ---
	return (
		<div
			onMouseMove={handleMouseMove}
			className={cn(
				"relative w-full h-screen overflow-hidden transition-colors duration-500",
				theme === "dark" ? "bg-[#050505] text-white" : "bg-white text-black",
			)}
		>
			{/* 1. THREE.JS LAYER */}
			<div
				ref={canvasContainerRef}
				className="pointer-events-none absolute inset-0 z-0"
				style={{ opacity: showParticles ? 1 : 0 }}
			/>

			{/* 2. GRID LAYERS */}
			{showGrid && (
				<>
					{/* Base Static(ish) Grid - Increased opacity from 0.05 to 0.2 */}
					<div className="absolute inset-0 z-10 opacity-[0.2] pointer-events-none">
						<GridPattern
							patternId="dotgrid-base"
							offsetX={gridOffsetX}
							offsetY={gridOffsetY}
						/>
					</div>

					{/* Reveal Grid - Increased opacity from 0.4 to 1.0 */}
					<motion.div
						className="absolute inset-0 z-20 opacity-100 pointer-events-none"
						style={{
							maskImage,
							WebkitMaskImage: maskImage,
						}}
					>
						<div
							className={cn(
								"w-full h-full",
								theme === "dark" ? "text-white" : "text-black",
							)}
						>
							<GridPattern
								patternId="dotgrid-reveal"
								offsetX={gridOffsetX}
								offsetY={gridOffsetY}
							/>
						</div>
					</motion.div>
				</>
			)}

			{/* 3. AMBIENT BLOBS (from file) */}
			<div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
				<div className="absolute right-[-20%] top-[-20%] w-150 h-150 rounded-full bg-teal-500/20 blur-[120px]" />
				<div className="absolute left-[-10%] bottom-[-20%] w-150 h-150 rounded-full bg-blue-500/20 blur-[120px]" />
			</div>

			{/* 4. CONTROLS OVERLAY (For discussion/debug) */}
			{!hideControls && (
				<div className="absolute top-6 right-6 z-50 p-4 rounded-xl backdrop-blur-md border border-white/10 shadow-2xl w-64 space-y-4 bg-black/40 text-white">
					<div className="flex items-center gap-2 pb-2 border-b border-white/10">
						<Layers className="w-4 h-4 text-teal-400" />
						<h2 className="text-xs font-bold tracking-wider uppercase">
							Vis Controller
						</h2>
					</div>

					{/* Theme Toggle */}
					<div className="flex items-center justify-between">
						<span className="text-xs text-gray-400 flex items-center gap-2">
							{theme === "dark" ? (
								<Moon className="w-3 h-3" />
							) : (
								<Sun className="w-3 h-3" />
							)}
							Theme
						</span>
						<div className="flex bg-white/10 rounded-lg p-0.5">
							<button
								onClick={() => setTheme("dark")}
								className={cn(
									"px-2 py-1 rounded text-[10px] transition-all",
									theme === "dark"
										? "bg-teal-600 text-white"
										: "hover:text-white/80",
								)}
							>
								Dark
							</button>
							<button
								onClick={() => setTheme("light")}
								className={cn(
									"px-2 py-1 rounded text-[10px] transition-all",
									theme === "light"
										? "bg-teal-600 text-white"
										: "hover:text-white/80",
								)}
							>
								Light
							</button>
						</div>
					</div>

					{/* Particles Toggle */}
					<div className="flex items-center justify-between">
						<span className="text-xs text-gray-400 flex items-center gap-2">
							<Monitor className="w-3 h-3" />
							3D Particles
						</span>
						<button
							onClick={() => setShowParticles(!showParticles)}
							className={cn(
								"w-8 h-4 rounded-full relative transition-colors",
								showParticles ? "bg-teal-500" : "bg-white/20",
							)}
						>
							<div
								className={cn(
									"absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
									showParticles ? "left-4.5" : "left-0.5",
								)}
							/>
						</button>
					</div>

					{/* Grid Toggle */}
					<div className="flex items-center justify-between">
						<span className="text-xs text-gray-400 flex items-center gap-2">
							<MousePointer2 className="w-3 h-3" />
							Infinite Grid
						</span>
						<button
							onClick={() => setShowGrid(!showGrid)}
							className={cn(
								"w-8 h-4 rounded-full relative transition-colors",
								showGrid ? "bg-teal-500" : "bg-white/20",
							)}
						>
							<div
								className={cn(
									"absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
									showGrid ? "left-4.5" : "left-0.5",
								)}
							/>
						</button>
					</div>

					{/* Mask Toggle */}
					<div className="flex items-center justify-between">
						<span className="text-xs text-gray-400 flex items-center gap-2">
							{showMask ? (
								<Eye className="w-3 h-3" />
							) : (
								<EyeOff className="w-3 h-3" />
							)}
							Mouse Mask
						</span>
						<button
							onClick={() => setShowMask(!showMask)}
							className={cn(
								"w-8 h-4 rounded-full relative transition-colors",
								showMask ? "bg-teal-500" : "bg-white/20",
							)}
						>
							<div
								className={cn(
									"absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
									showMask ? "left-4.5" : "left-0.5",
								)}
							/>
						</button>
					</div>

					<div className="pt-2 border-t border-white/10">
						<p className="text-[10px] text-gray-500 leading-tight">
							Move mouse to reveal grid. Particles drift in background.
						</p>
					</div>
				</div>
			)}

			<div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
				<div className="text-center space-y-2">
					<p className="text-xs md:text-sm tracking-[0.4em] uppercase text-teal-400/70 mb-4 font-mono">
						{subtitle}
					</p>
					<h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white">
						{title}
					</h1>
					{tagline && (
						<p className="text-sm md:text-base max-w-lg mx-auto text-white/50 font-light leading-relaxed">
							{tagline}
						</p>
					)}
				</div>
			</div>

			{/* Scroll Indicator */}
			{showScrollIndicator && (
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
					<div className="flex flex-col items-center gap-2 text-white/40 animate-bounce">
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
		</div>
	);
}

export default DottedGridDemo;
