const WEB3FORMS_ACCESS_KEY = "2a18a0a9-0fba-4fbd-9d1a-6eef2d2d5318";

const copyBtn = document.getElementById("copy-install");
const installText = document.getElementById("install-text");
if (copyBtn && installText) {
  copyBtn.addEventListener("click", async () => {
    const text = installText.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = "Copied";
    } catch {
      copyBtn.textContent = "Copy failed";
    }
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1600);
  });
}

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

function setStatus(message, kind) {
  statusEl.textContent = message;
  statusEl.className = "form-status" + (kind ? " " + kind : "");
}

if (form) form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.startsWith("YOUR_")) {
    setStatus("The contact form is not configured yet. Email business@tricombinator.com.", "err");
    return;
  }

  const data = new FormData(form);
  if (!data.get("name") || !data.get("email") || !data.get("message")) {
    setStatus("Please fill in name, email, and message.", "err");
    return;
  }

  data.append("access_key", WEB3FORMS_ACCESS_KEY);
  data.append("from_name", "tricombinator.com");

  submitBtn.disabled = true;
  setStatus("Sending…");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });
    const result = await response.json();

    if (result.success) {
      form.reset();
      setStatus("Message sent. We will get back to you shortly.", "ok");
    } else {
      setStatus(result.message || "Something went wrong. Please try again.", "err");
    }
  } catch {
    setStatus("Network error. Please try again, or email business@tricombinator.com.", "err");
  } finally {
    submitBtn.disabled = false;
  }
});
