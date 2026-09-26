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

  if (entry && !reducedMotion.matches && "animate" in Element.prototype) {
    document.documentElement.classList.add("elo-entry-running");
    const balls = [...entry.querySelectorAll(".elo-entry-ball")];
    const radius = Math.min(innerWidth, innerHeight) < 700 ? 72 : 108;
    const loops = 2.35;
    const finalOffsets = [
      [0, -34],
      [-37, 22],
      [37, 22],
    ];

    const animations = balls.map((ball, index) => {
      const phase = index * ((Math.PI * 2) / 3);
      const frames = [];
      const steps = 14;
      for (let step = 0; step <= steps; step++) {
        const progress = step / steps;
        const spinProgress = Math.min(progress / .76, 1);
        const angle = phase + spinProgress * Math.PI * 2 * loops;
        const radiusNow = radius * (1 - Math.pow(spinProgress, 1.35) * .44);
        let x = Math.cos(angle) * radiusNow;
        let y = Math.sin(angle) * radiusNow;
        let scale = .18 + Math.min(progress / .24, 1) * .82;
        let opacity = Math.min(progress / .12, 1);

        if (progress > .76) {
          const settle = (progress - .76) / .24;
          const ease = 1 - Math.pow(1 - settle, 3);
          x = x * (1 - ease) + finalOffsets[index][0] * ease;
          y = y * (1 - ease) + finalOffsets[index][1] * ease;
          scale = scale * (1 - ease) + .72 * ease;
        }

        frames.push({
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          opacity,
          filter: progress < .12 ? `blur(${(1 - progress / .12) * 8}px)` : "blur(0px)",
          offset: progress,
        });
      }

      return ball.animate(frames, {
        duration: 2300,
        delay: index * 45,
        easing: "linear",
        fill: "forwards",
      });
    });

    Promise.all(animations.map((animation) => animation.finished.catch(() => {}))).then(() => {
      entry.classList.add("is-formed");
      setTimeout(() => {
        settleHeroCircles();
        revealPageCopy();
        entry.animate(
          [
            { opacity: 1, filter: "blur(0px)" },
            { opacity: 0, filter: "blur(7px)" },
          ],
          {
            duration: 620,
            easing: "cubic-bezier(.3,.7,.2,1)",
            fill: "forwards",
          },
        ).finished.finally(() => {
          entry.remove();
          document.documentElement.classList.remove("elo-entry-running");
          enableHeroParallax();
        });
      }, 360);
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
