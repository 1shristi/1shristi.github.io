const toggleButtons = document.querySelectorAll('.toggle-btn');

toggleButtons.forEach(button => {
    const targetId = button.getAttribute('data-target');
    const img = document.getElementById(targetId);

    button.addEventListener('click', function () {
        if (img.style.display === 'none' || img.style.display === '') {
            img.style.display = 'block';
            button.textContent = 'Hide';
        } else {
            img.style.display = 'none';
            button.textContent = 'Reveal';
        }
    });
});
