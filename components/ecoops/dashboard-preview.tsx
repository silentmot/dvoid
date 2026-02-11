"use client";

import { ArrowDown, ArrowUp, Minus, TrendingDown, TrendingUp } from "lucide-react";

// =============================================================================
// MOCK DATA - Simulates production dashboard metrics
// =============================================================================

const MOCK_KPI = [
	{ label: "Production", period: "Last 7 Days", value: 4280, change: 12.4, trend: "up" as const, color: "oklch(0.72 0.19 142)" },
	{ label: "Received", period: "Last 7 Days", value: 3150, change: 8.2, trend: "up" as const, color: "oklch(0.68 0.16 230)" },
	{ label: "Dispatched", period: "Last 7 Days", value: 3890, change: -3.1, trend: "down" as const, color: "oklch(0.75 0.18 55)" },
	{ label: "Inventory", period: "Current Stock", value: 12450, change: 0.4, trend: "stable" as const, color: "oklch(0.70 0.14 250)" },
];

const MOCK_INVENTORY = [
	{ code: "AGG-4", name: "Aggregate 4\"", stock: 2800, produced: 420, dispatched: 380, color: "oklch(0.65 0.20 145)" },
	{ code: "AGG-2", name: "Aggregate 2\"", stock: 2100, produced: 350, dispatched: 410, color: "oklch(0.68 0.18 150)" },
	{ code: "AGG-1", name: "Aggregate 1\"", stock: 1850, produced: 280, dispatched: 290, color: "oklch(0.71 0.16 155)" },
	{ code: "AGG-3/4", name: "Aggregate 3/4\"", stock: 1620, produced: 220, dispatched: 180, color: "oklch(0.74 0.14 160)" },
	{ code: "AGG-1/2", name: "Aggregate 1/2\"", stock: 1380, produced: 190, dispatched: 210, color: "oklch(0.77 0.12 165)" },
	{ code: "AGG-3/8", name: "Aggregate 3/8\"", stock: 980, produced: 150, dispatched: 140, color: "oklch(0.80 0.10 170)" },
	{ code: "BASE-A", name: "Base Course A", stock: 890, produced: 180, dispatched: 195, color: "oklch(0.65 0.16 40)" },
	{ code: "BASE-B", name: "Base Course B", stock: 540, produced: 120, dispatched: 105, color: "oklch(0.70 0.14 45)" },
	{ code: "FINE", name: "Fine Material", stock: 290, produced: 95, dispatched: 85, color: "oklch(0.68 0.12 200)" },
];

const MOCK_MANPOWER_DAYS = ["Feb 5", "Feb 6", "Feb 7", "Feb 8", "Feb 9", "Feb 10", "Feb 11"];
const MOCK_MANPOWER_ROLES = [
	{ code: "DRV", label: "Drivers", color: "oklch(0.72 0.19 142)", data: [8, 9, 8, 10, 9, 8, 9] },
	{ code: "OPR", label: "Operators", color: "oklch(0.68 0.16 230)", data: [4, 4, 5, 4, 5, 4, 4] },
	{ code: "MNT", label: "Maintenance", color: "oklch(0.75 0.18 55)", data: [2, 2, 2, 3, 2, 2, 2] },
	{ code: "SEC", label: "Security", color: "oklch(0.65 0.14 320)", data: [2, 2, 2, 2, 2, 2, 2] },
	{ code: "LBR", label: "Laborers", color: "oklch(0.70 0.16 180)", data: [6, 7, 6, 8, 7, 6, 7] },
];

const MOCK_EQUIPMENT_DAYS = ["Feb 5", "Feb 6", "Feb 7", "Feb 8", "Feb 9", "Feb 10", "Feb 11"];
const MOCK_EQUIPMENT = [
	{ code: "CRUSH", label: "Crusher", color: "oklch(0.68 0.16 230)", data: [18, 20, 19, 22, 21, 18, 20] },
	{ code: "LOADER", label: "Loader", color: "oklch(0.72 0.19 142)", data: [16, 18, 17, 19, 18, 16, 17] },
	{ code: "EXC", label: "Excavator", color: "oklch(0.68 0.16 180)", data: [14, 15, 14, 16, 15, 14, 15] },
	{ code: "DUMP", label: "Dump Truck", color: "oklch(0.72 0.20 40)", data: [24, 28, 26, 30, 28, 24, 26] },
	{ code: "GENE", label: "Generator", color: "oklch(0.75 0.14 60)", data: [10, 10, 10, 10, 10, 10, 10] },
];

const MOCK_UTILIZATION = {
	equipment: { percentage: 78, count: 12, hours: 168 },
	manpower: { percentage: 85, count: 24, hours: 192 },
};

// =============================================================================
// DESIGN TOKENS (Extracted from ops/lib/DesignTokens.ts)
// =============================================================================

const COLORS = {
	bg: {
		primary: "oklch(0.13 0.02 260)",
		secondary: "oklch(0.17 0.02 260)",
		card: "oklch(0.15 0.02 260)",
	},
	border: {
		default: "oklch(0.25 0.02 260)",
		subtle: "oklch(0.20 0.02 260)",
	},
	text: {
		primary: "oklch(0.95 0.01 260)",
		secondary: "oklch(0.70 0.02 260)",
		tertiary: "oklch(0.55 0.02 260)",
	},
	status: {
		success: "oklch(0.72 0.19 142)",
		error: "oklch(0.65 0.20 25)",
		warning: "oklch(0.75 0.18 85)",
	},
};

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function MetricCard({ label, period, value, change, trend, color }: {
	label: string;
	period: string;
	value: number;
	change: number;
	trend: "up" | "down" | "stable";
	color: string;
}) {
	const trendColor = trend === "up" ? COLORS.status.success : trend === "down" ? COLORS.status.error : COLORS.text.tertiary;
	const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;

	return (
		<div
			className="flex flex-col rounded-xl p-3 gap-1"
			style={{ background: COLORS.bg.secondary, border: `1px solid ${COLORS.border.subtle}` }}
		>
			<div className="flex flex-col gap-0.5">
				<span className="text-[10px] font-semibold" style={{ color }}>{label}</span>
				<span className="text-[8px]" style={{ color: COLORS.text.tertiary }}>{period}</span>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-baseline gap-1">
					<span className="text-lg font-bold" style={{ color }}>{value.toLocaleString()}</span>
					<span className="text-[8px] font-medium" style={{ color }}>TON</span>
				</div>
				<div
					className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-semibold"
					style={{
						background: `color-mix(in oklch, ${trendColor} 15%, transparent)`,
						color: trendColor,
						border: `1px solid color-mix(in oklch, ${trendColor} 30%, transparent)`,
					}}
				>
					<TrendIcon size={8} />
					<span>{trend === "up" ? "+" : trend === "down" ? "-" : ""}{Math.abs(change).toFixed(1)}%</span>
				</div>
			</div>
		</div>
	);
}

function InventoryChart() {
	const maxStock = Math.max(...MOCK_INVENTORY.map((m) => m.stock));

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<span className="text-[10px] font-semibold" style={{ color: COLORS.text.primary }}>Inventory Levels</span>
				<span className="text-[8px]" style={{ color: COLORS.text.tertiary }}>Last 7 Days stock levels</span>
			</div>
			<div className="flex gap-1 items-end h-24">
				{MOCK_INVENTORY.map((material) => {
					const stockHeight = (material.stock / maxStock) * 100;
					const prodHeight = (material.produced / maxStock) * 100;
					const dispHeight = (material.dispatched / maxStock) * 100;

					return (
						<div key={material.code} className="flex-1 flex flex-col items-center gap-0.5">
							<div className="flex gap-px items-end w-full h-20">
								<div
									className="flex-1 rounded-t-sm transition-all"
									style={{ height: `${stockHeight}%`, background: material.color }}
								/>
								<div
									className="flex-1 rounded-t-sm"
									style={{ height: `${prodHeight}%`, background: COLORS.status.success }}
								/>
								<div
									className="flex-1 rounded-t-sm"
									style={{ height: `${dispHeight}%`, background: COLORS.status.error }}
								/>
							</div>
							<span className="text-[6px] font-medium" style={{ color: material.color }}>{material.code.split("-")[1] || material.code}</span>
						</div>
					);
				})}
			</div>
			<div className="flex justify-center gap-3">
				{[
					{ label: "Stock", color: COLORS.text.secondary },
					{ label: "Produced", color: COLORS.status.success },
					{ label: "Dispatched", color: COLORS.status.error },
				].map((item) => (
					<div key={item.label} className="flex items-center gap-1">
						<div className="w-1.5 h-1.5 rounded-sm" style={{ background: item.color }} />
						<span className="text-[7px] font-medium" style={{ color: item.color }}>{item.label}</span>
					</div>
				))}
			</div>
		</div>
	);
}

function StackedBarChart({ title, subtitle, days, series }: {
	title: string;
	subtitle: string;
	days: string[];
	series: Array<{ code: string; label: string; color: string; data: number[] }>;
}) {
	const maxTotal = Math.max(...days.map((_, i) => series.reduce((sum, s) => sum + s.data[i], 0)));

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<span className="text-[10px] font-semibold" style={{ color: COLORS.text.primary }}>{title}</span>
				<span className="text-[8px]" style={{ color: COLORS.text.tertiary }}>{subtitle}</span>
			</div>
			<div className="flex gap-1 items-end h-16">
				{days.map((day, dayIndex) => {
					const total = series.reduce((sum, s) => sum + s.data[dayIndex], 0);
					const heightPercent = (total / maxTotal) * 100;

					return (
						<div key={day} className="flex-1 flex flex-col items-center gap-0.5">
							<div
								className="w-full rounded-t-sm flex flex-col-reverse overflow-hidden"
								style={{ height: `${heightPercent}%`, minHeight: 4 }}
							>
								{series.map((s) => {
									const segmentPercent = (s.data[dayIndex] / total) * 100;
									return (
										<div
											key={s.code}
											style={{ height: `${segmentPercent}%`, background: s.color, minHeight: 1 }}
										/>
									);
								})}
							</div>
							<span className="text-[6px]" style={{ color: COLORS.text.tertiary }}>{day.split(" ")[1]}</span>
						</div>
					);
				})}
			</div>
			<div className="flex flex-wrap justify-center gap-2">
				{series.map((s) => (
					<div key={s.code} className="flex items-center gap-1">
						<div className="w-1.5 h-1.5 rounded-sm" style={{ background: s.color }} />
						<span className="text-[6px] font-medium" style={{ color: s.color }}>{s.label}</span>
					</div>
				))}
			</div>
		</div>
	);
}

function UtilizationRing({ label, percentage, count, hours, status }: {
	label: string;
	percentage: number;
	count: number;
	hours: number;
	status: "success" | "warning" | "error";
}) {
	const size = 48;
	const strokeWidth = 4;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (percentage / 100) * circumference;
	const statusColor = status === "success" ? COLORS.status.success : status === "warning" ? COLORS.status.warning : COLORS.status.error;

	return (
		<div className="flex flex-col items-center gap-1">
			<div className="relative" style={{ width: size, height: size }}>
				<svg width={size} height={size} className="-rotate-90">
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke={COLORS.border.default}
						strokeWidth={strokeWidth}
						fill="transparent"
					/>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke={statusColor}
						strokeWidth={strokeWidth}
						fill="transparent"
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						strokeLinecap="round"
					/>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-[10px] font-bold" style={{ color: COLORS.text.primary }}>{percentage}%</span>
				</div>
			</div>
			<span className="text-[8px] font-medium" style={{ color: COLORS.text.primary }}>{label}</span>
			<span className="text-[6px]" style={{ color: COLORS.text.tertiary }}>{count} units · {hours}h</span>
		</div>
	);
}

function ProductionMiniChart({ title, data, color }: { title: string; data: number[]; color: string }) {
	const max = Math.max(...data);
	const min = Math.min(...data);
	const range = max - min || 1;

	return (
		<div className="flex flex-col gap-1.5 p-2 rounded-lg" style={{ background: COLORS.bg.secondary, border: `1px solid ${COLORS.border.subtle}` }}>
			<span className="text-[8px] font-semibold" style={{ color: COLORS.text.primary }}>{title}</span>
			<div className="flex items-end gap-px h-10">
				{data.map((value, i) => {
					const height = ((value - min) / range) * 100;
					return (
						<div
							key={`bar-${i.toString()}`}
							className="flex-1 rounded-t-sm"
							style={{ height: `${Math.max(height, 10)}%`, background: color }}
						/>
					);
				})}
			</div>
		</div>
	);
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

interface DashboardPreviewProps {
	className?: string;
}

export function DashboardPreview({ className = "" }: DashboardPreviewProps) {
	return (
		<div
			className={`rounded-xl overflow-hidden ${className}`}
			style={{
				background: COLORS.bg.primary,
				border: `1px solid ${COLORS.border.default}`,
				fontFamily: "system-ui, -apple-system, sans-serif",
			}}
		>
			{/* Header Bar */}
			<div
				className="flex items-center justify-between px-3 py-2"
				style={{ borderBottom: `1px solid ${COLORS.border.default}` }}
			>
				<div className="flex items-center gap-2">
					<div className="w-5 h-5 rounded-md bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500" />
					<span className="text-[10px] font-bold" style={{ color: COLORS.text.primary }}>EcoOps Dashboard</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-[8px] px-2 py-0.5 rounded" style={{ background: COLORS.bg.secondary, color: COLORS.text.secondary }}>Al Asla 29</span>
					<span className="text-[8px]" style={{ color: COLORS.text.tertiary }}>Feb 5 - Feb 11, 2025</span>
				</div>
			</div>

			{/* Dashboard Content */}
			<div className="p-3 flex flex-col gap-3">
				{/* Row 1: KPI Cards */}
				<div className="grid grid-cols-4 gap-2">
					{MOCK_KPI.map((kpi) => (
						<MetricCard key={kpi.label} {...kpi} />
					))}
				</div>

				{/* Row 2: Inventory Chart */}
				<div className="p-2 rounded-lg" style={{ background: COLORS.bg.card, border: `1px solid ${COLORS.border.subtle}` }}>
					<InventoryChart />
				</div>

				{/* Row 3: Manpower + Equipment + Utilization */}
				<div className="grid grid-cols-5 gap-2">
					<div className="col-span-2 p-2 rounded-lg" style={{ background: COLORS.bg.card, border: `1px solid ${COLORS.border.subtle}` }}>
						<StackedBarChart
							title="Manpower Attendance"
							subtitle="Last 7 Days"
							days={MOCK_MANPOWER_DAYS}
							series={MOCK_MANPOWER_ROLES}
						/>
					</div>
					<div className="col-span-2 p-2 rounded-lg" style={{ background: COLORS.bg.card, border: `1px solid ${COLORS.border.subtle}` }}>
						<StackedBarChart
							title="Equipment Status"
							subtitle="Last 7 Days activity"
							days={MOCK_EQUIPMENT_DAYS}
							series={MOCK_EQUIPMENT}
						/>
					</div>
					<div className="col-span-1 p-2 rounded-lg flex flex-col items-center justify-center gap-2" style={{ background: COLORS.bg.card, border: `1px solid ${COLORS.border.subtle}` }}>
						<span className="text-[8px] font-semibold" style={{ color: COLORS.text.primary }}>Utilization</span>
						<UtilizationRing label="Equipment" percentage={MOCK_UTILIZATION.equipment.percentage} count={MOCK_UTILIZATION.equipment.count} hours={MOCK_UTILIZATION.equipment.hours} status="success" />
						<div className="w-full h-px" style={{ background: COLORS.border.default }} />
						<UtilizationRing label="Manpower" percentage={MOCK_UTILIZATION.manpower.percentage} count={MOCK_UTILIZATION.manpower.count} hours={MOCK_UTILIZATION.manpower.hours} status="success" />
					</div>
				</div>

				{/* Row 4: Production Mini Charts */}
				<div className="grid grid-cols-3 gap-2">
					<ProductionMiniChart title="Production vs Target" data={[85, 92, 88, 95, 91, 87, 94]} color={COLORS.status.success} />
					<ProductionMiniChart title="Recycling Efficiency" data={[78, 82, 80, 85, 83, 79, 84]} color="oklch(0.68 0.16 230)" />
					<ProductionMiniChart title="Mixing Ratio" data={[65, 68, 70, 72, 69, 71, 73]} color="oklch(0.75 0.18 55)" />
				</div>
			</div>
		</div>
	);
}
