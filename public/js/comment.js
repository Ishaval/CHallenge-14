const submitCommentHandler = async (event) => {
  const postId = document.querySelector('input[name="postId"]').value;
  const content = document.querySelector('textarea[name="content"]').value;

  if (content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content, post_id: postId }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const comment = await response.json();
      displayNewComment(comment);
      event.target.reset();
    } else {
      alert("Failed to submit comment.");
    }
  }
};

document
  .getElementById("new-comment-form")
  .addEventListener("submit", submitCommentHandler);
