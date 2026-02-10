"use client";

import { Float, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type FC, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// ============================================================================
// TYPES
// ============================================================================

interface InteractiveMeshProps {
	position: [number, number, number];
	geometry: THREE.BufferGeometry;
	rotationSpeed?: number;
}

interface ShaderUniforms
	extends Record<string, THREE.IUniform<number | THREE.Vector2 | THREE.Color>> {
	uTime: THREE.IUniform<number>;
	uMouse: THREE.IUniform<THREE.Vector2>;
	uResolution: THREE.IUniform<THREE.Vector2>;
	uColorA: THREE.IUniform<THREE.Color>;
	uColorB: THREE.IUniform<THREE.Color>;
	uRevealRadius: THREE.IUniform<number>;
}

interface RealityCompilerHeroProps {
	title?: string;
	subtitle?: string;
	tagline?: string;
	scrollIndicator?: boolean;
}

// ============================================================================
// SHADERS
// ============================================================================

const VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uRevealRadius;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  // Procedural grid with scanline effect
  float grid(vec2 st, float res, float time) {
    vec2 grid = fract(st * res + vec2(0.0, time * 0.1));
    float lineX = step(0.96, grid.x);
    float lineY = step(0.96, grid.y);
    return max(lineX, lineY);
  }

  // Noise function for subtle variation
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    // Normalize screen coordinates
    vec2 st = gl_FragCoord.xy / uResolution.xy;

    // Aspect ratio correction for circular flashlight
    float aspect = uResolution.x / uResolution.y;
    vec2 mouseCorrected = vec2(uMouse.x * aspect, uMouse.y);
    vec2 stCorrected = vec2(st.x * aspect, st.y);

    // Distance from mouse (flashlight radius)
    float dist = distance(stCorrected, mouseCorrected);

    // Reveal mask with configurable radius
    float revealMask = smoothstep(uRevealRadius, uRevealRadius - 0.1, dist);

    // WIREFRAME STATE (Uncompiled Code)
    float gridPattern = grid(vUv, 25.0, uTime);
    float scanline = sin(vUv.y * 100.0 + uTime * 2.0) * 0.5 + 0.5;
    vec3 wireColor = vec3(0.0, 0.85, 0.65) * gridPattern; // Teal grid
    wireColor += vec3(0.0, 0.4, 0.35) * (1.0 - gridPattern) * 0.15; // Subtle fill
    wireColor *= 0.7 + scanline * 0.3; // Scanline variation

    // Add data flow particles effect
    float flow = hash(vUv * 10.0 + uTime * 0.5);
    wireColor += vec3(0.0, 1.0, 0.8) * step(0.97, flow) * 0.5;

    // RENDERED STATE (Compiled Reality)
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

    // Gradient based on world position and normals
    float gradientFactor = vUv.y * 0.6 + vNormal.y * 0.4;
    vec3 renderColor = mix(uColorA, uColorB, gradientFactor);

    // Add fresnel rim lighting
    renderColor += vec3(0.6, 0.9, 0.95) * fresnel * 0.6;

    // Subtle time-based shimmer
    renderColor += vec3(0.1, 0.15, 0.2) * sin(uTime * 0.5 + vUv.x * 3.0) * 0.1;

    // Mix wireframe and rendered states
    vec3 finalColor = mix(wireColor, renderColor, revealMask);

    // Scanner ring at reveal edge
    float ringOuter = smoothstep(uRevealRadius, uRevealRadius - 0.01, dist);
    float ringInner = smoothstep(uRevealRadius - 0.02, uRevealRadius - 0.03, dist);
    float ring = ringOuter - ringInner;
    finalColor += vec3(0.9, 1.0, 1.0) * ring * 1.5;

    // Secondary inner ring
    float ring2Outer = smoothstep(uRevealRadius - 0.04, uRevealRadius - 0.05, dist);
    float ring2Inner = smoothstep(uRevealRadius - 0.06, uRevealRadius - 0.07, dist);
    float ring2 = ring2Outer - ring2Inner;
    finalColor += vec3(0.0, 0.8, 0.7) * ring2 * 0.5;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// ============================================================================
// COMPONENTS
// ============================================================================

const InteractiveMesh: FC<InteractiveMeshProps> = ({
	position,
	geometry,
	rotationSpeed = 0.5,
}) => {
	const meshRef = useRef<THREE.Mesh>(null);
	const materialRef = useRef<THREE.ShaderMaterial>(null);
	const { size, pointer } = useThree();

	const uniforms = useMemo<ShaderUniforms>(
		() => ({
			uTime: { value: 0 },
			uMouse: { value: new THREE.Vector2(0.5, 0.5) },
			uResolution: { value: new THREE.Vector2(size.width, size.height) },
			uColorA: { value: new THREE.Color("#0d4f4f") }, // Deep teal
			uColorB: { value: new THREE.Color("#14b8a6") }, // Teal-400
			uRevealRadius: { value: 0.25 },
		}),
		[size.width, size.height],
	);

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.x += delta * 0.3 * rotationSpeed;
			meshRef.current.rotation.y += delta * 0.5 * rotationSpeed;
		}

		if (materialRef.current) {
			materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
			materialRef.current.uniforms.uMouse.value.set(
				(pointer.x + 1) / 2,
				(pointer.y + 1) / 2,
			);
			materialRef.current.uniforms.uResolution.value.set(
				state.size.width,
				state.size.height,
			);
		}
	});

	return (
		<Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
			<mesh ref={meshRef} position={position} geometry={geometry}>
				<shaderMaterial
					ref={materialRef}
					vertexShader={VERTEX_SHADER}
					fragmentShader={FRAGMENT_SHADER}
					uniforms={uniforms}
				/>
			</mesh>
		</Float>
	);
};

const Scene: FC = () => {
	const torusKnotGeo = useMemo(
		() => new THREE.TorusKnotGeometry(1, 0.35, 100, 24),
		[],
	);
	const icosaGeo = useMemo(() => new THREE.IcosahedronGeometry(1.2, 1), []);
	const octaGeo = useMemo(() => new THREE.OctahedronGeometry(1.0, 0), []);
	const dodecaGeo = useMemo(() => new THREE.DodecahedronGeometry(0.9, 0), []);

	return (
		<>
			<Stars
				radius={80}
				depth={60}
				count={3000}
				factor={3}
				saturation={0}
				fade
				speed={0.5}
			/>

			{/* Centerpiece */}
			<InteractiveMesh position={[0, 0, 0]} geometry={torusKnotGeo} />

			{/* Satellite elements */}
			<InteractiveMesh
				position={[-3.5, 2.5, -2]}
				geometry={icosaGeo}
				rotationSpeed={0.7}
			/>
			<InteractiveMesh
				position={[4, -1.5, -3]}
				geometry={octaGeo}
				rotationSpeed={0.5}
			/>
			<InteractiveMesh
				position={[-2.5, -2.5, -1.5]}
				geometry={dodecaGeo}
				rotationSpeed={0.4}
			/>
			<InteractiveMesh
				position={[3, 2.5, -4]}
				geometry={icosaGeo}
				rotationSpeed={0.3}
			/>
		</>
	);
};

// Static fallback for reduced motion / mobile
const StaticFallback: FC = () => (
	<div
		className="absolute inset-0 z-0"
		style={{
			background: `
        radial-gradient(ellipse at 30% 20%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 80%, rgba(13, 79, 79, 0.2) 0%, transparent 50%),
        linear-gradient(180deg, #000000 0%, #0a0a0a 100%)
      `,
		}}
	>
		{/* Grid overlay */}
		<div
			className="absolute inset-0 opacity-20"
			style={{
				backgroundImage: `
          linear-gradient(rgba(20, 184, 166, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(20, 184, 166, 0.3) 1px, transparent 1px)
        `,
				backgroundSize: "40px 40px",
			}}
		/>
	</div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const RealityCompilerHero: FC<RealityCompilerHeroProps> = ({
	title = "D-VOID",
	subtitle = "Technical Operations Specialist",
	tagline = "Compiling industrial systems into operational reality",
	scrollIndicator = true,
}) => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);

		// Check reduced motion preference
		const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(motionQuery.matches);

		const handleMotionChange = (e: MediaQueryListEvent) => {
			setPrefersReducedMotion(e.matches);
		};
		motionQuery.addEventListener("change", handleMotionChange);

		// Check mobile
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => {
			motionQuery.removeEventListener("change", handleMotionChange);
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	const shouldShowStatic = prefersReducedMotion || isMobile;

	return (
		<section className="relative w-full h-screen bg-black overflow-hidden">
			{/* 3D Canvas or Static Fallback */}
			{isClient && !shouldShowStatic ? (
				<div className="absolute inset-0 z-0">
					<Canvas
						camera={{ position: [0, 0, 6], fov: 50 }}
						dpr={[1, 1.5]}
						gl={{
							antialias: true,
							alpha: false,
							powerPreference: "high-performance",
						}}
					>
						<Scene />
					</Canvas>
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
					{!isMobile && !prefersReducedMotion && (
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
							prefersReducedMotion ? "" : "animate-bounce"
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
