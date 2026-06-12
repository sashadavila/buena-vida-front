"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MarcasCarrusel.module.css";

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
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <div ref={tagRef} className={styles.tag}>
          <span className={styles.tagLine} />
          <span className={styles.tagText}>Nuestras marcas</span>
        </div>
        <h2 ref={titleRef} className={styles.title}>
          Marcas que confían <span className={styles.titleAccent}>en nosotros</span>
        </h2>
      </div>

      <div className={styles.trackWrapper}>
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />
        <div ref={trackRef} className={styles.track}>
          {allMarcas.map((marca, i) => (
            <div key={`${marca}-${i}`} className={styles.logo}>
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