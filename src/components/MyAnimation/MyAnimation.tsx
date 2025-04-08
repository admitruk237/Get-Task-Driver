import Lottie from 'lottie-react';
import animationData from '../../assets/animations/animation.json';

function MyAnimation() {
  return <Lottie animationData={animationData} loop={true} />;
}

export default MyAnimation;
