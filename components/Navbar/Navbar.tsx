"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        background: scrolled ? "rgba(245,240,232,0.75)" : "var(--color-cream)",
        borderBottom: "0.5px solid var(--color-gold)",
        padding: "0 32px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "background 0.4s ease",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
        <Image
          src="/buenavida-logo.webp"
          alt="Buena Vida"
          width={90}
          height={90}
          style={{ objectFit: "contain" }}
        />
        <span
          style={{
            fontFamily: "var(--font-title)",
            fontSize: "20px",
            fontStyle: "italic",
            color: "var(--color-bordo-dark)",
            fontWeight: 500,
          }}
        >
          Buena Vida State
        </span>
      </div>

      <div style={{ display: "flex", gap: "28px" }}>
        {["Vinos", "Bodegas", "Nosotros"].map((item) => (
          <span
            key={item}
            style={{
              fontSize: "18px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-bordo)",
              cursor: "pointer",
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <span
        style={{
          fontSize: "15px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-cream)",
          background: "var(--color-bordo)",
          padding: "8px 18px",
          borderRadius: "2px",
          cursor: "pointer",
        }}
      >
        Ingresar
      </span>
    </nav>
  );
}