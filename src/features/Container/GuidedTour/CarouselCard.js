import React from 'react';

function CarouselCard({ image }) {
    return (
        <div className='image-container'>
            <img
                src={image}
                alt="Tour screen"
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            />
        </ div>
    );
}

export default CarouselCard;