import React, { useEffect, useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const LandingPageHeader = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { name: "Home", id: "home" },
        { name: "Services", id: "services" },
        { name: "How We Work", id: "howwework" },
        { name: "Why Choose Us", id: "whychooseus" },
        { name: "Testimonials", id: "testimonials" },
    ];

    // Intersection Observer for active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.6 } // 60% visible
        );

        navItems.forEach((item) => {
            const section = document.getElementById(item.id);
            if (section) observer.observe(section);
        });

        return () => {
            navItems.forEach((item) => {
                const section = document.getElementById(item.id);
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    return (
        <header className="w-full sticky top-0 left-0 z-[9999] rounded-lg shadow-md backdrop-blur-lg bg-[#ffffff49] border-2 border-[#ffff01] mt-2">
            <div className="mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="text-2xl font-bold text-[#ffff01] cursor-pointer">
                    <img className="w-14" src="/Page/logo.png" alt="Logo" />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8 font-medium text-base">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={() => setActiveSection(item.id)}
                            className={`pb-1 transition ${activeSection === item.id
                                ? "border-b-2 border-[#ffff01]"
                                : "text-gray-800"
                                }`}
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>

                {/* Admin Button */}
                <Link
                    to="/"
                    className="hidden md:flex ml-6 px-5 py-2 bg-[#ffff0138] items-center gap-2 text-black border border-[#ffff01] hover:bg-[#ffff01] rounded-lg shadow transition"
                >
                    <CiPlay1 /> Admin Dashboard
                </Link>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-2xl text-gray-800"
                    >
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#ffffffcc] border-t border-[#ffff01] backdrop-blur-lg shadow-lg">
                    <nav className="flex flex-col items-center py-4 space-y-4 text-lg font-medium">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={() => {
                                    setActiveSection(item.id);
                                    setMenuOpen(false); // Close menu on click
                                }}
                                className={`transition ${activeSection === item.id
                                    ? "text-[#ffff01]"
                                    : "text-gray-800"
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}
                        <Link
                            to="/"
                            className="px-5 py-2 bg-[#ffff0138] flex items-center gap-2 text-black border border-[#ffff01] hover:bg-[#ffff01] rounded-lg shadow transition"
                            onClick={() => setMenuOpen(false)} // Close menu
                        >
                            <CiPlay1 /> Admin Dashboard
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default LandingPageHeader;
