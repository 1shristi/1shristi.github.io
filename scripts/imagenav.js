
        const toggleButton = document.getElementById('toggle-btn');
        const img = document.getElementById(toggleButton.getAttribute('data-target'));

        toggleButton.addEventListener('click', function () {
            if (img.style.display === 'none' || img.style.display === '') {
                img.style.display = 'block'; // Show the image
                toggleButton.textContent = 'Hide'; // Change button text to "Hide"
            } else {
                img.style.display = 'none'; // Hide the image
                toggleButton.textContent = 'Reveal'; // Change button text to "Reveal"
            }
        });
    

