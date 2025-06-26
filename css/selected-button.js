
  document.querySelectorAll('.allinone-page .page-nav a').forEach(link => {
    link.addEventListener('click', function () {
      document.querySelectorAll('.allinone-page .page-nav a')
        .forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
