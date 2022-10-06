import React from 'react';
import CarouselComp from './Carousel';
import Close from 'apollo-react-icons/Close';
import './GuidedTour.scss';

/* import Joyride from './index';
import CustomTooltip from './Tooltip/CustomTooltip';
import { steps } from './SearchSteps'; */

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
            {/* <Joyride 
                tooltipComponent={CustomTooltip}
                steps={steps}
                floaterProps={{
                    hideArrow: true
                }}
            /> */}
            <CarouselComp cards={cards} closeTourCallback={closeTourCallback} />
        </div>
    );
}

export default GuidedTour;