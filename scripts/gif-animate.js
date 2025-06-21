 document.addEventListener("DOMContentLoaded", () => {
            const gifs = document.querySelectorAll('.interactive-gif');

            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.gif;

                        // After one play, go back to still (adjust time to GIF length)
                        setTimeout(() => {
                            img.src = img.dataset.still;
                        }, 3000); // Change 3000 to match your GIF duration in ms

                        obs.unobserve(img);
                    }
                });
            }, { threshold: 0.5 });

            gifs.forEach(gif => {
                observer.observe(gif);

                gif.addEventListener('mouseenter', () => {
                    gif.src = gif.dataset.gif;
                });

                gif.addEventListener('mouseleave', () => {
                    gif.src = gif.dataset.still;
                });
            });
        });