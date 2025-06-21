// Play once when in view
const gifs = document.querySelectorAll('.interactive-gif');
const options = { threshold: 0.5 };

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.gif;
      obs.unobserve(img); // only play once
    }
  });
}, options);

gifs.forEach(gif => {
  observer.observe(gif);

  // Hover control
  gif.addEventListener('mouseenter', () => {
    gif.src = gif.dataset.gif;
  });

  gif.addEventListener('mouseleave', () => {
    gif.src = gif.dataset.still;
  });
});
