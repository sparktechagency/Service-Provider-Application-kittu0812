import React, { useEffect, useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { Link } from "react-router-dom";

const LandingPageHeader = () => {
    const [activeSection, setActiveSection] = useState("home");
    console.log(activeSection);

    const navItems = [
        { name: "Home", id: "home" },
        { name: "Services", id: "services" },
        { name: "How We Work", id: "howwework" },
        { name: "Why Choose Us", id: "whychooseus" },
        { name: "Testimonials", id: "testimonials" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.6 } // 60% of section visible = active
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
        <header className="w-full rounded-lg sticky shadow-md bg-[#ffffff49] border-2 border-[#ffff01] mt-2 top-0 left-0 z-50">
            <div className="mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="text-2xl font-bold text-[#ffff01] cursor-pointer">
                    LOGO
                </div>

                {/* Navigation */}
                <nav className="hidden text-base md:flex space-x-8 font-medium">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={() => setActiveSection(item.id)}
                            className={`pb-1 transition ${activeSection === item.id
                                    ? " border-b-2 border-[#ffff01]"
                                    : "text-gray-800 "
                                }`}
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>

                {/* Button */}
                <Link
                    to={"/admin"}
                    className="ml-6 px-5 py-2 bg-[#ffff0138] flex items-center gap-2 text-black border border-[#ffff01] hover:bg-[#ffff01] rounded-lg shadow transition"
                >
                    <CiPlay1 /> Admin Dashboard
                </Link>
            </div>
        </header>
    );
};

export default LandingPageHeader;
