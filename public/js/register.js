const registerFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-input").value.trim();
  const password = document.querySelector("#password-input").value.trim();

  if (username && password) {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to register.");
    }
  }
};

document
  .querySelector("#register-form")
  .addEventListener("submit", registerFormHandler);
