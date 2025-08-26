import React from 'react';

const HeroSection = () => {
    return (
        <section id='home' className='grid grid-cols-1 lg:grid-cols-2 items-center py-10 md:py-20'>
            <div>
                <h2 className='text-5xl text-gray-600 font-bold'>Canada's Premier AI-Driven Service Platform</h2>
                <p className='text-xl my-5'>Experience the future of professional services with intelligent matching, augmented reality quoting, and guaranteed transparency.</p>
                <button className='px-8 py-3 bg-[#ffff01] text-black rounded-lg'>Experience SureServ</button>
            </div>
            <div>
                <img src="/Page/hero.png" alt="" />
            </div>
        </section>
    );
}

export default HeroSection;
