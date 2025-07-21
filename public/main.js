/**
 * SETUP RENDER
*/
//#region Initialization
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
let renderer = new THREE.WebGLRenderer();
//RENDER SIZE
renderer.setSize(window.innerWidth, window.innerHeight);

// Add renderer to the page
const container = document.getElementById('scene-container');
if (container) {
  container.appendChild(renderer.domElement);
  // Center the renderer in the container
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
} else {
  document.body.appendChild(renderer.domElement);
  // Center the renderer in the body
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
}
/**
 * END SETUP RENDER
 */
//#endregion

//Mouse
let mouseX = -1;
let mouseY = -1;
let clickMouseX = -1;
let clickMouseY = -1;
let leftMouseDown = false;
let middleMouseDown = false;
let rightMouseDown = false;

//Camera
let cameraYaw = 0;
let cameraPitch = 0;
let cameraDistance = 5;
let cameraTarget = new THREE.Vector3(0, 0, 0);
let rotationSpeed = 0.005;

let isSimulating = false;

camera.position.set(0, 0, cameraDistance);
camera.lookAt(cameraTarget);

// Top light (white, bright)
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(0, 10, 0);
topLight.castShadow = true;
scene.add(topLight);

// Bottom light
const bottomLight = new THREE.DirectionalLight(0xffe6cc, 0.5);
bottomLight.position.set(0, -10, 0);
scene.add(bottomLight);

// Ambient light 
const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
scene.add(ambientLight);

/**
 * EVENT LISTENERS
 */
//#region Initialization
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('mousedown', (event) => {
  clickMouseX = event.clientX;
  clickMouseY = event.clientY;

  //Left Click
  if (event.button == 0) {
    leftMouseDown = true;

    let cube = spawnCube(event, 100, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], 10);
    
    console.log(`Added sphere at position: (${cube.position.x.toFixed(2)}, ${cube.position.y.toFixed(2)}, ${cube.position.z.toFixed(2)})`);
  }
  //Middle Click
  if (event.button == 1) {
    middleMouseDown = true;
  }
  //Right Click
  if (event.button == 2) {
    rightMouseDown = true;
  }
});

document.addEventListener('mouseup', (event) => {
  //Left Click
  if (event.button == 0) {
    leftMouseDown = false;
  }
  //Middle Click
  if (event.button == 1) {
    middleMouseDown = false;
  }
  //Right Click
  if (event.button == 2) {
    rightMouseDown = false;
  }
});

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});


document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  //Rotate camera
  if (rightMouseDown) {
    const deltaX = mouseX - clickMouseX;
    const deltaY = mouseY - clickMouseY;

    cameraYaw += deltaX * rotationSpeed;
    cameraPitch += deltaY * rotationSpeed;
    
    cameraPitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, cameraPitch));

    camera.position.x = cameraDistance * Math.sin(cameraYaw) * Math.cos(cameraPitch);
    camera.position.y = cameraDistance * Math.sin(cameraPitch);
    camera.position.z = cameraDistance * Math.cos(cameraYaw) * Math.cos(cameraPitch);

    camera.lookAt(cameraTarget);

    clickMouseX = event.clientX;
    clickMouseY = event.clientY;
  }

});

document.addEventListener('DOMContentLoaded', () => {
  const simulateButton = document.getElementById("B_simulate");
  if (simulateButton) {
    isSimulating = true;
    simulateButton.addEventListener("click", sendSimulation);
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const addPositionButton = document.getElementById("B_sendPositions")
  const inputValueX = document.getElementById("I_PositionX")
  const inputValueY = document.getElementById("I_PositionY")
  const inputValueZ = document.getElementById("I_PositionZ")
  if (addPositionButton) {
    simulateButton.addEventListener("click", initializeBody(
        0, 
        [inputValueX, inputValueY, inputValueZ],
        [0, 0, 0], 
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        10
    ))
  }
})

/**
 * END EVENT LISTENERS
 */
//#endregion

/**
 * LOGIC 
 */
//#region Initialization

let bodies = [];
let bodyCount = 0;

function initializeBody(mass, position, velocity, acceleration, spin, angularVelocity, angularAcceleration, color, radius) {
  if (isSimulating) return;
  
  try {
    bodies.add([
      mass,
      [cube.position.x, cube.position.y, cube.position.z],
      velocity,
      acceleration,
      spin,
      angularVelocity,
      angularAcceleration,
      color,
      radius
    ]);

    spawnCube(position[0], position[1], position[2]);
    bodyCount++;
  } catch {
    return error;
  };
}


function spawnCube(event, x, y, z) {
  let sphereGeometry = new THREE.SphereGeometry(0.1, 12, 12);
  let sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffc7bc });

  let cube = new THREE.Mesh(sphereGeometry, sphereMaterial);

  scene.add(cube);
  cube.set.position(x, y, z);
  
  return cube;
}

function sendSimulation() {
  if (bodies.size === 0) {
    alert("No points to simulate.");
    return;
  }

  Module.Simulate(bodies, bodyCount);

  console.log(`Simulation for ${bodies.size}`);

}

function getPosition(bodies) {
  const positions = [];

  bodies.forEach((body) => {
    positions.add(data.get[3])
  });

  return positions;
}

function updateMeshPositions(scene, positions) {
  const meshes = [];
  scene.traverse((object) => {
    if (object.isMesh) {
      meshes.push(object);
    }
  });

  const count = Math.min(meshes.length, Math.floor(positions.length / 3));

  for (let i = 0; i < count; i++) {
    const x = positions[i * 3];
    const y = positions[i * 3 + 1];
    const z = positions[i * 3 + 2];
    meshes[i].position.set(x, y, z);
  }
}


/**
 * END LOGIC
 */
//#endregion

/**
 * RENDER LOOP
 */
renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);

  if (isSimulating) {
    const updatedPositions = Module.getBodyData();
    updateMeshPositions(scene, updatedPositions);
  }
  
  renderer.render(scene, camera);
}

animate();

/**
 * END RENDER LOOP
 */

/**
 * WEBSOCKET IMPLEMENTATION
 */
const wsResult = document.getElementById('ws-result');
if (wsResult) {
  const ws = new WebSocket('ws://localhost:8000');
  ws.onopen = () => {
    wsResult.textContent = 'Connected. Waiting for ping...';
  };
  ws.onmessage = (event) => {
    if (event.data === 'ping') {
      wsResult.textContent = 'Received: ping (sending pong)';
      ws.send('pong');
      console.log('WebSocket: received ping, sent pong');
    } else {
      wsResult.textContent = 'Received: ' + event.data;
      console.log('WebSocket message:', event.data);
    }
  };
  ws.onerror = (err) => {
    wsResult.textContent = 'WebSocket error';
    console.error('WebSocket error:', err);
  };
  ws.onclose = () => {
    wsResult.textContent = 'WebSocket closed';
  };
} else {
  console.warn('WebSocket result element not found');
}

/**
 * WEBSOCKET IMPLEMENTATION
 */

/**
 * END WEBSOCKET IMPLEMENTATION
 */