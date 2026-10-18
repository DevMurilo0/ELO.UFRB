# Verificação do portal

## Revisão editorial de 18 de outubro de 2026

Executados `npm run build` e `npm run check`: **13 páginas e 410 referências locais**, sem falhas. O check inclui links e âncoras, fontes locais AVIF/WebP, dimensões e alternativas de imagens, idioma, h1 único, metadados, JSON-LD, fontes editoriais e presença das publicações nos HTMLs finais.

A regra temporal tem testes de lista vazia, ordenação, hoje, eventos passados, intervalo com `endDate`, cancelamento, ano bissexto, data inválida e virada do dia no fuso `America/Bahia`. Um build completo em diretório temporário, com `events.json` vazio, confirma o estado editorial e a ausência de `undefined`/`Invalid Date`. Também passaram build e check com referência histórica `2026-09-20`, restaurando depois o build normal de 18/10.

| Verificação no Chromium headless | Resultado |
| --- | --- |
| 13 rotas × 375, 768, 1024, 1366 e 1440 px | 65 combinações, HTTP 200, sem overflow horizontal, sem imagem quebrada e com um h1 por página |
| Console e recursos locais | Nenhum erro de JavaScript ou resposta HTTP de erro |
| Teclado | Link de salto primeiro no Tab; menu abre, permite Tab aos links e fecha com Escape, devolvendo foco |
| JavaScript desativado, 375 px | Menu e navegação visíveis; mudança para Ações funciona por HTML; estado vazio da agenda legível |
| Busca sem acentos e termo inexistente | Resultados pertinentes, estado vazio, limpeza e foco no campo |
| Filtro por tipo e recarga | Resultado correto e critério mantido na URL |
| Transição multipágina com movimento habilitado | Destino correto; classes de chegada removidas após a transição |
| Passagem de data em build envelhecido | Evento vencido vai ao histórico; segundo evento assume a home; vencidos todos, aparece estado vazio |
| Ausência de próximos eventos em 18/10 | Home e agenda sem os anúncios de 22 e 30/09 como próximos |
| axe-core 4.10.3, WCAG 2/2.1 A/AA e boas práticas | 26 avaliações finais sem violações detectadas |

Na primeira execução do axe, anos do arquivo e índices decorativos tinham contraste insuficiente. As cores foram corrigidas e as quatro avaliações afetadas refeitas sem violações; as outras 22 já haviam passado. Ausência de violações automatizadas não substitui revisão humana com leitor de tela. O ambiente foi Chromium em Linux, não dispositivos físicos ou uma matriz de navegadores diferentes.

Inspeção visual da home publicada antes da edição em desktop/mobile e das páginas finais Início, Agenda, Publicações, Idealizador e campanha em 375/1440 px. As imagens tardias foram carregadas antes das capturas finais. A identidade, os três círculos e as animações existentes foram preservados; não foram introduzidos movimentos decorativos.

A skill Taste foi usada para inspeção, com Node 22 e caminho explícito do Chromium. O lint inicial apontou convenções da identidade, incluindo rótulos, linhas e índices; elas foram preservadas conforme o pedido. O inspetor final, com exceções explícitas para esses elementos e para a quebra de títulos em português, mantém avisos de paleta clara, tamanhos, texto pequeno e ausência de vídeo na home. Sua regra `still-page` pede mais elementos em movimento e não foi seguida: acrescentar animação apenas para satisfazer essa métrica contrariaria o escopo. Não se afirma aprovação integral no Taste. O carregador binário do Impeccable recusou execução por permissão; suas instruções de refinamento, clareza e acessibilidade foram lidas diretamente. Os princípios da skill Emil foram aplicados preservando as transições e `prefers-reduced-motion`.

As ferramentas de navegador, axe e conversão de imagem foram usadas fora das dependências do repositório. Nenhuma dependência de runtime ou framework foi adicionada. Screenshots e relatórios temporários da sessão ficaram em `/tmp/elo-audit/`; decisões e resultados duráveis estão nesta documentação e na auditoria editorial. Os testes estruturais e temporais permanecem em `scripts/check.mjs`.

A checagem das fontes usou conteúdo recuperado, metadados e requisições de disponibilidade separadamente. O Instagram responde 200 mesmo quando uma legenda não está disponível; isso não foi usado como prova de execução. Restrições 429 da TV UFRB e certificado da UFBA estão documentados como limites externos; a pista ENANPUR com 404 não foi publicada como leitura nova.


## Terceira rodada, setembro de 2026

- A página Ações foi reorganizada em destaque, formatos de atuação e arquivo por ano.
- Foram adicionadas páginas completas para o painel Movimentos Sociais e Universidade, de 2023, e para a webconferência Saúde Mental e Psicoeducação, de 2022.
- As artes oficiais do CAHL/UFRB e do Portal UFRB foram preservadas localmente e otimizadas em WebP e AVIF.
- Agenda passou a separar próximas atividades e atividades realizadas.
- Publicações recebeu identificação visual própria para documentos e canais audiovisuais.
- O rodapé ganhou canais oficiais, crédito profissional do desenvolvedor e mantém contraste sobre o vermelho institucional.
- A navegação interna elegível usa uma transição em cinco faixas. Links externos, downloads, PDFs, âncoras, novas abas e cliques modificados não são interceptados.
- A transição é removida com `prefers-reduced-motion`; o site permanece navegável sem JavaScript.
- Revisão visual realizada nas páginas Início, Ações, Agenda, Publicações e nas duas páginas de ação em desktop e mobile.
- `npm run check` valida oito páginas, 189 referências locais, headings, metadados, âncoras, JSON-LD e proveniência das ações e eventos.

## Segunda rodada — setembro de 2026

- Homepage revisada visualmente em 360, 390, 430, 768, 1024 e 1440 px.
- Página inteira da home inspecionada em desktop e mobile; páginas O ELO, Ações e Agenda também revisadas isoladamente.
- Hero centralizado, fotografia real, seção de ação confirmada, agenda, acervo e canais verificados sem cortes visíveis ou sobreposição de conteúdo.
- Duas fotografias do canal oficial foram salvas localmente em original, WebP e AVIF. O conjunto servido pelas páginas soma menos de 101 KB em AVIF/WebP.
- Contraste do rodapé vermelho permanece entre 5.15:1 e 6.32:1, conforme a cor de texto.
- A navegação HTML continua normal sem JavaScript e as animações são desativadas com `prefers-reduced-motion`.
- Na segunda rodada, `npm run check` validava sete páginas e 159 referências locais.
- Não foi repetida nesta rodada a automação com axe-core descrita abaixo; a revisão atual incluiu semântica, textos alternativos, foco existente, contraste e redução de movimento, mas ainda recomenda nova auditoria automatizada antes do deploy.

## Conteúdo

- Leitura integral das 18 páginas do PDF e inspeção visual da capa e da logomarca.
- Sete canais transcritos da capa. O telefone e o e-mail foram conferidos visualmente.
- Nenhuma notícia, evento datado, pessoa, parceria ou métrica foi acrescentada.
- PDF original disponível em Publicações. Formatos de atuação identificados como previstos, sem alegar realização de atividades específicas.
- Os materiais originais em `esboço/` não foram editados nem removidos.

## Testes funcionais e responsivos

Executados no Chromium headless via Playwright, em ambiente de teste externo ao projeto (sem dependências de navegador em produção).

| Checagem | Resultado |
| --- | --- |
| 6 páginas × larguras 360, 390, 768, 1024, 1440 e 1920 px | 36 combinações verificadas, sem overflow horizontal ou textos ultrapassando a viewport |
| Respostas HTTP das seis páginas | 200 |
| Link “Pular para o conteúdo” | Primeiro elemento no percurso de Tab |
| Menu móvel | Abre, revela links, recebe Tab e fecha com Escape, devolvendo foco ao botão |
| Navegação pelo menu móvel | Destino correto e menu fechado após navegação |
| Busca por termo inexistente | Estado sem resultados e lista oculta |
| Limpar busca | Restaura a publicação e retorna foco ao campo |
| Busca sem acentos | “renovacao” encontra o documento com “renovação” |
| Persistência de busca | URL preserva o termo após recarregar |
| Filtro por tipo | Mantém o documento correspondente |
| Download do PDF | Download concluído, nome terminado em `.pdf` |
| `prefers-reduced-motion` | Rolagem sem animação; regra CSS desativa animações e transições |
| JavaScript desativado | Navegação e conteúdo institucional continuam disponíveis |
| Endereço inexistente | HTTP 404 e página de orientação |
| Erros de JavaScript e recursos HTTP na navegação testada | Nenhum |

## Acessibilidade

axe-core foi executado nas seis páginas em 390 e 1440 px, com as regras WCAG 2 A/AA, WCAG 2.1 A/AA e boas práticas: **nenhuma violação detectada nas 12 avaliações finais**.

Na revisão foram corrigidos o agrupamento da faixa institucional no landmark do cabeçalho e a sequência de headings no acervo de publicações. Foco, Tab e Escape foram exercitados por teclado automatizado. Isso não substitui uma auditoria manual completa com leitores de tela e diferentes navegadores.

## Integridade estática

`npm run check` valida as seis páginas e 143 referências locais, além de idioma, heading principal único, navegação ativa, IDs únicos, âncoras, descrição, JSON-LD e limites editoriais do acervo inicial. Verificação de sintaxe executada nos scripts.

## Revisão visual

Capturas inspecionadas da home em desktop e mobile e das páginas O ELO, Publicações e Agenda. Refinamentos realizados: alinhamento dos rodapés dos destaques; legendas e informações auxiliares ampliadas; conteúdo do círculo Universidade reposicionado para não ficar sob os círculos inferiores no celular.

Pré-visualizações da primeira dobra: [desktop](preview-desktop.png) e [mobile](preview-mobile.png).

## Configuração ainda dependente de publicação

O domínio oficial não foi fornecido. O campo `origin` está vazio em `content/site.json`, sem endereço fictício. O build gera canonical, URLs absolutas Open Graph e sitemap quando esse campo é preenchido. Não houve deploy público. A disponibilidade externa dos perfis sociais não é garantida pelos testes locais; os destinos correspondem aos identificadores do documento.

## Registro dos originais

SHA-256 do PDF:

```text
00c54de09236a1ced786e40487e828ef6625fd8650c93e6a351f3d87c960dd23
```

SHA-256 da imagem:

```text
364ca6e6e2c6f8418a7f31fb2e009782f5abaf85070e0e5700b78dc4f71601aa
```
