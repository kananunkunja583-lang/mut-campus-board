
let businesses = JSON.parse(localStorage.getItem("campusBusinesses")) || [];

function saveBiz() {
    localStorage.setItem("campusBusinesses", JSON.stringify(businesses));
}

function addBusiness() {
    let name = document.getElementById("bizName").value;
    let category = document.getElementById("bizCategory").value;
    let desc = document.getElementById("bizDesc").value;
    let contact = document.getElementById("bizContact").value;
    let imageFile = document.getElementById("bizImage").files[0];

    if (!name || !desc || !contact) return alert("Fill all required fields!");

    let biz = {
        name,
        category,
        desc,
        contact,
        image: imageFile ? URL.createObjectURL(imageFile) : null,
        likes: 0,
        featured: false,
        time: new Date().toLocaleString()
    };

    businesses.unshift(biz);
    saveBiz();
    displayBiz();
}

function displayBiz(filter = "All") {
    let grid = document.getElementById("marketGrid");
    grid.innerHTML = "";

    businesses.forEach((biz, index) => {
        if (filter !== "All" && biz.category !== filter) return;

        let card = document.createElement("div");
        card.className = "card" + (biz.featured ? " featured" : "");

        card.innerHTML = `
            <div class="category">${biz.category}</div>
            <h3>${biz.name}</h3>
            <p>${biz.desc}</p>
            ${biz.image ? `<img src="${biz.image}">` : ""}
            <p><strong>Contact:</strong> ${biz.contact}</p>

            <div class="actions">
                <span onclick="likeBiz(${index})">❤️ ${biz.likes}</span>
                <span onclick="featureBiz(${index})">⭐ Feature</span>
                <span onclick="deleteBiz(${index})">🗑 Delete</span>
            </div>

            <div class="timestamp">${biz.time}</div>
        `;

        grid.appendChild(card);
    });
}

function likeBiz(index) {
    businesses[index].likes++;
    saveBiz();
    displayBiz();
}

function featureBiz(index) {
    businesses[index].featured = !businesses[index].featured;
    saveBiz();
    displayBiz();
}

function deleteBiz(index) {
    businesses.splice(index, 1);
    saveBiz();
    displayBiz();
}

function filterBiz(category) {
    displayBiz(category);
}

displayBiz();