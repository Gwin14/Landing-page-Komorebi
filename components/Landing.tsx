"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Aperture,
  ArrowUpRight,
  ArrowDown,
  MoveUpRight,
  SlidersHorizontal,
  ScanLine,
  Layers,
  Image as ImageIcon,
  LockKeyhole,
  Plus,
  X,
  Menu,
  Code2,
  Focus,
} from "lucide-react";
import { PROJECT_URL } from "@/lib/site";
import { compatibilitySummary } from "@/lib/feature-matrix";
import ColorLab from "./ColorLab";
const PhoneScene = dynamic(() => import("./PhoneScene"), {
  ssr: false,
  loading: () => (
    <div className="scene-loading">
      <Aperture size={32} />
      <span>Revelando os detalhes…</span>
    </div>
  ),
});
const questions = [
  [
    "O que é o Komorebi?",
    "Um app de câmera para quem gosta de fotografar com intenção. Ele combina captura, controles manuais, LUTs e uma galeria integrada, com fotos e preferências armazenadas no dispositivo.",
  ],
  [
    "Quais aparelhos são compatíveis?",
    compatibilitySummary,
  ],
  [
    "Posso usar meus próprios LUTs?",
    "Sim. Além dos oito LUTs incluídos, você pode importar arquivos .cube nas configurações. Os LUTs personalizados ficam salvos no dispositivo, prontos para as próximas fotos.",
  ],
  [
    "Minhas fotos ficam no dispositivo?",
    "Sim. Fotos, preferências e LUTs personalizados ficam no dispositivo. Recursos específicos, como clima, mapa e EXIF Frame, usam serviços externos. A localização nas fotos é opcional.",
  ],
  [
    "Onde posso baixar o app?",
    "O Komorebi está em desenvolvimento ativo. Acompanhe as novidades e a disponibilidade pelo repositório oficial do projeto.",
  ],
];
export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <header className="header">
        <a className="brand" href="#" aria-label="Komorebi, início">
          <Aperture size={29} strokeWidth={1.7} />
          <span>
            komorebi<span className="brand-period">.</span>
          </span>
        </a>
        <nav
          aria-label="Navegação principal"
          className={menuOpen ? "nav is-open" : "nav"}
        >
          <a href="#experiencia" onClick={() => setMenuOpen(false)}>
            A experiência
          </a>
          <a href="#cores" onClick={() => setMenuOpen(false)}>
            Suas cores
          </a>
          <a href="#recursos" onClick={() => setMenuOpen(false)}>
            Os detalhes
          </a>
          <Link href="/docs" onClick={() => setMenuOpen(false)}>
            Documentação
          </Link>
        </nav>
        <a
          className="header-cta"
          href={PROJECT_URL}
          target="_blank"
          rel="noreferrer"
        >
          Conheça o projeto <ArrowUpRight size={17} />
        </a>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <main id="conteudo">
        <section className="hero" id="experiencia">
          <div className="hero-grain" />
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="tiny-cross">+</span> MENOS AUTOMÁTICO. MAIS
                SEU.
              </div>
              <h1>
                O instante passa.
                <br />O seu olhar
                <br />
                <span>fica.</span>
              </h1>
              <p>
                Uma câmera para sentir a luz, encontrar suas cores e transformar
                o cotidiano em fotografia.
              </p>
              <a className="button button-orange" href="#cores">
                Encontre suas cores <ArrowUpRight size={20} />
              </a>
              <div className="hero-note">
                <span className="mini-line" /> FEITO PARA FOTOGRAFAR COM
                INTENÇÃO
              </div>
            </div>
            <div className="phone-stage">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <span className="vertical-label">木漏れ日 — KOMOREBI</span>
              <PhoneScene />
              <div className="phone-tag">
                <span className="tag-cross">+</span>
                <div>
                  Seu olhar, em foco.
                  <small>CONTROLE MANUAL · CORES AUTORAIS</small>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#manifesto">
              <ArrowDown size={17} /> CONTINUE EXPLORANDO
            </a>
            <span>LUZ. COR. INTENÇÃO.</span>
            <span className="frame-count">01 — 05</span>
          </div>
        </section>
        <div className="feature-strip">
          <span>
            <Focus size={18} /> Controle manual
          </span>
          <span>
            <ScanLine size={18} /> RAW / ProRAW
          </span>
          <span>
            <Aperture size={18} /> 8 LUTs incluídos
          </span>
          <span>
            <Layers size={18} /> Live Photo
          </span>
          <span>
            <LockKeyhole size={18} /> Suas fotos no dispositivo
          </span>
        </div>
        <section className="manifesto section-pad" id="manifesto">
          <div className="section-index" data-reveal>
            <span>01 / UM JEITO DE VER</span>
            <span className="japanese">木漏れ日</span>
          </div>
          <div data-reveal>
            <h2>
              Existe uma foto
              <br />
              no meio do <em>comum.</em>
            </h2>
            <div className="manifesto-bottom">
              <span className="light-mark">
                <Aperture size={66} strokeWidth={0.7} />
              </span>
              <p>
                Komorebi é a luz do sol que atravessa as folhas.
                <br />
                Um lembrete de que vale a pena olhar de novo.
                <br />
                <br />A gente criou uma câmera para isso: desacelerar, explorar
                a luz e fazer uma foto que tenha a ver com você.
              </p>
            </div>
          </div>
        </section>
        <section className="colors-section section-pad" id="cores">
          <div className="section-heading" data-reveal>
            <div>
              <div className="eyebrow">02 / A COR MUDA TUDO</div>
              <h2>
                O mesmo instante.
                <br />
                <em>Outro sentimento.</em>
              </h2>
            </div>
            <p>
              Oito LUTs para descobrir novas atmosferas.
              <br />
              Ou importe o seu .cube e leve sua
              <br className="desktop-break" /> assinatura para cada foto.
            </p>
          </div>
          <ColorLab />
        </section>
        <section className="details-section section-pad" id="recursos">
          <div className="section-heading" data-reveal>
            <div>
              <div className="eyebrow">03 / NAS SUAS MÃOS</div>
              <h2>
                Instinto de fotógrafo.
                <br />
                <em>Controle de câmera.</em>
              </h2>
            </div>
            <p>
              Entre a cena que você vê e a foto que imagina,
              <br />
              cada escolha faz diferença.
            </p>
          </div>
          <div className="details-grid">
            <article className="manual-card" data-reveal>
              <div className="card-top">
                <SlidersHorizontal size={24} />
                <span>01</span>
              </div>
              <h3>A luz responde a você.</h3>
              <p>
                ISO, obturador, balanço de branco e foco.
                <br />
                Ajuste cada detalhe, no seu ritmo.
              </p>
              <div className="exposure-demo" aria-hidden="true">
                <div className="meter-values">
                  <span>−2</span>
                  <span>−1</span>
                  <b>0</b>
                  <span>+1</span>
                  <span>+2</span>
                </div>
                <div className="meter-ticks" />
                <div className="meter-cursor" />
                <div className="camera-settings">
                  <span>
                    ISO <b>100</b>
                  </span>
                  <span>
                    S <b>1/250</b>
                  </span>
                  <span>
                    WB <b>5600K</b>
                  </span>
                </div>
              </div>
              <small>CONTROLES EM APARELHOS COMPATÍVEIS</small>
            </article>
            <article className="raw-card" data-reveal>
              <div className="card-top">
                <ScanLine size={24} />
                <span>02</span>
              </div>
              <h3>Guarde as possibilidades.</h3>
              <p>
                Capture em RAW/ProRAW e preserve
                <br />
                mais informação para a edição.
              </p>
              <div className="raw-word" aria-hidden="true">
                RAW<span>+</span>
              </div>
              <small>DISPONÍVEL EM IPHONES COMPATÍVEIS</small>
            </article>
            <article className="small-card" data-reveal>
              <Layers size={23} />
              <h3>Um pouco além da foto.</h3>
              <p>
                Live Photo e modo retrato para explorar outras formas de guardar
                o instante, em iPhones compatíveis.
              </p>
            </article>
            <article className="small-card" data-reveal>
              <ImageIcon size={23} />
              <h3>Cada foto tem uma história.</h3>
              <p>
                Galeria integrada, dados EXIF e localização opcional. Volte aos
                detalhes de cada captura.
              </p>
            </article>
            <article className="small-card" data-reveal>
              <LockKeyhole size={23} />
              <h3>O que é seu fica com você.</h3>
              <p>
                Fotos, preferências e LUTs personalizados salvos no dispositivo.
                Sua biblioteca, sempre por perto.
              </p>
            </article>
          </div>
        </section>
        <section className="moment-banner">
          <div className="moment-shade" />
          <div data-reveal>
            <span className="eyebrow">NÃO PRECISA SER EXTRAORDINÁRIO.</span>
            <h2>
              Só precisa fazer
              <br />
              você <em>parar.</em>
            </h2>
            <span className="moment-caption">
              UM POUCO DE LUZ. UM OUTRO OLHAR.
            </span>
          </div>
          <span className="photo-credit">Foto: Lucas van Oort / Unsplash</span>
        </section>
        <section className="faq-section section-pad">
          <div data-reveal>
            <div className="eyebrow">04 / ANTES DO PRIMEIRO CLIQUE</div>
            <h2>
              Vamos aos
              <br />
              <em>detalhes.</em>
            </h2>
          </div>
          <div className="faq-list">
            {questions.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={19} />
                </summary>
                <p>
                  {a}
                  {q === "Onde posso baixar o app?" && (
                    <>
                      {" "}
                      <a href={PROJECT_URL} target="_blank" rel="noreferrer">
                        Visitar o projeto <ArrowUpRight size={15} />
                      </a>
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </section>
        <section className="final-cta section-pad" id="projeto" data-reveal>
          <div className="eyebrow">05 / O PRÓXIMO INSTANTE É SEU</div>
          <Aperture className="cta-aperture" size={57} strokeWidth={1} />
          <h2>
            Saia. Olhe.
            <br />
            <em>Fotografe.</em>
          </h2>
          <p>
            O Komorebi está em desenvolvimento.
            <br />
            Acompanhe o que vem a seguir.
          </p>
          <a
            className="button button-orange"
            href={PROJECT_URL}
            target="_blank"
            rel="noreferrer"
          >
            Acompanhar o Komorebi <ArrowUpRight size={20} />
          </a>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          <Aperture size={25} />
          <span>komorebi.</span>
        </a>
        <span>Feito por quem gosta de fotografar.</span>
        <div>
          <a
            href="https://www.instagram.com/fotoessencia_/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram <MoveUpRight size={14} />
          </a>
          <a href={PROJECT_URL} target="_blank" rel="noreferrer">
            <Code2 size={16} /> GitHub
          </a>
          <Link href="/docs">Documentação</Link>
          <Link href="/politica-de-privacidade">Privacidade</Link>
          <Link href="/termos-de-uso">Termos</Link>
          <a href="#">Voltar ao topo ↑</a>
        </div>
      </footer>
    </>
  );
}
