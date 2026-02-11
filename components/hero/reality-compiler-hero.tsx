"use client";

import { DottedGridDemo } from "../demo/dotted-grid-surface";

interface RealityCompilerHeroProps {
	title?: string;
	subtitle?: string;
	tagline?: string;
	scrollIndicator?: boolean;
}

const RealityCompilerHero = ({
	title = "DvoiD",
	subtitle = "Technical Operations Specialist",
	tagline = "Compiling industrial systems into operational reality",
	scrollIndicator = true,
}: RealityCompilerHeroProps) => {
	return (
		<DottedGridDemo
			title={title}
			subtitle={subtitle}
			tagline={tagline}
			hideControls
			showScrollIndicator={scrollIndicator}
		/>
	);
};

export default RealityCompilerHero;
