import { Image, StyleSheet, Platform, Button, GestureResponderEvent } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Test } from '@/components/Test';
import Room1 from '@/components/Room1';
import currentUser from '@/components/CurrentUser';
import React, { useEffect } from 'react';
import { auth } from '@/components/Firebase';


export default function HomeScreen() {



  const user1 = auth.currentUser?.emailVerified;
  console.log("user verified? ", user1);
  

  const user = currentUser().user;
  let userData = currentUser().userData;

  if (!user) {
    userData = null;
  }
  useEffect(() => {
    console.log("user data updated: ", userData);
  }, [userData])

  
  
  function handleLogout(event: GestureResponderEvent): void {
    alert("this should log you out")
    auth.signOut();
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>{/* user.email works, user.uid as well. user.displayName works as well, but may be empty if not provided upon registration or included later*/}
        <ThemedText type="title">Welcome! {user ? user.displayName : "Gäst"} {userData ? userData.role : ""} {userData ? userData.username : ""}</ThemedText>
        <HelloWave />

          {user && user.photoURL ? (
          <Image
            source={{ uri: user.photoURL }} // Use the user's photoURL as the source
            style={styles.profileImage} // Apply your desired style here
          />
        ) : (
          <Image
            source={require('@/assets/images/partial-react-logo.png')} // Fallback image if no photoURL
            style={styles.profileImage} // Same styling for the fallback image
          />
        )}

        {user ? (<Button title='Log out' onPress={handleLogout}></Button> ) : <></>}
        

      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
        <Test/>
        <Room1/>
        <ThemedText>testd</ThemedText>
      </ThemedView>
     
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  profileImage: {
    width: 100,    // Set width of the profile image
    height: 100,   // Set height of the profile image
    borderRadius: 50, // Make it circular if desired
    marginTop: 10, // Add some space between the name and photo
    alignSelf: 'center', // Center the image
  },
});
