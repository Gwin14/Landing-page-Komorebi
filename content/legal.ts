import type { LegalSection } from "@/components/legal/LegalPage";

export const privacySections: LegalSection[] = [
  {
    title: "Visão geral",
    paragraphs: [
      "O Komorebi é um aplicativo de câmera desenvolvido por Fábio Santos com foco em captura fotográfica, processamento local de imagens, filtros LUT e preservação de metadados.",
      "O Komorebi não possui contas de usuário, não mantém servidores próprios com dados pessoais, não vende dados, não exibe anúncios e não usa redes de publicidade.",
    ],
  },
  {
    title: "Dados processados no dispositivo",
    paragraphs: [
      "A maior parte do funcionamento acontece localmente. O app pode criar, ler ou armazenar fotos e arquivos de captura, o álbum Komorebi, metadados EXIF, preferências e LUTs personalizados.",
    ],
    items: [
      "Latitude, longitude e altitude só podem ser gravadas no EXIF quando a permissão estiver concedida e a opção de localização estiver ativada.",
      "Preferências incluem grade, som, formato de imagem, cópia original e configuração da TopBar.",
      "Arquivos .cube importados ficam armazenados localmente.",
    ],
  },
  {
    title: "Permissões",
    paragraphs: [
      "O app solicita permissões apenas para habilitar suas funções.",
    ],
    items: [
      "Câmera: preview e captura.",
      "Biblioteca de mídia ou Fotos: salvar, mostrar a galeria, ler metadados e excluir quando solicitado.",
      "Localização durante o uso: GPS no EXIF e consulta de clima e localidade.",
      "Microfone: declarado para compatibilidade de câmera ou vídeo, embora o app atual seja focado em fotografia.",
    ],
  },
  {
    title: "Localização",
    paragraphs: [
      "O app usa localização durante o uso para gravar GPS em novas fotos, quando ativado, e para consultar clima e localidade. Não acessa localização em segundo plano. Desativar a opção não remove coordenadas de fotos já salvas.",
    ],
  },
  {
    title: "Fotos galeria e metadados",
    paragraphs: [
      "As fotos são salvas na biblioteca de mídia, geralmente no álbum Komorebi. A galeria integrada pode exibir EXIF, abrir um mapa e excluir a foto selecionada. O app não faz upload automático das suas fotos.",
    ],
  },
  {
    title: "Serviços de terceiros",
    items: [
      "Open-Meteo recebe latitude e longitude aproximadas para dados meteorológicos.",
      "BigDataCloud recebe latitude e longitude aproximadas para geocodificação reversa.",
      "Leaflet, Carto e unpkg carregam scripts, estilos e mapas centrados nas coordenadas da foto.",
      "O gerador de EXIF Frame pode receber ou processar a imagem e metadados em WebView.",
      "Notion recebe somente as informações enviadas voluntariamente no formulário de feedback.",
      "Links externos passam a seguir as políticas do serviço acessado.",
    ],
  },
  {
    title: "Publicidade analytics e venda de dados",
    paragraphs: [
      "O Komorebi não exibe anúncios, não integra redes de publicidade, não vende dados e não inclui serviço próprio de analytics comportamental.",
    ],
  },
  {
    title: "Segurança e retenção",
    paragraphs: [
      "Os dados locais ficam sujeitos às proteções do dispositivo. Você controla a retenção ao excluir fotos, remover LUTs, revogar permissões ou desinstalar o app. A desinstalação não remove necessariamente fotos já salvas.",
    ],
  },
  {
    title: "Direitos do usuário",
    items: [
      "Acessar e alterar preferências.",
      "Excluir fotos e metadados associados.",
      "Remover LUTs personalizados.",
      "Revogar permissões.",
      "Não usar serviços externos como mapa, feedback ou EXIF Frame.",
    ],
  },
  {
    title: "Crianças e adolescentes",
    paragraphs: [
      "O app não é direcionado especificamente a crianças e não coleta intencionalmente dados de menores em servidores próprios. Responsáveis devem orientar o uso de câmera, localização, galeria e compartilhamento.",
    ],
  },
  {
    title: "Alterações nesta política",
    paragraphs: [
      "A política pode ser atualizada quando mudarem funções, permissões ou integrações. A data no topo identifica a versão mais recente.",
    ],
  },
  {
    title: "Contato",
    items: [
      "Desenvolvedor: Fábio Santos",
      "Site: fotoessencia.fabiosantos.dev.br",
      "Instagram: @fotoessencia_",
      "GitHub: github.com/Gwin14",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    title: "Aceitação",
    paragraphs: [
      "Ao instalar, acessar ou usar o Komorebi, aplicativo desenvolvido por Fábio Santos, você concorda com estes Termos de Uso. Se não concordar, não utilize o app.",
    ],
  },
  {
    title: "O que é o Komorebi",
    paragraphs: [
      "O Komorebi é um aplicativo de câmera para iOS e Android, com captura fotográfica, controles manuais condicionais, LUTs, efeitos, EXIF e galeria integrada.",
    ],
    items: [
      "RAW ou ProRAW, Live Photo, retrato e Camera Control dependem de iOS e hardware compatível.",
      "Projetos, captura dupla, sorriso automático, volume, GPS, clima e EXIF Frame também dependem das condições descritas na documentação.",
    ],
  },
  {
    title: "Requisitos e limitações",
    items: [
      "iOS 18 ou superior.",
      "Android 8 ou superior.",
      "Câmera necessária para a experiência principal.",
      "Dispositivo físico recomendado; simuladores não reproduzem todos os recursos.",
    ],
  },
  {
    title: "Permissões",
    items: [
      "Câmera para preview e captura.",
      "Fotos para salvar, organizar, ler e excluir quando solicitado.",
      "Localização durante o uso para GPS, clima e localidade.",
      "Microfone declarado para compatibilidade de câmera ou vídeo.",
    ],
  },
  {
    title: "Uso permitido",
    items: [
      "Capturar, processar e organizar fotos pessoais ou profissionais.",
      "Aplicar LUTs incluídos e importar arquivos .cube devidamente licenciados.",
      "Gerar EXIF Frame e compartilhar imagens.",
      "Estudar, modificar e distribuir o código conforme a licença MIT.",
    ],
  },
  {
    title: "Uso proibido",
    items: [
      "Violar leis de privacidade, imagem, direitos autorais ou propriedade intelectual.",
      "Fotografar sem autorização quando ela for exigida.",
      "Usar arquivos sem licença.",
      "Explorar falhas, burlar permissões ou prejudicar serviços e dispositivos.",
      "Confundir usuários sobre autoria ou origem de versões modificadas.",
    ],
  },
  {
    title: "Conteúdo do usuário",
    paragraphs: [
      "As fotos continuam sendo suas. Você é responsável por consentimentos, direitos de imagem, licenças, revisão de GPS e cópias de segurança. Arquivos podem ser perdidos por exclusão, falha do dispositivo, permissões ou sistema operacional.",
    ],
  },
  {
    title: "Serviços de terceiros",
    paragraphs: [
      "Open-Meteo, BigDataCloud, Leaflet, Carto, unpkg, o gerador de EXIF Frame, Notion e links externos têm seus próprios termos e políticas. A equipe Komorebi não controla sua disponibilidade ou práticas.",
    ],
  },
  {
    title: "Propriedade intelectual e licença",
    paragraphs: [
      "O código-fonte é distribuído sob a Licença MIT. Nome, ícones, imagens, textos, identidade visual e materiais autorais pertencem aos respectivos autores. LUTs importados são responsabilidade do usuário.",
    ],
  },
  {
    title: "Isenção de garantias",
    paragraphs: [
      "O Komorebi é fornecido no estado em que se encontra, sem garantia de funcionamento contínuo, compatibilidade universal, precisão, preservação perfeita de arquivos ou disponibilidade de serviços externos.",
    ],
  },
  {
    title: "Limitação de responsabilidade",
    paragraphs: [
      "Na máxima extensão permitida pela lei, a equipe não responde por perda de fotos, exposição acidental de GPS, falhas de hardware ou sistema, serviços de terceiros, uso indevido, danos indiretos ou lucros cessantes.",
    ],
  },
  {
    title: "Atualizações",
    paragraphs: [
      "Atualizações podem adicionar, modificar ou remover recursos, permissões, integrações, textos legais e compatibilidade. O uso continuado indica aceite da versão atualizada.",
    ],
  },
  {
    title: "Encerramento de uso",
    paragraphs: [
      "Você pode parar de usar o app e desinstalá-lo. Preferências podem ser removidas, mas fotos salvas podem permanecer na biblioteca.",
    ],
  },
  {
    title: "Lei aplicável",
    paragraphs: [
      "Estes termos são regidos pelas leis do Brasil, incluindo, quando aplicável, o Marco Civil da Internet, a LGPD e o Código de Defesa do Consumidor.",
    ],
  },
  {
    title: "Contato",
    items: [
      "Desenvolvedor: Fábio Santos",
      "Site: fotoessencia.fabiosantos.dev.br",
      "Repositório: github.com/Gwin14/Komorebi",
      "Instagram: @fotoessencia_",
      "Feedback: Configurações, Dê seu feedback",
    ],
  },
];
