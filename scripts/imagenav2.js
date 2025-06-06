const toggleDashboard = document.querySelectorAll('.toggle-dash');

toggleDashboard.forEach(button => {
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


///
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

OG code 

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

HTML related to the above code 
                       <button class="button2" id="showOverlay1">Reveal details</button> 
                       <button class="button2" id="hideOverlay1">Hide details</button>
                       <br>
                                   <!-- UI image explanation -->
                                   <div class="image-stack img-1 mt-10 mb-10">
                                     <img src="./images/piechart1.png" alt="Static Image 1" class="static-image">
                                     <img src="./images/piechart2.png" alt="Overlay Image 1" class="overlay-image" id="overlayImage1" style="opacity: 0;">
                                 </div>