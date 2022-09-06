import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper';

import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/effect-fade/effect-fade.min.css';

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