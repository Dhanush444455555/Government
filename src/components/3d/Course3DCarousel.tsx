"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Stars, Sparkles } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Word({ children, position, color }: { children: string; position: THREE.Vector3; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            // Make text always face camera
            meshRef.current.lookAt(0, 0, 10);
        }
    });

    return (
        <Float floatIntensity={2} rotationIntensity={1}>
            <Text
                ref={meshRef}
                scale={[1, 1, 1]}
                position={position}
                color={color}
                fontSize={0.8}
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                anchorX="center"
                anchorY="middle"
            >
                {children}
                <meshStandardMaterial emissive={color} emissiveIntensity={0.8} toneMapped={false} />
            </Text>
        </Float>
    );
}

function Cloud({ count = 8, radius = 20 }) {
    const words = useMemo(() => {
        const temp = [];
        const courseNames = ["UPSC", "SSC CGL", "Banking PO", "GATE", "CAT", "NEET", "JEE", "State PSC", "Railways", "Defence", "CLAT", "Teaching"];
        const colors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ec4899", "#f97316", "#06b6d4"];

        // Create a spherical distribution
        const phiSpan = Math.PI / (count + 1);
        const thetaSpan = (Math.PI * 2) / count;

        for (let i = 0; i < count + 10; i++) {
            // Random spherical coordinates
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            temp.push({
                pos: new THREE.Vector3(x, y, z),
                word: courseNames[i % courseNames.length],
                color: colors[i % colors.length]
            });
        }
        return temp;
    }, [count, radius]);

    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
            groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {words.map((w, i) => (
                <Word key={i} position={w.pos} color={w.color}>
                    {w.word}
                </Word>
            ))}
        </group>
    );
}

export default function Course3DCarousel() {
    return (
        <div className="w-full h-full min-h-[500px] absolute inset-0 -z-0 pointer-events-none">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 60 }}>
                <fog attach="fog" args={["#111827", 0, 80]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />

                <Cloud count={15} radius={18} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Sparkles count={50} scale={40} size={4} speed={0.4} opacity={0.5} color="#4f46e5" />
            </Canvas>
        </div>
    );
}
