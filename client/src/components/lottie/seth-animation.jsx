import React from 'react';

const SethAnimation = ({jsonSrc, lottieStyle, speed}) => {
    return (

        <lottie-player src={jsonSrc} background="transparent" speed={speed} style = {lottieStyle} loop  autoplay></lottie-player>
    );
}

export default SethAnimation;
