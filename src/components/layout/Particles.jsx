import React, { useEffect, useRef } from 'react';

const Particles = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let particles = [];
        let animationId;

        // Configuración
        const config = {
            particleCount: 50,
            particleColor: '#ffffff',
            particleSize: { min: 1, max: 2.5 },
            speed: { min: 0.1, max: 0.3 },
            opacity: { min: 0.2, max: 0.5 },
            twinkleSpeed: 0.02
        };

        // Ajustar tamaño del canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        // Crear partícula
        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: config.particleSize.min + Math.random() * (config.particleSize.max - config.particleSize.min),
                speedX: (Math.random() - 0.5) * (config.speed.max - config.speed.min) + config.speed.min,
                speedY: (Math.random() - 0.5) * (config.speed.max - config.speed.min) + config.speed.min,
                opacity: config.opacity.min + Math.random() * (config.opacity.max - config.opacity.min),
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: config.twinkleSpeed * (0.5 + Math.random())
            };
        }

        // Inicializar partículas
        function initParticles() {
            particles = [];
            for (let i = 0; i < config.particleCount; i++) {
                particles.push(createParticle());
            }
        }

        // Dibujar partícula
        function drawParticle(particle) {
            const twinkleOpacity = particle.opacity * (0.7 + Math.sin(particle.twinkle) * 0.3);

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity})`;
            ctx.shadowBlur = 4;
            ctx.shadowColor = `rgba(255, 255, 255, ${twinkleOpacity * 0.5})`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Actualizar partícula
        function updateParticle(particle) {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.twinkle += particle.twinkleSpeed;

            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
        }

        // Animar
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                updateParticle(particle);
                drawParticle(particle);
            });

            animationId = requestAnimationFrame(animate);
        }

        // Iniciar
        resizeCanvas();
        animate();

        // Resize handler
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-transparent">
            <canvas
                ref={canvasRef}
                id="particlesCanvas"
                className="block w-full h-full"
            />
        </div>
    );
};

export default Particles;
