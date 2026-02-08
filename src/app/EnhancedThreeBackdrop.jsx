import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useScroll } from 'framer-motion';

const EnhancedThreeBackdrop = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Performance optimization: Use refs to avoid re-renders
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const meshRef = useRef(null);
    const particlesRef = useRef(null);
    const frameIdRef = useRef(null);
    const resizeObserverRef = useRef(null);
    const disposedRef = useRef(false);
    const lastScrollYRef = useRef(0);

    // Check if we should render 3D based on device capabilities
    const shouldRender3D = useCallback(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches;
        const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

        return !prefersReducedMotion && !isSmallScreen && !isLowEndDevice;
    }, []);

    // Intersection Observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Initialize Three.js scene
    useEffect(() => {
        if (!isVisible || !shouldRender3D() || disposedRef.current) return;

        let mounted = true;

        const init = async () => {
            try {
                // Dynamic import for better code splitting
                const THREE = await import('three');

                if (disposedRef.current || !mounted) return;

                const canvas = canvasRef.current;
                if (!canvas) return;

                // Create scene with optimized settings
                const scene = new THREE.Scene();
                sceneRef.current = scene;

                // Create camera with optimized FOV
                const camera = new THREE.PerspectiveCamera(
                    45,
                    canvas.clientWidth / canvas.clientHeight,
                    0.1,
                    30
                );
                camera.position.z = 7.5;
                cameraRef.current = camera;

                // Create renderer with performance optimizations
                const renderer = new THREE.WebGLRenderer({
                    canvas,
                    antialias: false, // Disable for performance
                    alpha: true,
                    powerPreference: 'low-power',
                    stencil: false,
                    depth: false
                });
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                renderer.setClearColor(0x000000, 0);
                rendererRef.current = renderer;

                // Create main icosahedron mesh with optimized material
                const geometry = new THREE.IcosahedronGeometry(2.6, 1);
                const material = new THREE.MeshBasicMaterial({
                    color: '#38bdf8',
                    wireframe: true,
                    transparent: true,
                    opacity: 0.12
                });

                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
                meshRef.current = mesh;

                // Create particle system for depth effect
                const particlesGeometry = new THREE.BufferGeometry();
                const particleCount = 150;
                const positions = new Float32Array(particleCount * 3);

                for (let i = 0; i < particleCount * 3; i += 3) {
                    positions[i] = (Math.random() - 0.5) * 15;
                    positions[i + 1] = (Math.random() - 0.5) * 15;
                    positions[i + 2] = (Math.random() - 0.5) * 10 - 5;
                }

                particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

                const particlesMaterial = new THREE.PointsMaterial({
                    color: '#7dd3fc',
                    size: 0.04,
                    transparent: true,
                    opacity: 0.4,
                    sizeAttenuation: true
                });

                const particles = new THREE.Points(particlesGeometry, particlesMaterial);
                scene.add(particles);
                particlesRef.current = particles;

                // Optimized resize handler
                const resize = () => {
                    if (!canvas || !renderer || !camera) return;

                    const { width, height } = canvas.getBoundingClientRect();
                    const safeWidth = Math.max(1, width);
                    const safeHeight = Math.max(1, height);

                    renderer.setSize(safeWidth, safeHeight, false);
                    camera.aspect = safeWidth / safeHeight;
                    camera.updateProjectionMatrix();
                };

                resize();
                resizeObserverRef.current = new ResizeObserver(resize);
                resizeObserverRef.current.observe(canvas);

                // Optimized animation loop with scroll integration
                let lastTime = 0;
                const targetFPS = 30;
                const frameInterval = 1000 / targetFPS;

                const animate = (currentTime) => {
                    if (disposedRef.current || !mounted) return;

                    frameIdRef.current = requestAnimationFrame(animate);

                    // FPS throttling for performance
                    const deltaTime = currentTime - lastTime;
                    if (deltaTime < frameInterval) return;
                    lastTime = currentTime - (deltaTime % frameInterval);

                    // Get scroll progress (0 to 1)
                    const scrollProgress = Math.min(scrollY.get() / (document.body.scrollHeight - window.innerHeight), 1);

                    // Smooth scroll interpolation
                    const smoothScroll = lastScrollYRef.current + (scrollProgress - lastScrollYRef.current) * 0.1;
                    lastScrollYRef.current = smoothScroll;

                    // Rotate mesh based on scroll and time
                    if (mesh) {
                        mesh.rotation.y += 0.0008 + smoothScroll * 0.002;
                        mesh.rotation.x += 0.0005 + smoothScroll * 0.001;
                        mesh.scale.setScalar(1 + smoothScroll * 0.2);
                    }

                    // Animate particles
                    if (particles) {
                        particles.rotation.y -= 0.0003;
                        particles.position.y = smoothScroll * 2;
                    }

                    renderer.render(scene, camera);
                };

                animate(0);
                setIsLoaded(true);

            } catch (error) {
                console.warn('Three.js initialization failed:', error);
            }
        };

        init();

        return () => {
            mounted = false;
            disposedRef.current = true;

            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
            }

            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }

            // Clean up Three.js resources
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            if (meshRef.current) {
                if (meshRef.current.geometry) meshRef.current.geometry.dispose();
                if (meshRef.current.material) meshRef.current.material.dispose();
            }
            if (particlesRef.current) {
                if (particlesRef.current.geometry) particlesRef.current.geometry.dispose();
                if (particlesRef.current.material) particlesRef.current.material.dispose();
            }
        };
    }, [isVisible, scrollY]);

    // Don't render if 3D is disabled
    if (!shouldRender3D()) {
        return null;
    }

    return (
        <div ref={containerRef} className="three-backdrop-container">
            {!isLoaded && (
                <div className="three-backdrop-placeholder" />
            )}
            <canvas
                ref={canvasRef}
                className="three-backdrop"
                aria-hidden="true"
                style={{ opacity: isLoaded ? 0.35 : 0 }}
            />
        </div>
    );
};

export default React.memo(EnhancedThreeBackdrop);
