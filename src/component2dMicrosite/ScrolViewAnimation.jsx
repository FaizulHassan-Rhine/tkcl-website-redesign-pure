import React, { useEffect, useRef, useState } from 'react';

const ScrolViewAnimation = ({ children, className }) => {
    const [getBoxOneValue, setBoxOneValue] = useState(0);
    const boxRef = useRef(null);

    const checkEvenOdd = (number) => {
        if (number % 2 === 0) {
            //   console.log(number + " is even.");
            return true;
        } else {
            //   console.log(number + " is odd.");
            return false;
        }
    }

    const intialLoad = () => {
        const box_one_par = boxRef.current;
        if (!box_one_par) return; // Check if the box is defined


        let childHeight = 0;

        for (let index = 0; index < box_one_par.children.length; index++) {
            const isEven = checkEvenOdd(index);
            console.log("isEven", isEven);
            // console.log("thank you"); 
            if (index !== 0) {
                if (!isEven) {
                    box_one_par.children[index].style.transform = `translateX(${box_one_par.children[index].clientWidth + "px"})`;
                    box_one_par.children[index].classList.add('box_odd');
                } else {
                    box_one_par.children[index].style.transform = `translateY(${box_one_par.children[index].clientHeight + "px"})`;
                    box_one_par.children[index].classList.add('box_even');
                }

            }
            childHeight += box_one_par.children[index].clientHeight
        }

        box_one_par.style.height = `${childHeight}px`;

    }

    useEffect(() => {
        intialLoad();
    }, [])

    let parrentPos = 0;


    const scrollAction = () => {
        const box_one_par = boxRef.current;
        if (!box_one_par) return; // Check if the box is defined

        // const box_one_par = document.querySelector(`#box_two`);
        const windowHeight = window.innerHeight;
        const elementTop = box_one_par.getBoundingClientRect().top;
        setBoxOneValue(elementTop);
        const currentScrollParrentPos = window.scrollY - parrentPos;

        console.log(
            "window hegith ", windowHeight,
            "visible", elementTop,
            "scroll pos", window.scrollY,
            "parrentPos", parrentPos,
            "parrent height", box_one_par.clientHeight,
            "child count", box_one_par.childElementCount,
            "current posstion", currentScrollParrentPos
        );


        // if (elementTop < windowHeight - offset) {
        if (elementTop < windowHeight) {
            console.log("visible", elementTop);

            if (parrentPos == 0) {
                parrentPos = window.scrollY;
            }

            const childNumber = Math.ceil((
                (box_one_par.childElementCount / box_one_par.clientHeight)
                * currentScrollParrentPos)) - 1;

            if (true) {

                console.log("current child : ", childNumber);
                const isEven = checkEvenOdd(childNumber);

                if (!isEven) {
                    const childHegiht = box_one_par.clientHeight / box_one_par.childElementCount;
                    const currentChildPos = currentScrollParrentPos / childNumber;
                    console.log("childHeight: ", childHegiht,
                        "child_no: ", childNumber,
                        " persentise : ", 100 - Math.abs((100 - ((currentChildPos / childHegiht) * 100))));
                    if (box_one_par.childElementCount > childNumber && childNumber > -1) {
                        const movePersentise = 100 - Math.abs((100 - ((currentChildPos / childHegiht) * 100)))
                        box_one_par.children[childNumber].style.transform = `translateX(${movePersentise < 80 ? 0 : 100 + "%"})`
                    }
                } else {
                    const childHegiht = box_one_par.clientHeight / box_one_par.childElementCount;
                    const currentChildPos = currentScrollParrentPos / childNumber;
                    if (box_one_par.childElementCount > childNumber && childNumber > -1) {
                        const movePersentise = 100 - Math.abs((100 - ((currentChildPos / childHegiht) * 100)))
                        console.log("movePersentise", movePersentise);
                        box_one_par.children[childNumber].style.transform = `translateY(${movePersentise < 80 ? 0 : box_one_par.children[childNumber].clientHeight + "px"})`
                    }
                }
            }
        }

    }

    useEffect(() => {

        window.addEventListener('scroll', scrollAction);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', scrollAction);
            // document.body.style.overflow = 'auto';
        };
    }, []);

    const heightPersentise = () => {
        return (getBoxOneValue / window.innerHeight) * 100
    }

    return (
        <>
            <div ref={boxRef} className={'sticky top-0 origin-top overflow-hidden ' + className}>
                {children}
            </div>

        </>
    );
};



export default ScrolViewAnimation;