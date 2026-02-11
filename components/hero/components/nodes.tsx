"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { type FC, useMemo, useRef } from "react";
import * as THREE from "three";
import { COLOR_INSTANCES, COLORS } from "../constants/colors";

// ============================================================================
// CONFIGURATION
// ============================================================================

const NODE_COUNT = {
	desktop: 12,
	tablet: 8,
};
const NODE_SIZE_BASE = 0.25;
const RING_RADIUS = 0.35;
const RING_TUBE = 0.02;
const _NODE_SPACING = 2.5; // Spacing along spine curve
const LENS_REVEAL_DISTANCE = 5; // Distance to show internal detail

// Spine control points (must match spine.tsx)
const CONTROL_POINTS: THREE.Vector3[] = [
	new THREE.Vector3(-8, -4, 0),
	new THREE.Vector3(-3, -1, 1),
	new THREE.Vector3(2, 1, -0.5),
	new THREE.Vector3(6, 3, 0.5),
	new THREE.Vector3(10, 5, 0),
];

// ============================================================================
// TYPES
// ============================================================================

interface NodeData {
	position: THREE.Vector3;
	tangent: THREE.Vector3;
	normal: THREE.Vector3;
}

interface NodesProps {
	nodeCount?: number;
}

// ============================================================================
// NODES COMPONENT
// ============================================================================

/**
 * Nodes component - sharp technical primitives (octahedra + rings) along spine
 * Uses InstancedMesh for efficient rendering
 * Internal geometry revealed when camera approaches (lens effect)
 */
export const Nodes: FC<NodesProps> = ({ nodeCount = NODE_COUNT.desktop }) => {
	const { camera } = useThree();
	const nodesMeshRef = useRef<THREE.InstancedMesh>(null);
	const ringsMeshRef = useRef<THREE.InstancedMesh>(null);

	// Create spine curve for node placement
	const spineCurve = useMemo(() => {
		return new THREE.CatmullRomCurve3(CONTROL_POINTS);
	}, []);

	// Generate node positions along spine
	const nodesData = useMemo<NodeData[]>(() => {
		const nodes: NodeData[] = [];
		const curveLength = spineCurve.getLength();

		// Calculate actual spacing based on node count
		const actualSpacing = curveLength / (nodeCount + 1);

		for (let i = 1; i <= nodeCount; i++) {
			const t = (i * actualSpacing) / curveLength;
			const position = spineCurve.getPointAt(Math.min(1, t));
			const tangent = spineCurve.getTangentAt(Math.min(1, t));

			// Create a normal vector perpendicular to tangent
			const up = new THREE.Vector3(0, 0, 1);
			const normal = new THREE.Vector3()
				.crossVectors(tangent, up)
				.normalize()
				.multiplyScalar(NODE_SIZE_BASE * 0.5);

			nodes.push({
				position,
				tangent,
				normal,
			});
		}

		return nodes;
	}, [spineCurve, nodeCount]);

	// Create geometries
	const octahedronGeometry = useMemo(
		() => new THREE.OctahedronGeometry(NODE_SIZE_BASE, 0),
		[],
	);
	const ringGeometry = useMemo(
		() => new THREE.TorusGeometry(RING_RADIUS, RING_TUBE, 8, 32),
		[],
	);

	// Create materials
	const nodeMaterial = useMemo(
		() =>
			new THREE.MeshPhysicalMaterial({
				color: COLORS.TEAL_400,
				metalness: 0.3,
				roughness: 0.3,
				clearcoat: 0.8,
				clearcoatRoughness: 0.2,
				emissive: COLORS.TEAL_400,
				emissiveIntensity: 0.1,
			}),
		[],
	);

	const ringMaterial = useMemo(
		() =>
			new THREE.MeshBasicMaterial({
				color: COLORS.TEAL_400,
				transparent: true,
				opacity: 0.6,
			}),
		[],
	);

	// Update node instances based on camera distance
	useFrame(() => {
		if (!nodesMeshRef.current || !ringsMeshRef.current) return;

		const dummy = new THREE.Object3D();
		const color = new THREE.Color();

		for (let i = 0; i < nodesData.length; i++) {
			const node = nodesData[i];

			// Calculate distance from camera
			const distance = camera.position.distanceTo(node.position);
			const revealFactor = Math.max(0, 1 - distance / LENS_REVEAL_DISTANCE);

			// Position octahedron node
			dummy.position.copy(node.position);
			dummy.lookAt(node.position.clone().add(node.tangent));
			dummy.scale.setScalar(1 + revealFactor * 0.3); // Slight scale up when revealed
			dummy.updateMatrix();
			nodesMeshRef.current.setMatrixAt(i, dummy.matrix);

			// Brighten color when revealed
			color.copy(COLOR_INSTANCES.TEAL_400);
			if (revealFactor > 0) {
				color.lerp(COLOR_INSTANCES.TEAL_300, revealFactor * 0.5);
			}
			nodesMeshRef.current.setColorAt(i, color);

			// Position ring (oriented perpendicular to spine)
			dummy.position.copy(node.position);
			dummy.lookAt(node.position.clone().add(node.normal));
			dummy.scale.setScalar(1);
			dummy.updateMatrix();
			ringsMeshRef.current.setMatrixAt(i, dummy.matrix);

			// Ring fades with reveal
			color.copy(COLOR_INSTANCES.TEAL_400);
			const ringOpacity = 0.6 - revealFactor * 0.3;
			color.multiplyScalar(ringOpacity);
			ringsMeshRef.current.setColorAt(i, color);
		}

		nodesMeshRef.current.instanceMatrix.needsUpdate = true;
		if (nodesMeshRef.current.instanceColor) {
			nodesMeshRef.current.instanceColor.needsUpdate = true;
		}

		ringsMeshRef.current.instanceMatrix.needsUpdate = true;
		if (ringsMeshRef.current.instanceColor) {
			ringsMeshRef.current.instanceColor.needsUpdate = true;
		}
	});

	return (
		<>
			{/* Octahedron nodes */}
			<instancedMesh
				ref={nodesMeshRef}
				args={[octahedronGeometry, nodeMaterial, nodeCount]}
			/>

			{/* Detail rings */}
			<instancedMesh
				ref={ringsMeshRef}
				args={[ringGeometry, ringMaterial, nodeCount]}
			/>
		</>
	);
};

export default Nodes;
