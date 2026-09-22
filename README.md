# ELO.UFRB

Portal institucional do ELO.UFRB, em HTML, CSS e JavaScript. Sem frameworks, bibliotecas de runtime, rastreadores, cookies ou serviços de backend. Os arquivos originais em `esboço/` estão preservados.

## Abrir localmente

Com Node.js 18 ou superior, não é necessário instalar dependências:

```sh
npm start
```

Abra http://localhost:4173. Para outra porta: `PORT=8080 npm start`.

O site também funciona em qualquer servidor de arquivos estáticos, como `python3 -m http.server 4173`. Use HTTP em vez de abrir por `file://`, pois a navegação usa caminhos a partir da raiz.

## Organização e manutenção

```text
index.html                 Home pronta para servir
sobre/index.html           Página institucional
acoes/index.html           Formas de atuação e arquivo
acoes/setembro-amarelo-2026/  Página da 9ª Campanha Setembro Amarelo
acoes/reenconcavo-2023/    Página de uma ação documentada
acoes/saude-mental-psicoeducacao-2022/  Webconferência documentada
publicacoes/index.html     Publicações, documentos e canais
agenda/index.html          Agenda
contato/index.html         Contato e canais oficiais
conteudos/index.html       Rota complementar preservada
404.html                   Página de endereço não encontrado
assets/css/style.css       Identidade e responsividade
assets/js/main.js          Menu, busca e transição entre páginas
assets/fonts/              Fontes locais e licenças OFL
assets/img/                Marca e fotografias locais otimizadas
content/site.json          Configuração, canais e publicação institucional
content/actions.json       Ações confirmadas
content/events.json        Agenda confirmada
content/people.json        Pessoas (vazio até existir lista oficial)
content/sources.json       Proveniência e pendências editoriais
scripts/build.mjs          Templates e geração das páginas
scripts/serve.mjs          Servidor local de pré-visualização
scripts/check.mjs          Verificação de integridade
docs/                      Decisões editoriais e verificação
esboço/                    Materiais originais, sem alterações
```

Os HTMLs estão incluídos e funcionam sem build no servidor. Para modificar textos fixos ou componentes compartilhados, edite `scripts/build.mjs`; para atualizar conteúdo, edite os arquivos em `content/`. Depois execute:

```sh
npm run build
npm run check
```

Não edite apenas os HTMLs gerados: eles serão substituídos pelo próximo build. O gerador usa somente módulos nativos do Node e mantém todo conteúdo e navegação disponíveis sem JavaScript no navegador.

A transição em faixas está preservada, mas temporariamente desativada. Para reativá-la, altere `PAGE_TRANSITIONS_ENABLED` para `true` no início de `assets/js/main.js`.

## Cadastrar conteúdo real

Publicações, ações e eventos são listas independentes. Não adicionar itens fictícios. Cada ação ou evento publicado deve ter `sourceId` correspondente em `content/sources.json`. URLs podem apontar para documento, canal oficial ou página de detalhe real.

Publicações também aceitam `period` e `format`. Ações, eventos e conteúdos aceitam `date` no formato ISO (`AAAA-MM-DD`) quando confirmada. A data é exibida em português, sem deslocamento de fuso. Os filtros são construídos a partir dos tipos cadastrados; as listas vazias recebem mensagens próprias. A busca ignora acentos, aceita múltiplas palavras e mantém os critérios na URL.

Novos layouts de detalhes podem reutilizar `page()` no gerador. Esta versão não tem painel administrativo, autenticação nem CMS; a manutenção ocorre nos arquivos, como previsto para a solução estática.

## Fotografias e pendências editoriais

As fotografias atuais foram publicadas pelo perfil oficial `@elo.ufrb.oficial`, recebidas pela visualização pública, salvas localmente e convertidas para WebP e AVIF. As artes do Reencôncavo 2023 e da webconferência Saúde Mental e Psicoeducação vieram de páginas oficiais da UFRB. O HTML não depende de URLs temporárias. Os arquivos obtidos publicamente também foram preservados ao lado das versões otimizadas.

O Instagram não disponibilizou, sem autenticação, as legendas completas e os permalinks dos posts. Solicite ao responsável pelo ELO:

- arquivos fotográficos originais em alta resolução;
- permalinks e legendas completas das publicações recentes;
- autorização e lista oficial de equipe e funções;
- confirmação de datas, participantes e locais das ações de 2026 ainda não documentadas fora da rede social.

Essas pendências estão registradas em `content/sources.json`. Nenhuma pessoa vista em fotografia foi cadastrada como integrante do projeto.

## Publicação e SEO

O domínio oficial não foi fornecido. `origin` fica vazio para evitar canonical e URLs estruturadas fictícias. Quando o domínio estiver definido, preencha esse campo com a origem HTTPS real, sem caminho. Execute o build para gerar canonical, `og:url`, `og:image` absoluto e sitemap. Title, descrição, demais metadados Open Graph, favicon e JSON-LD institucional já estão presentes.

Sirva o portal na raiz do domínio. No host estático, configure `404.html` como página de erro com status 404. Publique os HTMLs, `assets/`, o PDF em `esboço/`, `robots.txt` e o sitemap quando gerado. Não é necessário publicar `scripts/`, `content/`, `docs/` ou `package.json`. O servidor local é somente para desenvolvimento, vinculado a `127.0.0.1`.

## Conteúdo e validação

Veja [decisões editoriais](docs/decisoes-editoriais.md) para a proveniência do conteúdo, os limites do documento e os canais transcritos da capa. Veja [verificação](docs/verificacao.md) para os testes da versão.

Foram preparados foco visível, link de salto, navegação por teclado, menu com Escape, HTML semântico, alternativas para imagens, fontes locais e respeito a `prefers-reduced-motion`. A navegação e os textos permanecem disponíveis sem JavaScript.
# ELO.UFRB
