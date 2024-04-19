//const { OrbitControls } = require("three")

//const { SpotLight } = require("three")

//const { sRGBEncoding } = require("three")

let scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)
let meuCanvas = null
let flag = 0
meuCanvas = document.getElementById('meuCanvas')

if (meuCanvas == null){
    meuCanvas = document.getElementById('meuCanvasPopup')
    flag = 1
}

renderer = new THREE.WebGLRenderer({canvas: meuCanvas, antialiasing:true})
var clientWidth = meuCanvas.clientWidth
var clientHeight = meuCanvas.clientHeight;
renderer.setSize(clientWidth,clientHeight)
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 4;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.shadowMap.enabled = true
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(2);

if (flag){
    document.getElementById('popup-canvas-id').appendChild(renderer.domElement)
}else{
    document.getElementById('threejs_canvas').appendChild(renderer.domElement)
}

let camera = new THREE.PerspectiveCamera(60,clientWidth/clientHeight,1,1000)
camera.position.set(-5,8,13)
//camera.lookAt(0,2,0)

let relogio = new THREE.Clock()
let misturador = new THREE.AnimationMixer(scene)
let elementos = []

//Texturas Materiais - Madeira

var wood_vintage = new THREE.TextureLoader().load("models/textures/wood1.jpg")
var wood_gray = new THREE.TextureLoader().load("models/textures/wood2.jpg")
var wood_pinho = new THREE.TextureLoader().load("models/textures/wood3.jpg")

wood_vintage.magFilter = THREE.LinearFilter;
wood_gray.magFilter = THREE.LinearFilter;
wood_pinho.magFilter = THREE.LinearFilter;

wood_vintage.encoding = THREE.sRGBEncoding
wood_gray.encoding = THREE.sRGBEncoding
wood_pinho.encoding = THREE.sRGBEncoding
 
var wood_vintage_material = new THREE.MeshPhysicalMaterial( { map: wood_vintage } )
var wood_gray_material = new THREE.MeshPhysicalMaterial( { map: wood_gray } )
var wood_pinho_material = new THREE.MeshPhysicalMaterial( { map: wood_pinho } )


//Dar render a todos os planos (omissao apenas da render ao front side)

wood_vintage_material.side = THREE.DoubleSide
wood_gray_material.side = THREE.DoubleSide
wood_pinho_material.side = THREE.DoubleSide

//Texturas Materiais - Portas

var vidro = new THREE.TextureLoader().load("models/textures/vidro.png")
var palhinha = new THREE.TextureLoader().load("models/textures/palhinha.png")
var couro = new THREE.TextureLoader().load("models/textures/couro.jpg")

vidro.encoding = THREE.sRGBEncoding
palhinha.encoding = THREE.sRGBEncoding
couro.encoding = THREE.sRGBEncoding

//Configurar texturas para ficarem iguais às imagens

couro.wrapS = THREE.RepeatWrapping;
couro.wrapT = THREE.RepeatWrapping;
couro.repeat.set(4,4);

palhinha.wrapS = THREE.RepeatWrapping;
palhinha.wrapT = THREE.RepeatWrapping;
palhinha.repeat.set(6,6);

var vidro_material = new THREE.MeshPhysicalMaterial( { map: vidro } )
var palhinha_material = new THREE.MeshPhysicalMaterial( { map: palhinha } )
var couro_material = new THREE.MeshPhysicalMaterial( { map: couro } )

//Tornar vidro transparente
vidro_material.roughness = 0
vidro_material.transmission = 1

//Dar render a todos os planos (omissao apenas da render ao front side)

vidro_material.side = THREE.DoubleSide
palhinha_material.side = THREE.DoubleSide
couro_material.side = THREE.DoubleSide

//Texturas - Materiais Maçanetas

var handler_metal = new THREE.TextureLoader().load("models/textures/handler_metal.png")
var handler_white = new THREE.TextureLoader().load("models/textures/handler_white.jpg")
var handler_preto = new THREE.TextureLoader().load("models/textures/handler_preto.jpg")

handler_metal.encoding = THREE.sRGBEncoding
handler_white.encoding = THREE.sRGBEncoding
handler_preto.encoding = THREE.sRGBEncoding

var handler_metal_material = new THREE.MeshPhysicalMaterial( { map: handler_metal } )
var handler_white_material = new THREE.MeshPhysicalMaterial( { map: handler_white } )
var handler_preto_material = new THREE.MeshPhysicalMaterial( { map: handler_preto } )

//Dar render a todos os planos (omissao apenas da render ao front side)

handler_metal_material.side = THREE.DoubleSide
handler_white_material.side = THREE.DoubleSide
handler_preto_material.side = THREE.DoubleSide

//fps

// var stats = new Stats()
// stats.showPanel(0)
// document.body.appendChild(stats.domElement)

let teste = []

var abrirPortaEsq, abrirPortaDir, abrirGavetaBaixo, abrirGavetaTopo

new THREE.GLTFLoader().load(
    'models/MovelAnimacoes.gltf',
    function (gltf) {
    scene.add(gltf.scene)

    //Porta Esquerda

    acaoPortaEsqAbrir = THREE.AnimationClip.findByName(gltf.animations,'AbrirPortaEsq')
    abrirPortaEsq = misturador.clipAction(acaoPortaEsqAbrir)
    abrirPortaEsq.loop = THREE.LoopOnce
    abrirPortaEsq.clampWhenFinished = true

    //Porta Direita

    acaoPortaDirAbrir = THREE.AnimationClip.findByName(gltf.animations,'AbrirPortaDir')
    abrirPortaDir = misturador.clipAction(acaoPortaDirAbrir)
    abrirPortaDir.loop = THREE.LoopOnce
    abrirPortaDir.clampWhenFinished = true

    //Gaveta Topo

    acaoGavetaTopoAbrir = THREE.AnimationClip.findByName(gltf.animations,'AbrirGavetaTopo')
    abrirGavetaTopo = misturador.clipAction(acaoGavetaTopoAbrir)
    abrirGavetaTopo.loop = THREE.LoopOnce
    abrirGavetaTopo.clampWhenFinished = true

    //Gaveta Baixo

    acaoGavetaBaixoAbrir = THREE.AnimationClip.findByName(gltf.animations,'AbrirGavetaBaixo')
    abrirGavetaBaixo = misturador.clipAction(acaoGavetaBaixoAbrir)
    abrirGavetaBaixo.loop = THREE.LoopOnce
    abrirGavetaBaixo.clampWhenFinished = true

    //Toalha Animacao

    acaoToalha = THREE.AnimationClip.findByName(gltf.animations,'toalhaAction')
    toalhaAnimacao = misturador.clipAction(acaoToalha)
    toalhaAnimacao.loop = THREE.LoopOnce
    toalhaAnimacao.clampWhenFinished = true

    scene.traverse( function(x) {
        if (x.isMesh) {
            x.castShadow = true
            x.receiveShadow = true	
            if(x.material.map) x.material.map.anisotropy = 16	
        }

        //objetos
        elementos.push(x);

        shelf_up = scene.getObjectByName('parteleira_1')
        shelf_down = scene.getObjectByName('parteleira')

        rack = scene.getObjectByName('rack')

        doorLeft = scene.getObjectByName('portaEsq')
        doorRight = scene.getObjectByName('portaDir')
        
        doorLeft_wood = scene.getObjectByName('portaEsq_1')
        doorRight_wood = scene.getObjectByName('portaDir_1')

        drawerDown = []
        drawerDown.push (scene.getObjectByName('gavetaBaixo'))
        drawerDown.push (scene.getObjectByName('gavetaBaixo_1'))

        drawerUp = []
        drawerUp.push (scene.getObjectByName('gavetaCima'))
        drawerUp.push (scene.getObjectByName('gavetaCima_1'))

        handlers = []
        handlers.push (scene.getObjectByName('portaEsq_2'))
        handlers.push (scene.getObjectByName('portaDir_2'))
        handlers.push (scene.getObjectByName('gavetaCima_2'))
        handlers.push (scene.getObjectByName('gavetaBaixo_2'))

        roomElements = []

        roomElements.push (scene.getObjectByName('floor'))
        roomElements.push (scene.getObjectByName('wall1'))
        roomElements.push (scene.getObjectByName('wall2'))
        roomElements.push (scene.getObjectByName('wall3'))
        roomElements.push (scene.getObjectByName('ceiling'))

        consoleElements = []

        router = []

        elementos.forEach(element => {
            if (element.name.includes('PS4')){
                element.visible = false
                consoleElements.push(element)
            }

            if (element.name.includes('router')){
                element.visible = false
                router.push(element)
            }

            if (element.name.includes('toalha')){
                element.visible = false
                toalha = element
            }
        });

        tv = scene.getObjectByName('TV')
        rug = scene.getObjectByName('rug')
        
    })

    tv.visible = false
    rug.visible = false

    } 
)

console.log(elementos)
//console.log(floor)

//Auxiliares

let controls

var orbitcontrols_function = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            controls = new THREE.OrbitControls(camera, renderer.domElement)
            controls.enableDamping = true

            controls.maxPolarAngle = Math.PI / 2.1
            controls.rotateSpeed = 0.6
            controls.enablePan = false;
            controls.target.set(0,0,0)

            controls.maxDistance = 20
            controls.minDistance = 12

            controls.maxAzimuthAngle = Math.PI / 2.1
            controls.minAzimuthAngle = - Math.PI / 2.1

            controls.panSpeed = 0.6
            // do something
        }
    };
})();

orbitcontrols_function()



//Raycaster

const raycaster = new THREE.Raycaster()
const rato  = new THREE.Vector2()

meuCanvas.onclick = function (evento){

    let canvasBounds = meuCanvas.getBoundingClientRect()

    rato.x = ((evento.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
    rato.y = -((evento.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;

    getElementos()
}

function getElementos () {

    raycaster.setFromCamera(rato,camera)

    var intersetados = raycaster.intersectObjects(elementos)

    console.log(intersetados.length)

    if (intersetados.length > 0){

        if(intersetados[0].object.name.includes('portaEsq')){
            console.log(intersetados[0].object.name)
            portaEsq ()
        }

        if(intersetados[0].object.name.includes('portaDir')){
            console.log(intersetados[0].object.name)
            portaDir ()
        }

        if (intersetados[0].object.name.includes('gavetaCima')){
            console.log(intersetados[0].object.name)
            gavetaTopo ()
        }
        
        if (intersetados[0].object.name.includes('gavetaBaixo')){
            console.log(intersetados[0].object.name)
            gavetaBaixo ()
        }
    }

    //renderer.render(scene,camera)
}

/*function addLights(){
    const lightAmb = new THREE.AmbientLight(0xffffff, 0.5); 
    scene.add(lightAmb);

    const lightDir = new THREE.DirectionalLight(0xE5E5DA);
    lightDir.position.copy(camera.position);
    lightDir.castShadow = true
    scene.add(lightDir.target); 
    
    lightDir.position.copy(camera.position)

    const dlHelper = new THREE.DirectionalLightHelper(lightDir, 1, 0xFF0000);
    scene.add(dlHelper);
}*/

//Constantes


//Porta Esquerda

var estadoPortaEsq = false

function portaEsq () {

    if(!estadoPortaEsq){
        abrirPortaEsq.timeScale = 1
        abrirPortaEsq.paused = false //por causa do clamp when finished
        abrirPortaEsq.play()
        estadoPortaEsq = true
    }else{
        estadoPortaEsq = false
        abrirPortaEsq.paused = false
        abrirPortaEsq.timeScale = -1 
    }
}

//document.getElementById('porta_esq').onclick = portaEsq

//Porta Direita

var estadoPortaDir = false

function portaDir () {

    if(!estadoPortaDir){
        abrirPortaDir.timeScale = 1
        abrirPortaDir.paused = false //por causa do clamp when finished
        abrirPortaDir.play()
        estadoPortaDir = true
    }else{
        estadoPortaDir = false
        abrirPortaDir.paused = false
        abrirPortaDir.timeScale = -1 
    }
}

//document.getElementById('porta_dir').onclick = portaDir

//Gaveta Topo

var estadoGavetaTopo = false

function gavetaTopo () {

    if(!estadoGavetaTopo){
        abrirGavetaTopo.timeScale = 1
        abrirGavetaTopo.paused = false //por causa do clamp when finished
        abrirGavetaTopo.play()
        estadoGavetaTopo = true
    }else{
        estadoGavetaTopo = false
        abrirGavetaTopo.paused = false
        abrirGavetaTopo.timeScale = -1 
    }
}

//document.getElementById('gaveta_topo').onclick = gavetaTopo

//Gaveta Baixo

var estadoGavetaBaixo = false

function gavetaBaixo () {

    if(!estadoGavetaBaixo){
        abrirGavetaBaixo.timeScale = 1
        abrirGavetaBaixo.paused = false //por causa do clamp when finished
        abrirGavetaBaixo.play()
        estadoGavetaBaixo = true
    }else{
        estadoGavetaBaixo = false
        abrirGavetaBaixo.paused = false
        abrirGavetaBaixo.timeScale = -1 
    }
}

//document.getElementById('gaveta_baixo').onclick = gavetaBaixo

//CAMERAS PREDEFINIDAS

document.getElementById('vista_cima').onclick = function (){ //pode ser necessario alterar consoante a resolução
    camera.position.set(-8.768165240764157,6.490410025520133,12.19087865961858)
    controls.target.set(0.11311109575047017,1.6637803796375954,-0.2839608935948695)
}

document.getElementById('vista_frente').onclick = function (){ //pode ser necessario alterar consoante a resolução
    camera.position.set(-0.6797061054461624,6.624899545333824,14.118079434286551)
    controls.target.set(0.11311109575047017,1.6637803796375954,-0.2839608935948695)
}

document.getElementById('vista_esq').onclick = function (){ //pode ser necessario alterar consoante a resolução
    camera.position.set(-14.258902102778586,7.019887037912802,6.815534672389578)
    controls.target.set(0.1660393191713133,1.8434095136069273,-0.08283074745745936)
}

document.getElementById('vista_dir').onclick = function (){ //pode ser necessario alterar consoante a resolução
    camera.position.set(14.258902102778586,7.019887037912802,6.815534672389578)
    controls.target.set(0.1660393191713133,1.8434095136069273,-0.08283074745745936)
}

//Mudar materiais

document.getElementById('madeira_vint').onclick = function(){
    rack.material = wood_vintage_material
    shelf_up.material = wood_vintage_material
    shelf_down.material = wood_vintage_material
    doorRight_wood.material = wood_vintage_material
    doorLeft_wood.material = wood_vintage_material
    drawerDown.forEach(element => {
        element.material = wood_vintage_material
    });
    drawerUp.forEach(element => {
        element.material = wood_vintage_material
    });
    
}

document.getElementById('madeira_cinza').onclick = function(){
    rack.material = wood_gray_material
    shelf_up.material = wood_gray_material
    shelf_down.material = wood_gray_material
    doorRight_wood.material = wood_gray_material
    doorLeft_wood.material = wood_gray_material
    drawerDown.forEach(element => {
        element.material = wood_gray_material
    });
    drawerUp.forEach(element => {
        element.material = wood_gray_material
    });
}

document.getElementById('madeira_pinho').onclick = function(){
    rack.material = wood_pinho_material
    shelf_up.material = wood_pinho_material
    shelf_down.material = wood_pinho_material
    doorRight_wood.material = wood_pinho_material
    doorLeft_wood.material = wood_pinho_material
    drawerDown.forEach(element => {
        element.material = wood_pinho_material
    });
    drawerUp.forEach(element => {
        element.material = wood_pinho_material
    });
}

document.getElementById('vidro').onclick = function(){
    doorRight.material = vidro_material
    doorLeft.material = vidro_material
}

document.getElementById('palhinha').onclick = function(){
    doorRight.material = palhinha_material
    doorLeft.material = palhinha_material
}

document.getElementById('couro').onclick = function(){
    doorRight.material = couro_material
    doorLeft.material = couro_material
}

document.getElementById('handler_metal').onclick = function(){
    handlers.forEach(element => {
        element.material = handler_metal_material
    });
}

document.getElementById('handler_branco').onclick = function(){
    handlers.forEach(element => {
        element.material = handler_white_material
    });
}

document.getElementById('handler_preto').onclick = function(){
    handlers.forEach(element => {
        element.material = handler_preto_material
    });
}

window.onclick = function () {

    document.getElementById('ambienteBranco').onclick = function(){
        roomElements.forEach(element => {

            if (!element.visible){
                return
            }

            element.visible = false
        });
        ambienteBrancoLights()
        controls.maxAzimuthAngle = Infinity
        controls.minAzimuthAngle = Infinity
    }

    document.getElementById('salaEstar').onclick = function(){
        roomElements.forEach(element => {

            if (element.visible){
                return
            }

            element.visible = true
        });
        roomLights()
        controls.maxAzimuthAngle = Math.PI / 2.1
        controls.minAzimuthAngle = - Math.PI / 2.1
    }

    document.getElementById('televisao').onclick = function(){
        if (tv.visible){
            tv.visible = false
        }else{
            tv.visible = true
        } 
    }

    document.getElementById('tapete').onclick = function(){
        if (rug.visible){
            rug.visible = false
        }else{
            rug.visible = true
        } 
    }

    document.getElementById('consola').onclick = function(){
        consoleElements.forEach(element => {
            if (element.visible){
                element.visible = false
            }else{
                element.visible = true
            }
        });
    }

    document.getElementById('router').onclick = function(){
        router.forEach(element => {
            if (element.visible){
                element.visible = false
            }else{
                element.visible = true
            }
        });
    }

    document.getElementById('toalha').onclick = function(){
        if (toalha.visible){
            toalha.visible = false
        }else{
            toalha.visible = true
            toalhaAnimacao.reset()
            toalhaAnimacao.play()
        }
    }

}

let lightDir = new THREE.DirectionalLight(0xffa95c)
let lightAmbBranco = new THREE.AmbientLight(0xffffff, 0.8)
let lightAmb = new THREE.AmbientLight(0xffffff, 0.5)

function ambienteBrancoLights (){
    lightDir.visible = false
    lightAmb.visible = false
    lightAmbBranco.visible = true
    scene.add(lightAmbBranco)
}

function roomLights (){
    lightAmbBranco.visible = false
    lightDir.visible = true
    lightAmb.visible = true
    // adicionar luz para sala
    lightDir.position.set(17,7,12)
    lightDir.castShadow = true
    lightDir.shadow.bias = -0.0001
    lightDir.shadow.mapSize.width = 1024
    lightDir.shadow.mapSize.height = 1024
}

var lightsOnce = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            scene.add(lightAmb)
            roomLights()
            scene.add(lightDir)
        }
    };
})();

function animate() {

    requestAnimationFrame(animate)

    controls.update()
    //stats.update()
    misturador.update(relogio.getDelta())
    renderer.render(scene, camera)
}

lightsOnce()
window.requestAnimationFrame(animate)
animate()

