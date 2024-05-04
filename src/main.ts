import { Component, HostListener, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ``,
})
export class App implements OnInit {
  name = 'Angular';
  controls: any;
  camera: any;
  scene: any;
  icon: any;
  renderer: any;

  constructor() {}

  ngOnInit() {
    this.createObject();
  }

  createObject() {
    this.scene = this.createScene();
    this.camera = this.createCamera();

    this.icon = this.createIcon();
    this.scene.add(this.icon);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setPixelRatio(devicePixelRatio);
    let component = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      // component.animateModel();
      requestAnimationFrame(render);
    })();
    
    document.body.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.update();
  }

  createScene() {
    const scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(200, 500, 300);
    scene.add(directionalLight);
    return scene;
  }

  createCamera() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const cameraWidth = 20;
    const cameraHeight = cameraWidth / aspectRatio;

    const camera = new THREE.OrthographicCamera(
      cameraWidth / -2, // left
      cameraWidth / 2, // right
      cameraHeight / 2, // top
      cameraHeight / -2, // bottom
      0, // near plane
      1000 // far plane
    );
    camera.position.set(200, 200, 200);
    camera.lookAt(0, 10, 0);
    return camera;
  }

  createIcon() {
    const icon = new THREE.Group();

    const base = this.createBase();
    icon.add(base);
    const box = this.createCalculatorBox();
    icon.add(box);
    const screen = this.createCalculatorScreen();
    icon.add(screen);

    return icon;
  }

  createBase() {
    const shape = new THREE.Shape();
    const angleStep = Math.PI * 0.5;
    const radius = 2;

    shape.absarc(2, 2, radius, angleStep * 0, angleStep * 1, false);
    shape.absarc(-2, 2, radius, angleStep * 1, angleStep * 2, false);
    shape.absarc(-2, -2, radius, angleStep * 2, angleStep * 3, false);
    shape.absarc(2, -2, radius, angleStep * 3, angleStep * 4, false);

    let geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 20,
      curveSegments: 20,
    });

    geometry.center();

    const material = new THREE.MeshPhongMaterial({ color: 0xbd83fc });
    const baseBox = new THREE.Mesh(geometry, material);
    return baseBox;
  }

  createCalculatorBox() {
    const shape = new THREE.Shape();
    const angleStep = Math.PI * 0.5;
    const radius = 0.5;

    shape.absarc(2, 2, radius, angleStep * 0, angleStep * 1, false);
    shape.absarc(-2, 2, radius, angleStep * 1, angleStep * 2, false);
    shape.absarc(-2, -2, radius, angleStep * 2, angleStep * 3, false);
    shape.absarc(2, -2, radius, angleStep * 3, angleStep * 4, false);

    let geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 20,
      curveSegments: 20,
    });

    geometry.center();

    const material = new THREE.MeshPhongMaterial({ color: 0xd0bfe3 });
    const box = new THREE.Mesh(geometry, material);
    box.position.z = 0.5;
    return box;
  }

  createCalculatorScreen() {
    const shape = new THREE.Shape();
    const angleStep = Math.PI * 0.5;
    const radius = 0.5;

    shape.absarc(1.3, 1.3, radius, angleStep * 0, angleStep * 1, false);
    shape.absarc(-1.3, 1.3, radius, angleStep * 1, angleStep * 2, false);
    shape.absarc(-1.3, -1.3, radius, angleStep * 2, angleStep * 3, false);
    shape.absarc(1.3, -1.3, radius, angleStep * 3, angleStep * 4, false);
    // shape.bezierCurveTo(20, 10, 20, 10, 20, 10);

    let geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 20,
      curveSegments: 20,
    });

    geometry.center();

    const material = new THREE.MeshPhongMaterial({ color: 0xbd83fc });
    const screen = new THREE.Mesh(geometry, material);
    screen.position.z = 0.6;
    return screen;
  }

  ngAfterViewInit() {
  }
}

bootstrapApplication(App);
