import { readdir } from "node:fs/promises";
import { join } from "node:path";
import type { MetadataRoute } from "next";

const BASE_URL = "https://d-void.com";

async function getCaseStudySlugs(): Promise<string[]> {
	const dir = join(process.cwd(), "content", "case-studies");
	const files = await readdir(dir);
	return files
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => file.replace(/\.mdx$/, ""));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const caseSlugs = await getCaseStudySlugs();

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${BASE_URL}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${BASE_URL}/projects`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${BASE_URL}/case-studies`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${BASE_URL}/contact`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.6,
		},
		{
			url: `${BASE_URL}/uses`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		},
	];

	const caseStudyRoutes: MetadataRoute.Sitemap = caseSlugs.map((slug) => ({
		url: `${BASE_URL}/case-studies/${slug}`,
		lastModified: new Date(),
		changeFrequency: "monthly",
		priority: 0.7,
	}));

	return [...staticRoutes, ...caseStudyRoutes];
}
