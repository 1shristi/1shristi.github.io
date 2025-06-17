const toggleButtons = document.querySelectorAll('button[data-target]');

toggleButtons.forEach(button => {
  const img = document.getElementById(button.getAttribute('data-target'));
  const text = document.getElementById(button.getAttribute('data-text'));
  const originalText = button.textContent;

  button.addEventListener('click', function () {
    const shouldShow = img.style.display === 'none' || img.style.display === '';

    img.style.display = shouldShow ? 'block' : 'none';
    if (text) text.style.display = shouldShow ? 'block' : 'none';

    button.textContent = shouldShow ? 'Hide' : originalText;
  });
});
