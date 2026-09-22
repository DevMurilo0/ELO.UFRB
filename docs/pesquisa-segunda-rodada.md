# Pesquisa e curadoria — segunda rodada

## Fontes do ELO.UFRB

- Projeto ELO.UFRB 2025–2027, em `esboço/`: fonte principal da identidade institucional, objetivos, metodologia e conceito de universidade em rede.
- Perfil oficial do ELO.UFRB: <https://www.instagram.com/elo.ufrb.oficial/>. Perfil, descrição e publicações públicas consultados em 20 e 21 de setembro de 2026.
- Reencôncavo 2023 — CAHL/UFRB: <https://ufrb.edu.br/cahl/eventos/2506-reenconcavo-2023>. Fonte institucional do painel “Movimentos Sociais e Universidade — interação em redes”.
- Saúde Mental e Psicoeducação — Portal UFRB: <https://ufrb.edu.br/portal1/component/chronoforms5/?chronoform=ver-evento&id=1736>. Fonte institucional da webconferência de 29 de setembro de 2022.

O detalhamento estruturado de cada item publicado está em `content/sources.json`.

## Limites da pesquisa pública

O Instagram exibiu o perfil e as peças recentes, mas bloqueou o acesso automatizado a legendas completas e permalinks sem autenticação. Não houve tentativa de contornar essa restrição. As imagens usadas foram entregues pela própria visualização pública e armazenadas localmente, evitando URLs frágeis de CDN.

As pistas “Saúde Mental e Ética no Cotidiano” e “Saúde Mental e Território” não foram publicadas no portal porque a busca aberta não encontrou fonte original com detalhes suficientes. A página Pessoas também não foi criada: convidados, mediadores e pessoas retratadas não foram tratados como equipe permanente.

## Referências de arquitetura e interface

- NEV/USP: separação entre institucional, projetos, publicações e eventos; linguagem acadêmica direta.
- Oxford Internet Institute: apresentação imediata da instituição seguida de notícias recentes.
- Data & Society: home curada, com um destaque editorial e acervo separado.
- Stanford HAI: uso de fotografia em escala e blocos narrativos amplos.
- MIT Media Lab: eventos orientados por data e páginas internas com funções distintas.
- Berkman Klein Center: valorização de pessoas e atividades reais sem transformar tudo em cartões.

A escala menor do ELO levou à navegação reduzida: Início, O ELO, Ações, Agenda, Publicações e Contato. Documentos, vídeos e demais conteúdos ficam agrupados em Publicações; a rota antiga permanece disponível por compatibilidade.

## Transições

A implementação segue a View Transition API para navegação multipágina de mesma origem, com `@view-transition { navigation: auto; }`. A marca participa como elemento compartilhado e a página seguinte entra por um reveal circular curto. Navegadores sem suporte mantêm a navegação HTML normal. `prefers-reduced-motion: reduce` desativa a transição e os demais movimentos.
