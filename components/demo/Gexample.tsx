"use client";

import {
	ContactShadows,
	Edges,
	Environment,
	Float,
	Grid,
	Instance,
	Instances,
	Line,
	OrbitControls,
	Sparkles,
	Stars,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * CONFIGURATION & TOKENS
 */
const THEME = {
	black: "#050505",
	charcoal: "#111111",
	teal: "#0d9488", // Engineering teal, not neon cyan
	tealDim: "#0f514b",
	tealBright: "#5eead4",
	glass: "#a5f3fc",
	white: "#ffffff",
	warning: "#fbbf24",
};

// Hook for reduced motion preference
const useReducedMotion = () => {
	const [matches, setMatches] = useState(false);
	useEffect(() => {
		// Check if running in a browser environment
		if (typeof window !== "undefined" && window.matchMedia) {
			const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
			setMatches(mediaQuery.matches);
			const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
			mediaQuery.addEventListener("change", handler);
			return () => mediaQuery.removeEventListener("change", handler);
		}
		return () => {};
	}, []);
	return matches;
};

// --- OPTION A: BLACK ICE BLUEPRINT COMPONENTS ---

const BlueprintSpine = ({ reducedMotion }: { reducedMotion: boolean }) => {
	const meshRef = useRef<THREE.Group>(null);

	useFrame((state) => {
		if (!reducedMotion && meshRef.current) {
			meshRef.current.rotation.z =
				Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
		}
	});

	return (
		<group ref={meshRef}>
			{/* Main Spine - Transparent "Ghost" Cylinder */}
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<cylinderGeometry args={[0.5, 0.5, 12, 8, 1, true]} />
				<meshBasicMaterial
					color={THEME.teal}
					transparent
					opacity={0.05}
					side={THREE.DoubleSide}
					wireframe
				/>
			</mesh>

			{/* Inner Core - The Authority Line */}
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<cylinderGeometry args={[0.05, 0.05, 12, 6]} />
				<meshBasicMaterial color={THEME.teal} />
			</mesh>

			{/* Nodes: Octahedra (Sharp, Technical) */}
			<Float
				speed={reducedMotion ? 0 : 2}
				rotationIntensity={0.2}
				floatIntensity={0.2}
			>
				<group position={[-2, 0.5, 0]}>
					<mesh>
						<octahedronGeometry args={[0.6, 0]} />
						<meshPhysicalMaterial
							roughness={0}
							transmission={0.9}
							thickness={1}
							color={THEME.tealDim}
						/>
						<Edges color={THEME.tealBright} threshold={15} />
					</mesh>
				</group>

				<group position={[2, -0.4, 0.5]}>
					<mesh>
						<octahedronGeometry args={[0.4, 0]} />
						<meshPhysicalMaterial
							roughness={0}
							transmission={0.6}
							thickness={0.5}
							color={THEME.black}
						/>
						<Edges color={THEME.teal} threshold={15} />
					</mesh>
				</group>
			</Float>

			{/* Signals: Packets moving along the spine */}
			<SignalPackets
				count={3}
				speed={2}
				color={THEME.white}
				shape="box"
				reducedMotion={reducedMotion}
			/>
		</group>
	);
};

// --- OPTION B: GLASS CIRCUIT SCULPTURE COMPONENTS ---

const SculptureSpine = ({ reducedMotion }: { reducedMotion: boolean }) => {
	const meshRef = useRef<THREE.Group>(null);

	useFrame((state) => {
		if (!reducedMotion && meshRef.current) {
			meshRef.current.rotation.x =
				Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
		}
	});

	return (
		<group ref={meshRef}>
			{/* Main Spine - Polished Conductor */}
			<mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow castShadow>
				<cylinderGeometry args={[0.4, 0.4, 10, 32]} />
				<meshPhysicalMaterial
					color={THEME.charcoal}
					metalness={0.8}
					roughness={0.2}
					clearcoat={1}
					clearcoatRoughness={0.1}
				/>
			</mesh>

			{/* Glass Shell surrounding Spine */}
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<cylinderGeometry args={[0.55, 0.55, 10, 32]} />
				<meshPhysicalMaterial
					color={THEME.tealDim}
					transparent
					opacity={0.3}
					transmission={0.5}
					roughness={0}
					depthWrite={false}
				/>
			</mesh>

			{/* Nodes: Dodecahedron (Orchestrator Core) */}
			<Float
				speed={reducedMotion ? 0 : 1}
				rotationIntensity={0.5}
				floatIntensity={0.5}
			>
				<group position={[0, 0, 0]}>
					<mesh castShadow>
						<dodecahedronGeometry args={[1.2, 0]} />
						<meshPhysicalMaterial
							color={THEME.black}
							metalness={0.9}
							roughness={0.1}
						/>
					</mesh>
					{/* Internal Glow */}
					<mesh scale={0.8}>
						<dodecahedronGeometry args={[1, 0]} />
						<meshBasicMaterial color={THEME.teal} wireframe />
					</mesh>
					{/* Iris Shutter Ring */}
					<mesh rotation={[0, 0, Math.PI / 2]}>
						<torusGeometry args={[1.4, 0.05, 16, 100]} />
						<meshStandardMaterial color={THEME.teal} emissive={THEME.tealDim} />
					</mesh>
				</group>
			</Float>

			{/* Signals: Scanline trails */}
			<SignalPackets
				count={5}
				speed={1}
				color={THEME.tealBright}
				shape="sphere"
				trail
				reducedMotion={reducedMotion}
			/>
		</group>
	);
};

// --- OPTION C: LINEAGE CONSTELLATION MINIMAL COMPONENTS ---

const ConstellationSpine = ({ reducedMotion }: { reducedMotion: boolean }) => {
	return (
		<group>
			{/* Spine - Barely there line */}
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<cylinderGeometry args={[0.02, 0.02, 14, 8]} />
				<meshStandardMaterial
					color={THEME.tealDim}
					emissive={THEME.tealDim}
					emissiveIntensity={0.5}
				/>
			</mesh>

			{/* Nodes - Tiny Ceramic Forms */}
			<Instances>
				<sphereGeometry args={[0.15, 32, 32]} />
				<meshStandardMaterial color={THEME.charcoal} roughness={1} />

				<Instance position={[-3, 0.5, 0]} />
				<Instance position={[3, -0.2, 0]} />
				<Instance position={[0, 1.5, -1]} />
			</Instances>

			{/* Lineage Paths - Thin lines connecting nodes to spine */}
			<Line
				points={[
					[-3, 0.5, 0],
					[-3, 0, 0],
					[0, 0, 0],
				]}
				color={THEME.teal}
				lineWidth={1}
				transparent
				opacity={0.4}
			/>
			<Line
				points={[
					[3, -0.2, 0],
					[3, 0, 0],
					[0, 0, 0],
				]}
				color={THEME.teal}
				lineWidth={1}
				transparent
				opacity={0.4}
			/>

			{/* Signals - Sparse points */}
			<SignalPackets
				count={1}
				speed={0.5}
				color={THEME.white}
				shape="point"
				reducedMotion={reducedMotion}
			/>
		</group>
	);
};

// --- SHARED UTILITIES ---

interface SignalPacketItem {
	offset: number;
	speed: number;
	lane: number;
}

interface SignalPacketsProps {
	count: number;
	speed: number;
	color: string;
	shape: "box" | "sphere" | "point";
	trail?: boolean;
	reducedMotion: boolean;
}

// Seeded pseudo-random to produce stable values across React strict-mode double-invocations
function seededRandom(seed: number): number {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

const SignalPackets = ({
	count,
	speed,
	color,
	shape,
	trail,
	reducedMotion,
}: SignalPacketsProps) => {
	const itemsRef = useRef<SignalPacketItem[] | null>(null);

	if (itemsRef.current === null || itemsRef.current.length !== count) {
		itemsRef.current = Array.from({ length: count }, (_, i) => ({
			offset: seededRandom(i + 1) * 10,
			speed: speed * (0.8 + seededRandom(i + 100) * 0.4),
			lane: (seededRandom(i + 200) - 0.5) * 0.5,
		}));
	}

	const items = itemsRef.current;

	const ref = useRef<THREE.Group>(null);

	useFrame((state) => {
		if (!ref.current || reducedMotion) return;
		ref.current.children.forEach((child, i) => {
			const item = items[i];
			// Move along X axis (spine direction in this local space)
			const t = ((state.clock.elapsedTime * item.speed + item.offset) % 10) - 5;
			child.position.x = t;

			// Idempotency snap logic (visual scale shift near center)
			if (Math.abs(t) < 0.5) {
				child.scale.setScalar(0.5); // Collapse
			} else {
				child.scale.setScalar(1);
			}
		});
	});

	return (
		<group rotation={[0, 0, Math.PI / 2]} ref={ref}>
			{items.map((item, i) => (
				<group key={i} position={[0, item.lane, 0]}>
					{shape === "box" && (
						<mesh>
							<boxGeometry args={[0.2, 0.1, 0.1]} />
							<meshBasicMaterial color={color} />
						</mesh>
					)}
					{shape === "sphere" && (
						<mesh>
							<sphereGeometry args={[0.1, 16, 16]} />
							<meshBasicMaterial color={color} />
						</mesh>
					)}
					{shape === "point" && (
						<mesh>
							<dodecahedronGeometry args={[0.08, 0]} />
							<meshBasicMaterial color={color} />
						</mesh>
					)}
					{trail && (
						<mesh position={[-0.4, 0, 0]} scale={[2, 0.5, 0.5]}>
							<boxGeometry args={[0.3, 0.05, 0.05]} />
							<meshBasicMaterial color={color} transparent opacity={0.3} />
						</mesh>
					)}
				</group>
			))}
		</group>
	);
};

// --- SCENE COMPOSITOR ---

const SceneContent = ({
	mode,
	reducedMotion,
}: {
	mode: "A" | "B" | "C";
	reducedMotion: boolean;
}) => {
	const { camera } = useThree();

	// Adjust Camera based on mode
	useEffect(() => {
		if (!(camera instanceof THREE.PerspectiveCamera)) return;

		if (mode === "A") {
			camera.position.set(0, 0, 8);
			camera.fov = 45;
		} else if (mode === "B") {
			camera.position.set(2, 2, 6);
			camera.fov = 35;
		} else {
			camera.position.set(0, 0, 10);
			camera.fov = 40;
		}
		camera.updateProjectionMatrix();
	}, [mode, camera]);

	return (
		<>
			{/* Dynamic Lighting & Environment */}
			{mode === "A" && (
				<>
					<color attach="background" args={[THEME.black]} />
					<Grid
						position={[0, -2, 0]}
						args={[20, 20]}
						cellSize={1}
						cellThickness={1}
						cellColor={THEME.tealDim}
						sectionSize={5}
						sectionThickness={1.5}
						sectionColor={THEME.tealDim}
						fadeDistance={15}
						fadeStrength={2}
					/>
					<ambientLight intensity={0.2} />
					<pointLight
						position={[10, 10, 10]}
						intensity={1}
						color={THEME.teal}
					/>
					{/* Replaced postprocessing noise with Sparkles for subtle texture */}
					<Sparkles
						count={50}
						scale={10}
						size={1}
						speed={0.2}
						opacity={0.2}
						color={THEME.tealDim}
					/>
					<BlueprintSpine reducedMotion={reducedMotion} />
				</>
			)}

			{mode === "B" && (
				<>
					<color attach="background" args={[THEME.charcoal]} />
					<Environment preset="city" />
					<ambientLight intensity={0.5} />
					<spotLight
						position={[5, 5, 5]}
						angle={0.15}
						penumbra={1}
						intensity={10}
						castShadow
					/>

					<SculptureSpine reducedMotion={reducedMotion} />

					{/* Floor Reflection */}
					<ContactShadows
						position={[0, -2, 0]}
						opacity={0.5}
						scale={20}
						blur={2}
						far={4}
					/>
				</>
			)}

			{mode === "C" && (
				<>
					<color attach="background" args={["#000000"]} />
					<ambientLight intensity={0.1} />
					<pointLight position={[0, 5, 0]} intensity={0.5} />
					<Stars
						radius={100}
						depth={50}
						count={200}
						factor={4}
						saturation={0}
						fade
						speed={1}
					/>
					<ConstellationSpine reducedMotion={reducedMotion} />
				</>
			)}

			{/* Controls - Limited interaction for "Quiet" feel */}
			<OrbitControls
				enablePan={false}
				enableZoom={false}
				minPolarAngle={Math.PI / 3}
				maxPolarAngle={Math.PI / 1.8}
				autoRotate={!reducedMotion && mode === "A"} // Only drift in A
				autoRotateSpeed={0.5}
			/>
		</>
	);
};

// --- APP & UI ---

export default function DataSpineScene() {
	const containerRef = useRef<HTMLDivElement>(null);
	const eventSourceRef = containerRef as React.RefObject<HTMLElement>;
	const [mode, setMode] = useState<"A" | "B" | "C">("B");
	const systemReducedMotion = useReducedMotion();
	const [manualReducedMotion, setManualReducedMotion] = useState(false);

	// Combine system preference with manual toggle
	const reducedMotion = systemReducedMotion || manualReducedMotion;

	const descriptions = {
		A: {
			title: "Option A: Black Ice Blueprint",
			tags: ["Architectural", "Wireframe", "Grid"],
			desc: "Precise CAD aesthetics. Glass edges, thin rim lighting, and a technical grid. Best for engineering credibility.",
		},
		B: {
			title: "Option B: Glass Circuit Sculpture",
			tags: ["Premium", "Product", "Reflective"],
			desc: "High-end product photography vibe. Brushed metal, rich reflections, and a volumetric feel. Best for 'Wow' factor.",
		},
		C: {
			title: "Option C: Lineage Constellation",
			tags: ["Minimal", "Matte", "Cerebral"],
			desc: "Ultra-minimal void. Matte ceramics with emissive edges. Sparse signals. Best for systems architecture.",
		},
	};

	return (
		<div
			ref={containerRef}
			className="w-full h-screen bg-black text-white overflow-hidden relative font-sans selection:bg-teal-500 selection:text-black"
		>
			{/* 3D Canvas */}
			<div className="absolute inset-0 z-0">
				<Canvas
					shadows
					gl={{ antialias: true }}
					eventSource={eventSourceRef}
					eventPrefix="client"
				>
					<Suspense fallback={null}>
						<SceneContent mode={mode} reducedMotion={reducedMotion} />
					</Suspense>
				</Canvas>
			</div>

			{/* UI Overlay */}
			<div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12">
				{/* Header */}
				<div className="pointer-events-auto flex justify-between items-start">
					<div>
						<h1 className="text-xl font-bold tracking-widest uppercase text-teal-500 mb-2">
							Data Spine
						</h1>
						<div className="h-0.5 w-12 bg-teal-800" />
					</div>

					<div className="flex flex-col items-end gap-2">
						<button
							onClick={() => setManualReducedMotion(!manualReducedMotion)}
							className={`text-xs px-3 py-1 border rounded-full transition-colors ${
								reducedMotion
									? "border-teal-500 text-teal-500 bg-teal-900/20"
									: "border-zinc-700 text-zinc-500 hover:text-zinc-300"
							}`}
						>
							{reducedMotion ? "Motion: Reduced" : "Motion: Full"}
						</button>
					</div>
				</div>

				{/* Footer / Selector */}
				<div className="pointer-events-auto w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
					{/* Info Card */}
					<div className="space-y-4">
						<div className="flex flex-wrap gap-2">
							{descriptions[mode].tags.map((tag) => (
								<span
									key={tag}
									className="text-[10px] uppercase tracking-wider px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400"
								>
									{tag}
								</span>
							))}
						</div>
						<h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
							{descriptions[mode].title.split(": ")[1]}
						</h2>
						<p className="text-zinc-400 text-sm max-w-md leading-relaxed">
							{descriptions[mode].desc}
						</p>
					</div>

					{/* Mode Switcher */}
					<div className="flex gap-4 md:justify-end">
						{(["A", "B", "C"] as const).map((m) => (
							<button
								key={m}
								onClick={() => setMode(m)}
								className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border transition-all duration-300 ${
									mode === m
										? "border-teal-500 bg-teal-500/10 text-teal-400 scale-100 shadow-[0_0_30px_-5px_rgba(13,148,136,0.3)]"
										: "border-zinc-800 bg-black/50 text-zinc-600 hover:border-zinc-600 hover:text-zinc-400"
								}`}
							>
								<span className="text-xl font-mono">{m}</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
