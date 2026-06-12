"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./RepresentacionSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function RepresentacionSection() {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const statRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(tagRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: tagRef.current, start: "top 85%" }
      });
      gsap.fromTo(titleRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" }
      });
      gsap.fromTo(subRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: subRef.current, start: "top 85%" }
      });
      gsap.fromTo(statRef.current, { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 0.8,
        scrollTrigger: { trigger: statRef.current, start: "top 85%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div>
        <div ref={tagRef} className={styles.tag}>
          <span className={styles.tagLine} />
          <span className={styles.tagText}>Quiénes somos</span>
        </div>

        <h2 ref={titleRef} className={styles.title}>
          Representación Comercial<br />
          <span className={styles.titleAccent}>Exclusiva</span> de Bodegas Argentinas
        </h2>

        <p ref={subRef} className={styles.sub}>
          Llevamos la excelencia de las mejores marcas a AMBA y PBA con un modelo de gestión directa y eficiente.
        </p>
      </div>

      <div ref={statRef} className={styles.stat}>
        <span className={styles.statNumber}>+10</span>
        <span className={styles.statLabel}>años de excelencia</span>
      </div>
    </section>
  );
}