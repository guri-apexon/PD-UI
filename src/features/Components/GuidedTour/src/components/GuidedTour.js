import React from 'react';
import { useDispatch } from "react-redux";

// import Joyride, { STATUS } from 'react-joyride'
// import Joyride, { STATUS } from './react-joyride/es/index';
// import Joyride, { STATUS } from '../../../Components/GuidedTour/src/index';
import Joyride, { STATUS } from '../index';
import CustomTooltip from './Tooltip/CustomTooltip';

import { steps } from './Steps';
import "./GuidedTour.scss";

function GuidedTour() {

    const dispatch = useDispatch();

    const closeTour = () => {
        dispatch({
            type: "SET_TOUR_ACTIVE",
            payload: false,
        })
    }


    const tourCompletionCallback = (data) => {
        const { status } = data;
        const finishedStatuses = [STATUS.FINISHED];

        if (finishedStatuses.includes(status)) {
            dispatch({
                type: "SET_TOUR_ACTIVE",
                payload: false,
            });
        }
    }

    return (
        <>
            <Joyride
                steps={steps}
                tooltipComponent={CustomTooltip}
                callback={tourCompletionCallback}
                closeTourHandler={closeTour}
            />
        </>

    );
}

export default GuidedTour;