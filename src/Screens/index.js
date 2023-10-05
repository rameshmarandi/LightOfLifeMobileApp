// // ============= Auth Module ==================
import  Registration from './Admin/Auth/Registration';
import  Login from './Admin/Auth/Login';
import  ForgotPassword from './Admin/Auth/ForgotPassword';
import  ChangePassword from './Admin/Auth/ChangePassword';

import CProfile from './Client/CProfile';
import DrawerItem from './Client/Drawer/DrawerItem';
import Events from './Client/Events';
import FreeResource from './Client/FreeResource';
import HomePage from './Client/Home/HomePage';
import ContactWithUs from './Client/Support/ContactWithUs';
import Feedback from './Client/Support/Feedback';

const ClientScreen = {
  CProfile,
  HomePage,
  DrawerItem,

  FreeResource,
  Events,
  ContactWithUs,
  Feedback,
    
 
};

const AdminScreens = {
  Login ,
  Registration,
ForgotPassword , 
ChangePassword

}
export default AllScreens = {
  ...ClientScreen,
  ...AdminScreens
};



// export {default as MyProfile} from './Admin/Profile/MyProfile';
// export {default as Setting} from './Admin/Setting/Setting';
// export {default as AddProduct} from './Admin/Products/AddProduct';
// export {default as MyCards} from './Admin/Products/MyCards';
// export {default as MyInsights} from './Admin/Products/MyInsights';