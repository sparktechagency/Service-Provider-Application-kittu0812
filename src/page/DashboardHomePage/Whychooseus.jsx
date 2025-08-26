import React from 'react';

const Whychooseus = () => {
    return (
        <section id='whychooseus' className='py-10 md:py-20'>
            <div className='text-center'>
                <h2 className='text-3xl font-semibold mb-3'>Why Choose Us </h2>
                <p>SureServ guarantees reliability, clarity, and innovation and it unlocks exclusive access to premium clientele and next-generation business tools.</p>
            </div>
            <div className='grid lg:grid-cols-3 gap-6 items-center mt-10'>
                <div className='space-y-4'>
                    <div className='bg-white p-4 rounded-lg '>
                        <img className='w-12 rounded-xl' src="/Page/whyChooseus1.png" alt="" />
                        <h2 className='text-2xl font-semibold my-2'>Elite Provider Network</h2>
                        <p>Direct access to the top 10% of professionals, rigorously vetted for excellence.</p>
                    </div>
                    <div className='bg-white p-4 rounded-lg '>
                        <img className='w-12 rounded-xl' src="/Page/investment.png" alt="" />
                        <h2 className='text-2xl font-semibold my-2'>Elite Provider Network</h2>
                        <p>Direct access to the top 10% of professionals, rigorously vetted for excellence.</p>
                    </div>
                    <div className='bg-white p-4 rounded-lg '>
                        <img className='w-12 rounded-xl' src="/Page/Innovation.png" alt="" />
                        <h2 className='text-2xl font-semibold my-2'>Elite Provider Network</h2>
                        <p>Direct access to the top 10% of professionals, rigorously vetted for excellence.</p>
                    </div>
                </div>
                <div>
                    <img className='max-w-[350px] mx-auto' src="/Page/whyChooseus.png" alt="" />
                </div>
                <div className='space-y-4'>
                    <div className='bg-white p-4 rounded-lg '>
                        <img className='w-12 rounded-xl' src="/Page/excellence.png" alt="" />
                        <h2 className='text-2xl font-semibold my-2'>Elite Provider Network</h2>
                        <p>Direct access to the top 10% of professionals, rigorously vetted for excellence.</p>
                    </div>
                    <div className='bg-white p-4 rounded-lg '>
                        <img className='w-12 rounded-xl' src="/Page/leadership.png" alt="" />
                        <h2 className='text-2xl font-semibold my-2'>Elite Provider Network</h2>
                        <p>Direct access to the top 10% of professionals, rigorously vetted for excellence.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Whychooseus;
