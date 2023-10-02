import Rectanglee from '../../assets/Rectanglee.png';
import googleicon from '../../assets/googleicon.png';
import cross from '../../assets/cross.png';
import church_logo from '../../assets/church_logo.png';
import church_logo_origianl from '../../assets/church_logo_origianl.png';
import dailyVerbsBanner from '../../assets/dailyVerbsBanner.jpg';
import SignIn from '../../assets/signIn.png';
import SignUp from '../../assets/signUp.png';
//Loader Animations

import WaveAnimation from "../../assets/animationLoader/wave-animation.json"

//Resources images
import missionary from '../../assets/resources/missionary.jpg';
import theology from '../../assets/resources/theology.png';
import gotquestion from '../../assets/resources/gotquestion.png';
import unity from '../../assets/resources/unity.png';
import ebook from '../../assets/resources/ebook.png';

const resourcesImages = {
missionary,
theology,
gotquestion,
unity,
ebook

};

const authIcons = {
  SignIn,
  SignUp,
  Rectanglee,
  googleicon,
  WaveAnimation,
};
const homeIcons = {
  church_logo_origianl,
  cross,
  church_logo,
  dailyVerbsBanner
};
export default assets = {
  ...authIcons,
  ...homeIcons,
  ...resourcesImages
};
