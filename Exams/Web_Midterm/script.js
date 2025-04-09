
document.addEventListener("DOMContentLoaded", () => {
    const megaMenuToggle = document.getElementById("megaMenuToggle");
    const megaMenu = document.getElementById("megaMenu");
  
    // Toggle menu on button click
    megaMenuToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent event from reaching document click
      megaMenu.classList.toggle("active");
    });
  
    // Close if clicking outside the mega menu
    document.addEventListener("click", (e) => {
      if (!megaMenu.contains(e.target) && e.target !== megaMenuToggle) {
        megaMenu.classList.remove("active");
      }
    });
  });
  