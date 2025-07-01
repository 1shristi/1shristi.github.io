// Your existing section setup
const sections = document.querySelectorAll("section");
let currentIndex = 0;
let isThrottled = false;


// Throttle helper
const throttleScroll = () => {
  if (isThrottled) return true;
  isThrottled = true;
  setTimeout(() => isThrottled = false, 800);
  return false;
};

// Scroll function
function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;
  currentIndex = index;
  sections[currentIndex].scrollIntoView({ behavior: "smooth" });
}

// Mouse scroll
window.addEventListener("wheel", (e) => {
  if (throttleScroll()) return;

  if (e.deltaY > 0) scrollToSection(currentIndex + 1);
  else scrollToSection(currentIndex - 1);
});

// 🔥 NEW: Keyboard arrow support
window.addEventListener("keydown", (e) => {
  if (throttleScroll()) return;

  if (e.key === "ArrowDown") scrollToSection(currentIndex + 1);
  if (e.key === "ArrowUp") scrollToSection(currentIndex - 1);
});

sections[0].scrollIntoView({ behavior: "instant" });

