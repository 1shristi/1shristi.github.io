const toggleButtons = document.querySelectorAll('button[data-target]');

toggleButtons.forEach(button => {
  const imgIds = button.getAttribute('data-target').split(',');
  const textIds = (button.getAttribute('data-text') || '').split(',');
  const originalText = button.textContent;

  const allElements = [...imgIds, ...textIds]
    .map(id => document.getElementById(id.trim()))
    .filter(Boolean); // filter out any nulls

  button.addEventListener('click', function () {
    const shouldShow = allElements[0].style.display === 'none' || allElements[0].style.display === '';

    allElements.forEach(el => {
      el.style.display = shouldShow ? 'block' : 'none';
    });

    button.textContent = shouldShow ? 'Hide' : originalText;
  });
});
