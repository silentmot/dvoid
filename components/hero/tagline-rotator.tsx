"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const TAGLINES: string[] = [
	"Bridging the void between signal and truth.",
	"Every device is lying until the architecture proves otherwise.",
	"Signals don't lie. Systems shouldn't guess.",
	"Making machines accountable.",
	"Zero assumptions. Full signal.",
];

const ROTATION_INTERVAL_MS = 60000;

export default function TaglineRotator() {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % TAGLINES.length);
		}, ROTATION_INTERVAL_MS);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="h-7 md:h-8 overflow-hidden relative max-w-lg mx-auto">
			<AnimatePresence mode="wait">
				<motion.p
					key={activeIndex}
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -20, opacity: 0 }}
					transition={{ duration: 0.4, ease: "easeInOut" }}
					className="text-sm md:text-base text-white/50 font-light leading-relaxed text-center absolute inset-x-0"
				>
					{TAGLINES[activeIndex]}
				</motion.p>
			</AnimatePresence>
		</div>
	);
}
