// STORAGE HANDLER FOR ANNOUNCEMENTS & EVENTS

const STORAGE_KEY = "campus_data";

// Load data
function loadData() {
    let data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Save data
function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Add new item
function addItem(item) {
    let data = loadData();
    data.push(item);
    saveData(data);
}

// Update existing item
function updateItem(updatedItem) {
    let data = loadData();
    let index = data.findIndex(i => i.id === updatedItem.id);
    if (index !== -1) {
        data[index] = updatedItem;
        saveData(data);
    }
}

// Delete item
function deleteItem(id) {
    let data = loadData();
    data = data.filter(item => item.id !== id);
    saveData(data);
}

// Approval change
function setStatus(id, status) {
    let data = loadData();
    let item = data.find(i => i.id === id);
    if (item) {
        item.status = status;
        saveData(data);
    }
}
