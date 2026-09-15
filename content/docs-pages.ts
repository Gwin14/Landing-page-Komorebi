import type { FeatureStatus } from "@/lib/feature-matrix";

export type DocsSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type DocsPage = {
  slug: string;
  title: string;
  description: string;
  platform: "iOS e Android" | "Varia por recurso" | "Desenvolvimento";
  status: FeatureStatus;
  prerequisites: string[];
  sections: DocsSection[];
};

export const docsPages: DocsPage[] = [
  {
    slug: "primeiros-passos",
    title: "Primeiros passos",
    description: "Prepare o Komorebi, conceda apenas as permissões necessárias e faça a primeira foto.",
    platform: "iOS e Android",
    status: "supported",
    prerequisites: ["iOS 18 ou Android 8", "Aparelho físico com câmera", "Espaço disponível na biblioteca de mídia"],
    sections: [
      { id: "permissoes", title: "Permissões", paragraphs: ["A câmera é obrigatória para o preview e a captura. A biblioteca de Fotos permite salvar imagens, abrir a galeria integrada e excluir uma foto quando você solicitar. A localização é opcional e serve para gravar GPS no EXIF e consultar clima e localidade."], items: ["Se negar a câmera, a experiência principal não abre.", "Se negar Fotos, o app não consegue salvar nem carregar a galeria integrada.", "Se negar localização, fotografar continua possível, mas GPS, clima e mapa ficam limitados."] },
      { id: "primeira-foto", title: "Faça a primeira foto", items: ["Abra o app e autorize câmera e Fotos.", "Escolha a câmera traseira ou frontal e, quando houver, uma lente física.", "Enquadre, ajuste exposição ou zoom e toque no obturador.", "Abra a miniatura da galeria para conferir a imagem e os metadados disponíveis."] },
      { id: "topbar", title: "Personalize a TopBar", paragraphs: ["Nas configurações, escolha quais controles aparecem e altere a ordem. A TopBar aceita até oito controles e também pode ser exibida abaixo do preview."], items: ["Controles incompatíveis com a câmera ativa podem não aparecer ou ficar indisponíveis.", "As preferências ficam salvas localmente no aparelho."] },
    ],
  },
  {
    slug: "camera",
    title: "Câmera e captura",
    description: "Entenda a interface, escolha lentes e use modos de captura sem assumir suporte universal.",
    platform: "Varia por recurso",
    status: "conditional",
    prerequisites: ["Permissão de câmera", "Permissão de Fotos para salvar", "Aparelho físico para recursos avançados"],
    sections: [
      { id: "interface", title: "Interface da câmera", paragraphs: ["O preview ocupa a área principal. A TopBar reúne atalhos configuráveis; os controles inferiores concentram obturador, galeria, troca de câmera, lentes e ajustes contextuais. Nível e histograma podem ser ativados nas configurações."], items: ["Um destaque visual indica controles ativos.", "A seleção de lente só aparece quando o aparelho informa opções físicas.", "Zoom por pinça e controle dedicado respeitam os limites da câmera ativa."] },
      { id: "captura", title: "Captura padrão e dupla", paragraphs: ["A captura padrão funciona nas duas plataformas. Também há câmera frontal, flash, proporção vertical ou horizontal e captura dupla. O disparo automático por sorriso analisa o preview e só deve ser usado quando o rosto estiver bem iluminado."], items: ["O botão de volume pode disparar a câmera.", "Camera Control depende de um iPhone compatível.", "Flash, lente e proporção disponíveis variam conforme a câmera ativa."] },
      { id: "manual", title: "Controles manuais", paragraphs: ["Compensação, ISO, velocidade do obturador, balanço de branco e foco são oferecidos conforme a capacidade detectada. Volte ao modo automático pelo controle correspondente quando quiser que a câmera recalcule o ajuste."], items: ["O preview pode diferir da imagem processada e salva.", "A validação confiável exige aparelho físico.", "A documentação não afirma que ajustes públicos desativam algoritmos proprietários do sistema."] },
      { id: "modos-ios", title: "Modos avançados no iOS", items: ["RAW e ProRAW exigem formato compatível informado pela lente.", "Live Photo exige suporte nativo e não pode ser combinada com RAW ou retrato.", "Retrato depende de profundidade ou matte disponível.", "Trocar de lente pode alterar imediatamente a disponibilidade do modo."] },
    ],
  },
  {
    slug: "cores-e-efeitos",
    title: "Cores e efeitos",
    description: "Aplique LUTs, grão e halation e escolha se quer guardar uma cópia original.",
    platform: "iOS e Android",
    status: "supported",
    prerequisites: ["Captura válida", "Acesso à biblioteca de mídia", "Arquivo .cube válido para LUT personalizado"],
    sections: [
      { id: "luts", title: "LUTs incluídos", paragraphs: ["O catálogo inclui Guaraná, Maracujá, Mirtilo, Pitaia, Damasco, Cinema, Ameixa e Banana. O efeito é aplicado no processamento da captura e pode ser registrado nos metadados próprios do Komorebi."], items: ["Use Original para não aplicar LUT.", "O preview serve como referência e pode variar da imagem final."] },
      { id: "importacao", title: "Importe um arquivo .cube", items: ["Abra Configurações e entre na área de LUTs personalizados.", "Selecione um arquivo .cube que você criou ou tem licença para usar.", "Confirme a importação; o conteúdo fica armazenado localmente.", "Remova o LUT pelas configurações quando não quiser mais mantê-lo."] },
      { id: "grao-halation", title: "Grão e halation", paragraphs: ["Há seis opções de grão — Fino, Suave, Filme, Granulado, 16 mm e Push — e seis de halation — Suave, Médio, Filme, Âmbar, Neon e Aura. A intensidade faz parte da configuração do efeito."], items: ["A ordem de processamento é administrada pelo pipeline do app.", "Ative a cópia original para salvar também uma versão sem LUT e efeitos quando o fluxo permitir."] },
    ],
  },
  {
    slug: "galeria-e-projetos",
    title: "Galeria e projetos",
    description: "Organize capturas em álbuns, consulte EXIF e use mapa e EXIF Frame com atenção à privacidade.",
    platform: "iOS e Android",
    status: "supported",
    prerequisites: ["Permissão para a biblioteca de mídia", "Localização no EXIF para usar o mapa", "Internet para mapa e EXIF Frame"],
    sections: [
      { id: "albuns", title: "Álbum e projetos", paragraphs: ["Sem projeto ativo, as fotos são salvas no álbum Komorebi. Projetos usam álbuns com o prefixo Komorebi seguido do nome escolhido. O app reconcilia a lista local de projetos com os álbuns disponíveis."], items: ["Crie um projeto nas configurações ou no seletor correspondente.", "Selecione o projeto antes de fotografar para direcionar novas capturas.", "Mover ou excluir projetos altera a organização local; confirme o efeito sobre as fotos antes de concluir."] },
      { id: "exif", title: "EXIF e mapa", paragraphs: ["A galeria lê metadados técnicos, exibe badges do Komorebi e mostra uma foto em tela cheia. Quando a imagem contém coordenadas, o mapa pode carregar serviços externos centralizados naquele local."], items: ["Confira e remova GPS antes de compartilhar imagens sensíveis.", "A exclusão ocorre somente após uma ação sua.", "Metadados podem variar conforme o formato e o sistema operacional."] },
      { id: "exif-frame", title: "EXIF Frame", paragraphs: ["O gerador abre um serviço externo em WebView. Ao usar esse recurso, a imagem e seus metadados podem ser enviados ou injetados no site para montar a moldura. Não use fotos sensíveis sem revisar os dados exibidos."],
      },
    ],
  },
  {
    slug: "configuracoes",
    title: "Configurações",
    description: "Consulte o efeito, a persistência e as dependências das preferências do Komorebi.",
    platform: "iOS e Android",
    status: "supported",
    prerequisites: ["As preferências são mantidas localmente com AsyncStorage"],
    sections: [
      { id: "preview", title: "Preview e auxílio", items: ["Estilo retrô: altera a apresentação do viewfinder.", "Grade: adiciona linhas de composição.", "Nível: mostra o alinhamento do aparelho.", "Histograma: mostra a distribuição de luminosidade em tempo real quando o pipeline ativo oferece suporte.", "Controles invertidos: altera a posição da TopBar."] },
      { id: "captura-opcoes", title: "Captura e metadados", items: ["Som do obturador: ativa ou desativa o som próprio do app, sem substituir regras do sistema.", "Salvar original: mantém uma cópia sem LUT quando aplicável.", "Salvar localização: grava GPS apenas em novas fotos e somente com permissão.", "LUTs personalizados: importa e remove arquivos .cube locais."] },
      { id: "topbar-opcoes", title: "TopBar", paragraphs: ["Escolha até oito controles, defina a ordem e altere a posição. Opções incompatíveis continuam sujeitas à capacidade da lente, ao sistema operacional e às permissões."],
      },
    ],
  },
  {
    slug: "compatibilidade",
    title: "Compatibilidade",
    description: "Consulte a referência pública de suporte e as condições que determinam cada recurso.",
    platform: "Varia por recurso",
    status: "conditional",
    prerequisites: ["iOS 18 ou posterior", "Android 8 ou posterior", "Aparelho físico recomendado"],
    sections: [
      { id: "como-ler", title: "Como ler a matriz", items: ["Suportado: comportamento confirmado no código para a plataforma.", "Condicional: depende de hardware, lente, API ou permissão detectada durante o uso.", "Indisponível: a implementação não existe na plataforma.", "A validar: o código existe, mas ainda falta evidência suficiente em aparelho físico."] },
      { id: "validacao", title: "Validação em aparelho", paragraphs: ["Use um dispositivo físico para testar câmera, biblioteca, GPS, sensores, RAW, Live Photo, retrato, botão de volume e Camera Control. Simuladores não reproduzem todas as capacidades nem o processamento final."],
      },
    ],
  },
  {
    slug: "desenvolvimento",
    title: "Desenvolvimento",
    description: "Entenda a arquitetura do aplicativo e prepare uma contribuição verificável.",
    platform: "Desenvolvimento",
    status: "supported",
    prerequisites: ["Node.js e npm", "Expo SDK 54", "Xcode para iOS ou Android Studio para Android"],
    sections: [
      { id: "ambiente", title: "Prepare o ambiente", items: ["Execute npm install no repositório do aplicativo.", "Use npm start para iniciar o Expo.", "Execute npm run ios ou npm run android para a plataforma desejada.", "Use aparelho físico para validar câmera, mídia e módulos nativos."] },
      { id: "arquitetura", title: "Arquitetura", paragraphs: ["As telas e componentes ficam em app, com hooks para comportamento, contexto para configurações e utilitários para EXIF, LUT e armazenamento. Os módulos Expo locais isolam controles manuais, RAW, Live Photo, retrato e Camera Control, com API pública em index.ts e implementação iOS em modules/*/ios."],
      },
      { id: "contribuir", title: "Contribua", items: ["Crie uma branch focada e use commits curtos com prefixos como feat, fix ou chore.", "Rode npm run lint.", "Teste o fluxo alterado em cada plataforma relevante.", "No Pull Request, registre aparelhos, sistemas, comandos executados e imagens quando houver mudança visual."] },
    ],
  },
];

export function getDocsPage(slug: string) {
  return docsPages.find((page) => page.slug === slug);
}
