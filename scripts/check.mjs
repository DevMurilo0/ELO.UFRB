import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import assert from "node:assert/strict";

const root = fileURLToPath(new URL("../", import.meta.url));
const routes = [
  "/",
  "/sobre/",
  "/acoes/",
  "/publicacoes/",
  "/agenda/",
  "/contato/",
  "/conteudos/",
  "/acoes/setembro-amarelo-2026/",
  "/acoes/reenconcavo-2023/",
  "/acoes/saude-mental-psicoeducacao-2022/",
];
const pages = new Map();
for (const route of routes)
  pages.set(route, await readFile(join(root, route, "index.html"), "utf8"));
let links = 0;
for (const [route, html] of pages) {
  assert.match(html, /<html lang="pt-BR">/, route + ": idioma");
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    route + ": apenas um h1",
  );
  assert.match(html, /class="page-transition"/, route + ": código da transição preservado");
  assert.match(
    html,
    /<meta name="description" content="[^"]+"/,
    route + ": descrição",
  );
  assert.match(html, /aria-current="page"/, route + ": navegação ativa");
  assert.doesNotMatch(
    html,
    /Inscrição e acesso devem ser confirmados|Informações no canal oficial|Ver no canal oficial/,
    route + ": sem chamadas genéricas",
  );
  assert.doesNotMatch(
    html,
    /\b(?:a|da|na|pela|à)\s+ELO(?:\.UFRB)?\b/i,
    route + ": referência direta ao ELO no masculino",
  );
  assert.match(
    html,
    /href="https:\/\/murilogabriel\.com\.br" target="_blank" rel="noopener noreferrer"/,
    route + ": crédito do desenvolvedor seguro",
  );
  assert.equal(
    (html.match(/class="transition-stripes"/g) || []).length,
    1,
    route + ": camada de transição única",
  );
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, route + ": IDs únicos");
  const json = html.match(
    /<script type="application\/ld\+json">(.*?)<\/script>/s,
  )[1];
  assert.equal(JSON.parse(json).name, "ELO.UFRB");
  for (const [, attr, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (!value.startsWith("/") && !value.startsWith("#")) continue;
    const [path, fragment] = decodeURI(value).split("#");
    const targetRoute = path || route;
    if (fragment) {
      const target = pages.get(targetRoute);
      assert.ok(
        target?.includes(`id="${fragment}"`),
        `${route}: âncora ${value}`,
      );
    }
    if (path)
      await access(join(root, path, path.endsWith("/") ? "index.html" : ""));
    links++;
  }
}
assert.match(
  pages.get("/acoes/"),
  /<h2 id="action-feature-title">Destaques de 2026<\/h2>/,
  "Destaques de 2026 é título de seção",
);
assert.match(
  pages.get("/"),
  /<h2 id="movement-title">O ELO em atividade<\/h2>/,
  "O ELO em atividade é título de seção",
);
assert.match(
  pages.get("/acoes/"),
  /href="\/acoes\/setembro-amarelo-2026\/">Conheça a atividade/,
  "Destaque da campanha aponta para a página interna",
);
assert.match(
  pages.get("/acoes/setembro-amarelo-2026/"),
  /href="https:\/\/www\.instagram\.com\/p\/Db_rIESqtqY\//,
  "Página da campanha aponta para o post específico",
);
assert.equal(
  (pages.get("/acoes/setembro-amarelo-2026/").match(/<h1[ >]/g) || []).length,
  1,
  "Campanha possui um único h1",
);
assert.match(
  pages.get("/contato/"),
  /href="\/contato\/" aria-current="page">Contato<\/a>/,
  "Contato é página interna ativa",
);
assert.match(
  await readFile(join(root, "assets/js/main.js"), "utf8"),
  /const PAGE_TRANSITIONS_ENABLED = false;/,
  "Transição temporariamente desativada",
);
const config = JSON.parse(
  await readFile(join(root, "content/site.json"), "utf8"),
);
assert.equal(config.channels.length, 7, "Sete canais transcritos da capa");
assert.equal(config.contents.length, 0, "Nenhum conteúdo inventado");
assert.equal(config.publications.length, 1, "Apenas o documento fornecido");
const actions = JSON.parse(
  await readFile(join(root, "content/actions.json"), "utf8"),
);
const events = JSON.parse(
  await readFile(join(root, "content/events.json"), "utf8"),
);
const sources = JSON.parse(
  await readFile(join(root, "content/sources.json"), "utf8"),
);
const editorialSource = [
  await readFile(join(root, "scripts/build.mjs"), "utf8"),
  JSON.stringify(config),
  JSON.stringify(actions),
  JSON.stringify(events),
].join("\n");
assert.doesNotMatch(
  editorialSource,
  /\b(?:a|da|na|pela|à)\s+ELO(?:\.UFRB)?\b/i,
  "Conteúdo editorial usa O ELO.UFRB",
);
assert.ok(actions.length > 0, "Ações verificadas disponíveis");
assert.ok(events.length > 0, "Agenda verificada disponível");
const sourceIds = new Set(sources.map((source) => source.id));
for (const item of [...actions, ...events])
  assert.ok(sourceIds.has(item.sourceId), `Fonte registrada: ${item.sourceId}`);
for (const event of events)
  assert.ok(
    event.url || event.sourceStatus === "pending_exact_post_url",
    `Evento possui URL específica ou pendência explícita: ${event.slug}`,
  );
for (const action of actions)
  assert.ok(
    action.url || action.sourceStatus === "pending_exact_post_url",
    `Ação possui URL específica ou pendência explícita: ${action.slug}`,
  );
assert.match(
  pages.get("/"),
  /class="agenda-label"[\s\S]*?<svg[^>]+aria-hidden="true"/,
  "Agenda da home possui ícone SVG",
);
assert.match(
  pages.get("/"),
  /class="context-heading">Campanha · 2026<\/p>/,
  "Campanha de 2026 possui cabeçalho contextual",
);
assert.match(
  pages.get("/"),
  /class="section-kicker">Publicações<\/p>/,
  "Publicações possui cabeçalho contextual",
);
console.log(
  `OK: ${pages.size} páginas; ${links} referências locais; headings, metadados, âncoras, JSON-LD e integridade editorial.`,
);
