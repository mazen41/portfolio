// src/components/assistant/MazRobot3D.jsx
// RobotExpressive.glb — Tomas Laulhe, modified by Don McCurdy — CC0 (public domain).
import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const ACCENT_COLOR = '#2af6ff';
const FOV = 35;
// Share of the view height the robot's bounding box should occupy.
const FILL = 0.85;

// Fits the model from its own bounding box, nothing hard-coded:
// centre the box on the origin, scale it so the box height is 1 unit, then
// move the camera back far enough that a 1-unit height covers FILL of the
// view height, and also far enough that the box width fits the aspect ratio.
function fitToView(scene, camera) {
  scene.position.set(0, 0, 0);
  scene.scale.set(1, 1, 1);
  scene.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const s = 1 / size.y;
  scene.scale.setScalar(s);
  scene.position.copy(center).multiplyScalar(-s);
  scene.updateMatrixWorld(true);

  const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const widthNorm = size.x * s;
  const distByHeight = 1 / FILL / (2 * tanHalf);
  const distByWidth = widthNorm / FILL / (2 * tanHalf * camera.aspect);
  camera.position.set(0, 0, Math.max(distByHeight, distByWidth));
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
}

function Robot({ waveSignal, reduced }) {
  const group = useRef();
  const { camera } = useThree();
  const { scene, animations } = useGLTF('/models/robot.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // recolor body to the site's accent color, leave face/trim materials alone
    scene.traverse((o) => {
      if (o.isMesh && o.material && o.material.name === 'Main') {
        o.material = o.material.clone();
        o.material.color = new THREE.Color(ACCENT_COLOR);
      }
    });
  }, [scene]);

  useEffect(() => {
    fitToView(scene, camera);
  }, [scene, camera]);

  useEffect(() => {
    const idle = actions['Idle'];
    if (idle) idle.reset().fadeIn(0.3).play();
    return () => idle && idle.fadeOut(0.2);
  }, [actions]);

  // wave once whenever waveSignal changes (skip the initial mount value)
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!waveSignal || reduced) return;
    const wave = actions['Wave'];
    const idle = actions['Idle'];
    if (!wave) return;
    wave.reset().setLoop(THREE.LoopOnce, 1);
    wave.clampWhenFinished = true;
    idle && idle.fadeOut(0.2);
    wave.fadeIn(0.2).play();
    const mixer = wave.getMixer();
    const done = (e) => {
      if (e.action !== wave) return;
      wave.fadeOut(0.3);
      idle && idle.reset().fadeIn(0.3).play();
      mixer.removeEventListener('finished', done);
    };
    mixer.addEventListener('finished', done);
    return () => mixer.removeEventListener('finished', done);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waveSignal]);

  useFrame((state) => {
    if (!group.current) return;
    if (!reduced) {
      const t = state.clock.elapsedTime;
      group.current.position.y = Math.sin(t * 1.6) * 0.08;
      const targetY = state.pointer.x * 0.5;
      const targetX = -state.pointer.y * 0.25;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.08);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.08);
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

export default function MazRobot3D({ waveSignal, reduced }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: FOV, position: [0, 0, 3], near: 0.05, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ background: 'transparent' }}
    >
      <hemisphereLight args={['#ffffff', '#334455', 1.1]} />
      <directionalLight position={[2, 3, 3]} intensity={1.2} />
      <Robot waveSignal={waveSignal} reduced={reduced} />
    </Canvas>
  );
}

useGLTF.preload('/models/robot.glb');
