"use client";

import { useEffect, useState } from "react";

// ============================================================================
// TYPES
// ============================================================================

export interface DeviceCapability {
	isMobile: boolean;
	isTouch: boolean;
	prefersReducedMotion: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	deviceTier: "mobile" | "tablet" | "desktop";
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * Detects device capabilities including mobile/touch status and motion preferences.
 * Uses MediaQuery for prefers-reduced-motion and window dimensions for breakpoints.
 * Does NOT use userAgent sniffing for reliability.
 */
export function useDeviceCapability(): DeviceCapability {
	const [capability, setCapability] = useState<DeviceCapability>({
		isMobile: false,
		isTouch: false,
		prefersReducedMotion: false,
		isTablet: false,
		isDesktop: false,
		deviceTier: "desktop",
	});

	useEffect(() => {
		// Skip on server
		if (typeof window === "undefined") return;

		// Debounced resize handler
		let resizeTimeout: NodeJS.Timeout;
		const updateBreakpoints = () => {
			const width = window.innerWidth;
			const isMobile = width < 768;
			const isTablet = width >= 768 && width < 1024;
			const isDesktop = width >= 1024;

			setCapability((prev) => ({
				...prev,
				isMobile,
				isTablet,
				isDesktop,
				deviceTier: isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
			}));
		};

		// Initial detection
		const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const isTouch = "ontouchstart" in window;

		setCapability({
			isMobile: window.innerWidth < 768,
			isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
			isDesktop: window.innerWidth >= 1024,
			isTouch,
			prefersReducedMotion: motionQuery.matches,
			deviceTier:
				window.innerWidth < 768
					? "mobile"
					: window.innerWidth >= 1024
						? "desktop"
						: "tablet",
		});

		// MediaQuery change listener for prefers-reduced-motion
		const handleMotionChange = (e: MediaQueryListEvent) => {
			setCapability((prev) => ({
				...prev,
				prefersReducedMotion: e.matches,
			}));
		};

		motionQuery.addEventListener("change", handleMotionChange);

		// Resize listener with debounce (200ms)
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(updateBreakpoints, 200);
		};

		window.addEventListener("resize", handleResize);

		// Cleanup
		return () => {
			motionQuery.removeEventListener("change", handleMotionChange);
			window.removeEventListener("resize", handleResize);
			clearTimeout(resizeTimeout);
		};
	}, []);

	return capability;
}
