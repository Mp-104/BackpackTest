import { Box, Environment, OrbitControls, Plane, Sphere, Texture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Image, StyleSheet, Platform } from 'react-native';

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three"; 

import { Asset } from 'expo-asset';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { useGLTF } from '@react-three/drei/native'
import { GLTFLoader } from "@/node_modules copy/three-stdlib";
import { PerspectiveCamera } from "@/node_modules copy/@react-three/drei";


interface RoomProps {}

const Ball = () => {

  const boxRef = useRef();

    

    useFrame(() => {
      const time = performance.now() * 0.0055
      if (boxRef.current) {
        // Circular motion
        /* boxRef.current.position.x = Math.sin(time) * 1
        boxRef.current.position.z = Math.cos(time) * 1 */
        boxRef.current.position.y = Math.cos(time)-0.97 * 1.3
      }
    })

  const football = Asset.fromModule(require('../assets/balldimpled.png')).uri;

  const footballTexture = useLoader(TextureLoader, football);
  return (
    <>
      {/* (foot)Ball */}
      <Sphere ref={boxRef} position={[-0.1, -2.23, 2]} scale={[0.3, 0.3, 0.3]}>
          <meshStandardMaterial map={footballTexture} />
        </Sphere>
    </>
  )

}

const Table: React.FC<{ position: [number, number, number], scale: [number, number, number], rotation: [number, number, number] }> = ({ position, scale, rotation }) => {


    /* const boxRef = useRef();

    const [speed, setSpeed] = useState(0.05);

    useFrame(() => {
      if (boxRef.current) {
        boxRef.current.position.x += speed}

        if(boxRef.current.position.x > 5 || boxRef.current.position.x < 5) {
          setSpeed(-speed)
        }
    })

    useFrame(() => {
      const time = performance.now() * 0.001
      if (boxRef.current) {
        // Circular motion
        boxRef.current.position.x = Math.sin(time) * 1
        boxRef.current.position.z = Math.cos(time) * 1
      }
    }) */

      // Above code is to make object Table move, back and forth first useFrame and circular second useFrame


  return (
    <group /* ref={boxRef} */ position={position} scale={scale} rotation={rotation} >
    
      <Box position={[-0.5, -2, 2]} args={[0.1, 1.3, 0.1]}>
          <meshStandardMaterial color="tan" />
      </Box>

      <Box position={[-2, -2, 2]} args={[0.1, 1.3, 0.1]}>
          <meshStandardMaterial color="tan" />
      </Box>

      <Box position={[-0.5, -2, 1]} args={[0.1, 1.3, 0.1]}>
        <meshStandardMaterial color="tan" />
      </Box>

      <Box position={[-2, -2, 1]} args={[0.1, 1.3, 0.1]}>
        <meshStandardMaterial color="tan" />
      </Box>

      <Box position={[-1.26, -1.4, 1.45]} args={[1.8, 0.1, 1.2]}>
        <meshStandardMaterial color={"tan"}/>
      </Box>

   </group>
  )

}

const Room: React.FC<RoomProps> = () => {
  // Load the image using Expo's Asset module
  const reactLogo = Asset.fromModule(require('../assets/images/partial-react-logo.png')).uri;

  const football = Asset.fromModule(require('../assets/football.jpg')).uri;

  //const drink = Asset.fromModule(require('../assets/drink.gif')).uri;
  const drink1 = Asset.fromModule(require('../assets/drink/drink1.png')).uri;
  const drink2 = Asset.fromModule(require('../assets/drink/drink2.png')).uri;
  const drink3 = Asset.fromModule(require('../assets/drink/drink3.png')).uri;
  const drink4 = Asset.fromModule(require('../assets/drink/drink4.png')).uri;

  // Load the texture using the URI
  const texture = useLoader(TextureLoader, reactLogo);

  const footballTexture = useLoader(TextureLoader, football);

  //const drinkGif = useLoader(TextureLoader, drink);
  //drinkGif.needsUpdate = true;

  const drinkImage1 = useLoader(TextureLoader, drink1);
  const drinkImage2 = useLoader(TextureLoader, drink2);
  const drinkImage3 = useLoader(TextureLoader, drink3);
  const drinkImage4 = useLoader(TextureLoader, drink4);


  // Load models using the URI
  const skel = Asset.fromModule(require('../assets/model.glb')).uri;

  const pistol = Asset.fromModule(require('../assets/Pistol.glb')).uri;

  const toilet = Asset.fromModule(require('../assets/toilet.gltf')).uri;
  

  const model = useLoader(GLTFLoader, skel);

  const model2 = useLoader(GLTFLoader, pistol);

  const model3 = useLoader(GLTFLoader, toilet);

    //const model = useGLTF('../assets/model.glb');




    // state for alternating between texture
    const [currentTexture, setCurrentTexture] = useState(drinkImage1);

    // useEffect for alternating between the given images and setting them into the currentTexture useState. Alternate between 1 sec
    useEffect(() => {
      const interval = setInterval(() => {
        //setCurrentTexture(prev => ( prev === drinkImage1 ? drinkImage2 : drinkImage1));
        setCurrentTexture(prev => {
          if(prev === drinkImage1) return drinkImage2;
          if(prev === drinkImage2) return drinkImage3;
          if(prev === drinkImage3) return drinkImage4;
          return drinkImage1;
        })
      }, 100);

      // clear interval when component is unmounted
      return () => clearInterval(interval);
    }, [drinkImage1, drinkImage2, drinkImage3, drinkImage4 ]);
  

    

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.reactLogo}
      />

      {/* 3D Scene */}
      <Canvas style={{ flex: 1 }} camera={{ position: [0, 1, 4], fov: 50 }}>
        {/* Add an environment map for realistic lighting */}
        <Environment preset="sunset" />

        {/* Create the floor */}
        <Plane args={[5, 5]} position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="lightgray" />
        </Plane>

        {/*<primitive object={model.scene} scale={0.5} position={[0, 0, 0]} /> */}

        {/* Create walls */}
        <Box position={[-2.5, -0.75, 0]} args={[0.2, 3.5, 5]}>
          <meshStandardMaterial color="lightblue" />
        </Box>
        <Box position={[2.5, -0.75, 0]} args={[0.2, 3.5, 5]}>
          <meshStandardMaterial color="lightblue" />
        </Box>
        <Box position={[0, -0.75, 2.5]} args={[5, 3.5, 0.2]}>
          <meshStandardMaterial color="lightblue" />
        </Box>

        {/* Blue box */}
        <Box position={[-1.2, -2, -1]}>
          <meshStandardMaterial color="royalblue" />
        </Box>

        
        <Table position={[-0.2, 0, 0.4]} scale={[1, 1, 1]} rotation={[0, 0, 0]}/>

        {/* Drink box */}
        <Box position={[2.85, -1, 0]}>
          <meshStandardMaterial  map={currentTexture}/>
        </Box>

        {/*Black box as "tv"*/}
        <Box position={[3.051, -1, 0]} scale={[1.4, 1.4, 1.4]}>
          <meshStandardMaterial color={"black"} />
        </Box>

        {/* Box with the react logo texture */}
        <Box position={[-6, 0, 0]} args={[2, 2, 2]}>
          <meshStandardMaterial map={texture} />
        </Box>

        {/* (foot)Ball */}
        <Sphere position={[1, -2.23, 2]} scale={[0.3, 0.3, 0.3]}>
          <meshStandardMaterial map={footballTexture} />
        </Sphere>

        <Ball />


        {/* Skeleton*/}
        <primitive position={[2.2, -2.5, 1.7]} object={model.scene} scale={[0.1, 0.1, 0.1]} rotation={[0, Math.PI / -2, 0]}/>

        {/* Pistol*/}
        <primitive position={[-1.4, -1.325, 1.5]} object={model2.scene} scale={[1, 1, 1]} rotation={[1.5, 0, 0]}/>

        {/* toilet*/}
        <primitive position={[-2.4, -2.5, 0.5]} object={model3.scene} scale={[2, 2, 2]} rotation={[0, 1.57, 0]}/>

        {/* Camera controls for navigating the scene */}
        <OrbitControls enablePan={false} minDistance={1} maxDistance={5} />

        <PerspectiveCamera makeDefault position={[0, 1000000, -3000000]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </View>
  );
};

export default Room;

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
});
