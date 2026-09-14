# Komorebi — Landing page

Landing page em Next.js, React, TypeScript e Three.js. Conteúdo baseado no código e no README do app Komorebi, sem links de download ou disponibilidade inventados.

## Desenvolvimento

```bash
npm ci
npm run dev -- --port 3017
```

Abra http://127.0.0.1:3017. A porta exclusiva evita conflitos com caches e service workers de outros projetos locais.

```bash
npm run lint
npm run typecheck
npm run build
```

O build estático fica em `out/`, pronto para hospedagem estática. Para desenvolvimento, use `npm run dev`. Para inspecionar o build, `npx serve out -l 3017` (o `next start` não é usado com exportação estática).

## Substituir pela tela oficial

1. Salve a captura vertical em `public/images/app-screen.png`.
2. Em `lib/site.ts`, altere `PHONE_SCREEN` de `null` para `'/images/app-screen.png'`.
3. Atualize o texto “TELA ILUSTRATIVA” em `components/PhoneScene.tsx` quando a imagem oficial estiver integrada.

A textura ocupa a tela frontal do modelo 3D. A imagem provisória é uma interface ilustrativa renderizada em canvas, não uma captura oficial do app. O recorte foi preparado para proporção aproximada de 720 × 1560. Use uma imagem sem moldura de aparelho.

## Interações

- Arraste horizontalmente o iPhone para girá-lo, ou use o botão acessível “Girar iPhone 180 graus”.
- A rolagem modifica a rotação; flutuação sutil acompanha o estado ativo.
- Botão de pausa e suporte a `prefers-reduced-motion`.
- A cena deixa de renderizar quando está fora da tela ou a aba está oculta.
- Fallback com o mockup original do app quando WebGL não está disponível.
- Comparação antes/depois com slider acessível e os oito arquivos `.cube` reais do app.
- LUTs com interpolação trilinear e cache por seleção. A prévia usa o gerenciamento de cor do navegador; pode diferir do pipeline nativo e da tela do aparelho.
- FAQ com elementos nativos `details` e `summary`; navegação responsiva.

## Recursos e procedência

- `public/models/iphone.glb`: convertido do FBX fornecido em `iphone-17-pro-max/source/iPhone 16 Pro Max(Post).fbx`. O nome do FBX indica iPhone 16 Pro Max; a pasta e a textura indicam iPhone 17. Foi preservada a geometria fornecida, com correção de orientação e materiais. A titularidade/licença do modelo não veio acompanhada dos arquivos.
- `public/luts/`: cópias dos oito LUTs de `Komorebi/assets/luts/`.
- `public/images/app-preview.png`: mockup já existente no projeto Komorebi.
- `public/images/forest.jpg`: Lucas van Oort, “Dark mystical forest”, Unsplash. https://unsplash.com/photos/green-trees-with-sun-rays-kfVwI-kShCw — Unsplash License.
- Ícones: Lucide. Tipografia: DM Sans e Manrope, Google Fonts.

Os recursos e requisitos de hardware foram conferidos no código e na documentação local do app. A landing page não altera o repositório do aplicativo. O botão principal de acompanhamento aponta para o repositório oficial; substitua `PROJECT_URL` em `lib/site.ts` quando houver uma página de lançamento.
