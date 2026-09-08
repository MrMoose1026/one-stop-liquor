(() => {
  document.documentElement.classList.add('js');
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');
  if (menu && navigation) {
    menu.hidden = false;
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
