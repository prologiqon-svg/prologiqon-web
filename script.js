document.addEventListener("DOMContentLoaded", () => {
  // MOBILNÉ MENU
  const menuButton = document.querySelector(".site-header .menu");
  const navLinks = document.querySelector(".site-header .links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Zavrieť menu" : "Otvoriť menu"
      );
    });

    // Po kliknutí na položku menu ho zatvor
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Otvoriť menu");
      });
    });

    // Zatvorenie menu klávesom Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Otvoriť menu");
      }
    });
  }

  // KONTAKTNÝ FORMULÁR
  const form = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");

  if (form && formNote) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const button = form.querySelector('button[type="submit"]');
      const originalText = button ? button.textContent : "";

      formNote.classList.remove("success");
      formNote.textContent = "Odosielam správu...";

      if (button) {
        button.disabled = true;
      }

      try {
        const response = await fetch(
          "https://api.web3forms.com/submit",
          {
            method: "POST",
            body: new FormData(form)
          }
        );

        const result = await response.json();

        if (response.ok && result.success) {
          formNote.classList.add("success");
          formNote.textContent =
            "✓ DOPYT ÚSPEŠNE ODOSLANÝ! Ďakujeme za správu. Čoskoro sa vám ozveme.";

          formNote.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

          form.reset();
        } else {
          formNote.textContent =
            "Správu sa nepodarilo odoslať. Skontrolujte nastavenie formulára alebo nám zavolajte.";
        }
      } catch (error) {
        formNote.textContent =
          "Nepodarilo sa pripojiť k službe. Skúste to znova alebo nám zavolajte.";
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = originalText;
        }
      }
    });
  }
});
