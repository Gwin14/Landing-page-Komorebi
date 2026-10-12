"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";

export default function WaitlistForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
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
        throw new Error(typeof result.error === "string" ? result.error : "Não foi possível confirmar seu cadastro. Tente novamente.");
      }
      setState("success");
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError" && cause.name !== "TypeError" ? cause.message : "Não foi possível confirmar seu cadastro. Confira sua conexão e tente novamente.");
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
            <span className="waitlist-success-icon"><Check size={27} /></span>
            <h2>Você está na lista.</h2>
            <p>Seu cadastro foi confirmado. Usaremos seu e-mail somente para enviar o convite para o Komorebi no iPhone futuramente.</p>
            <Link href="/docs" className="waitlist-text-link">Enquanto isso, conheça o Komorebi <ArrowUpRight size={17} /></Link>
          </div>
        )}
      </div>
      {state !== "success" && (
        <>
          <p className="waitlist-card-kicker">UM CONVITE PARA O SEU OLHAR</p>
          <h2>Deixe seu e-mail.</h2>
          <p className="waitlist-card-description">Entre na lista de espera do Komorebi para iPhone.</p>
          <form onSubmit={submit}>
            <label htmlFor="waitlist-email">Seu e-mail</label>
            <input id="waitlist-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="voce@exemplo.com" maxLength={254} required disabled={state === "sending"} aria-invalid={state === "error" || undefined} aria-describedby={`waitlist-purpose${error ? " waitlist-error" : ""}`} />
            <div className="waitlist-honeypot" aria-hidden="true">
              <label htmlFor="waitlist-website">Website</label>
              <input id="waitlist-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <p id="waitlist-purpose" className="waitlist-purpose">Seu e-mail será usado somente para enviar o convite futuramente.</p>
            {error && <p id="waitlist-error" className="waitlist-error" role="alert">{error}</p>}
            <button className="button button-orange waitlist-submit" type="submit" disabled={state === "sending"}>
              {state === "sending" ? <>Enviando… <LoaderCircle size={19} className="waitlist-spinner" /></> : <>Entrar na lista de espera <ArrowUpRight size={20} /></>}
            </button>
            <p className="waitlist-form-footnote">Ao se cadastrar, você autoriza esse contato. <Link href="/politica-de-privacidade#lista-de-espera">Saiba como cuidamos do seu e-mail.</Link></p>
          </form>
          <noscript><p className="waitlist-error">Ative o JavaScript para enviar seu cadastro.</p></noscript>
        </>
      )}
    </div>
  );
}
