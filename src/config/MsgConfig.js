
const DrawerMenu = {
  home:"Home",
  myProfile :"My Profile",
  freeResource:"Free Resources",
  prayerRequest:"Prayer Request",
  event:"Events",
  contactWithUs:"Contact With Us",
  feedBack:
  // 'ମତାମତ',
  // 'प्रतिक्रिया',
  "Feed Back",
  setting:
  // 'समायोजन'
  "Settings",

}

 const HomeModule = {
    specialDay : "Momentous Occasion",
   firstHeaderText : "Daily Verbs",
   chruchLocation:"Church Location",
   socialMedia:"Social Media",
   quickNav:"Quick Route Guidance"
} 
 const prayerRequest = {
    prayerRequestNote :"Your prayer requests will be sent directly to the pastor."
} 

export default message = {
  ...DrawerMenu,
  ...HomeModule,
...prayerRequest,
  
};