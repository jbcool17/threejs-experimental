

var scene, camera, renderer;

// Create the scene and set the scene size
scene = new THREE.Scene();
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
var ASPECT_RATIO = WIDTH / HEIGHT;

// Create a renderer and add it to the DOM
renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);
// $('body').append(renderer);

// Create a camera, zoom it out from the model a bit, and add it to the scene
camera = new THREE.PerspectiveCamera(45, ASPECT_RATIO, 0.1, 20000);
camera.position.set(0, 30, 30);
scene.add(camera);

$(window).on('resize', function () {
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
});

// Set the background colour of the scene
renderer.setClearColor(0x00aa33, 1);


// LIGHT
// Create a light, set its position, and add it to the scene
var light = new THREE.PointLight(0xffffff);
light.position.set(-100, 200, 100);

scene.add(light);


//  $$$$$$\  $$$$$$$$\  $$$$$$\  $$\      $$\ $$$$$$$$\ $$$$$$$\ $$$$$$$$\ $$\     $$\ 
// $$  __$$\ $$  _____|$$  __$$\ $$$\    $$$ |$$  _____|$$  __$$\\__$$  __|\$$\   $$  |
// $$ /  \__|$$ |      $$ /  $$ |$$$$\  $$$$ |$$ |      $$ |  $$ |  $$ |    \$$\ $$  / 
// $$ |$$$$\ $$$$$\    $$ |  $$ |$$\$$\$$ $$ |$$$$$\    $$$$$$$  |  $$ |     \$$$$  /  
// $$ |\_$$ |$$  __|   $$ |  $$ |$$ \$$$  $$ |$$  __|   $$  __$$<   $$ |      \$$  /   
// $$ |  $$ |$$ |      $$ |  $$ |$$ |\$  /$$ |$$ |      $$ |  $$ |  $$ |       $$ |    
// \$$$$$$  |$$$$$$$$\  $$$$$$  |$$ | \_/ $$ |$$$$$$$$\ $$ |  $$ |  $$ |       $$ |    
//  \______/ \________| \______/ \__|     \__|\________|\__|  \__|  \__|       \__|   

// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(60,60);
var planeMaterial =    new THREE.MeshLambertMaterial({color: 0x00aaff});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow  = true;

// rotate and position the plane
plane.rotation.x=-0.5*Math.PI;
plane.position.x=15
plane.position.y=-1
plane.position.z=0

// add the plane to the scene
scene.add(plane);


// Add OrbitControls so that we can pan around with the mouse
controls = new THREE.OrbitControls(camera, renderer.domElement);

var going = true;


// also update the particle system to
// sort the particles which enables
// the behaviour we want


// create the particle variables
var particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture("particle.png"),
        blending: THREE.AdditiveBlending,
        transparent: true
    });

// particleSystem.sortParticles = true;

// now create the individual particles
for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vector3(pX, pY, pZ);
      

  // add it to the geometry
  particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.Points(
    particles,
    pMaterial);

// add it to the scene
scene.add(particleSystem);



//////////////////////////////
//ANIMATE 
//////////////////////////////
var animate = function () {

    particleSystem.rotation.y += 0.01;

    requestAnimationFrame(animate);
    
    // Render the scene
    renderer.render(scene, camera);
    controls.update();

};

animate();



// $(document).ready(function () {
//     init();
//     animate();
    
// });