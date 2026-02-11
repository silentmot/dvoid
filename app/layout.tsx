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
		default: "DvoiD | Technical Operations Specialist",
		template: "%s | DvoiD",
	},
	description:
		"Technical Operations Specialist in industrial IoT systems. Architecting smart waste management solutions through modern web technologies.",
	keywords: [
		"Technical Operations",
		"Industrial IoT",
		"Smart Waste Management",
		"NestJS",
		"Next.js",
		"Full Stack Developer",
		"Backend Developer",
	],
	authors: [{ name: "DvoiD" }],
	creator: "DvoiD",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://d-void.com",
		siteName: "DvoiD",
		title: "DvoiD | Technical Operations Specialist",
		description:
			"Technical Operations Specialist in industrial IoT systems. Architecting smart waste management solutions.",
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
		title: "DvoiD | Technical Operations Specialist",
		description: "Technical Operations Specialist in industrial IoT systems.",
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
