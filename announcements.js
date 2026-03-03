let posts = JSON.parse(localStorage.getItem("announcements")) || [];

function save() {
    localStorage.setItem("announcements", JSON.stringify(posts));
}

function addAnnouncement() {
    let title = document.getElementById("aTitle").value;
    let content = document.getElementById("aContent").value;

    if (!title.trim() || !content.trim()) {
        return alert("Fill all fields.");
    }

    posts.unshift({
        type: "Announcement",
        title,
        content,
        date: new Date().toISOString(),
        approved: false
    });

    save();
    clearFields();
    render();
}

function addEvent() {
    let title = document.getElementById("eTitle").value;
    let date = document.getElementById("eDate").value;
    let content = document.getElementById("eContent").value;

    if (!title.trim() || !date || !content.trim()) {
        return alert("Fill all event fields.");
    }

    posts.unshift({
        type: "Event",
        title,
        content,
        eventDate: date,
        date: new Date().toISOString(),
        approved: false
    });

    save();
    clearFields();
    render();
}

function clearFields() {
    document.querySelectorAll("input, textarea").forEach(el => el.value = "");
}

function render() {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    let approvedPosts = posts.filter(p => p.approved);

    approvedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    approvedPosts.forEach(p => {

        let status = "";
        if (p.type === "Event") {
            let today = new Date().toISOString().split("T")[0];
            status = p.eventDate >= today 
    ? "<span class='status-upcoming'>Upcoming</span>"
    : "<span class='status-past'>Past</span>";
        }

        feed.innerHTML += `
            <div class="card">
                <strong>${p.type}</strong>
                <h3>${p.title}</h3>
                <p>${p.content}</p>
                ${p.type === "Event" ? `<p class="event-date">Date: ${p.eventDate} - ${status}</p>` : ""}
                <div class="post-time">
                    Posted: ${new Date(p.date).toLocaleString()}
                </div>
            </div>
        `;
    });
}

render();