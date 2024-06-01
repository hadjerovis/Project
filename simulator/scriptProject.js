window.onload = function() {
    // Get the canvas
    var canvas = document.getElementById("renderCanvas");
    // The engine
    var engine = new BABYLON.Engine(canvas, true);
    
    // Check for the availability of RENDERER extension
    var rendererInfoExtension = engine._gl.getExtension('WEBGL_debug_renderer_info');
    var renderer = rendererInfoExtension ? engine._gl.getParameter(rendererInfoExtension.UNMASKED_RENDERER_WEBGL) : null;
    console.log('WebGL Renderer:', renderer || 'Unknown');
    
    // The scene
    var scene = new BABYLON.Scene(engine);
    
    // The camera
    var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 10, new BABYLON.Vector3(0, 3, 0), scene);
    camera.attachControl(canvas, true);
    
    // Lighting
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    
    // Materials
    var wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
    wallMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("textures/wood_texture2.jpg", scene);
    var roofMaterial = new BABYLON.StandardMaterial("roofMaterial", scene);
    
    // The walls
    var wall1 = BABYLON.MeshBuilder.CreateBox("wall1", { width: 10, height: 6, depth: 0.1 }, scene);
    wall1.material = wallMaterial;
    wall1.position = new BABYLON.Vector3(0, 3, -5); 
    
    var wall2 = BABYLON.MeshBuilder.CreateBox("wall2", { width: 10, height: 6, depth: 0.1 }, scene);
    wall2.material = wallMaterial;
    wall2.rotation.y = Math.PI / 2;
    wall2.position = new BABYLON.Vector3(-5, 3, 0); 
    
    var wall3 = BABYLON.MeshBuilder.CreateBox("wall3", { width: 10, height: 6, depth: 0.1 }, scene);
    wall3.material = wallMaterial;
    wall3.rotation.y = -Math.PI / 2;
    wall3.position = new BABYLON.Vector3(5, 3, 0);
    
    // The ground
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    ground.material = groundMaterial;
    
    // The roof
    var roof = BABYLON.MeshBuilder.CreateBox("roof", { width: 10, height: 0.1, depth: 10 }, scene);
    roof.material = roofMaterial;
    roof.position = new BABYLON.Vector3(0, 6, 0);
    
    // Function to load and add furniture models
    function loadFurnitureModel(modelName, position) {
        let modelPath = "";
        switch (modelName) {
            case "bohemian_armchair":
                modelPath = "furniture_models/boho_armchair1.glb";
                break;
            case "bohemian_bed1":
                modelPath = "furniture_models/boho_bed1.glb";
                break;
            case "bohemian_bed2":
                modelPath = "furniture_models/boho_bed2.glb";
                break;
            case "bohemian_drawer":
                modelPath = "furniture_models/boho_drawer.glb";
                break;
            case "bohemian_mirror":
                modelPath = "furniture_models/boho_mirror.glb";
                break;
            case "bohemian_plant1":
                modelPath = "furniture_models/boho_plant1.glb";
                break;
            case "bohemian_plant2":
                modelPath = "furniture_models/boho_plant2.glb";
                break;
            case "victorian_armchair":
                modelPath = "furniture_models/vic_armchair1.glb";
                break;
            case "victorian_bed1":
                modelPath = "furniture_models/vic_bed1.glb";
                break;
            case "victorian_bed2":
                modelPath = "furniture_models/vic_bed2.glb";
                break;
            case "victorian_bed3":
                modelPath = "furniture_models/vic_bed3.glb";
                break;        
            case "victorian_drawer":
                modelPath = "furniture_models/vic_drawer1.glb";
                break;
            case "victorian_dressing_table":
                modelPath = "furniture_models/vic_drestab.glb";
                break;
            case "victorian_chessr":
                modelPath = "furniture_models/vic_chess.glb";
                break;
            case "minimalist_armchair1":
                modelPath = "furniture_models/mini_armchair1.glb";
                break;
            case "minimalist_armchair2":
                modelPath = "furniture_models/mini_armchair2.glb";
                break;
            case "minimalist_bed1":
                modelPath = "furniture_models/mini_bed1.glb";
                break;
            case "minimalist_bed2":
                modelPath = "furniture_models/mini_bed2.glb";
                break;
            case "minimalist_bed3":
                modelPath = "furniture_models/mini_bed3.glb";
                break;
            case "minimalist_drawer":
                modelPath = "furniture_models/mini_drawer1.glb";
                break;
            case "minimalist_dressing_table":
                modelPath = "furniture_models/mini_drestab.glb";
                break;
        }

        console.log(`Loading model: ${modelName}, from path: ${modelPath} to position: ${position}`);

        if (modelPath) {
            BABYLON.SceneLoader.ImportMesh("", modelPath, "", scene, function (meshes) {
                console.log(`Loaded model: ${modelName}`);
                meshes.forEach(function(mesh) {
                    mesh.position = position;
                    mesh.isPickable = true;
                    // Add double-click event to remove mesh
                    mesh.actionManager = new BABYLON.ActionManager(scene);
                    mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnDoublePickTrigger, function () {
                        mesh.dispose();
                    }));
                });
            }, null, function(scene, message) {
                console.error(`Error loading model ${modelName} from path ${modelPath}: ${message}`);
            });
        }
    }
    
    // Function to add furniture on click
    function addFurnitureOnClick(modelName) {
        const defaultPosition = new BABYLON.Vector3(0, 0, 0);
        loadFurnitureModel(modelName, defaultPosition);
    }
    
    document.querySelectorAll('.furniture').forEach(function(item) {
        item.addEventListener('click', function(event) {
            var modelName = event.currentTarget.getAttribute('data-model');
            console.log(`Placing model: ${modelName}`);
            addFurnitureOnClick(modelName);
        });
    });
    // Function to change textures
    function changeTextures(style) {
        switch (style) {
            case "bohemian":
                wallMaterial.diffuseTexture = new BABYLON.Texture("textures/wood_texture.jpg", scene);
                groundMaterial.diffuseTexture = new BABYLON.Texture("textures/wood_texture.jpg", scene);
                roofMaterial.diffuseTexture = new BABYLON.Texture("textures/wood_texture.jpg", scene);
                break;
            case "victorian":
                wallMaterial.diffuseTexture = new BABYLON.Texture("textures/wood_texture.jpg", scene);
                groundMaterial.diffuseTexture = new BABYLON.Texture("textures/wood_texture.jpg", scene);
                roofMaterial.diffuseTexture = new BABYLON.Texture("textures/wood_texture.jpg", scene);
                break;
            case "minimalist":
                wallMaterial.diffuseTexture = new BABYLON.Texture("textures/wood_texture.jpg", scene);
                groundMaterial.diffuseTexture = new BABYLON.Texture("textures/wood_texture.jpg", scene);
                roofMaterial.diffuseTexture = new BABYLON.Texture("textures/wood_texture.jpg", scene);
                break;
        }
    }
    
    document.querySelectorAll('.style-button').forEach(function(item) {
        item.addEventListener('click', function(event) {
            var style = event.currentTarget.getAttribute('data-style');
            console.log(`Changing textures to: ${style}`);
            changeTextures(style);
        });
    });
    
    // Dragging functionality
    var selectedMesh = null;
    var startingPoint = null;
    var getGroundPosition = function() {
        var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function(mesh) { return mesh == ground; });
        if (pickinfo.hit) {
            return pickinfo.pickedPoint;
        }
        return null;
    }
    var onPointerDown = function(evt) {
        if (evt.button !== 0) {
            return;
        }
        var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickInfo.hit && pickInfo.pickedMesh != ground) {
            selectedMesh = pickInfo.pickedMesh;
            startingPoint = getGroundPosition();
            if (startingPoint) {
                setTimeout(function() {
                    camera.detachControl(canvas);
                }, 0);
            }
        }
    }
    var onPointerUp = function() {
        if (startingPoint) {
            camera.attachControl(canvas, true);
            startingPoint = null;
            return;
        }
        selectedMesh = null;
    }
    var onPointerMove = function(evt) {
        if (!startingPoint) {
            return;
        }
        var current = getGroundPosition();

        if (!current) {
            return;
        }
        var diff = current.subtract(startingPoint);
        selectedMesh.position.addInPlace(diff);
        startingPoint = current;
    }
    canvas.addEventListener("pointerdown", onPointerDown, false);
    canvas.addEventListener("pointerup", onPointerUp, false);
    canvas.addEventListener("pointermove", onPointerMove, false);
     // Function to rotate furniture 
  function rotateFurniture(furnitureMesh, direction) {
    switch (direction) {
      case "left":
        furnitureMesh.rotation.y = Math.PI / 2; // Rotates 90 degrees on the Y-axis to the left
        break;
      case "right":
        furnitureMesh.rotation.y = -Math.PI / 2; // Rotates -90 degrees on the Y-axis to the right
        break;
      default:
        console.warn(`Invalid direction provided for furniture rotation: ${direction}`);
    }
  }
  // Add event listeners to furniture buttons 
  document.querySelectorAll('.furniture').forEach(function(item) {
    item.addEventListener('click', function(event) {
      var modelName = event.currentTarget.getAttribute('data-model');
      console.log(`Placing model: ${modelName}`);
      addFurnitureOnClick(modelName);
    });
    
    // Add click event listener for rotation buttons 
    const rotateLeftButton = item.querySelector('.rotate-left');
    if (rotateLeftButton) {
      rotateLeftButton.addEventListener('click', function() {
        const furnitureMesh = scene.getMeshesByName(modelName)[0];
        rotateFurniture(furnitureMesh, "left");
      });
    }
    
    const rotateRightButton = item.querySelector('.rotate-right');
    if (rotateRightButton) {
      rotateRightButton.addEventListener('click', function() {
        const furnitureMesh = scene.getMeshesByName(modelName)[0]; 
        rotateFurniture(furnitureMesh, "right");
      });
    }
  });
    // Zoom in and zoom out functionality
    document.getElementById('zoomIn').addEventListener('click', function() {
        camera.radius -= 1;
    });
    document.getElementById('zoomOut').addEventListener('click', function() {
        camera.radius += 1;
    });
    
    // Run the render loop
    engine.runRenderLoop(function() {
        scene.render();
    });

    // Resize event
    window.addEventListener("resize", function() {
        engine.resize();
    });
};
