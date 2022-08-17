import React from 'react';

function Content({ image }) {
    
    return (
        <>
            <div
                className="content-container"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '500px',
                    columnGap: '20px',
                    alignContent: 'center'
                }}
            >
                <div className="content-image-container">
                    <img
                        width='300px'
                        height='200px'
                        src={image}
                        alt='Screenshot of navigation bar'
                    />
                </div>
                <div
                    className="content-header-container"
                >
                    The following form will appear upon clicking the Add Protocol Button to allow creation of a new protocol document entry
                </div>
            </div>
        </>
    );
}

export default Content;