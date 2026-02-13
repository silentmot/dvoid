"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC, useEffect, useState } from "react";

interface NavItem {
	href: string;
	label: string;
}

const NAV_ITEMS: NavItem[] = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/projects", label: "Projects" },
	{ href: "/case-studies", label: "Case Studies" },
	{ href: "/uses", label: "Uses" },
	{ href: "/contact", label: "Contact" },
];

const Navigation: FC = () => {
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, []);

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? "bg-background/80 backdrop-blur-md border-b border-border/50"
						: "bg-transparent"
				}`}
			>
				<nav className="mx-auto max-w-6xl px-6 py-4">
					<div className="flex items-center justify-between">
						{/* Logo */}
						<Link
							href="/"
							className="text-xl font-bold tracking-tighter text-foreground hover:text-primary transition-colors"
						>
							VoiD Tech
						</Link>

						{/* Desktop Navigation */}
						<ul className="hidden md:flex items-center gap-8">
							{NAV_ITEMS.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className={`text-sm font-medium transition-colors ${
											pathname === item.href
												? "text-primary"
												: "text-muted-foreground hover:text-foreground"
										}`}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>

						{/* Mobile Menu Button */}
						<button
							type="button"
							className="md:hidden p-2 text-foreground"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								{isMobileMenuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>
					</div>
				</nav>
			</header>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden pt-20"
					>
						<nav className="px-6 py-8">
							<ul className="space-y-6">
								{NAV_ITEMS.map((item, index) => (
									<motion.li
										key={item.href}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.05 }}
									>
										<Link
											href={item.href}
											className={`block text-2xl font-medium ${
												pathname === item.href
													? "text-primary"
													: "text-foreground"
											}`}
										>
											{item.label}
										</Link>
									</motion.li>
								))}
							</ul>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Navigation;
