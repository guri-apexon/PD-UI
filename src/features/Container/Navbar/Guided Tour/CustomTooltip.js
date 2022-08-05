
function CustomTooltip({ step, tooltipProps }) {

    return (
        <div
            className="tooltip-container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
            {...tooltipProps}
        >
            <div
                className="tooltip-content-container"
                style={{
                    textAlign: 'center',
                    color: 'white',
                    inlineSize: '250px',
                    fontSize: '16px',
                    overflowWrap: 'normal',
                    fontFamily: 'Gill Sans, sans-serif',
                    lineHeight: '1.5',
                    letterSpacing: '1px',
                }}
            >
                {step.content}
            </div>
        </div>
    )
}

export default CustomTooltip;