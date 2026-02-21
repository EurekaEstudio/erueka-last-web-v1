---
description: Principios de Diseño UI/UX y Test de Cavernícola
---
# Principios de Diseño UI/UX: Flujo de Trabajo

Este flujo de trabajo define las reglas y pasos para diseñar o rediseñar interfaces en el proyecto, asegurando que cumplan con altos estándares de conversión y estética moderna.

## 1. El Test de Cavernícola (Caveman Test)
Antes de construir cualquier estructura, la cabecera (Hero Section, es decir, la primera vista de la web sin hacer scroll) debe responder a estas tres preguntas en menos de 3 segundos:
1. **¿Qué ofreces?** (Oferta clara, directa y concisa)
2. **¿Cómo mejora mi vida o mi negocio?** (Beneficio central ya sea medible o emocional)
3. **¿Qué tengo que hacer para obtenerlo?** (Llamado a la acción o CTA rotundo y evidente)

> **Regla de oro:** Si el componente inicial no pasa esta prueba, el "copy" (texto) debe ser reescrito y simplificado hasta que lo haga.

## 2. Jerarquía Visual y Carga Cognitiva
- **Menos es Más:** Los muros de texto son enemigos de la conversión. Transforma párrafos largos en "bullets" o descripciones cortas.
- **Mostrar, no Contar (Show, Don't Tell):** Prioriza imágenes, iconos, mockups o vídeos para explicar conceptos en lugar de escribir largos bloques de texto.
- **Estructuras Modernas (Bento Box / Grillas Asimétricas):** Utiliza layouts tipo bento boxes (módulos o tarjetas de distintos tamaños) para agrupar información de forma visualmente digerible y contemporánea.

## 3. Dinamismo, Micro-interacciones y Animación
Una web estática se siente anticuada. La interfaz debe estar "viva":
- **Feedback Inmediato:** Todos los botones, enlaces y tarjetas interactivas deben reaccionar al estado `hover` y `active`. Utiliza transiciones suaves con CSS o `framer-motion` (ej. un leve `scale: 1.02` o resplandor de fondo).
- **Entradas Fluidas (Scroll Reveals):** A medida que el usuario baja por la página, los elementos deben aparecer fluidamente (ej. fade-up). Integrar bibliotecas como `gsap` (ScrollTrigger) o `framer-motion` (useInView).
- **Parallax y Profundidad:** Utilizar técnicas sutiles de parallax para fondos o elementos decorativos que creen una percepción tridimensional de modernidad, siempre cuidando de no exagerar.

## 4. Tipografía, Espaciado y Color
- **Jerarquía Tipográfica Clara:** Distingue categóricamente entre títulos masivos (`H1`, `H2`) y cuerpos de texto. Usa fuentes como Inter o equivalentes provistas de gran legibilidad.
- **Layout Aireado:** Los espacios en blanco (paddings y margins como `p-8`, `gap-6` en Tailwind) son vitales. No amontones los elementos.
- **Estética "Premium":** Evita colores saturados de caja. Usa gradientes sutiles, efectos "glassmorphism" (vidrio esmerilado con blurs de fondo) y bordes redondeados sutilmente delineados (`border`, `border-white/10`).

## Pasos para la Aplicación Directa
Siempre que se te asigne la tarea de reconstruir o mejorar una vista, ejecuta estos pasos secuencialmente:
1. **Auditoría Inicial:** Evalúa la estructura de HTML/React existente bajo estos principios.
2. **Refactorización de Contenido:** Recorta y ajusta el lenguaje aplicando el Test de Cavernícola.
3. **Reorganización Estructural:** Implementa grillas complejas/bento en lugar de apilar elementos en base a columnas simples.
4. **Capa Dinámica:** Integra y verifica que los elementos "hover", "stagger" de animación, y scroll-reveals funcionen majestuosamente.
