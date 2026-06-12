"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Footer.module.css";

const accesos = [
  { label: "Gestión Buena Vida", role: "owner" },
  { label: "Gestión Bodegas", role: "winery" },
  { label: "Gestión Vendedor", role: "seller" },
  { label: "Cliente Mayorista", role: "client" },
];

export default function Footer() {
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.brand}>
            <Image
              src="/buenavida-logo.webp"
              alt="Buena Vida"
              width={120}
              height={120}
              style={{ objectFit: "contain" }}
            />
            <p className={styles.brandText}>
              Representación comercial exclusiva de bodegas argentinas. Llevamos la excelencia de las mejores marcas a AMBA y PBA.
            </p>
          </div>
        </div>

        <div>
          <div className={styles.colTitle}>Navegación</div>
          {["Inicio", "Vinos", "Bodegas", "Nosotros", "Contacto"].map(item => (
            <div key={item} className={styles.colLink}>{item}</div>
          ))}
        </div>

        <div>
          <div className={styles.colTitle}>Accesos</div>
          {accesos.map(item => (
            <div
              key={item.label}
              className={styles.colLink}
              onClick={() => router.push(`/auth/login?role=${item.role}`)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copy}>
          © 2026 Buena Vida S.A. · Representante Comercial Exclusivo
        </span>

        <div className={styles.socials}>
          <a href="https://www.instagram.com/buenavidastate?igsh=MW10MHVqZjhrNGtyNg==" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
          </a>

          <a href="https://wa.me/5491128351671" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </a>
        </div>

        <span className={styles.tagline}>Vinos · Rock · Buenos Aires</span>
      </div>
    </footer>
  );
}