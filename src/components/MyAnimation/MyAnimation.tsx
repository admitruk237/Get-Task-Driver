import Lottie from 'lottie-react';
import React from 'react';
import animationData from '../../assets/animations/animation.json';

function MyAnimation() {
  return <Lottie animationData={animationData} loop={true} />;
}

export default MyAnimation;
