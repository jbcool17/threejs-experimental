

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
renderer.setClearColor(0x000000, 1);


// LIGHT
// Create a light, set its position, and add it to the scene
var light = new THREE.PointLight(0xffffff);
light.position.set(-100, 200, 100);

scene.add(light);
scene.fog = new THREE.FogExp2( 0x000000, 0.001 );


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
var sprite = THREE.ImageUtils.loadTexture( "disc.png" );
var particleCount = 100,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.PointsMaterial({ size: 25, sizeAttenuation: false, map: sprite, alphaTest: 0.5, transparent: true });
    pMaterial.color.setHSL( 1.0, 5, 0.7 );


// particleSystem.sortParticles = true;

// now create the individual particles
for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vector3(pX, pY, pZ);
      
    particle.velocity = new THREE.Vector3(
      0,              // x
      -Math.random(), // y: random vel
      0);
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
    var time = Date.now() * 0.00005;
    // particleSystem.rotation.y += 0.01;
    h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
    pMaterial.color.setHSL( h, 0.5, 0.5 );
    // pMaterial.opacity = Math.random();

    for ( i = 0; i < scene.children.length; i ++ ) {

        var object = scene.children[ i ];

        var pCount = particleCount;

        if ( object instanceof THREE.Points ) {

            object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
            // object.position.x += Math.sin( time * 0.7 ) * 3;
            // object.position.y += Math.cos( time * 0.5 ) * 4;
            // object.position.z += Math.cos( time * 0.3 ) * 3;
            // while (pCount--) {

            //     // get the particle
            //     var particle = particles.vertices[pCount];

            //     // check if we need to reset
                // if (object.position.y < -200) {
                //   object.position.y = 200;
                //   object.position.y = 0;
                // }

            //     // update the velocity with
            //     // a splat of randomniz
            //     object.position.y -= Math.random() * .1;

            //     // and the position
            //     object.position.add(
            //       object.position);
            //   }

            //   // flag to the particle system
            //   // that we've changed its vertices.
            //   particleSystem.
            //     geometry.
            //     __dirtyVertices = true;

        }

    }


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