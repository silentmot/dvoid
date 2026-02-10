import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Uses",
	description:
		"A detailed list of the tools, software, and hardware I use daily for development and productivity.",
};

interface ToolCategory {
	title: string;
	items: { name: string; description: string }[];
}

const TOOL_CATEGORIES: ToolCategory[] = [
	{
		title: "Development",
		items: [
			{ name: "VS Code", description: "Primary editor with Vim keybindings" },
			{
				name: "Warp Terminal",
				description: "Modern terminal with AI features",
			},
			{ name: "Bun", description: "JavaScript runtime and package manager" },
			{ name: "Docker Desktop", description: "Container management" },
			{ name: "DBeaver", description: "Database management and queries" },
			{ name: "Postman", description: "API testing and documentation" },
		],
	},
	{
		title: "Design",
		items: [
			{ name: "Figma", description: "UI design and prototyping" },
			{ name: "Excalidraw", description: "Technical diagrams and sketches" },
			{ name: "Spline", description: "3D design for web" },
		],
	},
	{
		title: "Productivity",
		items: [
			{ name: "Obsidian", description: "Knowledge management and notes" },
			{ name: "Linear", description: "Project and issue tracking" },
			{ name: "Raycast", description: "macOS launcher and shortcuts" },
			{ name: "Arc Browser", description: "Primary web browser" },
		],
	},
	{
		title: "Hardware",
		items: [
			{ name: "Custom PC", description: "Ryzen 9 / RTX 4080 / 64GB RAM" },
			{ name: 'LG 32" 4K Monitor', description: "Primary display" },
			{ name: "Keychron K2", description: "Mechanical keyboard" },
			{ name: "Logitech MX Master 3", description: "Mouse" },
		],
	},
	{
		title: "Tech Stack",
		items: [
			{ name: "TypeScript", description: "Primary programming language" },
			{ name: "NestJS", description: "Backend framework" },
			{ name: "Next.js", description: "Frontend framework" },
			{ name: "PostgreSQL", description: "Primary database" },
			{ name: "Prisma", description: "ORM" },
			{ name: "Redis", description: "Caching and real-time" },
			{ name: "Tailwind CSS", description: "Styling" },
		],
	},
];

export default function UsesPage() {
	return (
		<div className="pt-24 pb-16 px-6">
			<div className="mx-auto max-w-3xl">
				{/* Header */}
				<header className="mb-16">
					<p className="text-sm font-mono text-primary/70 tracking-widest uppercase mb-4">
						Uses
					</p>
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
						Tools of the Trade
					</h1>
					<p className="text-lg text-muted-foreground">
						A detailed list of the software, hardware, and technologies I use
						daily for development and productivity.
					</p>
				</header>

				{/* Categories */}
				<div className="space-y-12">
					{TOOL_CATEGORIES.map((category) => (
						<section key={category.title}>
							<h2 className="text-xl font-semibold text-foreground mb-6 pb-2 border-b border-border/50">
								{category.title}
							</h2>
							<div className="space-y-4">
								{category.items.map((item) => (
									<div
										key={item.name}
										className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
									>
										<span className="font-medium text-foreground shrink-0 sm:w-48">
											{item.name}
										</span>
										<span className="text-sm text-muted-foreground">
											{item.description}
										</span>
									</div>
								))}
							</div>
						</section>
					))}
				</div>
			</div>
		</div>
	);
}
