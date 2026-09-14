"use client";
import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { Rotate3D, Pause, Play } from "lucide-react";
import { PHONE_SCREEN } from "@/lib/site";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

async function screenTexture() {
  const img = new Image();
  img.src = PHONE_SCREEN || "/images/forest.jpg";
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = 720;
  canvas.height = 1560;
  const ctx = canvas.getContext("2d")!;
  if (PHONE_SCREEN) ctx.drawImage(img, 0, 0, 720, 1560);
  else {
    ctx.fillStyle = "#090b09";
    ctx.fillRect(0, 0, 720, 1560);
    ctx.fillStyle = "#f4f3e9";
    ctx.font = "500 24px Arial";
    ctx.fillText("9:41", 48, 64);
    ctx.fillText("•••  ▰", 595, 64);
    ctx.font = "34px Arial";
    ctx.fillText("ϟ", 49, 160);
    ctx.fillText("◎", 238, 160);
    ctx.fillText("◉", 428, 160);
    ctx.fillText("⚙", 625, 160);
    const ratio = Math.max(680 / img.width, 955 / img.height);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(20, 215, 680, 955, 20);
    ctx.clip();
    ctx.drawImage(
      img,
      20 + (680 - img.width * ratio) / 2,
      215 + (955 - img.height * ratio) / 2,
      img.width * ratio,
      img.height * ratio,
    );
    ctx.strokeStyle = "#ffffff35";
    ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(20 + (680 * i) / 3, 215);
      ctx.lineTo(20 + (680 * i) / 3, 1170);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(20, 215 + (955 * i) / 3);
      ctx.lineTo(700, 215 + (955 * i) / 3);
      ctx.stroke();
    }
    ctx.strokeStyle = "#ffb947";
    ctx.lineWidth = 2;
    ctx.strokeRect(302, 642, 116, 116);
    ctx.restore();
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    ctx.fillText("RAW", 43, 255);
    ctx.fillText("5600K", 588, 255);
    ctx.fillStyle = "#10160dcc";
    ctx.beginPath();
    ctx.roundRect(283, 1090, 154, 52, 26);
    ctx.fill();
    ctx.fillStyle = "#efbc64";
    ctx.font = "24px Arial";
    ctx.fillText("1×", 302, 1125);
    ctx.fillStyle = "#ddd";
    ctx.fillText("2×", 372, 1125);
    ctx.fillStyle = "#bebfb3";
    ctx.font = "19px Arial";
    ctx.fillText("ISO 100", 65, 1230);
    ctx.fillText("1/250 s", 300, 1230);
    ctx.fillText("ƒ / 1.8", 570, 1230);
    ctx.strokeStyle = "#ffb947";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.roundRect(310, 1310, 100, 100, 31);
    ctx.stroke();
    ctx.fillStyle = "#22261e";
    ctx.beginPath();
    ctx.roundRect(65, 1330, 57, 57, 10);
    ctx.fill();
    ctx.fillStyle = "#ddd";
    ctx.font = "37px Arial";
    ctx.fillText("↻", 591, 1376);
    ctx.fillStyle = "#d2d2c3";
    ctx.font = "17px Arial";
    ctx.textAlign = "center";
    ctx.fillText("K O M O R E B I", 360, 1481);
    ctx.fillStyle = "#ddd";
    ctx.beginPath();
    ctx.roundRect(255, 1520, 210, 7, 4);
    ctx.fill();
  }
  ctx.fillStyle = "#030403";
  ctx.beginPath();
  ctx.roundRect(265, 27, 190, 47, 24);
  ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export default function PhoneScene() {
  const host = useRef<HTMLDivElement>(null);
  const desiredRotation = useRef(0);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  useEffect(() => {
    const el = host.current!;
    let disposed = false,
      raf = 0,
      model: THREE.Group | null = null,
      dragging = false,
      lastX = 0;
    let renderer: THREE.WebGLRenderer;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      const timer = window.setTimeout(() => setStatus("error"), 0);
      return () => clearTimeout(timer);
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 5.9);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04);
    scene.environment = env.texture;
    room.dispose();
    pmrem.dispose();
    const key = new THREE.DirectionalLight(0xfff0d6, 4);
    key.position.set(-3, 3, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff8a42, 3);
    rim.position.set(3, 0, -3);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const resize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    const disposeModel = (root: THREE.Group) =>
      root.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const mats = Array.isArray(object.material)
            ? object.material
            : [object.material];
          mats.forEach((m) => {
            Object.values(m).forEach((v) => {
              if (v instanceof THREE.Texture) v.dispose();
            });
            m.dispose();
          });
        }
      });
    let texture: THREE.CanvasTexture | null = null;
    Promise.all([
      new GLTFLoader().loadAsync("/models/iphone.glb"),
      screenTexture(),
    ])
      .then(([gltf, screen]) => {
        if (disposed) {
          disposeModel(gltf.scene);
          screen.dispose();
          return;
        }
        texture = screen;
        model = gltf.scene;
        model.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => {
            if (material.name.startsWith("screen")) {
              object.material = new THREE.MeshBasicMaterial({
                color: "#050605",
              });
              material.dispose();
            } else if (material instanceof THREE.MeshStandardMaterial) {
              if (/basecolor|metalframe|backpanel/.test(material.name)) {
                material.color.set("#b96436");
                material.metalness = 0.7;
                material.roughness = 0.28;
              }
              if (material.name.startsWith("glass")) {
                material.transparent = true;
                material.opacity = 0.06;
                material.depthWrite = false;
                material.color.set("#b7c3ca");
                material.metalness = 0.15;
                material.roughness = 0.1;
              }
              if (material.name === "lensinglass") {
                material.color.set("#101b23");
                material.metalness = 0.55;
                material.roughness = 0.15;
              }
            }
          });
        });
        // A dedicated screen surface sits just above the source glass, without changing the supplied body.
        const shape = new THREE.Shape();
        const w = 0.765,
          h = 1.642,
          r = 0.09,
          x = -w / 2,
          y = -h / 2;
        shape.moveTo(x + r, y);
        shape.lineTo(x + w - r, y);
        shape.quadraticCurveTo(x + w, y, x + w, y + r);
        shape.lineTo(x + w, y + h - r);
        shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        shape.lineTo(x + r, y + h);
        shape.quadraticCurveTo(x, y + h, x, y + h - r);
        shape.lineTo(x, y + r);
        shape.quadraticCurveTo(x, y, x + r, y);
        const geo = new THREE.ShapeGeometry(shape, 24);
        const pos = geo.attributes.position;
        const uv = new Float32Array(pos.count * 2);
        for (let i = 0; i < pos.count; i++) {
          uv[i * 2] = 1 - (pos.getX(i) - x) / w;
          uv[i * 2 + 1] = (pos.getY(i) - y) / h;
        }
        geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
        const display = new THREE.Mesh(
          geo,
          new THREE.MeshBasicMaterial({
            map: screen,
            side: THREE.DoubleSide,
            toneMapped: false,
          }),
        );
        display.position.z = -0.0675;
        model.add(display);
        model.scale.setScalar(1.83);
        model.rotation.set(-0.1, Math.PI + 0.28, -0.12);
        scene.add(model);
        setStatus("ready");
      })
      .catch(() => {
        if (!disposed) setStatus("error");
      });
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (dragging) {
        desiredRotation.current += (e.clientX - lastX) * 0.009;
        lastX = e.clientX;
      }
    };
    const up = () => {
      dragging = false;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
      },
      { rootMargin: "100px" },
    );
    observer.observe(el);
    const contextLost = (e: Event) => {
      e.preventDefault();
      setStatus("error");
    };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    const start = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!inView || document.hidden) return;
      if (model) {
        const animate = !reduce.matches && !pausedRef.current;
        const t = (now - start) / 1000;
        const scroll = animate ? Math.min(window.scrollY / 800, 1.4) : 0;
        const target = Math.PI + 0.28 + desiredRotation.current + scroll * 1.45;
        model.rotation.y = THREE.MathUtils.lerp(model.rotation.y, target, 0.07);
        if (animate) {
          model.rotation.z = -0.12 + Math.sin(t * 0.45) * 0.025;
          model.position.y = Math.sin(t * 0.7) * 0.035;
        }
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      observer.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      if (model) disposeModel(model);
      texture?.dispose();
      env.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div className="phone-scene">
      <div
        ref={host}
        className="webgl-host"
        role="img"
        aria-label="Modelo 3D interativo do iPhone com uma prévia ilustrativa do Komorebi"
      />
      {status === "loading" && (
        <div className="scene-loading">
          <span className="loading-aperture">◎</span>
          <span>Revelando os detalhes…</span>
        </div>
      )}
      {status === "error" && (
        <div className="scene-fallback">
          <NextImage
            src="/images/app-preview.png"
            width={1920}
            height={1080}
            alt="Prévia do aplicativo Komorebi"
          />
          <span>Prévia do Komorebi</span>
        </div>
      )}
      {status === "ready" && (
        <div className="scene-controls">
          <button
            onClick={() => {
              desiredRotation.current += Math.PI;
            }}
            aria-label="Girar iPhone 180 graus"
          >
            <Rotate3D size={16} />
            <span>Gire para explorar</span>
          </button>
          <button
            aria-label={paused ? "Retomar animação" : "Pausar animação"}
            aria-pressed={paused}
            onClick={() => {
              pausedRef.current = !paused;
              setPaused(!paused);
            }}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      )}
      <span className="screen-disclaimer">TELA ILUSTRATIVA</span>
    </div>
  );
}
