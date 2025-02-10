/* import AppUsageStats from 'react-native-app-usage';
import { requestUsagePermission,getUsageLast24Hr,checkPackagePermission } from 'react-native-app-usage';


export default AppUsageStats.checkPackagePermission().then(permissionGranted => {
    if (!permissionGranted) {
        requestUsagePermission();
    } else { 
        getUsageLast24Hr((data: any) => {
            let allAppUsage = data; 
        })
    }
}).catch(error => {
    console.log('error ==>', error);
});
 */

/* console.log("checkPackagepermission", AppUsageStats.checkPackagePermission());

AppUsageStats.getUsageLast24Hr(() => console.log("test, appUsageStats")) */
