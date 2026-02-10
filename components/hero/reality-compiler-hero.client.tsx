"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

type RealityCompilerHeroProps = ComponentProps<
	typeof import("./reality-compiler-hero").default
>;

const RealityCompilerHero = dynamic<RealityCompilerHeroProps>(
	() => import("./reality-compiler-hero"),
	{ ssr: false },
);

export default function RealityCompilerHeroClient(
	props: RealityCompilerHeroProps,
) {
	return <RealityCompilerHero {...props} />;
}
