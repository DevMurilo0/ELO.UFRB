import { readFile, access, mkdtemp, cp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import assert from "node:assert/strict";
import { calendarDay, partitionEvents, validDay } from "../assets/js/calendar.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const routes = [
  "/",
  "/sobre/",
  "/idealizador/",
  "/acoes/",
  "/publicacoes/",
  "/agenda/",
  "/parceira/",
  "/contato/",
  "/conteudos/",
  "/acoes/setembro-amarelo-2026/",
  "/acoes/reenconcavo-2023/",
  "/acoes/saude-mental-psicoeducacao-2022/",
  "/acoes/pesquisa-escolas-reconcavo-2026/",
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
  /href="\/contato\/" aria-current="page">.*?CONTATO<\/span>/,
  "Contato é página interna ativa",
);
assert.match(
  await readFile(join(root, "assets/js/main.js"), "utf8"),
  /const PAGE_TRANSITIONS_ENABLED = true;/,
  "Transição entre páginas reativada",
);
assert.match(
  pages.get("/idealizador/"),
  /N1BZwAJ1t8o/,
  "Vídeo fornecido pelo projeto está disponível na página Idealizador",
);
const config = JSON.parse(
  await readFile(join(root, "content/site.json"), "utf8"),
);
assert.equal(config.channels.length, 7, "Sete canais transcritos da capa");

assert.ok(config.publications.every(item => item.title && item.url), "Documentos completos");
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
assert.ok(Array.isArray(events), "Agenda aceita lista vazia");
const sourceIds = new Set(sources.map((source) => source.id));
const archive = JSON.parse(await readFile(join(root, "content/publications.json"), "utf8"));
const media = JSON.parse(await readFile(join(root, "content/media.json"), "utf8"));
const founder = JSON.parse(await readFile(join(root, "content/idealizador.json"), "utf8"));
assert.equal(sourceIds.size, sources.length, "IDs de fonte únicos");
for (const item of [...actions, ...events, ...archive, ...media, ...founder.works, ...founder.milestones, ...founder.profiles])
  assert.ok(sourceIds.has(item.sourceId), `Fonte registrada: ${item.sourceId}`);
for (const event of events) {
  assert.ok(validDay(event.date), `Data válida: ${event.slug}`);
  if (event.endDate) assert.ok(validDay(event.endDate) && event.endDate >= event.date);
}
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
// Regras temporais: listas vazias, ordem, dia civil e passagem de data.
assert.deepEqual(partitionEvents([], "2026-10-18"), {upcoming:[],past:[]});
const fixture = [
 {slug:"late",date:"2026-11-03"}, {slug:"old",date:"2026-09-30"},
 {slug:"next",date:"2026-10-19"}, {slug:"today",date:"2026-10-18"},
 {slug:"cancelled",date:"2026-10-20",status:"cancelled"},
 {slug:"invalid",date:"2026-02-30"},
];
assert.deepEqual(partitionEvents(fixture,"2026-10-18").upcoming.map(x=>x.slug),["today","next","late"]);
assert.deepEqual(partitionEvents(fixture,"2026-11-04").upcoming,[]);
assert.deepEqual(partitionEvents(fixture,"2026-10-20").past.map(x=>x.slug),["next","today","old"]);
assert.equal(calendarDay(new Date("2026-10-19T02:59:59Z")),"2026-10-18");
assert.equal(calendarDay(new Date("2026-10-19T03:00:00Z")),"2026-10-19");
assert.throws(() => partitionEvents([],"2026-02-30"));
assert.equal(validDay("2024-02-29"),true);
assert.equal(validDay("2026-02-29"),false);
assert.deepEqual(partitionEvents([{slug:"range",date:"2026-10-17",endDate:"2026-10-20"}],"2026-10-19").past,[]);
const referenceDate = process.env.ELO_BUILD_DATE || calendarDay();
const expected = partitionEvents(events, referenceDate);
const agendaHtml = pages.get("/agenda/");
const futureHtml = agendaHtml.match(/data-agenda-upcoming>([\s\S]*?)<\/div><noscript>/)?.[1] || "";
for (const item of expected.past) assert.ok(!futureHtml.includes(`id="${item.slug}"`), `${item.slug} não aparece como futuro`);
for (const item of expected.upcoming) assert.ok(futureHtml.includes(`id="${item.slug}"`));
assert.match(agendaHtml,/id="historico"/);
if (!expected.upcoming.length) assert.match(pages.get("/"),/Não há novas atividades confirmadas no momento/);
assert.doesNotMatch(pages.get("/publicacoes/"),/O que está circulando agora/);
for (const category of new Set(archive.map(item=>item.category))) assert.ok(pages.get("/publicacoes/").includes(category));
for (const route of routes) {
 const html=pages.get(route);
 assert.match(html,/src="\/assets\/js\/agenda.mjs"/);
 for (const [,source] of html.matchAll(/srcset="([^"]+)"/g)) await access(join(root,source));
 for (const img of html.matchAll(/<img\b[^>]*>/g)) {
  assert.match(img[0],/alt="[^"]*"/);
  assert.match(img[0],/width="\d+"/);
  assert.match(img[0],/height="\d+"/);
 }
}
for (const action of actions) for (const id of action.sourceIds || []) assert.ok(sourceIds.has(id));
for (const action of actions) for (const section of action.sections || []) assert.ok(sourceIds.has(section.sourceId));
// Integração em cópia temporária: nenhuma edição nos dados do usuário.
const fixtureRoot = await mkdtemp(join(tmpdir(), "elo-empty-agenda-"));
try {
  await cp(join(root,"content"),join(fixtureRoot,"content"),{recursive:true});
  await cp(join(root,"scripts"),join(fixtureRoot,"scripts"),{recursive:true});
  await mkdir(join(fixtureRoot,"assets/js"),{recursive:true});
  await cp(join(root,"assets/js/calendar.mjs"),join(fixtureRoot,"assets/js/calendar.mjs"));
  await writeFile(join(fixtureRoot,"content/events.json"),"[]");
  execFileSync(process.execPath,[join(fixtureRoot,"scripts/build.mjs")],{env:{...process.env,ELO_BUILD_DATE:"2026-10-18"},stdio:"pipe"});
  const emptyHome = await readFile(join(fixtureRoot,"index.html"),"utf8");
  const emptyAgenda = await readFile(join(fixtureRoot,"agenda/index.html"),"utf8");
  assert.match(emptyHome,/Não há novas atividades confirmadas no momento/);
  assert.match(emptyAgenda,/data-agenda-upcoming><\/div>/);
  assert.doesNotMatch(emptyHome,/data-home-event/);
  assert.doesNotMatch(emptyHome+emptyAgenda,/undefined|Invalid Date/);
} finally { await rm(fixtureRoot,{recursive:true,force:true}); }
for (const item of archive) assert.ok(pages.get("/publicacoes/").includes(item.title), `Publicação gerada: ${item.id}`);
console.log(
  `OK: ${pages.size} páginas; ${links} referências locais; headings, metadados, âncoras, JSON-LD e integridade editorial.`,
);
