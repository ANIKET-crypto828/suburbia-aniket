"use client"

import * as THREE from 'three';
import React, { Suspense, useRef } from 'react';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Skateboard } from '@/components/Skateboard';

type Props = {
  deckTextureURL : string;
  wheelTextureURL : string;
  truckColor : string;
  boltColor : string;
}

export default function InteractiveSkateboard({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor
}: Props) {
  return (
    <div className='absolute inset-0 z-10 flex items-center justify-center'>
      <Canvas className="min-h-[60rem] w-full" camera={{fov: 55, position: [1.5, 1, 1.4]}}>
      <Suspense>
      <Scene 
       deckTextureURL = {deckTextureURL}
       wheelTextureURL = {wheelTextureURL}
       truckColor = {truckColor}
       boltColor = {boltColor}
      />
      </Suspense>
      </Canvas>
    </div>
  );
}

function Scene({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor
}: Props) {
 const containerRef = useRef<THREE.Group>(null);

 function onClick(event: ThreeEvent<MouseEvent>){
  event.stopPropagation();

  const board = containerRef.current;

  if (!board) return;

  const {name} = event.intersections[0].object;
 }

  return (
    <group>
      <OrbitControls />
      <Environment files={"/hdr/warehouse-256.hdr"}/>
      <group ref={containerRef}>


      <Skateboard
      wheelTextureURLs= {[wheelTextureURL]}
      wheelTextureURL={wheelTextureURL}
      deckTextureURLs={[deckTextureURL]}
      deckTextureURL={deckTextureURL}
      truckColor={truckColor}
      boltColor={boltColor}
      constantWheelSpin
      />

      <mesh position={[0,.27,0]} name="middle">
        <boxGeometry args={[0.6, 0.1, 2.2]}/>
        <meshStandardMaterial visible={true}/>
      </mesh>
       </group>
      <ContactShadows opacity={0.6} position={[0, -.08, 0]}/>
    </group>
  )
}