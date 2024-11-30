const offlineContainer = document.querySelector('.Offline-box');
const onlineContainer = document.querySelector('.Online-box');
const offlinebackgroundContainer = document.querySelector('.Offline-Container-background');
const onlinebackgroundContainer = document.querySelector('.Online-Container-background');
const offlineonlineContainer = document.querySelector('.Offline-Online-Container');

// Hàm xử lý khi rớt mạng
function showOffline() {
    offlineonlineContainer.style.display = 'grid';
    offlineContainer.style.display = 'flex';
    offlinebackgroundContainer.style.display = 'flex';
    onlineContainer.style.display = 'none';
    onlinebackgroundContainer.style.display = 'none';
}

// Hàm xử lý khi có mạng trở lại
function showOnline() {
    offlineonlineContainer.style.display = 'grid';
    offlineContainer.style.display = 'none';
    offlinebackgroundContainer.style.display = 'none';
    onlineContainer.style.display = 'flex';
    onlinebackgroundContainer.style.display = 'flex';

    // Sau 5 giây, ẩn online-container
    setTimeout(() => {
        offlineonlineContainer.style.display = 'none';
        onlineContainer.style.display = 'none';
        onlinebackgroundContainer.style.display = 'none';
    }, 5000);
}

// Lắng nghe các sự kiện online và offline
window.addEventListener('offline', showOffline);
window.addEventListener('online', showOnline);

// Kiểm tra trạng thái mạng ban đầu
if (!navigator.onLine) {
    showOffline();
} else {
    offlineonlineContainer.style.display = 'none';
    onlineContainer.style.display = 'none';
    onlinebackgroundContainer.style.display = 'none';
}
