(() => {
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');
  if (menu && navigation) {
    const closeMenu = () => {
      menu.setAttribute('aria-expanded', 'false');
      menu.textContent = 'Menu';
      navigation.classList.remove('is-open');
    };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      menu.textContent = open ? 'Close' : 'Menu';
      navigation.classList.toggle('is-open', open);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menu.focus();
      }
    });
    navigation.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    const desktop = window.matchMedia('(min-width: 761px)');
    desktop.addEventListener('change', () => closeMenu());
  }
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = String(new Date().getFullYear());
  });
  const details = window.ONE_STOP_DETAILS;
  const address = document.querySelector('#store-address');
  if (!details || !address) return;
  if (details.streetAddress && details.cityStateZip) {
    address.replaceChildren();
    address.append(document.createTextNode(details.streetAddress), document.createElement('br'), document.createTextNode(details.cityStateZip));
    const destination = `${details.streetAddress}, ${details.cityStateZip}`;
    const map = document.createElement('iframe');
    map.title = 'Map showing the new One Stop Liquor location';
    map.loading = 'lazy';
    map.referrerPolicy = 'no-referrer-when-downgrade';
    map.src = `https://maps.google.com/maps?q=${encodeURIComponent(destination)}&output=embed`;
    document.querySelector('#store-map').replaceChildren(map);
    const caption = document.querySelector('#map-caption');
    const mapLink = document.createElement('a');
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
    mapLink.target = '_blank';
    mapLink.rel = 'noopener noreferrer';
    mapLink.textContent = 'Open location in Google Maps';
    caption.replaceChildren(mapLink);
    const directions = document.createElement('a');
    directions.className = 'button';
    directions.textContent = 'Get directions ↗';
    directions.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    directions.target = '_blank';
    directions.rel = 'noopener noreferrer';
    const action = document.querySelector('#directions-action');
    action.hidden = false;
    action.replaceChildren(directions);
  }
  if (details.phoneDisplay && /^\+?[0-9 ()-]+$/.test(details.phoneHref)) {
    const call = document.createElement('a');
    call.href = `tel:${details.phoneHref.replace(/[^+0-9]/g, '')}`;
    call.textContent = details.phoneDisplay;
    document.querySelector('#store-contact').replaceChildren(call);
  }
})();

(() => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('figure')];
  if (slides.length < 2) return;
  const track = carousel.querySelector('.carousel-slides');
  const controls = carousel.querySelector('.carousel-controls');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  const toggle = carousel.querySelector('[data-carousel-toggle]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let playing = !reducedMotion.matches;
  let hovered = false;
  let focused = false;
  let allowFocusedPlayback = false;
  let visible = false;
  let timer;
  let request = 0;
  let pointerStart;

  const dots = slides.map((slide, position) => {
    const title = slide.querySelector('h3').textContent;
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${position + 1} of ${slides.length}: ${title}`);
    slide.querySelector('img').sizes = '(max-width: 380px) calc(100vw - 32px), (max-width: 760px) calc(100vw - 40px), (max-width: 924px) calc(100vw - 64px), 860px';
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show ${title}`);
    dot.setAttribute('aria-controls', 'spotlight-slides');
    dot.addEventListener('click', () => navigate(position));
    dotsContainer.append(dot);
    return dot;
  });

  function render() {
    slides.forEach((slide, position) => {
      const active = position === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      dots[position].setAttribute('aria-current', String(active));
    });
    // Fetch the upcoming photo before its turn without loading extra assets globally.
    slides[(index + 1) % slides.length].querySelector('img').loading = 'eager';
  }

  function syncPlayback() {
    window.clearInterval(timer);
    toggle.textContent = playing ? 'Pause slideshow' : 'Play slideshow';
    track.setAttribute('aria-live', playing ? 'off' : 'polite');
    if (playing && visible && !hovered && (!focused || allowFocusedPlayback) && !document.hidden) {
      timer = window.setInterval(() => show(index + 1), 6000);
    }
  }

  async function show(position) {
    const next = (position + slides.length) % slides.length;
    const currentRequest = ++request;
    const image = slides[next].querySelector('img');
    image.loading = 'eager';
    try { await image.decode(); } catch { /* Keep the current photo if loading fails. */ }
    if (currentRequest !== request || !image.naturalWidth) return;
    index = next;
    render();
  }

  function navigate(position) {
    playing = false;
    syncPlayback();
    show(position);
  }

  carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => navigate(index - 1));
  carousel.querySelector('[data-carousel-next]').addEventListener('click', () => navigate(index + 1));
  toggle.addEventListener('click', () => {
    playing = !playing;
    allowFocusedPlayback = playing;
    syncPlayback();
  });
  carousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    navigate(index + (event.key === 'ArrowRight' ? 1 : -1));
  });
  carousel.addEventListener('pointerenter', event => {
    if (event.pointerType !== 'mouse') return;
    hovered = true;
    syncPlayback();
  });
  carousel.addEventListener('pointerleave', event => {
    if (event.pointerType !== 'mouse') return;
    hovered = false;
    syncPlayback();
  });
  carousel.addEventListener('focusin', () => {
    focused = true;
    allowFocusedPlayback = false;
    syncPlayback();
  });
  carousel.addEventListener('focusout', event => {
    if (carousel.contains(event.relatedTarget)) return;
    focused = false;
    allowFocusedPlayback = false;
    syncPlayback();
  });
  track.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse') return;
    pointerStart = { x: event.clientX, y: event.clientY };
  }, { passive: true });
  track.addEventListener('pointerup', event => {
    if (!pointerStart) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    pointerStart = undefined;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      navigate(index + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
  track.addEventListener('pointercancel', () => { pointerStart = undefined; });
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) playing = false;
    syncPlayback();
  });

  render();
  carousel.classList.add('is-enhanced');
  carousel.tabIndex = 0;
  controls.hidden = false;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      syncPlayback();
    }, { threshold: 0.25 }).observe(carousel);
  } else {
    visible = true;
  }
  syncPlayback();
})();
