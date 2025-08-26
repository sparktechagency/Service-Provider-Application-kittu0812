import React from 'react';
import LandingPageHeader from '../../component/Main/DashboardLandingPage/LandingPageHeader';
import HeroSection from './HeroSection';
import OurService from './OurService';
import HowitWork from './HowitWork';

const DashboardHomePage = () => {
    return (
        <div className='lg:w-[80%] w-[90%] mx-auto'>
            <LandingPageHeader />
            <HeroSection />
            <OurService />
            <HowitWork />
            <div className='h-[100vh]'>

            </div>
        </div>
    );
}

export default DashboardHomePage;
