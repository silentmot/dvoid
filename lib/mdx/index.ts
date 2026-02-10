import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface CaseStudyMeta {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	featured: boolean;
	image?: string;
	readingTime: string;
	client?: string;
	role?: string;
	duration?: string;
	stack?: string[];
}

export interface ProjectMeta {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	featured: boolean;
	image?: string;
	url?: string;
	github?: string;
	stack?: string[];
}

function getContentFiles(type: "case-studies" | "projects"): string[] {
	const dir = path.join(CONTENT_DIR, type);
	if (!fs.existsSync(dir)) return [];
	return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

export function getCaseStudies(): CaseStudyMeta[] {
	const files = getContentFiles("case-studies");

	return files
		.map((file) => {
			const slug = file.replace(/\.mdx$/, "");
			const filePath = path.join(CONTENT_DIR, "case-studies", file);
			const content = fs.readFileSync(filePath, "utf-8");
			const { data, content: mdxContent } = matter(content);
			const stats = readingTime(mdxContent);

			return {
				slug,
				title: data.title ?? slug,
				description: data.description ?? "",
				date: data.date ?? new Date().toISOString(),
				tags: data.tags ?? [],
				featured: data.featured ?? false,
				image: data.image,
				readingTime: stats.text,
				client: data.client,
				role: data.role,
				duration: data.duration,
				stack: data.stack ?? [],
			};
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCaseStudy(slug: string): {
	meta: CaseStudyMeta;
	content: string;
} | null {
	const filePath = path.join(CONTENT_DIR, "case-studies", `${slug}.mdx`);
	if (!fs.existsSync(filePath)) return null;

	const fileContent = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(fileContent);
	const stats = readingTime(content);

	return {
		meta: {
			slug,
			title: data.title ?? slug,
			description: data.description ?? "",
			date: data.date ?? new Date().toISOString(),
			tags: data.tags ?? [],
			featured: data.featured ?? false,
			image: data.image,
			readingTime: stats.text,
			client: data.client,
			role: data.role,
			duration: data.duration,
			stack: data.stack ?? [],
		},
		content,
	};
}

export function getProjects(): ProjectMeta[] {
	const files = getContentFiles("projects");

	return files
		.map((file) => {
			const slug = file.replace(/\.mdx$/, "");
			const filePath = path.join(CONTENT_DIR, "projects", file);
			const content = fs.readFileSync(filePath, "utf-8");
			const { data } = matter(content);

			return {
				slug,
				title: data.title ?? slug,
				description: data.description ?? "",
				date: data.date ?? new Date().toISOString(),
				tags: data.tags ?? [],
				featured: data.featured ?? false,
				image: data.image,
				url: data.url,
				github: data.github,
				stack: data.stack ?? [],
			};
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedCaseStudy(): CaseStudyMeta | null {
	const studies = getCaseStudies();
	return studies.find((s) => s.featured) ?? studies[0] ?? null;
}

export function getFeaturedProjects(): ProjectMeta[] {
	return getProjects().filter((p) => p.featured);
}
