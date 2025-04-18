import { Billboard } from '@react-three/drei';
import React, { useRef } from 'react'
import * as THREE from 'three';

interface HotspotProps {
  position: [number, number, number];
  isVisible: boolean;
  color?: string;
}

export default function Hotspot({
  position,
  isVisible,
  color = "#E6FC6A"
}: HotspotProps) {
  const hotspotRef = useRef<THREE.Mesh>(null);


  return (
    <Billboard
  follow={true}
  position={position}
>
  <mesh ref={hotspotRef} visible={isVisible}>
    <circleGeometry args={[.02, 32]} />
    <meshStandardMaterial color={color} transparent opacity={1} />
  </mesh>

  <mesh visible={isVisible}
  onPointerOver={() => {
    document.body.style.cursor = 'pointer';
  }}
  onPointerOut={() => {
    document.body.style.cursor = 'default';
  }}
  >
    <circleGeometry args={[.03, 32]} />
    <meshBasicMaterial color={color} />
  </mesh>

</Billboard>

  )
}