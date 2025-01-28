import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image, StyleSheet, Platform } from 'react-native';
import Room1 from "@/components/Room1";
import { View, Text } from "react-native";
import React from "react";
import LoginPage from "@/components/LoginPage"
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoomScreen () {
    return (

        <SafeAreaView style={{ flex: 1}}>

            <LoginPage></LoginPage>

        </SafeAreaView>
          
            

    )
}