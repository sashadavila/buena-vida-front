"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { authApi } from "@/app/lib/api";
import styles from "./Login.module.css";

const roles = [
  { key: "owner", label: "Gestión Buena Vida" },
  { key: "winery", label: "Gestión Bodegas" },
  { key: "seller", label: "Gestión Vendedor" },
  { key: "client", label: "Cliente Mayorista" },
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const logoRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const role = searchParams.get("role");
    if (role) setSelectedRole(role);
  }, [searchParams]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(logoRef.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.9 })
      .fromTo(formRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9 }, "-=0.6");
  }, []);

  const handleLogin = async () => {
    if (!selectedRole) return setError("Seleccioná un perfil");
    if (!email || !password) return setError("Completá todos los campos");
    setLoading(true);
    setError("");
    try {
      const data = await authApi.login(email, password);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch {
      setError("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div ref={logoRef} className={styles.left}>
        <Image src="/buenavida-logo.webp" alt="Buena Vida" width={220} height={220} style={{ objectFit: "contain" }} />
        <div>
          <h2 className={styles.leftTitle}>
            Donde el vino<br />
            encuentra su <span className={styles.leftTitleAccent}>acorde</span>
          </h2>
          <p className={styles.leftSub}>Vinoteca · Rock · Buenos Aires</p>
        </div>
      </div>

      <div className={styles.right}>
        <button onClick={() => router.push("/")} className={styles.backBtn}>
          ← Volver al inicio
        </button>

        <div ref={formRef} className={styles.form}>
          <p className={styles.rolesLabel}>Seleccioná tu perfil</p>
          <div className={styles.rolesGrid}>
            {roles.map(role => (
              <button
                key={role.key}
                onClick={() => setSelectedRole(role.key)}
                className={`${styles.roleBtn} ${selectedRole === role.key ? styles.roleBtnActive : ""}`}
              >
                {role.label}
              </button>
            ))}
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="nombre@empresa.com"
              className={styles.input}
            />
          </div>

          <div className={styles.inputWrapperLast}>
            <label className={styles.label}>Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={styles.input}
                style={{ paddingRight: "48px" }}
              />
              <button onClick={() => setShowPassword(!showPassword)} className={styles.eyeBtn}>
                {showPassword ? "✕" : "○"}
              </button>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button onClick={handleLogin} disabled={loading} className={styles.submitBtn}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          <button onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`} className={styles.googleBtn}>
            Continuar con Google
          </button>

          <div className={styles.footer}>
            <span className={styles.footerText}>¿No tenés cuenta? </span>
            <span onClick={() => router.push("/auth/register")} className={styles.footerLink}>Registrate</span>
          </div>
        </div>
      </div>
    </div>
  );
}