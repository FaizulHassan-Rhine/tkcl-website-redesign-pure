import CareerApplication from '@/components/Career/CareerApplication';
import CareerBenefits from '@/components/Career/CareerBenefits';
import CareerCulture from '@/components/Career/CareerCulture';
import CareerHero from '@/components/Career/CareerHero';
import CareerJobs from '@/components/Career/CareerJobs';
import FooterGrid from '@/components/FooterNew';
import React from 'react';

const page = () => {
    return (
        <div>
            <CareerHero/>
            <CareerJobs/>
            <CareerCulture/>
            <CareerBenefits/>
            <CareerApplication/>
            <FooterGrid/>

        </div>
    );
};

export default page;