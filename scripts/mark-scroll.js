document.addEventListener('DOMContentLoaded', () => {
  // Cache the navigation links
  const navigationLinks = [...document.querySelectorAll('.page-nav a[href^="#"]')];
  // Build the list of scroll targets from nav hrefs
  const scrollTargets = navigationLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean)
    .reverse();

  // Map each id to its nav link
  let idToAnchor = {};
  navigationLinks.forEach(link => {
    const id = link.getAttribute('href').replace('#', '');
    idToAnchor[id] = link;
  });

  // Throttle function, enforces a minimum time interval
  function throttle(fn, interval) {
    let lastCall, timeoutId;
    return () => {
      const now = new Date().getTime();
      if (lastCall && now < (lastCall + interval)) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          lastCall = now;
          fn.call();
        }, interval - (now - lastCall));
      } else {
        lastCall = now;
        fn.call();
      }
    }
  }

  function highlightNavigation() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    for (let el of scrollTargets) {
      if (scrollPosition >= el.offsetTop - 10) {
        const navLink = idToAnchor[el.id];
        if (navLink) {
          setSelected(navLink, navigationLinks);
        } else {
          setSelected(navigationLinks[0], navigationLinks);
        }
        break;
      }
    }
  }

  function setSelected(elementToSet, navigationLinks) {
    navigationLinks.forEach(item => item?.classList.remove('selected'));
    elementToSet.classList.add('selected');
  }

  window.addEventListener('scroll', throttle(highlightNavigation, 150));
});