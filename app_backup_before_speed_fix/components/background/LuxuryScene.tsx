"use client";

import { Canvas } from "@react-three/fiber";

export default function LuxuryScene() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{ background: "red" }}
    >
      <Canvas>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}