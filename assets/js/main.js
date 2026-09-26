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
  const desktop = matchMedia("(min-width: 1081px)");
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
  const entry = document.querySelector(".elo-entry");

  const revealPageCopy = () => {
    const targets = [
      document.querySelector(".brand"),
      ...document.querySelectorAll("#primary-nav > a"),
      ...(hero ? [...hero.querySelectorAll(".hero-center-copy > *")] : []),
    ].filter(Boolean);

    targets.forEach((target, index) => {
      target.classList.add(index < 1 + document.querySelectorAll("#primary-nav > a").length ? "header-entry-copy" : "hero-entry-copy");
      const animation = target.animate(
        [
          { opacity: 0, filter: "blur(12px)", transform: "translateY(10px)" },
          { opacity: .72, filter: "blur(4px)", transform: "translateY(3px)", offset: .62 },
          { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" },
        ],
        {
          duration: 680,
          delay: index * 58,
          easing: "cubic-bezier(.2,.72,.18,1)",
          fill: "forwards",
        },
      );
      animation.finished.finally(() => {
        target.classList.remove("header-entry-copy", "hero-entry-copy");
        target.style.opacity = "";
        target.style.filter = "";
        target.style.transform = "";
      });
    });
  };

  const settleHeroCircles = () => {
    if (!hero) return;
    const circles = [...hero.querySelectorAll(".hero-orbits i")];
    hero.classList.add("hero-orbits-settled");
    if (reducedMotion.matches) return;
    circles.forEach((circle, index) => {
      circle.animate(
        [
          { opacity: 0, transform: "scale(.9)", filter: "blur(8px)" },
          { opacity: .84, transform: "scale(1)", filter: "blur(0px)" },
        ],
        {
          duration: 760,
          delay: index * 80,
          easing: "cubic-bezier(.2,.78,.18,1)",
        },
      );
    });
  };

  const enableHeroParallax = () => {
    if (!hero || reducedMotion.matches) return;
    const circles = [...hero.querySelectorAll(".hero-orbits i")];
    hero.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;
      const x = event.clientX / innerWidth - 0.5;
      const y = event.clientY / innerHeight - 0.5;
      circles.forEach((circle, index) => {
        const amount = (index + 1) * 4;
        circle.style.transform = `translate(${x * amount}px, ${y * amount}px)`;
      });
    });
    hero.addEventListener("pointerleave", () =>
      circles.forEach((circle) => (circle.style.transform = "")),
    );
  };

  if (entry && hero && !reducedMotion.matches && "animate" in Element.prototype) {
    document.documentElement.classList.add("elo-entry-running");
    const balls = [...entry.querySelectorAll(".elo-entry-ball")];
    const heroCircles = [...hero.querySelectorAll(".hero-orbits i")];
    const viewportCenterX = innerWidth / 2;
    const viewportCenterY = innerHeight / 2;
    const orbitRadius = Math.min(innerWidth, innerHeight) < 700 ? 54 : 76;
    const baseBallSize = balls[0]?.getBoundingClientRect().width || 112;

    const animations = balls.map((ball, index) => {
      const target = heroCircles[index];
      const targetRect = target?.getBoundingClientRect();
      const targetX = targetRect
        ? targetRect.left + targetRect.width / 2 - viewportCenterX
        : 0;
      const targetY = targetRect
        ? targetRect.top + targetRect.height / 2 - viewportCenterY
        : 0;
      const targetScale = targetRect
        ? Math.max(1, targetRect.width / baseBallSize)
        : 3.5;

      const phase = index * ((Math.PI * 2) / 3);
      const orbitA = phase + Math.PI * 1.05;
      const orbitB = phase + Math.PI * 2.15;

      return ball.animate(
        [
          {
            transform: `translate(${Math.cos(phase) * 12}px, ${Math.sin(phase) * 12}px) scale(.12)`,
            opacity: 0,
            filter: "blur(8px)",
          },
          {
            transform: `translate(${Math.cos(phase) * orbitRadius}px, ${Math.sin(phase) * orbitRadius}px) scale(.72)`,
            opacity: 1,
            filter: "blur(0px)",
            offset: .22,
          },
          {
            transform: `translate(${Math.cos(orbitA) * orbitRadius}px, ${Math.sin(orbitA) * orbitRadius}px) scale(.86)`,
            opacity: 1,
            offset: .42,
          },
          {
            transform: `translate(${Math.cos(orbitB) * orbitRadius * .72}px, ${Math.sin(orbitB) * orbitRadius * .72}px) scale(1)`,
            opacity: 1,
            offset: .58,
          },
          {
            transform: `translate(${targetX}px, ${targetY}px) scale(${targetScale})`,
            opacity: .96,
            filter: "blur(0px)",
          },
        ],
        {
          duration: 1120,
          delay: index * 28,
          easing: "cubic-bezier(.2,.78,.16,1)",
          fill: "forwards",
        },
      );
    });

    setTimeout(() => revealPageCopy(), 640);

    Promise.all(animations.map((animation) => animation.finished.catch(() => {}))).then(() => {
      hero.classList.add("hero-orbits-settled");
      entry.animate(
        [
          { opacity: 1 },
          { opacity: 0 },
        ],
        {
          duration: 140,
          easing: "linear",
          fill: "forwards",
        },
      ).finished.finally(() => {
        entry.remove();
        document.documentElement.classList.remove("elo-entry-running");
        enableHeroParallax();
      });
    });
  } else {
    entry?.remove();
    settleHeroCircles();
    revealPageCopy();
    enableHeroParallax();
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
