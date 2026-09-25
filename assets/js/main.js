(() => {
  "use strict";
  // Ative somente quando a assinatura de navegação voltar a ser necessária.
  const PAGE_TRANSITIONS_ENABLED = true;
  document.documentElement.classList.add("js-enabled");
  document.documentElement.classList.toggle(
    "transition-enabled",
    PAGE_TRANSITIONS_ENABLED,
  );
  if (!PAGE_TRANSITIONS_ENABLED) {
    document.documentElement.classList.remove(
      "transition-leaving",
      "transition-arrival",
      "transition-reveal",
    );
    try {
      sessionStorage.removeItem("elo-transition");
    } catch {}
  }
  const header = document.querySelector(".site-header");
  const updateHeader = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  updateHeader();
  addEventListener("scroll", updateHeader, { passive: true });
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const closeMenu = (focus = false) => {
    button.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    if (focus) button.focus();
  };
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      button.getAttribute("aria-expanded") === "true"
    )
      closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  const desktop = matchMedia("(min-width: 951px)");
  desktop.addEventListener("change", () => closeMenu());

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const transitionKey = "elo-transition";
  if (
    PAGE_TRANSITIONS_ENABLED &&
    document.documentElement.classList.contains("transition-arrival")
  ) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        document.documentElement.classList.add("transition-reveal"),
      ),
    );
    setTimeout(() => {
      document.documentElement.classList.remove(
        "transition-arrival",
        "transition-reveal",
      );
      try {
        sessionStorage.removeItem(transitionKey);
      } catch {}
    }, 620);
  }

  document.addEventListener("click", (event) => {
    if (!PAGE_TRANSITIONS_ENABLED) return;
    const anchor = event.target.closest("a[href]");
    if (
      !anchor ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      reducedMotion.matches ||
      anchor.hasAttribute("download") ||
      anchor.target === "_blank"
    )
      return;

    const destination = new URL(anchor.href, location.href);
    const samePage =
      destination.pathname === location.pathname &&
      destination.search === location.search;
    if (
      destination.origin !== location.origin ||
      destination.protocol !== location.protocol ||
      destination.pathname.toLowerCase().endsWith(".pdf") ||
      samePage
    )
      return;

    event.preventDefault();
    document.documentElement.classList.add("transition-leaving");
    try {
      sessionStorage.setItem(transitionKey, "1");
    } catch {}
    setTimeout(() => location.assign(destination.href), 440);
  });

  addEventListener("pageshow", (event) => {
    if (event.persisted) {
      document.documentElement.classList.remove(
        "transition-leaving",
        "transition-arrival",
        "transition-reveal",
      );
      try {
        sessionStorage.removeItem(transitionKey);
      } catch {}
    }
  });

  document.addEventListener("click", (event) => {
    const videoButton = event.target.closest(".video-load");
    if (!videoButton) return;
    const player = videoButton.closest("[data-video]");
    if (!player) return;
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(player.dataset.video)}?autoplay=1`;
    iframe.title = player.dataset.videoTitle || "Vídeo";
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    player.replaceChildren(iframe);
    player.classList.add("is-loaded");
  });

  const hero = document.querySelector(".hero-centered");
  if (hero && !reducedMotion.matches) {
    const circles = [...hero.querySelectorAll(".hero-orbits i")];
    hero.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;
      const x = event.clientX / innerWidth - 0.5;
      const y = event.clientY / innerHeight - 0.5;
      circles.forEach((circle, index) => {
        const amount = (index + 1) * 5;
        circle.style.transform = `translate(${x * amount}px, ${y * amount}px)`;
      });
    });
    hero.addEventListener("pointerleave", () =>
      circles.forEach((circle) => (circle.style.transform = "")),
    );
  }

  const archive = document.querySelector("[data-archive]");
  const form = archive?.querySelector("[data-filters]");
  if (form) {
    const search = form.elements.q;
    const type = form.elements.tipo;
    const entries = [...archive.querySelectorAll("[data-entry]")];
    const status = archive.querySelector("[data-search-status]");
    const empty = archive.querySelector("[data-no-results]");
    const normalize = (value) =>
      value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR");
    const update = () => {
      const query = normalize(search.value.trim());
      let count = 0;
      for (const entry of entries) {
        const visible =
          (!type.value || entry.dataset.type === type.value) &&
          query
            .split(/\s+/)
            .every((term) => normalize(entry.dataset.search).includes(term));
        entry.hidden = !visible;
        if (visible) count++;
      }
      status.textContent = `${count} ${count === 1 ? "item encontrado" : "itens encontrados"}`;
      empty.hidden = count > 0;
      const url = new URL(location.href);
      search.value.trim()
        ? url.searchParams.set("q", search.value.trim())
        : url.searchParams.delete("q");
      type.value
        ? url.searchParams.set("tipo", type.value)
        : url.searchParams.delete("tipo");
      history.replaceState(null, "", url);
    };
    const restore = () => {
      const params = new URLSearchParams(location.search);
      search.value = params.get("q") || "";
      type.value = [...type.options].some((o) => o.value === params.get("tipo"))
        ? params.get("tipo")
        : "";
      update();
    };
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      update();
    });
    search.addEventListener("input", update);
    type.addEventListener("change", update);
    archive.querySelector("[data-reset]").addEventListener("click", () => {
      form.reset();
      update();
      search.focus();
    });
    window.addEventListener("popstate", restore);
    restore();
  }

  if (
    "IntersectionObserver" in window &&
    !reducedMotion.matches
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".section-heading, .network-section-grid, .about-grid")
      .forEach((element) => observer.observe(element));
  }
})();
