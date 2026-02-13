"use client";

import { useState } from "react";

const FrameworkComparison = () => {
	const [activeTab, setActiveTab] = useState("overview");
	const [expandedSection, setExpandedSection] = useState<string | null>(null);

	const tabs = [
		{ id: "overview", label: "Overview" },
		{ id: "architecture", label: "Architecture" },
		{ id: "nextjs", label: "Next.js Integration" },
		{ id: "usecases", label: "Use Cases" },
		{ id: "unique", label: "Unique Capabilities" },
		{ id: "decision", label: "Decision Guide" },
	];

	const toggleSection = (id: string) => {
		setExpandedSection(expandedSection === id ? null : id);
	};

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
			{/* Header */}
			<header className="border-b border-zinc-800 px-6 py-4">
				<h1 className="text-xl text-cyan-400 tracking-tight">
					Backend Framework Comparison
				</h1>
				<p className="text-zinc-500 text-sm mt-1">Express.js | NestJS | Hono</p>
			</header>

			{/* Navigation */}
			<nav className="border-b border-zinc-800 px-6 overflow-x-auto">
				<div className="flex gap-1">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`px-4 py-3 text-sm whitespace-nowrap transition-colors ${
								activeTab === tab.id
									? "text-cyan-400 border-b-2 border-cyan-400"
									: "text-zinc-500 hover:text-zinc-300"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>
			</nav>

			{/* Content */}
			<main className="p-6 max-w-6xl">
				{activeTab === "overview" && <OverviewTab />}
				{activeTab === "architecture" && (
					<ArchitectureTab
						expandedSection={expandedSection}
						toggleSection={toggleSection}
					/>
				)}
				{activeTab === "nextjs" && <NextJSTab />}
				{activeTab === "usecases" && <UseCasesTab />}
				{activeTab === "unique" && <UniqueTab />}
				{activeTab === "decision" && <DecisionTab />}
			</main>
		</div>
	);
};

/* ============================================
   OVERVIEW TAB
   ============================================ */
const OverviewTab = () => (
	<div className="space-y-8">
		<section>
			<h2 className="text-lg text-cyan-400 mb-4 flex items-center gap-2">
				<span className="text-zinc-600"></span> Quick Comparison Matrix
			</h2>
			<div className="overflow-x-auto">
				<table className="w-full text-sm border border-zinc-800">
					<thead>
						<tr className="bg-zinc-900">
							<th className="text-left p-3 border-b border-zinc-800 text-zinc-400">
								Attribute
							</th>
							<th className="text-left p-3 border-b border-zinc-800 text-amber-400">
								Express.js
							</th>
							<th className="text-left p-3 border-b border-zinc-800 text-rose-400">
								NestJS
							</th>
							<th className="text-left p-3 border-b border-zinc-800 text-emerald-400">
								Hono
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-b border-zinc-800/50">
							<td className="p-3 text-zinc-400">Release Year</td>
							<td className="p-3">2010</td>
							<td className="p-3">2017</td>
							<td className="p-3">2021</td>
						</tr>
						<tr className="border-b border-zinc-800/50 bg-zinc-900/30">
							<td className="p-3 text-zinc-400">Philosophy</td>
							<td className="p-3">Minimal, Unopinionated</td>
							<td className="p-3">Structured, Opinionated</td>
							<td className="p-3">Lightweight, Standards-based</td>
						</tr>
						<tr className="border-b border-zinc-800/50">
							<td className="p-3 text-zinc-400">TypeScript</td>
							<td className="p-3">Optional (via @types)</td>
							<td className="p-3">First-class, Required</td>
							<td className="p-3">First-class, Optional</td>
						</tr>
						<tr className="border-b border-zinc-800/50 bg-zinc-900/30">
							<td className="p-3 text-zinc-400">Bundle Size</td>
							<td className="p-3">~200 KB</td>
							<td className="p-3">~2-5 MB (with deps)</td>
							<td className="p-3">~14 KB (core)</td>
						</tr>
						<tr className="border-b border-zinc-800/50">
							<td className="p-3 text-zinc-400">Learning Curve</td>
							<td className="p-3 text-green-400">Low</td>
							<td className="p-3 text-amber-400">High</td>
							<td className="p-3 text-green-400">Low</td>
						</tr>
						<tr className="border-b border-zinc-800/50 bg-zinc-900/30">
							<td className="p-3 text-zinc-400">Runtime Support</td>
							<td className="p-3">Node.js only</td>
							<td className="p-3">Node.js (primary)</td>
							<td className="p-3">Multi-runtime</td>
						</tr>
						<tr>
							<td className="p-3 text-zinc-400">Architecture Pattern</td>
							<td className="p-3">Middleware chain</td>
							<td className="p-3">MVC + DI + Modules</td>
							<td className="p-3">Middleware chain</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		{/* Framework Cards */}
		<section className="grid md:grid-cols-3 gap-4">
			<FrameworkCard
				name="Express.js"
				tagline="The Industry Standard"
				color="amber"
				points={[
					"Minimalist HTTP server framework",
					"Largest ecosystem of middleware",
					"Battle-tested in production (15+ years)",
					"Foundation for many other frameworks",
				]}
			/>
			<FrameworkCard
				name="NestJS"
				tagline="Enterprise Architecture"
				color="rose"
				points={[
					"Angular-inspired modular architecture",
					"Dependency Injection built-in",
					"Decorators for declarative code",
					"Built on Express or Fastify",
				]}
			/>
			<FrameworkCard
				name="Hono"
				tagline="Edge-First Performance"
				color="emerald"
				points={[
					"Web Standards API (Request/Response)",
					"Runs on Cloudflare, Deno, Bun, Node",
					"Smallest footprint (~14KB)",
					"Type-safe RPC client generation",
				]}
			/>
		</section>

		{/* Key Insight */}
		<section className="border border-zinc-800 p-4 bg-zinc-900/50">
			<h3 className="text-cyan-400 text-sm mb-2">KEY INSIGHT</h3>
			<p className="text-zinc-300 text-sm leading-relaxed">
				These frameworks occupy different points on the{" "}
				<span className="text-cyan-400">complexity vs. convention</span>{" "}
				spectrum. Express gives you raw tools. NestJS gives you blueprints. Hono
				gives you portable, standards-compliant building blocks. Your choice
				depends on team size, project scale, and deployment targets.
			</p>
		</section>
	</div>
);

const FrameworkCard = ({
	name,
	tagline,
	color,
	points,
}: {
	name: string;
	tagline: string;
	color: "amber" | "rose" | "emerald";
	points: string[];
}) => {
	const colorMap = {
		amber: {
			border: "border-amber-400/30",
			text: "text-amber-400",
			bullet: "bg-amber-400",
		},
		rose: {
			border: "border-rose-400/30",
			text: "text-rose-400",
			bullet: "bg-rose-400",
		},
		emerald: {
			border: "border-emerald-400/30",
			text: "text-emerald-400",
			bullet: "bg-emerald-400",
		},
	};
	const c = colorMap[color];

	return (
		<div className={`border ${c.border} bg-zinc-900/30 p-4`}>
			<h3 className={`${c.text} text-base mb-1`}>{name}</h3>
			<p className="text-zinc-500 text-xs mb-3">{tagline}</p>
			<ul className="space-y-2">
				{points.map((point, i) => (
					<li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
						<span
							className={`${c.bullet} w-1 h-1 rounded-full mt-2 shrink-0`}
						/>
						{point}
					</li>
				))}
			</ul>
		</div>
	);
};

/* ============================================
   ARCHITECTURE TAB
   ============================================ */
const ArchitectureTab = ({
	expandedSection,
	toggleSection,
}: {
	expandedSection: string | null;
	toggleSection: (id: string) => void;
}) => (
	<div className="space-y-6">
		<h2 className="text-lg text-cyan-400 mb-4 flex items-center gap-2">
			<span className="text-zinc-600"></span> Why NestJS is "More Complex"
		</h2>

		{/* Complexity Breakdown */}
		<div className="border border-zinc-800 p-4 bg-zinc-900/30 space-y-4">
			<p className="text-zinc-300 text-sm">
				NestJS complexity stems from its{" "}
				<span className="text-rose-400">architectural abstractions</span>, not
				inefficiency. It enforces patterns that scale well but require upfront
				learning.
			</p>

			<div className="grid md:grid-cols-2 gap-4">
				<div className="border border-zinc-700 p-3">
					<h4 className="text-rose-400 text-sm mb-2">
						NestJS Requires Understanding:
					</h4>
					<ul className="text-xs text-zinc-400 space-y-1">
						<li>+ Dependency Injection container</li>
						<li>+ Module system (imports, exports, providers)</li>
						<li>+ Decorators (@Controller, @Injectable, @Get)</li>
						<li>+ Guards, Interceptors, Pipes, Filters</li>
						<li>+ Lifecycle hooks</li>
					</ul>
				</div>
				<div className="border border-zinc-700 p-3">
					<h4 className="text-amber-400 text-sm mb-2">Express/Hono Require:</h4>
					<ul className="text-xs text-zinc-400 space-y-1">
						<li>+ Request/Response objects</li>
						<li>+ Middleware functions</li>
						<li>+ Router setup</li>
						<li className="text-zinc-600">...that's mostly it</li>
					</ul>
				</div>
			</div>
		</div>

		{/* Expandable Code Examples */}
		<div className="space-y-3">
			<CollapsibleCode
				title="Express.js Pattern"
				language="typescript"
				expanded={expandedSection === "express"}
				toggle={() => toggleSection("express")}
				color="amber"
				code={`// Express: Direct, procedural
import express from 'express';
const app = express();

app.get('/users/:id', async (req, res) => {
  const user = await db.findUser(req.params.id);
  res.json(user);
});

// Middleware: simple functions
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});`}
			/>

			<CollapsibleCode
				title="NestJS Pattern"
				language="typescript"
				expanded={expandedSection === "nest"}
				toggle={() => toggleSection("nest")}
				color="rose"
				code={`// NestJS: Declarative, modular
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {} // DI

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DatabaseModule],
})
export class UserModule {}`}
			/>

			<CollapsibleCode
				title="Hono Pattern"
				language="typescript"
				expanded={expandedSection === "hono"}
				toggle={() => toggleSection("hono")}
				color="emerald"
				code={`// Hono: Web Standards, chainable
import { Hono } from 'hono';
const app = new Hono();

app.get('/users/:id', async (c) => {
  const id = c.req.param('id');
  const user = await db.findUser(id);
  return c.json(user);
});

// Middleware: similar to Express
app.use('*', logger());
app.use('/api/*', authMiddleware);`}
			/>
		</div>

		{/* Efficiency Section */}
		<section className="border border-cyan-400/30 p-4 bg-zinc-900/50">
			<h3 className="text-cyan-400 text-sm mb-3">IS NESTJS MORE EFFICIENT?</h3>
			<div className="text-sm text-zinc-300 space-y-3">
				<p>
					<span className="text-zinc-500">Short answer:</span> No. It uses
					Express/Fastify under the hood, so raw performance is similar.
				</p>

				<div className="grid md:grid-cols-3 gap-3 mt-4">
					<div className="border border-zinc-700 p-3">
						<h5 className="text-amber-400 text-xs mb-2">Express</h5>
						<p className="text-xs text-zinc-500">~15,000 req/sec</p>
						<p className="text-xs text-zinc-500">(baseline)</p>
					</div>
					<div className="border border-zinc-700 p-3">
						<h5 className="text-rose-400 text-xs mb-2">NestJS + Fastify</h5>
						<p className="text-xs text-zinc-500">~30,000 req/sec</p>
						<p className="text-xs text-zinc-500">(Fastify adapter)</p>
					</div>
					<div className="border border-zinc-700 p-3">
						<h5 className="text-emerald-400 text-xs mb-2">Hono</h5>
						<p className="text-xs text-zinc-500">~100,000+ req/sec</p>
						<p className="text-xs text-zinc-500">(Bun runtime)</p>
					</div>
				</div>

				<p className="text-zinc-500 text-xs mt-3">
					* Benchmarks vary. Hono's edge comes from minimal abstraction +
					optimized runtimes. NestJS efficiency is in{" "}
					<em>developer productivity</em> at scale, not raw throughput.
				</p>
			</div>
		</section>
	</div>
);

type ColorVariant = "amber" | "rose" | "emerald";

interface CollapsibleCodeProps {
	title: string;
	language: string;
	code: string;
	expanded: boolean;
	toggle: () => void;
	color: ColorVariant;
}

const CollapsibleCode = ({
	title,
	language,
	code,
	expanded,
	toggle,
	color,
}: CollapsibleCodeProps) => {
	const colorMap: Record<ColorVariant, string> = {
		amber: "border-amber-400/30 text-amber-400",
		rose: "border-rose-400/30 text-rose-400",
		emerald: "border-emerald-400/30 text-emerald-400",
	};

	return (
		<div className={`border ${colorMap[color].split(" ")[0]}`}>
			<button
				onClick={toggle}
				className={`w-full flex items-center justify-between p-3 text-sm ${colorMap[color].split(" ")[1]} hover:bg-zinc-900/50`}
			>
				<span>{title}</span>
				<span className="text-zinc-500">{expanded ? "[-]" : "[+]"}</span>
			</button>
			{expanded && (
				<pre className="p-3 bg-zinc-900 text-xs text-zinc-300 overflow-x-auto border-t border-zinc-800">
					<code>{code}</code>
				</pre>
			)}
		</div>
	);
};

/* ============================================
   NEXT.JS INTEGRATION TAB
   ============================================ */
const NextJSTab = () => (
	<div className="space-y-6">
		<h2 className="text-lg text-cyan-400 mb-4 flex items-center gap-2">
			<span className="text-zinc-600">{"//"}</span> Mounting on Next.js API
			Routes
		</h2>

		{/* Compatibility Matrix */}
		<div className="overflow-x-auto">
			<table className="w-full text-sm border border-zinc-800">
				<thead>
					<tr className="bg-zinc-900">
						<th className="text-left p-3 border-b border-zinc-800 text-zinc-400">
							Framework
						</th>
						<th className="text-left p-3 border-b border-zinc-800 text-zinc-400">
							Can Mount in Next.js?
						</th>
						<th className="text-left p-3 border-b border-zinc-800 text-zinc-400">
							Method
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border-b border-zinc-800/50">
						<td className="p-3 text-amber-400">Express.js</td>
						<td className="p-3">
							<span className="text-amber-400">Partial</span>
						</td>
						<td className="p-3 text-zinc-400 text-xs">
							Custom server (loses Vercel optimization)
						</td>
					</tr>
					<tr className="border-b border-zinc-800/50 bg-zinc-900/30">
						<td className="p-3 text-rose-400">NestJS</td>
						<td className="p-3">
							<span className="text-rose-400">No</span>
						</td>
						<td className="p-3 text-zinc-400 text-xs">
							Requires separate server process
						</td>
					</tr>
					<tr>
						<td className="p-3 text-emerald-400">Hono</td>
						<td className="p-3">
							<span className="text-emerald-400">Yes</span>
						</td>
						<td className="p-3 text-zinc-400 text-xs">
							Native catch-all route handler
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		{/* Detailed Explanations */}
		<div className="space-y-4">
			<IntegrationCard
				framework="Express.js"
				color="amber"
				verdict="Requires Custom Server"
				explanation="Express relies on Node.js HTTP server APIs that don't align with Next.js API route model. You can use next-connect or run Express as a custom server, but you lose automatic static optimization and Vercel edge deployment."
				code={`// next.config.js - Custom server approach
// NOT RECOMMENDED: Loses Vercel optimizations

// Alternative: next-connect (adapter)
import { createRouter } from 'next-connect';

const router = createRouter();
router.get((req, res) => res.json({ ok: true }));

export default router.handler();`}
			/>

			<IntegrationCard
				framework="NestJS"
				color="rose"
				verdict="Separate Server Required"
				explanation="NestJS's module system and dependency injection container require bootstrapping at startup. This fundamentally conflicts with Next.js's serverless function model where each route is an isolated function."
				code={`// Typical deployment pattern
// Next.js: :3000 (frontend + BFF)
// NestJS:  :4000 (API server)

// Next.js calls NestJS via HTTP
// app/api/proxy/[...path]/route.ts
export async function GET(req: Request) {
  const res = await fetch(\`http://api:4000/\${path}\`);
  return Response.json(await res.json());
}`}
			/>

			<IntegrationCard
				framework="Hono"
				color="emerald"
				verdict="Native Integration"
				explanation="Hono uses Web Standard Request/Response APIs, which Next.js App Router also uses. This makes Hono a natural fit for catch-all API routes. You get full routing, middleware, and type-safe RPC in a single Next.js deployment."
				code={`// app/api/[[...route]]/route.ts
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

app.get('/users', (c) => c.json({ users: [] }));
app.post('/users', async (c) => {
  const body = await c.req.json();
  return c.json({ created: body });
});

export const GET = handle(app);
export const POST = handle(app);`}
			/>
		</div>

		{/* Architecture Diagram */}
		<section className="border border-cyan-400/30 p-4 bg-zinc-900/50">
			<h3 className="text-cyan-400 text-sm mb-3">DEPLOYMENT TOPOLOGY</h3>
			<pre className="text-xs text-zinc-400 overflow-x-auto">
				{`┌─────────────────────────────────────────────────────────────┐
│                    VERCEL / EDGE                            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Next.js Application                                │    │
│  │  ┌───────────────┐  ┌────────────────────────────┐  │    │
│  │  │ React Pages   │  │ API Routes                 │  │    │
│  │  │ /app/*        │  │ /app/api/[[...route]]      │  │    │
│  │  │               │  │  └─> Hono (mounted)        │  │    │
│  │  └───────────────┘  └────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│               TRADITIONAL SERVER DEPLOYMENT                  │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐         ┌──────────────────────────┐  │
│  │ Next.js (:3000)  │ <────>  │ NestJS/Express (:4000)   │  │
│  │ Frontend + BFF   │   HTTP  │ Backend API Server       │  │
│  └──────────────────┘         └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘`}
			</pre>
		</section>
	</div>
);

interface IntegrationCardProps {
	framework: string;
	color: ColorVariant;
	verdict: string;
	explanation: string;
	code: string;
}

const IntegrationCard = ({
	framework,
	color,
	verdict,
	explanation,
	code,
}: IntegrationCardProps) => {
	const colorMap: Record<ColorVariant, { border: string; text: string }> = {
		amber: { border: "border-amber-400/30", text: "text-amber-400" },
		rose: { border: "border-rose-400/30", text: "text-rose-400" },
		emerald: { border: "border-emerald-400/30", text: "text-emerald-400" },
	};
	const c = colorMap[color];

	return (
		<div className={`border ${c.border} bg-zinc-900/30`}>
			<div className="p-4 border-b border-zinc-800">
				<div className="flex items-center justify-between mb-2">
					<h4 className={`${c.text}`}>{framework}</h4>
					<span className="text-xs text-zinc-500">{verdict}</span>
				</div>
				<p className="text-sm text-zinc-400">{explanation}</p>
			</div>
			<pre className="p-3 text-xs text-zinc-300 overflow-x-auto">
				<code>{code}</code>
			</pre>
		</div>
	);
};

/* ============================================
   USE CASES TAB
   ============================================ */
const UseCasesTab = () => (
	<div className="space-y-6">
		<h2 className="text-lg text-cyan-400 mb-4 flex items-center gap-2">
			<span className="text-zinc-600">{"//"}</span> When to Use Each Framework
		</h2>

		<div className="grid gap-4">
			<UseCaseCard
				framework="Express.js"
				color="amber"
				idealFor={[
					"Learning backend development",
					"Prototypes and MVPs",
					"APIs with custom requirements",
					"Microservices with specific needs",
					"Teams that want full control",
				]}
				notIdealFor={[
					"Large teams needing conventions",
					"Projects requiring strict architecture",
					"Edge/serverless deployments",
				]}
				realWorld="REST APIs, webhook receivers, proxy servers, real-time apps with Socket.io"
			/>

			<UseCaseCard
				framework="NestJS"
				color="rose"
				idealFor={[
					"Enterprise applications",
					"Large teams (5+ developers)",
					"Long-term maintainable codebases",
					"GraphQL APIs",
					"Microservices with message queues",
					"Projects needing OpenAPI/Swagger",
				]}
				notIdealFor={[
					"Quick prototypes",
					"Simple CRUD APIs",
					"Serverless-first deployments",
					"Teams unfamiliar with Angular/DI",
				]}
				realWorld="Enterprise backends, healthcare systems, fintech platforms, B2B SaaS APIs"
			/>

			<UseCaseCard
				framework="Hono"
				color="emerald"
				idealFor={[
					"Edge computing (Cloudflare Workers)",
					"Serverless functions",
					"Next.js API routes",
					"Bun-powered servers",
					"Type-safe RPC patterns",
					"Multi-runtime portability",
				]}
				notIdealFor={[
					"Complex DI requirements",
					"Teams needing extensive middleware ecosystem",
					"Projects locked to Node.js-specific APIs",
				]}
				realWorld="Edge APIs, BFF layers, Cloudflare Workers apps, Deno Deploy services"
			/>
		</div>

		{/* Decision Factors */}
		<section className="border border-zinc-800 p-4 bg-zinc-900/50">
			<h3 className="text-cyan-400 text-sm mb-3">DECISION FACTORS</h3>
			<div className="grid md:grid-cols-2 gap-4 text-sm">
				<div>
					<h4 className="text-zinc-400 mb-2">Team Size</h4>
					<ul className="text-xs text-zinc-500 space-y-1">
						<li>1-2 devs: Express or Hono</li>
						<li>3-5 devs: Any (depends on experience)</li>
						<li>5+ devs: NestJS (enforced conventions help)</li>
					</ul>
				</div>
				<div>
					<h4 className="text-zinc-400 mb-2">Deployment Target</h4>
					<ul className="text-xs text-zinc-500 space-y-1">
						<li>Traditional VPS: Any</li>
						<li>Vercel/Serverless: Hono</li>
						<li>Cloudflare Workers: Hono</li>
						<li>Kubernetes: NestJS or Express</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
);

interface UseCaseCardProps {
	framework: string;
	color: ColorVariant;
	idealFor: string[];
	notIdealFor: string[];
	realWorld: string;
}

const UseCaseCard = ({
	framework,
	color,
	idealFor,
	notIdealFor,
	realWorld,
}: UseCaseCardProps) => {
	const colorMap: Record<ColorVariant, { border: string; text: string }> = {
		amber: { border: "border-amber-400/30", text: "text-amber-400" },
		rose: { border: "border-rose-400/30", text: "text-rose-400" },
		emerald: { border: "border-emerald-400/30", text: "text-emerald-400" },
	};
	const c = colorMap[color];

	return (
		<div className={`border ${c.border} bg-zinc-900/30 p-4`}>
			<h3 className={`${c.text} mb-3`}>{framework}</h3>
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<h4 className="text-zinc-400 text-xs mb-2">IDEAL FOR</h4>
					<ul className="text-sm text-zinc-300 space-y-1">
						{idealFor.map((item, i) => (
							<li key={i} className="flex items-start gap-2">
								<span className="text-emerald-400 shrink-0">+</span>
								{item}
							</li>
						))}
					</ul>
				</div>
				<div>
					<h4 className="text-zinc-400 text-xs mb-2">NOT IDEAL FOR</h4>
					<ul className="text-sm text-zinc-500 space-y-1">
						{notIdealFor.map((item, i) => (
							<li key={i} className="flex items-start gap-2">
								<span className="text-rose-400 shrink-0">-</span>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="mt-3 pt-3 border-t border-zinc-800">
				<span className="text-zinc-500 text-xs">Real-world: </span>
				<span className="text-zinc-400 text-xs">{realWorld}</span>
			</div>
		</div>
	);
};

/* ============================================
   UNIQUE CAPABILITIES TAB
   ============================================ */
const UniqueTab = () => (
	<div className="space-y-6">
		<h2 className="text-lg text-cyan-400 mb-4 flex items-center gap-2">
			<span className="text-zinc-600">{"//"}</span> Unique Capabilities
		</h2>

		<div className="space-y-4">
			{/* Express */}
			<UniqueCard
				framework="Express.js"
				color="amber"
				capabilities={[
					{
						name: "Ecosystem Dominance",
						desc: "Largest middleware library: passport.js, multer, cors, helmet, compression, etc.",
					},
					{
						name: "Foundation Framework",
						desc: "NestJS, Feathers, Sails, LoopBack all built on or inspired by Express",
					},
					{
						name: "Universal Documentation",
						desc: "Every tutorial, every Stack Overflow answer references Express patterns",
					},
					{
						name: "Zero Magic",
						desc: "What you write is what runs. No compilation, no decorators, no abstractions",
					},
				]}
			/>

			{/* NestJS */}
			<UniqueCard
				framework="NestJS"
				color="rose"
				capabilities={[
					{
						name: "Dependency Injection",
						desc: "IoC container with constructor injection, scoped providers, async providers",
					},
					{
						name: "First-class Microservices",
						desc: "Built-in support for NATS, RabbitMQ, Kafka, Redis, gRPC transports",
					},
					{
						name: "CLI Scaffolding",
						desc: "nest generate resource Users creates controller, service, module, DTOs, tests",
					},
					{
						name: "OpenAPI/Swagger Generation",
						desc: "Decorators auto-generate API documentation from code",
					},
					{
						name: "Guards/Interceptors/Pipes",
						desc: "Declarative request processing pipeline with reusable components",
					},
					{
						name: "CQRS + Event Sourcing",
						desc: "@nestjs/cqrs module for command/query separation",
					},
				]}
			/>

			{/* Hono */}
			<UniqueCard
				framework="Hono"
				color="emerald"
				capabilities={[
					{
						name: "Multi-Runtime",
						desc: "Same code runs on Cloudflare Workers, Deno, Bun, Node.js, AWS Lambda",
					},
					{
						name: "Web Standards",
						desc: "Uses native Request/Response, no proprietary abstractions",
					},
					{
						name: "Hono RPC",
						desc: "Type-safe client generated from routes. Frontend gets typed API calls.",
					},
					{
						name: "JSX Middleware",
						desc: "Render JSX templates directly in responses (similar to htmx patterns)",
					},
					{
						name: "Validator Middleware",
						desc: "Built-in Zod integration for request validation with type inference",
					},
					{
						name: "Minimal Overhead",
						desc: "14KB core, 0 dependencies, fastest cold starts",
					},
				]}
			/>
		</div>

		{/* Hono RPC Example */}
		<section className="border border-emerald-400/30 p-4 bg-zinc-900/50">
			<h3 className="text-emerald-400 text-sm mb-3">
				HONO RPC - Type-Safe Client
			</h3>
			<pre className="text-xs text-zinc-300 overflow-x-auto">
				{`// Server: app/api/[[...route]]/route.ts
const app = new Hono()
  .get('/users', (c) => c.json({ users: [] }))
  .post('/users', zValidator('json', schema), async (c) => {
    const data = c.req.valid('json');
    return c.json({ id: 1, ...data });
  });

export type AppType = typeof app;

// Client: lib/api.ts
import { hc } from 'hono/client';
import type { AppType } from '@/app/api/[[...route]]/route';

const client = hc<AppType>('/api');

// Fully typed!
const res = await client.users.$get();
const users = await res.json(); // { users: User[] }`}
			</pre>
		</section>
	</div>
);

interface Capability {
	name: string;
	desc: string;
}

interface UniqueCardProps {
	framework: string;
	color: ColorVariant;
	capabilities: Capability[];
}

const UniqueCard = ({ framework, color, capabilities }: UniqueCardProps) => {
	const colorMap: Record<
		ColorVariant,
		{ border: string; text: string; bullet: string }
	> = {
		amber: {
			border: "border-amber-400/30",
			text: "text-amber-400",
			bullet: "bg-amber-400",
		},
		rose: {
			border: "border-rose-400/30",
			text: "text-rose-400",
			bullet: "bg-rose-400",
		},
		emerald: {
			border: "border-emerald-400/30",
			text: "text-emerald-400",
			bullet: "bg-emerald-400",
		},
	};
	const c = colorMap[color];

	return (
		<div className={`border ${c.border} bg-zinc-900/30 p-4`}>
			<h3 className={`${c.text} mb-3`}>{framework}</h3>
			<div className="grid md:grid-cols-2 gap-3">
				{capabilities.map((cap, i) => (
					<div key={i} className="flex items-start gap-2">
						<span
							className={`${c.bullet} w-1.5 h-1.5 rounded-full mt-1.5 shrink-0`}
						/>
						<div>
							<span className="text-sm text-zinc-200">{cap.name}</span>
							<p className="text-xs text-zinc-500">{cap.desc}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

/* ============================================
   DECISION GUIDE TAB
   ============================================ */
const DecisionTab = () => (
	<div className="space-y-6">
		<h2 className="text-lg text-cyan-400 mb-4 flex items-center gap-2">
			<span className="text-zinc-600">{"//"}</span> Decision Flowchart
		</h2>

		<div className="border border-zinc-800 p-4 bg-zinc-900/30">
			<pre className="text-xs text-zinc-400 overflow-x-auto leading-relaxed">
				{`START
  │
  ▼
┌─────────────────────────────────┐
│ Deploying to Edge/Serverless?  │
└───────────────┬─────────────────┘
                │
        ┌───────┴───────┐
        │               │
       YES             NO
        │               │
        ▼               ▼
   ┌────────┐    ┌──────────────────────┐
   │  HONO  │    │ Team > 5 developers? │
   └────────┘    └───────────┬──────────┘
                             │
                     ┌───────┴───────┐
                     │               │
                    YES             NO
                     │               │
                     ▼               ▼
               ┌─────────┐    ┌──────────────────────┐
               │ NESTJS  │    │ Need full control?   │
               └─────────┘    └───────────┬──────────┘
                                          │
                                  ┌───────┴───────┐
                                  │               │
                                 YES             NO
                                  │               │
                                  ▼               ▼
                            ┌──────────┐    ┌────────┐
                            │ EXPRESS  │    │  HONO  │
                            └──────────┘    └────────┘`}
			</pre>
		</div>

		{/* Quick Decision Table */}
		<section className="border border-cyan-400/30 p-4 bg-zinc-900/50">
			<h3 className="text-cyan-400 text-sm mb-3">QUICK DECISION TABLE</h3>
			<div className="overflow-x-auto">
				<table className="w-full text-sm border border-zinc-800">
					<thead>
						<tr className="bg-zinc-900">
							<th className="text-left p-3 border-b border-zinc-800 text-zinc-400">
								If you want...
							</th>
							<th className="text-left p-3 border-b border-zinc-800 text-zinc-400">
								Choose
							</th>
						</tr>
					</thead>
					<tbody className="text-zinc-300">
						<tr className="border-b border-zinc-800/50">
							<td className="p-3">Maximum control, minimal abstraction</td>
							<td className="p-3 text-amber-400">Express.js</td>
						</tr>
						<tr className="border-b border-zinc-800/50 bg-zinc-900/30">
							<td className="p-3">
								Enterprise patterns, large team scalability
							</td>
							<td className="p-3 text-rose-400">NestJS</td>
						</tr>
						<tr className="border-b border-zinc-800/50">
							<td className="p-3">Edge deployment, multi-runtime</td>
							<td className="p-3 text-emerald-400">Hono</td>
						</tr>
						<tr className="border-b border-zinc-800/50 bg-zinc-900/30">
							<td className="p-3">Next.js API routes integration</td>
							<td className="p-3 text-emerald-400">Hono</td>
						</tr>
						<tr className="border-b border-zinc-800/50">
							<td className="p-3">GraphQL with full tooling</td>
							<td className="p-3 text-rose-400">NestJS</td>
						</tr>
						<tr className="border-b border-zinc-800/50 bg-zinc-900/30">
							<td className="p-3">Microservices with message queues</td>
							<td className="p-3 text-rose-400">NestJS</td>
						</tr>
						<tr className="border-b border-zinc-800/50">
							<td className="p-3">Type-safe RPC pattern</td>
							<td className="p-3 text-emerald-400">Hono</td>
						</tr>
						<tr className="border-b border-zinc-800/50 bg-zinc-900/30">
							<td className="p-3">Learning backend fundamentals</td>
							<td className="p-3 text-amber-400">Express.js</td>
						</tr>
						<tr>
							<td className="p-3">Smallest bundle, fastest cold starts</td>
							<td className="p-3 text-emerald-400">Hono</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		{/* Final Recommendation */}
		<section className="border border-zinc-700 p-4 bg-zinc-900/30">
			<h3 className="text-zinc-300 text-sm mb-3">
				CONTEXT-SPECIFIC RECOMMENDATIONS
			</h3>
			<div className="space-y-3 text-sm text-zinc-400">
				<p>
					<span className="text-cyan-400">For your SWMS project:</span> You're
					already using NestJS patterns, which makes sense for industrial IoT
					with complex business logic, multiple device integrations, and
					long-term maintenance requirements. The DI system helps manage
					hardware adapter dependencies.
				</p>
				<p>
					<span className="text-cyan-400">For your Next.js portfolio:</span>{" "}
					Hono's RPC pattern would align with your SSOT architecture principles.
					Mount it in /api/[[...route]] for typed API calls from React
					components.
				</p>
			</div>
		</section>
	</div>
);

export default FrameworkComparison;
