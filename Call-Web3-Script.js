// Loading các js cần thiết ngay khi load trang
document.addEventListener('DOMContentLoaded', function () {
    checkPermissions();
    RemIntoPixel();
    fetchAndDisplayDocumentsNEW();
    fetchAndDisplayCheckIDInformation();
    ContentOfBeforeInPaste();
    enableWhiteDeleteIcon();
    BlockAllInputContainer();
    initInputEvents();
    SwitchIntoDarkMode();
    loadMiniRunningAnnoucement();
    // ClickVaoThongBao();
    setInterval(checkRefreshTimestamp, 3000);
    handleCheckboxState('.lock-combo-activate');
    // Lắng nghe các sự kiện online và offline khi DOM đã được tải xong
    window.addEventListener('offline', showOffline);
    window.addEventListener('online', showOnline);
    if (!navigator.onLine) {
        showOffline();
    } else {
        document.getElementById('Offline-Online-Container').classList.add('hidden_visibility');
    }
});




// Sự kiện KeyDown
document.addEventListener('keydown', function (event) {
    KeyDownEnterEscFindCustomers(event);
    handleClearInputTextareaOnKeydown(event);
});




// Khi Login là Guest
function LoginGuest(isFromSuccess = false) {
    document.getElementById('Page_after_login').classList.remove('DisplayNoneST');
    document.getElementById('Login_CreateAccount_Container').classList.add('DisplayNoneST');
    document.getElementById('div-has-button-guest-login').classList.add('DisplayNoneST');

    if (!isFromSuccess) {
        document.getElementById('Add-new-row-into-More-Document-NEW').classList.add('DisplayNoneST');
        document.getElementById('filter-tag-in-more-document-container').classList.add('DisplayNoneST');
        // Chỉ gỡ class 'td-can-be-edited' nếu không phải login thành công
        document.querySelectorAll('.td-can-be-edited').forEach(el => {
            el.classList.remove('td-can-be-edited');
            el.classList.add('td-can-be-edited-locked');
        });
    }
}





// Khi Login thành công
async function LoginSuccessfull() {
    LoginGuest(true); // phần xử lý UI
    loadPersonalFavoriteRowInMoreDocumentNEW().catch(error => {
        console.error('Lỗi khi gọi loadPersonalFavoriteRowInMoreDocumentNEW:', error);
        StatusUpdateBox("More Document", "Lỗi khi lấy các dòng Favorite", 'red');
    });
    setupTextStyleButtons();
    setupClearFormatOnClick();
    setupColorButtons();
    setupSymbolButtons();
    startupdateNumbersOfRequestInMoreDocumentNEW();
    LoadTagsInMoreDocumentNEW();
}




// Khi Logout
function Logout() {
    document.getElementById('Page_after_login').classList.add('DisplayNoneST');
    document.getElementById('Login_CreateAccount_Container').classList.remove('DisplayNoneST');
    document.getElementById('div-has-button-guest-login').classList.remove('DisplayNoneST');
    document.getElementById('Add-new-row-into-More-Document-NEW').classList.remove('DisplayNoneST');
    document.getElementById('filter-tag-in-more-document-container').classList.remove('DisplayNoneST');

    stopTextStyleButtons();
    stopClearFormatOnClick();
    stopColorButtons();
    stopSymbolButtons();
    stopupdateNumbersOfRequestInMoreDocumentNEW();
    ClearLoadTagsInMoreDocumentNEW();

    // Thêm lại class 'td-can-be-edited' cho các phần tử đã bị loại bỏ khi login
    document.querySelectorAll('.td-can-be-edited-locked').forEach(el => {
        el.classList.add('td-can-be-edited');
        el.classList.remove('td-can-be-edited-locked');
    });
}





document.addEventListener('click', function (event) {
    // bấm ra ngoài để ẩn hộp filter tag
    if (!document.getElementById('tag-in-more-document-containter').contains(event.target) &&
        !document.getElementById('filter-tag-in-more-document-container').contains(event.target) &&
        !document.getElementById('filter-tag-in-more-document').contains(event.target)) {
        document.getElementById('filter-tag-in-more-document').checked = false;
    }
});