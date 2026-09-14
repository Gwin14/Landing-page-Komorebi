"use client";
import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { ArrowLeftRight, ArrowUpRight } from "lucide-react";
import { filters } from "@/lib/site";
import { applyLut, parseCube } from "@/lib/lut";
export default function ColorLab() {
  const [active, setActive] = useState("guarana");
  const [split, setSplit] = useState(48);
  const [status, setStatus] = useState("Preparando a prévia…");
  const canvas = useRef<HTMLCanvasElement>(null);
  const backgroundCanvas = useRef<HTMLCanvasElement>(null);
  const original = useRef<ImageData | null>(null);
  const cache = useRef(new Map<string, ImageData>());
  useEffect(() => {
    let cancelled = false;
    const abort = new AbortController();
    const render = async () => {
      setStatus("Revelando as cores…");
      if (!original.current) {
        const img = new Image();
        img.src = "/images/forest.jpg";
        await img.decode();
        if (cancelled) return;
        const offscreen = document.createElement("canvas");
        offscreen.width = 1100;
        offscreen.height = 640;
        const ctx = offscreen.getContext("2d")!;
        const scale = Math.max(1100 / img.width, 640 / img.height);
        ctx.drawImage(
          img,
          (1100 - img.width * scale) / 2,
          (640 - img.height * scale) / 2,
          img.width * scale,
          img.height * scale,
        );
        original.current = ctx.getImageData(0, 0, 1100, 640);
      }
      let result = original.current;
      if (active !== "original") {
        if (!cache.current.has(active)) {
          const response = await fetch(`/luts/${active}.cube`, {
            signal: abort.signal,
          });
          if (!response.ok) throw new Error("LUT indisponível");
          const lut = parseCube(await response.text());
          if (cancelled) return;
          cache.current.set(active, applyLut(original.current, lut));
        }
        result = cache.current.get(active)!;
      }
      if (cancelled) return;
      backgroundCanvas.current
        ?.getContext("2d")
        ?.putImageData(original.current, 0, 0);
      canvas.current?.getContext("2d")?.putImageData(result, 0, 0);
      setStatus("");
    };
    render().catch(() => {
      if (!cancelled)
        setStatus(
          "Não foi possível carregar este LUT. Selecione outro para tentar novamente.",
        );
    });
    return () => {
      cancelled = true;
      abort.abort();
    };
  }, [active]);
  const filter = filters.find((f) => f.id === active)!;
  return (
    <div className="color-lab" data-reveal>
      <div className="compare-image">
        <NextImage
          width={2400}
          height={1602}
          src="/images/forest.jpg"
          alt="Luz do sol atravessando uma floresta, usada para comparar os LUTs"
        />
        <canvas
          width={1100}
          height={640}
          ref={backgroundCanvas}
          aria-hidden="true"
        />
        <canvas
          width={1100}
          height={640}
          ref={canvas}
          style={{ clipPath: `inset(0 0 0 ${split}%)` }}
          aria-label={`Fotografia com o LUT ${filter.name}`}
        />
        <span className="image-label original-label">ORIGINAL</span>
        <span className="image-label filtered-label">
          {filter.name.toUpperCase()}
        </span>
        <div className="compare-divider" style={{ left: `${split}%` }}>
          <span>
            <ArrowLeftRight size={20} />
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-label="Comparar foto original e foto com LUT"
          aria-valuetext={`${split}% original, ${100 - split}% com ${filter.name}`}
        />
        <div className="compare-caption">
          <span>ARRASTE PARA SENTIR A DIFERENÇA</span>
          <span>01 / LUZ ENTRE FOLHAS</span>
        </div>
        <div className="lut-status" role="status">
          {status}
        </div>
      </div>
      <div className="filter-options" role="group" aria-label="Escolha um LUT">
        {filters.map((f) => (
          <button
            key={f.id}
            aria-pressed={active === f.id}
            className={active === f.id ? "filter is-active" : "filter"}
            onClick={() => setActive(f.id)}
          >
            <span style={{ background: f.color }} />
            {f.name}
          </button>
        ))}
      </div>
      <div className="lab-footer">
        <p>{filter.description}</p>
        <span>
          LUTs reais do app · prévia no navegador <ArrowUpRight size={15} />
        </span>
      </div>
    </div>
  );
}
