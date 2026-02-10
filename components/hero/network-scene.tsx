"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { type FC, useMemo, useRef } from "react";
import * as THREE from "three";

// ============================================================================
// TYPES
// ============================================================================

export interface NetworkSceneProps {
	nodeCount: number;
	waves: Array<{
		id: string;
		position: THREE.Vector2;
		time: number;
		strength: number;
	}>;
}

interface NodeData {
	basePosition: THREE.Vector3;
	phaseOffset: number;
	gridPosition: THREE.Vector2;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const GRID_COLS = 20;
const SPACING = 1.2;
const CONNECTION_DISTANCE = 2.5;

const GHOST_COLOR = new THREE.Color(0x5eead4); // teal-400 with lower opacity
const ENERGIZED_COLOR = new THREE.Color(0x2dd4bf); // teal-400
const LINE_COLOR = new THREE.Color(0x5eead4);

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Simple pseudo-random noise function for organic node positioning
 */
function pseudoNoise(x: number, y: number): number {
	const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
	return n - Math.floor(n);
}

/**
 * Generate undulating z-position based on x, y and time
 */
function getUndulationZ(x: number, y: number, time: number): number {
	return (
		Math.sin(x * 0.15 + time * 0.5) * 1.5 +
		Math.cos(y * 0.12 + time * 0.3) * 1.5 +
		Math.sin((x + y) * 0.08 + time * 0.2) * 0.8
	);
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * InstancedMesh network of nodes in an undulating landscape pattern.
 * Nodes energize (brighten) when waves pass through them.
 */
export const NetworkScene: FC<NetworkSceneProps> = ({ nodeCount, waves }) => {
	const { camera } = useThree();
	const meshRef = useRef<THREE.InstancedMesh>(null);
	const linesRef = useRef<THREE.LineSegments>(null);

	// Calculate grid dimensions based on node count
	const gridCols = Math.min(GRID_COLS, Math.ceil(Math.sqrt(nodeCount)));
	const gridRows = Math.ceil(nodeCount / gridCols);

	const width = (gridCols - 1) * SPACING;
	const height = (gridRows - 1) * SPACING;

	// Generate node positions
	const nodesData = useMemo<NodeData[]>(() => {
		const nodes: NodeData[] = [];
		for (let i = 0; i < nodeCount; i++) {
			const col = i % gridCols;
			const row = Math.floor(i / gridCols);

			const x = col * SPACING - width / 2;
			const y = row * SPACING - height / 2;
			const z = getUndulationZ(x, y, 0);

			nodes.push({
				basePosition: new THREE.Vector3(x, y, z),
				phaseOffset: pseudoNoise(col * 0.1, row * 0.1) * Math.PI * 2,
				gridPosition: new THREE.Vector2(x, y),
			});
		}
		return nodes;
	}, [nodeCount, gridCols, width, height]);

	// Calculate connections for lines
	const connections = useMemo<Uint16Array>(() => {
		const indices: number[] = [];

		for (let i = 0; i < nodesData.length; i++) {
			for (let j = i + 1; j < nodesData.length; j++) {
				const dist = nodesData[i].basePosition.distanceTo(
					nodesData[j].basePosition,
				);
				if (dist < CONNECTION_DISTANCE) {
					indices.push(i, j);
				}
			}
		}

		return new Uint16Array(indices);
	}, [nodesData]);

	// Setup camera
	useMemo(() => {
		camera.position.set(0, 0, 12);
	}, [camera]);

	// Update node positions and colors based on waves
	useFrame((state) => {
		if (!meshRef.current || !linesRef.current) return;

		const time = state.clock.getElapsedTime();
		const dummy = new THREE.Object3D();
		const color = new THREE.Color();

		// Get world-space wave positions from normalized screen coords
		const wavePositions = waves.map((wave) => {
			const worldX = (wave.position.x - 0.5) * width * 1.5;
			const worldY = (wave.position.y - 0.5) * height * 1.5;
			return new THREE.Vector2(worldX, worldY);
		});

		// Update each node
		for (let i = 0; i < nodeCount; i++) {
			const node = nodesData[i];

			// Undulating z position
			const z =
				getUndulationZ(node.basePosition.x, node.basePosition.y, time) +
				Math.sin(time + node.phaseOffset) * 0.3;

			dummy.position.set(node.basePosition.x, node.basePosition.y, z);

			// Scale varies slightly with phase
			const scale = 1 + Math.sin(time * 2 + node.phaseOffset) * 0.15;
			dummy.scale.setScalar(scale);

			dummy.updateMatrix();
			meshRef.current.setMatrixAt(i, dummy.matrix);

			// Calculate energization from waves
			let energization = 0;

			for (let j = 0; j < wavePositions.length; j++) {
				const wavePos = wavePositions[j];
				const waveStrength = waves[j].strength;

				const dist = Math.sqrt(
					Math.pow(node.gridPosition.x - wavePos.x, 2) +
						Math.pow(node.gridPosition.y - wavePos.y, 2),
				);

				// Wave front creates energization at specific distance
				const waveRadius = ((Date.now() / 1000 - waves[j].time) * 3) % 15;
				const waveWidth = 2.5;
				const distFromWave = Math.abs(dist - waveRadius);

				if (distFromWave < waveWidth) {
					const waveEffect =
						(1 - distFromWave / waveWidth) * waveStrength;
					energization = Math.max(energization, waveEffect);
				}
			}

			// Mix ghost and energized colors
			color.copy(GHOST_COLOR).lerp(ENERGIZED_COLOR, energization);
			meshRef.current.setColorAt(i, color);
		}

		meshRef.current.instanceMatrix.needsUpdate = true;
		if (meshRef.current.instanceColor) {
			meshRef.current.instanceColor.needsUpdate = true;
		}

		// Update line positions to match nodes
		const linePositions = new Float32Array(connections.length * 3);
		const lineColors = new Float32Array(connections.length * 3);

		for (let i = 0; i < connections.length; i += 2) {
			const nodeA = nodesData[connections[i]];
			const nodeB = nodesData[connections[i + 1]];

			// Get current z positions
			const zA =
				getUndulationZ(nodeA.basePosition.x, nodeA.basePosition.y, time) +
				Math.sin(time + nodeA.phaseOffset) * 0.3;
			const zB =
				getUndulationZ(nodeB.basePosition.x, nodeB.basePosition.y, time) +
				Math.sin(time + nodeB.phaseOffset) * 0.3;

			// Point A
			linePositions[i * 3] = nodeA.basePosition.x;
			linePositions[i * 3 + 1] = nodeA.basePosition.y;
			linePositions[i * 3 + 2] = zA;

			// Point B
			linePositions[i * 3 + 3] = nodeB.basePosition.x;
			linePositions[i * 3 + 4] = nodeB.basePosition.y;
			linePositions[i * 3 + 5] = zB;

			// Line color with fade
			const lineOpacity = 0.2;
			lineColors[i * 3] = LINE_COLOR.r * lineOpacity;
			lineColors[i * 3 + 1] = LINE_COLOR.g * lineOpacity;
			lineColors[i * 3 + 2] = LINE_COLOR.b * lineOpacity;
			lineColors[i * 3 + 3] = LINE_COLOR.r * lineOpacity;
			lineColors[i * 3 + 4] = LINE_COLOR.g * lineOpacity;
			lineColors[i * 3 + 5] = LINE_COLOR.b * lineOpacity;
		}

		const lineGeometry = linesRef.current.geometry as THREE.BufferGeometry;
		lineGeometry.setAttribute(
			"position",
			new THREE.BufferAttribute(linePositions, 3),
		);
		lineGeometry.setAttribute(
			"color",
			new THREE.BufferAttribute(lineColors, 3),
		);
	});

	return (
		<>
			{/* Network nodes */}
			<instancedMesh
				ref={meshRef}
				args={[
					new THREE.SphereGeometry(0.08, 8, 8),
					new THREE.MeshBasicMaterial({ color: 0xffffff }),
					nodeCount,
				]}
			/>

			{/* Connection lines */}
			<lineSegments ref={linesRef}>
				<bufferGeometry />
				<lineBasicMaterial vertexColors opacity={0.2} transparent />
			</lineSegments>
		</>
	);
};

export default NetworkScene;
