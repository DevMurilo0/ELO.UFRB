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

  const videoPlayers = [...document.querySelectorAll("[data-video]")];
  let videoConnectionsWarmed = false;
  const warmVideoConnections = () => {
    if (videoConnectionsWarmed || !videoPlayers.length) return;
    videoConnectionsWarmed = true;
    for (const href of ["https://www.youtube-nocookie.com", "https://i.ytimg.com"]) {
      const node = document.createElement("link");
      node.rel = "preconnect";
      node.href = href;
      node.crossOrigin = "anonymous";
      document.head.append(node);
    }
  };
  for (const player of videoPlayers) {
    const videoId = player.dataset.video;
    if (videoId) {
      player.style.setProperty(
        "--video-poster",
        `url("https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg")`,
      );
    }
  }
  if ("requestIdleCallback" in window)
    requestIdleCallback(warmVideoConnections, { timeout: 1400 });
  else setTimeout(warmVideoConnections, 650);
  if ("IntersectionObserver" in window && videoPlayers.length) {
    const videoObserver = new IntersectionObserver(
      (entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          warmVideoConnections();
          observer.disconnect();
        }
      },
      { rootMargin: "450px" },
    );
    videoPlayers.forEach((player) => videoObserver.observe(player));
  }

  document.addEventListener("click", (event) => {
    const videoButton = event.target.closest(".video-load");
    if (!videoButton) return;
    const player = videoButton.closest("[data-video]");
    if (!player) return;
    warmVideoConnections();
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(player.dataset.video)}?autoplay=1&rel=0`;
    iframe.title = player.dataset.videoTitle || "Vídeo";
    iframe.loading = "eager";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    player.replaceChildren(iframe);
    player.classList.add("is-loaded");
  });

  const hero = document.querySelector(".hero-centered");
  if (hero) {
    const circles = [...hero.querySelectorAll(".hero-orbits i")];
    const enableHeroParallax = () => {
      if (reducedMotion.matches) return;
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
    };

    if (reducedMotion.matches || !circles.length || !("animate" in Element.prototype)) {
      hero.classList.add("hero-orbits-settled");
      enableHeroParallax();
    } else {
      const heroRect = hero.getBoundingClientRect();
      const centerX = heroRect.left + heroRect.width / 2;
      const centerY = heroRect.top + heroRect.height / 2;
      const orbitRadius = Math.min(heroRect.width, heroRect.height) * 0.105;

      const animations = circles.map((circle, index) => {
        const rect = circle.getBoundingClientRect();
        const dx = centerX - (rect.left + rect.width / 2);
        const dy = centerY - (rect.top + rect.height / 2);
        const phase = index * ((Math.PI * 2) / 3);
        const p1x = dx + Math.cos(phase) * orbitRadius;
        const p1y = dy + Math.sin(phase) * orbitRadius;
        const p2x = dx + Math.cos(phase + Math.PI * .78) * orbitRadius * 1.18;
        const p2y = dy + Math.sin(phase + Math.PI * .78) * orbitRadius * 1.18;
        const p3x = dx + Math.cos(phase + Math.PI * 1.55) * orbitRadius * .72;
        const p3y = dy + Math.sin(phase + Math.PI * 1.55) * orbitRadius * .72;

        return circle.animate(
          [
            { transform: `translate(${dx}px, ${dy}px) scale(.06)`, opacity: 0, filter: "blur(10px)" },
            { transform: `translate(${dx}px, ${dy}px) scale(.34)`, opacity: .92, filter: "blur(0px)", offset: .18 },
            { transform: `translate(${p1x}px, ${p1y}px) scale(.48)`, opacity: 1, offset: .38 },
            { transform: `translate(${p2x}px, ${p2y}px) scale(.56)`, opacity: 1, offset: .57 },
            { transform: `translate(${p3x}px, ${p3y}px) scale(.68)`, opacity: .96, offset: .74 },
            { transform: "translate(0px, 0px) scale(1)", opacity: .72, filter: "blur(0px)" },
          ],
          {
            duration: 2450,
            delay: index * 85,
            easing: "cubic-bezier(.2,.78,.16,1)",
            fill: "both",
          },
        );
      });

      Promise.all(animations.map((animation) => animation.finished.catch(() => {}))).then(() => {
        animations.forEach((animation) => animation.cancel());
        hero.classList.add("hero-orbits-settled");
        enableHeroParallax();
      });
    }
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
