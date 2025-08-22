import CareerApplication from '@/components/Career/CareerApplication';
import CareerBenefits from '@/components/Career/CareerBenefits';
import CareerCulture from '@/components/Career/CareerCulture';
import CareerHero from '@/components/Career/CareerHero';
import CareerJobs from '@/components/Career/CareerJobs';
import FooterGrid from '@/components/FooterNew';
import React from 'react';
import { metadata as pageMeta } from '@/seo/metadatas';

export const metadata = {
  title: pageMeta.career.title,
  description: pageMeta.career.description,
  alternates: {
    canonical: pageMeta.career.link,
  },
};

const page = () => {
    return (
        <div>
            {/* <CareerHero/> */}
            <CareerJobs/>
            {/* <CareerCulture/>
            <CareerBenefits/>
            <CareerApplication/> */}
            <FooterGrid/>

        </div>
    );
};

export default page;