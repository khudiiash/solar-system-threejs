import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r118/three.module.js';


function init() {
    const canvas = document.getElementById('three-scene');
    const renderer = new THREE.WebGLRenderer({canvas, antialis: true})


    // Camera
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 15;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;
    camera.position.y += 0
    
    camera.lookAt(0,0,0)

    // Renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    


    const scene = new THREE.Scene()
    const objects = [];

    let mercuryCenter = new THREE.Group()
    let venusCenter = new THREE.Group()
    let marsCenter = new THREE.Group()
    let jupiterCenter = new THREE.Group()
    let saturnCenter = new THREE.Group()

    let asteroidCenter = new THREE.Group()



    mercuryCenter.position.set(0,0,0)
    venusCenter.position.set(0,0,0)
    marsCenter.position.set(0,0,0)
    jupiterCenter.position.set(0,0,0)
    saturnCenter.position.set(0,0,0)


    asteroidCenter.position.set(0,0,0)


    // Asteroids

    // Sun 
    const sphereRadius= .5;
    const sphereHeight = 155;
    const sphereDepth = 155;
    let geometry = new THREE.SphereGeometry(sphereRadius, sphereHeight, sphereDepth);
    let material = new THREE.MeshPhongMaterial({emissive: 0xffffff});
    const sun = new THREE.Mesh(geometry, material);
    sun.position.set(0, 0, 0)
    objects.push(sun)

    const stars = new THREE.Group()
    stars.position.set(0,0,0)
    
    // Earth 
    const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
    const earthMesh = new THREE.Mesh(geometry, earthMaterial);
    earthMesh.position.x = 2;
    earthMesh.scale.set(.1,.1,.1)
    earthMesh.receiveShadow = true;
    sun.add(earthMesh);
    objects.push(earthMesh);

    // Moon
    const moonMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, emissive: 0xffffff});
    const moonMesh = new THREE.Mesh(geometry, moonMaterial);
    moonMesh.position.x = 1.3;
    moonMesh.scale.set(.12,.12,.12)
    moonMesh.castShadow = true;
    earthMesh.add(moonMesh)
    objects.push(moonMesh);

    // Mercury

    const mercuryMaterial = new THREE.MeshPhongMaterial({color: 'brown', emissive: 'black'});
    const mercuryMesh = new THREE.Mesh(geometry, mercuryMaterial);
    mercuryMesh.position.x = 1;
    mercuryMesh.scale.set(.06,.06,.06)
    mercuryMesh.receiveShadow = true;
    mercuryCenter.add(mercuryMesh);

     // Venus

     const venusMaterial = new THREE.MeshPhongMaterial({color: 'brown', emissive: 'black'});
     const venusMesh = new THREE.Mesh(geometry, venusMaterial);
     venusMesh.position.x = 1.4;
     venusMesh.scale.set(.12,.12,.12)
     venusMesh.receiveShadow = true;
     venusCenter.add(venusMesh);

    // Mars

    const marsMaterial = new THREE.MeshPhongMaterial({color: '#FFDFE0', emissive: '#380000'});
    const marsMesh = new THREE.Mesh(geometry, marsMaterial);
    const deimos = new THREE.Mesh(geometry, marsMaterial);
    const phobos = new THREE.Mesh(geometry, marsMaterial);
    deimos.position.set(2, 0, 0)
    deimos.scale.set(.2,.2,.2)
    phobos.position.set(-1.2, -2.8, 1)
    phobos.scale.set(.3,.3,.3)

    
    objects.push(deimos)
    objects.push(phobos)

    marsMesh.position.x = 2.8;
    marsMesh.scale.set(.09,.09,.09)
    marsMesh.receiveShadow = true;
    marsMesh.add(deimos)
    marsMesh.add(phobos)
    objects.push(marsMesh)
    marsCenter.add(marsMesh);


    // Jupiter

    const jupiterMaterial = new THREE.MeshPhongMaterial({color: '#FFDFE0', emissive: '#380000'});
    const jupiterMesh = new THREE.Mesh(geometry, jupiterMaterial);
    jupiterMesh.position.set(3.4, -1, 0);
    jupiterMesh.scale.set(.45,.45,.45)
    jupiterMesh.receiveShadow = true;
    jupiterCenter.add(jupiterMesh);

     // Saturn

     const saturnMaterial = new THREE.MeshPhongMaterial({color: '#FFDFE0', emissive: '#380000'});
     const saturnMesh = new THREE.Mesh(geometry, saturnMaterial);
     const saturnBarzGeometry = new THREE.RingBufferGeometry(1, 1.4, 30)
     const saturnBarzMaterial = new THREE.MeshPhongMaterial({color: '#222222', emissive: '#222222'})
     const saturnBarzMesh = new THREE.Mesh(saturnBarzGeometry, saturnBarzMaterial)
     saturnBarzMesh.rotation.x -= .5
     saturnMesh.position.x = 4.5;
     saturnMesh.scale.set(.35,.35,.35)
     saturnMesh.receiveShadow = true;
     saturnMesh.add(saturnBarzMesh)
     saturnCenter.add(saturnMesh);

 
    // Plane to make the Sun shine
    geometry = new THREE.PlaneGeometry(100, 100, 1);
    material = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: .8});
    const plane = new THREE.Mesh(geometry, material);
    plane.receiveShadow = true;
    plane.position.z = -1;
    

    // Light
    const light = new THREE.PointLight(0xffffaa, 50, 66 )
    light.position.z = .1
    light.castShadow = true;    
    
    sun.add(light)  

    scene.add(stars)
    scene.add(mercuryCenter)
    scene.add(venusCenter)
    scene.add(marsCenter)
    scene.add(jupiterCenter)
    scene.add(saturnCenter)


    scene.add(asteroidCenter)

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512;  // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = .5;       // default
    light.shadow.camera.far = 500      // default 

    for (let i = 0; i < 5000; i++) {
        let geometry = new THREE.SphereGeometry(.004, 5, 5)
        let material = new THREE.MeshPhongMaterial({color: 0xffeeee})
        let star = new THREE.Mesh(geometry, material)
        star.position.set(getRandom(-8, 8), getRandom(-8, 8), 0)
        stars.add(star)
    }    

    scene.add(sun);
    scene.add(plane);

    renderer.render(scene, camera);


    function render(time) {
        time *= .0015;  // конвертировать время в секунды
        
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        stars.rotation.z = time / 16


        objects.forEach((obj) => {
            obj.rotation.z = time;
          });

        mercuryCenter.rotation.z = time * 2
        venusCenter.rotation.z = time * 1.5
        marsCenter.rotation.z = time / 1.5
        jupiterCenter.rotation.z = time / 2
        saturnCenter.rotation.z = time / 2.5



        renderer.render(scene, camera);
       
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);

    

}
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
}
init()

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }