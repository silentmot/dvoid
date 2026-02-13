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
		title: "Development Environment",
		items: [
			{ name: "VS Code", description: "Primary editor" },
			{ name: "Visual Studio 2022", description: "C# / .NET development" },
			{ name: "Windows Terminal", description: "Primary terminal emulator" },
			{ name: "Git Bash", description: "Git operations and Unix commands" },
			{ name: "WSL 2 (Ubuntu)", description: "Linux environment on Windows" },
			{ name: "PowerToys", description: "Windows productivity utilities" },
			{ name: "Docker Desktop", description: "Container management" },
			{
				name: "DBeaver",
				description: "Database management (PostgreSQL, MongoDB)",
			},
			{ name: "Postman", description: "API testing and documentation" },
			{ name: "Chrome", description: "Primary browser (DevTools)" },
		],
	},
	{
		title: "AI & Automation",
		items: [
			{
				name: "Claude",
				description: "AI assistant for development and research",
			},
			{
				name: "MCP Servers",
				description: "Model Context Protocol integrations",
			},
			{
				name: "Desktop Commander",
				description: "File system and process automation",
			},
		],
	},
	{
		title: "Work Tech Stack (SWMS)",
		items: [
			{ name: ".NET Core / C#", description: "Backend microservices" },
			{
				name: "Temporal.io",
				description: "Workflow orchestration (trip lifecycle)",
			},
			{ name: "Entity Framework Core", description: "ORM / data access" },
			{ name: "PostgreSQL 15+", description: "Primary transactional database" },
			{ name: "MongoDB", description: "Analytics and IoT data" },
			{ name: "Angular LTS", description: "Admin Portal frontend" },
			{ name: "Next.js", description: "Client Portal frontend" },
			{ name: "React Native", description: "Cross-platform mobile app" },
			{ name: "Redis", description: "Caching and config hot-reload" },
			{ name: "Kubernetes", description: "Container orchestration" },
		],
	},
	{
		title: "Portfolio Tech Stack",
		items: [
			{ name: "TypeScript", description: "Primary language" },
			{ name: "Next.js 14+", description: "React framework with App Router" },
			{ name: "Tailwind CSS", description: "Utility-first styling" },
			{
				name: "React Three Fiber",
				description: "3D graphics and visualizations",
			},
			{ name: "p5.js", description: "Creative coding and generative art" },
			{ name: "Hono", description: "Lightweight API routes" },
			{ name: "Prisma", description: "Type-safe ORM" },
		],
	},
	{
		title: "Productivity",
		items: [
			{ name: "Jira", description: "Project tracking (occasional)" },
			{ name: "Notion", description: "Documentation and knowledge base" },
		],
	},
	{
		title: "Hardware",
		items: [
			{
				name: "MSI Titan 18 HX AI",
				description:
					'Intel Core Ultra 9 285HX / RTX 5090 24GB / 96GB DDR5 / 18" 4K MiniLED',
			},
			{
				name: "Huawei MateView GT x2",
				description: '34" Curved 1500R / 3440x1440 / 165Hz / Built-in SoundBar',
			},
			{
				name: "Corsair K100 RGB",
				description:
					"Optical-Mechanical / OPX Switches / 8000Hz / iCUE Control Wheel",
			},
			{
				name: "Razer Naga V2 Pro",
				description:
					"Wireless MMO / 3 Swappable Side Plates / Focus Pro 30K / HyperSpeed",
			},
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
