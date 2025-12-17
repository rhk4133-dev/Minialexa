document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formResponse = document.getElementById("formResponse");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple validation (HTML required attributes already help)
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      formResponse.style.color = "red";
      formResponse.textContent = "Please fill in all fields.";
      return;
    }

    // Dummy form submission simulation
    formResponse.style.color = "#22c55e";
    formResponse.textContent = "Sending message...";

    setTimeout(() => {
      formResponse.textContent = "Thanks for reaching out! We'll get back to you soon.";
      contactForm.reset();
    }, 1500);
  });
});
