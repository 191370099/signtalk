import React, { useEffect } from 'react';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

const ThreeScene = () => {
    useEffect(() => {
    let scene, camera, renderer, mixer;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 2;
    camera.position.y = 2.5;
    const canvas = document.getElementById('myThreeJsCanvas');
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    const loader = new GLTFLoader();
    loader.setPath("/resources/zombie/");
    loader.load("first.glb", (fbx) => {
        console.log(fbx.animations);
        scene.add(fbx.scene);
        fbx.scene.scale.set(1.7,1.7,1.7);
        mixer = new THREE.AnimationMixer(fbx.scene);
        const howclip = THREE.AnimationClip.findByName(fbx.animations,'how')
        const howaction = mixer.clipAction(howclip);
        howaction.play();
        howaction.loop = THREE.LoopOnce;
        const youclip = THREE.AnimationClip.findByName(fbx.animations,'you')
        const youaction = mixer.clipAction(youclip);
        mixer.addEventListener('finished', function(e){
          if(e.action._clip.name== 'how'){
            youaction.crossFadeFrom(howaction,0.5,true);
            youaction.play();
            youaction.loop = THREE.LoopOnce;
          }
        });
        
    });
    renderer = new THREE.WebGLRenderer({canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xcbf2db);
    document.body.appendChild(renderer.domElement);
    const clock = new THREE.Clock();
    function animate() {
      if(mixer){
        mixer.update(clock.getDelta());
      }
      renderer.render(scene,camera);
    }
    renderer.setAnimationLoop(animate);
  }, []);
  return (
    <div>
        <canvas id='myThreeJsCanvas'/>
    </div>
  );
};
export default ThreeScene;