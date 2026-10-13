  }
    );

    const result = await response.json();

    if (response.ok && result.success) {
      formNote.textContent =
        'Ďakujeme za váš dopyt. Správa bola úspešne odoslaná.';
      form.reset();
    } else {
      formNote.textContent =
        'Správu sa nepodarilo odoslať. Skúste to znova alebo nám zavolajte.';
    }
  } catch (error) {
    formNote.textContent =
      'Nepodarilo sa pripojiť k službe. Skúste to znova alebo nám zavolajte.';
  } finally {
    button.disabled = false;
    button.innerText = originalText;
  }
});
