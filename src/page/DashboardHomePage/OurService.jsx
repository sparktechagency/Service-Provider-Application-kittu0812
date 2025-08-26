import React, { useState } from 'react';

const OurService = () => {
    const [activeTab, setActiveTab] = useState('interior'); // Default tab

    // Content for each service category
    const serviceContent = {
        interior: "Interior services include design, renovation, and more.",
        outdoor: "Outdoor services cover landscaping, garden design, and maintenance.",
        setup: "Setup services include installation of appliances, furniture, and more.",
        repair: "Repair services for all kinds of home and office repairs.",
        cleaning: "Cleaning services ranging from regular house cleaning to deep cleaning.",
        occasional: "Occasional services include special event setups and other one-time services."
    };

    return (
        <section id='services' className='py-10 md:py-20'>
            <div className='text-center mb-5'>
                <h2 className='text-4xl mb-3 font-bold'>Explore Our Service Categories</h2>
                <p>Explore top-tier services across multiple categories, delivered by professionals at the top of their field.</p>
            </div>

            {/* Tab buttons */}
            <div className="flex justify-center flex-wrap mb-5">
                <button
                    className={`px-4 py-2 m-2 rounded-t-xl ${activeTab === 'interior' ? 'bg-[#ffff01] text-black border border-red-500' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('interior')}
                >
                    Interior Services
                </button>
                <button
                    className={`px-4 py-2 m-2 rounded-t-xl ${activeTab === 'outdoor' ? 'bg-[#ffff01] text-black border border-red-500' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('outdoor')}
                >
                    Outdoor Services
                </button>
                <button
                    className={`px-4 py-2 m-2 rounded-t-xl ${activeTab === 'setup' ? 'bg-[#ffff01] text-black border border-red-500' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('setup')}
                >
                    Setup Services
                </button>
                <button
                    className={`px-4 py-2 m-2 rounded-t-xl ${activeTab === 'repair' ? 'bg-[#ffff01] text-black border border-red-500' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('repair')}
                >
                    Repair Services
                </button>
                <button
                    className={`px-4 py-2 m-2 rounded-t-xl ${activeTab === 'cleaning' ? 'bg-[#ffff01] text-black border border-red-500' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('cleaning')}
                >
                    Cleaning Services
                </button>
                <button
                    className={`px-4 py-2 m-2 rounded-t-xl ${activeTab === 'occasional' ? 'bg-[#ffff01] text-black border border-red-500' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('occasional')}
                >
                    Occasional Services
                </button>
            </div>

            {/* Display content based on active tab */}
            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div>
                    <img className='rounded-xl' src="https://scoutnetworkblog.com/wp-content/uploads/2018/11/Plumber-Sink-201709-003.jpg" alt="" />
                </div>
                <div className='flex items-center flex-wrap gap-5'>
                    {
                        [...Array(30)].map((_, index) => (
                            <button key={index} className='ml-2 px-3 py-1 border-[#ffff01] border-2 rounded-lg text-black bg-white'>Interior Services  {index + 1}</button>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default OurService;
