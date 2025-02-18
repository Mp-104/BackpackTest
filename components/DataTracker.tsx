import React from "react";
import { useEffect, useState } from "react";
import { Button, PermissionsAndroid, View, Text } from "react-native"
import usageStats from "react-native-usage-stats";
import UsageStats from 'react-native-usage-stats';




const DataTracker = () => {
    const [usageStats, setUsageStats] = useState([]);

    const fetchUsageStats = async () => {
        try {
            const endTime = Date.now();
            const beginTime = endTime - 86400000;
            const packageName = null;

            const stats = await UsageStats.getAppUsageStats(packageName, beginTime, endTime);
            setUsageStats(stats);

        } catch (error) {
            console.error(error);
        }
    }

    const requestUsageStatsPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.PACKAGE_USAGE_STATS,
                {
                    title: "App Usage Permission",
                    message: "This app needs access to your app usage data.",
                    buttonNeutral: "Ask Me later",
                    buttonNegative: "Cancel",
                    buttonPositive: "Yes",
                }
    
            )
    
            return granted === PermissionsAndroid.RESULTS.granted;
    
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    useEffect(() => {
        requestUsageStatsPermission();
    }, []);


    return (
        <View>
            <Button title="fetch app usage" onPress={fetchUsageStats}></Button>
            {usageStats.map((stat, index) => (
                <Text key={index}>
                    {stat.packageName}: {stat.totalTimeInForeground} ms
                </Text>
            ))}
        </View>
    )
}







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
