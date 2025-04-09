(() => {
  // Cache the navigation links
  const navigationLinks = [...document.querySelectorAll('nav > .page-nav a')]
  // Cache (in reversed order) the sections
  const sections = [...document.getElementsByTagName('section')].reverse()

  // Map each section id to their corresponding navigation link
  let sectionToAnchor = {}

  for (section of sections) {
    const anchor = document.querySelector(`nav > .page-nav a[href=\\#${section.id}]`)
    if (anchor) {
      sectionToAnchor[section.id] = anchor
    }
  }

  // Throttle function, enforces a minimum time interval
  function throttle(fn, interval) {
    let lastCall, timeoutId
    return () => {
      const now = new Date().getTime()
      if (lastCall && now < (lastCall + interval)) {
        // If we are inside the interval we wait
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          lastCall = now
          fn.call()
        }, interval - (now - lastCall))
      } else {
        // Otherwise, we directly call the function 
        lastCall = now
        fn.call()
      }
    }
  }

  function highlightNavigation() {
    // Get the current vertical position of the scroll bar
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop

    // We are at the bottom of the page so set selected item to conclusion
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
      const bottomNavigationLink = navigationLinks[navigationLinks.length - 1]
      setSelected(bottomNavigationLink, navigationLinks)
      return
    }

    for (section of sections) {
      const sectionTop = section.offsetTop
      // If the user has scrolled over the top of the section
      if (scrollPosition >= sectionTop - 10) {
        // Get the corresponding navigation link
        const navigationLink = sectionToAnchor[section.id]

        if (navigationLink) {
          if (!navigationLink.classList.contains('selected')) {
            // Add .selected class to the current link
            navigationLink.classList.add('selected')
            setSelected(navigationLink, navigationLinks)
          }
        } else {
          // Default overview to be selected if no other item fits
          const topNavigationLink = navigationLinks[0]
          setSelected(topNavigationLink, navigationLinks)
        }
        // We have found our section, so we break the loop
        break
      }
    }
  }

  function setSelected(elementToSet, navigationLinks) {
    // Remove .selected class from all the links
    navigationLinks.forEach(item => item?.classList.remove('selected'))
    elementToSet.classList.add('selected')
  }

  window.addEventListener('scroll', throttle(highlightNavigation, 150))
})()
