# Idiomas e critérios editoriais

O site e o aplicativo oferecem português brasileiro, inglês, japonês, alemão,
espanhol e francês. A documentação de uso explica as preferências de ambos em
`/docs/configuracoes#idioma`. As escolhas são independentes.

O português fica nos componentes e nos arquivos de conteúdo. Os cinco catálogos
JSON usam os textos de origem como chaves e contêm textos completos, incluindo
guias, avisos, legendas, acessibilidade, formulário, páginas legais e metadados.
Somente as mensagens selecionadas por `ui-keys.json` atravessam a fronteira entre
servidor e navegador.

## Voz e convenções

| Idioma | Orientação |
| --- | --- |
| Português | Português brasileiro, instruções diretas e linguagem fotográfica acessível. |
| Inglês | Redação direta, sem imitar a estrutura das frases em português. |
| Japonês | Instruções em です・ます, títulos concisos, ordem natural das palavras e pontuação japonesa. Sem espaçamento artificial entre caracteres. |
| Alemão | Tratamento informal consistente com “du”, substantivos com inicial maiúscula, compostos naturais e nomes de controles iguais aos do app. |
| Espanhol | Espanhol de compreensão internacional, tratamento por “tú”, sinais de abertura em perguntas e acentos preservados. |
| Francês | Tratamento por “vous”, elisão e apóstrofos tipográficos, espaços antes de dois-pontos e sinais duplos, vocabulário fotográfico consistente. |

Adapte a redação de apresentação para preservar intenção e ritmo. Nos guias,
preserve condições, negativas, valores, versões, permissões e consequências.
Nas páginas legais, mantenha o sentido do original, inclusive a referência à
legislação brasileira; trocar o idioma não muda a jurisdição.

`terminology.json` registra os nomes dos controles no aplicativo revisado.
Use esses nomes nas instruções para que o leitor encontre a opção na tela.
Termos fotográficos na explicação podem ser mais descritivos. Nomes de LUTs,
projetos e autores fornecidos pelo usuário não devem ser traduzidos.

Não concatene fragmentos quando a ordem natural da frase mudar no idioma de
destino. Títulos e mensagens de formulário devem poder ser lidos como frases
completas. Preserve variáveis como `{name}`, `{original}` e `{filtered}`, mas
posicione-as conforme a sintaxe local. Use vírgula decimal em português, alemão,
espanhol e francês; em japonês e inglês, ponto decimal.

## Verificação e manutenção

Ao alterar um texto de origem, atualize os cinco catálogos, o conjunto de
mensagens de cliente quando necessário e a terminologia se o app tiver mudado.
Não deixe traduções de recursos retirados em catálogos ou índices de busca.

`npm run test:i18n` verifica cobertura, variáveis, termos do app, busca,
preferências, links e alternativas de idioma nos metadados. Depois execute
checagem de tipos, lint, build e links. Revise em navegador o menu móvel, a
troca de idioma, os estados do formulário e os textos mais longos.

A normalização de busca aceita acentos e variantes de largura sem apagar a
sonorização dos caracteres japoneses. Slugs e âncoras são identificadores
estáveis; não são traduzidos.

O japonês usa fontes de sistema na interface. As imagens de compartilhamento
usam um subconjunto local de Noto Sans JP com os caracteres necessários,
licenciado pela SIL Open Font License em `public/fonts/OFL-NotoSansJP.txt`.
Se o texto dessas imagens mudar, atualize e confira o subconjunto de glifos.
