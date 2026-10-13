"use client";
import { useI18n } from "@/components/LocaleProvider";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";

export default function WaitlistForm() {
  const { t, path } = useI18n();
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    // Native browser validation messages follow the browser language, not the
    // visitor's manual selection. Render validation feedback in the site locale.
    if (!event.currentTarget.checkValidity()) {
      setError("Informe um e-mail válido.");
      setState("error");
      event.currentTarget.querySelector<HTMLInputElement>("input[type=email]")?.focus();
      return;
    }
    submitting.current = true;
    const data = new FormData(event.currentTarget);
    setState("sending");
    setError("");
    try {
      const response = await fetch("/api/lista-espera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), website: data.get("website") }),
        signal: AbortSignal.timeout(28_000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        throw new Error(typeof result.error === "string" ? result.error : t("Não foi possível confirmar seu cadastro. Tente novamente."));
      }
      setState("success");
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError" && cause.name !== "TypeError" ? cause.message : t("Não foi possível confirmar seu cadastro. Confira sua conexão e tente novamente."));
      setState("error");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <div className="waitlist-form-card" aria-busy={state === "sending"}>
      <div aria-live="polite" aria-atomic="true">
        {state === "success" && (
          <div className="waitlist-success" role="status">
            <div className="waitlist-reward" aria-hidden="true">
              <span className="waitlist-reward-ring" />
              {Array.from({ length: 6 }, (_, index) => <i key={index} style={{ transform: `rotate(${index * 60}deg)` }}><span /></i>)}
              <span className="waitlist-success-icon"><Check size={27} /></span>
            </div>
            <h1>{t("Você está na lista.")}</h1>
            <p>{t("Seu cadastro foi confirmado. Usaremos seu e-mail somente para enviar o convite para o Komorebi no iPhone futuramente.")}</p>
            <Link href={path("/docs")} className="waitlist-text-link">{t("Enquanto isso, conheça o Komorebi")} <ArrowUpRight size={17} /></Link>
          </div>
        )}
      </div>
      {state !== "success" && (
        <>
          <h1>{t("Lista de espera")}<br /><em>{t("para iPhone.")}</em></h1>
          <form onSubmit={submit} noValidate>
            <label htmlFor="waitlist-email">{t("Seu e-mail")}</label>
            <input id="waitlist-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder={t("voce@exemplo.com")} maxLength={254} required disabled={state === "sending"} aria-invalid={state === "error" || undefined} aria-describedby={`waitlist-terms${error ? " waitlist-error" : ""}`} />
            <div className="waitlist-honeypot" aria-hidden="true">
              <label htmlFor="waitlist-website">Website</label>
              <input id="waitlist-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            {error && <p id="waitlist-error" className="waitlist-error" role="alert">{t(error)}</p>}
            <button className="button button-orange waitlist-submit" type="submit" disabled={state === "sending"}>
              {state === "sending" ? <>{t("Enviando…")} <LoaderCircle size={19} className="waitlist-spinner" /></> : <>{t("Entrar na lista de espera")} <ArrowUpRight size={20} /></>}
            </button>
            <p id="waitlist-terms" className="waitlist-form-footnote">{t("Ao se cadastrar, você autoriza o envio do convite por e-mail e concorda com os")} <Link href={path("/termos-de-uso")}>{t("Termos de Uso")}</Link> {t("e a")} <Link href={path("/politica-de-privacidade#lista-de-espera")}>{t("Política de Privacidade")}</Link>.</p>
          </form>
          <noscript><p className="waitlist-error">{t("Ative o JavaScript para enviar seu cadastro.")}</p></noscript>
        </>
      )}
    </div>
  );
}
