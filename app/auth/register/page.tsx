"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { authApi } from "@/app/lib/api";
import Swal from "sweetalert2";
import styles from "./Register.module.css";

const roles = [
  { key: "owner", label: "Gestión Buena Vida" },
  { key: "winery", label: "Gestión Bodegas" },
  { key: "seller", label: "Gestión Vendedor" },
  { key: "client", label: "Cliente Mayorista" },
];

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className={styles.errorMsg}>{msg}</p> : null;

export default function RegisterPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ firstname?: string; email?: string; password?: string; role?: string }>({});
  const [loading, setLoading] = useState(false);
  const logoRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(logoRef.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.9 })
      .fromTo(formRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9 }, "-=0.6");
  }, []);

  const validate = () => {
    const newErrors: { firstname?: string; email?: string; password?: string; role?: string } = {};

    if (!firstname.trim()) {
      newErrors.firstname = "El nombre es requerido";
    } else if (firstname.trim().split(" ").length < 2) {
      newErrors.firstname = "Ingresá nombre y apellido";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(firstname)) {
      newErrors.firstname = "Solo se permiten letras";
    }

    if (!email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Ingresá un email válido";
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Debe tener al menos una mayúscula";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Debe tener al menos un número";
    }

    if (!selectedRole) {
      newErrors.role = "Seleccioná un perfil";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await authApi.register(email, firstname, password, selectedRole!);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      await Swal.fire({
        title: "¡Bienvenido!",
        text: "Tu cuenta fue creada con éxito.",
        icon: "success",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#7a2040",
        background: "#f5f0e8",
        color: "#3a0a1a",
        iconColor: "#c0a060",
      });
      router.push("/dashboard");
    } catch {
      await Swal.fire({
        title: "Error",
        text: "No se pudo crear la cuenta.",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
        confirmButtonColor: "#7a2040",
        background: "#f5f0e8",
        color: "#3a0a1a",
      });
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
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Nombre completo</label>
            <input
              type="text"
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
              placeholder="Juan Pérez"
              className={`${styles.input} ${errors.firstname ? styles.inputError : ""}`}
            />
            <ErrorMsg msg={errors.firstname} />
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="nombre@empresa.com"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            />
            <ErrorMsg msg={errors.email} />
          </div>

          <div className={styles.inputWrapperLast}>
            <label className={styles.label}>Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                style={{ paddingRight: "48px" }}
              />
              <button onClick={() => setShowPassword(!showPassword)} className={styles.eyeBtn}>
                {showPassword ? "✕" : "○"}
              </button>
            </div>
            <ErrorMsg msg={errors.password} />
          </div>

          <div className={styles.rolesWrapper}>
            <p className={styles.rolesLabel}>Tipo de perfil</p>
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
            <ErrorMsg msg={errors.role} />
          </div>

          <button onClick={handleRegister} disabled={loading} className={styles.submitBtn}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>

          <div className={styles.footer}>
            <span className={styles.footerText}>¿Ya tenés cuenta? </span>
            <span onClick={() => router.push("/auth/login")} className={styles.footerLink}>
              Iniciá sesión
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}