"use client";

import { ContactShadows, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

const MODEL = "/models/iphone-16-pro/iphone-16-pro.fbx";
const MAPS = "/models/iphone-16-pro/maps";

const fbxManager = new THREE.LoadingManager();
fbxManager.setURLModifier((url) => {
  if (url.startsWith("blob:") || url.startsWith("data:")) return url;
  if (url.includes(`${MAPS}/`)) return url;
  if (/\.(png|jpe?g|tga)$/i.test(url)) return `${MAPS}/color.jpg`;
  return url;
});

type PhoneProject = {
  id: string;
  href: string;
  reel: string;
  poster: string;
  title: string;
};

function isMesh(object: THREE.Object3D): object is THREE.Mesh {
  return (object as THREE.Mesh).isMesh;
}

function useHeroVideo(src: string) {
  const { video, map } = useMemo(() => {
    const element = document.createElement("video");
    element.src = src;
    element.crossOrigin = "anonymous";
    element.muted = true;
    element.loop = true;
    element.playsInline = true;
    element.preload = "auto";
    const texture = new THREE.VideoTexture(element);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.flipY = false;
    return { video: element, map: texture };
  }, [src]);

  useEffect(() => {
    const play = () => {
      video.play().catch(() => {});
    };
    video.addEventListener("canplay", play);
    play();
    return () => {
      video.removeEventListener("canplay", play);
      video.pause();
      video.removeAttribute("src");
      video.load();
      map.dispose();
    };
  }, [map, video]);

  return map;
}

function Iphone({
  project,
  side,
}: {
  project: PhoneProject;
  side: "left" | "right";
}) {
  const source = useLoader(FBXLoader, MODEL, (loader) => {
    loader.manager = fbxManager;
  });
  const scene = useMemo(() => {
    const clone = source.clone(true);
    clone.traverse((child) => {
      if (isMesh(child) && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        child.material = Array.isArray(child.material)
          ? materials.map((material) => material.clone())
          : materials[0].clone();
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    clone.position.sub(center);
    if (size.z > size.y * 1.15) {
      clone.rotation.x = -Math.PI / 2;
      const upright = new THREE.Box3().setFromObject(clone);
      clone.position.sub(upright.getCenter(new THREE.Vector3()));
      size.copy(upright.getSize(new THREE.Vector3()));
    }
    const tall = Math.max(size.y, size.z);
    clone.scale.setScalar(1.72 / (tall || 1));
    return clone;
  }, [source]);

  const colorMap = useTexture(`${MAPS}/color.jpg`);
  const normalMap = useTexture(`${MAPS}/normal.png`);
  const roughnessMap = useTexture(`${MAPS}/roughness.jpg`);
  const metalnessMap = useTexture(`${MAPS}/metalness.jpg`);
  const aoMap = useTexture(`${MAPS}/ao.jpg`);
  const posterMap = useTexture(project.poster);
  const videoMap = useHeroVideo(project.reel);

  const group = useRef<THREE.Group>(null);
  const baseY = side === "left" ? 0.38 : -0.38;

  useLayoutEffect(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace;
    posterMap.colorSpace = THREE.SRGBColorSpace;
    posterMap.wrapS = THREE.ClampToEdgeWrapping;
    posterMap.wrapT = THREE.ClampToEdgeWrapping;
    posterMap.flipY = false;

    [colorMap, normalMap, roughnessMap, metalnessMap, aoMap].forEach((map) => {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.needsUpdate = true;
    });
    normalMap.colorSpace = THREE.NoColorSpace;
    roughnessMap.colorSpace = THREE.NoColorSpace;
    metalnessMap.colorSpace = THREE.NoColorSpace;
    aoMap.colorSpace = THREE.NoColorSpace;

    const chassis = new THREE.MeshStandardMaterial({
      map: colorMap,
      normalMap,
      roughnessMap,
      metalnessMap,
      aoMap,
      metalness: 0.72,
      roughness: 0.38,
      envMapIntensity: 0.85,
    });
    chassis.normalScale.set(0.55, 0.55);

    const hasVideoFrame = videoMap.image instanceof HTMLVideoElement && videoMap.image.readyState >= 2;
    const screen = new THREE.MeshBasicMaterial({
      map: hasVideoFrame ? videoMap : posterMap,
      toneMapped: false,
    });
    const swapToVideo = () => {
      if (screen.map === videoMap) return;
      screen.map = videoMap;
      screen.needsUpdate = true;
    };
    const videoEl = videoMap.image instanceof HTMLVideoElement ? videoMap.image : null;
    videoEl?.addEventListener("playing", swapToVideo);

    scene.traverse((child) => {
      if (!isMesh(child)) return;
      const name = child.name.toLowerCase();
      if (child.geometry.getAttribute("uv") && !child.geometry.getAttribute("uv2")) {
        child.geometry.setAttribute("uv2", child.geometry.getAttribute("uv"));
      }
      child.castShadow = true;
      child.receiveShadow = true;
      if (name === "display" || name === "edge-display") {
        child.material = name === "display" ? screen : chassis;
      } else {
        child.material = chassis;
      }
    });

    return () => {
      videoEl?.removeEventListener("playing", swapToVideo);
      chassis.dispose();
      screen.dispose();
    };
  }, [aoMap, colorMap, metalnessMap, normalMap, posterMap, roughnessMap, scene, videoMap]);

  useFrame((state) => {
    const node = group.current;
    if (!node) return;
    const x = state.pointer.x * 0.1;
    const y = state.pointer.y * 0.06;
    node.rotation.y = THREE.MathUtils.lerp(node.rotation.y, baseY + x, 0.08);
    node.rotation.x = THREE.MathUtils.lerp(node.rotation.x, y, 0.08);
  });

  return (
    <group
      ref={group}
      position={[side === "left" ? -0.95 : 0.95, -0.08, 0]}
      rotation={[0, baseY, 0]}
      onClick={(event) => {
        event.stopPropagation();
        window.open(project.href, "_blank", "noopener,noreferrer");
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <primitive object={scene} />
    </group>
  );
}

function CameraRig() {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    camera.position.set(0, 0.16, size.width < 760 ? 4.6 : 3.2);
    if ("fov" in camera) {
      camera.fov = size.width < 760 ? 36 : 32;
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width]);
  return null;
}

export function PhoneStage({ phones }: { phones: PhoneProject[] }) {
  const left = phones[0];
  const right = phones[1];
  if (!left || !right) return null;

  return (
    <div className="phone-stage">
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.16, 3.2], fov: 32 }}
      >
        <CameraRig />
        <ambientLight intensity={0.55} />
        <hemisphereLight args={["#e4eaf4", "#121318", 0.7]} />
        <directionalLight position={[3.2, 4.5, 3.4]} intensity={1.35} />
        <directionalLight position={[-3.4, 1.8, 1.6]} intensity={0.55} />
        <directionalLight position={[0.2, 2.4, -3.2]} intensity={0.28} />
        <Suspense fallback={null}>
          <Iphone project={left} side="left" />
          <Iphone project={right} side="right" />
          <ContactShadows position={[0, -0.98, 0]} opacity={0.45} scale={6} blur={2.4} far={2.2} />
        </Suspense>
      </Canvas>
    </div>
  );
}
