const toggleButtons = document.querySelectorAll('button[data-target]');

toggleButtons.forEach(button => {
  const imgIds = button.getAttribute('data-target').split(',');
  const textIds = (button.getAttribute('data-text') || '').split(',');
  const originalText = button.textContent;

  const targetElements = [...imgIds, ...textIds]
    .map(id => document.getElementById(id.trim()))
    .filter(Boolean);

  button.addEventListener('click', function () {
    const isHidden = targetElements[0].classList.contains('hidden');

    // Step 1: Hide all other open items
    toggleButtons.forEach(otherBtn => {
      if (otherBtn !== button) {
        const otherImgIds = otherBtn.getAttribute('data-target').split(',');
        const otherTextIds = (otherBtn.getAttribute('data-text') || '').split(',');
        const otherElements = [...otherImgIds, ...otherTextIds]
          .map(id => document.getElementById(id.trim()))
          .filter(Boolean);

        otherElements.forEach(el => {
          el.classList.add('hidden');
          el.classList.remove('fade-in');
        });

        otherBtn.textContent = otherBtn.getAttribute('data-original') || 'View example';
      }
    });

    // Step 2: Toggle this one
    targetElements.forEach(el => {
      if (isHidden) {
        el.classList.remove('hidden');
        el.classList.add('fade-in');
      } else {
        el.classList.add('hidden');
        el.classList.remove('fade-in');
      }
    });

    button.textContent = isHidden ? 'Hide' : originalText;
  });

  // Save the original label for reset
  button.setAttribute('data-original', originalText);
});
