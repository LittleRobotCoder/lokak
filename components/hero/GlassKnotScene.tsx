"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  Float,
  Bounds,
  useBounds,
} from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// A slightly farther camera + narrower FOV reduces clipping while keeping the model large
const CAMERA_POSITION: [number, number, number] = [0, 0, 7];

function FitToBounds() {
  const bounds = useBounds();
  const didFit = useRef(false);

  // Fit once on mount (and whenever Bounds refreshes)
  useEffect(() => {
    if (didFit.current) return;
    didFit.current = true;
    // clip() adjusts near/far, fit() frames the object, refresh() recalculates bbox
    bounds.refresh().clip().fit();
  }, [bounds]);

  return null;
}

function AutoRotateSpeed({
  controlsRef,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl>;
}) {
  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const angle = controls.getAzimuthalAngle();
    const factor = Math.abs(Math.sin(angle));
    const target = THREE.MathUtils.lerp(0.15, 2.2, factor);
    controls.autoRotateSpeed = THREE.MathUtils.lerp(
      controls.autoRotateSpeed,
      target,
      0.08
    );
  });

  return null;
}

function GlassKnotModel() {
  const { scene } = useGLTF("/models/glass_knot_vortex.gltf");

  // Avoid mutating the cached GLTF scene instance
  const model = useMemo(() => scene.clone(true), [scene]);

  // Force a unified black look while keeping shading/specular highlights
  useEffect(() => {
    model.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const mesh = obj;

      // Replace any existing material(s) with a consistent dark material
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0B0B0F"),
        roughness: 0.35,
        metalness: 0.25,
        envMapIntensity: 0.9,
      });

      mesh.material = mat;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Some GLTFs can have odd culling; ensure visibility from all angles
      if (mesh.material) mesh.material.side = THREE.DoubleSide;
    });

    // Ensure materials update
    return () => {
      model.traverse((obj) => {
        if (!(obj instanceof THREE.Mesh)) return;
        const mesh = obj;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material?.dispose();
        }
      });
    };
  }, [model]);

  return (
    <Bounds
      // Fit the camera to the model so it never looks cropped
      fit
      clip
      observe={false}
      // Smaller margin => model appears larger; bump this up if edges still touch
      margin={1.12}
    >
      <FitToBounds />

      <Float speed={1.1} rotationIntensity={0} floatIntensity={0.28}>
        <primitive object={model} rotation={[0, 0, 0]} />
      </Float>
    </Bounds>
  );
}

export default function GlassKnotScene() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* Absolute fill prevents parent sizing changes from visually cropping the canvas */}
      <Canvas
        className="absolute inset-0 h-full w-full"
        camera={{ position: CAMERA_POSITION, fov: 32, near: 0.1, far: 200 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
        }}
        shadows={!isMobile}
      >
        {/* Subtle lighting that matches your violet/cyan theme */}
        <ambientLight intensity={0.55} />
        <directionalLight
          intensity={0.75}
          position={[5, 5, 6]}
          color="#6C63FF"
          castShadow
        />
        <directionalLight
          intensity={0.45}
          position={[-6, 2, 4]}
          color="#00D8FF"
          castShadow
        />

        <Environment preset="city" background={false} blur={0.6} />

        <Suspense fallback={null}>
          <GlassKnotModel />
        </Suspense>

        {/* makeDefault lets <Bounds> control the camera framing correctly */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
          enableDamping
          dampingFactor={0.08}
          // Keep the model upright (no vertical tilt)
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <AutoRotateSpeed controlsRef={controlsRef} />
      </Canvas>
    </div>
  );
}

// Preload the model for smoother first render
useGLTF.preload("/models/glass_knot_vortex.gltf");
