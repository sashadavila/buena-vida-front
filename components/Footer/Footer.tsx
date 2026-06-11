"use client";

import Image from "next/image";

const btnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "0.5px solid rgba(192,160,96,0.4)",
  color: "var(--color-gold)",
  textDecoration: "none",
  transition: "all 0.3s ease",
};

const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.background = "rgba(192,160,96,0.15)";
  e.currentTarget.style.borderColor = "var(--color-gold)";
};

const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.background = "transparent";
  e.currentTarget.style.borderColor = "rgba(192,160,96,0.4)";
};

export default function Footer() {
  return (
    <footer style={{
      background: "var(--color-bordo-deep)",
      padding: "64px 80px 32px",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: "64px",
        marginBottom: "48px",
        paddingBottom: "48px",
        borderBottom: "0.5px solid rgba(192,160,96,0.2)",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
            <Image
              src="/buenavida-logo.webp"
              alt="Buena Vida"
              width={120}
              height={120}
              style={{ objectFit: "contain" }}
            />
            <p style={{
              fontSize: "14px",
              color: "var(--color-cream)",
              lineHeight: 1.8,
              opacity: 0.6,
              maxWidth: "280px",
            }}>
              Representación comercial exclusiva de bodegas argentinas. Llevamos la excelencia de las mejores marcas a AMBA y PBA.
            </p>
          </div>
        </div>

        <div>
          <div style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            marginBottom: "20px",
          }}>
            Navegación
          </div>
          {["Inicio", "Vinos", "Bodegas", "Nosotros", "Contacto"].map(item => (
            <div key={item} style={{
              fontSize: "14px",
              color: "var(--color-cream)",
              opacity: 0.6,
              marginBottom: "12px",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = "1"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = "0.6"}
            >
              {item}
            </div>
          ))}
        </div>

        <div>
          <div style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            marginBottom: "20px",
          }}>
            Accesos
          </div>
          {["Gestión Buena Vida", "Gestión Bodegas", "Gestión Vendedor", "Cliente Mayorista"].map(item => (
            <div key={item} style={{
              fontSize: "14px",
              color: "var(--color-cream)",
              opacity: 0.6,
              marginBottom: "12px",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = "1"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = "0.6"}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-cream)",
          opacity: 0.3,
        }}>
          © 2026 Buena Vida S.A. · Representante Comercial Exclusivo
        </span>

        <div style={{ display: "flex", gap: "12px" }}>
          <a href="https://www.instagram.com/buenavidastate?igsh=MW10MHVqZjhrNGtyNg==" target="_blank" rel="noopener noreferrer" style={btnStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
          </a>

          <a href="https://wa.me/5491128351671" target="_blank" rel="noopener noreferrer" style={btnStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </a>
        </div>

        <span style={{
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-gold)",
          opacity: 0.5,
        }}>
          Vinos · Rock · Buenos Aires
        </span>
      </div>
    </footer>
  );
}