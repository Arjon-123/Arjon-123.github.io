document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("comment-form");
    const commentsContainer = document.getElementById("comments-container");

    loadComments();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const commentText = document.getElementById("comment").value.trim();

        if (username && commentText) {
            const comment = {
                id: Date.now(),
                username,
                commentText,
                timestamp: new Date().toLocaleString()
            };

            addCommentToDOM(comment);
            saveCommentToLocalStorage(comment);

            form.reset();
        }
    });

    function addCommentToDOM(comment) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.setAttribute("data-id", comment.id);

        commentDiv.innerHTML = `
            <p><strong>${comment.username}</strong> <em>(${comment.timestamp})</em></p>
            <p>${comment.commentText}</p>
            <button class="delete-btn">Delete</button>
        `;

        const deleteBtn = commentDiv.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => deleteComment(comment.id));

        commentsContainer.prepend(commentDiv);
    }

    function saveCommentToLocalStorage(comment) {
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.push(comment);
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.reverse().forEach(addCommentToDOM); // Newest first
    }

    function deleteComment(id) {
        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments = comments.filter(comment => comment.id !== id);
        localStorage.setItem("comments", JSON.stringify(comments));

        const commentDiv = document.querySelector(`.comment[data-id="${id}"]`);
        if (commentDiv) {
            commentDiv.remove();
        }
    }
});
