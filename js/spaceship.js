

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
    camera.position.set(-5, 5, -30);
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

    // Create a light, set its position, and add it to the scene
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 200, 100);
    scene.add(light);


    // Load in the mesh and add it to the scene
    var loader = new THREE.ObjectLoader();
    loader.load('models/star-wars-vader-tie-fighter.json', function (object) {
        // var material = new THREE.MeshLambertMaterial();
        // mesh = new THREE.Mesh(geometry, material);
        setInterval(object.position.x += 0.1, 1000);
        scene.add(object);
    });

    // Add OrbitControls so that we can pan around with the mouse
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;



var animate = function () {

    requestAnimationFrame(animate);



    // Render the scene
    renderer.render(scene, camera);
    controls.update();

};


    
    animate();
