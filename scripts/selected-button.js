console.log("Script loaded!");
// This script adds an 'active' class to the clicked link in the navigation
  document.querySelectorAll('.allinone-page .page-nav a').forEach(link => {
    link.addEventListener('click', function () {
      document.querySelectorAll('.allinone-page .page-nav a')
        .forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".page-nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});

