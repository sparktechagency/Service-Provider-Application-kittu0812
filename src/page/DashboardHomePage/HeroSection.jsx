import React from 'react';

const HeroSection = () => {
    return (
        <section id='home' className='relative my-10'>
            {/* Background Div */}
            <div className='absolute w-full h-[70vh] z-[1] rounded-xl bg-[#f3f5e9]'></div>

            {/* Content */}
            <div className="text-center py-20 z-[999] relative">
                <h2 className='text-5xl text-gray-600 font-bold'>Canada's Premier AI-Driven Service Platform</h2>
                <p className='text-xl my-5'>Experience the future of professional services with intelligent matching, augmented reality quoting, and guaranteed transparency.</p>
                {/* <button className='px-8 py-3 bg-[#ffff01] text-black rounded-lg'>Experience SureServ</button> */}
            </div>

            <div className="w-5/6 mx-auto z-[999] relative">
                <video className="rounded-xl w-full" controls autoPlay src="https://res.cloudinary.com/nerob/video/upload/v1756700080/sureserv-video_KpvBhmla_lpdn62.mp4"></video>
            </div>
        </section>
    );
}

export default HeroSection;
