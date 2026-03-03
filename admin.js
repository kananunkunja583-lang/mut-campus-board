function login() {
    const pass = document.getElementById("password").value;
    if (pass !== "admin123") return alert("Wrong password");

    loadPosts();
}

function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("gossip")) || [];
    let area = document.getElementById("adminArea");
    area.innerHTML = "";

    posts.forEach((p, i) => {
        area.innerHTML += `
            <div class="card">
                ${p.text}
                <button onclick="approve(${i})">Approve</button>
                <button onclick="deletePost(${i})">Delete</button>
            </div>
        `;
    });
}

function approve(i) {
    let posts = JSON.parse(localStorage.getItem("gossip"));
    posts[i].approved = true;
    localStorage.setItem("gossip", JSON.stringify(posts));
    loadPosts();
}

function deletePost(i) {
    let posts = JSON.parse(localStorage.getItem("gossip"));
    posts.splice(i,1);
    localStorage.setItem("gossip", JSON.stringify(posts));
    loadPosts();
}
function loadAnnouncements() {
    let posts = JSON.parse(localStorage.getItem("announcements")) || [];
    let area = document.getElementById("adminArea");

    area.innerHTML += "<h2>Announcements & Events</h2>";

    posts.forEach((p, i) => {
        area.innerHTML += `
            <div class="card">
                <strong>${p.type}</strong> - ${p.title}
                <button onclick="approveAnnouncement(${i})">Approve</button>
                <button onclick="deleteAnnouncement(${i})">Delete</button>
            </div>
        `;
    });
}

function approveAnnouncement(i) {
    let posts = JSON.parse(localStorage.getItem("announcements"));
    posts[i].approved = true;
    localStorage.setItem("announcements", JSON.stringify(posts));
    loadPosts();
}

function deleteAnnouncement(i) {
    let posts = JSON.parse(localStorage.getItem("announcements"));
    posts.splice(i,1);
    localStorage.setItem("announcements", JSON.stringify(posts));
    loadPosts();
}