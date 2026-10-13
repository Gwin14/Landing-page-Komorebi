"use client";
import { useI18n } from "@/components/LocaleProvider";
import BrandIcon from "@/components/BrandIcon";
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
  Focus,
} from "lucide-react";
import { questions } from "@/content/faq";
import LanguageSwitcher from "./LanguageSwitcher";
import ColorLab from "./ColorLab";
const PhoneScene = dynamic(() => import("./PhoneScene"), {
  ssr: false,
  loading: SceneLoading,
});
function SceneLoading() {
  const { t } = useI18n();
  return (
    <div className="scene-loading">
      <BrandIcon size={32} />
      <span>{t("Revelando os detalhes…")}</span>
    </div>
  );
}
export default function Landing() {
  const { t, path } = useI18n();
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
      <a href="#conteudo" className="skip-link">{t("Pular para o conteúdo")} </a>
      <header className="header">
        <a className="brand" href="#" aria-label={t("Komorebi, início")}>
          <BrandIcon size={29} />
          <span>
            komorebi<span className="brand-period">.</span>
          </span>
        </a>
        <nav
          aria-label={t("Navegação principal")}
          className={menuOpen ? "nav is-open" : "nav"}
        >
          <a href="#experiencia" onClick={() => setMenuOpen(false)}>{t("A experiência")} </a>
          <a href="#cores" onClick={() => setMenuOpen(false)}>{t("Suas cores")} </a>
          <a href="#recursos" onClick={() => setMenuOpen(false)}>{t("Os detalhes")} </a>
          <Link href={path("/lista-de-espera")} onClick={() => setMenuOpen(false)}>{t("Lista de espera")}</Link>
          <Link href={path("/docs")} onClick={() => setMenuOpen(false)}>{t("Documentação")} </Link>
        </nav>
        <Link className="header-cta" href={path("/lista-de-espera")}>{t("Lista de espera · iPhone")} <ArrowUpRight size={17} />
        </Link>
        <LanguageSwitcher />
        <button
          className="menu-toggle"
          aria-label={menuOpen ? t("Fechar menu") : t("Abrir menu")}
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
                <span className="tiny-cross">+</span> {t("MENOS AUTOMÁTICO. MAIS SEU.")} </div>
              <h1>{t("O instante passa.")} <br />{t("O seu olhar")} <br />
                <span>{t("fica.")}</span>
              </h1>
              <p>{t("Uma câmera para sentir a luz, encontrar suas cores e transformar o cotidiano em fotografia.")} </p>
              <a className="button button-orange" href="#cores">{t("Encontre suas cores")} <ArrowUpRight size={20} />
              </a>
              <div className="hero-note">
                <span className="mini-line" /> {t("FEITO PARA FOTOGRAFAR COM INTENÇÃO")} </div>
            </div>
            <div className="phone-stage">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <span className="vertical-label">木漏れ日 — KOMOREBI</span>
              <PhoneScene />
              <div className="phone-tag">
                <span className="tag-cross">+</span>
                <div>{t("Seu olhar, em foco.")} <small>{t("CONTROLE MANUAL · CORES AUTORAIS")}</small>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#manifesto">
              <ArrowDown size={17} /> {t("CONTINUE EXPLORANDO")} </a>
            <span>{t("LUZ. COR. INTENÇÃO.")}</span>
            <span className="frame-count">01 — 05</span>
          </div>
        </section>
        <div className="feature-strip">
          <span>
            <Focus size={18} /> {t("Controle manual")} </span>
          <span>
            <ScanLine size={18} /> RAW / ProRAW
          </span>
          <span>
            <Aperture size={18} /> {t("8 LUTs incluídos")} </span>
          <span>
            <Layers size={18} /> Live Photo
          </span>
          <span>
            <LockKeyhole size={18} /> {t("Suas fotos no dispositivo")} </span>
        </div>
        <section className="manifesto section-pad" id="manifesto">
          <div className="section-index" data-reveal>
            <span>{t("01 / UM JEITO DE VER")}</span>
            <span className="japanese">木漏れ日</span>
          </div>
          <div data-reveal>
            <h2>{t("Existe uma foto")} <br />{t("no meio do")} <em>{t("comum.")}</em>
            </h2>
            <div className="manifesto-bottom">
              <span className="light-mark">
                <BrandIcon size={66} />
              </span>
              <p>{t("Komorebi é a luz do sol que atravessa as folhas.")} <br />{t("Um lembrete de que vale a pena olhar de novo.")} <br />
                <br />{t("A gente criou uma câmera para isso: desacelerar, explorar a luz e fazer uma foto que tenha a ver com você.")} </p>
            </div>
          </div>
        </section>
        <section className="colors-section section-pad" id="cores">
          <div className="section-heading" data-reveal>
            <div>
              <div className="eyebrow">{t("02 / A COR MUDA TUDO")}</div>
              <h2>{t("O mesmo instante.")} <br />
                <em>{t("Outro sentimento.")}</em>
              </h2>
            </div>
            <p>{t("Oito LUTs para descobrir novas atmosferas.")} <br />{t("Ou importe o seu .cube e leve sua")} <br className="desktop-break" /> {t("assinatura para cada foto.")} </p>
          </div>
          <ColorLab />
        </section>
        <section className="details-section section-pad" id="recursos">
          <div className="section-heading" data-reveal>
            <div>
              <div className="eyebrow">{t("03 / NAS SUAS MÃOS")}</div>
              <h2>{t("Instinto de fotógrafo.")} <br />
                <em>{t("Controle de câmera.")}</em>
              </h2>
            </div>
            <p>{t("Entre a cena que você vê e a foto que imagina,")} <br />{t("cada escolha faz diferença.")} </p>
          </div>
          <div className="details-grid">
            <article className="manual-card" data-reveal>
              <div className="card-top">
                <SlidersHorizontal size={24} />
                <span>01</span>
              </div>
              <h3>{t("A luz responde a você.")}</h3>
              <p>{t("ISO, obturador, balanço de branco e foco.")} <br />{t("Ajuste cada detalhe, no seu ritmo.")} </p>
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
              <small>{t("CONTROLES EM APARELHOS COMPATÍVEIS")}</small>
            </article>
            <article className="raw-card" data-reveal>
              <div className="card-top">
                <ScanLine size={24} />
                <span>02</span>
              </div>
              <h3>{t("Guarde as possibilidades.")}</h3>
              <p>{t("Capture em RAW/ProRAW e preserve")} <br />{t("mais informação para a edição.")} </p>
              <div className="raw-word" aria-hidden="true">
                RAW<span>+</span>
              </div>
              <small>{t("DISPONÍVEL EM IPHONES COMPATÍVEIS")}</small>
            </article>
            <article className="small-card" data-reveal>
              <Layers size={23} />
              <h3>{t("Um pouco além da foto.")}</h3>
              <p>{t("Live Photo e modo retrato, inclusive juntos quando a lente oferece suporte, em iPhones compatíveis.")} </p>
            </article>
            <article className="small-card" data-reveal>
              <ImageIcon size={23} />
              <h3>{t("Cada foto tem uma história.")}</h3>
              <p>{t("Organize projetos, avalie e compartilhe fotos em lote. Consulte EXIF e localização opcional de cada captura.")} </p>
            </article>
            <article className="small-card" data-reveal>
              <LockKeyhole size={23} />
              <h3>{t("O que é seu fica com você.")}</h3>
              <p>{t("Fotos, preferências e LUTs personalizados salvos no dispositivo. Sua biblioteca, sempre por perto.")} </p>
            </article>
          </div>
        </section>
        <section className="moment-banner">
          <div className="moment-shade" />
          <div data-reveal>
            <span className="eyebrow">{t("NÃO PRECISA SER EXTRAORDINÁRIO.")}</span>
            <h2>{t("Só precisa fazer")} <br />{t("você")} <em>{t("parar.")}</em>
            </h2>
            <span className="moment-caption">{t("UM POUCO DE LUZ. UM OUTRO OLHAR.")} </span>
          </div>
          <span className="photo-credit">{t("Foto: Lucas van Oort / Unsplash")}</span>
        </section>
        <section className="faq-section section-pad">
          <div data-reveal>
            <div className="eyebrow">{t("04 / ANTES DO PRIMEIRO CLIQUE")}</div>
            <h2>{t("Vamos aos")} <br />
              <em>{t("detalhes.")}</em>
            </h2>
          </div>
          <div className="faq-list">
            {questions.map(([q, a]) => (
              <details key={t(q)}>
                <summary>
                  {t(q)}
                  <Plus size={19} />
                </summary>
                <p>
                  {t(a)}

                </p>
              </details>
            ))}
          </div>
        </section>
        <section className="final-cta section-pad" id="projeto" data-reveal>
          <div className="eyebrow">{t("05 / O PRÓXIMO INSTANTE É SEU")}</div>
          <BrandIcon className="cta-logo" size={57} />
          <h2>{t("Saia. Olhe.")} <br />
            <em>{t("Fotografe.")}</em>
          </h2>
          <p>{t("O Komorebi está em desenvolvimento.")} <br />{t("Entre na lista de espera para iPhone.")} </p>
          <Link className="button button-orange" href={path("/lista-de-espera")}>{t("Entrar na lista de espera")} <ArrowUpRight size={20} />
          </Link>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          <BrandIcon size={25} />
          <span>komorebi.</span>
        </a>
        <span>{t("Feito por quem gosta de fotografar.")}</span>
        <div>
          <a
            href="https://www.instagram.com/fotoessencia_/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram <MoveUpRight size={14} />
          </a>
          <Link href={path("/lista-de-espera")}>{t("Lista de espera · iPhone")}</Link>
          <Link href={path("/docs")}>{t("Documentação")}</Link>
          <Link href={path("/politica-de-privacidade")}>{t("Privacidade")}</Link>
          <Link href={path("/termos-de-uso")}>{t("Termos")}</Link>
          <a href="#">{t("Voltar ao topo ↑")}</a>
        </div>
      </footer>
    </>
  );
}
