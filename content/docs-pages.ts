import type { FeatureStatus } from "@/lib/feature-matrix";

export type DocsSection = {
  id: string;
  title: string;
  badge?: "Novo" | "Beta";
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
    description:
      "Prepare o Komorebi, conceda apenas as permissões necessárias e faça a primeira foto.",
    platform: "iOS e Android",
    status: "supported",
    prerequisites: [
      "iOS 18 ou Android 8",
      "Aparelho físico com câmera",
      "Espaço disponível na biblioteca de mídia",
    ],
    sections: [
      {
        id: "permissoes",
        title: "Permissões",
        paragraphs: [
          "A câmera é obrigatória para o preview e a captura. A biblioteca de Fotos permite salvar imagens, abrir a galeria integrada e excluir uma foto quando você solicitar. A localização é opcional e serve para gravar GPS no EXIF e consultar clima e localidade.",
        ],
        items: [
          "Se negar a câmera, a experiência principal não abre.",
          "Se negar Fotos, o app não consegue salvar nem carregar a galeria integrada.",
          "Se negar localização, fotografar continua possível, mas GPS, clima e mapa ficam limitados.",
        ],
      },
      {
        id: "primeira-foto",
        title: "Faça a primeira foto",
        items: [
          "Abra o app e autorize câmera e Fotos.",
          "Escolha a câmera traseira ou frontal e, quando houver, uma lente física.",
          "Enquadre, ajuste exposição ou zoom e toque no obturador.",
          "Abra a miniatura da galeria para conferir a imagem e os metadados disponíveis.",
        ],
      },
      {
        id: "topbar",
        title: "Organize os atalhos da câmera",
        paragraphs: [
          "Nas configurações, escolha quais controles aparecem e altere a ordem. A TopBar aceita até oito controles e também pode ser exibida abaixo do preview.",
        ],
        items: [
          "Controles incompatíveis com a câmera ativa podem não aparecer ou ficar indisponíveis.",
          "As preferências ficam salvas localmente no aparelho.",
        ],
      },
    ],
  },
  {
    slug: "camera",
    title: "Câmera e captura",
    description:
      "Entenda a interface, escolha lentes e use modos de captura sem assumir suporte universal.",
    platform: "Varia por recurso",
    status: "conditional",
    prerequisites: [
      "Permissão de câmera",
      "Permissão de Fotos para salvar",
      "Aparelho físico para recursos avançados",
    ],
    sections: [
      {
        id: "conheca-a-camera",
        title: "Conheça a câmera",
        paragraphs: [
          "O preview ocupa a área principal. A TopBar reúne atalhos configuráveis; os controles inferiores concentram obturador, galeria, troca de câmera, lentes e ajustes contextuais. Nível e histograma podem ser ativados nas configurações.",
        ],
        items: [
          "Um destaque visual indica controles ativos.",
          "Toque no preview para escolher o ponto de foco em aparelhos compatíveis.",
          "A miniatura no canto inferior abre o projeto ou álbum ativo.",
        ],
      },
      {
        id: "tire-uma-foto",
        title: "Tire uma foto",
        paragraphs: [
          "Enquadre a cena e toque no obturador. O app processa a captura em segundo plano, aplica os efeitos selecionados e salva o resultado no álbum Komorebi ou no projeto ativo.",
        ],
        items: [
          "A animação na miniatura indica que ainda há fotos na fila de processamento.",
          "Evite fechar o app enquanto a fila estiver ativa.",
        ],
      },
      {
        id: "lentes-zoom-foco",
        title: "Use lentes, zoom e foco",
        items: [
          "O seletor de lentes aparece somente quando o aparelho informa mais de uma câmera física.",
          "Faça o gesto de pinça ou use o controle dedicado para ajustar o zoom dentro dos limites da lente.",
          "Toque em um ponto do preview para definir foco e o assunto de referência do próximo Scan.",
        ],
      },
      {
        id: "selfie-flash-proporcao",
        title: "Use câmera frontal, flash e proporção",
        items: [
          "Use o botão de alternância para fotografar com a câmera frontal.",
          "Flash e lentes disponíveis mudam conforme a câmera ativa.",
          "O controle de proporção alterna o enquadramento horizontal 4:3 e vertical 9:16.",
        ],
      },
      {
        id: "auxilios-de-enquadramento",
        title: "Ative grade, nível e histograma",
        paragraphs: [
          "Grade, nível do aparelho e histograma em tempo real são auxílios visuais opcionais. Ative cada um em Configurações; eles não são gravados na foto.",
        ],
      },
      {
        id: "exposicao-e-controles-manuais",
        title: "Ajuste exposição e controles manuais",
        paragraphs: [
          "Compensação, ISO, velocidade do obturador, balanço de branco e foco são oferecidos conforme a capacidade detectada. Volte ao modo automático pelo controle correspondente quando quiser que a câmera recalcule o ajuste.",
        ],
        items: [
          "O preview pode diferir da imagem processada e salva.",
          "A validação confiável exige aparelho físico.",
          "A documentação não afirma que ajustes públicos desativam algoritmos proprietários do sistema.",
        ],
      },
      {
        id: "captura-dupla-e-sorriso",
        title: "Use captura dupla e disparo por sorriso",
        paragraphs: [
          "A captura dupla produz composições complementares a partir do enquadramento ativo. O disparo por sorriso analisa o primeiro rosto detectado e fotografa automaticamente quando há iluminação e expressão suficientes.",
        ],
        items: [
          "O detector de sorriso entra em pausa durante o Scanner de composição.",
          "Resultado e disponibilidade podem variar conforme a cena e o aparelho.",
        ],
      },
      {
        id: "scanner-de-composicao",
        title: "Use o Scanner de composição",
        badge: "Beta",
        paragraphs: [
          "No iOS, o Scan analisa um frame sob demanda, identifica um assunto e exibe uma moldura para orientar o reenquadramento. Ao alinhar a moldura, o app ajusta o zoom dentro do limite da lente; o recurso não dispara nem salva uma foto sozinho.",
        ],
        items: [
          "Funciona na câmera traseira nos modos normal, manual e RAW/ProRAW; não aparece em Live Photo, Retrato ou Android.",
          "Toque primeiro no assunto para orientar o próximo Scan. Sem seleção, o app escolhe uma região da cena.",
          "A análise básica usa recursos do aparelho. Em Configurações, o modelo MiniCPM-V opcional adiciona análise semântica local e ocupa cerca de 1,6 GB.",
          "Frames, sugestões e caixas detectadas não são enviados a um servidor nem gravados na foto.",
        ],
      },
      {
        id: "raw-proraw",
        title: "Capture em RAW ou ProRAW",
        items: [
          "Disponível somente no iOS quando a lente informa um formato compatível.",
          "RAW e ProRAW não podem ser combinados com Live Photo ou Retrato.",
          "A proporção 9:16 é derivada do sensor 4:3 para preservar a captura RAW.",
        ],
      },
      {
        id: "live-photo",
        title: "Capture uma Live Photo",
        items: [
          "Disponível somente no iOS e em hardware compatível.",
          "O modo exige RAW e Retrato desativados.",
          "A foto e o trecho de movimento são salvos como um par na biblioteca.",
        ],
      },
      {
        id: "retrato",
        title: "Tire um retrato",
        items: [
          "Disponível somente no iOS quando a câmera fornece profundidade ou matte de retrato.",
          "Trocar de lente pode alterar imediatamente a disponibilidade do modo.",
          "RAW e Live Photo precisam estar desativados.",
        ],
      },
      {
        id: "heif-ou-jpeg",
        title: "Escolha entre HEIF e JPEG",
        badge: "Novo",
        paragraphs: [
          "No iPhone, novas fotos são salvas em HEIF por padrão. Ative Salvar fotos em JPEG nas configurações quando precisar de maior compatibilidade com outros aplicativos e serviços.",
        ],
        items: [
          "A preferência também é aplicada a Live Photos, retratos, capturas duplas e cópias sem efeitos quando o fluxo permitir.",
          "RAW e ProRAW mantêm seus formatos próprios; a imagem derivada pode seguir a preferência escolhida.",
        ],
      },
      {
        id: "botoes-fisicos",
        title: "Dispare com os botões físicos",
        items: [
          "Os botões de volume podem acionar o obturador.",
          "Camera Control funciona somente em iPhones com o controle físico correspondente.",
          "Os mesmos bloqueios da interface se aplicam enquanto uma foto está sendo processada.",
        ],
      },
    ],
  },
  {
    slug: "cores-e-efeitos",
    title: "Cores e efeitos",
    description:
      "Aplique LUTs, grão e halation e escolha se quer guardar uma cópia original.",
    platform: "iOS e Android",
    status: "supported",
    prerequisites: [
      "Captura válida",
      "Acesso à biblioteca de mídia",
      "Arquivo .cube válido para LUT personalizado",
    ],
    sections: [
      {
        id: "luts",
        title: "LUTs incluídos",
        paragraphs: [
          "O catálogo inclui Guaraná, Maracujá, Mirtilo, Pitaia, Damasco, Cinema, Ameixa e Banana. O efeito é aplicado no processamento da captura e pode ser registrado nos metadados próprios do Komorebi.",
        ],
        items: [
          "Use Original para não aplicar LUT.",
          "O preview serve como referência e pode variar da imagem final.",
        ],
      },
      {
        id: "importacao",
        title: "Importe um arquivo .cube",
        items: [
          "Abra Configurações e entre na área de LUTs personalizados.",
          "Selecione um arquivo .cube que você criou ou tem licença para usar.",
          "Confirme a importação; o conteúdo fica armazenado localmente.",
          "Remova o LUT pelas configurações quando não quiser mais mantê-lo.",
        ],
      },
      {
        id: "grao-halation",
        title: "Aplique grão e halation",
        badge: "Novo",
        paragraphs: [
          "Grão e halation foram recalibrados e agora oferecem três intensidades diretas: Suave, Médio e Forte. O grão simula textura fotográfica; o halation cria um halo avermelhado difuso ao redor de altas luzes com contraste local.",
        ],
        items: [
          "Escolha Sem Grão ou Sem Halation para desligar cada efeito.",
          "LUT, grão e halation podem ser combinados no mesmo processamento.",
          "Ative a cópia original para salvar também uma versão sem LUT e efeitos quando o fluxo permitir.",
        ],
      },
    ],
  },
  {
    slug: "galeria-e-projetos",
    title: "Galeria e projetos",
    description:
      "Organize capturas em álbuns, consulte EXIF e use mapa e EXIF Frame com atenção à privacidade.",
    platform: "iOS e Android",
    status: "supported",
    prerequisites: [
      "Permissão para a biblioteca de mídia",
      "Localização no EXIF para usar o mapa",
      "Internet para mapa e EXIF Frame",
    ],
    sections: [
      {
        id: "albuns",
        title: "Álbum e projetos",
        paragraphs: [
          "Sem projeto ativo, as fotos são salvas no álbum Komorebi. Projetos usam álbuns com o prefixo Komorebi seguido do nome escolhido. O app reconcilia a lista local de projetos com os álbuns disponíveis.",
        ],
        items: [
          "Crie um projeto nas configurações ou no seletor correspondente.",
          "Selecione o projeto antes de fotografar para direcionar novas capturas.",
          "Mover ou excluir projetos altera a organização local; confirme o efeito sobre as fotos antes de concluir.",
        ],
      },
      {
        id: "exif",
        title: "EXIF e mapa",
        paragraphs: [
          "A galeria lê metadados técnicos, exibe badges do Komorebi e mostra uma foto em tela cheia. Quando a imagem contém coordenadas, o mapa pode carregar serviços externos centralizados naquele local.",
        ],
        items: [
          "Confira e remova GPS antes de compartilhar imagens sensíveis.",
          "A exclusão ocorre somente após uma ação sua.",
          "Metadados podem variar conforme o formato e o sistema operacional.",
        ],
      },
      {
        id: "exif-frame",
        title: "EXIF Frame",
        paragraphs: [
          "O gerador abre um serviço externo em WebView. Ao usar esse recurso, a imagem e seus metadados podem ser enviados ou injetados no site para montar a moldura. Não use fotos sensíveis sem revisar os dados exibidos.",
        ],
      },
    ],
  },
  {
    slug: "configuracoes",
    title: "Configurações",
    description:
      "Consulte o efeito, a persistência e as dependências das preferências do Komorebi.",
    platform: "iOS e Android",
    status: "supported",
    prerequisites: ["As preferências são mantidas localmente com AsyncStorage"],
    sections: [
      {
        id: "preview",
        title: "Preview e auxílio",
        items: [
          "Estilo retrô: altera a apresentação do viewfinder.",
          "Grade: adiciona linhas de composição.",
          "Nível: mostra o alinhamento do aparelho.",
          "Histograma: mostra a distribuição de luminosidade em tempo real quando o pipeline ativo oferece suporte.",
          "Scanner de composição (beta): mostra uma guia de reenquadramento no iOS.",
          "Controles invertidos: altera a posição da TopBar.",
        ],
      },
      {
        id: "inteligencia-do-scan",
        title: "Inteligência do Scan",
        badge: "Novo",
        paragraphs: [
          "No iOS, você pode baixar ou remover o modelo MiniCPM-V usado pelo Scanner de composição. O download ocupa cerca de 1,6 GB, fica no aparelho e é opcional: sem ele, o Scan continua com a análise básica fornecida pelo sistema.",
        ],
      },
      {
        id: "captura-opcoes",
        title: "Captura e metadados",
        items: [
          "Som do obturador: ativa ou desativa o som próprio do app, sem substituir regras do sistema.",
          "Salvar cópia sem efeitos: mantém uma versão sem LUT, grão ou halation quando aplicável.",
          "Salvar localização: grava GPS apenas em novas fotos e somente com permissão.",
          "Salvar fotos em JPEG (iOS): troca o padrão HEIF por JPEG para ampliar a compatibilidade.",
          "LUTs personalizados: importa e remove arquivos .cube locais.",
        ],
      },
      {
        id: "topbar-opcoes",
        title: "TopBar",
        paragraphs: [
          "Escolha até oito controles, defina a ordem e altere a posição. Opções incompatíveis continuam sujeitas à capacidade da lente, ao sistema operacional e às permissões.",
        ],
      },
    ],
  },
  {
    slug: "compatibilidade",
    title: "Compatibilidade",
    description:
      "Consulte a referência pública de suporte e as condições que determinam cada recurso.",
    platform: "Varia por recurso",
    status: "conditional",
    prerequisites: [
      "iOS 18 ou posterior",
      "Android 8 ou posterior",
      "Aparelho físico recomendado",
    ],
    sections: [
      {
        id: "como-ler",
        title: "Como ler a matriz",
        items: [
          "Suportado: comportamento confirmado no código para a plataforma.",
          "Condicional: depende de hardware, lente, API ou permissão detectada durante o uso.",
          "Indisponível: a implementação não existe na plataforma.",
          "A validar: o código existe, mas ainda falta evidência suficiente em aparelho físico.",
        ],
      },
      {
        id: "validacao",
        title: "Validação em aparelho",
        paragraphs: [
          "Use um dispositivo físico para testar câmera, biblioteca, GPS, sensores, RAW, Live Photo, retrato, botão de volume e Camera Control. Simuladores não reproduzem todas as capacidades nem o processamento final.",
        ],
      },
    ],
  },
  {
    slug: "desenvolvimento",
    title: "Desenvolvimento",
    description:
      "Entenda a arquitetura do aplicativo e prepare uma contribuição verificável.",
    platform: "Desenvolvimento",
    status: "supported",
    prerequisites: [
      "Node.js e npm",
      "Expo SDK 54",
      "Xcode para iOS ou Android Studio para Android",
    ],
    sections: [
      {
        id: "ambiente",
        title: "Prepare o ambiente",
        items: [
          "Execute npm install no repositório do aplicativo.",
          "No iOS, execute npm run setup:minicpm-ios para preparar o runtime local do Scan antes de instalar os pods.",
          "Use npm start para iniciar o Expo.",
          "Execute npm run ios ou npm run android para a plataforma desejada.",
          "Use aparelho físico para validar câmera, mídia e módulos nativos.",
        ],
      },
      {
        id: "arquitetura",
        title: "Arquitetura",
        paragraphs: [
          "As telas e componentes ficam em app, com hooks para comportamento, contexto para configurações e utilitários para EXIF, LUT e armazenamento. Os módulos Expo locais isolam controles manuais, RAW, Live Photo, retrato, Camera Control e Scanner de composição, com API pública em index.ts e implementação iOS em modules/*/ios.",
        ],
      },
      {
        id: "contribuir",
        title: "Contribua",
        items: [
          "Crie uma branch focada e use commits curtos com prefixos como feat, fix ou chore.",
          "Rode npm run lint.",
          "Teste o fluxo alterado em cada plataforma relevante.",
          "No Pull Request, registre aparelhos, sistemas, comandos executados e imagens quando houver mudança visual.",
        ],
      },
    ],
  },
];

export function getDocsPage(slug: string) {
  return docsPages.find((page) => page.slug === slug);
}
