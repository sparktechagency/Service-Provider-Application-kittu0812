const HeroSection = () => {
    return (
        <section id='home' className='relative my-10'>
            {/* Background Div */}
            <div className='absolute w-full md:h-[70vh] h-full z-[1] rounded-xl bg-[#f3f5e9]'></div>

            {/* Content */}
            <div className="text-center pt-20 pb-10 z-[999] relative px-5">
                <h2 className='md:text-5xl text-3xl text-gray-600 font-bold'>Canada's Premier AI-Driven Service Platform</h2>
                <p className='md:text-xl my-5'>Experience the future of professional services with intelligent matching, augmented reality quoting, and guaranteed transparency.</p>
                {/* <button className='px-8 py-3 bg-[#ffff01] text-black rounded-lg'>Experience SureServ</button> */}
            </div>

            <div className="md:w-5/6 mx-auto z-[999] relative">
                <video className="rounded-xl w-full" controls autoPlay src="https://res.cloudinary.com/nerob/video/upload/v1756700080/sureserv-video_KpvBhmla_lpdn62.mp4"></video>
            </div>
        </section>
    );
}

export default HeroSection;