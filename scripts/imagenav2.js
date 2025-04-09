// Get references to the buttons and the overlay image
const showOverlay = document.getElementById('showMenu');
const hideOverlay = document.getElementById('hideMenu');
const overlayImageMenu = document.getElementById('overlayImageMenuID');

// Add event listeners to the buttons
showOverlay.addEventListener('click', () => {
    overlayImageMenu.style.opacity = '1'; // Make the overlay visible
});

hideOverlay.addEventListener('click', () => {
    overlayImageMenu.style.opacity = '1'; // Hide the overlay
});
