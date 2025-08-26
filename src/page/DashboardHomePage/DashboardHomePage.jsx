import React from 'react';
import LandingPageHeader from '../../component/Main/DashboardLandingPage/LandingPageHeader';
import HeroSection from './HeroSection';
import OurService from './OurService';
import HowitWork from './HowitWork';
import Whychooseus from './Whychooseus';
import Testimonials from './Testimonials';
import Footer from './Footer';

const DashboardHomePage = () => {
    return (
        <div>
            <div className='lg:w-[80%] w-[90%] mx-auto'>
                <LandingPageHeader />
                <HeroSection />
                <OurService />
                <HowitWork />
                <Whychooseus />
                <Testimonials />
            </div>
            <Footer />
        </div>
    );
}

export default DashboardHomePage;
