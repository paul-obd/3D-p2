import { Component, OnInit } from '@angular/core';
import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


@Component({
  selector: 'app-three-c1',
  templateUrl: './three-c1.component.html',
  styleUrls: ['./three-c1.component.css']
})
export class ThreeC1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initThreeJs()
  }

  initThreeJs() {
    // Debug
    //const gui = new dat.GUI()


    //textureLoader
    const loader = new THREE.TextureLoader()
    const texture = loader.load('/assets/texture.jpg')
    const height = loader.load('/assets/height.png')
    const alpha = loader.load('/assets/alpha.png')

    // Canvas
    const canvas = document.querySelector('canvas.webgl')

    // Scene
    const scene = new THREE.Scene()

    // Objects
    const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64);

    // Materials

    const material = new THREE.MeshStandardMaterial({
      color: '#0087ff',
      map: texture,
      displacementMap: height,
      alphaMap: alpha,
      transparent: true,
      depthTest: false

    })

    // Mesh
    const plane = new THREE.Mesh(geometry, material)
    plane.rotation.x = 181
    scene.add(plane)

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 2)
    pointLight.position.x = .2
    pointLight.position.y = 10
    pointLight.position.z = 4.4
    pointLight.intensity = 1.1
    scene.add(pointLight)

    // gui.add(pointLight.position, 'x').min(-3).max(3)
    // gui.add(pointLight.position, 'y').min(-6).max(6)
    // gui.add(pointLight.position, 'z').min(-6).max(6)
    // gui.add(pointLight, 'intensity').min(0).max(10)

    // const col = {
    //   color: '#0087ff'
    // }

    // gui.addColor(col, 'color').onChange(()=>{
    //   pointLight.color.set(col.color)
    // })


    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth 
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 3
    scene.add(camera)

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    /**
     * Animate
     */

    let mouseY = 0 

    document.addEventListener('mousemove', animateTerrain)

    function animateTerrain(event){
        mouseY = event.clientY
    }

    const clock = new THREE.Clock()

    const tick = () => {

      const elapsedTime = clock.getElapsedTime()

      //animateTerrain
      plane.material.displacementScale = .5 + mouseY * 0.0008

      // Update objects
      plane.rotation.z = .5 * elapsedTime

      // Update Orbital Controls
      // controls.update()

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()
  }

}
