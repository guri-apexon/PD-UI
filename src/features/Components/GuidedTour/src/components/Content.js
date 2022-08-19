import React from 'react';

function Content({content, image, containerWidth, containerGap, imageWidth, imageHeight }) {
    
    return (
        <>
            <div
                className="content-container"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: containerWidth,
                    columnGap: containerGap,
                    alignContent: 'center'
                }}
            >
                <div className="content-image-container">
                    <img
                        width={imageWidth}
                        height={imageHeight}
                        src={image}
                        alt='Content screenshot'
                    />
                </div>
                <div className="content-header-container">
                    {content}
                </div>
            </div>
        </>
    );
}

export default Content;