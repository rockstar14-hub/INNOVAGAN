import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const DynamicBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scrubbed GSAP ScrollTrigger timeline for progressive parallax and cross-fading
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.6,
        },
      });

      // Layer 1 (Hero/Inicio): starts fully visible at top, slowly fades out with parallax
      tl.to(
        layer1Ref.current,
        {
          yPercent: -18,
          opacity: 0,
          scale: 1.07,
          ease: 'none',
        },
        0
      );

      // Layer 2 (Ecosistema/FVH): fades in smoothly around middle
      tl.fromTo(
        layer2Ref.current,
        { yPercent: 20, opacity: 0, scale: 1.02 },
        { yPercent: 0, opacity: 0.95, scale: 1.07, ease: 'none' },
        0.2
      );
      tl.to(
        layer2Ref.current,
        { yPercent: -18, opacity: 0, scale: 1.1, ease: 'none' },
        0.55
      );

      // Layer 3 (Sostenibilidad & Ganado): fades in at bottom half
      tl.fromTo(
        layer3Ref.current,
        { yPercent: 16, opacity: 0, scale: 1.02 },
        { yPercent: -8, opacity: 0.95, scale: 1.07, ease: 'none' },
        0.52
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Shared mask style – smooth gradient fade on top and bottom edges of each layer
  // so there's no visible "horizon" cut line between images
  const maskStyle: React.CSSProperties = {
    maskImage:
      'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
    WebkitMaskImage:
      'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 
        CAPA 1 (Hero / Inicio):
        Pradera verde de alta tecnología y campo iluminado
      */}
      <div
        ref={layer1Ref}
        className="fixed inset-0 bg-cover bg-center will-change-transform opacity-95 filter saturate-[1.35] contrast-[1.05]"
        style={{
          backgroundImage: "url('/images/bg-cows-sunset.jpg')",
          transformOrigin: 'center center',
          ...maskStyle,
        }}
      />

      {/* 
        CAPA 2 (Ecosistema / FVH):
        Cultivo hidropónico / pasto verde fresco en bandejas verticales
      */}
      <div
        ref={layer2Ref}
        className="fixed inset-0 bg-cover bg-center will-change-transform opacity-0 filter saturate-[1.4] contrast-[1.05]"
        style={{
          backgroundImage: "url('/images/bg-cows-sunset.jpg')",
          transformOrigin: 'center center',
          ...maskStyle,
        }}
      />

      {/* 
        CAPA 3 (Sostenibilidad / Catálogo):
        Ganado bovino saludable en pastoreo regenerativo
      */}
      <div
        ref={layer3Ref}
        className="fixed inset-0 bg-cover bg-center will-change-transform opacity-0 filter saturate-[1.3] contrast-[1.05]"
        style={{
          backgroundImage: "url('/images/bg-cows-sunset.jpg')",
          transformOrigin: 'center center',
          ...maskStyle,
        }}
      />

      {/* 
        Superposición (Overlay) sutil traslúcida:
        Mantiene la legibilidad del texto mientras muestra las imágenes vivaces.
      */}
      <div className="absolute inset-0 bg-white/32 backdrop-blur-[2px] transition-colors duration-500" />

      {/* Gradiente suave superior e inferior para enmarcar el contenido */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-slate-900/8 pointer-events-none" />

      {/* Sutil patrón micro-grid orgánico */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `radial-gradient(#059669 1.2px, transparent 1.2px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
