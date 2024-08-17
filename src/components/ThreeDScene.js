import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const RotatingCube = () => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta;
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <Box ref={meshRef} args={[1, 1, 1]}>
            <meshStandardMaterial color="#61dafb" />
        </Box>
    );
};

const ThreeDScene = () => {
    return (
        <Canvas
            style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '30%' }}
            aria-hidden="true"
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <RotatingCube />
        </Canvas>
    );
};

export default ThreeDScene;