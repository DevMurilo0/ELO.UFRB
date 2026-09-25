import { editorialPages } from "./editorial.mjs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const data = JSON.parse(
  await readFile(join(root, "content/site.json"), "utf8"),
);
data.actions = JSON.parse(
  await readFile(join(root, "content/actions.json"), "utf8"),
);
data.events = JSON.parse(
  await readFile(join(root, "content/events.json"), "utf8"),
);
data.idealizador = JSON.parse(await readFile(join(root, "content/idealizador.json"), "utf8"));
data.publicationArchive = JSON.parse(await readFile(join(root, "content/publications.json"), "utf8"));
data.partners = JSON.parse(await readFile(join(root, "content/partners.json"), "utf8"));
data.media = JSON.parse(await readFile(join(root, "content/media.json"), "utf8"));
data.sources = JSON.parse(await readFile(join(root, "content/sources.json"), "utf8"));
const esc = (s = "") =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const arrow = '<span aria-hidden="true">↗</span>';
const next = '<span aria-hidden="true">→</span>';
const pdf = encodeURI(data.document);
const nav = [
  ["/", "Início"],
  ["/sobre/", "O ELO"],
  ["/idealizador/", "Idealizador"],
  ["/acoes/", "Ações"],
  ["/agenda/", "Agendas"],
  ["/publicacoes/", "Publicação"],
  ["/parceira/", "Parceira"],
  ["/contato/", "Contato"],
];
const link = (href, title, cls = "text-link") =>
  `<a class="${cls}" href="${esc(href)}">${title}${next}</a>`;
const tag = (text) => `<p class="eyebrow">${text}</p>`;
const mark =
  '<span class="brand-circles" aria-hidden="true"><i></i><i></i><i></i></span>';
const icons = {
  calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4M16 2v4M3 9h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z"/></svg>',
  file: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h8l4 4v16H6Z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></svg>',
  activity: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h4l2.5-6 5 12 2.5-6h4"/></svg>',
  users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 11a4 4 0 0 0 0-8M22 21v-2a4 4 0 0 0-3-3.7"/></svg>',
  graduation: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m2 10 10-5 10 5-10 5Z"/><path d="M6 12v5c3 2.5 9 2.5 12 0v-5M22 10v6"/></svg>',
  message: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 9h8M8 13h5"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  video: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="14" height="14" rx="2"/><path d="m17 10 4-2v8l-4-2Z"/></svg>',
  external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7M21 3l-9 9"/><path d="M18 13v7H4V6h7"/></svg>',
};
const sectionIcon = (name, tone = "red") =>
  `<span class="section-icon icon-${tone}">${icons[name]}</span>`;
const formatDate = (date) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
const picture = (item, options = {}) =>
  `<picture>${item.imageAvif ? `<source srcset="${esc(item.imageAvif)}" type="image/avif">` : ""}<img src="${esc(item.image)}" alt="${esc(item.alt || "")}" width="${item.imageWidth}" height="${item.imageHeight}"${options.eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture>`;
const channelIcons = {
  Instagram:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.25"/><circle class="icon-fill" cx="17.5" cy="6.7" r="1.15"/></svg>',
  YouTube:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="icon-fill" d="M22 12c0-2.5-.3-4.2-.7-5.1a3 3 0 0 0-2.1-2.1C17.8 4.4 15.4 4.2 12 4.2s-5.8.2-7.2.6a3 3 0 0 0-2.1 2.1C2.3 7.8 2 9.5 2 12s.3 4.2.7 5.1a3 3 0 0 0 2.1 2.1c1.4.4 3.8.6 7.2.6s5.8-.2 7.2-.6a3 3 0 0 0 2.1-2.1c.4-.9.7-2.6.7-5.1Z"/><path class="icon-paper" d="m10 15.6 5.2-3.6L10 8.4v7.2Z"/></svg>',
  WhatsApp:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z"/><path d="M8.1 7.6c.3-.6.5-.6.9-.6h.4c.2 0 .4 0 .5.4l.8 2c.1.3.1.5-.1.7l-.6.8c-.2.2-.2.4-.1.6.5 1 1.3 1.9 2.3 2.5.3.2.5.2.7-.1l.9-1c.2-.3.4-.3.7-.2l2 .9c.3.1.5.2.5.4 0 .2-.1 1.2-.7 1.8-.6.7-1.5 1-2.4 1-1 0-2.7-.6-4.5-2.2-2.2-1.9-3.5-4.3-3.5-5.7 0-.5.1-.9.2-1.3Z"/></svg>',
  "E-mail":
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>',
  "X (Twitter)":
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="icon-fill" d="M4.1 3h4.7l4.2 5.6L17.8 3h2.1l-5.8 7.2L20.7 21H16l-4.7-6.3L6.2 21H4.1l6.1-7.9L4.1 3Zm4 1.7 9.1 14.6h1.4L9.5 4.7H8.1Z"/></svg>',
  TikTok:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="icon-fill" d="M14.2 2h3.4c.3 2.1 1.5 3.5 3.6 4v3.5a9 9 0 0 1-3.6-1.1v7.1a6.6 6.6 0 1 1-5.7-6.6v3.6a3 3 0 1 0 2.3 2.9V2Z"/></svg>',
  Threads:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.1 2.5c-5.5 0-9 3.7-9 9.5 0 5.9 3.5 9.5 9.1 9.5 5 0 8.7-2.8 8.7-7.1 0-2.9-1.5-4.8-4.3-5.6-.5-2.4-2.1-3.8-4.6-3.8-2.2 0-3.7 1-4.6 2.7l2.5 1.2c.5-.9 1.2-1.3 2.2-1.3s1.7.5 2 1.3c-4.7.2-6.8 1.6-6.8 4.3 0 2.2 1.8 3.8 4.4 3.8 2.8 0 4.7-1.7 5-4.4.9.5 1.3 1.2 1.3 2.2 0 2.5-2.3 4.1-5.8 4.1-3.9 0-6.1-2.5-6.1-6.9 0-4.3 2.2-6.9 6-6.9 3 0 5 1.5 5.8 4.3l2.8-.8c-1.1-4-4.1-6.1-8.6-6.1Zm-.2 12c-1 0-1.7-.5-1.7-1.3 0-1.1 1.2-1.7 4.2-1.7-.1 1.9-1 3-2.5 3Z"/></svg>',
};
const externalLink = (href, title, icon = "external", cls = "platform-link") => {
  const symbol = channelIcons[icon] || icons[icon] || icons.external;
  const newTab = /^https?:/i.test(href);
  return `<a class="${cls}" href="${esc(href)}"${newTab ? ' target="_blank" rel="noopener noreferrer"' : ""}${newTab ? ` aria-label="${esc(title)} (abre em nova aba)"` : ""}><span class="platform-link-icon">${symbol}</span><span>${esc(title)}</span>${newTab ? arrow : next}</a>`;
};
const network = (
  className = "",
) => `<div class="network ${className}" role="img" aria-label="Universidade, Comunidade e Território conectados pela troca de saberes em mão dupla">
  <svg class="network-lines" viewBox="0 0 560 470" aria-hidden="true"><circle cx="280" cy="232" r="214"/><path d="M280 117 135 315 425 315Z"/><path d="M280 36V431M57 265H505"/><circle cx="280" cy="36" r="5"/><circle cx="57" cy="265" r="5"/><circle cx="480" cy="157" r="5"/></svg>
  <div class="network-node node-university"><span>01</span><strong>Universidade</strong><small>Ensino, pesquisa e extensão</small></div>
  <div class="network-node node-community"><span>02</span><strong>Comunidade</strong><small>Pessoas e saberes</small></div>
  <div class="network-node node-territory"><span>03</span><strong>Território</strong><small>Experiências e encontros</small></div>
  <span class="network-caption">CONHECIMENTO EM CIRCULAÇÃO</span>
</div>`;

function header(path) {
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header"><div class="institution-bar"><div class="container"><span>Universidade Federal do Recôncavo da Bahia</span><span>Ensino · Pesquisa · Extensão</span></div></div>
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="ELO.UFRB, início">${mark}<span>ELO<span class="brand-dot">.</span>UFRB<small>Universidade em rede</small></span></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="primary-nav"><span>Menu</span><span class="menu-icon" aria-hidden="true"></span></button>
    <nav id="primary-nav" aria-label="Navegação principal">${nav.map(([url, label]) => `<a href="${url}"${path === url || (path.startsWith("/acoes/") && url === "/acoes/") || (path === "/conteudos/" && url === "/publicacoes/") ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav>
  </div></header>`;
}

function channels() {
  return `<section class="channels section" id="canais" aria-labelledby="channels-title"><div class="container"><div class="section-heading"><div>${tag("Continue a conversa")}<h2 id="channels-title">Canais oficiais</h2></div><p>Acompanhe o ELO e fale com o projeto pelos canais verificados.</p></div><div class="channel-grid">${data.channels.map((c) => `<a class="channel" href="${esc(c.url)}"${/^https?:/i.test(c.url) ? ' target="_blank" rel="noopener noreferrer"' : ""}><span class="channel-icon">${channelIcons[c.name] || ""}</span><span class="channel-content"><span class="channel-top"><strong>${esc(c.name)}</strong>${/^https?:/i.test(c.url) ? arrow : next}</span><span class="channel-description">${esc(c.description)}</span><small>${esc(c.label)}</small></span></a>`).join("")}</div></div></section>`;
}

function footer() {
  const footerChannels = data.channels
    .filter((channel) => ["Instagram", "YouTube", "X (Twitter)", "E-mail"].includes(channel.name))
    .map((channel) => `<a href="${esc(channel.url)}"${/^https?:/i.test(channel.url) ? ' target="_blank" rel="noopener noreferrer"' : ""}><span class="footer-social-icon">${channelIcons[channel.name]}</span>${esc(channel.name)}</a>`)
    .join("");
  return `<footer class="site-footer"><div class="container"><div class="footer-main"><div class="footer-brand"><img src="/assets/img/elo-original.jpeg" alt="Logomarca do ELO.UFRB" width="92" height="97" loading="lazy"><div><strong>ELO.UFRB</strong><p>${esc(data.fullName)}.</p></div></div><div><p class="footer-label">Vínculo institucional</p><p>Universidade Federal do Recôncavo da Bahia<br>Licenciatura em Ciências Sociais · CAHL/UFRB</p><a class="footer-contact" href="/contato/">Contato</a></div><div class="footer-nav"><p class="footer-label">Navegação</p><a href="/sobre/">O ELO</a><a href="/idealizador/">Idealizador</a><a href="/acoes/">Ações</a><a href="/agenda/">Agendas</a><a href="/publicacoes/">Publicação</a><a href="/parceira/">Parceira</a><a href="/contato/">Contato</a></div><div class="footer-socials"><p class="footer-label">Canais oficiais</p>${footerChannels}</div></div><div class="footer-bottom"><span>ELO.UFRB, projeto de extensão criado em 2022.</span><a href="#topo">Voltar ao início <span aria-hidden="true">↑</span></a></div><div class="footer-credit"><span>© ELO.UFRB</span><span>Desenvolvido por <a href="https://murilogabriel.com.br" target="_blank" rel="noopener noreferrer">Murilo Gabriel</a></span></div></div></footer>`;
}

function page(path, title, description, body) {
  if (path === "/acoes/saude-mental-psicoeducacao-2022/") {
    body = body.replace(
      `${link("https://ufrb.edu.br/portal1/component/chronoforms5/?chronoform=ver-evento&id=1736", "Consultar a fonte oficial")}${link("/acoes/", "Voltar para ações")}`,
      `<div class="related-links">${externalLink("https://www.youtube.com/watch?v=e6O80rgJcUU", "Assistir na TV UFRB", "YouTube")}${externalLink("https://ufrb.edu.br/portal1/component/chronoforms5/?chronoform=ver-evento&id=1736", "Ver evento no Portal UFRB")}${link("/acoes/", "Voltar para ações")}</div>`,
    );
  }
  const origin = data.origin.replace(/\/$/, "");
  if (origin && !/^https:\/\/[^/]+$/.test(origin))
    throw new Error("origin deve ser uma origem HTTPS, sem caminho.");
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    description: data.description,
    foundingDate: "2022",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Universidade Federal do Recôncavo da Bahia",
    },
    sameAs: data.channels
      .filter((c) => !["E-mail", "WhatsApp"].includes(c.name))
      .map((c) => c.url),
    ...(origin
      ? { url: origin + "/", logo: origin + "/assets/img/elo-original.jpeg" }
      : {}),
  };
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#c80d23"><meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="ELO.UFRB"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}">${origin ? `<link rel="canonical" href="${origin}${path}"><meta property="og:url" content="${origin}${path}"><meta property="og:image" content="${origin}/assets/img/elo-original.jpeg"><meta property="og:image:alt" content="Logomarca do projeto ELO.UFRB">` : "<!-- Configure origin em content/site.json para gerar canonical, og:url e og:image absolutos. -->"}<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"><link rel="preload" href="/assets/fonts/public-sans-regular.woff2" as="font" type="font/woff2" crossorigin><script>try{if(sessionStorage.getItem("elo-transition")==="1")document.documentElement.classList.add("transition-arrival")}catch(e){}</script><link rel="stylesheet" href="/assets/css/style.css"><script src="/assets/js/main.js" defer></script><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script></head>
<body id="topo">${header(path)}<main id="conteudo">${body}</main>${footer()}<div class="page-transition" aria-hidden="true"><div class="transition-stripes"><i></i><i></i><i></i><i></i><i></i></div><div class="transition-signature">${mark}<strong>ELO.UFRB</strong></div></div></body></html>`;
}

const highlights = `<section class="section highlights"><div class="container"><div class="section-heading"><div>${tag("Conheça o ELO")}<h2>Em perspectiva</h2></div><span class="section-note">Ideias que orientam o projeto</span></div><div class="highlight-grid">
  <a class="editorial-card feature-card" href="/sobre/#renovacao"><div class="card-art art-document" aria-hidden="true"><span>ELO.UFRB<br><b>2025 a<br>2027</b></span><i></i><small>PROJETO DE EXTENSÃO</small></div><div class="card-copy">${tag("Institucional · Documento do projeto")}<h3>Um projeto em movimento</h3><p>Conheça a proposta de renovação, os objetivos e os caminhos do ELO.UFRB.</p><span class="card-link">Conheça o projeto ${arrow}</span></div></a>
  <a class="editorial-card" href="/sobre/#universidade-em-rede"><div class="card-art art-network" aria-hidden="true"><i></i><i></i><i></i><span>O conhecimento<br>se faz no encontro.</span></div><div class="card-copy">${tag("Conceito · Universidade em rede")}<h3>Entre o digital e o presencial</h3><p>Uma rede de pessoas, conhecimentos e experiências que atravessa os espaços da Universidade.</p><span class="card-link">Entenda a proposta ${arrow}</span></div></a>
  <a class="editorial-card" href="/acoes/"><div class="card-art art-dialogue" aria-hidden="true"><span>Escuta.<br>Diálogo.<br><em>Participação.</em></span><i></i></div><div class="card-copy">${tag("Extensão · Formas de atuação")}<h3>Muitas formas de criar vínculos</h3><p>Seminários, formações, campanhas e ações territoriais fazem parte da proposta do ELO.</p><span class="card-link">Explore as ações ${arrow}</span></div></a>
</div></div></section>`;

const themes = `<section class="section themes" id="temas"><div class="container themes-grid"><div>${tag("Diálogos que nos atravessam")}<h2>Saberes plurais.<br><em>Questões comuns.</em></h2><p>As Ciências Sociais em diálogo com temas que fazem parte da vida coletiva.</p></div><div class="theme-list">${["Direitos Humanos", "Educação", "Ciência", "Cultura", "Comunicação", "Tecnologia", "Território"].map((t, i) => `<div><span class="theme-index">0${i + 1}</span><span>${t}</span><i aria-hidden="true"></i></div>`).join("")}</div></div></section>`;

function publicationCard(p, i) {
  return `<article class="publication" data-entry data-type="${esc(p.type)}" data-search="${esc(p.title + " " + p.description + " " + p.type)}"><div class="publication-art" aria-hidden="true"><span>ELO.UFRB</span><strong>Universidade<br>em rede.</strong><div class="paper-circles"><i></i><i></i><i></i></div><span>PROJETO<br>2025 a 2027</span></div><div class="publication-copy">${tag(esc(p.type))}<h3><a href="${esc(encodeURI(p.url))}">${esc(p.title)}</a></h3><p>${esc(p.description)}</p><p class="publication-meta">${esc(p.period || "")}</p><a class="text-link" href="${esc(encodeURI(p.url))}"${p.url.endsWith(".pdf") ? " download" : ""}>${p.url.endsWith(".pdf") ? "Baixar documento" : "Acessar publicação"} <span class="file-type">${esc(p.format || "")}</span>${next}</a></div></article>`;
}

const heroImage = {
  image: "/assets/img/elo/elo-atividade-publico.webp",
  imageAvif: "/assets/img/elo/elo-atividade-publico.avif",
  imageWidth: 480,
  imageHeight: 640,
  alt: "Atividade pública do ELO.UFRB com participantes reunidos em espaço universitário",
};
const featuredAction = data.actions[0];
const nextEvent = data.events[0];
const nextEventDate = new Date(nextEvent.date + "T00:00:00Z");
const nextEventDay = String(nextEventDate.getUTCDate()).padStart(2, "0");
const nextEventMonth = new Intl.DateTimeFormat("pt-BR", { month: "short", timeZone: "UTC" }).format(nextEventDate).replace(".", "");
const nextEventYear = nextEventDate.getUTCFullYear();
const featuredActionSource = featuredAction.sourceUrl
  ? externalLink(featuredAction.sourceUrl, "Ver publicação no Instagram", "Instagram")
  : `<div class="featured-source-pending"><span>Fonte</span><strong>${esc(featuredAction.sourceLabel || "Publicação oficial do ELO.UFRB")}</strong></div>`;
let home = `<section class="hero hero-centered"><div class="hero-orbits" aria-hidden="true"><i></i><i></i><i></i></div><div class="container hero-center-copy">${tag("Projeto de extensão da UFRB · Desde 2022")}<h1 class="hero-brand">ELO<span>.</span>UFRB</h1><p class="hero-kicker">Universidade em rede</p><p class="hero-fullname">${esc(data.fullName)}.</p><p class="hero-triad">Universidade <i></i> Comunidade <i></i> Território</p><a class="hero-scroll" href="#em-movimento"><span>Conheça o projeto</span><b aria-hidden="true">↓</b></a></div></section>
<section class="reality-bridge" id="em-movimento" aria-labelledby="movement-title"><div class="container reality-grid"><div class="reality-photo" data-parallax>${picture(heroImage, { eager: true })}<span class="photo-credit">Registro do projeto · Canal oficial do ELO.UFRB</span></div><div class="reality-copy"><h2 id="movement-title">O ELO em atividade</h2><p class="section-statement">Extensão dentro e fora da Universidade.</p><p>Atividades, campanhas e formações aproximam a comunidade acadêmica, a sociedade civil e os territórios.</p>${link("/acoes/", "Conheça as ações")}</div></div></section>
<section class="section featured-action"><div class="container featured-action-grid"><div class="featured-action-photo">${picture(featuredAction)}<span class="image-source">Imagem publicada pelo canal oficial do ELO.UFRB</span></div><div class="featured-action-copy"><p class="context-heading">Campanha · ${esc(featuredAction.year)}</p><p class="place">${esc(featuredAction.location)}</p><h2>${esc(featuredAction.title)}</h2><p>${esc(featuredAction.description)}</p><div class="featured-action-links">${link(featuredAction.url, "Conheça a atividade")}${featuredActionSource}</div></div></div></section>
<section class="section home-about"><div class="container home-about-grid"><div>${tag("O que é o ELO")}<h2>Uma universidade<br><em>em rede.</em></h2><p class="lead">Um projeto de extensão da UFRB criado para aproximar Universidade, Comunidade e Território.</p>${link("/sobre/", "Conheça o projeto")}</div><div class="triad" aria-label="Universidade, Comunidade e Território conectados"><span>Universidade</span><b aria-hidden="true">↕</b><span>Comunidade</span><b aria-hidden="true">↕</b><span>Território</span></div></div></section>
__HOME_FOUNDER__<section class="section home-actions"><div class="container"><div class="section-heading"><div>${tag("Memória do projeto")}<h2>Ações registradas</h2></div>${link("/acoes/", "Ver todas as ações")}</div><div class="editorial-list"><a href="${esc(featuredAction.url)}"><span class="list-date">${featuredAction.year}</span><span><small>${esc(featuredAction.type)} · ${esc(featuredAction.location)}</small><strong>${esc(featuredAction.title)}</strong></span>${next}</a><a href="/acoes/reenconcavo-2023/"><span class="list-date">09<br>MAR<br>2023</span><span><small>Painel · CAHL/UFRB</small><strong>Movimentos Sociais e Universidade: interação em redes</strong></span>${next}</a></div></div></section>
<section class="section home-agenda"><div class="container agenda-strip"><div><div class="agenda-label">${sectionIcon("calendar", "blue")}<span>Agenda</span></div><time datetime="${esc(nextEvent.date)}"><strong>${esc(nextEventDay)}</strong><span>${esc(nextEventMonth)}<br>${esc(nextEventYear)}</span></time></div><div><p class="event-type">${esc(nextEvent.type)} · ${esc(nextEvent.location)}</p><h2>${esc(nextEvent.title)}</h2><p>${nextEvent.time ? esc(nextEvent.time) : "Horário a confirmar"}${nextEvent.speaker ? " · com " + esc(nextEvent.speaker) : ""}</p></div>${link("/agenda/", "Ver detalhes")}</div></section>
<section class="section home-acervo"><div class="container home-acervo-grid"><div><p class="section-kicker">Publicações</p><h2>Documentos e materiais</h2><p>Produções do projeto reunidas para consulta.</p>${link("/publicacoes/", "Ver publicações")}</div><a class="document-feature" href="${pdf}" download><span>Documento institucional</span><strong>Projeto ELO.UFRB<br>2025 a 2027</strong><small>PDF · 18 páginas</small>${arrow}</a></div></section>
${channels()}`;

function intro(label, title, description) {
  return `<section class="page-intro"><div class="container"><nav class="breadcrumb" aria-label="Caminho da página"><a href="/">Início</a><span aria-hidden="true">/</span><span>${label}</span></nav>${tag("ELO.UFRB · " + label)}<h1>${title}</h1><p class="lead">${description}</p></div><div class="intro-circle" aria-hidden="true"></div></section>`;
}

const objectives = [
  "Mobilizar redes de interatividade, comunicação e circulação do conhecimento entre Universidade, comunidades e territórios.",
  "Ampliar a reflexão sobre Estado, Direitos Humanos, Cidadania, Desigualdades Sociais, Segurança Pública, Território e Cultura.",
  "Produzir, sistematizar e disseminar conteúdos de interesse social em linguagens acessíveis e diferentes formatos.",
  "Experimentar recursos e ferramentas digitais que possibilitem novas conexões entre Universidade e Sociedade.",
  "Articular comunicação virtual, eventos e atividades presenciais dentro e fora da Universidade.",
  "Difundir conhecimentos produzidos na Universidade e nas comunidades, considerando as demandas sociais e as especificidades dos territórios.",
  "Desenvolver experiências de troca e produção conjunta por meio de metodologias participativas e ativas.",
  "Ampliar o acesso à informação, estimular a reflexão crítica e contribuir para processos de transformação social.",
  "Realizar seminários, campanhas, cursos, formações e rodas de conversa em formatos presenciais, virtuais ou híbridos.",
];

const about = `${intro("O ELO", "O projeto ELO.UFRB", "Sociabilidades Virtuais em Rede e Interatividades Coletivas com a Sociedade Civil.")}<div class="container reading-layout"><aside class="page-index"><p class="eyebrow">Nesta página</p><nav aria-label="Seções do projeto">${[
  ["historia", "Nossa história"],
  ["universidade-em-rede", "Universidade em rede"],
  ["objetivos", "Objetivos"],
  ["metodologia", "Metodologia"],
  ["fundamentos", "Fundamentos"],
  ["renovacao", "Projeto 2025 a 2027"],
]
  .map(([id, t]) => `<a href="#${id}">${t}</a>`)
  .join(
    "",
  )}</nav><a class="text-link" href="${pdf}">Documento completo ${arrow}</a></aside><div class="reading-content">
<section id="historia">${tag("01 · Nossa história")}<h2>Uma rede que começa com pessoas</h2><p>O ELO.UFRB foi criado em 2022, ao final da fase mais aguda da pandemia de COVID-19, para ampliar e qualificar a extensão universitária por meio de diferentes canais de comunicação.</p><p>O Instagram foi inicialmente escolhido como principal canal, especialmente por sua presença entre as juventudes. Com o desenvolvimento do projeto, a comunicação passou a integrar diferentes plataformas, linguagens e públicos.</p><p>Vinculado ao Curso de Licenciatura em Ciências Sociais do CAHL/UFRB, o ELO busca fortalecer a interlocução da Universidade Federal do Recôncavo da Bahia com instituições de ensino, movimentos sociais, comunidades tradicionais e territórios.</p></section>
<section id="universidade-em-rede">${tag("02 · Nossa proposta")}<h2>Uma universidade <em>em rede</em></h2><p>A rede é formada por pessoas, ideias, conhecimentos, territórios, vínculos e ações. Nessa perspectiva, a comunicação faz parte do próprio trabalho extensionista: aproxima pessoas, articula ideias e mobiliza ações coletivas.</p><p>As redes virtuais levam conhecimentos da Universidade aos territórios. Os territórios também chegam à Universidade, com suas experiências, demandas, saberes e sujeitos. O digital e o presencial são dimensões de um mesmo processo de aproximação.</p><blockquote>“Uma rede não se constrói apenas conectando plataformas, constrói-se aproximando pessoas, criando vínculos e transformando encontros em possibilidades de ação coletiva.”<cite>Projeto ELO.UFRB 2025 a 2027 · Considerações</cite></blockquote></section>
<section id="objetivos">${tag("03 · Objetivos")}<h2>Aproximar, compartilhar<br>e <em>construir.</em></h2><p class="lead">Promover maior interatividade e aproximação entre a Universidade, a Comunidade e o Território, por meio de trocas de conhecimentos, experiências e saberes.</p><p>O objetivo geral envolve estruturar canais de comunicação e ações extensionistas que dinamizem a circulação do conhecimento e fortaleçam uma universidade em rede.</p><h3>Objetivos específicos</h3><ol class="objectives">${objectives.map((t) => `<li>${t}</li>`).join("")}</ol></section>
<section id="metodologia">${tag("04 · Metodologia")}<h2>Escuta e participação<br><em>como prática.</em></h2><p>O projeto adota metodologias dialógicas, crítico-comunicativas, ativas e participativas. A sociedade civil participa dos processos de construção, circulação e compartilhamento de conhecimentos.</p><p>Estudantes, professores(as), pesquisadores(as), representantes de instituições, movimentos sociais, comunidades tradicionais e demais agentes da sociedade civil podem contribuir com suas experiências, demandas e opiniões.</p><p>A proposta articula produção digital com campanhas, cursos, seminários, mesas de debate, rodas de conversa, formações, entrevistas e ações territoriais. As atividades podem ser presenciais, virtuais ou híbridas, na Universidade e em espaços externos.</p><p>Os registros dessas experiências podem circular em textos, imagens, vídeos, entrevistas e transmissões, ampliando as possibilidades de diálogo.</p>${link("/acoes/", "Conheça as formas de atuação")}</section>
<section id="fundamentos">${tag("05 · Fundamentos")}<h2>Ideias que sustentam<br><em>os encontros.</em></h2><div class="concepts"><div><h3>Cibercultura e virtualidade</h3><p>A partir de Pierre Lévy, o projeto compreende as tecnologias digitais em suas relações com a cultura, as sociabilidades e as possibilidades de produção compartilhada de conhecimentos.</p></div><div><h3>Sociedade em rede</h3><p>Em diálogo com Manuel Castells, considera as conexões entre sujeitos e os fluxos de informação como caminhos para práticas educacionais e extensionistas.</p></div><div><h3>Redes e comunidades</h3><p>As referências a Raquel Recuero, Larissa Adler Lomnitz e Zygmunt Bauman ajudam a pensar redes constituídas por pessoas, interações, laços sociais e experiências comuns.</p></div><div><h3>Inteligência coletiva</h3><p>O conhecimento é uma construção compartilhada. Diferentes sujeitos produzem, comentam, reelaboram e colocam seus saberes em circulação.</p></div></div><p class="caption">Síntese da fundamentação teórica do documento. As referências bibliográficas completas estão no PDF.</p></section>
<section id="renovacao">${tag("06 · Documento institucional")}<h2>O projeto 2025 a 2027</h2><dl class="project-facts"><div><dt>Criação do projeto</dt><dd>2022</dd></div><div><dt>Período de renovação</dt><dd>Dezembro de 2025 a dezembro de 2027</dd></div><div><dt>Carga horária prevista</dt><dd>400 horas</dd></div><div><dt>Vínculo</dt><dd>Licenciatura em Ciências Sociais · CAHL/UFRB</dd></div></dl><a class="text-link" href="${pdf}" download>Baixar o projeto completo <span class="file-type">PDF · 18 páginas</span>${next}</a><p class="source-note">Conteúdo desta página adaptado do Projeto ELO.UFRB 2025 a 2027. A carga horária corresponde à proposta de renovação, não a uma certificação individual.</p></section>
</div></div>${channels()}`;

function empty(
  title,
  text,
  destination = "/#canais",
  label = "Acompanhe os canais do ELO",
) {
  return `<div class="empty-state"><span class="empty-symbol" aria-hidden="true"><i></i><i></i></span><div><h3>${title}</h3><p>${text}</p>${link(destination, label)}</div></div>`;
}

function genericEntries(items) {
  return items
    .map(
      (item) =>
        `<article class="archive-entry" data-entry data-type="${esc(item.type)}" data-search="${esc([item.title, item.description, item.type].join(" "))}">${tag(esc(item.type))}<h3><a href="${esc(item.url)}">${esc(item.title)}</a></h3><p>${esc(item.description)}</p>${item.date ? `<p class="caption"><time datetime="${esc(item.date)}">${new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(item.date))}</time></p>` : ""}${link(item.url, "Saiba mais")}</article>`,
    )
    .join("");
}

function filters(items, noun) {
  if (!items.length) return "";
  const types = [...new Set(items.map((i) => i.type))];
  return `<form class="archive-filters" role="search" data-filters><div><label for="archive-search">Buscar ${noun}</label><input id="archive-search" type="search" name="q" placeholder="Digite um tema ou palavra-chave" autocomplete="off"></div><div><label for="archive-type">Tipo de material</label><select id="archive-type" name="tipo"><option value="">Todos os tipos</option>${types.map((t) => `<option>${esc(t)}</option>`).join("")}</select></div><button class="filter-button" type="submit">Buscar ${next}</button></form><p class="search-status" role="status" aria-live="polite" data-search-status>${items.length} ${items.length === 1 ? "item disponível" : "itens disponíveis"}</p>`;
}

function archive(
  items,
  noun,
  emptyTitle,
  emptyText,
  renderer = genericEntries,
) {
  return `<div data-archive>${filters(items, noun)}<div class="archive-results">${items.length ? renderer(items) : empty(emptyTitle, emptyText)}</div>${items.length ? '<div class="no-results" data-no-results hidden><h3>Nenhum resultado encontrado.</h3><p>Tente outro termo ou selecione todos os tipos.</p><button class="text-button" type="button" data-reset>Limpar busca</button></div><noscript><p>Todos os materiais estão listados abaixo. Para usar os filtros, ative o JavaScript.</p></noscript>' : ""}</div>`;
}

const actionArchive = data.actions
  .slice(1)
  .map(
    (item) =>
      `<article class="archive-action"><div class="archive-action-year">${esc(item.year)}</div><a class="archive-action-image" href="${esc(item.url)}">${picture(item)}</a><div class="archive-action-copy">${tag(esc(item.type))}<p class="place">${esc(item.date ? formatDate(item.date) : item.year)}<br>${esc(item.location)}</p><h3><a href="${esc(item.url)}">${esc(item.title)}</a></h3>${item.subtitle ? `<p class="action-subtitle">${esc(item.subtitle)}</p>` : ""}<p>${esc(item.description)}</p>${link(item.url, "Conheça a atividade")}</div></article>`,
  )
  .join("");
const actionFormats = [
  ["message", "Encontros e diálogo", "Seminários, rodas de conversa e entrevistas."],
  ["graduation", "Formação", "Cursos e formações em diferentes formatos."],
  ["users", "Mobilização", "Campanhas e atividades com comunidades e instituições."],
  ["pin", "Presença nos territórios", "Ações presenciais, virtuais e híbridas."],
]
  .map(([icon, title, description], index) => `<div class="action-format">${sectionIcon(icon, ["red", "orange", "blue", "red"][index])}<h3>${title}</h3><p>${description}</p></div>`)
  .join("");
const actions = `${intro("Ações", "Ações do ELO.UFRB", "Atividades, campanhas e diálogos que aproximam Universidade, sociedade civil e território.")}<section class="section action-feature" aria-labelledby="action-feature-title"><div class="container"><div class="major-section-heading action-feature-heading"><div>${tag("Ações atuais")}<h2 id="action-feature-title">Destaques de 2026</h2></div></div><div class="featured-action-grid"><div class="featured-action-photo">${picture(featuredAction)}<span class="image-source">Imagem publicada pelo canal oficial do ELO.UFRB</span></div><div class="featured-action-copy"><p class="context-heading">Campanha · ${esc(featuredAction.year)}</p><p class="place">${esc(featuredAction.location)}</p><h3>${esc(featuredAction.title)}</h3><p>${esc(featuredAction.description)}</p>${featuredActionSource}</div></div></div></section><section class="section actions-intro" aria-labelledby="how-elo-works"><div class="container"><div class="major-section-heading">${sectionIcon("activity", "red")}<div>${tag("Extensão universitária")}<h2 id="how-elo-works">Como o ELO atua</h2><p>O projeto organiza diferentes formas de encontro, formação e circulação de conhecimentos.</p></div></div><div class="action-format-grid">${actionFormats}</div></div></section><section class="section archive-section"><div class="container"><div class="major-section-heading">${sectionIcon("file", "orange")}<div>${tag("Memória do projeto")}<h2>Arquivo de ações</h2><p>Atividades documentadas por fontes oficiais, organizadas por ano.</p></div></div><div class="action-archive">${actionArchive}</div></div></section>${channels()}`;

const publications = `${intro("Publicações", "Publicações e materiais", "Documentos institucionais, vídeos e registros reunidos em um mesmo lugar.")}<section class="section" aria-labelledby="acervo-title"><div class="container"><div class="major-section-heading">${sectionIcon("file", "orange")}<div>${tag("Repositório institucional")}<h2 id="acervo-title">Documentos e materiais</h2><p>Arquivos publicados e verificados pelo projeto.</p></div></div>${data.publications.map(publicationCard).join("")}<p class="source-note">Novas produções serão incluídas quando publicadas pelos canais oficiais.</p><div class="content-paths"><a href="https://www.youtube.com/@ELOUFRB" target="_blank" rel="noopener noreferrer"><span>${sectionIcon("video", "red")}${tag("Vídeos")}<h3>YouTube do ELO.UFRB</h3><p>Transmissões e registros audiovisuais</p></span>${arrow}</a><a href="https://www.instagram.com/elo.ufrb.oficial/" target="_blank" rel="noopener noreferrer"><span><span class="section-icon icon-blue">${channelIcons.Instagram}</span>${tag("Atualizações")}<h3>Instagram oficial</h3><p>Ações, campanhas e chamadas públicas</p></span>${arrow}</a></div></div></section>`;

const editorial = editorialPages({ data, esc, tag, link, externalLink, picture, intro, formatDate });
const idealizadorPage = editorial.idealizador;
const publicationPage = editorial.publicacao;
const partnerPage = editorial.parceira;
home = home.replace("__HOME_FOUNDER__", editorial.homeFounder);

const actionsPage = actions.replace(
  featuredActionSource,
  `<div class="featured-action-links">${link(featuredAction.url, "Conheça a atividade")}</div>`,
);

const agendaEntries = data.events
  .map((item) => {
    const eventDate = new Date(item.date + "T00:00:00Z");
    const day = String(eventDate.getUTCDate()).padStart(2, "0");
    const month = new Intl.DateTimeFormat("pt-BR", { month: "short", timeZone: "UTC" }).format(eventDate).replace(".", "");
    const year = eventDate.getUTCFullYear();
    const details = [
      ["Quando", `${formatDate(item.date)}${item.time ? ", " + item.time : ""}`],
      ["Onde", item.location],
      item.speaker ? ["Convidada", item.speaker] : null,
      item.mediation ? ["Mediação", item.mediation] : null,
    ].filter(Boolean);
    return `<article class="agenda-entry"><time datetime="${esc(item.date)}"><strong>${esc(day)}</strong><span>${esc(month)}<br>${esc(year)}</span></time><div>${tag(esc(item.type))}<h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><dl>${details.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join("")}</dl><div class="event-source"><p class="eyebrow">Fonte</p>${item.url ? externalLink(item.url, "Ver publicação no Instagram", "Instagram") : `<p>${esc(item.sourceLabel || "Publicação oficial do ELO.UFRB")}</p>`}</div></div></article>`;
  })
  .join("");
const agendaPast = data.actions.slice(1).map((item) => `<a class="past-event" href="${esc(item.url)}"><time datetime="${esc(item.date)}"><strong>${new Date(item.date + "T00:00:00Z").getUTCDate()}</strong><span>${new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(item.date))}</span></time><span><small>${esc(item.type)}</small><strong>${esc(item.title)}</strong><em>${esc(item.location)}</em></span>${arrow}</a>`).join("");
const agenda = `${intro("Agenda", "Agenda do ELO.UFRB", "Datas, horários e locais das atividades confirmadas do projeto.")}<section class="section"><div class="container"><div class="major-section-heading">${sectionIcon("calendar", "blue")}<div>${tag("Programação confirmada")}<h2>Próximas atividades</h2><p>Informações essenciais para acompanhar a programação.</p></div></div><div class="agenda-list">${agendaEntries}</div></div></section><section class="section past-events"><div class="container"><div class="section-heading"><div>${tag("Memória")}<h2>Atividades realizadas</h2></div><p>Registros anteriores permanecem disponíveis no arquivo de ações.</p></div><div class="past-event-list">${agendaPast}</div></div></section>${channels()}`;

const reenconcavoImage = data.actions.find((item) => item.slug === "reenconcavo-2023");
const setembroAmarelo = `<section class="page-intro campaign-intro"><div class="container"><nav class="breadcrumb" aria-label="Caminho da página"><a href="/">Início</a><span aria-hidden="true">/</span><a href="/acoes/">Ações</a><span aria-hidden="true">/</span><span>9ª Campanha Setembro Amarelo</span></nav>${tag("Campanha · 2026")}<h1>9ª Campanha Setembro Amarelo</h1><p class="lead">Participação do ELO.UFRB com a Câmara de Vereadores de Cachoeira na nona edição da campanha.</p></div><div class="intro-circle" aria-hidden="true"></div></section><article class="action-article campaign-article"><section class="campaign-facts"><div class="container"><dl><div><dt>Categoria</dt><dd>Campanha</dd></div><div><dt>Local</dt><dd>Cachoeira, BA</dd></div><div><dt>Ano</dt><dd>2026</dd></div></dl></div></section><section class="section action-document"><div class="container action-document-grid"><div class="action-document-image campaign-document-image">${picture(featuredAction)}<span class="image-source">Imagem publicada pelo canal oficial do ELO.UFRB</span></div><div><h2>Sobre a atividade</h2><p class="lead">A peça oficial registra o ELO.UFRB e a Câmara de Vereadores de Cachoeira na 9ª Campanha Setembro Amarelo, em 2026.</p><p>O registro situa a atividade em Cachoeira, Bahia. A publicação consultada não apresenta, de forma publicamente acessível, data específica, programação ou identificação das pessoas fotografadas; por isso, essas informações não são atribuídas nesta página.</p></div></div></section><section class="section campaign-institutions"><div class="container"><div class="major-section-heading">${sectionIcon("users", "blue")}<div>${tag("Registro institucional")}<h2>Instituições envolvidas</h2><p>A relação abaixo corresponde ao que está identificado na própria arte oficial.</p></div></div><div class="institution-list"><div><span>01</span><strong>ELO.UFRB</strong></div><div><span>02</span><strong>Câmara de Vereadores de Cachoeira, BA</strong></div></div></div></section><section class="section action-source"><div class="container"><p class="eyebrow">Fonte</p><h2>Publicação oficial no Instagram</h2><p>A publicação específica é a fonte principal deste registro.</p><div class="related-links">${externalLink(featuredAction.sourceUrl, "Ver publicação no Instagram", "Instagram")}</div></div></section><section class="section other-actions"><div class="container"><div class="section-heading"><div>${tag("Arquivo do ELO.UFRB")}<h2>Outras ações</h2></div>${link("/acoes/", "Ver todas as ações")}</div><div class="editorial-list"><a href="/acoes/reenconcavo-2023/"><span class="list-date">2023</span><span><small>Painel · CAHL/UFRB</small><strong>Movimentos Sociais e Universidade</strong></span>${next}</a><a href="/acoes/saude-mental-psicoeducacao-2022/"><span class="list-date">2022</span><span><small>Webconferência · TV UFRB</small><strong>Saúde Mental e Psicoeducação</strong></span>${next}</a></div></div></section></article>`;
const reenconcavo = `${intro("Painel · 2023", "Movimentos Sociais e Universidade", "Projeto ELO.UFRB, interação em redes.")}<article class="action-article"><section class="action-facts"><div class="container action-facts-grid"><time datetime="2023-03-09"><strong>09</strong><span>março<br>2023</span></time><dl><div><dt>Horário</dt><dd>14h às 16h</dd></div><div><dt>Local</dt><dd>Sala 16, CAHL/UFRB<br>Cachoeira, BA</dd></div><div><dt>Tipo</dt><dd>Painel</dd></div></dl></div></section><section class="section action-document"><div class="container action-document-grid"><div class="action-document-image">${picture(reenconcavoImage)}<span class="image-source">Arte oficial do Reencôncavo 2023, CAHL/UFRB</span></div><div><h2>Sobre a atividade</h2><p class="lead">O painel integrou a programação do Reencôncavo 2023, evento anual de acolhimento da comunidade acadêmica da UFRB.</p><p>Realizado pelo CAHL nos dias 7, 8 e 9 de março, o evento reuniu atividades dos cursos do Centro. O painel do ELO promoveu a interlocução entre representantes de movimentos sociais, docentes e Universidade.</p><p>A programação oficial identifica a atividade como “Projeto @Elo.Ufrb, interação em redes”. Não há registro publicado sobre conclusões do debate.</p></div></div></section><section class="section participant-section"><div class="container"><div class="major-section-heading">${sectionIcon("users", "blue")}<div>${tag("Participações divulgadas em 2023")}<h2>Participantes e mediação</h2></div></div><div class="participant-grid"><div><h3>Daniel Bispo</h3><p>Levante Popular da Juventude<br>Coordenador Estadual, conforme a programação.</p></div><div><h3>Yalaxé Juçara Lopes</h3><p>Movimento Mulheres do Axé do Brasil<br>Coordenação do movimento, conforme a programação.</p></div><div><h3>Dinho Oliveira</h3><p>Movimento dos Trabalhadores Sem Teto, MTST<br>Coordenação do movimento, conforme a programação.</p></div></div><div class="mediation"><h3>Mediação</h3><p>Prof. Antonio Mateus de Carvalho Soares<br>Prof. José Raimundo dos Santos</p><small>Licenciatura em Ciências Sociais, conforme a programação oficial de 2023.</small></div></div></section><section class="section action-source"><div class="container"><p class="eyebrow">Links relacionados</p><h2>Programação oficial do CAHL/UFRB</h2><p>As informações desta página foram transcritas da programação institucional do Reencôncavo 2023.</p><div class="related-links">${externalLink("https://ufrb.edu.br/cahl/eventos/2506-reenconcavo-2023", "Ver programação no site do CAHL/UFRB")}${link("/acoes/", "Voltar para ações")}</div></div></section></article>`;

const mentalHealthImage = data.actions.find((item) => item.slug === "saude-mental-psicoeducacao-2022");
const mentalHealth = `${intro("Webconferência · 2022", "Saúde Mental e Psicoeducação", "Debate sobre preservação da vida e prevenção ao suicídio.")}<article class="action-article"><section class="action-facts"><div class="container action-facts-grid"><time datetime="2022-09-29"><strong>29</strong><span>setembro<br>2022</span></time><dl><div><dt>Horário</dt><dd>19h às 21h</dd></div><div><dt>Formato</dt><dd>Online</dd></div><div><dt>Canal</dt><dd>TV UFRB</dd></div></dl></div></section><section class="section action-document"><div class="container action-document-grid"><div class="action-document-image">${picture(mentalHealthImage)}<span class="image-source">Arte oficial publicada pelo Portal UFRB</span></div><div><h2>Sobre a atividade</h2><p class="lead">A webconferência do ELO.UFRB reuniu especialistas e agentes sociais para debater formas de preservação da vida e prevenção ao suicídio.</p><p>A programação abordou relações entre saúde mental, consequências da pandemia, escola, família, relações abusivas e autocuidado. A transmissão ocorreu pela TV UFRB.</p></div></div></section><section class="section participant-section"><div class="container"><div class="major-section-heading">${sectionIcon("users", "blue")}<div>${tag("Participações divulgadas em 2022")}<h2>Participantes e mediação</h2></div></div><div class="participant-grid"><div><h3>Victor Pablo da Silveira</h3><p>Médico psiquiatra</p></div><div><h3>Jacy Vieira</h3><p>Perita criminal e docente</p></div><div><h3>Paulo Sérgio Ribeiro</h3><p>Advogado e psicanalista</p></div><div><h3>Danúbia Azevedo</h3><p>Psicóloga clínica</p></div></div><div class="mediation"><h3>Mediação</h3><p>Prof. Dr. Antonio Mateus Soares</p><small>CAHL/UFRB, conforme a divulgação oficial de 2022.</small></div></div></section><section class="section action-source"><div class="container"><p class="eyebrow">Fonte</p><h2>Evento publicado no Portal UFRB</h2><p>A página institucional foi publicada em 26 de setembro de 2022.</p>${link("https://ufrb.edu.br/portal1/component/chronoforms5/?chronoform=ver-evento&id=1736", "Consultar a fonte oficial")}${link("/acoes/", "Voltar para ações")}</div></section></article>`;

const contents = `${intro("Conteúdos", "Saberes em<br><em>circulação.</em>", "Um espaço para textos, vídeos, entrevistas, transmissões e registros das experiências do ELO.")}<section class="section"><div class="container">${tag("Acervo digital")}<h2>Vozes, ideias e <em>registros.</em></h2>${archive(data.contents, "conteúdos", "Este acervo está em construção.", "Ainda não há conteúdos catalogados no portal. Vídeos, novidades e registros podem ser acompanhados nos canais oficiais do projeto.")}<div class="content-paths"><a href="https://www.youtube.com/@ELOUFRB" target="_blank" rel="noopener noreferrer"><span><span class="section-icon icon-red">${channelIcons.YouTube}</span>${tag("YouTube")}<h3>Vídeos e transmissões</h3><p>Acesse o canal @ELOUFRB</p></span>${arrow}</a><a href="https://www.instagram.com/elo.ufrb.oficial/" target="_blank" rel="noopener noreferrer"><span><span class="section-icon icon-blue">${channelIcons.Instagram}</span>${tag("Instagram")}<h3>Novidades e registros</h3><p>Acompanhe @elo.ufrb.oficial</p></span>${arrow}</a></div></div></section><section class="section related"><div class="container section-heading"><div>${tag("Para ler e compartilhar")}<h2>Consulte as <em>publicações.</em></h2></div>${link("/publicacoes/", "Documentos e materiais")}</div></section>`;

const contactActions = {
  Instagram: "Abrir Instagram",
  YouTube: "Abrir canal no YouTube",
  WhatsApp: "Abrir conversa",
  "E-mail": "Enviar e-mail",
  "X (Twitter)": "Abrir perfil no X",
  TikTok: "Abrir TikTok",
  Threads: "Abrir Threads",
};
const contact = `${intro("Contato", "Fale com o ELO", "Canais oficiais para acompanhar as atividades e entrar em contato com o projeto.")}<section class="section contact-section" aria-labelledby="contact-channels-title"><div class="container contact-layout"><div class="contact-heading">${tag("Contato e redes")}<h2 id="contact-channels-title">Canais oficiais</h2><p>Escolha o canal mais adequado para acompanhar publicações, assistir a registros ou enviar uma mensagem.</p></div><div class="contact-list">${data.channels.map((channel) => `<a class="contact-channel" href="${esc(channel.url)}"${/^https?:/i.test(channel.url) ? ' target="_blank" rel="noopener noreferrer"' : ""}><span class="contact-channel-icon">${channelIcons[channel.name] || ""}</span><span class="contact-channel-copy"><strong>${esc(channel.name)}</strong><small>${esc(channel.label)}</small></span><span class="contact-channel-action">${esc(contactActions[channel.name] || "Abrir canal")} <i aria-hidden="true">${/^https?:/i.test(channel.url) ? "↗" : "→"}</i></span></a>`).join("")}</div></div></section>`;

const pages = [
  ["/", "ELO.UFRB | Universidade em rede", data.description, home],
  [
    "/sobre/",
    "O ELO | História, proposta e objetivos",
    "Conheça a história, os objetivos e a metodologia do ELO.UFRB, projeto de extensão criado em 2022. Consulte a proposta de renovação 2025 a 2027.",
    about,
  ],
  [
    "/idealizador/",
    "Antônio Mateus de Carvalho Soares | Idealizador do ELO.UFRB",
    "Conheça Antônio Mateus de Carvalho Soares, idealizador do ELO.UFRB, sua trajetória acadêmica e os eixos Violência, Educação e Direitos Humanos.",
    idealizadorPage,
  ],
  [
    "/acoes/",
    "Ações e extensão universitária | ELO.UFRB",
    "Conheça as formas de atuação previstas no ELO.UFRB: encontros, formações, campanhas, comunicação em rede e ações territoriais.",
    actionsPage,
  ],
  [
    "/publicacoes/",
    "Publicações e materiais | ELO.UFRB",
    "Consulte documentos, materiais e canais de conteúdo do ELO.UFRB.",
    publicationPage,
  ],
  [
    "/agenda/",
    "Agenda de encontros e atividades | ELO.UFRB",
    "Espaço para a programação de seminários, cursos, rodas de conversa e atividades presenciais, virtuais e híbridas do ELO.UFRB.",
    agenda,
  ],
  [
    "/parceira/",
    "Parcerias e redes | ELO.UFRB",
    "Conheça parcerias confirmadas, vínculos institucionais e interlocuções construídas nas atividades do ELO.UFRB.",
    partnerPage,
  ],
  [
    "/contato/",
    "Contato e canais oficiais | ELO.UFRB",
    "Entre em contato com o ELO.UFRB e acesse seus canais oficiais.",
    contact,
  ],
  [
    "/acoes/setembro-amarelo-2026/",
    "9ª Campanha Setembro Amarelo | ELO.UFRB",
    "Registro da participação do ELO.UFRB com a Câmara de Vereadores de Cachoeira na 9ª Campanha Setembro Amarelo, em 2026.",
    setembroAmarelo,
  ],
  [
    "/acoes/reenconcavo-2023/",
    "Movimentos Sociais e Universidade | ELO.UFRB",
    "Registro do painel Movimentos Sociais e Universidade: interação em redes, realizado no Reencôncavo 2023.",
    reenconcavo,
  ],
  [
    "/acoes/saude-mental-psicoeducacao-2022/",
    "Saúde Mental e Psicoeducação | ELO.UFRB",
    "Registro da webconferência Saúde Mental e Psicoeducação, promovida pelo ELO.UFRB em 29 de setembro de 2022.",
    mentalHealth,
  ],
  [
    "/conteudos/",
    "Conteúdos e acervo digital | ELO.UFRB",
    "Espaço de conteúdos do ELO.UFRB: textos, vídeos, entrevistas, transmissões e registros. Acesse os canais oficiais.",
    contents,
  ],
];
for (const [path, title, description, body] of pages) {
  const dir = join(root, path);
  await mkdir(dir, { recursive: true });
  await writeFile(
    join(dir, "index.html"),
    page(path, title, description, body),
  );
}
await writeFile(
  join(root, "404.html"),
  page(
    "/404.html",
    "Página não encontrada | ELO.UFRB",
    "Encontre os caminhos do portal ELO.UFRB.",
    `${intro("Página não encontrada", "Vamos retomar<br><em>a conexão?</em>", "O endereço que você acessou não corresponde a uma página do portal.")}<section class="section"><div class="container">${link("/", "Voltar ao início")}${link("/publicacoes/", "Consultar publicações")}</div></section>`,
  ),
);
if (data.origin) {
  await writeFile(
    join(root, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(([p]) => `<url><loc>${esc(data.origin.replace(/\/$/, "") + p)}</loc></url>`).join("")}</urlset>`,
  );
}
await writeFile(
  join(root, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /scripts/\nDisallow: /content/\nDisallow: /docs/\n${data.origin ? `Sitemap: ${data.origin.replace(/\/$/, "")}/sitemap.xml\n` : ""}`,
);
console.log(
  `Geradas ${pages.length} páginas, página 404 e robots.txt. ${data.origin ? "SEO absoluto configurado." : "Canonical aguardando domínio oficial em content/site.json."}`,
);
