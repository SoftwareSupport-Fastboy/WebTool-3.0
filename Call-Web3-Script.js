// Loading các js cần thiết ngay khi load trang
document.addEventListener('DOMContentLoaded', function () {
    checkPermissions();
    RemIntoPixel();
    fetchAndDisplayDocumentsNEW();
    ContentOfBeforeInPaste();
    enableWhiteDeleteIcon();
    BlockAllInputContainer();
    initInputEvents();
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
function LoginGuest() {
    document.getElementById('Page_after_login').classList.remove('DisplayNoneST');
    document.getElementById('Login_CreateAccount_Container').classList.add('DisplayNoneST');
    document.getElementById('div-has-button-guest-login').classList.add('DisplayNoneST');
}



// Khi Login thành công
function LoginSuccessfull() {
    LoginGuest();
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
    stopTextStyleButtons();
    stopClearFormatOnClick();
    stopColorButtons();
    stopSymbolButtons();
    stopupdateNumbersOfRequestInMoreDocumentNEW();
    ClearLoadTagsInMoreDocumentNEW();
}




document.addEventListener('click', function (event) {
    // bấm ra ngoài để ẩn hộp filter tag
    if (!document.getElementById('tag-in-more-document-containter').contains(event.target) &&
        !document.getElementById('filter-tag-in-more-document-container').contains(event.target) &&
        !document.getElementById('filter-tag-in-more-document').contains(event.target)) {
        document.getElementById('filter-tag-in-more-document').checked = false;
    }
});