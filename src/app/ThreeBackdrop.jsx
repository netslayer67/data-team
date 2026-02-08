import React, { useEffect, useRef } from 'react';

const ThreeBackdrop = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches;

        if (prefersReducedMotion || isSmallScreen) return undefined;

        let renderer;
        let scene;
        let camera;
        let mesh;
        let geometry;
        let material;
        let pointLight;
        let ambientLight;
        let frameId;
        let resizeObserver;
        let disposed = false;

        const init = async () => {
            const THREE = await import('three');
            if (disposed) return;

            const canvas = canvasRef.current;
            if (!canvas) return;

            renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true,
                powerPreference: 'low-power'
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            renderer.setClearColor(0x000000, 0);

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, 1, 0.1, 30);
            camera.position.z = 7.5;

            geometry = new THREE.IcosahedronGeometry(2.6, 0);
            material = new THREE.MeshStandardMaterial({
                color: '#38bdf8',
                wireframe: true,
                transparent: true,
                opacity: 0.16,
                roughness: 0.4,
                metalness: 0.1
            });

            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            pointLight = new THREE.PointLight('#7dd3fc', 1.1, 20);
            pointLight.position.set(4, 4, 8);
            scene.add(pointLight);

            ambientLight = new THREE.AmbientLight('#e2f7ff', 0.7);
            scene.add(ambientLight);

            const resize = () => {
                if (!canvas) return;
                const { width, height } = canvas.getBoundingClientRect();
                const safeWidth = Math.max(1, width);
                const safeHeight = Math.max(1, height);
                renderer.setSize(safeWidth, safeHeight, false);
                camera.aspect = safeWidth / safeHeight;
                camera.updateProjectionMatrix();
            };

            resize();
            resizeObserver = new ResizeObserver(resize);
            resizeObserver.observe(canvas);

            const animate = () => {
                mesh.rotation.y += 0.0012;
                mesh.rotation.x += 0.0008;
                renderer.render(scene, camera);
                frameId = requestAnimationFrame(animate);
            };

            animate();
        };

        init();

        return () => {
            disposed = true;
            if (frameId) cancelAnimationFrame(frameId);
            if (resizeObserver) resizeObserver.disconnect();
            if (renderer) renderer.dispose();
            if (geometry) geometry.dispose();
            if (material) material.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} className="three-backdrop" aria-hidden="true" />;
};

export default React.memo(ThreeBackdrop);
