"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./NuestroModelo.module.css";

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  "Facturación directa desde bodega",
  "Gestión logística optimizada",
  "Posicionamiento de marca premium",
];

export default function NuestroModelo() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, { opacity: 0, x: -80 }, {
        opacity: 1, x: 0, duration: 1,
        scrollTrigger: { trigger: imgRef.current, start: "top 85%" }
      });
      gsap.fromTo(rightRef.current, { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.9,
        scrollTrigger: { trigger: rightRef.current, start: "top 85%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={imgRef} className={styles.imgWrapper}>
        <Image
          src="/rock-vinos-2.png"
          alt="Nuestro modelo"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className={styles.imgOverlay} />
      </div>

      <div ref={rightRef} className={styles.right}>
        <div className={styles.tag}>
          <span className={styles.tagLine} />
          <span className={styles.tagText}>Nuestro modelo</span>
        </div>

        <h2 className={styles.title}>
          Más que representante,<br />
          <span className={styles.titleAccent}>somos su socio estratégico.</span>
        </h2>

        <p className={styles.text}>
          Buena Vida no opera bajo el esquema tradicional de distribución. Actuamos como el brazo comercial exclusivo, vendiendo por cuenta y orden de marcas de prestigio.
        </p>
        <p className={styles.textLast}>
          Nuestra misión es conectar la pasión de las bodegas con los puntos de venta más exigentes de Buenos Aires, garantizando integridad en la cadena de valor y excelencia en el servicio.
        </p>

        <div className={styles.bullets}>
          {bullets.map((bullet) => (
            <div key={bullet} className={styles.bullet}>
              <span className={styles.bulletDot}>
                <span className={styles.bulletDotInner} />
              </span>
              <span className={styles.bulletText}>{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}