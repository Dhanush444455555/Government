"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Sphere, Html } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface SolarSystem3DProps {
    centerText: string;
    orbitTerms: string[];
    color?: string;
}

function Planet({ label, radius, speed, offset, color }: { label: string, radius: number, speed: number, offset: number, color: string }) {
    const ref = useRef<THREE.Group>(null);
    const textRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (ref.current) {
            const t = clock.getElapsedTime() * speed + offset;
            ref.current.position.x = Math.cos(t) * radius;
            ref.current.position.z = Math.sin(t) * radius;
        }
        if (textRef.current) {
            textRef.current.lookAt(0, 0, 20); // Always face camera
        }
    });

    return (
        <group ref={ref}>
            <Sphere args={[0.3, 16, 16]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </Sphere>
            <Text
                ref={textRef}
                position={[0, 0.8, 0]}
                fontSize={0.6}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {label}
            </Text>
        </group>
    );
}

function OrbitRing({ radius }: { radius: number }) {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
            <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
        </mesh>
    );
}

function CentralStar({ label, color }: { label: string, color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            meshRef.current.rotation.x += 0.005;
        }
    });

    return (
        <group>
            {/* Glowing Core */}
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[2.5, 1]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} wireframe />
            </mesh>
            {/* Inner Solid */}
            <mesh>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color="white" emissive={color} emissiveIntensity={2} />
            </mesh>
            {/* Label */}
            <Html center>
                <div className="text-white font-bold text-xl drop-shadow-md whitespace-nowrap bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    {label}
                </div>
            </Html>
        </group>
    );
}

function Scene({ centerText, orbitTerms, color }: SolarSystem3DProps) {
    const orbits = useMemo(() => {
        return orbitTerms.map((term, i) => ({
            label: term,
            radius: 5 + (i * 2.5), // Increasing radius for each term
            speed: 0.5 - (i * 0.03), // Slower outer planets
            offset: Math.random() * Math.PI * 2,
            color: color
        }));
    }, [orbitTerms, color]);

    return (
        <group rotation={[0.3, 0, 0]}> {/* Tilt the whole system slightly */}
            <CentralStar label={centerText} color={color || "#3b82f6"} />

            {orbits.map((orbit, i) => (
                <group key={i}>
                    <OrbitRing radius={orbit.radius} />
                    <Planet {...orbit} />
                </group>
            ))}
        </group>
    );
}

export default function SolarSystem3D(props: SolarSystem3DProps) {
    return (
        <div className="w-full h-full absolute inset-0 -z-10 pointer-events-none fade-in-0 animate-in duration-1000">
            <Canvas camera={{ position: [0, 15, 25], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Scene {...props} />
            </Canvas>
        </div>
    );
}
