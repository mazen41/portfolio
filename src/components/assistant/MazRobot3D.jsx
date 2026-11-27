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

// Union of the model's boxes over every animation clip: static meshes use
// Box3.setFromObject, skinned meshes are re-skinned at sampled times so poses
// like the wave (arm raised) are inside the box too.
function animatedBox(scene, animations) {
  const box = new THREE.Box3().setFromObject(scene);
  const meshes = [];
  scene.traverse((o) => {
    if (o.isSkinnedMesh) meshes.push(o);
  });
  const mixer = new THREE.AnimationMixer(scene);
  const samples = 8;
  animations.forEach((clip) => {
    const action = mixer.clipAction(clip).play();
    for (let i = 0; i <= samples; i++) {
      action.time = (clip.duration * i) / samples;
      mixer.update(0);
      scene.updateMatrixWorld(true);
      meshes.forEach((m) => {
        m.skeleton.update();
        m.computeBoundingBox();
        box.union(m.boundingBox.clone().applyMatrix4(m.matrixWorld));
      });
    }
    action.stop();
  });
  mixer.stopAllAction();
  mixer.uncacheRoot(scene);
  return box;
}

// Fits the model from its bounding box, nothing hard-coded:
// centre the box on the origin, scale it so the box height is 1 unit, then
// move the camera back far enough that a 1-unit height covers FILL of the
// view height, and also far enough that the box width fits the aspect ratio.
function fitToView(scene, camera, animations) {
  scene.position.set(0, 0, 0);
  scene.scale.set(1, 1, 1);
  scene.updateMatrixWorld(true);

  const box = animatedBox(scene, animations);
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

  // Vertical room left above and below the box (in box-height units). The float
  // animation uses half of it, so the robot never reaches the canvas edge.
  const visibleHeight = 2 * camera.position.z * tanHalf;
  return (visibleHeight - 1) / 2;
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

  const floatAmp = useRef(0);
  useEffect(() => {
    floatAmp.current = fitToView(scene, camera, animations) * 0.5;
  }, [scene, camera, animations]);

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
      group.current.position.y = Math.sin(t * 1.6) * floatAmp.current;
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
