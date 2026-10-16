# Komorebi — Landing page

Landing page em Next.js, React, TypeScript e Three.js. Conteúdo baseado no código e no README do app Komorebi, sem links de download ou disponibilidade inventados.

## Desenvolvimento

```bash
npm ci
npm run dev -- --port 3017
```

Abra http://127.0.0.1:3017. A porta exclusiva evita conflitos com caches e service workers de outros projetos locais.

Defina `NEXT_PUBLIC_SITE_URL` com a URL pública, sem caminho final, no ambiente de produção. Na Vercel, a URL de produção é detectada automaticamente; localmente, o fallback é `http://localhost:3000`.

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com npm run build
```

```bash
npm run lint
npm run typecheck
npm run build
```

O build fica em `.next/`. O site usa Next.js na Vercel: as páginas continuam pré-renderizadas e a rota de lista de espera executa no servidor. Para desenvolvimento, use `npm run dev`; para conferir o build, `npm run build` e `npx next start --hostname 127.0.0.1 --port 3017`. A exportação estática foi removida para permitir o POST ao Notion.

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

Os recursos e requisitos de hardware foram conferidos no código e na documentação local do app. O site direciona visitantes à lista de espera e aos guias de uso. A documentação pública não oferece acesso ao código nem edição pelo GitHub.

## Documentação pública

Os 13 guias ficam em `content/docs-pages.ts`. A navegação, os grupos e as palavras-chave da busca ficam em `lib/docs-navigation.ts`. Cada guia traz instruções e limites de uso, sem referências a arquivos internos ou commits. A revisão de 16 de outubro de 2026 usa o Komorebi `3936ee8` e inclui megapixels por formato, Focus peaking, Rastros de luz, tour inicial, widgets e atalhos, seis idiomas no app, Estilos Fotográficos na galeria e a preferência conjunta de PostHog/Sentry. Os guias e traduções apresentam somente as opções disponíveis na interface atual. Páginas, busca e sitemap são gerados a partir desse conteúdo.

A sidebar permite recolher cada seção e abre a seção da página atual. No celular, o menu também agrupa as páginas em seções recolhíveis e tem rolagem própria. O header da landing page permanece visível durante a rolagem.

Para atualizar os guias, compare o código do repositório `../Komorebi` com as notas técnicas: algumas notas registram uma etapa antiga da implementação. Revise especialmente seleção de formatos, restrições dos modos, cópias sem efeitos, permissões e serviços externos. Registre o commit e a data em `lib/feature-matrix.ts` somente após a revisão. Diferencie recursos implementados de qualidade e desempenho ainda pendentes de teste físico.

```bash
npm run test:docs
npm run check:komorebi-drift
npm run build
npm run check:links
```

Use `KOMOREBI_REPOSITORY=/caminho/do/app npm run check:komorebi-drift` se o app estiver em outro diretório. Esse comando compara commits; ele não confirma sozinho a exatidão do texto nem testa hardware.

## Lista de espera para iPhone

`/lista-de-espera` envia somente o e-mail para `POST /api/lista-espera`. A rota lê `notion_api_token` apenas no servidor, resolve a fonte de dados da database `3f738f6e-9296-8094-aa28-d717fd5a10f5`, descobre a propriedade de título e cria uma página cujo nome é o e-mail normalizado. Antes de criar, consulta o mesmo título para evitar cadastros repetidos em envios sequenciais. Notion não oferece restrição única: envios simultâneos ainda podem gerar duplicatas. Nenhum convite é enviado nesta etapa.

Configure `notion_api_token` em Preview e Production na Vercel e conceda à integração acesso de leitura e inserção à database original. O token nunca deve ter prefixo `NEXT_PUBLIC_`. A database deve conter uma única fonte de dados; o servidor recusa uma seleção ambígua. Para desenvolvimento local, use uma credencial de Development em `.env.local` (ignorada pelo Git).

O endpoint valida origem, formato e tamanho do corpo, valida e-mail no servidor e ignora o campo anti-spam oculto. Respostas não retornam e-mails, IDs de páginas ou erros internos do Notion; logs não registram o e-mail. O formulário informa que a lista é para iPhone e que o e-mail será usado somente para o convite futuro.

```bash
npm run test:waitlist
npm run test:docs
npm run typecheck
npm run build
npm run check:links
```

`npm run test:waitlist:live` é uma verificação explícita com o token do ambiente: cria um e-mail sintético em `example.com`, testa a rota real e a consulta de duplicatas e arquiva a página sintética ao finalizar. Não executa automaticamente no build normal nem envia mensagens.

## Idiomas

O site inteiro está disponível em português (`/pt`) e inglês (`/en`), incluindo documentação, busca, formulário, páginas legais, metadados e imagens de compartilhamento. Links antigos sem prefixo continuam funcionando: `proxy.ts` redireciona conforme a preferência salva ou o primeiro idioma preferido no cabeçalho `Accept-Language`. Variantes como `pt-BR` e `pt-PT` usam português; qualquer outro idioma, ou ausência do cabeçalho, usa inglês.

O seletor de idioma aparece em todas as páginas, preserva a página atual, os parâmetros e a âncora e salva a escolha no cookie `komorebi-locale` por um ano. A URL explícita tem prioridade; a preferência salva prevalece sobre o navegador nos acessos sem prefixo. A detecção acontece no servidor, antes da renderização, mantendo as páginas pré-renderizadas.

Os textos em português permanecem nos componentes e arquivos de conteúdo. `content/i18n/en.json` contém as traduções correspondentes; as chaves são os textos originais. Ao mudar um texto em português, atualize sua chave e tradução. `content/i18n/ui-keys.json` seleciona os textos enviados aos componentes de cliente; textos de guias e páginas legais são traduzidos somente no servidor. A busca recebe o índice traduzido no idioma atual.

```bash
npm run test:i18n
```
