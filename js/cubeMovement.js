

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
camera.position.set(0, -4, 9);
scene.add(camera);

$(window).on('resize', function () {
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
});

// Set the background colour of the scene
renderer.setClearColor(0x333F47, 1);


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


//CUBE

//Cube Holder
var cubeList = [];

//Multiple Cube Area Size
var cubeRange = new THREE.Vector3( 100, 50, 100);

var phong = new THREE.MeshPhongMaterial( { color: 0x00ff00, specular: 0x666666, emissive: 0xff0000, shininess: 1, shading: THREE.SmoothShading, opacity: 0.9, transparent: true });

var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00}); //plain
var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ffaa});
var cube = new THREE.Mesh(cubeGeometry, phong);
var cubeTwo = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cube, cubeTwo);
cubeTwo.position.x = 2;

// Add OrbitControls so that we can pan around with the mouse
controls = new THREE.OrbitControls(camera, renderer.domElement);

var going = true;

//////////////////////////////
//ANIMATE 
//////////////////////////////
var animate = function () {
    var direction = (going) ? 0.1 : -0.1;

    requestAnimationFrame(animate);

    cube.rotation.x += 0.1;
    // cube.position.x += direction;
    // cube.position.y += 0.001
    cubeTwo.rotation.x += 0.001
    cubeTwo.rotation.y += 0.01


    for (var i = 0; i < cubeList.length; i++) {
        direction = (going) ? 1 : -1;
        if( cubeList[i].position.x > 200) {
            going = false;
        }
        if( cubeList[i].position.x < -200) {
            going = true;
        }
            cubeList[i].position.x += direction;
            cubeList[i].rotation.x -= 0.1 * Math.random();
            cubeList[i].rotation.y -= 0.1 * Math.random();
    }

    // console.log(cubeList[1].position.x)
    
    // Render the scene
    renderer.render(scene, camera);
    controls.update();

};

animate();



$(document).ready(function () {
     $( "body" ).keypress(function(e){ 
        console.log(e.keyCode);

        //UP
        if (e.keyCode === 119) {
            cubeTwo.position.y += 1;
        }
        //DOWN
        if (e.keyCode === 115) {
            cubeTwo.position.y -= 1;
        }

        //LEFT
        if (e.keyCode === 97) {
            cubeTwo.position.x -= 1;
        }
        //RIGHT
        if (e.keyCode === 100) {
            cubeTwo.position.x += 1;
        }
        //Z AXIS
        if (e.keyCode === 113) {
            cubeTwo.position.z -= 1;
        }
        if (e.keyCode === 101) {
            cubeTwo.position.z += 1;
        }
     });
    
});