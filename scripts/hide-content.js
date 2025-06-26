const hiddenContent = document.querySelector('.hidden-content');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    hiddenContent.classList.add('show-content');
  }
});