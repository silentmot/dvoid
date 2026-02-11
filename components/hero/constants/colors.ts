/**
 * Black Ice color palette
 * Precise, architectural "CAD meets glass" aesthetic
 */

import * as THREE from "three";

export const COLORS = {
	// Background
	BG_NEAR_BLACK: 0x0a0a0a,
	BG_DEEP: 0x050505,

	// Active hue (teal)
	TEAL_400: 0x5eead4,
	TEAL_500: 0x2dd4bf,
	TEAL_300: 0x99f6e4,

	// Secondary (desaturated blue-grey)
	BLUE_GREY: 0x475569,
	BLUE_GREY_DESAT: 0x334155,
} as const;

// Three.js Color instances for convenient use
export const COLOR_INSTANCES = {
	TEAL_400: new THREE.Color(COLORS.TEAL_400),
	TEAL_500: new THREE.Color(COLORS.TEAL_500),
	TEAL_300: new THREE.Color(COLORS.TEAL_300),
	BLUE_GREY: new THREE.Color(COLORS.BLUE_GREY),
} as const;
