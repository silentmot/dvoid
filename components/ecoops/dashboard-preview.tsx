"use client";

import {
	ArrowDown,
	ArrowUp,
	Calendar,
	ChevronRight,
	Menu,
	Minus,
	Moon,
	Search,
} from "lucide-react";

// =============================================================================
// MOCK DATA - Simulates production dashboard metrics
// =============================================================================

const MOCK_KPI = [
	{
		label: "Production",
		period: "Last 7 Days",
		value: 4280,
		change: 12.4,
		trend: "up" as const,
		color: "oklch(0.72 0.19 142)",
	},
	{
		label: "Received",
		period: "Last 7 Days",
		value: 3150,
		change: 8.2,
		trend: "up" as const,
		color: "oklch(0.68 0.16 230)",
	},
	{
		label: "Dispatched",
		period: "Last 7 Days",
		value: 3890,
		change: -3.1,
		trend: "down" as const,
		color: "oklch(0.75 0.18 55)",
	},
	{
		label: "Inventory",
		period: "Current Stock",
		value: 12450,
		change: 0.4,
		trend: "stable" as const,
		color: "oklch(0.70 0.14 250)",
	},
];

const MOCK_INVENTORY = [
	{
		code: '4"',
		stock: 2800,
		produced: 420,
		dispatched: 380,
		color: "oklch(0.65 0.20 145)",
	},
	{
		code: '2"',
		stock: 2100,
		produced: 350,
		dispatched: 410,
		color: "oklch(0.68 0.18 150)",
	},
	{
		code: '1"',
		stock: 1850,
		produced: 280,
		dispatched: 290,
		color: "oklch(0.71 0.16 155)",
	},
	{
		code: "3/4",
		stock: 1620,
		produced: 220,
		dispatched: 180,
		color: "oklch(0.74 0.14 160)",
	},
	{
		code: "1/2",
		stock: 1380,
		produced: 190,
		dispatched: 210,
		color: "oklch(0.77 0.12 165)",
	},
	{
		code: "3/8",
		stock: 980,
		produced: 150,
		dispatched: 140,
		color: "oklch(0.80 0.10 170)",
	},
	{
		code: "BSA",
		stock: 890,
		produced: 180,
		dispatched: 195,
		color: "oklch(0.65 0.16 40)",
	},
	{
		code: "BSB",
		stock: 540,
		produced: 120,
		dispatched: 105,
		color: "oklch(0.70 0.14 45)",
	},
	{
		code: "FNE",
		stock: 290,
		produced: 95,
		dispatched: 85,
		color: "oklch(0.68 0.12 200)",
	},
];

const MOCK_DAYS = ["5", "6", "7", "8", "9", "10", "11"];

const MOCK_MANPOWER_ROLES = [
	{
		code: "DRV",
		label: "Drivers",
		color: "oklch(0.72 0.19 142)",
		data: [8, 9, 8, 10, 9, 8, 9],
	},
	{
		code: "OPR",
		label: "Operators",
		color: "oklch(0.68 0.16 230)",
		data: [4, 4, 5, 4, 5, 4, 4],
	},
	{
		code: "MNT",
		label: "Maintenance",
		color: "oklch(0.75 0.18 55)",
		data: [2, 2, 2, 3, 2, 2, 2],
	},
	{
		code: "SEC",
		label: "Security",
		color: "oklch(0.65 0.14 320)",
		data: [2, 2, 2, 2, 2, 2, 2],
	},
	{
		code: "LBR",
		label: "Laborers",
		color: "oklch(0.70 0.16 180)",
		data: [6, 7, 6, 8, 7, 6, 7],
	},
];

const MOCK_EQUIPMENT = [
	{
		code: "CRUSH",
		label: "Crusher",
		color: "oklch(0.68 0.16 230)",
		data: [18, 20, 19, 22, 21, 18, 20],
	},
	{
		code: "LOADER",
		label: "Loader",
		color: "oklch(0.72 0.19 142)",
		data: [16, 18, 17, 19, 18, 16, 17],
	},
	{
		code: "EXC",
		label: "Excavator",
		color: "oklch(0.68 0.16 180)",
		data: [14, 15, 14, 16, 15, 14, 15],
	},
	{
		code: "DUMP",
		label: "Dump Truck",
		color: "oklch(0.72 0.20 40)",
		data: [24, 28, 26, 30, 28, 24, 26],
	},
];

const MOCK_PRODUCTION_TREND = {
	actual: [420, 480, 520, 490, 540, 510, 560],
	target: [500, 500, 500, 500, 500, 500, 500],
};

const MOCK_RECYCLING = {
	received: [380, 420, 400, 450, 430, 410, 440],
	processed: [350, 400, 380, 420, 410, 390, 420],
};

const MOCK_MIXING = { cdw: 65, raw: 35 };

const MOCK_UTILIZATION = {
	equipment: { percentage: 78, count: 12, hours: 168 },
	manpower: { percentage: 85, count: 24, hours: 192 },
};

// =============================================================================
// DESIGN TOKENS
// =============================================================================

const COLORS = {
	bg: {
		primary: "oklch(0.13 0.02 260)",
		secondary: "oklch(0.17 0.02 260)",
		card: "oklch(0.15 0.02 260)",
		sidebar: "oklch(0.11 0.02 260)",
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
		info: "oklch(0.68 0.16 230)",
	},
	chart: {
		cdw: "oklch(0.72 0.19 142)",
		raw: "oklch(0.75 0.18 55)",
	},
};

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function Sidebar() {
	const navItems = [
		{ icon: "grid", label: "Dashboard", active: true },
		{ icon: "box", label: "Production" },
		{ icon: "truck", label: "Dispatch" },
		{ icon: "package", label: "Inventory" },
		{ icon: "wrench", label: "Equipment" },
		{ icon: "users", label: "Manpower" },
	];

	return (
		<div
			className="w-10 shrink-0 flex flex-col items-center py-2 gap-1"
			style={{
				background: COLORS.bg.sidebar,
				borderRight: `1px solid ${COLORS.border.subtle}`,
			}}
		>
			<div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 mb-2" />
			{navItems.map((item, i) => (
				<div
					key={item.label}
					className="w-7 h-7 rounded-md flex items-center justify-center"
					style={{
						background: item.active
							? "oklch(0.35 0.15 250 / 0.3)"
							: "transparent",
						border: item.active
							? "1px solid oklch(0.50 0.15 250 / 0.5)"
							: "1px solid transparent",
					}}
				>
					<div
						className="w-3 h-3 rounded-sm"
						style={{
							background: item.active
								? COLORS.status.info
								: COLORS.text.tertiary,
						}}
					/>
				</div>
			))}
		</div>
	);
}

function Header() {
	return (
		<div style={{ borderBottom: `1px solid ${COLORS.border.default}` }}>
			<div className="flex items-center justify-between px-3 py-2">
				<div className="flex items-center gap-2">
					<Menu size={12} style={{ color: COLORS.text.secondary }} />
					<div
						className="w-px h-3"
						style={{ background: COLORS.border.default }}
					/>
					<div
						className="flex items-center gap-1 px-2 py-0.5 rounded text-[8px]"
						style={{
							background: COLORS.bg.secondary,
							color: COLORS.text.primary,
						}}
					>
						<span>Al Asla 29</span>
						<ChevronRight size={8} style={{ color: COLORS.text.tertiary }} />
					</div>
					<div
						className="flex items-center gap-1 px-2 py-0.5 rounded text-[8px]"
						style={{
							background: COLORS.bg.secondary,
							color: COLORS.text.tertiary,
						}}
					>
						<Search size={8} />
						<span>Search...</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<div
						className="flex items-center gap-1 px-2 py-0.5 rounded text-[8px]"
						style={{
							background: COLORS.bg.secondary,
							color: COLORS.text.secondary,
						}}
					>
						<Calendar size={8} />
						<span>Feb 5 - 11</span>
					</div>
					<Moon size={10} style={{ color: COLORS.text.tertiary }} />
				</div>
			</div>
			<div
				className="px-3 py-1 flex items-center gap-1 text-[7px]"
				style={{ borderTop: `1px solid ${COLORS.border.subtle}` }}
			>
				<span style={{ color: COLORS.text.tertiary }}>Dashboard</span>
				<ChevronRight size={8} style={{ color: COLORS.text.tertiary }} />
				<span style={{ color: COLORS.text.secondary }}>Overview</span>
			</div>
		</div>
	);
}

function MetricCard({
	label,
	period,
	value,
	change,
	trend,
	color,
}: {
	label: string;
	period: string;
	value: number;
	change: number;
	trend: "up" | "down" | "stable";
	color: string;
}) {
	const trendColor =
		trend === "up"
			? COLORS.status.success
			: trend === "down"
				? COLORS.status.error
				: COLORS.text.tertiary;
	const TrendIcon =
		trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;

	return (
		<div
			className="flex flex-col rounded-lg p-2 gap-0.5"
			style={{
				background: COLORS.bg.secondary,
				border: `1px solid ${COLORS.border.subtle}`,
			}}
		>
			<div className="flex items-center justify-between">
				<span className="text-[8px] font-semibold" style={{ color }}>
					{label}
				</span>
				<span className="text-[6px]" style={{ color: COLORS.text.tertiary }}>
					{period}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-baseline gap-0.5">
					<span className="text-sm font-bold" style={{ color }}>
						{value.toLocaleString()}
					</span>
					<span className="text-[6px]" style={{ color }}>
						TON
					</span>
				</div>
				<div
					className="flex items-center gap-0.5 px-1 py-0.5 rounded text-[6px] font-semibold"
					style={{
						background: `color-mix(in oklch, ${trendColor} 15%, transparent)`,
						color: trendColor,
					}}
				>
					<TrendIcon size={6} />
					<span>{Math.abs(change).toFixed(1)}%</span>
				</div>
			</div>
		</div>
	);
}

function InventoryGroupedBarChart() {
	const maxStock = Math.max(...MOCK_INVENTORY.map((m) => m.stock));

	return (
		<div
			className="flex flex-col gap-1.5 p-2 rounded-lg"
			style={{
				background: COLORS.bg.card,
				border: `1px solid ${COLORS.border.subtle}`,
			}}
		>
			<div className="flex items-center justify-between">
				<span
					className="text-[9px] font-semibold"
					style={{ color: COLORS.text.primary }}
				>
					Inventory Levels
				</span>
				<span className="text-[7px]" style={{ color: COLORS.text.tertiary }}>
					Stock / Produced / Dispatched
				</span>
			</div>
			<div className="flex gap-0.5 items-end h-20">
				{MOCK_INVENTORY.map((m) => {
					const stockH = (m.stock / maxStock) * 100;
					const prodH = (m.produced / maxStock) * 100;
					const dispH = (m.dispatched / maxStock) * 100;
					return (
						<div
							key={m.code}
							className="flex-1 flex flex-col items-center gap-0.5"
						>
							<div className="flex gap-px items-end w-full h-16">
								<div
									className="flex-1 rounded-t-sm"
									style={{ height: `${stockH}%`, background: m.color }}
								/>
								<div
									className="flex-1 rounded-t-sm"
									style={{
										height: `${prodH}%`,
										background: COLORS.status.success,
									}}
								/>
								<div
									className="flex-1 rounded-t-sm"
									style={{
										height: `${dispH}%`,
										background: COLORS.status.error,
									}}
								/>
							</div>
							<span
								className="text-[5px] font-medium"
								style={{ color: m.color }}
							>
								{m.code}
							</span>
						</div>
					);
				})}
			</div>
			<div className="flex justify-center gap-2">
				{[
					{ label: "Stock", color: COLORS.text.secondary },
					{ label: "Produced", color: COLORS.status.success },
					{ label: "Dispatched", color: COLORS.status.error },
				].map((item) => (
					<div key={item.label} className="flex items-center gap-0.5">
						<div
							className="w-1.5 h-1.5 rounded-sm"
							style={{ background: item.color }}
						/>
						<span className="text-[6px]" style={{ color: item.color }}>
							{item.label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

function StackedBarChart({
	title,
	subtitle,
	series,
}: {
	title: string;
	subtitle: string;
	series: Array<{ code: string; label: string; color: string; data: number[] }>;
}) {
	const maxTotal = Math.max(
		...MOCK_DAYS.map((_, i) => series.reduce((sum, s) => sum + s.data[i], 0)),
	);

	return (
		<div
			className="flex flex-col gap-1.5 p-2 rounded-lg"
			style={{
				background: COLORS.bg.card,
				border: `1px solid ${COLORS.border.subtle}`,
			}}
		>
			<div className="flex items-center justify-between">
				<span
					className="text-[9px] font-semibold"
					style={{ color: COLORS.text.primary }}
				>
					{title}
				</span>
				<span className="text-[7px]" style={{ color: COLORS.text.tertiary }}>
					{subtitle}
				</span>
			</div>
			<div className="flex gap-0.5 items-end h-14">
				{MOCK_DAYS.map((day, dayIndex) => {
					const total = series.reduce((sum, s) => sum + s.data[dayIndex], 0);
					const heightPercent = (total / maxTotal) * 100;
					return (
						<div
							key={day}
							className="flex-1 flex flex-col items-center gap-0.5"
						>
							<div
								className="w-full rounded-t-sm flex flex-col-reverse overflow-hidden"
								style={{ height: `${heightPercent}%`, minHeight: 4 }}
							>
								{series.map((s) => {
									const segmentPercent = (s.data[dayIndex] / total) * 100;
									return (
										<div
											key={s.code}
											style={{
												height: `${segmentPercent}%`,
												background: s.color,
												minHeight: 1,
											}}
										/>
									);
								})}
							</div>
							<span
								className="text-[5px]"
								style={{ color: COLORS.text.tertiary }}
							>
								{day}
							</span>
						</div>
					);
				})}
			</div>
			<div className="flex flex-wrap justify-center gap-1.5">
				{series.slice(0, 4).map((s) => (
					<div key={s.code} className="flex items-center gap-0.5">
						<div
							className="w-1 h-1 rounded-sm"
							style={{ background: s.color }}
						/>
						<span className="text-[5px]" style={{ color: s.color }}>
							{s.label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

function UtilizationRings() {
	const { equipment, manpower } = MOCK_UTILIZATION;

	const Ring = ({
		label,
		percentage,
		count,
		hours,
	}: {
		label: string;
		percentage: number;
		count: number;
		hours: number;
	}) => {
		const size = 36;
		const strokeWidth = 3;
		const radius = (size - strokeWidth) / 2;
		const circumference = 2 * Math.PI * radius;
		const offset = circumference - (percentage / 100) * circumference;
		const statusColor =
			percentage >= 80
				? COLORS.status.success
				: percentage >= 60
					? COLORS.status.warning
					: COLORS.status.error;

		return (
			<div className="flex flex-col items-center gap-0.5">
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
						<span
							className="text-[8px] font-bold"
							style={{ color: COLORS.text.primary }}
						>
							{percentage}%
						</span>
					</div>
				</div>
				<span
					className="text-[7px] font-medium"
					style={{ color: COLORS.text.primary }}
				>
					{label}
				</span>
				<span className="text-[5px]" style={{ color: COLORS.text.tertiary }}>
					{count} · {hours}h
				</span>
			</div>
		);
	};

	return (
		<div
			className="flex flex-col items-center justify-center gap-2 p-2 rounded-lg h-full"
			style={{
				background: COLORS.bg.card,
				border: `1px solid ${COLORS.border.subtle}`,
			}}
		>
			<span
				className="text-[8px] font-semibold"
				style={{ color: COLORS.text.primary }}
			>
				Utilization
			</span>
			<Ring
				label="Equipment"
				percentage={equipment.percentage}
				count={equipment.count}
				hours={equipment.hours}
			/>
			<div
				className="w-full h-px"
				style={{ background: COLORS.border.default }}
			/>
			<Ring
				label="Manpower"
				percentage={manpower.percentage}
				count={manpower.count}
				hours={manpower.hours}
			/>
		</div>
	);
}

function ProductionAreaLineChart() {
	const { actual, target } = MOCK_PRODUCTION_TREND;
	const max = Math.max(...actual, ...target);
	const min = Math.min(...actual, ...target) * 0.8;
	const range = max - min;
	const h = 56;
	const w = 100;

	const toY = (v: number) => h - ((v - min) / range) * h;
	const toX = (i: number) => (i / (actual.length - 1)) * w;

	const areaPath = `M0,${h} ${actual.map((v, i) => `L${toX(i)},${toY(v)}`).join(" ")} L${w},${h} Z`;
	const linePath = actual
		.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`)
		.join(" ");
	const targetPath = target
		.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`)
		.join(" ");

	return (
		<div
			className="flex flex-col gap-1 p-2 rounded-lg"
			style={{
				background: COLORS.bg.card,
				border: `1px solid ${COLORS.border.subtle}`,
			}}
		>
			<div className="flex items-center justify-between">
				<span
					className="text-[8px] font-semibold"
					style={{ color: COLORS.text.primary }}
				>
					Production vs Target
				</span>
			</div>
			<svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14">
				<defs>
					<linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
						<stop
							offset="0%"
							stopColor={COLORS.status.success}
							stopOpacity="0.3"
						/>
						<stop
							offset="100%"
							stopColor={COLORS.status.success}
							stopOpacity="0"
						/>
					</linearGradient>
				</defs>
				<path d={areaPath} fill="url(#prodGrad)" />
				<path
					d={targetPath}
					stroke={COLORS.status.warning}
					strokeWidth="1"
					strokeDasharray="3 2"
					fill="none"
					opacity="0.7"
				/>
				<path
					d={linePath}
					stroke={COLORS.status.success}
					strokeWidth="1.5"
					fill="none"
				/>
				{actual.map((v, i) => (
					<circle
						key={`dot-${i.toString()}`}
						cx={toX(i)}
						cy={toY(v)}
						r="2"
						fill={v >= target[i] ? COLORS.status.success : COLORS.status.error}
					/>
				))}
			</svg>
			<div className="flex justify-center gap-3">
				<div className="flex items-center gap-1">
					<div
						className="w-2 h-0.5 rounded"
						style={{ background: COLORS.status.success }}
					/>
					<span className="text-[6px]" style={{ color: COLORS.status.success }}>
						Actual
					</span>
				</div>
				<div className="flex items-center gap-1">
					<div
						className="w-2 h-0.5 rounded"
						style={{
							background: COLORS.status.warning,
							borderTop: "1px dashed",
						}}
					/>
					<span className="text-[6px]" style={{ color: COLORS.status.warning }}>
						Target
					</span>
				</div>
			</div>
		</div>
	);
}

function RecyclingDualAreaChart() {
	const { received, processed } = MOCK_RECYCLING;
	const max = Math.max(...received, ...processed);
	const min = Math.min(...received, ...processed) * 0.8;
	const range = max - min;
	const h = 56;
	const w = 100;

	const toY = (v: number) => h - ((v - min) / range) * h;
	const toX = (i: number) => (i / (received.length - 1)) * w;

	const recvArea = `M0,${h} ${received.map((v, i) => `L${toX(i)},${toY(v)}`).join(" ")} L${w},${h} Z`;
	const procArea = `M0,${h} ${processed.map((v, i) => `L${toX(i)},${toY(v)}`).join(" ")} L${w},${h} Z`;

	return (
		<div
			className="flex flex-col gap-1 p-2 rounded-lg"
			style={{
				background: COLORS.bg.card,
				border: `1px solid ${COLORS.border.subtle}`,
			}}
		>
			<div className="flex items-center justify-between">
				<span
					className="text-[8px] font-semibold"
					style={{ color: COLORS.text.primary }}
				>
					Recycling Efficiency
				</span>
			</div>
			<svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14">
				<defs>
					<linearGradient id="recvGrad" x1="0" y1="0" x2="0" y2="1">
						<stop
							offset="0%"
							stopColor={COLORS.status.info}
							stopOpacity="0.25"
						/>
						<stop
							offset="100%"
							stopColor={COLORS.status.info}
							stopOpacity="0.05"
						/>
					</linearGradient>
					<linearGradient id="procGrad" x1="0" y1="0" x2="0" y2="1">
						<stop
							offset="0%"
							stopColor={COLORS.status.success}
							stopOpacity="0.5"
						/>
						<stop
							offset="100%"
							stopColor={COLORS.status.success}
							stopOpacity="0.1"
						/>
					</linearGradient>
				</defs>
				<path d={recvArea} fill="url(#recvGrad)" />
				<path d={procArea} fill="url(#procGrad)" />
				<path
					d={received
						.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`)
						.join(" ")}
					stroke={COLORS.status.info}
					strokeWidth="1"
					fill="none"
				/>
				<path
					d={processed
						.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`)
						.join(" ")}
					stroke={COLORS.status.success}
					strokeWidth="1.5"
					fill="none"
				/>
			</svg>
			<div className="flex justify-center gap-3">
				<div className="flex items-center gap-1">
					<div
						className="w-1.5 h-1.5 rounded-sm"
						style={{ background: COLORS.status.info }}
					/>
					<span className="text-[6px]" style={{ color: COLORS.status.info }}>
						Received
					</span>
				</div>
				<div className="flex items-center gap-1">
					<div
						className="w-1.5 h-1.5 rounded-sm"
						style={{ background: COLORS.status.success }}
					/>
					<span className="text-[6px]" style={{ color: COLORS.status.success }}>
						Processed
					</span>
				</div>
			</div>
		</div>
	);
}

function MixingDonutChart() {
	const { cdw, raw } = MOCK_MIXING;
	const size = 56;
	const strokeWidth = 8;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const cdwOffset = circumference - (cdw / 100) * circumference;

	return (
		<div
			className="flex flex-col gap-1 p-2 rounded-lg"
			style={{
				background: COLORS.bg.card,
				border: `1px solid ${COLORS.border.subtle}`,
			}}
		>
			<div className="flex items-center justify-between">
				<span
					className="text-[8px] font-semibold"
					style={{ color: COLORS.text.primary }}
				>
					Mixing Ratio
				</span>
			</div>
			<div className="flex items-center justify-center">
				<div className="relative" style={{ width: size, height: size }}>
					<svg width={size} height={size} className="-rotate-90">
						<circle
							cx={size / 2}
							cy={size / 2}
							r={radius}
							stroke={COLORS.chart.raw}
							strokeWidth={strokeWidth}
							fill="transparent"
						/>
						<circle
							cx={size / 2}
							cy={size / 2}
							r={radius}
							stroke={COLORS.chart.cdw}
							strokeWidth={strokeWidth}
							fill="transparent"
							strokeDasharray={circumference}
							strokeDashoffset={cdwOffset}
							strokeLinecap="round"
						/>
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<span
							className="text-[10px] font-bold"
							style={{ color: COLORS.text.primary }}
						>
							{cdw}%
						</span>
						<span
							className="text-[5px]"
							style={{ color: COLORS.text.tertiary }}
						>
							CDW
						</span>
					</div>
				</div>
			</div>
			<div className="flex justify-center gap-2">
				<div className="flex items-center gap-0.5">
					<div
						className="w-1.5 h-1.5 rounded-full"
						style={{ background: COLORS.chart.cdw }}
					/>
					<span className="text-[6px]" style={{ color: COLORS.chart.cdw }}>
						CDW {cdw}%
					</span>
				</div>
				<div className="flex items-center gap-0.5">
					<div
						className="w-1.5 h-1.5 rounded-full"
						style={{ background: COLORS.chart.raw }}
					/>
					<span className="text-[6px]" style={{ color: COLORS.chart.raw }}>
						Raw {raw}%
					</span>
				</div>
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
			className={`flex rounded-xl overflow-hidden ${className}`}
			style={{
				background: COLORS.bg.primary,
				border: `1px solid ${COLORS.border.default}`,
				fontFamily: "system-ui, -apple-system, sans-serif",
			}}
		>
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content */}
			<div className="flex-1 flex flex-col min-w-0">
				{/* Header */}
				<Header />

				{/* Dashboard Content */}
				<div className="flex-1 p-2 flex flex-col gap-2 overflow-hidden">
					{/* Row 1: KPI Cards */}
					<div className="grid grid-cols-4 gap-1.5">
						{MOCK_KPI.map((kpi) => (
							<MetricCard key={kpi.label} {...kpi} />
						))}
					</div>

					{/* Row 2: Inventory Chart */}
					<InventoryGroupedBarChart />

					{/* Row 3: Manpower + Equipment + Utilization */}
					<div className="grid grid-cols-5 gap-1.5">
						<div className="col-span-2">
							<StackedBarChart
								title="Manpower"
								subtitle="Attendance"
								series={MOCK_MANPOWER_ROLES}
							/>
						</div>
						<div className="col-span-2">
							<StackedBarChart
								title="Equipment"
								subtitle="Hours"
								series={MOCK_EQUIPMENT}
							/>
						</div>
						<div className="col-span-1">
							<UtilizationRings />
						</div>
					</div>

					{/* Row 4: Production Charts */}
					<div className="grid grid-cols-3 gap-1.5">
						<ProductionAreaLineChart />
						<RecyclingDualAreaChart />
						<MixingDonutChart />
					</div>
				</div>
			</div>
		</div>
	);
}
