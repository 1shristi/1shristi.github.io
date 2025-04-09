// Get references to the buttons and the overlay image
const showOverlay1Button = document.getElementById('showOverlay1');
const hideOverlayButton = document.getElementById('hideOverlay1');
const overlayImage1 = document.getElementById('overlayImage1');

// Add event listeners to the buttons
showOverlay1Button.addEventListener('click', () => {
    overlayImage1.style.opacity = '1'; // Make the overlay visible
});

hideOverlayButton.addEventListener('click', () => {
    overlayImage1.style.opacity = '0'; // Hide the overlay
});



// Get references to the buttons and the overlay image
const showOverlay = document.getElementById('showMenu');
const hideOverlay = document.getElementById('hideMenu');
const overlayImageMenu = document.getElementById('overlayImageMenuID');

// Add event listeners to the buttons
showOverlay.addEventListener('click', () => {
    overlayImageMenu.style.opacity = '1'; // Make the overlay visible
});

hideOverlay.addEventListener('click', () => {
    overlayImageMenu.style.opacity = '0'; // Hide the overlay
});