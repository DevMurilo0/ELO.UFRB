# Miniaturas de Voz pública — 19/10/2026

Correção restrita aos dois vídeos YouTube da seção Entrevistas e debates em Idealizador. Os títulos, descrições, outros registros, retrato, home e navegação foram preservados.

| Vídeo | Miniatura oficial recuperada | Arquivos locais | Resolução |
| --- | --- | --- | --- |
| (In) Existência, Cultura, Suicídio | https://i.ytimg.com/vi/XJhqUxYRl1k/maxresdefault.jpg | assets/img/idealizador/youtube-XJhqUxYRl1k-original.jpg, .webp e .avif | 1280 × 720 |
| Conexão Sociedade | https://i.ytimg.com/vi/N1BZwAJ1t8o/maxresdefault.jpg | assets/img/idealizador/youtube-N1BZwAJ1t8o-original.jpg, .webp e .avif | 1280 × 720 |

Restaurada a composição anterior de miniatura e texto em duas colunas no desktop, com empilhamento mobile, proporção 16:9 e botão de reprodução. O template usa os IDs cadastrados e os arquivos locais; o JavaScript não busca uma miniatura remota quando já há imagem no HTML. A miniatura permanece visível durante o carregamento. O iframe só é criado por clique/teclado, e o foco passa ao player quando ele carrega. Sem JavaScript, as imagens e links externos continuam disponíveis e o botão inativo não é apresentado.

Verificações:

- npm run build e npm run check aprovados: 17 páginas e 636 referências locais.
- Miniaturas, proporção, ausência de imagens quebradas e carregamento sob demanda conferidos em 375, 768, 1024 e 1440 px.
- Teste controlado confirmou a permanência da miniatura até o iframe carregar; Enter aciona o player.
- Reprodução real confirmada nos dois vídeos: readyState 4, paused false e tempo avançando além de quatro segundos, sem interceptar as respostas do YouTube.
- Verificação por hashes confirmou que a home, as outras páginas e a referência do retrato não mudaram nesta correção.
- Teste de regressão em scripts/check.mjs exige a miniatura do mesmo ID, sua presença no HTML, o player sob demanda e ausência de iframe pré-carregado.
- git diff --check aprovado. Sem deploy remoto.

Capturas da seção (cabeçalho fixo ocultado apenas durante a captura da seção para não sobrepor os vídeos): [desktop](capturas-youtube/voz-publica-1440.png) e [mobile](capturas-youtube/voz-publica-375.png).
