> Atualização posterior: a autorização foi confirmada e as imagens foram incorporadas. O estado atual, os arquivos e as verificações estão em [Integração de imagens — 19/10/2026](integracao-imagens-elo-2026.md). As menções a pendências de autorização abaixo descrevem a etapa anterior.

# Auditoria de imagens e navegação — 19/10/2026

## Estado desta entrega: parcial

A ordem exata do menu está implementada no gerador compartilhado para desktop, mobile e rodapé. As imagens existentes da webconferência de 2022 e da capa institucional passaram a aparecer também nos respectivos registros de Publicações. O retrato não foi trocado e nenhum novo arquivo fotográfico foi incorporado a assets/img nesta rodada: a autorização solicitada ao responsável não recebeu resposta durante a execução. Isso não equivale à conclusão das prioridades fotográficas.

A pesquisa acessou novamente os três perfis pelo Chromium, examinou 36 permalinks individuais relacionados ao inventário e recuperou imagens dos metadados de 35 deles. Os arquivos ficaram no diretório temporário de pesquisa, sem referências ao CDN nos HTMLs de produção. Foram consultados novamente os carrosséis de oito publicações; a navegação seguinte de alguns deles é interceptada pelo convite de login. Não houve autenticação nem contorno da restrição.

## Navegação implementada

INÍCIO → O ELO → IDEALIZADOR → AÇÕES → AGENDAS → PUBLICAÇÃO → PARCEIRA → CONTATO

Rotas mantidas, inclusive /parceira/. O item ativo dessa página passou a ser PARCEIRA. Header e footer usam a mesma lista. A ordem é verificada por npm run check. O menu sem JavaScript mantém os links disponíveis; oito itens precisam caber também nesse estado.

## Inventário antes da alteração

Legenda: A = imagem local relacionada; B = resolução insuficiente para a apresentação pretendida; C = bloco substituto de imagem; D = sem imagem; E = imagem incorreta. Não foi identificada associação incorreta de imagem publicada. Os arquivos antigos de campanha têm resolução limitada, embora pertinentes, e foram preservados. Um bloco C foi removido como apresentação fotográfica; enquanto falta autorização, a ação fica em composição textual discreta, sem retângulo cinza.

| Área | Conteúdo | Estado anterior | Imagem disponível na fonte | Encaminhamento |
| --- | --- | --- | --- | --- |
| Ações | 9ª Campanha Setembro Amarelo | A · imagem local existente | [Db_rIESqtqY](https://www.instagram.com/p/Db_rIESqtqY/) · 631 × 631 px | Preservada |
| Ações | Movimentos Sociais e Universidade | A · imagem local existente | [Fonte](https://ufrb.edu.br/cahl/eventos/2506-reenconcavo-2023) | Preservada |
| Ações | Saúde Mental e Psicoeducação | A · imagem local existente | [Fonte](https://ufrb.edu.br/portal1/component/chronoforms5/?chronoform=ver-evento&id=1736) | Preservada |
| Ações | Violência escolar e juventudes no Recôncavo | C · bloco substituto | [DZFZ5iUDso-](https://www.instagram.com/elo.ufrb.oficial/p/DZFZ5iUDso-/) · 497 × 496 px | Permissão e/ou arquivo original pendentes |
| Ações | Saberes e formação no Colégio Candido Portinari | C · bloco substituto | [DUBEE64DfkL](https://www.instagram.com/p/DUBEE64DfkL/) · 361 × 640 px | Permissão e/ou arquivo original pendentes |
| Ações | Escuta e cuidado em Santiago do Iguape | C · bloco substituto | [Ddo-RZ-Oljn](https://www.instagram.com/p/Ddo-RZ-Oljn/) · 361 × 640 px | Permissão e/ou arquivo original pendentes |
| Ações | Assédio moral no cotidiano e saúde mental: o que fazer? | C · bloco substituto | [DdToCjVxn7X](https://www.instagram.com/reel/DdToCjVxn7X/) · 640 × 1138 px | Permissão e/ou arquivo original pendentes |
| Ações | Saúde mental e cuidado na UFRB FM | C · bloco substituto | [DdWdA_WoIPH](https://www.instagram.com/p/DdWdA_WoIPH/) · 480 × 640 px | Permissão e/ou arquivo original pendentes |
| Agenda | Encerramento da 9ª Campanha Setembro Amarelo | D · sem imagem | [Ddrwv2fq7dJ](https://www.instagram.com/elo.ufrb.oficial/p/Ddrwv2fq7dJ/) · 1254 × 1254 px | Permissão e/ou arquivo original pendentes |
| Agenda | Pesquisa Social Aplicada na Educação Básica | D · sem imagem | [Fonte](https://www.instagram.com/elo.ufrb.oficial/) | Permissão e/ou arquivo original pendentes |
| Agenda | Escuta e cuidado em Santiago do Iguape | D · sem imagem | [Ddo-RZ-Oljn](https://www.instagram.com/p/Ddo-RZ-Oljn/) · 361 × 640 px | Permissão e/ou arquivo original pendentes |
| Agenda | Assédio moral no cotidiano e saúde mental: o que fazer? | D · sem imagem | [DdToCjVxn7X](https://www.instagram.com/reel/DdToCjVxn7X/) · 640 × 1138 px | Permissão e/ou arquivo original pendentes |
| Publicações | Encerramento no CAHL: chamada de setembro | D · sem imagem | [Ddrwv2fq7dJ](https://www.instagram.com/elo.ufrb.oficial/p/Ddrwv2fq7dJ/) · 1254 × 1254 px | Permissão e/ou arquivo original pendentes |
| Publicações | Pesquisa e integração com o NTE 21 | D · sem imagem | [DdpTBuIK8bM](https://www.instagram.com/elo.ufrb.oficial/p/DdpTBuIK8bM/) · 640 × 639 px | Permissão e/ou arquivo original pendentes |
| Publicações | Diálogos com o Festival CAHLCULTURANDO | D · sem imagem | [DdoSlCFx54f](https://www.instagram.com/elo.ufrb.oficial/p/DdoSlCFx54f/) · Não recuperada nesta consulta | Permissão e/ou arquivo original pendentes |
| Publicações | 9ª Campanha Setembro Amarelo | A · imagem local existente | [Db_rIESqtqY](https://www.instagram.com/p/Db_rIESqtqY/) · 631 × 631 px | Preservada |
| Publicações | 22 de julho: Dia do Cientista Social | D · sem imagem | [DbGRT-hRiaj](https://www.instagram.com/elo.ufrb.oficial/p/DbGRT-hRiaj/) · 589 × 589 px | Permissão e/ou arquivo original pendentes |
| Publicações | Violência juvenil e convivência escolar no Recôncavo | D · sem imagem | [DZFZ5iUDso-](https://www.instagram.com/elo.ufrb.oficial/p/DZFZ5iUDso-/) · 497 × 496 px | Permissão e/ou arquivo original pendentes |
| Publicações | Saúde mental, juventudes e convivência no encerramento | D · sem imagem | [Fonte](https://educacao.atarde.com.br/saude-mental-e-tema-de-campanha-em-escolas-de-cachoeira/) | Permissão e/ou arquivo original pendentes |
| Publicações | Campanha no Recôncavo: divulgação na imprensa regional | D · sem imagem | [Fonte](https://tribunadoreconcavo.com/setembro-amarelo-reconcavo-cachoeira-ufrb/) | Permissão e/ou arquivo original pendentes |
| Publicações | Saúde Mental e Psicoeducação na TV UFRB | D · sem imagem | [Fonte](https://www.youtube.com/watch?v=e6O80rgJcUU) | Arte institucional já existente associada ao registro |
| Publicações | Educação de Cachoeira registra o encerramento no CAHL | D · sem imagem | [Dd-dgPEAMBp](https://www.instagram.com/p/Dd-dgPEAMBp/) · 640 × 640 px | Permissão e/ou arquivo original pendentes |
| Publicações | Reconhecimento público a Aline Brandão | D · sem imagem | [DebxZcnRIG1](https://www.instagram.com/reel/DebxZcnRIG1/) · 640 × 1136 px | Permissão e/ou arquivo original pendentes |
| Publicações | Diálogo com educadores e estudantes do Colégio Candido Portinari | D · sem imagem | [DUBEE64DfkL](https://www.instagram.com/p/DUBEE64DfkL/) · 361 × 640 px | Permissão e/ou arquivo original pendentes |
| Publicações | Escuta e cuidado no CEQBI, em Santiago do Iguape | D · sem imagem | [Ddo-RZ-Oljn](https://www.instagram.com/p/Ddo-RZ-Oljn/) · 361 × 640 px | Permissão e/ou arquivo original pendentes |
| Publicações | Assédio moral no cotidiano e saúde mental: o que fazer? | D · sem imagem | [DdToCjVxn7X](https://www.instagram.com/reel/DdToCjVxn7X/) · 640 × 1138 px | Permissão e/ou arquivo original pendentes |
| Publicações | Abertura da campanha: vida comunitária, trabalho e educação | D · sem imagem | [DccAoDwKNHr](https://www.instagram.com/p/DccAoDwKNHr/) · 360 × 640 px | Permissão e/ou arquivo original pendentes |
| Publicações | Quem constrói a pesquisa sobre violência juvenil nas escolas | D · sem imagem | [DZBNQElEegq](https://www.instagram.com/p/DZBNQElEegq/) · 1254 × 1254 px | Permissão e/ou arquivo original pendentes |
| Publicações | Pílula I: justiça, escuta e acolhimento espiritual | D · sem imagem | [DeILljpqIfd](https://www.instagram.com/elo.ufrb.oficial/reel/DeILljpqIfd/) · 360 × 640 px | Permissão e/ou arquivo original pendentes |
| Publicações | Samira Jéssica e a educação quilombola no Iguape | D · sem imagem | [DepiEkvqjst](https://www.instagram.com/elo.ufrb.oficial/reel/DepiEkvqjst/) · 360 × 640 px | Permissão e/ou arquivo original pendentes |
| Publicações | Mário do Jornal e a rede estadual de educação | D · sem imagem | [Dec0_jgqRcR](https://www.instagram.com/elo.ufrb.oficial/reel/Dec0_jgqRcR/) · 640 × 1136 px | Permissão e/ou arquivo original pendentes |
| Publicações | Adriana Lima: valorização docente e comunidade escolar | D · sem imagem | [Deg3cAkqN9m](https://www.instagram.com/elo.ufrb.oficial/reel/Deg3cAkqN9m/) · 640 × 1136 px | Permissão e/ou arquivo original pendentes |
| Publicações | Rita Maluf e o cuidado com crianças e adolescentes | D · sem imagem | [DeXzrXoKM_Z](https://www.instagram.com/reel/DeXzrXoKM_Z/) · 640 × 1138 px | Permissão e/ou arquivo original pendentes |
| Publicações | André Luís Rocha Santos e a memória musical de São Félix | D · sem imagem | [DeVJ8pcKGfh](https://www.instagram.com/reel/DeVJ8pcKGfh/) · 360 × 640 px | Permissão e/ou arquivo original pendentes |
| Publicações | Hugo de Ogum: ancestralidade e tradições afro-brasileiras | D · sem imagem | [DeaO8nHqsyg](https://www.instagram.com/elo.ufrb.oficial/reel/DeaO8nHqsyg/) · 360 × 640 px | Permissão e/ou arquivo original pendentes |
| Publicações | Didi da Saúde e os direitos das comunidades do campo | D · sem imagem | [DeReGovqNC3](https://www.instagram.com/elo.ufrb.oficial/reel/DeReGovqNC3/) · 361 × 640 px | Permissão e/ou arquivo original pendentes |
| Publicações | Balanço público da campanha: universidade e território | D · sem imagem | [Dd82iNXIO96](https://www.instagram.com/elo.ufrb.oficial/p/Dd82iNXIO96/) · 640 × 640 px | Permissão e/ou arquivo original pendentes |
| Publicações | Saúde mental na rádio: entrevista com universidade e comunidade | D · sem imagem | [DdWdA_WoIPH](https://www.instagram.com/p/DdWdA_WoIPH/) · 480 × 640 px | Permissão e/ou arquivo original pendentes |
| Publicações | A escola como laboratório: fundamentos da pesquisa em educação | D · sem imagem | [DZV5nLQgC29](https://www.instagram.com/p/DZV5nLQgC29/) · 828 × 819 px | Permissão e/ou arquivo original pendentes |
| Voz pública | (In) Existência, Cultura, Suicídio | D · sem imagem | [Fonte](https://holiste.com.br/in-existencia-cultura-suicidio-video/) | Permissão e/ou arquivo original pendentes |
| Voz pública | Conexão Sociedade · vídeo indicado pelo projeto | D · sem imagem | [Fonte](https://www.youtube.com/live/N1BZwAJ1t8o) | Permissão e/ou arquivo original pendentes |
| Voz pública | Violência e segurança pública em Salvador | D · sem imagem | [Fonte](https://globoplay.globo.com/v/4750195/) | Permissão e/ou arquivo original pendentes |
| Voz pública | Universidade pública e interiorização · ALBA Entrevista | D · sem imagem | [DH1XwaBJlai](https://www.instagram.com/reel/DH1XwaBJlai/) · 640 × 1136 px | Permissão e/ou arquivo original pendentes |
| Voz pública | Crime organizado, território e desigualdades | D · sem imagem | [Fonte](https://jornalmassa.com.br/policia/agindo-como-empresas-faccoes-levam-traficantes-da-bahia-para-o-rio-1325301) | Permissão e/ou arquivo original pendentes |

O retrato principal é B: `assets/img/idealizador/antonio-mateus.webp`, 320 × 318 px. Os quatro registros profissionais da trajetória estavam e continuam sem imagem publicada; candidatos do ALAS e do X JUBRA estão identificados abaixo. Os quatro trabalhos acadêmicos permanecem em apresentação bibliográfica: não foram inventadas capas para dissertação, tese ou artigo. A capa do documento institucional é um arquivo já fornecido e possui origem identificada.

## Imagens efetivamente associadas nesta rodada

| Conteúdo | Fonte da imagem | Arquivo local | Página atualizada |
| --- | --- | --- | --- |
| Saúde Mental e Psicoeducação na TV UFRB | [Portal UFRB](https://ufrb.edu.br/portal1/component/chronoforms5/?chronoform=ver-evento&id=1736) · arte institucional já utilizada na ação | assets/img/acoes/saude-mental-psicoeducacao-2022.webp; .avif | /publicacoes/ |
| Projeto ELO.UFRB 2025–2027 | esboço/Projeto Elo UFRB 2025- 2027.pdf · documento fornecido pelo projeto | assets/img/documentos/projeto-2025-2027.webp; .avif | /publicacoes/ |

- Arte de 2022: original local 1080 × 1080; versão WebP/AVIF 1000 × 1000 px. Origem e uso já registrados no projeto; não é imagem obtida agora do Instagram.
- Capa do documento: WebP/AVIF 495 × 700 px; sem recorte do conteúdo.
- Novos arquivos de imagem em assets/img: **0**.
- Fotografias antigas substituídas: **0**.
- Retrato anterior e retrato atualmente publicado: o mesmo arquivo 320 × 318 px.

## Retrato: avaliação das candidatas

| Publicação exata | Resolução recuperada | Avaliação e condição |
| --- | --- | --- |
| [Dbtv4oVFtmX · @ams.2020](https://www.instagram.com/p/Dbtv4oVFtmX/) | 828 × 1089 | Expressão natural e luz frontal; registro pessoal noturno no Brewteco Botafogo. Corpo inteiro, rosto pequeno: não satisfaz por si só a exigência de retrato profissional em alta definição. Solicitar original e autorização/crédito. |
| [DbMPAfAFgrR · @ams.2020](https://www.instagram.com/p/DbMPAfAFgrR/) | 828 × 1079 | Retrato sentado no Notiê, ambiente alaranjado de restaurante. Melhor definição de arquivo que a imagem atual, mas contexto pessoal e luz colorida. Solicitar original e autorização/crédito; não selecionado automaticamente como profissional. |
| [DcCLQXRFqk7 · @ams.2020](https://www.instagram.com/p/DcCLQXRFqk7/) | 3024 × 3585 | Alta resolução, mas registro de lazer em Copacabana, com óculos e bermuda. Inadequado como retrato principal do portal. |
| [DbZQBsDlmIc · @ams.2020](https://www.instagram.com/p/DbZQBsDlmIc/) | 828 × 828 | Corpo inteiro e óculos escuros, contexto pessoal. Não selecionado. |
| [DbeSbxkEd6g · @ams.dialogos](https://www.instagram.com/p/DbeSbxkEd6g/) | 828 × 828 | Fotografia coletiva do ALAS; pertinente à trajetória, não substitui retrato individual de qualidade. Reprodução pendente. |
| [DcT2X79RBor · @ams.dialogos](https://www.instagram.com/p/DcT2X79RBor/) | 587 × 527 | Registro de coordenação do X JUBRA. Pertinente à trajetória, resolução limitada. Reprodução pendente. |

As candidatas `DbeXlhRFsPx` e `Dbjhh7illDs` foram descartadas na rodada anterior por rótulo público de IA. Não foram reutilizadas. A página institucional de docentes de Ciências Sociais foi conferida: contém a identificação do professor, sem retrato disponível. A notícia do Massa identifica uma foto de arquivo pessoal, mas a recuperação direta foi recusada com HTTP 403; não se contornou esse acesso nem se presumiu uma licença jornalística.

**Falta para o retrato:** arquivo original de um retrato de busto profissional, com autorização e crédito; alternativamente, autorização e original das candidatas identificadas, desde que o responsável aceite suas limitações. A referência continua centralizada em content/idealizador.json. Home e biografia usam o mesmo renderizador picture, que suporta AVIF e as dimensões reais, pronto para a troca consistente quando houver um arquivo adequado.

## Materiais prioritários para autorização/original

| Conteúdo | Fonte exata | Material recuperado | O que falta |
| --- | --- | --- | --- |
| Pesquisa escolar | [DZBNQElEegq](https://www.instagram.com/p/DZBNQElEegq/) | Duas montagens fotográficas oficiais, 1254 × 1254 px | Autorização e crédito; preferir fotografia anterior à montagem se disponível |
| Encerramento da campanha | [Ddrwv2fq7dJ](https://www.instagram.com/p/Ddrwv2fq7dJ/) | Peça de divulgação, 1254 × 1254 px | Autorização para reutilizar a peça; não é fotografia da execução |
| Módulo do curso de junho | [DZV5nLQgC29](https://www.instagram.com/p/DZV5nLQgC29/) | Cartaz, 828 × 819 px | Autorização do titular/coautores. Não representa o módulo de setembro |
| Portinari | [DUBEE64DfkL](https://www.instagram.com/p/DUBEE64DfkL/) | Preview de vídeo 361 × 640 px com indicador de reprodução | Arquivo da capa/fotografia sem elemento de interface e autorização |
| Santiago do Iguape | [Ddo-RZ-Oljn](https://www.instagram.com/p/Ddo-RZ-Oljn/) | Preview de vídeo 361 × 640 px com indicador de reprodução | Cartaz original ou capa limpa e autorização; não é fotografia de execução |
| Mesa sobre assédio moral | [DdToCjVxn7X](https://www.instagram.com/reel/DdToCjVxn7X/) | Capa do convite de Linda Pereira, 640 × 1138 px | Autorização. Para representar a mesa por cartaz, fornecer a arte original da programação, distinta do vídeo-convite |
| Entrevista UFRB FM | [DdWdA_WoIPH](https://www.instagram.com/p/DdWdA_WoIPH/) | Preview 480 × 640 px | Fotografia/capa limpa da rádio e autorização; recomendações de outubro foram descartadas |
| Curso de setembro | Permalink exato não encontrado | Nenhuma imagem específica confirmada | Arte de 22/09 com Taiane Almeida e link exato; não usar cartaz de junho como se fosse o mesmo módulo |
| CAHLCULTURANDO | [DdoSlCFx54f](https://www.instagram.com/p/DdoSlCFx54f/) | Sem metadados/imagem pública recuperável | Arte original e legenda; não inferir a imagem por recomendações |

As demais publicações da campanha estão discriminadas no inventário acima. Vários previews de reels contêm indicador de reprodução incorporado: não foram publicados como fotografias limpas. Nenhuma captura de tela da interface do Instagram foi colocada nas áreas editoriais.

## Implementação

- scripts/build.mjs: ordem única do menu/rodapé, item PARCEIRA ativo, suporte a imagens na Agenda e apresentação textual discreta onde não há imagem autorizada.
- scripts/editorial.mjs: retrato renderizado pela mesma função picture na home e biografia; imagens opcionais de mídia; referências sem imagem deixam de simular telas de TV/capas fotográficas.
- content/publications.json e content/site.json: associação da arte de 2022 e da capa do documento existentes.
- assets/css/style.css: proporções naturais das imagens, legendas, composição sem imagem, menu sem JavaScript e prevenção de encolhimento dos oito itens.
- scripts/check.mjs: teste da ordem e rótulos exatos no menu e rodapé de todas as rotas; item ativo de /parceira/.

Sem novo framework, sem dependência de produção, sem imagem sintética e sem deploy remoto. Os HTMLs foram regenerados a partir das fontes.

## Verificação

- `npm run build`: 17 páginas, além de 404 e arquivos de descoberta.
- `npm run check`: aprovado, 584 referências locais; ordem exata verificada em todas as páginas.
- `git diff --check`: aprovado.
- Chromium: 40 combinações de oito rotas e cinco larguras (375, 768, 1024, 1366 e 1440 px), sem imagens quebradas ou erros de JavaScript; teclado, Escape e menu mobile verificados.
- Navegação sem JavaScript conferida em 375, 768, 1024 e 1440 px, incluindo acesso a /parceira/. Corrigidos rótulos que herdavam transformações do menu animado e uma largura mínima do bloco inicial.
- Não houve teste de melhoria de retrato: o arquivo continua o mesmo. Não se declara que a Agenda ou os cinco registros novos passaram a ter fotografias.

Capturas finais da interface (não são novas fotografias de atividades):

- [Menu mobile](capturas-imagens-menu-2026/menu-mobile.png).
- [Início desktop](capturas-imagens-menu-2026/inicio-1440.png).
- [Início mobile](capturas-imagens-menu-2026/inicio-375.png).
- [Publicações desktop](capturas-imagens-menu-2026/publicacoes-1440.png).
- [Publicações mobile](capturas-imagens-menu-2026/publicacoes-375.png).
