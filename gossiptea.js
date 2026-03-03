
let posts = JSON.parse(localStorage.getItem("gossipPosts")) || [];

function savePosts() {
    localStorage.setItem("gossipPosts", JSON.stringify(posts));
}

function addConfession() {
    let text = document.getElementById("confessionText").value;
    let category = document.getElementById("category").value;
    let imageFile = document.getElementById("imageUpload").files[0];
    let audioFile = document.getElementById("audioUpload").files[0];

    if (text.trim() === "") return alert("Write something!");

    let post = {
        text,
        category,
        image: imageFile ? URL.createObjectURL(imageFile) : null,
        audio: audioFile ? URL.createObjectURL(audioFile) : null,
        likes: 0,
        comments: [],
        pinned: false,
        time: new Date().toLocaleString()
    };

    posts.unshift(post);
    savePosts();
    displayPosts();
    document.getElementById("confessionText").value = "";
}

function displayPosts(filter = "All") {
    let feed = document.getElementById("feed");
    feed.innerHTML = "";

    posts.forEach((post, index) => {
        if (filter !== "All" && post.category !== filter) return;

        let card = document.createElement("div");
        card.className = "card" + (post.pinned ? " pinned" : "");

        card.innerHTML = `
            <div class="category">${post.category}</div>
            <p>${post.text}</p>
            ${post.image ? `<img src="${post.image}">` : ""}
            ${post.audio ? `<audio controls src="${post.audio}"></audio>` : ""}
            
            <div class="reactions">
                <span class="action-btn" onclick="likePost(${index})">❤️ ${post.likes}</span>
                <span class="action-btn" onclick="pinPost(${index})">📌 Pin</span>
                <span class="action-btn" onclick="deletePost(${index})">🗑 Delete</span>
                <span class="action-btn" onclick="reportPost()">🚨 Report</span>
            </div>

            <div class="comment-box">
                <input type="text" id="commentInput${index}" placeholder="Add a comment...">
                <button onclick="addComment(${index})">Send</button>
            </div>

            <div>
                ${post.comments.map(c => `<div class="comment">💬 ${c}</div>`).join("")}
            </div>

            <div class="timestamp">${post.time}</div>
        `;

        feed.appendChild(card);
    });
}

function likePost(index) {
    posts[index].likes++;
    savePosts();
    displayPosts();
}

function addComment(index) {
    let input = document.getElementById("commentInput" + index);
    if (input.value.trim() === "") return;

    posts[index].comments.push(input.value);
    input.value = "";
    savePosts();
    displayPosts();
}

function deletePost(index) {
    posts.splice(index, 1);
    savePosts();
    displayPosts();
}

function pinPost(index) {
    posts[index].pinned = !posts[index].pinned;
    savePosts();
    displayPosts();
}

function reportPost() {
    alert("This post has been reported to admin.");
}

function filterPosts(category) {
    displayPosts(category);
}

displayPosts();
