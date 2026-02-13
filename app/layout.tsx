import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Navigation from "@/components/layout/navigation";
import SmoothScrollProvider from "@/components/layout/smooth-scroll-provider";

const geistSans = Geist({
	variable: "--font-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://d-void.com"),
	title: {
		default: "DvoiD | System Architect",
		template: "%s | DvoiD",
	},
	description:
		"System Architect specializing in industrial IoT integration. Designing event-driven platforms where device signals become operational truth.",
	keywords: [
		"System Architect",
		"Industrial IoT",
		"Smart Waste Management",
		".NET Core",
		"Temporal.io",
		"Event-Driven Architecture",
		"Device Integration",
	],
	authors: [{ name: "DvoiD" }],
	creator: "DvoiD",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://d-void.com",
		siteName: "DvoiD",
		title: "DvoiD | System Architect",
		description:
			"System Architect specializing in industrial IoT integration. Where device signals become operational truth.",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "DvoiD Portfolio",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "DvoiD | System Architect",
		description: "System Architect specializing in industrial IoT integration.",
		images: ["/og-image.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
				suppressHydrationWarning
			>
				<SmoothScrollProvider>
					<Navigation />
					<main className="min-h-screen">{children}</main>
					<Footer />
				</SmoothScrollProvider>
			</body>
		</html>
	);
}
