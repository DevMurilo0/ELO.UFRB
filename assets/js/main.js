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
  const backdrop = document.querySelector(".menu-backdrop");
  const desktop = matchMedia("(min-width: 1181px)");

  if (button && nav && backdrop) {
    let menuOpen = button.getAttribute("aria-expanded") === "true";

    const syncMenuAccessibility = () => {
      nav.inert = !desktop.matches && !menuOpen;
      button.setAttribute("aria-label", menuOpen ? "Fechar menu" : "Abrir menu");
    };

    const resetMenu = (focus = false) => {
      menuOpen = false;
      button.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.documentElement.classList.remove("menu-open");
      syncMenuAccessibility();
      if (focus) button.focus({ preventScroll: true });
    };

    const openMenu = () => {
      if (desktop.matches || menuOpen) return;
      menuOpen = true;
      button.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
      document.documentElement.classList.add("menu-open");
      syncMenuAccessibility();
    };

    const closeMenu = (focus = false) => {
      if (!menuOpen) return;
      resetMenu(focus);
    };

    button.addEventListener("click", () => {
      if (menuOpen) closeMenu(false);
      else openMenu();
    });

    backdrop.addEventListener("click", () => closeMenu(true));

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuOpen) {
        event.preventDefault();
        closeMenu(true);
      }
    });

    desktop.addEventListener("change", () => resetMenu(false));
    syncMenuAccessibility();
  }

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

  // Internal navigation keeps the existing page transition, including returns home.
  const internalArrival = document.documentElement.classList.contains("transition-arrival");
  if (entry && hero && !internalArrival && !reducedMotion.matches && "animate" in Element.prototype) {
    const duration = 2100;
    const circles = [...hero.querySelectorAll(".hero-orbits i")];
    const markers = [...entry.querySelectorAll(".elo-entry-ball")];
    const heroCopy = [...hero.querySelectorAll(".hero-center-copy > *")];
    const animations = [];
    let flights = [];
    let finalOpacities;
    let finished = false;
    let resizeFrame;
    let observer;
    const smooth = (t) => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
    const smoother = (t) => {
      t = Math.max(0, Math.min(1, t));
      return t ** 3 * (t * (t * 6 - 15) + 10);
    };
    const mix = (a, b, t) => a + (b - a) * t;
    const hermiteProgress = (t, startSlope, endSlope) => {
      const t2 = t * t;
      const t3 = t2 * t;
      return (-2 * t3 + 3 * t2) + startSlope * (t3 - 2 * t2 + t) + endSlope * (t3 - t2);
    };
    const bezier = (a, b, c, d, t) => {
      const inverse = 1 - t;
      return inverse ** 3 * a + 3 * inverse ** 2 * t * b + 3 * inverse * t ** 2 * c + t ** 3 * d;
    };
    const bezierProgress = (progress, x1, y1, x2, y2) => {
      let lower = 0;
      let upper = 1;
      let parameter = progress;
      for (let iteration = 0; iteration < 10; iteration++) {
        parameter = (lower + upper) / 2;
        if (bezier(0, x1, x2, 1, parameter) < progress) lower = parameter;
        else upper = parameter;
      }
      return bezier(0, y1, y2, 1, parameter);
    };
    document.documentElement.classList.add("elo-entry-running");
    heroCopy.forEach((node) => node.classList.add("hero-entry-copy"));
    circles.forEach((node) => { node.style.visibility = "hidden"; });
    header.style.opacity = "0";

    const finish = () => {
      if (finished) return;
      finished = true;
      observer?.disconnect();
      cancelAnimationFrame(resizeFrame);
      removeEventListener("resize", queueMeasure);
      removeEventListener("scroll", queueMeasure);
      window.visualViewport?.removeEventListener("resize", queueMeasure);
      window.visualViewport?.removeEventListener("scroll", queueMeasure);
      removeEventListener("pagehide", finish);
      reducedMotion.removeEventListener("change", onMotionChange);
      animations.forEach((animation) => animation.cancel());
      circles.forEach((node) => { node.style.visibility = ""; });
      header.style.opacity = "";
      heroCopy.forEach((node) => node.classList.remove("hero-entry-copy"));
      entry.remove();
      document.documentElement.classList.remove("elo-entry-running");
    };
    const onMotionChange = () => { if (reducedMotion.matches) finish(); };

    // Read LAST without cancelling the current transforms (also works during resize).
    const getEntryCenter = () => {
      const viewport = window.visualViewport;
      if (viewport) {
        return {
          x: viewport.offsetLeft + viewport.width / 2,
          y: viewport.offsetTop + viewport.height / 2,
        };
      }
      return {
        x: document.documentElement.clientWidth / 2,
        y: document.documentElement.clientHeight / 2,
      };
    };
    const measure = () => {
      const center = getEntryCenter();
      return circles.map((node, index) => {
        const first = markers[index].getBoundingClientRect();
        const last = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        const matrix = new DOMMatrixReadOnly(style.transform === "none" ? undefined : style.transform);
        return {
          x: last.left + last.width / 2 - matrix.m41,
          y: last.top + last.height / 2 - matrix.m42,
          width: parseFloat(style.width), height: parseFloat(style.height),
          firstX: center.x, firstY: center.y,
          firstWidth: first.width, firstHeight: first.height,
          opacity: finalOpacities?.[index] ?? Number(style.opacity),
        };
      });
    };
    const pose = (geometry, index, t) => {
      const mobile = innerWidth <= 760;
      const radius = mobile ? Math.max(75, Math.min(95, innerWidth * .22)) : Math.max(110, Math.min(135, innerWidth * .085));
      const exitAt = .5;
      const targetAngle = Math.atan2(geometry.y - geometry.firstY, geometry.x - geometry.firstX);
      const turns = 1.12;
      const orbitVariation = .028;
      const startAngle = targetAngle - turns * Math.PI * 2;
      const orbitProgress = Math.min(1, t / exitAt);
      // Nearly uniform orbit, with a small organic variation and a wider final arc.
      const angularProgress = orbitProgress - Math.sin(orbitProgress * Math.PI * 2) * orbitVariation;
      const angle = startAngle + turns * Math.PI * 2 * angularProgress;
      const openRadius = radius * (1 + .22 * smoother((orbitProgress - .68) / .32));
      const orbitX = geometry.firstX + Math.cos(angle) * openRadius;
      const orbitY = geometry.firstY + Math.sin(angle) * openRadius;
      const orbitEndSize = geometry.firstWidth * 1.08;
      const growthStartSlope = .07 / .72;
      const orbitSizeRange = geometry.firstWidth * (1.08 - .32);
      const orbitEndSlope = (geometry.width - orbitEndSize) * growthStartSlope * exitAt / (orbitSizeRange * (1 - exitAt));
      const orbitGrowth = hermiteProgress(orbitProgress, .12, orbitEndSlope);
      const orbitSize = geometry.firstWidth * mix(.32, 1.08, orbitGrowth);

      if (t <= exitAt) {
        return { x: orbitX, y: orbitY, width: orbitSize, height: orbitSize };
      }

      // The orbit ends on the target's radial angle. A cubic curve preserves the
      // orbital tangent first, then bends outward and decelerates into the hero.
      const rawTransfer = (t - exitAt) / (1 - exitAt);
      const transferX1 = .32;
      const transferY1 = .34;
      const transfer = bezierProgress(rawTransfer, transferX1, transferY1, .28, 1);
      const growth = bezierProgress(rawTransfer, .72, .07, .7, 1);
      const tangentX = -Math.sin(targetAngle);
      const tangentY = Math.cos(targetAngle);
      const distance = Math.hypot(geometry.x - orbitX, geometry.y - orbitY);
      const radialX = Math.cos(targetAngle);
      const radialY = Math.sin(targetAngle);
      const orbitEndAngularRate = turns * Math.PI * 2 * (1 - Math.PI * 2 * orbitVariation) / exitAt;
      const transferStartRate = (transferY1 / transferX1) / (1 - exitAt);
      const matchedControl = openRadius * orbitEndAngularRate / (3 * transferStartRate);
      const firstControl = Math.min(matchedControl, Math.max(distance * 1.4, openRadius * .12));
      const finalControl = Math.min(distance * .22, Math.max(openRadius, geometry.width * .28));
      const control1X = orbitX + tangentX * firstControl;
      const control1Y = orbitY + tangentY * firstControl;
      const control2X = geometry.x - radialX * finalControl;
      const control2Y = geometry.y - radialY * finalControl;
      return {
        x: bezier(orbitX, control1X, control2X, geometry.x, transfer),
        y: bezier(orbitY, control1Y, control2Y, geometry.y, transfer),
        width: mix(orbitSize, geometry.width, growth),
        height: mix(orbitSize, geometry.height, growth),
      };
    };
    const keyframes = (geometry, index, from = 0, current) => {
      const firstPose = pose(geometry, index, from);
      return Array.from({ length: 181 }, (_, step) => {
        const fraction = step / 180;
        const t = mix(from, 1, fraction);
        const point = pose(geometry, index, t);
        if (current) {
          // Preserve the visible position and decay the resize correction smoothly.
          const correction = 1 - smooth(fraction);
          for (const key of ["x", "y", "width", "height"])
            point[key] += (current[key] - firstPose[key]) * correction;
        }
        return {
          offset: fraction,
          transform: `translate3d(${point.x - geometry.x}px, ${point.y - geometry.y}px, 0) scale(${point.width / geometry.width}, ${point.height / geometry.height})`,
          opacity: geometry.opacity * smooth(t / .085),
        };
      });
    };
    const queueMeasure = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        if (finished || !flights.length) return;
        const now = Number(animations[0].currentTime || 0);
        if (now >= duration) return;
        const current = circles.map((node) => {
          const r = node.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2, width: r.width, height: r.height };
        });
        const geometry = measure();
        flights.forEach((animation, index) => {
          animation.effect.setKeyframes(keyframes(geometry[index], index, now / duration, current[index]));
          animation.effect.updateTiming({ duration: duration - now });
          animation.startTime = animations[0].startTime + now;
        });
      });
    };
    requestAnimationFrame(() => {
      if (finished) return;
      if (reducedMotion.matches) { finish(); return; }
      const geometry = measure();
      finalOpacities = geometry.map((item) => item.opacity); // All layout reads precede all animation writes.
      const backdrop = entry.animate([
        { opacity: 1, offset: 0 },
        { opacity: 1, offset: .5 },
        { opacity: .6, offset: .7 },
        { opacity: .2, offset: .86 },
        { opacity: 0, offset: 1 },
      ], { duration, fill: "both", easing: "cubic-bezier(.22,.61,.24,1)" });
      animations.push(backdrop);
      flights = circles.map((node, index) => {
        // Easing is sampled into the curved path, not a linear orbital motion.
        const animation = node.animate(keyframes(geometry[index], index), { duration, fill: "both" });
        node.style.visibility = "";
        animations.push(animation);
        return animation;
      });
      const reveal = (node, delay, blur = true) => {
        animations.push(node.animate([
          { opacity: 0, filter: blur ? "blur(7px)" : "none", transform: "translate3d(0, 7px, 0)" },
          { opacity: 1, filter: "blur(0px)", transform: "translate3d(0, 0, 0)" },
        ], { duration: 400, delay, fill: "both", easing: "cubic-bezier(.22,.75,.18,1)" }));
      };
      reveal(header, 1550, false);
      heroCopy.forEach((node, index) => reveal(node, 1560 + index * 30));
      const startTime = document.timeline.currentTime;
      animations.forEach((animation) => { animation.startTime = startTime; });
      backdrop.finished.then(finish).catch(() => {});
      observer = new ResizeObserver(queueMeasure);
      observer.observe(hero);
      circles.forEach((circle) => observer.observe(circle));
      addEventListener("resize", queueMeasure, { passive: true });
      addEventListener("scroll", queueMeasure, { passive: true });
      window.visualViewport?.addEventListener("resize", queueMeasure, { passive: true });
      window.visualViewport?.addEventListener("scroll", queueMeasure, { passive: true });
      addEventListener("pagehide", finish, { once: true });
      reducedMotion.addEventListener("change", onMotionChange);
      // Fonts may settle later; retarget without delaying the introduction.
      document.fonts?.ready.then(() => { if (!finished) queueMeasure(); });
    });
  } else {
    entry?.remove();
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
