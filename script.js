document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");

  if (!form || !formNote) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    formNote.textContent = "Odosielam správu...";
    button.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form)
      });

      const result = await response.json();

      if (response.ok && result.success) {
       formNote.classList.add("success");
formNote.textContent = "✓ DOPYT ÚSPEŠNE ODOSLANÝ! Ďakujeme za správu. Čoskoro sa vám ozveme.";
formNote.scrollIntoView({ behavior: "smooth", block: "center" });
        form.reset();
      } else {
        formNote.textContent =
          "Správu sa nepodarilo odoslať. Skontrolujte nastavenie formulára alebo nám zavolajte.";
      }
    } catch (error) {
      formNote.textContent =
        "Nepodarilo sa pripojiť k službe. Skúste to znova alebo nám zavolajte.";
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
});
