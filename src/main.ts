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

    const button1 = this.createButton(0xffffff);
    button1.position.x = -1.2;
    button1.position.y = -0.4;
    button1.position.z = 0.82;
    icon.add(button1);
    
    const button2 = this.createButton(0xffffff);
    button2.position.x = 0;
    button2.position.y = -0.4;
    button2.position.z = 0.82;
    icon.add(button2);
    
    const button3 = this.createButton(0xffb459);
    button3.position.x = 1.2;
    button3.position.y = -0.4;
    button3.position.z = 0.82;
    icon.add(button3);

    const button4 = this.createLongButton(0xffffff);
    button4.position.x = -0.6;
    button4.position.y = -1.6;
    button4.position.z = 0.552;
    icon.add(button4);
    
    const button5 = this.createButton(0xffb459);
    button5.position.x = 1.2;
    button5.position.y = -1.6;
    button5.position.z = 0.82;
    icon.add(button5);

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
    const radius = 0.2;

    shape.absarc(1.5, 1.5, radius, angleStep * 0, angleStep * 1, false);
    shape.absarc(-1.5, 1.5, radius, angleStep * 1, angleStep * 2, false);
    shape.absarc(-1.5, -1.5, radius, angleStep * 2, angleStep * 3, false);
    shape.absarc(1.5, -1.5, radius, angleStep * 3, angleStep * 4, false);

    let geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.5,
      bevelEnabled: false,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 20,
      curveSegments: 20,
    });

    geometry.center();
    geometry.scale(1, 0.4, 1);

    const material = new THREE.MeshPhongMaterial({ color: 0xbd83fc });
    const screen = new THREE.Mesh(geometry, material);
    screen.position.z = 0.6;
    screen.position.y = 1,6;
    return screen;
  }

  createButton(color: THREE.ColorRepresentation | undefined) {
    const geometry = new THREE.CircleGeometry(0.5, 1000);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  createLongButton(color: THREE.ColorRepresentation | undefined) {
    const shape = new THREE.Shape();
    const angleStep = Math.PI * 0.5;
    const radius = 0.3;

    shape.absarc(1.2, 1.2, radius, angleStep * 0, angleStep * 1, false);
    shape.absarc(-1.2, 1.2, radius, angleStep * 1, angleStep * 2, false);
    shape.absarc(-1.2, -1.2, radius, angleStep * 2, angleStep * 3, false);
    shape.absarc(1.2, -1.2, radius, angleStep * 3, angleStep * 4, false);

    let geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.5,
      bevelEnabled: false,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 20,
      curveSegments: 20,
    });

    geometry.center();
    geometry.scale(0.75, 0.3, 1);

    const material = new THREE.MeshPhongMaterial({ color: color });
    const longButton = new THREE.Mesh(geometry, material);
    longButton.position.z = 0.6;
    longButton.position.y = 1,5;
    return longButton;
  }

  ngAfterViewInit() {
  }
}

bootstrapApplication(App);
