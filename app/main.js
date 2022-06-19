import {loadGLTF} from "../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './assets/targets/target.mind'
        });
        
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const fish_mart = await loadGLTF('./assets/models/fish_mart/scene.gltf');
        fish_mart.scene.scale.set(0.002, 0.002, 0.002);
        fish_mart.scene.rotation.set(Math.PI/2, 0, 0);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(fish_mart.scene);
    
        await mindarThree.start();
        renderer.setAnimationLoop( () => {
            renderer.render(scene, camera);
        });
    }
    start();
});