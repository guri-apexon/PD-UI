import React from 'react';
import CarouselComp from './Carousel';
import Close from 'apollo-react-icons/Close';
import './GuidedTour.scss';

function GuidedTour({ cards, closeTourCallback }) {
    return (
        <div className="guided-tour-container">
            <div className="close-button-container">
                <button
                    className='close-button'
                    onClick={closeTourCallback}
                >
                    <Close style={{ color: 'white' }} />
                </button>
            </div>
            <CarouselComp cards={cards} closeTourCallback={closeTourCallback} />
        </div>
    );
}

export default GuidedTour;