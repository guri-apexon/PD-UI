import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper';

import "swiper/css/bundle";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";


const CarouselComp = ({ cards, closeTourCallback }) => {

    const [reachedEnd, setReachedEnd] = useState(false);

    const handleReachedEnd = () => {
        setReachedEnd(true);
    }

    return (
        <>
            <Swiper
                spaceBetween={30}
                effect={"fade"}
                navigation={{
                    nextEl: '.next',
                    prevEl: 'swiper-button-disabled',

                }}
                modules={[EffectFade, Navigation]}
                className="mySwiper"
                onReachEnd={() => handleReachedEnd()}
                onClick={() => {
                    if (reachedEnd === true)
                        closeTourCallback();
                }}
            >
                {cards.map((card) => {
                    return (<SwiperSlide className='next'>{card}</SwiperSlide>)
                })}
            </Swiper>
        </>
    )
}

export default CarouselComp;