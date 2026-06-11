"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const marcas = [
  "albaflor", "biar", "domiciano", "kalos", "lagrey",
  "larrea", "lupa", "psicoanalista", "restinga", "transito", "viamonte"
];

export default function MarcasCarrusel() {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(tagRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: tagRef.current, start: "top 85%" }
      });
      gsap.fromTo(titleRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" }
      });

      const track = trackRef.current as HTMLElement | null;
      if (!track) return;
      const totalWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: `-=${totalWidth}`,
        duration: 35,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allMarcas = [...marcas, ...marcas];

  return (
    <section ref={sectionRef} style={{
      background: "#ffffff",
      padding: "80px 0",
      overflow: "hidden",
    }}>
      <div style={{ padding: "0 80px", marginBottom: "48px" }}>
        <div ref={tagRef} style={{ opacity: 0, display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <span style={{ width: "28px", height: "1px", background: "var(--color-bordo)" }} />
          <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-bordo)" }}>
            Nuestras marcas
          </span>
        </div>
        <h2 ref={titleRef} style={{
          opacity: 0,
          fontFamily: "var(--font-title)",
          fontSize: "36px",
          fontWeight: 500,
          fontStyle: "italic",
          color: "var(--color-bordo-dark)",
          lineHeight: 1.15,
        }}>
          Marcas que confían <span style={{ color: "var(--color-bordo)" }}>en nosotros</span>
        </h2>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", zIndex: 1,
          background: "linear-gradient(to right, #ffffff, transparent)",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", zIndex: 1,
          background: "linear-gradient(to left, #ffffff, transparent)",
        }} />

        <div ref={trackRef} style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
          width: "max-content",
          padding: "16px 0",
        }}>
          {allMarcas.map((marca, i) => (
            <div key={`${marca}-${i}`} style={{
              position: "relative",
              width: "300px",
              height: "190px",
              flexShrink: 0,
              filter: "grayscale(100%)",
              opacity: 0.6,
              transition: "all 0.3s ease",
              mixBlendMode: "multiply" as React.CSSProperties["mixBlendMode"],
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.filter = "grayscale(0%)";
                (e.currentTarget as HTMLDivElement).style.opacity = "1";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.filter = "grayscale(100%)";
                (e.currentTarget as HTMLDivElement).style.opacity = "0.6";
              }}
            >
              <Image
                src={`/marcas/${marca}.png`}
                alt={marca}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}