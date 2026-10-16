import type { FeatureStatus } from "@/lib/feature-matrix";

export type DocsSection = {
  id: string;
  title: string;
  badge?: "Novo" | "Beta";
  paragraphs?: string[];
  items?: string[];
  links?: { href: string; label: string }[];
  images?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
  }[];
};

export type DocsPage = {
  slug: string;
  title: string;
  description: string;
  platform: "iOS e Android" | "Varia por recurso";
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
        id: "configuracao-inicial",
        title: "Escolha seu ponto de partida",
        badge: "Novo",
        paragraphs: [
          "Na primeira abertura, o onboarding permite escolher as guias do viewfinder. Na etapa Como você quer fotografar?, escolha um conjunto de atalhos ou Quero uma experiência personalizada para adicionar, remover e reordenar controles. O conjunto criativo é a seleção inicial.",
        ],
        items: [
          "Quero controles profissionais: controles manuais, formato de arquivo, proporção, timer, flash e configurações.",
          "Quero controles criativos: LUTs, proporção, Live Photo no iOS, timer e configurações.",
          "Quero o diferencial do app: LUTs, Image Stacking no iOS, projetos, tempo e configurações.",
          "Configurações permanece na barra. Os presets organizam atalhos; recursos continuam sujeitos ao suporte do aparelho e da plataforma.",
        ],
      },
      {
        id: "tour",
        title: "Faça um tour pela câmera",
        badge: "Novo",
        paragraphs: [
          "Na última etapa do onboarding, Quer fazer um tour pelo app? vem ligado. Ao concluir, o tour apresenta os atalhos disponíveis e os controles principais da câmera. Desligue a opção se preferir explorar por conta própria. Para rever a apresentação, use Configurações → Sobre e suporte → Rever apresentação."
        ]
      },
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
          "Em Configurações → Barra de controles, escolha quais controles aparecem e altere a ordem. A TopBar aceita até oito controles, incluindo Configurações, que não pode ser removido.",
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
        images: [
          {
            src: "/images/docs/controles-topbar.jpg",
            width: 1206,
            height: 1074,
            alt: "Barra superior com atalhos para ajustes, HEIF, proporção 4:3, configurações, captura, Live Photo, filtros e abertura.",
            caption: "Os atalhos da TopBar ficam acima do preview; a ordem e os controles exibidos são configuráveis.",
          },
        ],
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
          "Toque em um ponto do preview para definir o foco em câmeras compatíveis.",
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
        images: [
          {
            src: "/images/docs/histograma.jpg",
            width: 999,
            height: 1263,
            alt: "Histograma LUMA LIVE no canto superior direito do preview, com grade e nível visíveis.",
            caption: "Histograma de luminosidade em tempo real, acompanhado da grade e do nível.",
          },
        ],
        title: "Ative grade, nível e histograma",
        paragraphs: [
          "Grade, nível do aparelho e histograma em tempo real são auxílios visuais opcionais. Ative cada um em Configurações → Câmera; eles não são gravados na foto.",
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
        id: "megapixels",
        title: "Escolha os megapixels",
        badge: "Novo",
        paragraphs: [
          "Em Configurações → Captura e arquivos → Megapixels, escolha 12, 24 ou 48 MP separadamente para RAW e HEIF/JPEG. Os padrões são 48 MP para RAW e 24 MP para HEIF/JPEG. A lente e o modo podem entregar uma resolução menor; fotos menores nunca são ampliadas."
        ],
        items: [
          "No par RAW + foto processada, as duas preferências são respeitadas. Live Photo e Retrato seguem os limites nativos; Image Stacking mantém a resolução da estratégia. O recorte de proporção pode reduzir os pixels finais."
        ]
      },
      {
        id: "raw-proraw",
        links: [{href: "/docs/formatos-de-arquivo", label: "Entenda RAW, DNG e foto processada"}],
        title: "Capture em RAW Bayer ou ProRAW",
        items: [
          "Na câmera traseira do iOS, escolha ProRAW ou RAW Bayer em Formato de arquivo; só aparecem os modos anunciados pela lente. ProRAW disponível não garante suporte a Bayer.",
          "RAW Bayer exige lente física sem zoom digital ou recorte. O modo é desligado se esse requisito deixar de ser atendido; ProRAW segue as capacidades da câmera.",
          "RAW e ProRAW não podem ser combinados com Live Photo ou Retrato.",
          "O DNG preserva a área do sensor; a foto processada do par respeita a proporção selecionada. Em Megapixels, escolha a resolução RAW desejada entre 12, 24 e 48 MP; a lente e o modo podem entregar menos pixels.",
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
          "No iPhone, novas fotos são salvas em HEIF por padrão. No controle Formato de arquivo da TopBar, escolha HEIF, HEIF+ ou JPEG na área Foto processada. JPEG amplia a compatibilidade; HEIF+ revela um DNG no aparelho antes de exportar a foto.",
        ],
        items: [
          "A preferência também é aplicada a Live Photos, retratos e cópias sem efeitos quando o fluxo permitir.",
          "RAW e ProRAW mantêm seus formatos próprios; a imagem derivada pode seguir a preferência escolhida.",
        ],
      },
      {
        id: "timer-e-gestos",
        images: [
          {
            src: "/images/docs/timer.jpg",
            width: 1206,
            height: 1087,
            alt: "Menu Timer com Desligado selecionado e opções de 3 seg e 10 seg.",
            caption: "O Timer da TopBar oferece disparo imediato ou contagem de 3 e 10 segundos.",
          },
        ],
        title: "Timer, gestos e atalhos",
        badge: "Novo",
        paragraphs: [
          "Escolha desligado, 3 ou 10 segundos no controle Timer da TopBar. O timer geral não fica salvo: começa desligado e volta a zero quando o app entra em segundo plano.",
          "Em Configurações → Controles e gestos, configure gestos verticais e horizontais e os dois botões de volume para captura, efeitos, lentes ou modos. Cima abre ou ativa; baixo fecha ou desativa. Direita avança e esquerda volta no seletor.",
        ],
        items: [
          "Tirar foto usa o timer geral; Foto com timer de 3s/10s substitui o tempo apenas naquele disparo e mantém seu atalho salvo.",
          "No iOS, diminuir volume, Camera Control e botão de Ação compartilham a ação primária quando acionam captura; aumentar volume usa a secundária.",
          "Mudanças de modo, efeito e lente ficam bloqueadas durante captura, processamento e contagem. Finalizar Rastros de luz ou Motion Blur continua imediato.",
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
        images: [
          {
            src: "/images/docs/luts.jpg",
            width: 1205,
            height: 1053,
            alt: "Aba Filtros com Desligado selecionado e LUTs Guaraná, Maracujá e Mirtilo.",
            caption: "Escolha um LUT na aba Filtros. Na captura, Desligado mantém a foto sem LUT.",
          },
        ],
        title: "LUTs incluídos",
        paragraphs: [
          "O catálogo inclui Guaraná, Maracujá, Mirtilo, Pitaia, Damasco, Cinema, Ameixa e Banana. O efeito é aplicado no processamento da captura e pode ser registrado nos metadados próprios do Komorebi.",
        ],
        items: [
          "Escolha Desligado na aba Filtros para não aplicar LUT.",
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
          "Em Configurações → Captura e arquivos → Estilos Fotográficos, Edição no Fotos da Apple cria um HEIF com estilos editáveis. Ativá-la retorna o formato processado a HEIF; exige o módulo nativo iOS. Escolher JPEG em Formato de arquivo desliga essa preferência.",
          "Live Photo pausa essa opção. Retrato, Image Stacking e HEIF+ podem aplicar estilos à saída HEIF; tanto RAW Bayer quanto ProRAW aplicam estilos somente ao companion ou derivado processado selecionado. O DNG permanece intacto e não recebe estilos. A preferência não comprova que toda lente e versão do Fotos aceitará a edição: confira o arquivo salvo no aparelho antes de depender desse fluxo.",
          "Na mesma tela, Estilos Fotográficos 3 acrescenta textura e grão aos estilos editáveis em iPhones e versões do iOS compatíveis. Confira as opções disponíveis ao abrir a foto no Fotos da Apple.",
        ],
      },
      {
        id: "estilos-na-galeria",
        title: "Prepare estilos pela galeria",
        badge: "Novo",
        paragraphs: [
          "No iOS, abra uma foto, toque em Informações e expanda Estilos Fotográficos em Criar e editar. Quando a imagem for elegível, Criar cópia com Estilos salva uma cópia HEIF da versão atual e mantém a original. Abra a cópia no Fotos da Apple para editar os estilos. A opção Estilos Fotográficos 3 acrescenta textura e grão em aparelhos e versões do iOS compatíveis."
        ]
      },
      {
        id: "grao-halation",
        images: [
          {
            src: "/images/docs/grao.jpg",
            width: 1206,
            height: 1152,
            alt: "Aba Grão com as opções Desligado, Suave, Médio e Forte; Médio está selecionado.",
            caption: "A aba Grão permite escolher a intensidade da textura; aqui, Médio está ativo.",
          },
          {
            src: "/images/docs/halation.jpg",
            width: 1206,
            height: 1022,
            alt: "Aba Halation com Desligado selecionado e opções Suave, Médio e Forte.",
            caption: "A intensidade do halation é escolhida separadamente do grão e dos filtros.",
          },
        ],
        title: "Aplique grão e halation",
        badge: "Novo",
        paragraphs: [
          "Grão e halation foram recalibrados e agora oferecem três intensidades diretas: Suave, Médio e Forte. O grão simula textura fotográfica; o halation cria um halo avermelhado difuso ao redor de altas luzes com contraste local.",
        ],
        items: [
          "Escolha Desligado na aba Grão ou Halation para desligar cada efeito.",
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
          "Abra uma foto e toque em Informações para consultar EXIF e localização, organizar projetos, avaliar e compartilhar. Em Criar e editar, expanda Desfoque ou Estilos Fotográficos para ver suas opções; apenas um desses recursos fica expandido por vez.",
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
    sections: [
      {
        id: "gerar",
        title: "Gere profundidade no aparelho",
        badge: "Beta",
        paragraphs: [
          "Abra uma foto, toque em Informações e expanda Desfoque em Criar e editar. A geração de profundidade usa um modelo incluído no app e executa localmente, sem download no primeiro uso nem envio da foto a servidor. O Android não oferece essa ação.",
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
    title: "Configurações",
    description:
      "Consulte o efeito, a persistência e as dependências das preferências do Komorebi.",
    platform: "iOS e Android",
    status: "supported",
    prerequisites: ["As preferências são mantidas localmente com AsyncStorage"],
    sections: [
      {
        id: "guias-no-app",
        title: "Abra os guias pelo aplicativo",
        badge: "Novo",
        paragraphs: [
          "No início de Configurações, um card de tutorial abre um guia desta documentação no navegador do aparelho. O guia varia entre câmera, efeitos, projetos e, no iOS, RAW e controles manuais. A consulta usa internet; abrir o guia não envia uma foto.",
        ],
      },
      {
        id: "preview",
        images: [
          {
            src: "/images/docs/estilo-retro.jpg",
            width: 1206,
            height: 1403,
            alt: "Controles inferiores com seletor EV e ISO, escala de exposição, obturador amarelo e lentes de 0.5 a 8.",
            caption: "Detalhe do viewfinder com estilo retrô: escala de exposição e controles de captura.",
          },
        ],
        title: "Câmera e prévia de efeitos",
        paragraphs: [
          "Configurações → Câmera reúne as guias e a aparência do viewfinder. Configurações → Prévia de efeitos controla LUT, Halation e Grain na imagem ao vivo; no iOS, também a prévia de Dupla exposição e Stacking. O resultado salvo usa o processamento de alta resolução e pode diferir do preview.",
        ],
        items: [
          "Estilo retrô: altera a apresentação do viewfinder. Desligado, a interface usa bordas suaves no preview; essa aparência não altera a foto salva.",
          "Grade: adiciona linhas de composição.",
          "Nível: mostra o alinhamento do aparelho.",
          "Histograma: mostra a distribuição de luminosidade em tempo real quando o pipeline ativo oferece suporte.",
          "Indicador de altas luzes e Indicador de sombras: sinalizam extremos de exposição no preview do iOS. Focus peaking destaca bordas para ajudar no foco. Esses indicadores não aparecem na foto salva.",
          "Som do obturador: ativa ou desativa o som próprio do app, sem substituir regras do sistema.",
        ],
      },
      {
        id: "idioma",
        title: "Idioma do aplicativo",
        paragraphs: [
          "Em Configurações → Idioma, escolha português, inglês, japonês, alemão, espanhol ou francês. Automático segue o idioma principal do aparelho; idiomas não disponíveis usam inglês. A escolha manual fica salva no dispositivo. Nomes de projetos, LUTs e autoria são preservados."
        ]
      },
      {
        id: "widgets-e-atalhos",
        title: "Widgets e Atalhos",
        badge: "Novo",
        paragraphs: [
          "No iOS, abra Configurações → Widgets e Atalhos e crie presets com nome, ícone e cor. Defina filtro, formato, proporção, câmera, flash, timer, grão e halation ou mantenha os ajustes atuais. Você também pode escolher uma imagem de fundo da biblioteca."
        ],
        items: [
          "Um painel reúne até oito presets. O widget médio mostra os quatro primeiros; o grande mostra até oito. Na galeria de widgets do iOS, procure Komorebi, adicione Preset da câmera ou Painel da câmera e edite o widget para escolher o item salvo.",
          "O controle Preset Komorebi abre a câmera completa após desbloquear o iPhone. Pode ser usado na tela bloqueada, na Central de Controle e no Botão de Ação compatível.",
          "No app Atalhos, Abrir preset e Abrir câmera configurada apenas abrem e configuram a câmera; você escolhe quando fotografar. Opções incompatíveis com a lente são ignoradas com aviso.",
          "Os ajustes de um preset duram na sessão, inclusive ao navegar ou voltar do segundo plano. Encerrar o app restaura as preferências salvas. Presets e imagens de fundo ficam locais, sem sincronização por iCloud."
        ]
      },
      {
        id: "captura-opcoes",
        title: "Captura e metadados",
        items: [
          "Salvar cópia sem efeitos: mantém uma versão sem LUT, grão ou halation quando aplicável.",
          "Salvar localização: grava GPS apenas em novas fotos e somente com permissão.",
          "O formato é escolhido no atalho Formato de arquivo da TopBar. Captura e arquivos reúne Megapixels, cópia sem efeitos, autoria, localização, Estilos Fotográficos e ajustes de Revelação HEIF+ no iOS.",
          "Autoria: grava autor e direitos autorais nas próximas capturas, sem modificar fotos existentes.",
          "Edição no Fotos da Apple (experimental, iOS): aplica Estilos 2/3 à saída HEIF, inclusive Retrato, stacking e HEIF+. Pausa em Live Photo; RAW Bayer e ProRAW aplicam estilos somente ao companion ou derivado processado selecionado, sem modificar o DNG.",
          "Megapixels: escolha 12, 24 ou 48 MP separadamente para RAW e HEIF/JPEG, respeitando os limites da lente e do modo. LUTs personalizados permite importar e remover arquivos .cube locais.",
        ],
      },
      {
        id: "gestos-e-diagnosticos",
        title: "Controles e diagnósticos",
        paragraphs: [
          "Controles e gestos guarda os atalhos verticais, horizontais e dos botões físicos. O timer geral é temporário e escolhido somente na TopBar.",
          "Em Sobre e suporte → Compartilhar uso e diagnósticos, controle o envio de uso ao PostHog e de erros ao Sentry. A opção começa ativada. Desligar bloqueia novos envios e descarta eventos de uso pendentes; os serviços não iniciam na próxima abertura. Requisições já iniciadas podem terminar e dados já enviados não são apagados. Fotos e localização não são enviadas por essas integrações.",
        ],
        links: [{ href: "/docs/camera#timer-e-gestos", label: "Configure timer e atalhos da câmera" }],
      },
      {
        id: "topbar-opcoes",
        title: "TopBar",
        paragraphs: [
          "Em Barra de controles, escolha até oito atalhos e defina a ordem; Configurações permanece disponível e não pode ser removido. As opções disponíveis dependem da capacidade da lente, do sistema operacional e das permissões.",
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
          "Suportado: recurso disponível na plataforma.",
          "Condicional: depende de hardware, lente, API ou permissão detectada durante o uso.",
          "Indisponível: recurso não oferecido na plataforma.",
          "A validar: recurso ainda depende de confirmação em aparelho físico.",
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
    slug: "controles-manuais",
    title: "Controles manuais",
    description: "Aprenda a equilibrar luz, movimento, ruído, foco e cor antes de fotografar.",
    platform: "Varia por recurso",
    status: "conditional",
    prerequisites: [
      "iOS e câmera com os controles manuais anunciados como disponíveis",
      "Aparelho físico; capacidades mudam ao trocar de lente",
    ],
    sections: [
      {
        id: "painel",
        title: "Use o painel de ajustes",
        paragraphs: [
          "Ative Controles manuais na TopBar. O painel inferior substitui a régua de exposição no mesmo espaço e oferece EV, ISO, SS (obturador), WB (balanço de branco) e AF (foco). Selecione o ajuste no seletor à esquerda e arraste a régua à direita para alterar o valor.",
          "AUTO indica que aquele controle está automático. Um toque breve na régua devolve ISO, SS, WB ou AF ao automático; em EV, o toque retorna a 0,0 EV. Sair do modo manual restaura os ajustes automáticos; ao abrir de novo, o painel começa em EV.",
        ],
        links: [{ href: "/docs/camera#exposicao-e-controles-manuais", label: "Disponibilidade dos ajustes na câmera" }],
      },
      {
        id: "exposicao",
        images: [
          {
            src: "/images/docs/controles-manuais.jpg",
            width: 1206,
            height: 1090,
            alt: "Painel inferior com ISO, SS e WB; SS selecionado, escala marcada AUTO e lente 4 ativa.",
            caption: "No painel manual, SS seleciona a velocidade do obturador; AUTO indica o ajuste automático.",
          },
        ],
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
        id: "focus-peaking",
        title: "Focus peaking no preview",
        badge: "Novo",
        paragraphs: [
          "No iOS, ative Configurações → Câmera → Focus peaking para destacar bordas de maior contraste e ajudar a ajustar o foco. O destaque acompanha o preview e não é gravado na foto. Confira o resultado salvo: contraste e iluminação podem afetar a indicação."
        ]
      },
      {
        id: "auxilios",
        title: "Histograma, zebras e foco",
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
    sections: [
      {
        id: "escolher",
        images: [
          {
            src: "/images/docs/formatos-de-arquivo.jpg",
            width: 1206,
            height: 1244,
            alt: "Menu Formato de arquivo com RAW Nenhum, ProRAW e RAW Bayer, e foto processada Nenhuma, HEIF, HEIF+ e JPEG; HEIF está selecionado.",
            caption: "O seletor separa RAW e foto processada. Neste exemplo, somente a saída HEIF está ativa.",
          },
        ],
        title: "Escolha o formato e as saídas",
        paragraphs: [
          "Na TopBar, abra Formato de arquivo. A área RAW oferece Nenhum e os modos ProRAW e RAW Bayer disponíveis na lente; Foto processada oferece Nenhuma e HEIF, HEIF+ ou JPEG no iOS. No Android, a saída processada é JPEG. Se o atalho não aparecer, inclua-o em Configurações → Barra de controles.",
          "Mantenha pelo menos uma saída. Para salvar só DNG, selecione um RAW e depois Nenhuma em Foto processada. Para salvar só HEIF/JPEG, selecione a foto processada e depois Nenhum em RAW. A última saída não pode ser desligada pelo seletor.",
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
        id: "bayer-proraw",
        title: "RAW Bayer, ProRAW e zoom",
        badge: "Novo",
        paragraphs: [
          "ProRAW e RAW Bayer são opções distintas. O app consulta o suporte da câmera traseira ativa e mostra cada modo disponível, mesmo quando existe apenas um. Escolher Bayer não o substitui silenciosamente por ProRAW.",
          "RAW Bayer exige uma lente física com zoom nativo do sensor, sem recorte ou zoom digital. Os números do seletor são relativos ao conjunto de lentes: 0,5×, 1× ou 4× podem corresponder a lentes físicas sem zoom digital; paradas como 2× ou 8× podem ser recortes. A disponibilidade depende do aparelho, não apenas do número exibido.",
          "Ao usar zoom digital, uma câmera virtual ou uma lente sem suporte, Bayer é desligado e a saída processada volta a ficar ativa. ProRAW continua condicionado às capacidades da lente e pode admitir zoom. Para voltar ao Bayer, retorne a uma lente física compatível sem recorte e selecione RAW Bayer novamente.",
          "Os dois modos permitem DNG sozinho, par com HEIF/JPEG ou revelação HEIF+, conforme as saídas selecionadas. Os Estilos Fotográficos atuam somente no companion ou derivado HEIF; o DNG não recebe estilos.",
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
          "Em Configurações → Captura e arquivos → Megapixels, escolha 12, 24 ou 48 MP separadamente para RAW e HEIF/JPEG. Os padrões são 48 MP para RAW e 24 MP para HEIF/JPEG. Bayer pode ficar limitado a cerca de 12 MP; ProRAW depende da lente. Fotos menores nunca são ampliadas.",
          "O tamanho varia com a cena, lente e tipo de RAW; não existe tamanho fixo em MB.",
        ],
      },
      {
        id: "restricoes",
        title: "Troca de lente e modos incompatíveis",
        paragraphs: [
          "O seletor bloqueia desligar a última saída. Ao trocar de lente, mantém o RAW escolhido e a seleção de foto processada enquanto a nova sessão informa suas capacidades. Confirmar que o modo não é suportado, mudar para a câmera frontal ou usar zoom digital em Bayer desliga RAW e ativa a foto processada.",
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
    sections: [
      {
        id: "revelacao",
        title: "O que acontece na captura",
        paragraphs: [
          "HEIF+ captura um DNG e o revela com CIRAWFilter. A imagem processada acompanhante da câmera não é a fonte desse fluxo. O app recorta, aplica LUT, halation e grão e exporta HEIF.",
          "Escolha HEIF+ em Foto processada no controle Formato de arquivo da TopBar. Ajuste a revelação em Configurações → Captura e arquivos → Revelação HEIF+. Se RAW Bayer ou ProRAW também estiver selecionado, esse DNG acompanha o HEIC no mesmo item da biblioteca. Com RAW em Nenhum, o app usa ProRAW quando disponível, ou Bayer como alternativa, somente como fonte temporária da revelação.",
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
          "Testes nativos com imagens sintéticas verificam exportação, efeitos, metadados e recuperação. A qualidade de RAW Bayer e ProRAW reais, diferenças dos controles, tempos, memória e interrupções ainda precisam ser conferidos em iPhone físico. A implementação não comprova por si só a qualidade em todas as lentes.",
        ],
      }
    ],
  },

  {
    slug: "image-stacking",
    title: "Image Stacking",
    description: "Combine capturas com Rastros de luz, Motion Blur e Dupla exposição e saiba quando usar cada modo.",
    platform: "Varia por recurso",
    status: "validate",
    prerequisites: [
      "iOS e módulo nativo atualizado",
      "Modo anunciado nas capacidades da lente",
      "Apoio ou tripé para sequências longas",
    ],
    sections: [
      {
        id: "modos",
        title: "Modos disponíveis",
        paragraphs: [
          "Abra Image Stacking na TopBar. O seletor oferece Rastros de luz, Motion Blur, Dupla exposição e Focus Bracketing conforme o suporte da lente.",
        ],
      },
      {
        id: "rastros-de-luz",
        title: "Rastros de luz: desenhe com movimento",
        badge: "Novo",
        paragraphs: [
          "Selecione Image Stacking → Rastros de luz. Apoie o iPhone em um tripé e enquadre faróis, luzes em movimento ou light painting. Ajuste a exposição antes de começar. Um toque no obturador inicia; outro encerra imediatamente. Cancelar descarta a captura; o limite automático é de cinco minutos.",
          "O modo conserva os rastros mais claros conforme as luzes se movem. Ative a prévia de stacking para acompanhar o resultado acumulado. A câmera precisa ficar imóvel: este modo não alinha os frames. Ruído e cruzamentos de cores podem alterar o resultado."
        ],
        items: [
          "O resultado exige pelo menos um segundo e cinco frames válidos. A resolução vem do stream de vídeo, limitada a 4096 pixels no lado maior. Sair da câmera ou colocar o app em segundo plano cancela a sequência."
        ]
      },
      {
        id: "motion-blur",
        title: "Motion Blur: suavizar movimento",
        paragraphs: [
          "Motion Blur faz uma média temporal com alinhamento global para simular longa exposição. Elementos que se movem podem criar borrão enquanto partes estáveis se mantêm mais definidas.",
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
        ],
      },
      {
        id: "resultado",
        title: "Salvamento, efeitos e cancelamento",
        paragraphs: [
          "A composição pode receber LUT, grão, halation, recorte e organização no projeto. O resultado sai em HEIF ou JPEG.",
          "Salvar original sem efeitos preserva a composição antes dos efeitos, não os frames usados para montá-la. RAW, Live Photo, Retrato, flash e controles manuais gerais seguem os bloqueios do modo. Os arquivos intermediários são removidos ao terminar, falhar ou cancelar.",
        ],
        links: [
          {
            href: "/docs/focus-bracketing",
            label: "Passo a passo do Focus Bracketing"
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
    slug: "metadados-e-autoria",
    title: "Metadados e autoria",
    description: "Grave autoria, classifique fotos e entenda GPS, EXIF, IPTC e XMP.",
    platform: "Varia por recurso",
    status: "conditional",
    prerequisites: [
      "Biblioteca de mídia com permissão de leitura/escrita",
      "iOS 27 e build com SDK compatível para sincronização da nota com o catálogo Fotos",
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
          "Abra a foto e toque em Informações. Escolha a nota; a estrela cortada grava zero explicitamente. A interface confirma somente depois da escrita e apresenta falhas de permissão ou armazenamento.",
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

];

export function getDocsPage(slug: string) {
  return docsPages.find((page) => page.slug === slug);
}
