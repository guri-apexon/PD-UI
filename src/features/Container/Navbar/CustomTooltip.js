import { useDispatch } from 'react-redux';
import Close from 'apollo-react-icons/Close';

function CustomTooltip({ step, tooltipProps }) {
    const dispatch = useDispatch();
    const closeTour = () => {
        dispatch({
            type: "SET_TOUR_ACTIVE",
            payload: false,
        });
    }

    return (
        <div
            className="tour-tooltip-container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
            {...tooltipProps}
        >
            <div className="tooltip-header-container">
                <button
                    data-testid="guided-tour-close-icon"
                    onClick={closeTour}
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.24)',
                        borderStyle: 'none',
                        float: 'right',
                        height: '25px',
                        width: '35px'
                    }}
                >
                    <Close style={{ color: 'white' }} />
                </button>
            </div>
            <div
                className="tooltip-body-container"
                style={{
                    color: 'white',
                    inlineSize: '300px',
                    fontSize: '18px',
                    overflowWrap: 'break-word',
                    hyphens: 'manual',
                    // backgroundColor: 'rgba(255, 255, 255, 0.24)'
                }}
            >
                {step.content}
            </div>
        </div>
    )
}

export default CustomTooltip;