import type { FeatureStatus } from "@/lib/feature-matrix";

export type DocsSection = {
  id: string;
  title: string;
  badge?: "Novo" | "Beta";
  paragraphs?: string[];
  items?: string[];
  links?: { href: string; label: string }[];
};

export type DocsPage = {
  slug: string;
  title: string;
  description: string;
  platform: "iOS e Android" | "Varia por recurso" | "Desenvolvimento";
  status: FeatureStatus;
  prerequisites: string[];
  sources?: string[];
  sections: DocsSection[];
};

export const docsPages: DocsPage[] = [
  {
    slug: "primeiros-passos",
    sources: ["app/index.jsx", "app/utils/topBarControls.js"],
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
    sources: ["app/index.jsx", "app/components/TopBar.jsx", "app/utils/aspectRatios.js", "docs/controls-and-gestures.md", "docs/portrait-and-live-photo.md"],
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
          "O seletor de proporção oferece 4:3, 16:9 e 1:1, respeitando a orientação do aparelho. O recorte quadrado parte do fluxo 4:3.",
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
        links: [{href: "/docs/controles-manuais", label: "Aprenda exposição, foco e balanço de branco"}],
        title: "Ajuste exposição e controles manuais",
        paragraphs: [
          "A compensação de exposição depende do pipeline e da câmera ativa. O painel completo de ISO, velocidade do obturador, balanço de branco e foco usa um módulo disponível apenas no iOS, conforme a capacidade detectada. Volte ao modo automático pelo controle correspondente quando quiser que a câmera recalcule o ajuste.",
        ],
        items: [
          "O preview pode diferir da imagem processada e salva.",
          "A validação confiável exige aparelho físico.",
          "A documentação não afirma que ajustes públicos desativam algoritmos proprietários do sistema.",
        ],
      },
      {
        id: "captura-dupla-e-sorriso",
        links: [{href: "/docs/image-stacking", label: "Conheça Bulb, Motion Blur e Dupla exposição"}],
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
        links: [{href: "/docs/scanner-de-composicao", label: "Guia completo do Scanner de composição"}],
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
        links: [{href: "/docs/formatos-de-arquivo", label: "Entenda RAW, DNG e foto processada"}],
        title: "Capture em RAW ou ProRAW",
        items: [
          "Disponível somente no iOS quando a lente informa um formato compatível.",
          "RAW e ProRAW não podem ser combinados com Live Photo ou Retrato.",
          "O DNG preserva a área do sensor; a foto processada do par respeita a proporção selecionada. A captura RAW pede resolução normal, aproximadamente 12 MP, conforme a lente.",
        ],
      },
      {
        id: "live-photo",
        title: "Capture uma Live Photo",
        items: [
          "Disponível somente no iOS e em hardware compatível.",
          "O modo exige RAW e Image Stacking desativados. Pode funcionar com Retrato se a lente informar suporte à combinação.",
          "A foto e o trecho de movimento são salvos como um par na biblioteca.",
        ],
      },
      {
        id: "retrato",
        title: "Tire um retrato",
        items: [
          "Disponível somente no iOS quando a câmera fornece profundidade ou matte de retrato.",
          "O preview não simula desfoque; permite ajustar exposição e tocar para focar. A foto final usa profundidade/matte e abertura inicial de f/4.5.",
          "Trocar de lente pode alterar imediatamente a disponibilidade do modo e desligar Live Photo quando o suporte combinado faltar.",
          "RAW e Image Stacking precisam estar desativados. Live Photo pode ficar ativa junto quando a lente oferecer suporte combinado.",
        ],
      },
      {
        id: "heif-ou-jpeg",
        links: [{href: "/docs/heif-plus", label: "Como funciona a revelação HEIF+"}, {href: "/docs/formatos-de-arquivo", label: "Escolha quais arquivos salvar"}],
        title: "Escolha entre HEIF, HEIF+ e JPEG",
        badge: "Novo",
        paragraphs: [
          "No iPhone, novas fotos são salvas em HEIF por padrão. Em Configurações → Captura, escolha HEIF, HEIF+ ou JPEG. JPEG amplia a compatibilidade; HEIF+ revela um DNG no aparelho antes de exportar a foto.",
        ],
        items: [
          "A preferência também é aplicada a Live Photos, retratos, capturas duplas e cópias sem efeitos quando o fluxo permitir.",
          "RAW e ProRAW mantêm seus formatos próprios; a imagem derivada pode seguir a preferência escolhida.",
        ],
      },
      {
        id: "timer-e-gestos",
        title: "Timer, gestos e atalhos",
        badge: "Novo",
        paragraphs: [
          "Escolha desligado, 3 ou 10 segundos no controle Timer da TopBar. O timer geral não fica salvo: começa desligado e volta a zero quando o app entra em segundo plano.",
          "Em Configurações → Controles e gestos, configure gestos verticais e horizontais e os dois botões de volume para captura, efeitos, lentes ou modos. Cima abre ou ativa; baixo fecha ou desativa. Direita avança e esquerda volta no seletor.",
        ],
        items: [
          "Tirar foto usa o timer geral; Foto com timer de 3s/10s substitui o tempo apenas naquele disparo e mantém seu atalho salvo.",
          "No iOS, diminuir volume, Camera Control e botão de Ação compartilham a ação primária quando acionam captura; aumentar volume usa a secundária.",
          "Mudanças de modo, efeito e lente ficam bloqueadas durante captura, processamento e contagem. Finalizar Bulb ou Motion Blur continua imediato.",
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
    sources: ["docs/capture-file-formats.md", "app/utils/photographicStylesPolicy.js", "modules/camera-photographic-styles/index.ts", "app/utils/lutCatalog.js", "app/utils/grainCatalog.js", "app/utils/halationCatalog.js"],
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
        id: "edicao-apple",
        title: "Edição no Fotos da Apple",
        paragraphs: [
          "A opção experimental nas configurações de metadados e edição cria um HEIF para edição no Fotos. Ativá-la retorna o formato processado a HEIF; exige o módulo nativo iOS.",
          "Live Photo e RAW Bayer comum pausam essa opção. Retrato, Image Stacking e HEIF+ podem aplicar estilos à saída HEIF; em ProRAW, somente o derivado processado recebe estilos. A preferência não comprova que toda lente e versão do Fotos aceitará a edição: confira o arquivo salvo no aparelho antes de depender desse fluxo.",
        ],
      },
      {
        id: "grao-halation",
        links: [{href: "/docs/pipeline-de-imagem", label: "Entenda o processamento e as cópias"}],
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
    sources: ["app/components/Galery.jsx", "app/utils/projects.js", "app/components/MapViewWeb.jsx", "app/utils/galleryActions.js", "docs/gallery-actions.md"],
    title: "Galeria e projetos",
    description:
      "Organize álbuns, avalie e compartilhe fotos em lote e consulte EXIF, mapa e profundidade.",
    platform: "iOS e Android",
    status: "supported",
    prerequisites: [
      "Permissão para a biblioteca de mídia",
      "Localização no EXIF para usar o mapa",
      "Internet para carregar o mapa e o serviço de EXIF Frame",
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
        links: [{href: "/docs/metadados-e-autoria", label: "Autoria, classificação e tags"}],
        title: "EXIF e mapa",
        paragraphs: [
          "A galeria lê metadados técnicos, exibe badges do Komorebi e mostra uma foto em tela cheia. Quando a imagem contém coordenadas, o mapa carrega tiles do OpenStreetMap centrados naquele local, usando Leaflet na WebView.",
        ],
        items: [
          "Confira e remova GPS antes de compartilhar imagens sensíveis.",
          "A exclusão ocorre somente após uma ação sua.",
          "Metadados podem variar conforme o formato e o sistema operacional.",
        ],
      },
      {
        id: "acoes-e-selecao",
        title: "Avalie, compartilhe e apague",
        badge: "Novo",
        paragraphs: [
          "Abra uma foto e toque em … para acessar Ações: compartilhar, avaliar de 0 a 5 estrelas e consultar profundidade. Informações reúne EXIF e localização; só um painel fica aberto por vez.",
          "Na grade, toque em Selecionar ou mantenha uma miniatura pressionada. Marque as fotos para Avaliar, Compartilhar ou Apagar. Trocar de projeto ou sair encerra a seleção.",
        ],
        items: [
          "Avaliar aplica a mesma nota ao lote. A estrela cortada remove a classificação; cancelar mantém as notas já gravadas e deixa pendências selecionadas.",
          "Compartilhar abre uma folha nativa para todas as imagens preparadas. No iOS, exporta a representação atual, incluindo edições; Live Photos são compartilhadas como imagem estática. Arquivos apenas no iCloud podem exigir download.",
          "Se uma imagem não puder ser preparada, o lote não é compartilhado parcialmente.",
          "Apagar exige confirmação e remove as fotos da biblioteca e de todos os álbuns, inclusive fora do projeto ativo.",
          "Profundidade é uma ação individual e não aparece nas ações em lote.",
        ],
        links: [{ href: "/docs/profundidade-na-galeria", label: "Gere profundidade na original ou em uma cópia" }],
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
    slug: "profundidade-na-galeria",
    title: "Profundidade na galeria",
    description: "Gere profundidade local em fotos elegíveis no iOS e escolha entre original e cópia.",
    platform: "Varia por recurso",
    status: "validate",
    prerequisites: ["iOS com o módulo nativo instalado", "Fotos com leitura e escrita autorizadas", "JPEG/HEIC elegível sem profundidade existente; RAW não é aceito"],
    sources: ["docs/gallery-actions.md", "modules/camera-photo-depth/index.ts", "modules/camera-photo-depth/ios/PhotosPortraitCompatibility.swift", "modules/camera-photo-depth/ios/PhotoDepthService.swift"],
    sections: [
      {
        id: "gerar",
        title: "Gere profundidade no aparelho",
        badge: "Beta",
        paragraphs: [
          "Abra uma foto, toque em … e consulte a ação de profundidade. O modelo DepthAnythingV2SmallF16 vem no app e executa localmente, sem download no primeiro uso nem envio da foto a servidor. O Android não oferece essa ação.",
          "Esse recurso estima profundidade relativa depois da captura e é separado do modo Retrato da câmera. Não mede distâncias físicas. Live Photos elegíveis conservam o vídeo na edição ou na cópia.",
        ],
      },
      {
        id: "original-ou-copia",
        title: "Escolha original ou cópia",
        items: [
          "Aplicar profundidade na original mantém o item da biblioteca e cria uma edição reversível com backup privado. O ajuste de Retrato é acessado por Editar no Fotos.",
          "Criar uma cópia salva um novo original com profundidade e conserva a foto de origem. A cópia recebe data, localização, favorito, visibilidade, classificação e álbuns compatíveis.",
          "A cópia permite a alternância de Retrato no visualizador em casos já testados. A compatibilidade mais ampla dos controles do Fotos continua experimental e depende do arquivo, aparelho e iOS.",
          "HEIF com Estilos Fotográficos exige cópia quando a orientação EXIF é diferente de 1 ou quando é Live Photo; a interface impede editar a original nesses casos.",
        ],
      },
      {
        id: "recuperacao",
        title: "Reversão e recuperação",
        paragraphs: [
          "Reverter profundidade depende do backup privado e de uma edição reconhecida como pertencente ao Komorebi. Uma edição posterior em outro app pode bloquear a reversão para preservar essa alteração.",
          "Fotos editadas pela versão anterior podem oferecer Salvar cópia para Retrato a partir do backup. Desinstalar o app remove os backups privados; a foto de origem preservada por uma cópia permanece na biblioteca.",
        ],
        links: [{ href: "/docs/galeria-e-projetos#acoes-e-selecao", label: "Compartilhamento e ações da galeria" }],
      },
    ],
  },
  {
    slug: "configuracoes",
    sources: ["app/context/SettingsContext.js", "app/components/Settings.jsx", "docs/controls-and-gestures.md", "app/utils/diagnostics.js"],
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
          "Scanner de composição (beta): mostra uma guia de reenquadramento no iOS. Zebra de altas luzes e sombras sinaliza extremos de exposição no preview.",
          "Prévia de LUT, grão, halation e stacking: habilita visualização conforme o pipeline; não substitui a conferência da foto final.",
          "Controles invertidos: altera a posição da TopBar.",
        ],
      },
      {
        id: "inteligencia-do-scan",
        title: "Inteligência local",
        badge: "Novo",
        paragraphs: [
          "No iOS, você pode baixar ou remover o modelo MiniCPM-V usado pelo Scanner de composição. O download ocupa cerca de 1,6 GB, fica no aparelho e é opcional: sem ele, o Scan continua com a análise básica fornecida pelo sistema. Tags inteligentes e nomes descritivos são opções independentes, desativadas por padrão, e exigem o modelo pronto.",
        ],
      },
      {
        id: "captura-opcoes",
        title: "Captura e metadados",
        items: [
          "Som do obturador: ativa ou desativa o som próprio do app, sem substituir regras do sistema.",
          "Salvar cópia sem efeitos: mantém uma versão sem LUT, grão ou halation quando aplicável.",
          "Salvar localização: grava GPS apenas em novas fotos e somente com permissão.",
          "Formato da foto (iOS): escolhe HEIF, HEIF+ ou JPEG; o atalho Formato de arquivo controla RAW e foto processada.",
          "Autoria: grava autor e direitos autorais nas próximas capturas, sem modificar fotos existentes.",
          "Edição no Fotos da Apple (experimental, iOS): aplica Estilos 2/3 à saída HEIF, inclusive Retrato, stacking e HEIF+. Pausa em Live Photo e RAW Bayer comum; em ProRAW, só no derivado processado.",
          "LUTs personalizados: importa e remove arquivos .cube locais.",
        ],
      },
      {
        id: "gestos-e-diagnosticos",
        title: "Controles e diagnósticos",
        paragraphs: [
          "Controles e gestos guarda os atalhos verticais, horizontais e dos botões físicos. O timer geral é temporário e escolhido somente na TopBar.",
          "Em Sobre → Compartilhar diagnósticos, desligue ou ligue o envio técnico ao Sentry. Ele começa ativado; ao desligar, o monitoramento é encerrado na sessão atual e não inicia na próxima abertura. Isso não apaga eventos já enviados.",
        ],
        links: [{ href: "/docs/camera#timer-e-gestos", label: "Configure timer e atalhos da câmera" }],
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
    sources: ["app.json", "modules/camera-image-stacking/index.ts", "modules/camera-raw-capture/index.ts"],
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
    sources: ["package.json", "docs/composition-scan.md", "docs/sentry.md"],
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
          "Instale os pods depois do setup do Scan e use um build nativo de desenvolvimento; Expo Go não inclui os módulos locais.",
          "Use npm start para iniciar o Metro para esse binário.",
          "Execute npm run ios ou npm run android para a plataforma desejada.",
          "Use aparelho físico para validar câmera, mídia e módulos nativos.",
        ],
      },
      {
        id: "arquitetura",
        links: [{href: "/docs/pipeline-de-imagem", label: "Fluxos de captura, processamento e salvamento"}],
        title: "Arquitetura",
        paragraphs: [
          "As telas e componentes ficam em app, com hooks para comportamento, contexto para configurações e utilitários para EXIF, LUT e armazenamento. Os módulos Expo locais isolam controles manuais, RAW/HEIF+, Live Photo, retrato, Camera Control, Image Stacking, Estilos Apple, profundidade na galeria e Scanner de composição, com API pública em index.ts e implementação iOS em modules/*/ios.",
        ],
      },
      {
        id: "contribuir",
        title: "Contribua",
        items: [
          "Crie uma branch focada e use commits curtos com prefixos como feat, fix ou chore.",
          "Rode npm run lint, npm run typecheck e npm test no repositório do aplicativo.",
          "Teste o fluxo alterado em cada plataforma relevante.",
          "No Pull Request, registre aparelhos, sistemas, comandos executados e imagens quando houver mudança visual.",
        ],
      },
    ],
  },
  {
    slug: "controles-manuais",
    title: "Controles manuais",
    description: "Aprenda a equilibrar luz, movimento, ruído, foco e cor antes de fotografar.",
    platform: "Varia por recurso",
    status: "conditional",
    prerequisites: [
      "iOS e câmera com os controles manuais anunciados como disponíveis",
      "Aparelho físico; capacidades mudam ao trocar de lente",
    ],
    sources: [
      "app/hooks/useManualCameraControls.js",
      "modules/camera-manual-controls",
    ],
    sections: [
      {
        id: "exposicao",
        title: "ISO, obturador e compensação",
        paragraphs: [
          "ISO amplifica o sinal: valores maiores ajudam em pouca luz, mas podem aumentar ruído. Um obturador mais lento coleta luz por mais tempo e aumenta o risco de tremido e borrão de movimento. Um obturador rápido ajuda a congelar o assunto, exigindo mais luz ou ISO.",
          "A compensação EV orienta a exposição automática. Ela não equivale a mudar a abertura física da lente. Quando ISO e tempo estão fixos, confira o efeito efetivo no preview e no arquivo.",
        ],
        items: [
          "Comece no automático e altere uma variável de cada vez.",
          "Para assuntos em movimento, priorize velocidade; para uma cena parada com apoio, experimente um tempo maior.",
          "Se altas luzes importantes estourarem, reduza a exposição; recuperar detalhe depois não é garantido.",
        ],
      },
      {
        id: "foco-cor",
        title: "Foco e balanço de branco",
        paragraphs: [
          "Toque no assunto para definir o ponto de foco quando suportado. O foco manual controla a posição da lente; seu valor não é uma distância em metros.",
          "O balanço de branco modifica a aparência de temperatura e matiz. Mantê-lo estável ajuda a comparar fotos da mesma cena. A disponibilidade e os limites vêm da câmera ativa.",
        ],
      },
      {
        id: "auxilios",
        title: "Histograma e zebra",
        paragraphs: [
          "O histograma mostra a distribuição de luminosidade; concentrações nas extremidades pedem atenção a sombras e altas luzes. Zebra marca regiões extremas no preview. Esses auxílios não são gravados na imagem.",
          "Preview, efeitos e processamento do sistema podem produzir diferenças no resultado salvo. Confira a imagem final, especialmente em RAW/HEIF+.",
        ],
        links: [
          {
            href: "/docs/heif-plus",
            label: "Ajustes de revelação depois da captura"
          },
          {
            href: "/docs/focus-bracketing",
            label: "Combine diferentes planos de foco"
          },
        ]
      },
    ]
  },

  {
    slug: "formatos-de-arquivo",
    title: "Formatos de arquivo",
    description: "Escolha HEIF, JPEG, DNG ou um par RAW + foto processada e entenda o que fica salvo.",
    platform: "Varia por recurso",
    status: "conditional",
    prerequisites: [
      "Fotos autorizado para salvar",
      "iOS e lente com RAW para DNG ou pares RAW",
      "Android mantém a saída JPEG",
    ],
    sources: [
      "docs/capture-file-formats.md",
      "app/utils/fileFormatSelection.js",
      "modules/camera-raw-capture/index.ts",
    ],
    sections: [
      {
        id: "escolher",
        title: "Escolha o formato e as saídas",
        paragraphs: [
          "Em Configurações → Captura, escolha HEIF, HEIF+ ou JPEG para a foto processada. Na TopBar, Formato de arquivo permite selecionar RAW, foto processada ou os dois. Se o atalho não aparecer, inclua-o na configuração da TopBar.",
        ],
        items: [
          "HEIF: foto processada com armazenamento eficiente; confirme se o destino aceita .heic.",
          "JPEG: opção para aplicativos e serviços que exigem maior compatibilidade.",
          "HEIF+: foto revelada a partir de DNG no pipeline nativo do Komorebi.",
          "RAW sozinho: salva somente DNG, com RAW Bayer ou ProRAW conforme a lente.",
          "RAW + foto processada: salva um único item na biblioteca, com dois recursos originais, DNG e HEIC/JPEG.",
        ],
      },
      {
        id: "par-raw",
        title: "Como funciona o par RAW",
        paragraphs: [
          "No par HEIF+, a foto processada vem da revelação personalizada e inclui seus efeitos. No par HEIF/JPEG, o processamento usa a imagem acompanhante retornada pela captura nativa.",
          "No iOS 27, o app solicita o DNG como original do par. Em versões anteriores, o Fotos controla essa escolha. O badge ou a ordem exibida por outro aplicativo não prova quais recursos foram importados.",
        ],
        items: [
          "O DNG preserva a área do sensor; a imagem processada segue a proporção escolhida.",
          "RAW e HEIF+ usam uma dimensão normal de captura, aproximadamente 12 MP conforme suporte, em vez de RAW Max de 48 MP.",
          "O tamanho varia com a cena, lente e tipo de RAW; não existe tamanho fixo em MB.",
        ],
      },
      {
        id: "restricoes",
        title: "Troca de lente e modos incompatíveis",
        paragraphs: [
          "Desligar a última saída ativa a outra: a captura nunca fica sem formato de saída. Sem RAW disponível, a foto processada permanece selecionada. Trocar de lente pode remover RAW.",
          "Live Photo e Retrato exigem RAW desligado. Image Stacking suspende RAW e restaura a seleção ao sair. HEIF+ fica pausado em Live Photo, Retrato, stacking ou câmera sem RAW.",
        ],
        links: [
          {
            href: "/docs/heif-plus",
            label: "Revelação e retomada do HEIF+"
          },
          {
            href: "/docs/image-stacking",
            label: "Saída dos modos de empilhamento"
          },
        ]
      },
      {
        id: "cor",
        title: "Display P3, 10-bit e compartilhamento",
        paragraphs: [
          "As exportações HEIC/JPEG do iOS usam perfil ICC Display P3. A conversão respeita o perfil de entrada; dados do sensor no DNG continuam intactos. LUTs aplicadas na WebView trabalham em sRGB, e converter depois para P3 não recupera cores já limitadas ali.",
          "10-bit descreve precisão de cor; não garante uma imagem HDR. Ao compartilhar um par, confirme quais recursos o aplicativo de destino exporta e confira GPS, autoria e tags.",
        ],
      }
    ],
  },

  {
    slug: "heif-plus",
    title: "HEIF+",
    description: "Revele um DNG localmente, ajuste o processamento e acompanhe trabalhos pendentes.",
    platform: "Varia por recurso",
    status: "validate",
    prerequisites: [
      "iOS com RAW/ProRAW disponível na lente ativa",
      "Live Photo, Retrato e Image Stacking desativados",
      "Espaço para DNG temporário, revelação e salvamento",
    ],
    sources: [
      "docs/heif-plus.md",
      "app/utils/heifPlusSettings.js",
      "modules/camera-raw-capture/ios/HeifPlusEngine.swift",
    ],
    sections: [
      {
        id: "revelacao",
        title: "O que acontece na captura",
        paragraphs: [
          "HEIF+ captura um DNG e o revela com CIRAWFilter. A imagem processada acompanhante da câmera não é a fonte desse fluxo. O app recorta, aplica LUT, halation e grão e exporta HEIF.",
          "Escolha HEIF+ nas configurações. Se RAW também estiver selecionado em Formato de arquivo, o DNG pode acompanhar o HEIC no mesmo item da biblioteca. Sem essa seleção, o DNG é uma fonte temporária para a revelação.",
        ],
        links: [
          {
            href: "/docs/formatos-de-arquivo",
            label: "Entenda as saídas e os pares RAW"
          },
        ]
      },
      {
        id: "ajustes",
        title: "Controles de revelação",
        paragraphs: [
          "Nitidez, redução de ruído, clareza, equilíbrio de luz, exposição EV, curva global, sombras, temperatura e matiz agem na revelação do arquivo. São diferentes dos controles que determinam a exposição do sensor antes do disparo.",
          "Automático da Apple preserva a calibração por imagem. O perfil inicial usa valores suaves para nitidez, ruído, clareza e equilíbrio de luz. Não há preview RAW ao vivo: compare os arquivos salvos ao avaliar um ajuste.",
        ],
        items: [
          "Recuperação de altas luzes requer iOS 26 e suporte do arquivo; o módulo verifica cada DNG.",
          "RAW 9 é solicitado apenas quando disponível no iOS 27. Se seus recursos não estiverem prontos, o fluxo tenta um decoder anterior suportado.",
          "Ruído cromático, detalhe e moiré não oferecem ajustes efetivos no RAW 9. O suporte apresentado corresponde à última captura inspecionada.",
        ],
      },
      {
        id: "exportacao",
        title: "Qualidade e cópia sem efeitos",
        paragraphs: [
          "O pipeline tenta HEIF de 10-bit em Display P3, com qualidade de compressão 0,8. Se o encoder falhar, pode tentar 8-bit, exceto em erros de arquivo ou armazenamento. A receita registra a profundidade efetiva. A saída é SDR.",
          "A cópia sem efeitos mantém a mesma revelação RAW, sem LUT, halation e grão. Ela não é o DNG nem uma versão sem todo o processamento. Grão e detalhes influenciam o tamanho do arquivo.",
        ],
      },
      {
        id: "pendentes",
        title: "Fila persistente e recuperação",
        paragraphs: [
          "Até três trabalhos ficam em Application Support, excluídos do backup. Cada um guarda a configuração da captura, projeto, localização, efeitos, autoria e data. A revelação e o salvamento são seriais.",
          "O app usa o tempo de background concedido pelo iOS. Quando esse tempo expira, conserva o trabalho para retomada; não garante terminar com o app fechado. Em falhas, oferece Tentar novamente, Depois ou Descartar. Configurações também mostra pendências.",
        ],
        items: [
          "Depois mantém o trabalho para uma tentativa futura.",
          "Tentar novamente retoma a operação; checkpoints reutilizam assets já confirmados.",
          "Descartar remove o trabalho pendente e sua fonte temporária; escolha somente se não quiser recuperá-lo.",
        ],
      },
      {
        id: "validacao",
        title: "O que ainda merece atenção",
        paragraphs: [
          "Testes nativos com imagens sintéticas verificam exportação, efeitos, metadados e recuperação. A qualidade de ProRAW real, diferenças dos controles, tempos, memória e interrupções ainda precisam ser conferidos em iPhone físico. A implementação não comprova por si só a qualidade em todas as lentes.",
        ],
      }
    ],
  },

  {
    slug: "image-stacking",
    title: "Image Stacking",
    description: "Combine capturas com Bulb, Motion Blur e Dupla exposição e saiba quando usar cada modo.",
    platform: "Varia por recurso",
    status: "validate",
    prerequisites: [
      "iOS e módulo nativo atualizado",
      "Modo anunciado nas capacidades da lente",
      "Apoio ou tripé para sequências longas",
    ],
    sources: [
      "docs/image-stacking-engine.md",
      "modules/camera-image-stacking/index.ts",
      "app/components/ImageStackingSelector.jsx",
    ],
    sections: [
      {
        id: "modos",
        title: "Modos disponíveis",
        paragraphs: [
          "Abra Image Stacking na TopBar. O seletor atual oferece Bulb, Motion Blur, Dupla exposição e Focus Bracketing quando a lente anuncia suporte. Estratégias experimentais descritas em notas técnicas, como Night ou redução de ruído, não aparecem no seletor atual.",
        ],
      },
      {
        id: "bulb",
        title: "Bulb: acumular luz",
        paragraphs: [
          "Bulb acumula frames ponderados pelo intervalo de tempo. Um disparo inicia; outro encerra. Exige pelo menos um segundo válido e para automaticamente em cinco minutos. O stream limita o maior lado a 4096 pixels.",
          "Use para observar luz acumulada ao longo do tempo. Cenas muito claras podem saturar. Apoie o aparelho; o registro global não elimina todo movimento ou paralaxe.",
        ],
      },
      {
        id: "motion-blur",
        title: "Motion Blur: suavizar movimento",
        paragraphs: [
          "Motion Blur faz uma média temporal com alinhamento global para simular longa exposição sem somar o brilho como Bulb. Elementos que se movem podem criar borrão enquanto partes estáveis se mantêm mais definidas.",
          "O resultado depende da duração, estabilidade e cena. A prévia é uma referência; confira a composição exportada.",
        ],
      },
      {
        id: "dupla-exposicao",
        title: "Dupla exposição: dois disparos",
        paragraphs: [
          "Faça a primeira foto, reenquadre usando sua sobreposição no preview e dispare de novo. O modo aguarda explicitamente a segunda exposição. Os dois frames não são alinhados: a posição dos elementos faz parte da composição.",
          "As imagens são somadas como luz em espaço linear e recebem uma curva para saída SDR. A compensação interna padrão de −1,5 EV dá margem às altas luzes. O EV da interface atua na exposição da câmera antes de cada disparo e é independente dessa compensação.",
        ],
        items: [
          "Durante a sequência, orientação, lente e demais controles ficam bloqueados; obturador, Cancelar e EV continuam disponíveis.",
          "Captura dupla é outro recurso: gera um recorte complementar da captura; Dupla exposição combina dois disparos.",
        ],
      },
      {
        id: "resultado",
        title: "Salvamento, efeitos e cancelamento",
        paragraphs: [
          "A composição entra na fila normal como captureMode stacking e pode receber LUT, grão, halation, recorte e organização no projeto. O resultado sai em HEIF ou JPEG.",
          "Salvar original sem efeitos preserva a composição antes dos efeitos, não os frames usados para montá-la. RAW, Live Photo, Retrato, flash e controles manuais gerais seguem os bloqueios do modo. Os arquivos intermediários são removidos ao terminar, falhar ou cancelar.",
        ],
        links: [
          {
            href: "/docs/focus-bracketing",
            label: "Passo a passo do Focus Bracketing"
          },
          {
            href: "/docs/pipeline-de-imagem",
            label: "Como a composição chega à galeria"
          },
        ]
      },
      {
        id: "limites",
        title: "Limites e validação",
        paragraphs: [
          "O alinhamento tenta registrar o movimento global da câmera; ele não corrige todos os movimentos locais da cena. Avalie artefatos em água, pessoas e objetos móveis. Mudanças de perspectiva e baixa textura podem impedir o registro.",
          "Qualidade, cancelamento, pressão de memória, pouco espaço e retomada da câmera precisam de validação em dispositivo físico.",
        ],
      }
    ],
  },

  {
    slug: "focus-bracketing",
    title: "Focus Bracketing",
    description: "Fotografe vários planos de foco e combine detalhes de uma cena estática.",
    platform: "Varia por recurso",
    status: "validate",
    prerequisites: [
      "iOS, Metal e lente física com foco manual e bloqueio de exposição/balanço de branco",
      "Cena parada e aparelho apoiado ou em tripé",
      "Não disponível em câmeras virtuais, Android ou web",
    ],
    sources: [
      "docs/image-stacking-engine.md",
      "modules/camera-image-stacking/ios/FocusBracketing.swift",
      "app/hooks/useImageStacking.js",
    ],
    sections: [
      {
        id: "preparar",
        title: "Defina o intervalo e a quantidade",
        items: [
          "Selecione Focus Bracketing em Image Stacking.",
          "Arraste os dois seletores da régua Perto → Longe e confira cada foco no preview.",
          "Toque nos dois seletores para confirmar os limites na câmera. O trecho laranja indica o intervalo.",
          "Escolha de 3 a 20 fotos no dial; o padrão é 10.",
          "Dispare e mantenha câmera e assunto parados durante toda a sequência.",
        ],
      },
      {
        id: "escala",
        title: "O que a escala representa",
        paragraphs: [
          "A régua é uma posição normalizada da lente. Não mede distância em metros nem abertura f/. Escolha os limites pela nitidez observada nos planos mais próximo e mais distante do assunto.",
          "Trocar câmera, lente ou zoom invalida os limites e exige confirmá-los novamente. A quantidade escolhida permanece durante a sessão. Mais fotos aumentam o trabalho; não garantem melhor resultado se houver movimento.",
        ],
      },
      {
        id: "composicao",
        title: "Como a imagem é composta",
        paragraphs: [
          "A câmera estabiliza e trava exposição e balanço de branco. A sequência inclui os dois limites e distribui uniformemente as posições intermediárias. Cada foto aguarda a confirmação do foco; a orientação fica congelada.",
          "A foto central é a referência. O engine registra as demais, calcula regiões mais nítidas e mistura essas regiões com máscaras e uma pirâmide Laplaciana de cinco níveis em espaço linear. O recorte usa a interseção válida e pode reduzir o enquadramento.",
        ],
      },
      {
        id: "falhas",
        title: "Quando a sequência falha",
        paragraphs: [
          "Qualquer foto ausente ou sem registro válido faz a sequência inteira falhar; esse modo não entrega resultado degradado. O recorte deve preservar ao menos 65% da largura e da altura da referência.",
          "A espera pelo foco tem limite de quatro segundos; a captura, vinte segundos. Cancelamento também é observado nessas esperas. Não há reconstrução 3D nem compensação de movimento local. Pessoas, folhas ao vento e macro sem apoio podem gerar problemas.",
        ],
      },
      {
        id: "saida",
        title: "Resultado e recuperação",
        paragraphs: [
          "Somente a composição vai à fila de efeitos e salvamento. A cópia sem efeitos também é a composição, sem LUT, grão e halation; as fontes temporárias são apagadas. Metadados registram limites, quantidade e posições de foco confirmadas.",
          "Ao concluir ou cancelar, o foco volta à posição do painel. Ao desativar o modo, os controles voltam ao automático. Confira a próxima captura e a limpeza das fontes ao testar interrupções.",
        ],
        links: [
          {
            href: "/docs/image-stacking",
            label: "Restrições compartilhadas do Image Stacking"
          },
        ]
      },
    ]
  },

  {
    slug: "scanner-de-composicao",
    title: "Scanner de composição",
    description: "Escolha um assunto, use a guia de recorte e entenda a análise local e seus limites.",
    platform: "Varia por recurso",
    status: "validate",
    prerequisites: [
      "iOS, câmera traseira e Scanner ativado nas configurações",
      "Preview normal, manual ou RAW/ProRAW compatível",
      "MiniCPM-V opcional, aproximadamente 1,6 GB no aparelho",
    ],
    sources: [
      "docs/composition-scan.md",
      "app/hooks/useCompositionScan.js",
      "app/utils/compositionScanSession.js",
    ],
    sections: [
      {
        id: "usar",
        title: "Use o Scan",
        items: [
          "Enquadre uma cena ampla e, se quiser, toque no assunto para orientar o próximo Scan.",
          "Toque em Scan e aguarde a análise de um frame.",
          "Use a moldura para reenquadrar. Ao mantê-la alinhada, há feedback háptico e ajuste de zoom limitado pela lente.",
          "Confira o enquadramento e dispare quando quiser; o Scan não fotografa nem salva sozinho.",
        ],
      },
      {
        id: "analise",
        title: "O que ele analisa",
        paragraphs: [
          "O Scan identifica um assunto e propõe um recorte. A análise básica usa recursos Vision no aparelho. O MiniCPM-V opcional ajuda a identificar semanticamente o objeto e a região inicial.",
          "Depois, o tracking estabiliza a moldura conforme o movimento da câmera. Ele não corrige uma escolha ruim de assunto. O recurso não produz uma avaliação geral de luz, fundo, linhas ou equilíbrio da fotografia.",
        ],
      },
      {
        id: "modelo",
        title: "Modelo opcional e privacidade",
        paragraphs: [
          "Baixe ou remova o modelo nas configurações de inteligência. Os pesos ficam no aparelho; a análise de frames é local. Frames, caixas e sugestões não são enviados a servidor nem gravados na foto.",
          "Sem o modelo pronto, o Scan mantém sua análise básica. Tags e nomes inteligentes são opções separadas e precisam do modelo pronto. Um runtime ausente exige um novo build nativo preparado pelo desenvolvedor; baixar pesos não instala esse runtime.",
        ],
      },
      {
        id: "cancelamento",
        title: "Disponibilidade e cancelamento",
        paragraphs: [
          "Scan não aparece na frontal nem nos previews nativos de Live Photo/Retrato. Image Stacking também usa um preview próprio. Durante processamento, inicialização ou background, o botão pode ficar indisponível.",
          "Trocas de lente, modo, proporção, orientação e zoom manual cancelam a análise/guia. Disparar, navegar ou colocar o app em background também cancela. Pouca textura, movimento forte e paralaxe podem encerrar o tracking.",
        ],
      },
      {
        id: "aprender",
        title: "Fluxo para quem desenvolve",
        paragraphs: [
          "A sessão reserva um único frame, converte orientação e produz uma cópia reduzida nativa. O JavaScript recebe um token opaco; a análise consome esse token numa fila serial. O controlador percorre captura, análise, resultados e retorno ao estado ocioso.",
          "Cancelamento invalida a sessão e ignora callbacks antigos. O detector de sorriso é pausado durante o Scan. Os testes de coordenadas e controlador não substituem medir latência, FPS, memória e temperatura em iPhone.",
        ],
        links: [
          {
            href: "/docs/desenvolvimento",
            label: "Prepare o runtime e um novo build"
          },
        ]
      },
    ]
  },

  {
    slug: "metadados-e-autoria",
    title: "Metadados e autoria",
    description: "Grave autoria, classifique fotos e entenda tags, GPS, EXIF, IPTC e XMP.",
    platform: "Varia por recurso",
    status: "conditional",
    prerequisites: [
      "Biblioteca de mídia com permissão de leitura/escrita",
      "Modelo local pronto para tags e nomes inteligentes",
      "iOS 27 e build com SDK compatível para sincronização da nota com o catálogo Fotos",
    ],
    sources: [
      "docs/photo-catalog-metadata.md",
      "app/utils/photoCatalogMetadata.js",
      "docs/gallery-actions.md",
      "app/utils/photoIntelligence.js",
      "modules/shared/PhotoCatalogMetadata.swift",
    ],
    sections: [
      {
        id: "autoria",
        title: "Autor e direitos autorais",
        paragraphs: [
          "Em Configurações → Captura e arquivos → Autoria, informe autor e direitos autorais. Os valores ficam no aparelho e entram nas próximas capturas; campos vazios não acrescentam autoria. Mudar essas opções não altera fotos existentes.",
        ],
      },
      {
        id: "notas",
        title: "Classificação de 0 a 5 estrelas",
        paragraphs: [
          "Abra a foto, toque em … e entre no painel Ações. Escolha a nota; a estrela cortada grava zero explicitamente. A interface confirma somente depois da escrita e apresenta falhas de permissão ou armazenamento.",
          "No iOS 27 com SDK compatível, a transação atualiza o catálogo Fotos e o XMP da imagem. A leitura do catálogo, incluindo zero, respeita alterações feitas no Fotos. Nas outras plataformas, a miniatura usa a nota lida da imagem.",
        ],
        items: [
          "Zero significa sem classificação e não exibe indicador na miniatura.",
          "Na grade, toque em Selecionar ou mantenha uma miniatura pressionada para aplicar a mesma nota a várias fotos. Cancelar mantém as gravações já concluídas; falhas e pendências continuam selecionadas.",
          "Notas antigas apenas no XMP precisam ser selecionadas novamente para entrar no catálogo; a leitura não as migra automaticamente.",
          "No iOS, a edição preserva o original. Para RAW, a classificação fica na representação renderizada e o DNG original é mantido.",
        ],
      },
      {
        id: "inteligencia",
        title: "Tags e nomes inteligentes",
        paragraphs: [
          "Ative as opções separadamente nas configurações de inteligência. Elas vêm desligadas e só executam com o modelo pronto. A análise local pode sugerir palavras-chave e um nome descritivo; falhas não impedem a captura.",
          "As tags válidas são normalizadas, sem duplicatas, com cinco a oito palavras-chave aceitas. O nome é sanitizado e recebe data/hora e extensão. As sugestões não garantem identificar corretamente pessoas, objetos ou eventos.",
        ],
      },
      {
        id: "campos",
        title: "Onde os dados são gravados",
        paragraphs: [
          "EXIF registra informações fotográficas, como ISO, exposição, lente e GPS. IPTC/XMP registra autoria e palavras-chave; xmp:Rating recebe a nota de 0 a 5. A receita Komorebi registra efeitos e informações dos modos de captura.",
          "JPEG usa segmentos APP13 para IPTC e APP1 para XMP. TIFF/DNG usa campos do IFD0 sem mover os dados RAW. HEIF usa a serialização do ImageIO. Aplicativos de destino podem ler só parte desses campos ou removê-los na exportação.",
        ],
      },
      {
        id: "privacidade",
        title: "GPS, mapa e compartilhamento",
        paragraphs: [
          "A opção de localização afeta novas capturas e exige permissão; desativá-la não remove coordenadas de fotos antigas. O mapa usa tiles externos do OpenStreetMap centrados no local da foto. EXIF Frame abre um serviço externo em WebView.",
          "Antes de compartilhar, confira o arquivo realmente exportado, incluindo localização, autor, direitos e palavras-chave. Um nome ou uma tag também pode revelar contexto da cena.",
        ],
        links: [
          {
            href: "/docs/galeria-e-projetos",
            label: "Galeria, mapa e EXIF Frame"
          },
        ]
      },
    ]
  },

  {
    slug: "pipeline-de-imagem",
    title: "Pipeline de imagem",
    description: "Entenda os caminhos de captura, efeitos, metadados e salvamento para contribuir com o app.",
    platform: "Desenvolvimento",
    status: "supported",
    prerequisites: [
      "Familiaridade com hooks React, módulos Expo e arquivos de imagem",
      "Novo build após alterações nativas",
      "Dispositivo físico para confirmar qualidade e desempenho",
    ],
    sources: [
      "app/hooks/usePhotoProcessingQueue.js",
      "docs/heif-plus.md",
      "docs/image-stacking-engine.md",
      "docs/performance-audit.md",
      "app/utils/diagnostics.js",
      "docs/sentry.md",
    ],
    sections: [
      {
        id: "caminhos",
        title: "Três caminhos principais",
        paragraphs: [
          "A foto padrão passa pela captura e fila de processamento JavaScript. Módulos especializados retornam arquivos e recursos de RAW, Live Photo e Retrato. Image Stacking compõe nativamente e entrega uma URI para a fila existente.",
          "HEIF+ possui uma fila nativa persistente: copia o DNG, revela, aplica efeitos, enriquece metadados e salva com checkpoints. A integração JavaScript acompanha estados e solicita análise inteligente quando ativada.",
        ],
      },
      {
        id: "efeitos",
        title: "Ordem e espaço de cor",
        paragraphs: [
          "No HEIF+, a ordem é revelação RAW → recorte → LUT tetraédrico → halation → grão → HEIF. O processamento intermediário é half-float; o grão é determinístico por captura e executado na GPU.",
          "LUTs na WebView usam outro caminho em sRGB. A exportação nativa converte para Display P3, mas isso não recupera cores limitadas anteriormente. Testar presets exige comparar fotos reais: o pipeline nativo não reproduz a sequência aleatória do Canvas.",
        ],
      },
      {
        id: "originais",
        title: "O significado de original sem efeitos",
        paragraphs: [
          "Na captura comum, a cópia elimina os efeitos criativos quando o fluxo permite. Em Image Stacking, ela guarda a composição sem efeitos. Em HEIF+, mantém a revelação RAW sem LUT, grão ou halation.",
          "DNG, foto processada e cópia sem efeitos são recursos diferentes. No par RAW + foto processada, o app importa dois originais em um único asset; outros fluxos podem salvar versões separadas.",
        ],
        links: [
          {
            href: "/docs/formatos-de-arquivo",
            label: "Recursos originais do par RAW"
          },
        ]
      },
      {
        id: "filas",
        title: "Filas, cancelamento e desempenho",
        paragraphs: [
          "AVFoundation é serializado na sessionQueue; pixel buffers contínuos usam videoQueue; registro/composição/exportação do stacking usam analysisQueue. Pixels intermediários permanecem no nativo, evitando atravessar a bridge.",
          "O HEIF+ guarda até três trabalhos persistentes e registra checkpoints de salvamento/álbum. Os frames temporários de stacking têm outro ciclo de vida e são removidos ao cancelar ou terminar; não herdam a recuperação persistente do HEIF+.",
          "Ao alterar esses caminhos, verifique cancelamento, desmontagem, background, pouco espaço, metadados e a próxima captura. Meça memória e latência no aparelho; testes de arquivos não comprovam estabilidade do preview.",
        ],
      },
      {
        id: "verificar",
        title: "Como validar uma contribuição",
        items: [
          "No aplicativo: npm run lint, npm run typecheck e npm test.",
          "Para foco: npm run test:focus-native em macOS com Xcode/Core Image/Metal.",
          "Para profundidade: npm run test:depth-native em macOS com Xcode/Core ML; os checks não substituem conferir os controles do Fotos no iPhone.",
          "Para HEIF+: bash scripts/check-heif-plus-native.sh; a execução nativa depende de acesso à GPU.",
          "Recompile os módulos nativos e teste formatos, orientações, projetos, cancelamento e biblioteca com acesso limitado.",
          "Registre aparelho, versão do sistema, arquivos exportados e medições; diferencie teste sintético de captura real.",
        ],
      },
      {
        id: "diagnostico",
        title: "Diagnóstico de erros",
        paragraphs: [
          "Sentry é configurado em app/utils/diagnostics.js após ler a preferência local. O compartilhamento começa ativado e pode ser desligado no onboarding beta ou em Configurações → Sobre. Quando ativo, coleta erros e amostra 100% das transações em desenvolvimento/preview e 20% em produção. Mapas de código e releases ajudam a associar uma falha ao fonte.",
          "Tokens de upload ficam no ambiente de build, nunca em variáveis públicas. Um novo SDK nativo exige recompilar o aplicativo. Confira docs/sentry.md no repositório para o procedimento de integração.",
        ],
      }
    ],
  },
];

export function getDocsPage(slug: string) {
  return docsPages.find((page) => page.slug === slug);
}
