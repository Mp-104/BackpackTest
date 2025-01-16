import { Box, Environment, OrbitControls, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { View } from "react-native";


export default function Room1 () {
    return (
        <View style={{ flex: 1 }}>
      {/* 3D Scene */}
      <Canvas style={{ flex: 1 }} camera={{ position: [0, 1, 4], fov: 50 }}>
        {/* Add an environment map for realistic lighting */}
        <Environment preset="sunset" />
        
        {/* Create the floor */}
        <Plane args={[5, 5]} position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="lightgray" />
        </Plane>

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
        <Box position={[-1.2, -2, 0]}>
          <meshStandardMaterial color="royalblue" />
        </Box>

        {/* Orange box */}
        <Box position={[2, 0, 0]}>
          <meshStandardMaterial color="orange" />
        </Box>

        {/* Camera controls for navigating the scene */}
        <OrbitControls enablePan={false} minDistance={1} maxDistance={5}/>
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </View>
    )
}