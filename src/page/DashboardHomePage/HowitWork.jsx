import React from 'react';

const HowitWork = () => {
    return (
        <section id='howwework' className='py-10 md:py-20 grid md:grid-cols-2 gap-6 items-center '>
            <div>
                <h2 className='text-3xl font-semibold mb-3'>Step-by-Step Guide On How We Work</h2>
                <p>Guiding you through each step, ensuring precision, transparency, and exceptional service.</p>
                <img className='max-w-[500px] mt-10 h-auto' src="/Page/how-it-workl.png" alt="" />
            </div>
            <div className='space-y-3 relative'>
                <div className='bg-white border-2 sticky top-0 border-[#ffff01] px-5 py-10 rounded-lg '>
                    <span className='!h-10 !w-10 flex items-center justify-center text-xl font-semibold bg-[#ffff01] rounded'>1</span>
                    <h2 className='text-3xl font-semibold my-3'>Choose your service</h2>
                    <p>Browse categories like Indoor, Outdoor, Repair, Cleaning, Occasional, Setup directly from the home screen.</p>
                </div>
                <div className='bg-white border-2  sticky top-0 border-[#ffff01] px-5 py-10 rounded-lg '>
                    <span className='!h-10 !w-10 flex items-center justify-center text-xl font-semibold bg-[#ffff01] rounded'>1</span>
                    <h2 className='text-3xl font-semibold my-3'>Choose your service</h2>
                    <p>Browse categories like Indoor, Outdoor, Repair, Cleaning, Occasional, Setup directly from the home screen.</p>
                </div>
                <div className='bg-white border-2  sticky top-0 border-[#ffff01] px-5 py-10 rounded-lg '>
                    <span className='!h-10 !w-10 flex items-center justify-center text-xl font-semibold bg-[#ffff01] rounded'>1</span>
                    <h2 className='text-3xl font-semibold my-3'>Choose your service</h2>
                    <p>Browse categories like Indoor, Outdoor, Repair, Cleaning, Occasional, Setup directly from the home screen.</p>
                </div>
                <div className='bg-white border-2  sticky top-0 border-[#ffff01] px-5 py-10 rounded-lg '>
                    <span className='!h-10 !w-10 flex items-center justify-center text-xl font-semibold bg-[#ffff01] rounded'>1</span>
                    <h2 className='text-3xl font-semibold my-3'>Choose your service</h2>
                    <p>Browse categories like Indoor, Outdoor, Repair, Cleaning, Occasional, Setup directly from the home screen.</p>
                </div>
            </div>
        </section>
    );
}

export default HowitWork;
