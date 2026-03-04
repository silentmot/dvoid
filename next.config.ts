import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const cspDirectives = [
	"default-src 'self'",
	"base-uri 'none'",
	"frame-ancestors 'none'",
	"object-src 'none'",
	"form-action 'self'",
	"script-src 'self' 'unsafe-inline'",
	"script-src-attr 'none'",
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: blob:",
	"font-src 'self'",
	"connect-src 'self' https:",
	"upgrade-insecure-requests",
];

const cspValue = cspDirectives.join("; ");
const cspReportOnlyEnabled = process.env.CSP_REPORT_ONLY === "true";
const cspReportEndpoint = process.env.CSP_REPORT_ENDPOINT;

const securityHeaders = [
	{
		key: cspReportOnlyEnabled
			? "Content-Security-Policy-Report-Only"
			: "Content-Security-Policy",
		value:
			cspReportOnlyEnabled && cspReportEndpoint
				? `${cspValue}; report-uri ${cspReportEndpoint}; report-to csp-endpoint`
				: cspValue,
	},
	...(cspReportOnlyEnabled && cspReportEndpoint
		? [
				{
					key: "Reporting-Endpoints",
					value: `csp-endpoint=\"${cspReportEndpoint}\"`,
				},
			]
		: []),
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	{
		// Kept for browsers that do not support CSP frame-ancestors
		key: "X-Frame-Options",
		value: "DENY",
	},
	{
		key: "X-XSS-Protection",
		value: "0",
	},
	{
		key: "Referrer-Policy",
		value: "strict-origin-when-cross-origin",
	},
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=()",
	},
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
];

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	experimental: {
		mdxRs: true,
	},
	images: {
		remotePatterns: [],
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
		];
	},
};

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
