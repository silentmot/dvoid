"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import { useEffect, useRef, useState } from "react";
import CorrelationLoader from "./correlation-loader";

type RealityCompilerHeroProps = ComponentProps<
	typeof import("./reality-compiler-hero").default
>;

const RealityCompilerHero = dynamic<RealityCompilerHeroProps>(
	() => import("./reality-compiler-hero"),
	{
		ssr: false,
		loading: () => null, // We handle loading state manually
	},
);

// Track if the hero has been loaded in this session
let hasLoadedOnce = false;

export default function RealityCompilerHeroClient(
	props: RealityCompilerHeroProps,
) {
	const [isLoading, setIsLoading] = useState(!hasLoadedOnce);
	const [heroReady, setHeroReady] = useState(hasLoadedOnce);
	const hasInitialized = useRef(false);

	useEffect(() => {
		// Skip animation if already loaded once in this session
		if (hasLoadedOnce || hasInitialized.current) {
			setIsLoading(false);
			setHeroReady(true);
			return;
		}

		hasInitialized.current = true;

		// Minimum display time for the loader animation to complete
		const minDisplayTime = 4200;
		const startTime = Date.now();

		// Check when component is fully mounted
		const checkReady = () => {
			const elapsed = Date.now() - startTime;
			const remaining = Math.max(0, minDisplayTime - elapsed);

			setTimeout(() => {
				setHeroReady(true);
				// Small delay before hiding loader for smooth transition
				setTimeout(() => {
					setIsLoading(false);
					hasLoadedOnce = true;
				}, 300);
			}, remaining);
		};

		// Start the hero component load
		import("./reality-compiler-hero").then(() => {
			checkReady();
		});
	}, []);

	return (
		<>
			<AnimatePresence>
				{isLoading && (
					<motion.div
						initial={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.6, ease: "easeInOut" }}
					>
						<CorrelationLoader />
					</motion.div>
				)}
			</AnimatePresence>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: heroReady ? 1 : 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<RealityCompilerHero {...props} />
			</motion.div>
		</>
	);
}
