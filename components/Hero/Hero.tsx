"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(tagRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(btnsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <div ref={tagRef} className={styles.tag}>
          <span className={styles.tagLine} />
          <span className={styles.tagText}>Vinoteca · Rock</span>
        </div>

        <h1 ref={titleRef} className={styles.title}>
          Donde el vino<br />
          encuentra su <span className={styles.titleAccent}>acorde</span>
        </h1>

        <p ref={subRef} className={styles.sub}>
          Vinos seleccionados con la misma pasión<br />
          que se elige un disco. Para los que saben<br />
          lo que quieren.
        </p>

        <div ref={btnsRef} className={styles.btns}>
          <button className={styles.btnPrimary}>Ver la colección</button>
          <button className={styles.btnSecondary}>Nuestra historia</button>
        </div>
      </div>

      <div className={styles.right}>
        <Image
          src="/rock-vinos.png"
          alt="Vinos y rock"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div className={styles.overlay} />
      </div>
    </section>
  );
}