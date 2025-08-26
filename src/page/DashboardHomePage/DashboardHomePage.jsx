import React from 'react';
import LandingPageHeader from '../../component/Main/DashboardLandingPage/LandingPageHeader';
import HeroSection from './HeroSection';

const DashboardHomePage = () => {
    return (
        <div className='lg:w-[80%] w-[90%] mx-auto'>
            <LandingPageHeader />
            <HeroSection />
        </div>
    );
}

export default DashboardHomePage;
