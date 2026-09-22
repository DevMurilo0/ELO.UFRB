# Verificação do portal

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
