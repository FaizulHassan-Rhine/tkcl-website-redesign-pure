import React from 'react';
import TopPart2dPortfolio from './TopPart2dPortfolio';
import AboutUs from './AboutUs';

import OurService2DPortfolio from './OurService2DPortfolio';
import ImageTransition from './ImageTransition';
import RetouchingService from './RetouchingService';
import AmbienceEnhance from './AmbienceEnhance';
import GhostMannequin from './GhostMannequin';
import Retouched from './Retouched';
import RetouchingTest from './RetouchingTest';
import GhostTest from './GhostMannequinOld';
import VideoSection from './VideoSection';


const BodyContent = () => {
    return (
        <div className="flex flex-col ">
            <TopPart2dPortfolio />
            <AboutUs/>
            <OurService2DPortfolio />
            
            <RetouchingService/>
            {/* <RetouchingTest/> */}
            <AmbienceEnhance/>
            <GhostMannequin/>
            <VideoSection/>
            <Retouched/>
           

           
            {/*start === for testing after before testing */}
            {/* <div className="lg:py-[60px] lg:px-32">
                <ImageTransition 
                    afterimg={"./img/2D-Microsite/transitionImage/after-BB480LBB_260.webp"} 
                    beforeimg={"./img/2D-Microsite/transitionImage/before-BB480LBB_260.webp"} />
            </div> */}
            {/* end === for testing after before testing*/}


        </div>
    );
};

export default BodyContent;