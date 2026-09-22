# Base editorial e identidade

## Fontes analisadas antes da implementação

- `esboço/Projeto Elo UFRB 2025- 2027.pdf`: leitura integral das 18 páginas físicas, incluindo prelúdio em português e inglês, objetivos, fundamentação, metodologia, considerações e bibliografia. Capa analisada visualmente: os canais estão incorporados em imagem e não aparecem na extração de texto.
- `esboço/WhatsApp Image 2026-09-20 at 19.25.50.jpeg`: logomarca original, 282 × 298 pixels. Preservada e reproduzida sem alteração no rodapé. A assinatura tipográfica do cabeçalho e o favicon são adaptações vetoriais simples da geometria para legibilidade em tamanhos pequenos; não substituem o original.
- NEV/USP: https://nev.prp.usp.br/, https://nev.prp.usp.br/sobre/institucional/, https://nev.prp.usp.br/publicacoes/, https://nev.prp.usp.br/noticias/eventos-realizados/ e a página do projeto Building Democracy Daily. Referência para separação entre institucional, pesquisa/projetos, acervo e eventos, organização por tipo e acesso ao documento. Não foram copiados textos, imagens, números ou identidade visual do NEV.

## Mapa de conteúdo e proveniência

As páginas abaixo se referem à ordem física no PDF, incluindo a capa, não à paginação anunciada no sumário.

| Informação publicada                                                                   | Fonte                                |
| -------------------------------------------------------------------------------------- | ------------------------------------ |
| Sete canais oficiais e respectivos identificadores                                     | Capa, página 1                       |
| Nome, criação em 2022, renovação dezembro de 2025 a dezembro de 2027, 400h             | Página 2; criação também no prelúdio |
| Universidade em rede; relação entre digital e presencial; cores                        | Prelúdio, páginas 3–4                |
| História e evolução dos canais; Instagram inicial                                      | Introdução, páginas 7–9              |
| Objetivo geral e nove objetivos específicos                                            | Páginas 9–10                         |
| Cibercultura, virtualidade, redes, comunidades e inteligência coletiva                 | Fundamentação, páginas 10–14         |
| Vínculo à Licenciatura em Ciências Sociais do CAHL/UFRB; sete temas; formatos de ações | Metodologia, páginas 14–15           |
| Citação sobre pessoas, vínculos e ação coletiva                                        | Considerações, página 16             |
| Bibliografia integral disponível no documento                                          | Páginas 17–18                        |

## Limites editoriais

O sumário menciona cronograma e anexos, mas o arquivo fornecido não inclui um calendário de atividades com datas, locais e inscrições. Não se inferiram eventos a partir da vigência do projeto. A carga de 400h é do projeto, não de uma atividade ou certificado.

Não há equipe nominal, responsáveis identificados, parceiros formalizados ou acervo de notícias/publicações individuais a cadastrar. As listas de ações, eventos e conteúdos começam vazias. O PDF oficial é a única publicação cadastrada. Os destaques da home são caminhos institucionais, com categorias explícitas; não simulam notícias recentes. Formatos de ações são apresentados como previstos na metodologia.

As frases de navegação e os títulos editoriais sintetizam ideias do documento, sem adicionar fatos. As descrições das áreas temáticas e dos objetivos foram adaptadas para leitura na web. Não há fotografias de banco, imagens de supostos participantes, depoimentos ou métricas.

## Canais da capa

- E-mail: canal.eloufrb@gmail.com
- YouTube: www.youtube.com/@ELOUFRB
- WhatsApp: +55 75 98245-4138
- Instagram: @elo.ufrb.oficial
- X (Twitter): @eloufrb
- TikTok: tiktok.com/@elo.ufrb
- Threads: @elo.ufrb.oficial

URLs dos perfis foram construídas a partir dos identificadores oficiais impressos, sem inventar novos perfis. O WhatsApp usa o formato `wa.me` com o telefone impresso. Links não implicam disponibilidade atual de cada serviço externo.

## Sistema visual

Base off-white `#f7f5ee`, grafite `#282a27`, vermelho institucional escurecido `#bd1428` para contraste, laranja `#ed7825` e azul `#49afd2` em superfícies e detalhes. Public Sans estrutura interface, títulos e leitura. Merriweather aparece somente em citações e peças editoriais pontuais. As fontes são servidas localmente sob licença OFL, sem requisições externas em produção.

O motivo circular representa os três campos em relação. Linhas finas, módulos abertos, grandes títulos e variações de proporção organizam o ritmo. O diagrama tem alternativa textual; ornamentos são ocultados de leitores de tela. Não há reprodução de um template SaaS, fotografias fictícias, gradientes ou animação contínua.

## Arquitetura

- `/`: apresentação e caminhos para o portal.
- `/sobre/`: história, proposta, objetivos, metodologia, fundamentos e ficha do projeto.
- `/acoes/`: formas de atuação e arquivo de ações.
- `/publicacoes/`: materiais consultáveis, com busca por texto e filtro por tipo.
- `/agenda/`: programação a preencher apenas com atividades confirmadas.
- `/conteudos/`: acervo digital e acesso aos canais.

“O ELO” e “Sobre” foram unificados para evitar duas páginas com a mesma finalidade. A proposta de 2025 a 2027 tem seção própria em `/sobre/#renovacao`.
