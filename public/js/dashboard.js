const newPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create post.");
    }
  }
};

const editPostHandler = (event) => {
  const postElement = event.target.closest(".post");
  const titleElement = postElement.querySelector("h3");
  const contentElement = postElement.querySelector("#post-box-content");

  titleElement.contentEditable = true;
  contentElement.contentEditable = true;

  titleElement.focus();
  event.target.textContent = "Save";
  event.target.removeEventListener("click", editPostHandler);
  event.target.addEventListener("click", savePostHandler);
};

const savePostHandler = async (event) => {
  const postElement = event.target.closest(".post");
  const postId = postElement.dataset.postId;
  const titleElement = postElement.querySelector("h3");
  const contentElement = postElement.querySelector("#post-box-content");

  const title = titleElement.textContent.trim();
  const content = contentElement.textContent.trim();

  if (title && content) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      titleElement.contentEditable = false;
      contentElement.contentEditable = false;
      event.target.textContent = "Edit";
      event.target.removeEventListener("click", savePostHandler);
      event.target.addEventListener("click", editPostHandler);
    } else {
      alert("Failed to update post.");
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const newPostBtn = document.getElementById("new-post-btn");
  const newPostContainer = document.getElementById("new-post-container");

  newPostBtn.addEventListener("click", function () {
    if (newPostContainer.style.display === "none") {
      newPostContainer.style.display = "block";
    } else {
      newPostContainer.style.display = "none";
    }
  });
});

document
  .getElementById("new-post-form")
  .addEventListener("submit", newPostFormHandler);

const editButtons = document.querySelectorAll(".edit-post-btn");
editButtons.forEach((button) => {
  button.addEventListener("click", editPostHandler);
});
