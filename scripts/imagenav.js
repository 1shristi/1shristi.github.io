const toggleButtons = document.querySelectorAll('.toggle-btn');


toggleButtons.forEach(button => {
    const targetId = button.getAttribute('data-target');
    const img = document.getElementById(targetId);
    const originalText = button.textContent; // Store the original text of the button

    button.addEventListener('click', function () {
        if (img.style.display === 'none' || img.style.display === '') {
            img.style.display = 'block';
            button.textContent = 'Hide';
        } else {
            img.style.display = 'none';
             button.textContent = originalText; // Reset to original text
        }
    });
});
