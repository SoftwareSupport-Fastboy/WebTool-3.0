// Kiểm tra Brownser đã cho phép Permission Đọc ClipBoard và Mở nhiều cửa sổ
function checkPermissions() {
    navigator.permissions.query({ name: 'clipboard-read' }).then(function (result) {
        try {
            const newWindow = window.open("", "popup", "width=600,height=400");
            const canOpenPopup = !!newWindow;
            if (newWindow) newWindow.close();

            if (result.state === 'granted' && canOpenPopup) {
                return;
            } else {
                document.getElementById('Popup_Request_Permission_Container').classList.remove('hidden_visibility');
            }
        } catch (e) {
            document.getElementById('Popup_Request_Permission_Container').classList.remove('hidden_visibility');
        }
    }).catch(function (error) {
        document.getElementById('Popup_Request_Permission_Container').classList.remove('hidden_visibility');
    });
}



// Active Permission Đọc ClipBoard
async function USERrequestClipboard() {
    const element = document.getElementById('USERrequestClipboard');
    try {
        const text = await navigator.clipboard.readText();
        console.log("Clipboard chứa: " + text);
        element.innerHTML = "✔️ Quyền Đọc Clipboard đã kích hoạt";
        element.style.userSelect = "none";
        element.style.pointerEvents = "none";
        element.style.boxShadow = "none";
        element.style.backgroundColor = "rgba(var(--colorwhitergb), 0.75)";
    } catch (err) {
        element.innerHTML = "❌ Quyền Đọc Clipboard vẫn chưa kích hoạt!<br>Tại bên phải của thanh địa chỉ, hãy bấm logo khóa và chọn \"Cho phép\" cho quyền Đọc Clipboard.";
    }
}



// Active Permission Mở nhiều cửa sổ
async function USERrequestMultiplePopups() {
    const urls = [
        'https://softwaresupport-fastboy.github.io/WebTool-3.0/',
        'https://softwaresupport-fastboy.github.io/WebTool-3.0/'
    ];

    const popupWindows = [];
    let allPopupsOpened = true;
    urls.forEach((url) => {
        const newWindow = window.open(url, '_blank');
        if (newWindow) {
            popupWindows.push(newWindow);
        } else {
            allPopupsOpened = false;
        }
    });
    setTimeout(() => {
        popupWindows.forEach(win => {
            if (win && !win.closed) {
                win.close();
            }
        });
        window.focus();
    }, 100);
    if (allPopupsOpened) {
        const button = document.getElementById('USERrequestMultiplePopups');
        if (button) {
            button.innerHTML = "✔️ Quyền Mở Nhiều Popup đã kích hoạt";
            button.style.userSelect = "none";
            button.style.pointerEvents = "none";
            button.style.boxShadow = "none";
            button.style.backgroundColor = "rgba(var(--colorwhitergb), 0.75)";
        }
    } else {
        const element = document.getElementById('Open-After-USERrequestMultiplePopups-final');
        const button = document.getElementById('USERrequestMultiplePopups');
        button.innerHTML = "❌ Quyền Mở Nhiều Popup vẫn chưa kích hoạt!<br>Tại bên phải của thanh địa chỉ, hãy bấm logo khóa và chọn \"Cho phép\" cho quyền Mở Nhiều Popup.";
        if (element) {
            element.classList.remove('DisplayNone');
        }
    }
}



// Gán các nút định dạng văn bản (bold, italic, underline, strikeThrough)
const textStyleListeners = [];
function setupTextStyleButtons() {
    function applyStyle(command, elementId) {
        const el = document.getElementById(elementId);
        if (el) {
            const listener = () => document.execCommand(command, false, null);
            el.addEventListener("click", listener);
            textStyleListeners.push({ el, listener });
        }
    }
    ["Title", "Content", "Title_add-new-row", "Content_add-new-row"].forEach(prefix => {
        ["bold", "italic", "underline", "strikeThrough"].forEach(cmd => {
            const short = { bold: "B", italic: "I", underline: "U", strikeThrough: "S" }[cmd];
            applyStyle(cmd, `${short}-${prefix}`);
        });
    });
}
function stopTextStyleButtons() {
    textStyleListeners.forEach(({ el, listener }) => {
        el.removeEventListener("click", listener);
    });
    textStyleListeners.length = 0;
}



// Xóa định dạng khi click vào các ô nhập liệu
const clearFormatListeners = [];
function setupClearFormatOnClick() {
    ["N-Title", "N-Content", "N-Title_add-new-row", "N-Content_add-new-row"].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const listener = () => document.execCommand("removeFormat", false, null);
            el.addEventListener("click", listener);
            clearFormatListeners.push({ el, listener });
        }
    });
}
function stopClearFormatOnClick() {
    clearFormatListeners.forEach(({ el, listener }) => {
        el.removeEventListener("click", listener);
    });
    clearFormatListeners.length = 0;
}



// Gán các nút đổi màu chữ
const colorButtonListeners = [];
function setupColorButtons() {
    function getComputedVar(variable) {
        return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    }
    function applyColor(colorVar, elementId) {
        const el = document.getElementById(elementId);
        if (el) {
            const listener = () => {
                let color = getComputedVar(colorVar);
                document.execCommand("foreColor", false, color);
            };
            el.addEventListener("click", listener);
            colorButtonListeners.push({ el, listener });
        }
    }
    const colorMap = {
        "--colorblack": "black",
        "--colororangered": "orangered",
        "--colorblue": "lightblue",
        "--colorgreen": "green",
        "--colordeeppink": "dark-pink"
    };
    Object.entries(colorMap).forEach(([varName, className]) => {
        ["Title", "Content", "Title_add-new-row", "Content_add-new-row"].forEach(prefix => {
            applyColor(varName, `${className}-${prefix}`);
        });
    });
}
function stopColorButtons() {
    colorButtonListeners.forEach(({ el, listener }) => {
        el.removeEventListener("click", listener);
    });
    colorButtonListeners.length = 0;
}



// Gán các nút chèn biểu tượng (symbols)
const symbolButtonListeners = [];
function setupSymbolButtons() {
    function insertSymbol(symbol, elementId) {
        const el = document.getElementById(elementId);
        if (el) {
            const listener = () => {
                document.execCommand("insertText", false, symbol);
            };
            el.addEventListener("click", listener);
            symbolButtonListeners.push({ el, listener });
        }
    }
    const symbols = {
        "arrow": "➜",
        "RightArrow-UpTail": "➥",
        "triangle": "▶",
        "circle": "𒊹",
        "square": "⏹︎",
        "check": "✔️",
        "cross": "❌"
    };
    Object.entries(symbols).forEach(([name, symbol]) => {
        ["Title", "Content", "Title_add-new-row", "Content_add-new-row"].forEach(prefix => {
            insertSymbol(symbol, `${name}-${prefix}`);
        });
    });
}
function stopSymbolButtons() {
    symbolButtonListeners.forEach(({ el, listener }) => {
        el.removeEventListener("click", listener);
    });
    symbolButtonListeners.length = 0;
}



// Lấy số lượng request trong More Document NEW
let fetchIntervalupdateNumbersOfRequestInMoreDocumentNEW;
async function updateNumbersOfRequestInMoreDocumentNEW() {
    try {
        const url = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=getNumbersOfRequestInMoreDocumentNEW';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Không thể fetch dữ liệu. Lỗi HTTP: ${response.status}`);
        }
        const data = await response.json();
        const count = data.count;
        const el = document.querySelector(".NumbersRequest");
        if (el) {
            el.style.setProperty('--request-count', `"${count}"`);
            const bgColor = count === 0 ? 'green' : 'red';
            el.style.setProperty('--request-bg-color', bgColor);
            el.title = `Có ${count} request`;
        }
        const idTarget = document.getElementById("Numbers-Of-Request-In-More-Document-NEW");
        if (idTarget) {
            idTarget.textContent = count;
        }
    } catch (error) {
        console.log("Không thể fetch dữ liệu từ server: " + error.message);
    }
}
function startupdateNumbersOfRequestInMoreDocumentNEW() { fetchIntervalupdateNumbersOfRequestInMoreDocumentNEW = setInterval(updateNumbersOfRequestInMoreDocumentNEW, 1000); }
function stopupdateNumbersOfRequestInMoreDocumentNEW() {
    clearInterval(fetchIntervalupdateNumbersOfRequestInMoreDocumentNEW);
    const el = document.querySelector(".NumbersRequest");
}



// Liệt kê giá trị pixel của 1 rem
function RemIntoPixel() {
    const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    console.log(`0.5rem = ${0.5 * remInPx}px; 1rem = ${1 * remInPx}px; 2rem = ${2 * remInPx}px`);
}



// Tải các Tags của More Document NEW
async function LoadTagsInMoreDocumentNEW() {
    const url = "https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=getTagForMoreDocumentsNew";
    try {
        const response = await fetch(url);
        const tags = await response.json();

        const dropdownDiv = document.getElementById("dropdown-for-choose-main-new-tag");
        const tagContainer = document.getElementById("tag-in-more-document");

        tags.forEach(tag => {
            const tagButton = document.createElement("button");
            tagButton.textContent = tag;
            dropdownDiv.appendChild(tagButton);

            const wrapperDiv = document.createElement("div");

            const label = document.createElement("label");
            label.className = "checkbox-container";

            const input = document.createElement("input");
            input.className = "custom-checkbox";
            input.type = "checkbox";
            input.value = tag;

            const checkmark = document.createElement("span");
            checkmark.className = "checkmark";

            const tagText = document.createElement("span");
            tagText.className = "tag-More-Documents";
            tagText.textContent = tag;

            label.appendChild(input);
            label.appendChild(checkmark);
            label.appendChild(tagText);
            wrapperDiv.appendChild(label);

            tagContainer.appendChild(wrapperDiv);
        });
    } catch (error) {
        console.error("Lỗi khi tải danh sách tag:", error);
    }
}
function ClearLoadTagsInMoreDocumentNEW() {
    document.getElementById("dropdown-for-choose-main-new-tag").innerHTML = "";
    document.getElementById("tag-in-more-document").innerHTML = "";
    document.getElementById("More-Document_container_Edit_NEW").style.display = "none";
    document.getElementById("More-Document_container_Edit_NEW_add-new-row").style.display = "none";
}



// Hàm xử lý khi rớt mạng (offline) và lúc có mạng lại (online)
function showOffline() {
    document.getElementById('Offline-Online-Container').classList.remove('hidden_visibility');
    document.getElementById('Offline-box').style.display = 'flex';
    document.getElementById('offline-container').style.display = 'flex';
    document.getElementById('Online-box').style.display = 'none';
    document.getElementById('online-container').style.display = 'none';
}
function showOnline() {
    document.getElementById('Offline-Online-Container').classList.remove('hidden_visibility');
    document.getElementById('Offline-box').style.display = 'none';
    document.getElementById('offline-container').style.display = 'none';
    document.getElementById('Online-box').style.display = 'flex';
    document.getElementById('online-container').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('Offline-Online-Container').classList.add('hidden_visibility');
        document.getElementById('Online-box').style.display = 'none';
        document.getElementById('online-container').style.display = 'none';
        setTimeout(() => {
            location.reload();
        }, 1000);
    }, 5000);
}



// Hiển ẩn các Container
const containers = [
    'Handy_Tools_Container',
    'lichtruccuoituan_container',
    'Onboard_container',
    'More-Document_container',
    'More-Document_container_NEW',
    'Annoucements_container'
].map(id => document.getElementById(id));

document.querySelectorAll('[data-target]').forEach(button => {
    button.addEventListener('click', function (event) {
        event.stopPropagation();
        const targetId = button.getAttribute('data-target');
        const targetContainer = document.getElementById(targetId);
        if (targetContainer.style.display === 'flex') {
            targetContainer.style.display = 'none';
        } else {
            containers.forEach(c => c.style.display = 'none');
            targetContainer.style.display = 'flex';
        }
    });
});

document.querySelectorAll(".close-in-container").forEach(button => {
    button.addEventListener("click", function () {
        let container = this.closest(".Tools-Container");
        if (container) {
            container.style.display = "none";
        }
    });
});



// Đóng cửa sổ Request Editing bên trong More Document New Version
document.getElementById('CloseBtn_Editing_MoreDoc_NewVer').addEventListener('click', () => {
    document.getElementById('More-Document_container_Edit_NEW').style.display = 'none';
    document.getElementById('status-of-updating-edit-more-documents-container_NEW').textContent = '';
    document.getElementById('id-of-row-more-document').textContent = '';
    document.getElementById('Title-Of-Row-More-Document').innerHTML = '';
    document.getElementById('Tag-Of-Row-More-Document').innerHTML = '';
    document.getElementById('dropdown-for-choose-new-tag').innerHTML = '';
    document.getElementById('Content-Of-Row-More-Document').innerHTML = '';
});



// Đóng cửa sổ Request Add New Row bên trong More Document New Version
document.getElementById('CloseBtn_RequestAddRow_MoreDoc_NewVer').addEventListener('click', () => {
    document.getElementById('More-Document_container_Edit_NEW_add-new-row').style.display = 'none';
    // document.getElementById('status-of-updating-edit-more-documents-container_NEW_add-new-row').textContent = '';
    document.getElementById('Title-Of-Row-More-Document_add-new-row').innerHTML = '';
    document.getElementById('Tag-Of-Row-More-Document_add-new-row').innerHTML = '';
    document.getElementById('dropdown-for-choose-new-tag_add-new-row').innerHTML = '';
    document.getElementById('Content-Of-Row-More-Document_add-new-row').innerHTML = '';
});




// Cách hiển thị của Before trong nút Paste_New_Button và khi bấm vào thì sẽ delete và paste
function ContentOfBeforeInPaste() {
    document.querySelectorAll('.New-Lock-And-Input-Container').forEach(container => {
        const input = container.querySelector('.New_Big_Input_Container input, .New_Big_Input_Container textarea');
        const pasteDiv = container.querySelector('.Paste_New_Button');
        const checkbox = container.querySelector('.lock-combo-activate input[type=checkbox]'); // Có thể null

        if (!input || !pasteDiv) return;

        const updateTooltip = () => {
            const isChecked = checkbox?.checked ?? false; // Mặc định false nếu không có checkbox

            if (isChecked) {
                pasteDiv.setAttribute('Paste-before-content', 'Auto Paste');
                pasteDiv.style.backgroundColor = 'lightgreen';
                pasteDiv.style.color = 'black';
                pasteDiv.style.cursor = 'not-allowed';
            } else {
                pasteDiv.setAttribute(
                    'Paste-before-content',
                    input.value.trim() === '' ? '⭅Paste' : '⭅Delete\n& Paste'
                );
                pasteDiv.style.backgroundColor = '';
                pasteDiv.style.color = '';
                pasteDiv.style.cursor = '';
            }
        };

        input.addEventListener('input', updateTooltip);
        checkbox?.addEventListener('change', updateTooltip); // Chỉ thêm nếu tồn tại checkbox
        updateTooltip();

        pasteDiv.addEventListener('click', (event) => {
            const isChecked = checkbox?.checked ?? false;
            if (isChecked) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                handleClickPaste(input);
            }
        });
    });
}




// Cách xử lý việc Click Paste
function handleClickPaste(input) {
    navigator.clipboard.readText()
        .then(text => {
            input.value = text;
            input.dispatchEvent(new Event('input'));
        })
        .catch(() => {
            alert('Không thể đọc clipboard. Trình duyệt không cho phép hoặc chưa copy gì.');
        });
}


// Hàm initInputEvents sẽ gán sự kiện 'input/textarea' cho các ô input/textarea bên trong .New_Big_Input_Container.
// Phân loại xử lý như sau:
// - Nếu input/textarea có class 'input-only-take-number-to-4-numbers-output' => gọi handleFourNumberOutnput (chỉ cho phép số, tối đa 4 chữ số)
// - Nếu input/textarea có class 'input-only-take-number-to-Full-numbers-output' => gọi handleOnlyNumberOutnput (chỉ cho phép số, không giới hạn độ dài)
// - Nếu input/textarea có class 'input-For-Dashboard-Link' => gọi FindStoreID (dùng để tìm Store ID từ link dashboard)
// - Nếu không thuộc các loại trên => gọi handleTextInput (xử lý input/textarea văn bản thông thường)
function initInputEvents() {
    document.querySelectorAll('.New_Big_Input_Container .New_Input_Container input, .New_Big_Input_Container .New_Input_Container textarea').forEach(input => {
        const container = input.closest('.New_Big_Input_Container');
        if (!container) return;

        if (input.classList.contains('input-only-take-number-to-4-numbers-output')) {
            input.addEventListener('input', handleFourNumberOutnput);
        } else if (input.classList.contains('input-only-take-number-to-Full-numbers-output')) {
            input.addEventListener('input', handleOnlyNumberOutnput);
        } else if (input.classList.contains('input-For-Dashboard-Link')) {
            input.addEventListener('input', FindStoreID);
        } else {
            input.addEventListener('input', handleTextInput);
        }
    });
}
// Chỉ lọc số
function handleOnlyNumberOutnput(event) {
    const input = event.target;
    const value = input.value.trim();
    const container = input.closest('.New_Input_Container');
    const numberDisplay = container
        .closest('.New_Big_Input_Container')
        ?.querySelector('.Value_Of_Title_Input_Container');
    const titleBox = container
        .closest('.New_Big_Input_Container')
        ?.querySelector('.Title_Input_Container');
    if (!numberDisplay || !titleBox) return;
    if (value === '') {
        numberDisplay.textContent = '';
        titleBox.style.setProperty('--Background_Title_Input_Container', 'var(--colorwhite)');
        titleBox.style.setProperty('--Border_Title_Input_Container', 'transparent');
        return;
    }
    const digitsOnly = value.replace(/\D+/g, '');
    if (digitsOnly) {
        numberDisplay.textContent = digitsOnly;
        titleBox.style.setProperty('--Background_Title_Input_Container', 'var(--colorwhite)');
        titleBox.style.setProperty('--Border_Title_Input_Container', 'transparent');
    } else {
        numberDisplay.textContent = 'Không lọc được số';
        titleBox.style.setProperty('--Background_Title_Input_Container', 'orangered');
        titleBox.style.setProperty('--Border_Title_Input_Container', 'orangered');
    }
}
// Chỉ lọc số và lấy 4 nhóm số
function handleFourNumberOutnput(event) {
    const input = event.target;
    const value = input.value.trim();
    const container = input.closest('.New_Input_Container');
    const numberDisplay = container
        .closest('.New_Big_Input_Container')
        ?.querySelector('.Value_Of_Title_Input_Container');
    const titleBox = container
        .closest('.New_Big_Input_Container')
        ?.querySelector('.Title_Input_Container');

    if (!numberDisplay || !titleBox) return;

    if (value === '') {
        numberDisplay.textContent = '';
        titleBox.style.setProperty('--Background_Title_Input_Container', 'var(--colorwhite)');
        titleBox.style.setProperty('--Border_Title_Input_Container', 'transparent');
        return;
    }

    const groups = value.match(/\d+/g);
    if (groups && groups.length > 0) {
        const firstFour = groups.slice(0, 4);
        numberDisplay.textContent = firstFour.join(', ');
        titleBox.style.setProperty('--Background_Title_Input_Container', 'var(--colorwhite)');
        titleBox.style.setProperty('--Border_Title_Input_Container', 'transparent');
    } else {
        numberDisplay.textContent = 'Không lọc được số';
        titleBox.style.setProperty('--Background_Title_Input_Container', 'orangered');
        titleBox.style.setProperty('--Border_Title_Input_Container', 'orangered');
    }
}
// Chỉ lọc chữ
function handleTextInput(event) {
    const input = event.target;
    const value = input.value.trim();
    const container = input.closest('.New_Input_Container');
    const textDisplay = container
        .closest('.New_Big_Input_Container')
        ?.querySelector('.Value_Of_Title_Input_Container');
    const titleBox = container
        .closest('.New_Big_Input_Container')
        ?.querySelector('.Title_Input_Container');

    if (!textDisplay || !titleBox) return;

    textDisplay.textContent = value;

    if (value === '') {
        titleBox.style.setProperty('--Background_Title_Input_Container', 'var(--colorwhite)');
        titleBox.style.setProperty('--Border_Title_Input_Container', 'transparent');
    } else {
        titleBox.style.setProperty('--Background_Title_Input_Container', 'var(--colorwhite)');
        titleBox.style.setProperty('--Border_Title_Input_Container', 'transparent');
    }
}
// Chỉ lọc Store ID từ dashboard link
function FindStoreID(event) {
    const input = event?.target || document.getElementById("URLDashboardInput");
    const value = input.value.trim();

    const container = input.closest('.New_Input_Container');
    const storeDisplay = container
        .closest('.New_Big_Input_Container')
        ?.querySelector('.Value_Of_Title_Input_Container');
    const titleBox = container
        .closest('.New_Big_Input_Container')
        ?.querySelector('.Title_Input_Container');

    if (!storeDisplay || !titleBox) return;

    if (value === '') {
        storeDisplay.textContent = '';
        titleBox.style.setProperty('--Background_Title_Input_Container', 'var(--colorwhite)');
        titleBox.style.setProperty('--Border_Title_Input_Container', 'transparent');
        return;
    }

    const prefix = "https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D";
    if (!value.startsWith(prefix)) {
        storeDisplay.textContent = 'URL không hợp lệ';
        titleBox.style.setProperty('--Background_Title_Input_Container', 'orangered');
        titleBox.style.setProperty('--Border_Title_Input_Container', 'orangered');
        return;
    }

    let rawID = value.replace(prefix, "");
    const tokenIndex = rawID.indexOf("%26token");
    if (tokenIndex === -1) {
        storeDisplay.textContent = 'Không tìm thấy Store ID';
        titleBox.style.setProperty('--Background_Title_Input_Container', 'orangered');
        titleBox.style.setProperty('--Border_Title_Input_Container', 'orangered');
        return;
    }

    const storeID = rawID.substring(0, tokenIndex);

    // Cập nhật giao diện giống hàm mẫu
    storeDisplay.textContent = storeID;
    titleBox.style.setProperty('--Background_Title_Input_Container', 'var(--colorwhite)');
    titleBox.style.setProperty('--Border_Title_Input_Container', 'transparent');

    // Optional: xử lý token nếu cần
    // const tokenPart = rawID.substring(tokenIndex).replace("%26token%3", "token%3").replace("insight_id%3D136", "");
}
// function FindStoreID() {
//     var FindStoreIDA = document.getElementById("URLDashboardInput").value;
//     var FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
//     var FindStoreIDC = "%26token";
//     var FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
//     var FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
//     var FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, ""); /* Store ID của tiệm */
//     document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;
//     var FindStoreIDG = FindStoreIDE.replace("%26token%3", "token%3").replace("insight_id%3D136", ""); /* Token lấy từ Dashboard 2.0 */
// }


document.querySelectorAll('.New_Input_Container').forEach(container => {
    const label = container.querySelector('label');
    const input = container.querySelector('input');
    
    if (label && input) {
        // Đặt `id` cho `input` nếu chưa có
        const inputId = input.id || 'input-' + Math.random().toString(36).substr(2, 9); // Tạo id ngẫu nhiên nếu chưa có
        input.id = inputId; 

        // Đặt `for` cho `label` trỏ đến `id` của `input`
        label.setAttribute('for', inputId);
    }
});




// Áp dụng xoá trong toàn bộ New Input
function enableWhiteDeleteIcon() {
    document.querySelectorAll('.New_Input_Container').forEach(container => {
        // Tìm input hoặc textarea
        const input = container.querySelector('input, textarea');
        const deleteIcon = container.querySelector('.white-delete-icon');

        if (!input || !deleteIcon) return;

        deleteIcon.addEventListener('click', () => {
            input.value = '';
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
    });
}




// Khoá lại các input
function BlockAllInputContainer() {
    document.querySelectorAll('.New-Lock-And-Input-Container').forEach(container => {
        const checkbox = container.querySelector('.lock-combo-activate input[type=checkbox]');
        const pasteBtn = container.querySelector('.Block_Input_Container');
        if (!checkbox || !pasteBtn) return;
        const updateDisplay = () => {
            pasteBtn.style.display = checkbox.checked ? 'flex' : 'none';
        };
        checkbox.addEventListener('change', updateDisplay);
        updateDisplay();
    });
}



//function cho phần tìm kiếm khách hàng
function KeyDownEnterEscFindCustomers(event) {
    const checkbox = document.getElementById("Find-Customers-checkbox");
    if (!checkbox || !checkbox.checked) return;

    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("findButton").click();
    }

    if (event.key === "Escape") {
        event.preventDefault();
        document.getElementById("resetButton").click();
    }
}




//funtion bấm Esc để clear toàn bộ input hoặc textarea
function handleClearInputTextareaOnKeydown(event) {
    const target = event.target;
    if ((target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') && event.key === 'Escape') {
        const container = target.closest('.New_Input_Container');
        const deleteIcon = container?.querySelector('.white-delete-icon');
        if (deleteIcon) {
            deleteIcon.click();
        }
    }
}





//function reset lại zip code, phone ở phần tìm kiếm khách hàng
document.getElementById("resetButton").addEventListener("click", function () {
    document.getElementById("ZiptextInput").value = "";
    document.getElementById("PhonetextInput").value = "";
    document.getElementById("ZipnumericOutput").textContent = "";
    document.getElementById("PhonetextOutput").textContent = "";
    document.querySelectorAll("#Find-Customers .Title_Input_Container").forEach(el => {
        el.style.setProperty('--Background_Title_Input_Container', 'var(--colorwhite)');
        el.style.setProperty('--Border_Title_Input_Container', 'transparent');
    });
});



//function cho phần tìm kiếm khách hàng
document.getElementById("findButton").addEventListener("click", function (event) {
    event.preventDefault();
    let zipCode = document.getElementById("ZipnumericOutput").innerText;
    let phone = document.getElementById("PhonetextOutput").innerText;
    if (zipCode === "Không lọc được số") {
        zipCode = "";
    }
    if (phone === "Không lọc được số") {
        phone = "";
    }
    const baseUrl = "https://crm.fastboy.dev/clients/company?page=1&itemsPerPage=20&order%5BwhmcsId%5D=desc";
    const urlParams = `postal_name=${zipCode}`;
    if (zipCode && phone) {
        window.open(baseUrl + "&" + urlParams, "_blank");
        window.open(baseUrl + "&contact_phone=" + phone, "_blank");
        window.open(baseUrl + "&business_phone=" + phone, "_blank");
    } else if (zipCode) {
        window.open(baseUrl + "&" + urlParams, "_blank");
    } else if (phone) {
        window.open(baseUrl + "&contact_phone=" + phone, "_blank");
        window.open(baseUrl + "&business_phone=" + phone, "_blank");
    }
});



// Lưu trạng thái check hoặc không cho các Combo checkbox
function handleCheckboxState(selector) {
    const labels = document.querySelectorAll(selector);
    labels.forEach(function(label, index) {
        const inputElement = label.querySelector('input');
        if (!inputElement) return;

        // Tạo key lưu trữ duy nhất
        const key = `checkboxState_${selector}_${index}`;

        // Lấy và áp dụng trạng thái đã lưu
        const savedState = localStorage.getItem(key);
        if (savedState !== null) {
            inputElement.checked = savedState === "true";
        }

        // Cập nhật trạng thái khi người dùng thay đổi
        inputElement.addEventListener("change", function () {
            localStorage.setItem(key, inputElement.checked);
        });
    });
    BlockAllInputContainer();
    ContentOfBeforeInPaste();
}




// Hàm tạo Update-Box:
function StatusUpdateBox(Area, Content, Background) {
    const box = document.createElement('div');
    box.className = 'Update-Box';
    box.style.backgroundColor = Background;
    box.onclick = () => box.remove();
    const title = document.createElement('b');
    title.innerHTML = `${Area}:`;
    box.appendChild(title);
    const message = document.createElement('p');
    message.style.textAlign = 'right';
    message.textContent = Content;
    box.appendChild(message);
    const container = document.getElementById('Update-Container');
    container.appendChild(box);
    setTimeout(() => {
        box.style.opacity = '0';
    }, 2800);
    setTimeout(() => {
        box.remove();
    }, 3000);
}


























async function pasteClipboarddashboard() {
    try {
        const text = await navigator.clipboard.readText();
        const inputElement = document.getElementById('URLDashboardInput');
        inputElement.value = text;
        FindStoreID();
    } catch (error) {
        console.error('Failed to read clipboard contents: ', error);
    }
}




function clearInputAndSpandashboard() {
    document.getElementById('URLDashboardInput').value = ''; // Clear input
    document.getElementById('URLDashboardOutput').textContent = ''; // Clear span
}

function openToolsLite(event) {
    event.preventDefault();
    const checkbox = document.getElementById("lock-combo-activate-dashboard2");
    if (checkbox && checkbox.checked) {
        pasteClipboarddashboard();
        FindStoreID();
        setTimeout(() => {
            const inputUrl = document.getElementById("URLDashboardInput").value;
            const modifiedUrl = inputUrl.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https", "https");
            const decodedUrl = decodeURIComponent(modifiedUrl);
            const finalUrl = decodedUrl.replace("https://apps.gocheckin.net/pages/login", "https://tool-update-order-second.srv01.dtsmart.dev/");
            window.open(finalUrl, "_blank");
        }, 300);
    } else {
        const inputUrl = document.getElementById("URLDashboardInput").value;
        const modifiedUrl = inputUrl.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https", "https");
        const decodedUrl = decodeURIComponent(modifiedUrl);
        const finalUrl = decodedUrl.replace("https://apps.gocheckin.net/pages/login", "https://tool-update-order-second.srv01.dtsmart.dev/");
        window.open(finalUrl, "_blank");
    }
}


function openGoPOSforSelling(event) {
    event.preventDefault();
    const checkbox = document.getElementById("lock-combo-activate-dashboard2");
    if (checkbox && checkbox.checked) {
        pasteClipboarddashboard();
        FindStoreID();
        setTimeout(() => {
            const inputUrl = document.getElementById("URLDashboardInput").value;
            const modifiedUrl = inputUrl.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https", "https");
            const decodedUrl = decodeURIComponent(modifiedUrl);
            const finalUrl = decodedUrl.replace("https://apps.gocheckin.net/pages/login", "https://pos.gocheckin.net/login");
            window.open(finalUrl, "_blank");
        }, 300);
    } else {
        const inputUrl = document.getElementById("URLDashboardInput").value;
        const modifiedUrl = inputUrl.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https", "https");
        const decodedUrl = decodeURIComponent(modifiedUrl);
        const finalUrl = decodedUrl.replace("https://apps.gocheckin.net/pages/login", "https://pos.gocheckin.net/login");
        window.open(finalUrl, "_blank");
    }
}

function openGoPOSforSellingtocopylink(event) {
    event.preventDefault();
    const checkbox = document.getElementById("lock-combo-activate-dashboard2");
    if (checkbox && checkbox.checked) {
        pasteClipboarddashboard();
        FindStoreID();
        setTimeout(() => {
            const inputUrl = document.getElementById("URLDashboardInput").value;
            const modifiedUrl = inputUrl.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https", "https");
            const decodedUrl = decodeURIComponent(modifiedUrl);
            const finalUrl = decodedUrl.replace("https://apps.gocheckin.net/pages/login", "https://pos.gocheckin.net/login");

            const textArea = document.createElement("textarea");
            textArea.value = finalUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }, 300);
    } else {
        const inputUrl = document.getElementById("URLDashboardInput").value;
        const modifiedUrl = inputUrl.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https", "https");
        const decodedUrl = decodeURIComponent(modifiedUrl);
        const finalUrl = decodedUrl.replace("https://apps.gocheckin.net/pages/login", "https://pos.gocheckin.net/login");

        const textArea = document.createElement("textarea");
        textArea.value = finalUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }
}

function openDashboard2(event) {
    event.preventDefault();
    const checkbox = document.getElementById("lock-combo-activate-dashboard2");
    if (checkbox && checkbox.checked) {
        pasteClipboarddashboard();
        FindStoreID();
        setTimeout(() => {
            const inputUrl = document.getElementById("URLDashboardInput").value;
            const modifiedUrl = inputUrl.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https", "https");
            const decodedUrl = decodeURIComponent(modifiedUrl);
            const finalUrl = decodedUrl.replace("https://apps.gocheckin.net/pages/login", "https://apps.gocheckin.net/pages/login");
            window.open(finalUrl, "_blank");
        }, 300);
    } else {
        const inputUrl = document.getElementById("URLDashboardInput").value;
        const modifiedUrl = inputUrl.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https", "https");
        const decodedUrl = decodeURIComponent(modifiedUrl);
        const finalUrl = decodedUrl.replace("https://apps.gocheckin.net/pages/login", "https://apps.gocheckin.net/pages/login");
        window.open(finalUrl, "_blank");
    }
}

function openDashboard3(event) {
    event.preventDefault();
    const checkbox = document.getElementById("lock-combo-activate-dashboard2");
    if (checkbox && checkbox.checked) {
        pasteClipboarddashboard();
        FindStoreID();
        setTimeout(() => {
            var FindStoreIDA = document.getElementById("URLDashboardInput").value;
            var FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
            var FindStoreIDC = "%26token";
            var FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
            var FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
            var FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, ""); /* Store ID của tiệm */
            document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;
            var FindStoreIDG = FindStoreIDE.replace("%26token%3", "token%3").replace("insight_id%3D136", ""); /* Token lấy từ Dashboard 2.0 */
            const URLDashboard3FindStoreIDG = "https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fdashboard.gocheckin.net%3F" + FindStoreIDG + "id%3D" + FindStoreIDF + "%26insight%3D" + FindStoreIDF + "%26insight_id%3D136";
            window.open(URLDashboard3FindStoreIDG, "_blank");
        }, 300);
    } else {
        var FindStoreIDA = document.getElementById("URLDashboardInput").value;
        var FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
        var FindStoreIDC = "%26token";
        var FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
        var FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
        var FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, ""); /* Store ID của tiệm */
        document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;
        var FindStoreIDG = FindStoreIDE.replace("%26token%3", "token%3").replace("insight_id%3D136", ""); /* Token lấy từ Dashboard 2.0 */
        const URLDashboard3FindStoreIDG = "https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fdashboard.gocheckin.net%3F" + FindStoreIDG + "id%3D" + FindStoreIDF + "%26insight%3D" + FindStoreIDF + "%26insight_id%3D136";
        window.open(URLDashboard3FindStoreIDG, "_blank");
    }
}



function open_Inside_Insight(event) {
    event.preventDefault();
    const checkbox = document.getElementById("lock-combo-activate-dashboard2");
    if (checkbox && checkbox.checked) {
        pasteClipboarddashboard();
        FindStoreID();
        setTimeout(() => {
            const selectedServerIndex = document.getElementById("dropdown").value;
            const selectedServer = map[selectedServerIndex];

            if (!selectedServer) {
                alert("Vui lòng chọn server hợp lệ.");
                return;
            }

            const FindStoreIDH = selectedServer.serverIDH; // Lấy cột thứ 3 từ map
            const FindStoreIDA = document.getElementById("URLDashboardInput").value;
            const FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
            const FindStoreIDC = "%26token";
            const FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
            const FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
            const FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, "");

            document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;

            const FindStoreIDG = FindStoreIDE.replace("%26token%3D", "token=").replace("%26insight_id%3D136", "");
            const URLDashboard3FindStoreIDG = "https://insight2020.gci.fast-boy.net/gci/tenant/connect-special?serverID=" + FindStoreIDH + "&tenantName=" + FindStoreIDF;

            const newWindow = window.open(URLDashboard3FindStoreIDG, "_blank");

            setTimeout(function () {
                window.open("https://insight2020.gci.fast-boy.net/gci/key-storage-server/index?search=passcode", "_blank");
                newWindow.close();
            }, 3000);
        }, 300);
    } else {
        const selectedServerIndex = document.getElementById("dropdown").value;
        const selectedServer = map[selectedServerIndex];

        if (!selectedServer) {
            alert("Vui lòng chọn server hợp lệ.");
            return;
        }

        const FindStoreIDH = selectedServer.serverIDH; // Lấy cột thứ 3 từ map
        const FindStoreIDA = document.getElementById("URLDashboardInput").value;
        const FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
        const FindStoreIDC = "%26token";
        const FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
        const FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
        const FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, "");

        document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;

        const FindStoreIDG = FindStoreIDE.replace("%26token%3D", "token=").replace("%26insight_id%3D136", "");
        const URLDashboard3FindStoreIDG = "https://insight2020.gci.fast-boy.net/gci/tenant/connect-special?serverID=" + FindStoreIDH + "&tenantName=" + FindStoreIDF;

        const newWindow = window.open(URLDashboard3FindStoreIDG, "_blank");

        setTimeout(function () {
            window.open("https://insight2020.gci.fast-boy.net/gci/key-storage-server/index?search=passcode", "_blank");
            newWindow.close();
        }, 3000);
    }
}

function open_GAP_Setting(event) {
    event.preventDefault();
    const checkbox = document.getElementById("lock-combo-activate-dashboard2");
    if (checkbox && checkbox.checked) {
        pasteClipboarddashboard();
        FindStoreID();
        setTimeout(() => {
            const selectedServerIndex = document.getElementById("dropdown").value;
            const selectedServer = map[selectedServerIndex];

            if (!selectedServer) {
                alert("Vui lòng chọn server hợp lệ.");
                return;
            }

            const FindStoreIDH = selectedServer.someValue; // Cột thứ 2 (B)
            const FindStoreIDA = document.getElementById("URLDashboardInput").value;
            const FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
            const FindStoreIDC = "%26token";
            const FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
            const FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
            const FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, "");

            document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;

            const FindStoreIDG = FindStoreIDE.replace("%26token%3D", "token=").replace(/%26insight_id.*/, "");
            const URLDashboard3FindStoreIDG = `https://settings.gocheckin.net/general?${FindStoreIDG}&id=${FindStoreIDF}&domain=${FindStoreIDH}&route=general&insight=${FindStoreIDF}`;
            window.open(URLDashboard3FindStoreIDG, "_blank");
        }, 300);
    } else {
        const selectedServerIndex = document.getElementById("dropdown").value;
        const selectedServer = map[selectedServerIndex];

        if (!selectedServer) {
            alert("Vui lòng chọn server hợp lệ.");
            return;
        }

        const FindStoreIDH = selectedServer.someValue; // Cột thứ 2 (B)
        const FindStoreIDA = document.getElementById("URLDashboardInput").value;
        const FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
        const FindStoreIDC = "%26token";
        const FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
        const FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
        const FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, "");

        document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;

        const FindStoreIDG = FindStoreIDE.replace("%26token%3D", "token=").replace(/%26insight_id.*/, "");
        const URLDashboard3FindStoreIDG = `https://settings.gocheckin.net/general?${FindStoreIDG}&id=${FindStoreIDF}&domain=${FindStoreIDH}&route=general&insight=${FindStoreIDF}`;
        window.open(URLDashboard3FindStoreIDG, "_blank");
    }
}

function open_Booking_admin(event) {
    event.preventDefault();
    const checkbox = document.getElementById("lock-combo-activate-dashboard2");
    if (checkbox && checkbox.checked) {
        pasteClipboarddashboard();
        FindStoreID();
        setTimeout(() => {
            const selectedServerIndex = document.getElementById("dropdown").value;
            const selectedServer = map[selectedServerIndex];

            if (!selectedServer) {
                alert("Vui lòng chọn server hợp lệ.");
                return;
            }

            const FindStoreIDH = selectedServer.someValue; // Cột thứ 2 (B)
            const FindStoreIDA = document.getElementById("URLDashboardInput").value;
            const FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
            const FindStoreIDC = "%26token";
            const FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
            const FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
            const FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, "");

            document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;

            const FindStoreIDG = FindStoreIDE.replace("%26token%3D", "token=").replace(/%26insight_id.*/, "");
            const URLDashboard3FindStoreIDG = `https://go-booking.gocheckin.net/?${FindStoreIDG}&id=${FindStoreIDF}&domain=${FindStoreIDH}&crm=${FindStoreIDF}&insight=${FindStoreIDF}`;
            window.open(URLDashboard3FindStoreIDG, "_blank");
        }, 300);
    } else {
        const selectedServerIndex = document.getElementById("dropdown").value;
        const selectedServer = map[selectedServerIndex];

        if (!selectedServer) {
            alert("Vui lòng chọn server hợp lệ.");
            return;
        }

        const FindStoreIDH = selectedServer.someValue; // Cột thứ 2 (B)
        const FindStoreIDA = document.getElementById("URLDashboardInput").value;
        const FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
        const FindStoreIDC = "%26token";
        const FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
        const FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
        const FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, "");

        document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;

        const FindStoreIDG = FindStoreIDE.replace("%26token%3D", "token=").replace(/%26insight_id.*/, "");
        const URLDashboard3FindStoreIDG = `https://go-booking.gocheckin.net/?${FindStoreIDG}&id=${FindStoreIDF}&domain=${FindStoreIDH}&crm=${FindStoreIDF}&insight=${FindStoreIDF}`;
        window.open(URLDashboard3FindStoreIDG, "_blank");
    }
}

function open_Check_Out_admin(event) {
    event.preventDefault();
    const checkbox = document.getElementById("lock-combo-activate-dashboard2");
    if (checkbox && checkbox.checked) {
        pasteClipboarddashboard();
        FindStoreID();
        setTimeout(() => {
            const selectedServerIndex = document.getElementById("dropdown").value;
            const selectedServer = map[selectedServerIndex];

            if (!selectedServer) {
                alert("Vui lòng chọn server hợp lệ.");
                return;
            }

            const FindStoreIDH = selectedServer.someValue; // Cột thứ 2 (B)
            const FindStoreIDA = document.getElementById("URLDashboardInput").value;
            const FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
            const FindStoreIDC = "%26token";
            const FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
            const FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
            const FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, "");

            document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;

            const FindStoreIDG = FindStoreIDE.replace("%26token%3D", "token=").replace(/%26insight_id.*/, "");
            const URLDashboard3FindStoreIDG = `https://checkout.gocheckin.net/?${FindStoreIDG}&id=${FindStoreIDF}&domain=${FindStoreIDH}&crm=${FindStoreIDF}&insight=${FindStoreIDF}`;
            window.open(URLDashboard3FindStoreIDG, "_blank");
        }, 300);
    } else {
        const selectedServerIndex = document.getElementById("dropdown").value;
        const selectedServer = map[selectedServerIndex];

        if (!selectedServer) {
            alert("Vui lòng chọn server hợp lệ.");
            return;
        }

        const FindStoreIDH = selectedServer.someValue; // Cột thứ 2 (B)
        const FindStoreIDA = document.getElementById("URLDashboardInput").value;
        const FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
        const FindStoreIDC = "%26token";
        const FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
        const FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
        const FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, "");

        document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;

        const FindStoreIDG = FindStoreIDE.replace("%26token%3D", "token=").replace(/%26insight_id.*/, "");
        const URLDashboard3FindStoreIDG = `https://checkout.gocheckin.net/?${FindStoreIDG}&id=${FindStoreIDF}&domain=${FindStoreIDH}&crm=${FindStoreIDF}&insight=${FindStoreIDF}`;
        window.open(URLDashboard3FindStoreIDG, "_blank");
    }
}

function open_Check_In_admin(event) {
    event.preventDefault();
    const checkbox = document.getElementById("lock-combo-activate-dashboard2");
    if (checkbox && checkbox.checked) {
        pasteClipboarddashboard();
        FindStoreID();
        setTimeout(() => {
            const selectedServerIndex = document.getElementById("dropdown").value;
            const selectedServer = map[selectedServerIndex];

            if (!selectedServer) {
                alert("Vui lòng chọn server hợp lệ.");
                return;
            }

            const FindStoreIDH = selectedServer.someValue; // Cột thứ 2 (B)
            const FindStoreIDA = document.getElementById("URLDashboardInput").value;
            const FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
            const FindStoreIDC = "%26token";
            const FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
            const FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
            const FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, "");

            document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;

            const FindStoreIDG = FindStoreIDE.replace("%26token%3D", "token=").replace(/%26insight_id.*/, "");
            const URLDashboard3FindStoreIDG = `https://dashboard.gocheckin.net/report?${FindStoreIDG}&id=${FindStoreIDF}&domain=${FindStoreIDH}&crm=${FindStoreIDF}&insight=${FindStoreIDF}`;
            window.open(URLDashboard3FindStoreIDG, "_blank");
        }, 300);
    } else {
        const selectedServerIndex = document.getElementById("dropdown").value;
        const selectedServer = map[selectedServerIndex];

        if (!selectedServer) {
            alert("Vui lòng chọn server hợp lệ.");
            return;
        }

        const FindStoreIDH = selectedServer.someValue; // Cột thứ 2 (B)
        const FindStoreIDA = document.getElementById("URLDashboardInput").value;
        const FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
        const FindStoreIDC = "%26token";
        const FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
        const FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
        const FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, "");

        document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;

        const FindStoreIDG = FindStoreIDE.replace("%26token%3D", "token=").replace(/%26insight_id.*/, "");
        const URLDashboard3FindStoreIDG = `https://dashboard.gocheckin.net/report?${FindStoreIDG}&id=${FindStoreIDF}&domain=${FindStoreIDH}&crm=${FindStoreIDF}&insight=${FindStoreIDF}`;
        window.open(URLDashboard3FindStoreIDG, "_blank");
    }
}

function open_POS_admin(event) {
    event.preventDefault();
    const checkbox = document.getElementById("lock-combo-activate-dashboard2");
    if (checkbox && checkbox.checked) {
        pasteClipboarddashboard();
        FindStoreID();
        setTimeout(() => {
            const selectedServerIndex = document.getElementById("dropdown").value;
            const selectedServer = map[selectedServerIndex];

            if (!selectedServer) {
                alert("Vui lòng chọn server hợp lệ.");
                return;
            }

            const FindStoreIDH = selectedServer.someValue; // Cột thứ 2 (B)
            const FindStoreIDA = document.getElementById("URLDashboardInput").value;
            const FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
            const FindStoreIDC = "%26token";
            const FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
            const FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
            const FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, "");

            document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;

            const FindStoreIDG = FindStoreIDE.replace("%26token%3D", "token=").replace(/%26insight_id.*/, "");
            const URLDashboard3FindStoreIDG = `https://gopos-admin.gocheckin.net/report?${FindStoreIDG}&id=${FindStoreIDF}&domain=${FindStoreIDH}&crm=${FindStoreIDF}&insight=${FindStoreIDF}`;
            window.open(URLDashboard3FindStoreIDG, "_blank");
        }, 300);
    } else {
        const selectedServerIndex = document.getElementById("dropdown").value;
        const selectedServer = map[selectedServerIndex];

        if (!selectedServer) {
            alert("Vui lòng chọn server hợp lệ.");
            return;
        }

        const FindStoreIDH = selectedServer.someValue; // Cột thứ 2 (B)
        const FindStoreIDA = document.getElementById("URLDashboardInput").value;
        const FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
        const FindStoreIDC = "%26token";
        const FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
        const FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
        const FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, "");

        document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;

        const FindStoreIDG = FindStoreIDE.replace("%26token%3D", "token=").replace(/%26insight_id.*/, "");
        const URLDashboard3FindStoreIDG = `https://gopos-admin.gocheckin.net/report?${FindStoreIDG}&id=${FindStoreIDF}&domain=${FindStoreIDH}&crm=${FindStoreIDF}&insight=${FindStoreIDF}`;
        window.open(URLDashboard3FindStoreIDG, "_blank");
    }
}

function handleSelection(event) {
    var selectedValue = event.target.value;
    switch (selectedValue) {
        case 'combo_checkin':
            open_Inside_Insight(event);
            open_GAP_Setting(event);
            open_Check_In_admin(event);
            open_Check_Out_admin(event);
            break;
        case 'combo_booking':
            open_Inside_Insight(event);
            open_GAP_Setting(event);
            open_Booking_admin(event);
            break;
        case 'combo_POS':
            open_Inside_Insight(event);
            open_GAP_Setting(event);
            open_POS_admin(event);
            openGoPOSforSelling(event);
            break;
        case 'Inside_Insight':
            open_Inside_Insight(event);
            break;
        case 'GAP_Setting':
            open_GAP_Setting(event);
            break;
        case 'Booking_admin':
            open_Booking_admin(event);
            break;
        case 'Go_POS_Payment':
            openGoPOSforSelling(event);
            break;
        case 'POS_admin_30':
            open_POS_admin(event);
            break;
        case 'Check_In_admin_30':
            open_Check_In_admin(event);
            break;
        case 'Check_Out_admin_30':
            open_Check_Out_admin(event);
            break;
        case 'Dashboard_20':
            openDashboard2(event);
            break;
        default:
            break;
    }
    document.getElementById('mySelect').selectedIndex = 0;
}

document.getElementById('combo-active-button').addEventListener('click', function () {
    const enteridcontainer = document.getElementById('fetch-check-id-information');
    const checkboxes = enteridcontainer.querySelectorAll('.custom-checkbox');
    const lockComboActivate = document.getElementById('lock-combo-activate'); // Get the lock combo activate checkbox

    if (lockComboActivate.checked) {
        // Run pasteClipboard first if "lock-combo-activate" is checked
        pasteClipboard().then(() => {
            processCheckboxes(checkboxes);  // Proceed with the checkbox logic after pasteClipboard
        }).catch(error => {
            console.error('Error during pasteClipboard:', error);
        });
    } else {
        // Proceed with the checkbox logic directly if "lock-combo-activate" is not checked
        processCheckboxes(checkboxes);
    }
});

function processCheckboxes(checkboxes) {
    checkboxes.forEach((checkbox) => {
        // Dùng closest() để tìm thẻ <div> chứa checkbox, sau đó tìm <a> trong đó
        const link = checkbox.closest('div')?.querySelector('a');
        if (!link) {
            console.warn("Không tìm thấy thẻ <a> cho checkbox.");
            return;
        }

        const linkUrl = link.href;

        if (checkbox.checked) {
            // Lấy giá trị tùy chỉnh từ span
            const customValues = document.getElementById('id-of-check-id-information')?.textContent.split(',');

            if (customValues && customValues.length > 0) {
                customValues.forEach(customValue => {
                    customValue = customValue.trim();
                    const modifiedLinkUrl = linkUrl.replace('*****', customValue);
                    console.log("Modified Link URL:", modifiedLinkUrl);

                    // Mở link đã sửa đổi trong tab mới
                    window.open(modifiedLinkUrl, '_blank');
                });
            } else {
                console.log("Không tìm thấy giá trị tùy chỉnh trong span.");
                alert("Vui lòng nhập giá trị hợp lệ vào ô nhập.");
            }
        }
    });
}





function updateCheckInfo(value) {
    const infoElement = document.getElementById('id-of-check-id-information');
    infoElement.textContent = value.match(/\d+/g)?.join(',') || '';
}

async function pasteClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        const maxLength = 50;
        const truncatedText = text.slice(0, maxLength); // Giới hạn tối đa 50 ký tự
        const inputElement = document.getElementById('input-the-text-for-check-info');
        inputElement.value = truncatedText;
        updateCheckInfo(truncatedText);
    } catch (error) {
        console.error('Failed to read clipboard contents: ', error);
    }
}

function clearInputAndSpan() {
    document.getElementById('input-the-text-for-check-info').value = ''; // Clear input
    document.getElementById('id-of-check-id-information').textContent = ''; // Clear span
}




document.getElementById('search-in-more-document-table').addEventListener('input', function () {
    searchContent('moreDocuments');
});

document.getElementById('search-in-Annoucements-table').addEventListener('input', function () {
    searchContent('announcements');
});

var debounceTimeout;

function searchContent(contentType) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(function () {
        var input, filter, table, rows, cells, i, j, txtValue;

        if (contentType === 'moreDocuments') {
            input = document.getElementById('search-in-more-document-table');
            table = document.getElementById('more-document-table').querySelector('table');
        }
        if (contentType === 'announcements') {
            input = document.getElementById('search-in-Annoucements-table');
            table = document.getElementById('Annoucements-table').querySelector('table');
        }

        filter = input.value.toUpperCase().split(' '); // Split the input value by spaces
        rows = table.getElementsByTagName('tr'); // Get all rows in the table

        // Loop through each row in the table
        for (i = 0; i < rows.length; i++) {
            cells = rows[i].getElementsByTagName('td'); // Get all cells in the row
            var found = false;

            // Loop through each cell in the row
            for (j = 0; j < cells.length; j++) {
                txtValue = cells[j].textContent || cells[j].innerText; // Get the text content of the cell
                var firstLetters = txtValue.split(' ').map(function (word) {
                    return word[0];
                }).join(''); // Join the first letters together

                // Check if the filter text matches the full text or the first letters of the cell
                var matchText = filter.every(r => txtValue.toUpperCase().indexOf(r) >= 0); // Match full text
                var matchFirstLetters = filter.some(r => firstLetters.toUpperCase().indexOf(r) >= 0); // Match first letters

                if (matchText || matchFirstLetters) {
                    found = true;
                    break; // If a match is found, no need to check other cells in this row
                }
            }

            // Hide or show rows based on whether a match was found
            if (found) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }, 150); // Debounce the search with a delay of 150ms
}


//Login as guest
document.getElementById("button-guest-login").addEventListener("click", function () {
    LoginGuest();
    const b4Todolistcontent = document.getElementById('b4-To-do-list-content');
    b4Todolistcontent.style.display = 'none';
    const edituserinfomation = document.getElementById('edit-user-infomation');
    edituserinfomation.style.display = 'none';
    const saveuserinfomation = document.getElementById('save-user-infomation');
    saveuserinfomation.style.display = 'none';
    const canceluserinfomation = document.getElementById('cancel-user-infomation');
    canceluserinfomation.style.display = 'none';
    document.getElementById('container-input-edit-new-nickname').style.display = 'none';
    document.getElementById('container-input-edit-new-password').style.display = 'none';
});



// Reload iframe bằng cách gán lại src
document.getElementById("refresh-onboard").addEventListener("click", function () {
    document.getElementById('loader-Onboard_container').classList.remove('hidden');

    const statusContainer = document.getElementById('status-of-updating-Onboard_container-container');
    statusContainer.innerHTML = "";
    statusContainer.style.backgroundColor = '';
    statusContainer.style.color = '';

    let iframe = document.getElementById("iframe-onboard");
    iframe.src = iframe.src;
    setTimeout(function () {
        document.getElementById('loader-Onboard_container').classList.add('hidden');

        // Hiển thị thông báo cập nhật thành công
        statusContainer.innerHTML = "Đã cập nhật xong";
        statusContainer.style.backgroundColor = 'green';
        statusContainer.style.color = 'white';
        statusContainer.style.display = 'flex';

        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
            statusContainer.innerHTML = "";
            statusContainer.style.backgroundColor = '';
            statusContainer.style.color = '';
            statusContainer.style.display = '';
        }, 3000);
    }, 2000);

});


document.addEventListener("DOMContentLoaded", function () {
    const detailsList = document.querySelectorAll(".details-in-body-main-container");

    // Đặt trạng thái mặc định là mở và khôi phục trạng thái đã lưu
    detailsList.forEach((details, index) => {
        const savedState = localStorage.getItem(`details-${index}`);
        if (savedState === "closed") {
            details.removeAttribute("open"); // Đóng nếu đã lưu là closed
        } else {
            details.setAttribute("open", ""); // Mặc định mở
        }

        // Khi bấm để đóng/mở, lưu trạng thái vào localStorage
        details.addEventListener("toggle", () => {
            localStorage.setItem(`details-${index}`, details.open ? "open" : "closed");
        });
    });
});



//ở second-body-main-container lăn chuột lên sẽ qua trái, xuống sẽ qua phải -> ngoại trừ class My_To-Do-List_content
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("second-body-main-container");
    let isMouseInside = false;
    let isOverExcludedElement = false;
    let scrollAnimationFrame = null; // Lưu ID của animation để hủy khi cần
    let isScrolling = false; // Theo dõi trạng thái cuộn

    container.addEventListener("mouseenter", function () {
        isMouseInside = true;
    });

    container.addEventListener("mouseleave", function () {
        isMouseInside = false;
    });

    container.addEventListener("mouseover", function (event) {
        isOverExcludedElement = event.target.closest(".My_To-Do-List_content") !== null;
    });

    container.addEventListener("mouseout", function (event) {
        isOverExcludedElement = event.target.closest(".My_To-Do-List_content") !== null;
    });

    document.addEventListener("wheel", function (event) {
        if (isMouseInside && !isOverExcludedElement) {
            event.preventDefault();
            const scrollAmount = event.deltaY > 0 ? 100 : -100;
            container.scrollLeft += scrollAmount;
        }
    }, { passive: false });

    const scrollbar = document.createElement("div");
    scrollbar.classList.add("scrollbar-text");

    const scrollbarsmalldivLeft = document.createElement("div");
    const scrollbarsmalldivRight = document.createElement("div");
    const scrollbarsmalldivEndLeft = document.createElement("div");
    const scrollbarsmalldivEndRight = document.createElement("div");

    scrollbarsmalldivLeft.title = "Bên trái 500px";
    scrollbarsmalldivRight.title = "Bên phải 500px";
    scrollbarsmalldivEndLeft.title = "Qua hết bên trái";
    scrollbarsmalldivEndRight.title = "Qua hết bên phải";

    scrollbar.appendChild(scrollbarsmalldivLeft);
    scrollbar.appendChild(scrollbarsmalldivEndLeft);
    scrollbar.appendChild(scrollbarsmalldivEndRight);
    scrollbar.appendChild(scrollbarsmalldivRight);
    container.appendChild(scrollbar);

    function smoothScroll(targetPosition) {
        if (isScrolling) {
            cancelAnimationFrame(scrollAnimationFrame); // Hủy animation cũ
        }

        const startPosition = container.scrollLeft;
        const distance = targetPosition - startPosition;
        const speed = 2; // Tốc độ cuộn (px/ms)
        const duration = Math.abs(distance) / speed;
        let startTime = null;
        isScrolling = true;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            container.scrollLeft = startPosition + distance * easeOutQuad(progress);

            if (timeElapsed < duration) {
                scrollAnimationFrame = requestAnimationFrame(animation);
            } else {
                isScrolling = false; // Hoàn thành cuộn
            }
        }

        function easeOutQuad(t) {
            return t * (2 - t);
        }

        scrollAnimationFrame = requestAnimationFrame(animation);
    }

    // Sự kiện click để cuộn mượt sang trái
    scrollbarsmalldivEndLeft.addEventListener("click", function () {
        smoothScroll(0);
    });

    // Sự kiện click để cuộn mượt sang phải
    scrollbarsmalldivEndRight.addEventListener("click", function () {
        smoothScroll(container.scrollWidth);
    });

    // Sự kiện click để cuộn sang trái 500px
    scrollbarsmalldivLeft.addEventListener("click", function () {
        smoothScroll(container.scrollLeft - 500);
    });

    // Sự kiện click để cuộn sang phải 500px
    scrollbarsmalldivRight.addEventListener("click", function () {
        smoothScroll(container.scrollLeft + 500);
    });
});







function updateTotalPrice() {
    let total = 0;
    document.querySelectorAll("[id^='price']").forEach(input => {
        total += parseFloat(input.value) || 0; // Nếu rỗng hoặc NaN thì mặc định là 0
    });

    document.getElementById("totalprice").textContent = `$` + total.toFixed(2); // Cập nhật tổng
}

// Gán sự kiện khi nhập vào các input có id bắt đầu bằng 'price'
document.addEventListener("input", function (event) {
    if (event.target.matches("[id^='price']")) {
        updateTotalPrice();
    }
});


function updateTips() {
    let totalService = 0;
    let serviceAmounts = [];
    let validIndexes = []; // Lưu index của những priceX có giá trị hợp lệ (> 0)

    // Lấy danh sách tất cả các input priceX
    let priceInputs = document.querySelectorAll("[id^='price']");
    priceInputs.forEach((input, index) => {
        let value = parseFloat(input.value) || 0;
        serviceAmounts.push(value);
        if (value > 0) {
            totalService += value;
            validIndexes.push(index); // Chỉ lưu những index có giá trị hợp lệ
        }
    });

    // Lấy tổng tip
    let totalTip = parseFloat(document.getElementById("totaltip").value) || 0;
    let tipElements = document.querySelectorAll("[id^='tip']");

    // Nếu không có priceX hợp lệ, đặt tất cả tipX về 0
    if (validIndexes.length === 0) {
        tipElements.forEach(tipDiv => tipDiv.textContent = "0.00");
        return;
    }

    let lastIndex = validIndexes[validIndexes.length - 1]; // Chỉ định index hợp lệ cuối cùng
    let distributedTip = 0;

    // Tính tip theo tỷ lệ cho tất cả trừ cái cuối cùng
    validIndexes.forEach((index, i) => {
        let tipDiv = tipElements[index];
        if (i < validIndexes.length - 1) {
            let tipAmount = (serviceAmounts[index] / totalService) * totalTip;
            tipAmount = Math.round(tipAmount * 100) / 100; // Làm tròn 2 chữ số thập phân
            tipDiv.textContent = tipAmount.toFixed(2);
            distributedTip += tipAmount; // Tính tổng tip đã phân phối
        } else {
            // Tip cuối cùng = totaltip - tổng các tip đã phân phối
            let lastTip = totalTip - distributedTip;
            lastTip = Math.round(lastTip * 100) / 100; // Làm tròn 2 chữ số thập phân
            tipDiv.textContent = lastTip.toFixed(2);
        }
    });

    // Các tip không hợp lệ (priceX = 0) sẽ đặt về "0.00"
    tipElements.forEach((tipDiv, index) => {
        if (!validIndexes.includes(index)) {
            tipDiv.textContent = "0.00";
        }
    });
}

// Gán sự kiện khi nhập vào #totaltip hoặc các priceX
document.addEventListener("input", function (event) {
    if (event.target.matches("#totaltip") || event.target.matches("[id^='price']")) {
        updateTips();
    }
});


document.addEventListener("click", function (event) {
    if (event.target.classList.contains("buttontipcopy")) {
        let textToCopy = event.target.textContent.trim();
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                let originalText = event.target.textContent;
                let originalColor = event.target.style.color;
                let originalBg = event.target.style.backgroundColor;

                // Đổi màu nền thành vàng, chữ đỏ, nội dung "Copied"
                event.target.textContent = "Copied";
                event.target.style.backgroundColor = "yellow";
                event.target.style.color = "red";
                event.target.classList.add("copied");

                // Sau 3 giây, khôi phục lại trạng thái ban đầu
                setTimeout(() => {
                    event.target.textContent = originalText;
                    event.target.style.backgroundColor = originalBg;
                    event.target.style.color = originalColor;
                    event.target.classList.remove("copied");
                }, 3000);
            }).catch(err => {
                console.error("Error copying text: ", err);
            });
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("TipSplitterContainer");

    function getSortedInputs() {
        let nameInputs = Array.from(container.querySelectorAll("input[id^='name']"));
        let priceInputs = Array.from(container.querySelectorAll("input[id^='price']"));
        let totalTipInput = document.getElementById("totaltip");

        return [...nameInputs, ...priceInputs, totalTipInput];
    }

    function updateTabIndex() {
        let sortedInputs = getSortedInputs();
        sortedInputs.forEach((input, index) => {
            input.tabIndex = index + 1;
        });
    }

    // Xử lý Tab để quay lại đầu khi đến cuối
    container.addEventListener("keydown", function (event) {
        if (event.key === "Tab") {
            let sortedInputs = getSortedInputs();
            let currentIndex = sortedInputs.indexOf(document.activeElement);
            if (currentIndex === sortedInputs.length - 1) {
                event.preventDefault();
                sortedInputs[0].focus();
            }
        }
    });

    // Xử lý khi bấm "Click to add row" hoặc "Clear all data"
    container.addEventListener("click", function (event) {
        if (event.target.id === "add-row-in-TipSplitterContainer") {
            let rowCount = container.querySelectorAll("[id^='price']").length + 1; // Đếm đúng số lượng priceX
            let newRow = document.createElement("div");

            newRow.innerHTML = `
                <input class="date-input-in-timeconverter" type="text" id="name${rowCount}" placeholder="Staff Name (Not required)"/>
                <div style="display: flex; position: relative; justify-content: center; align-items: center;">
                    <span style="position: absolute; left: 1rem;">$</span>
                    <input class="date-input-in-timeconverter" style="padding-left: 2.6rem;" type="number" min="0" max="1000" id="price${rowCount}" placeholder="Service amount" required>
                </div>
                <div id="tip${rowCount}" class="buttontipcopy"></div>
            `;

            let buttonRow = document.getElementById("add-row-in-TipSplitterContainer").parentElement;
            container.insertBefore(newRow, buttonRow);
            updateTabIndex(); // Cập nhật lại tabindex sau khi thêm dòng mới
        }

        if (event.target.id === "clear-all-data-in-TipSplitterContainer") {
            // Xóa nội dung của tất cả input
            getSortedInputs().forEach(input => input.value = "");

            // Xóa nội dung tipX
            document.querySelectorAll("[id^='tip']").forEach(tip => tip.textContent = "");

            // Reset totalprice về 0
            document.getElementById("totalprice").textContent = "";

            // Giữ lại 3 dòng đầu tiên, xóa các dòng nhân viên còn lại
            let rows = container.querySelectorAll("#TipSplitterContainer > div");
            rows.forEach((row, index) => {
                if (index > 4 && row.querySelector("input[id^='name']")) {
                    row.remove();
                }
            });

            updateTabIndex(); // Cập nhật lại tabindex
        }
    });

    updateTabIndex(); // Chạy lần đầu để thiết lập tabindex đúng
});



// Lắng nghe sự kiện click vào phần tử có class .All và .Approval trong More Document NEW
document.querySelector('.All').addEventListener('click', function () {
    // Thêm lớp .selected vào .All và loại bỏ khỏi .Approval
    document.querySelector('.All').classList.add('selected');
    document.querySelector('.Approval').classList.remove('selected');

    // Cập nhật lại z-index
    document.querySelector('.All').style.zIndex = 1;
    document.querySelector('.Approval').style.zIndex = 0;
});

document.querySelector('.Approval').addEventListener('click', function () {
    // Thêm lớp .selected vào .Approval và loại bỏ khỏi .All
    document.querySelector('.Approval').classList.add('selected');
    document.querySelector('.All').classList.remove('selected');

    // Cập nhật lại z-index
    document.querySelector('.Approval').style.zIndex = 1;
    document.querySelector('.All').style.zIndex = 0;
});










// Search Tag trong input tag
document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("search-tag-more-document-NEW");
    const tagContainer = document.getElementById("tag-in-more-document");
    const message = document.createElement("div");
    message.id = "no-results-message";
    message.style.display = "none"; // Ẩn thông báo khi bắt đầu
    message.textContent = "Không tìm thấy kết quả";
    tagContainer.appendChild(message);

    input.addEventListener("input", function () {
        const keyword = input.value.trim().toLowerCase();
        const tagDivs = Array.from(tagContainer.children);

        // Xử lý khi ô tìm kiếm rỗng
        if (keyword === "") {
            tagDivs.forEach(div => div.style.display = "");
            message.style.display = "none"; // Ẩn thông báo nếu tìm kiếm rỗng
            return;
        }

        const includesMatches = tagDivs.filter(div => {
            const span = div.querySelector("span.tag-More-Documents");
            if (!span) return false;
            return span.textContent.trim().toLowerCase().includes(keyword);
        });

        if (includesMatches.length > 0) {
            tagDivs.forEach(div => {
                div.style.display = includesMatches.includes(div) ? "" : "none";
            });
            message.style.display = "none"; // Ẩn thông báo nếu có kết quả
        } else {
            // Nếu không có kết quả, ẩn tất cả các tag và hiển thị thông báo
            tagDivs.forEach(div => div.style.display = "none");
            message.style.display = "flex";
        }
    });
});




//Đếm số lượng tag được checked trong phần filter Tag
document.addEventListener("DOMContentLoaded", function () {
    // Hàm đếm số lượng input được checked và cập nhật vào #count-opened-tag
    function updateCheckedInputCount() {
        const checkedInputCount = document.querySelectorAll('#tag-in-more-document input:checked').length;
        const countElement = document.getElementById('count-opened-tag');

        // Cập nhật số lượng vào #count-opened-tag
        countElement.textContent = checkedInputCount.toString().padStart(2, '0');

        // Hiển thị #count-opened-tag nếu số lượng > 0, nếu không thì ẩn
        if (checkedInputCount > 0) {
            countElement.style.display = 'flex';
        } else {
            countElement.style.display = 'none';
        }
    }

    // Đếm số lượng input được checked khi trang được tải
    updateCheckedInputCount();

    // Lắng nghe sự kiện thay đổi trạng thái của các checkbox input
    const tagContainer = document.getElementById('tag-in-more-document');

    // Lắng nghe sự kiện thay đổi trạng thái (checked/unchecked) của các input
    tagContainer.addEventListener('change', function () {
        updateCheckedInputCount();
    });

    // Nếu bạn muốn đếm thay đổi ngay lập tức khi thêm input mới, có thể dùng MutationObserver
    const observer = new MutationObserver(updateCheckedInputCount);
    observer.observe(tagContainer, {
        childList: true,  // Theo dõi thêm/xóa phần tử con
        subtree: true     // Theo dõi tất cả các phần tử con của tagContainer
    });
});




document.addEventListener('DOMContentLoaded', function () {

    // Hàm lọc theo tag
    function filterRowsByTags() {
        const checkedTags = [];
        document.querySelectorAll('#tag-in-more-document input.custom-checkbox:checked').forEach(checkbox => {
            checkedTags.push(checkbox.value);
        });

        const rows = document.querySelectorAll('tr');
        const filteredRows = [];

        rows.forEach(row => {
            const buttons = row.querySelectorAll('td button');
            let isRowVisible = true;

            checkedTags.forEach(tag => {
                let hasTag = false;

                buttons.forEach(button => {
                    const buttonText = button.textContent || button.innerText;
                    if (buttonText.includes(tag)) {
                        hasTag = true;
                    }
                });

                if (!hasTag) {
                    isRowVisible = false;
                }
            });

            if (isRowVisible) {
                filteredRows.push(row);
            }
        });

        return filteredRows;
    }

    // Hàm lọc theo sở thích
    function toggleFavoriteRows(rows) {
        const isChecked = document.getElementById('Checked-to-see-favorite-only').checked;
        const filteredRows = [];

        rows.forEach(row => {
            const favoriteCheckbox = row.querySelector('.Favorite_row_checkbox');
            if (favoriteCheckbox) {
                if (isChecked && !favoriteCheckbox.checked) {
                    return;
                }
            }
            filteredRows.push(row);
        });

        return filteredRows;
    }

    // Hàm tìm kiếm ( bỏ qua cột 1(favorite) và 2(id của hàng) )
    function searchContentNEW(contentType, rows) {
        var input, filter, txtValue, found;

        if (contentType === 'moreDocumentsNEW') {
            input = document.getElementById('search-in-more-document-table_NEW');
        }

        filter = input.value.toUpperCase().split(' ');

        rows.forEach(row => {
            const cells = row.getElementsByTagName('td');
            found = false;

            for (let j = 2; j < cells.length; j++) {
                txtValue = cells[j].textContent || cells[j].innerText;
                var firstLetters = txtValue.split(' ').map(function (word) {
                    return word[0];
                }).join('');

                var matchText = filter.every(r => txtValue.toUpperCase().indexOf(r) >= 0);
                var matchFirstLetters = filter.some(r => firstLetters.toUpperCase().indexOf(r) >= 0);

                if (matchText || matchFirstLetters) {
                    found = true;
                    break;
                }
            }

            if (found) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }

    // Hàm cập nhật hiển thị các dòng sau khi lọc
    function updateVisibleRows() {
        let rows = Array.from(document.querySelectorAll('tr'));

        rows = filterRowsByTags();
        rows = toggleFavoriteRows(rows);

        rows.forEach(row => {
            row.style.display = '';
        });

        document.querySelectorAll('tr').forEach(row => {
            if (!rows.includes(row)) {
                row.style.display = 'none';
            }
        });

        searchContentNEW('moreDocumentsNEW', rows);
    }

    // Lắng nghe sự kiện thay đổi checkbox (tag và sở thích)
    document.addEventListener('change', function (e) {
        if (e.target.matches('#tag-in-more-document input.custom-checkbox') ||
            e.target.matches('.Favorite_row_checkbox') ||
            e.target.matches('#Checked-to-see-favorite-only')) {
            updateVisibleRows();
        }
    });

    // Sự kiện tìm kiếm
    document.getElementById('search-in-more-document-table_NEW').addEventListener('input', function () {
        updateVisibleRows();
    });

    // Lắng nghe sự kiện bỏ chọn tất cả tag
    document.getElementById('unchecked-all-tag-in-more-document').addEventListener('click', function () {
        var checkboxes = document.querySelectorAll('#tag-in-more-document input[type="checkbox"]');
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });

        document.getElementById('count-opened-tag').innerText = '0';
        document.getElementById('count-opened-tag').style.display = 'none';
        document.getElementById('search-tag-more-document-NEW').value = '';

        const tags = document.querySelectorAll('#tag-in-more-document div');
        tags.forEach(function (tag) {
            tag.style.display = "";
        });
        document.getElementById('no-results-message').style.display = 'none';

        updateVisibleRows();
    });

});




// Thêm sự kiện click cho nút "Add new row" trong More Document NEW
document.getElementById("Add-new-row-into-More-Document-NEW").addEventListener("click", function () {
    const container = document.getElementById("More-Document_container_Edit_NEW_add-new-row");
    container.style.display = "flex";
});




// Tạo sự đồng nhất cho các ô contenteditable
document.addEventListener("DOMContentLoaded", function () {
    const editableDivs = [
        "Title-Of-Row-More-Document",
        "Title-Of-Row-More-Document_add-new-row",
        "Content-Of-Row-More-Document",
        "Content-Of-Row-More-Document_add-new-row"
    ];

    editableDivs.forEach(id => {
        const div = document.getElementById(id);
        if (div) {
            div.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();

                    // Tạo <br> và một khoảng trắng zero-width để giữ caret đúng vị trí
                    const br = document.createElement("br");
                    const zwsp = document.createTextNode("\u200B"); // zero-width space

                    const selection = window.getSelection();
                    if (!selection.rangeCount) return;

                    const range = selection.getRangeAt(0);
                    range.deleteContents();
                    range.insertNode(br);
                    range.collapse(false);
                    range.insertNode(zwsp); // Thêm zwsp để caret có thể nhảy qua <br>

                    // Di chuyển con trỏ sau zwsp
                    range.setStartAfter(zwsp);
                    range.setEndAfter(zwsp);

                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            });

            // Cleanup nếu paste có thẻ <div>
            // div.addEventListener("input", () => {
            //     let html = div.innerHTML;
            //     html = html.replace(/<div>/gi, "").replace(/<\/div>/gi, "<br>");
            //     div.innerHTML = html;
            //     placeCaretAtEnd(div);
            // });
        }
    });

    // function placeCaretAtEnd(el) {
    //     el.focus();
    //     const range = document.createRange();
    //     range.selectNodeContents(el);
    //     range.collapse(false);
    //     const sel = window.getSelection();
    //     sel.removeAllRanges();
    //     sel.addRange(range);
    // }
});





// Paste Value Only: chỉ dán văn bản vào các ô nhập liệu, không dán hình thức, phong cách
const plainTextPasteOnly = (id) => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('paste', function (e) {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text');
            const html = text.replace(/\n/g, '<br>');
            document.execCommand('insertHTML', false, html);
            placeCaretAtEnd(id);
        });
    }
};
[
    'Title-Of-Row-More-Document_add-new-row',
    'Content-Of-Row-More-Document_add-new-row',
    'Title-Of-Row-More-Document',
    'Content-Of-Row-More-Document',
    'Add-To-do-list-content'
].forEach(plainTextPasteOnly);

// Paste Value Only: áp dụng cho span của To-do-list
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener('paste', function (e) {
        const target = e.target;
        console.log('Paste event detected');
        console.log('Target:', target);

        if (target.matches('#my-To-do-list-personal-fetch-container span[contenteditable="true"]')) {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            console.log('Plain text pasted:', text);
            document.execCommand('insertText', false, text);
        } else {
            console.log('Paste target is not valid.');
        }
    });
});



// Ngăn chặn phóng to/thu nhỏ trang bằng Ctrl + chuột lăn hoặc Ctrl + phím +/-
document.addEventListener("wheel", function (e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "0")) {
        e.preventDefault();
    }
});


// đăng ký the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
    });
}




// Sửa lại giá trị của ô A1 trong Sheet "Lich Truc (copy)"
document.getElementById('updateA1Btn').addEventListener('click', function () {
    // Lấy giá trị từ các input
    var sheetName = document.getElementById('sua-ten-sheet').value;
    var cellReference = document.getElementById('sua-o-dau-tien-trong-sheet').value;
    var lastcellReference = document.getElementById('sua-o-cuoi-cung-trong-sheet').value;
    var statusContainer = document.getElementById('status-of-updating-lichtruc-container');
    var loaderupdatelichtruc = document.getElementById('loader-update-lichtruc');
    var updateidlichtruc = document.getElementById('update-id-lichtruc');

    // Xóa thông báo cũ
    statusContainer.innerHTML = '';

    if (!sheetName || !cellReference || !lastcellReference) {
        statusContainer.innerHTML = "Vui lòng nhập đầy đủ thông tin.";
        statusContainer.style.backgroundColor = 'red';
        statusContainer.style.color = 'white';
        statusContainer.style.display = 'flex';
        autoHideStatus();
        return;
    }

    // Hiện loader trong lúc chờ
    updateidlichtruc.classList.add('hidden');
    loaderupdatelichtruc.classList.remove('hidden');

    // Tạo công thức IMPORTRANGE
    var formula = '=IMPORTRANGE("1s2a2QqSHId1XKQTW2dSoBcQ-aBNBiF54VtNKMMZ_ADQ", "\'' + sheetName + '\'!' + cellReference + '\:' + lastcellReference + '")';

    // URL script đã cung cấp
    var scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    var data = {
        action: 'editA1-trong-lich-truc-copy',
        value: formula
    };

    // Gửi POST request đến Google Apps Script
    fetch(scriptURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data).toString()
    })
        .then(response => response.text())
        .then(data => {
            refreshLichTruc();
        })
        .catch(error => {
            console.error('Error:', error);
            // Hiển thị thông báo khi gặp lỗi
            statusContainer.innerHTML = "Đã có lỗi xảy ra: " + error.message + "";
            statusContainer.style.backgroundColor = 'red';
            statusContainer.style.color = 'white';
            statusContainer.style.display = 'flex';
            autoHideStatus();
        })
        .finally(() => {
            // Ẩn loader sau khi hoàn thành hoặc gặp lỗi
            loaderupdatelichtruc.classList.add('hidden');
            updateidlichtruc.classList.remove('hidden');
        });

    // Hàm tự động ẩn thông báo sau 3 giây
    function autoHideStatus() {
        setTimeout(function () {
            statusContainer.innerHTML = "";
            statusContainer.style.backgroundColor = '';
            statusContainer.style.color = '';
            statusContainer.style.display = '';

        }, 3000); // Ẩn sau 3 giây
    }
});



// Hiển thị Lịch trực cuối tuần
fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=getLichTrucCopy', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
    .then(response => response.json()) // Dữ liệu trả về sẽ là JSON
    .then(data => {
        // Tạo bảng từ dữ liệu
        var table = '<table border="1" cellpadding="5" cellspacing="0">';

        // Tạo tiêu đề bảng (dòng đầu tiên là tiêu đề cột)
        table += '<thead style="z-index:10;"><tr>';
        if (data.length > 0) {
            for (var i = 0; i < data[0].length; i++) {
                if (i === 0) {
                    table += '<th>' + data[0][i] + '</th>';
                } else {
                    table += '<th><div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 1rem"><div class="white-delete-icon"></div><span>' + data[0][i] + '</span></div></th>';
                }
            }
            table += '</tr></thead>';
        }

        // Tạo nội dung bảng
        table += '<tbody>';
        for (var i = 1; i < data.length; i++) {
            table += '<tr>';
            for (var j = 0; j < data[i].length; j++) {
                if (j === 0) {
                    table += '<td style="padding: 0; margin: 0;"><div style="display: flex; align-items: center; justify-content: space-between;"><div class="white-delete-icon"></div><span style="flex: 1;">' + data[i][j] + '</span></div></td>';
                } else {
                    table += '<td>' + data[i][j] + '</td>';
                }
            }
            table += '</tr>';
        }
        table += '</tbody>';

        table += '</table>';

        // Hiển thị bảng trong div
        document.getElementById('lich-truc-cuoi-tuan-view').innerHTML = table;

        // Thêm chức năng cho các white-delete-icon
        addDeleteIconFunctions();
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('lich-truc-cuoi-tuan-view').innerHTML = 'Lỗi khi tải dữ liệu.';
    });

function addDeleteIconFunctions() {
    // Gắn data-index cho các th
    document.querySelectorAll('thead th').forEach((th, index) => {
        th.setAttribute('data-index', index);
    });

    // Ẩn cột khi click white-delete-icon trong <th>
    const thIcons = document.querySelectorAll('thead .white-delete-icon');
    thIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const th = icon.closest('th');
            const colIndex = th.getAttribute('data-index'); // Lấy chỉ số cột từ data-index

            // Ẩn cột <th>
            th.style.display = 'none';

            // Ẩn tất cả <td> trong cột tương ứng
            document.querySelectorAll(`tbody tr`).forEach(row => {
                const td = row.querySelectorAll('td')[colIndex];
                if (td) td.style.display = 'none';
            });
        });
    });

    // Ẩn hàng khi click white-delete-icon trong <td>
    const tdIcons = document.querySelectorAll('tbody .white-delete-icon');
    tdIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const tr = icon.closest('tr');
            if (tr) tr.style.display = 'none'; // Ẩn hàng
        });
    });
}

// Nút Show All
document.getElementById('Show-all-in-lichtruc-container').addEventListener('click', function () {
    // Hiện tất cả các cột và hàng trong bảng
    document.querySelectorAll('thead th').forEach(th => {
        th.style.display = 'table-cell'; // Hiện cột tiêu đề
    });

    document.querySelectorAll('tbody td').forEach(row => {
        row.style.display = 'table-cell'; // Hiện các hàng trong bảng
    });

    document.querySelectorAll('tbody tr').forEach(row => {
        row.style.display = 'table-row'; // Hiện các hàng trong bảng
    });


    var statusContainer = document.getElementById('status-of-updating-lichtruc-container');
    statusContainer.innerHTML = "Đã hiện tất cả";
    statusContainer.style.backgroundColor = 'green';
    statusContainer.style.color = 'white';
    statusContainer.style.display = 'flex';
    setTimeout(function () {
        statusContainer.innerHTML = "";
        statusContainer.style.backgroundColor = '';
        statusContainer.style.color = '';
        statusContainer.style.display = '';
    }, 3000);
});



// Nút refresh
function refreshLichTruc() {
    const targetView = document.getElementById('lich-truc-cuoi-tuan-view');
    const statusContainer = document.getElementById('status-of-updating-lichtruc-container');
    const loaderlichtruc = document.getElementById('loader-lichtruc');

    // Hiển thị loader & xóa nội dung cũ trước khi fetch
    loaderlichtruc.classList.remove('hidden');
    targetView.innerHTML = "";

    console.log("🔄 Đang tải dữ liệu...");

    // Gọi fetch dữ liệu từ Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=getLichTrucCopy', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ Dữ liệu đã nhận:", data);

            // Kiểm tra nếu dữ liệu rỗng
            if (!data || data.length === 0) {
                targetView.innerHTML = "<p>Không có dữ liệu.</p>";
                return;
            }

            // Tạo bảng từ dữ liệu
            let table = '<table border="1" cellpadding="5" cellspacing="0">';

            table += '<thead style="z-index:10;"><tr>';
            for (let i = 0; i < data[0].length; i++) {
                if (i === 0) {
                    table += `<th>${data[0][i]}</th>`;
                } else {
                    table += `<th><div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 1rem"><div class="white-delete-icon"></div><span>${data[0][i]}</span></div></th>`;
                }
            }
            table += '</tr></thead>';

            table += '<tbody>';
            for (let i = 1; i < data.length; i++) {
                table += '<tr>';
                for (let j = 0; j < data[i].length; j++) {
                    if (j === 0) {
                        table += `<td style="padding: 0; margin: 0;"><div style="display: flex; align-items: center; justify-content: space-between;"><div class="white-delete-icon"></div><span style="flex: 1;">${data[i][j]}</span></div></td>`;
                    } else {
                        table += `<td>${data[i][j]}</td>`;
                    }
                }
                table += '</tr>';
            }
            table += '</tbody>';
            table += '</table>';

            // Cập nhật giao diện
            targetView.innerHTML = table;

            addDeleteIconFunctions();
        })
        .catch(error => {
            console.error("❌ Lỗi khi tải dữ liệu:", error);
            targetView.innerHTML = `<p style="color: red;">Lỗi khi tải dữ liệu: ${error.message}</p>`;
        })
        .finally(() => {
            // Ẩn loader khi hoàn tất
            loaderlichtruc.classList.add('hidden');

            // Hiển thị thông báo cập nhật thành công
            statusContainer.innerHTML = "Đã cập nhật xong";
            statusContainer.style.backgroundColor = 'green';
            statusContainer.style.color = 'white';
            statusContainer.style.display = 'flex';

            // Tự động ẩn thông báo sau 3 giây
            setTimeout(() => {
                statusContainer.innerHTML = "";
                statusContainer.style.backgroundColor = '';
                statusContainer.style.color = '';
                statusContainer.style.display = '';
            }, 3000);
        });
}







function fetchSMSData() {
    const url = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=getSMSData'; // Updated URL
    const params = {}; // No need to pass action in params since it's already in the URL

    // Gửi yêu cầu GET tới backend
    fetch(url, {
        method: 'GET',  // Changed method to GET
    })
        .then(response => response.json())  // Chuyển dữ liệu từ JSON
        .then(data => renderSMSData(data))  // Xử lý và hiển thị dữ liệu
        .catch(error => console.error('Error fetching data:', error));
}


fetchSMSData();

function renderSMSData(data) {
    const container = document.getElementById('fetchSMSFromManagers');

    // Hàm để gom nhóm dữ liệu theo cột A
    function groupBy(data, columnIndex) {
        return data.reduce((groups, item) => {
            const key = item[columnIndex];
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {});
    }

    // Hàm để chuyển đổi ký tự có dấu thành không dấu
    function removeAccents(str) {
        var accents = 'ÀÁÂÃĂẠẢẤẦẨẪẬẮẰẲẴẶàáâãăạảấầẩẫậắằẳẵặĐđÝỲỴỶỸýỳỵỷỹÌÍĨỈỊìíĩỉịÙÚŨƯỤỦỨỪỬỮỰùúũưụủứừửữựÒÓÔÕƠỌỎỐỒỔỖỘỚỜỞỠỢòóôõơọỏốồổỗộớờởỡợÈÉÊẸẺẼẾỀỂỄỆèéêẹẻẽếềểễệ';
        var accentsOut = 'AAAAAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaDdYYYYYyyyyyIIIIIiiiiiUUUUUUUUUUUuuuuuuuuuuuOOOOOOOOOOOOOOOOOoooooooooooooooooEEEEEEEEEEEeeeeeeeeeee';

        return str.split('').map(function (char) {
            var index = accents.indexOf(char);
            return index !== -1 ? accentsOut.charAt(index) : char;
        }).join('');
    }

    // Sắp xếp dữ liệu theo cột A để gom nhóm
    const groupedData = groupBy(data, 1); // Sắp xếp theo cột A (index 0)

    // Tạo nhóm DOM
    for (const group in groupedData) {
        const columnB = document.createElement('div');
        columnB.classList.add('columnB'); // Thêm lớp cho nhóm
        columnB.setAttribute('data-group-title', group);

        const columngroupC = document.createElement('div');
        columngroupC.classList.add('columngroupC');

        let createdInput = false; // Cờ để kiểm tra xem đã tạo input chưa

        // Thêm các cột B và C tương ứng dưới cột A
        groupedData[group].forEach(item => {
            const columnC = document.createElement('div');
            columnC.classList.add('columnC');
            columnC.innerText = item[2]; // Cột B (index 1)

            // Thay đổi columnD thành <span> thay vì <div>
            const columnD = document.createElement('span');
            columnD.classList.add('columnD');
            columnD.style.display = 'none';
            columnD.innerText = item[3]; // Cột C (index 2)
            columnD.setAttribute('data-original', item[3]);

            // Gắn sự kiện click để copy nội dung columnD
            columnC.addEventListener('click', () => {
                const originalText = columnC.innerText; // Lưu nội dung ban đầu
                const contentToCopy = columnD.innerHTML.replace(/<br\s*\/?>/gi, '\n').trim();

                navigator.clipboard.writeText(contentToCopy).then(() => {
                    columnC.innerText = 'Copied'; // Đổi nội dung thành "Copied"
                    columnC.style.color = 'red';
                    columnC.style.backgroundColor = 'yellow';
                    // Sau 3 giây, khôi phục nội dung ban đầu
                    setTimeout(() => {
                        columnC.innerText = originalText;
                        columnC.style.color = '';
                        columnC.style.backgroundColor = '';
                    }, 3000); // 3000 ms = 3 giây
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });



            // Nếu item[0] bằng "Có" và chưa tạo input, tạo 1 input cho nhóm này
            if (item[0] === "Có" && !createdInput) {
                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.placeholder = 'Your Name';
                inputField.classList.add('columnA'); // Thêm lớp CSS nếu cần
                columnB.appendChild(inputField);
                createdInput = true; // Đánh dấu đã tạo input cho nhóm này

                // Gắn sự kiện cho inputField
                inputField.addEventListener('input', function () {
                    let value = inputField.value;

                    // Chuyển đổi value thành không dấu
                    let value2 = removeAccents(value);

                    // Lặp qua tất cả các columnD trong nhóm và cập nhật nội dung
                    columngroupC.querySelectorAll('.columnD').forEach(columnD => {
                        let originalText = columnD.getAttribute('data-original'); // Lấy giá trị gốc
                        columnD.innerText = originalText.replace('***', value).replace('---', value2);
                    });
                });
            }

            columnC.appendChild(columnD);
            columngroupC.appendChild(columnC);
        });

        columnB.appendChild(columngroupC);

        // Thêm nhóm vào container, Thêm nhóm vào trước div "My-Personal-SMS"
        const personalSMS = document.querySelector('.columnB.My-Personal-SMS');
        container.insertBefore(columnB, personalSMS);

    }
}



fetchAndDisplayCheckIDInformation();


async function fetchAndDisplayCheckIDInformation() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=CheckIDInformation'; // Updated URL

    try {
        const response = await fetch(scriptURL, {
            method: 'GET',  // Changed method to GET since action is part of the URL
        });

        const result = await response.json();

        // Pass the fetched result to the createLinks function
        createLinks(result);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



function createLinks(result) {
    // Clear existing content
    const container = document.getElementById('fetch-check-id-information');
    container.innerHTML = '';

    result.forEach((item, index) => {
        const name = item[0];  // Name from column A
        let linkUrl = item[1];  // URL from column B

        // Create the <a> element
        const link = document.createElement('a');
        link.href = linkUrl;
        link.classList.add('Open-button');
        link.textContent = name;

        // Tạo checkbox
        const labelcheckbox = document.createElement('label');
        labelcheckbox.classList.add('checkbox-container', 'absolutecenter');

        const divcheckbox = document.createElement('div');
        divcheckbox.classList.add('checkmark');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.classList.add('custom-checkbox');

        // Check localStorage to restore the state of the checkbox
        const storedState = localStorage.getItem('checkboxState' + index);
        if (storedState === 'checked') {
            input.checked = true;
        } else {
            input.checked = false;
        }

        // Add event listener to change localStorage when checkbox state changes
        input.addEventListener('change', function () {
            if (input.checked) {
                localStorage.setItem('checkboxState' + index, 'checked');
            } else {
                localStorage.setItem('checkboxState' + index, 'unchecked');
            }
        });

        const group = document.createElement('div');
        group.style.position = 'relative';
        group.appendChild(link);
        group.appendChild(labelcheckbox);

        labelcheckbox.appendChild(input);
        labelcheckbox.appendChild(divcheckbox);

        // Add event listener to replace "*****" and open in new tabs
        link.addEventListener('click', function (event) {
            // Prevent the default action of opening the link
            event.preventDefault();

            // Check if the checkbox is checked
            const isLockChecked = document.getElementById('lock-combo-activate').checked;
            if (isLockChecked) {
                // If checked, execute pasteClipboard and updateCheckInfo
                pasteClipboard().then(() => {
                    const customValues = document.getElementById('id-of-check-id-information')?.textContent.split(',');

                    if (customValues && customValues.length > 0) {
                        customValues.forEach(customValue => {
                            customValue = customValue.trim();
                            const modifiedLinkUrl = linkUrl.replace('*****', customValue);
                            console.log("Modified Link URL:", modifiedLinkUrl);

                            // Now open the modified link in a new tab
                            window.open(modifiedLinkUrl, '_blank');
                        });
                    } else {
                        console.log("No custom values found in span.");
                        alert("Please enter valid values in the input field.");
                    }
                });
            } else {
                // If not checked, just proceed with the link click as usual
                const customValues = document.getElementById('id-of-check-id-information')?.textContent.split(',');

                if (customValues && customValues.length > 0) {
                    customValues.forEach(customValue => {
                        customValue = customValue.trim();
                        const modifiedLinkUrl = linkUrl.replace('*****', customValue);
                        console.log("Modified Link URL:", modifiedLinkUrl);

                        window.open(modifiedLinkUrl, '_blank');
                    });
                } else {
                    console.log("No custom values found in span.");
                    alert("Please enter valid values in the input field.");
                }
            }
        });

        container.appendChild(group);
    });
}



fetchAndDisplayGetServer();

let map = {}; // Biến lưu trữ dữ liệu sau khi fetch

async function fetchAndDisplayGetServer() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=GetServer'; // Updated URL

    try {
        const response = await fetch(scriptURL, {
            method: 'GET',  // Changed method to GET since action is part of the URL
        });

        const result = await response.json();

        // Pass the fetched result to the createLinks function
        createLinksGetServer(result);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function createLinksGetServer(data) {
    const dropdown = document.getElementById("dropdown");
    dropdown.innerHTML = ""; // Clear existing options

    map = {}; // Reset map

    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Click to choose Server";
    defaultOption.disabled = true; // Không cho phép chọn lại nếu đã chọn server khác
    defaultOption.selected = true; // Là tùy chọn mặc định
    dropdown.appendChild(defaultOption);

    // Add server options from data
    data.forEach((row, index) => {
        const [serverName, someValue, serverIDH] = row;

        // Populate the dropdown with server names
        const option = document.createElement("option");
        option.value = index;
        option.textContent = serverName;
        dropdown.appendChild(option);

        // Map index to server details
        map[index] = {
            name: serverName,
            someValue: someValue,
            serverIDH: serverIDH // Cột thứ 3
        };
    });
}


fetchAndDisplayGetOtherDocuments();

async function fetchAndDisplayGetOtherDocuments() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=GetOtherDocuments'; // Updated URL

    try {
        const response = await fetch(scriptURL, {
            method: 'GET',  // Changed method to GET since action is part of the URL
        });

        const result = await response.json();

        // Pass the fetched result to the createLinks function
        createLinksGetOtherDocuments(result);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function createLinksGetOtherDocuments(data) {
    // Get the container where the links will be appended
    const container = document.getElementById('fetch-other-documents'); // Ensure you have an element with this ID in your HTML
    container.innerHTML = '';
    data.forEach(row => {
        const link = document.createElement('a');

        link.textContent = row[0];
        link.href = row[1];
        link.target = '_blank';
        link.classList.add('Open-button');
        container.appendChild(link);
    });
}

fetchAndDisplayDocuments();

async function fetchAndDisplayDocuments() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=GetMoreDocuments');
        const data = await response.json();

        function convertUrlsToLinks(text) {
            var urlRegex = /(https?:\/\/[^\s<]+)/g;
            text = text.replace(urlRegex, function (url) {
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            });
            return text.replace(/\n/g, '<br>');  // Convert line breaks to <br> tags
        }

        if (Array.isArray(data) && data.length > 0) {
            const container = document.querySelector('#more-document-table');
            container.innerHTML = '';

            const table = document.createElement('table');
            const tbody = document.createElement('tbody');

            data.forEach(row => {
                const tableRow = document.createElement('tr');
                const titleCell = document.createElement('td');
                titleCell.innerHTML = convertUrlsToLinks(row[0]);
                tableRow.appendChild(titleCell);

                const dateCell = document.createElement('td');
                dateCell.innerHTML = convertUrlsToLinks(row[1]);
                tableRow.appendChild(dateCell);

                tbody.appendChild(tableRow);
            });

            table.appendChild(tbody);
            container.appendChild(table);
        } else {
            console.error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
}


document.getElementById("refresh-more-documents-container").addEventListener("click", async function () {
    const statusContainer = document.getElementById('status-of-updating-more-documents-container');
    statusContainer.innerHTML = "";
    statusContainer.style.backgroundColor = '';
    statusContainer.style.color = '';

    const loader = document.getElementById('loader-more-documents');
    loader.classList.remove('hidden'); // Hiện loader

    const container = document.querySelector('#more-document-table');
    container.innerHTML = ''; // Xóa nội dung cũ

    await fetchAndDisplayDocuments(); // Chờ fetch hoàn tất

    loader.classList.add('hidden'); // Ẩn loader ngay sau khi fetch hoàn tất

    // Hiển thị thông báo cập nhật thành công
    statusContainer.innerHTML = "Đã cập nhật xong";
    statusContainer.style.backgroundColor = 'green';
    statusContainer.style.color = 'white';
    statusContainer.style.display = 'flex';

    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
        statusContainer.innerHTML = "";
        statusContainer.style.backgroundColor = '';
        statusContainer.style.color = '';
        statusContainer.style.display = '';
    }, 3000);

});







// Chuyển đổi URL thành liên kết (Gọi sau cùng)
function convertUrlsToLinks(text) {
    var urlRegex = /(https?:\/\/[^\s<]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
}
















fetchAndDisplayAnnoucements();

async function fetchAndDisplayAnnoucements() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=GetAnnoucements');
        const data = await response.json();

        function convertUrlsToLinks(text) {
            var urlRegex = /(https?:\/\/[^\s<]+)/g;
            text = text.replace(urlRegex, function (url) {
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            });
            return text.replace(/\n/g, '<br>');  // Convert line breaks to <br> tags
        }

        if (Array.isArray(data) && data.length > 0) {
            const container = document.querySelector('#Annoucements-table');
            container.innerHTML = '';

            const table = document.createElement('table');
            const tbody = document.createElement('tbody');

            data.forEach(row => {
                const tableRow = document.createElement('tr');
                const titleCell = document.createElement('td');
                titleCell.innerHTML = convertUrlsToLinks(row[0]);
                tableRow.appendChild(titleCell);

                tbody.appendChild(tableRow);
            });

            table.appendChild(tbody);
            container.appendChild(table);
        } else {
            console.error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
}


document.getElementById("refresh-annoucement-container").addEventListener("click", async function () {
    const statusContainer = document.getElementById('status-of-updating-Annoucements_container-container');
    statusContainer.innerHTML = "";
    statusContainer.style.backgroundColor = '';
    statusContainer.style.color = '';

    const loader = document.getElementById('loader-Annoucements_container');
    loader.classList.remove('hidden'); // Hiện loader

    const container = document.querySelector('#Annoucements-table');
    container.innerHTML = ''; // Xóa nội dung cũ

    await fetchAndDisplayAnnoucements(); // Chờ fetch hoàn tất

    loader.classList.add('hidden'); // Ẩn loader ngay sau khi fetch hoàn tất

    // Hiển thị thông báo cập nhật thành công
    statusContainer.innerHTML = "Đã cập nhật xong";
    statusContainer.style.backgroundColor = 'green';
    statusContainer.style.color = 'white';
    statusContainer.style.display = 'flex';


    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
        statusContainer.innerHTML = "";
        statusContainer.style.backgroundColor = '';
        statusContainer.style.color = '';
        statusContainer.style.display = '';
    }, 3000);

});



//Push refresh all users
document.getElementById('Push-Refresh-All-User').addEventListener('click', function () {
    var scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    var data = {
        action: 'setRefreshFlag',
        timestamp: new Date().getTime() // Gửi timestamp theo milliseconds
    };

    fetch(scriptURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data).toString()
    }).then(response => console.log('Push refresh signal sent with timestamp:', data.timestamp))
        .catch(error => console.error('Error:', error));
});


// //Kiểm tra timestamp để refresh all users
let lastTimestamp = null; // Lưu timestamp lần cuối

function checkRefreshTimestamp() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec";

    fetch(scriptURL + "?action=getRefreshFlag")
        .then(response => response.json())
        .then(data => {
            console.log("Timestamp mới:", data.refresh);

            if (lastTimestamp !== null && data.refresh !== lastTimestamp) {
                location.reload(); // Reload nếu timestamp thay đổi
            }

            lastTimestamp = data.refresh; // Cập nhật timestamp mới
        })
        .catch(error => console.error("Lỗi khi lấy timestamp:", error));
}

// Gọi hàm này mỗi 10 giây để kiểm tra
setInterval(checkRefreshTimestamp, 5000);



// function gọi sau khi login thành công
let runFunctionsIntervalID; // Biến lưu ID của setInterval

function RunFunctionsAfterLogin() {
    // Gọi các function con bạn muốn tại đây
    loadMyToDoList();
    checkRoleAndDisplay();
    loadMySMS();
    loadPersonalFavoriteRowInMoreDocumentNEW();
    fetchAndRenderMoreDocumentApproval();
    const AdddivWrapper = document.getElementById('AdddivWrapper');
    AdddivWrapper.style.display = 'flex';
}




// function ngừng các function khác
function StopRunFunctionsAfterLogin() {
    const noteContainer = document.getElementById('my-To-do-list-personal-fetch-container');
    noteContainer.textContent = '';
    const chatgptanswer = document.getElementById('chat-gpt-answer');
    const yourquestionforchatgpt = document.getElementById('your-question-for-chat-gpt');
    chatgptanswer.textContent = '';
    yourquestionforchatgpt.textContent = '';
}

//function Submit, tức là create account mới
document.getElementById('submitForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    document.getElementById('responseMessage').textContent = '';

    const loader = document.getElementById('submit-loader');
    loader.classList.remove('hidden');
    const logintextinbutton = document.getElementById('Sign-up-text-in-button');
    logintextinbutton.classList.add('hidden');

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const text = document.getElementById('text').value + "NEW";

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    // Check for duplicates
    const checkData = {
        action: 'submit',
        name: name,
        email: email,
        text: text
    };

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(checkData)
        });

        const result = await response.text();

        // Handle combined messages
        if (result.includes("Error: Name and Email are already taken")) {
            document.getElementById('responseMessage').textContent = 'Name and Email is already taken.';
        } else if (result.includes("Error: Name is already taken")) {
            document.getElementById('responseMessage').textContent = 'Name is already taken.';
        } else if (result.includes("Error: Email is already taken")) {
            document.getElementById('responseMessage').textContent = 'Email is already taken.';
        } else if (result === "Row added successfully!") {
            document.getElementById('responseMessage').textContent = 'Create successfully. Wait for approval.';
            document.getElementById('submitForm').reset();
        } else {
            document.getElementById('responseMessage').textContent = 'An unexpected error occurred.';
        }
    } catch (error) {
        document.getElementById('responseMessage').textContent = 'Error: ' + error.message;
    } finally {
        loader.classList.add('hidden');
        logintextinbutton.classList.remove('hidden');
        StopRunFunctionsAfterLogin();
    }
});



// Đăng nhập Login, Kiểm tra thông tin đăng nhập
document.getElementById('checkForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    document.getElementById('checkResponseMessage').textContent = '';
    const loader = document.getElementById('check-loader');
    loader.classList.remove('hidden');
    const signuptextinbutton = document.getElementById('login_text_in_button');
    signuptextinbutton.classList.add('hidden');

    const email = document.getElementById('checkEmail').value.trim();
    const text = document.getElementById('checkText').value.trim();
    const rememberLogin = document.getElementById('rememberlogin').checked;

    const data = {
        action: 'check',
        email: email,
        text: text
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(data)
        });
        const result = await response.json();

        if (result.status === 'Valid information') {
            if (rememberLogin) {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userText', text);
            } else {
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userText');
            }

            // Hiển thị thông tin
            document.getElementById('displayName').textContent = result.name;
            document.getElementById('displayName2').textContent = result.name;
            document.getElementById('displayRole').textContent = result.role;
            document.getElementById('displayEmail').textContent = email;

            let maskedPassword = '*'.repeat(text.length);
            document.getElementById('displayPassword').textContent = maskedPassword;

            // document.getElementById('checkFormContainer').style.display = 'none';
            // document.getElementById('Page_after_login').style.display = 'flex';
            // document.getElementById('div-has-button-guest-login').style.display = 'flex';

            LoginSuccessfull();



            RunFunctionsAfterLogin();

            setTimeout(() => {
                document.querySelectorAll('.Favorite_row').forEach(row => {
                    row.style.display = 'flex';
                });
            }, 1000);


        } else {
            document.getElementById('checkResponseMessage').textContent = 'Wrong information';
        }
    } catch (error) {
        document.getElementById('checkResponseMessage').textContent = 'Error: ' + error.message;
    } finally {
        loader.classList.add('hidden');
        signuptextinbutton.classList.remove('hidden');
    }
});


// Kiểm tra thông tin trong Local Storage khi tải trang
document.addEventListener('DOMContentLoaded', async function () {
    const email = localStorage.getItem('userEmail');
    const text = localStorage.getItem('userText');
    const loaderifrememberlogin = document.getElementById('Background_Loader_If_Remember_Login');
    loaderifrememberlogin.classList.remove('hidden_visibility');
    // document.getElementById('div-has-button-guest-login').style.display = 'none';



    if (email && text) {
        const data = {
            action: 'check',
            email: email,
            text: text
        };

        const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: new URLSearchParams(data)
            });
            const result = await response.json(); // Lấy kết quả dưới dạng JSON

            if (result.status === 'Valid information') {
                // Cho phép truy cập nếu thông tin khớp


                LoginSuccessfull();
                // document.getElementById('checkFormContainer').style.display = 'none';
                // document.getElementById('submitFormContainer').style.display = 'none';
                // document.getElementById('div-has-button-guest-login').style.display = 'none';
                // document.getElementById('Page_after_login').style.display = 'flex';

                loaderifrememberlogin.classList.add('hidden_visibility');

                // Hiển thị thông tin trên giao diện
                document.getElementById('displayName').textContent = result.name;
                document.getElementById('displayName2').textContent = result.name;
                document.getElementById('displayRole').textContent = result.role;
                document.getElementById('displayEmail').textContent = email;

                let maskedPassword = '*'.repeat(text.length);
                document.getElementById('displayPassword').textContent = maskedPassword;

                // chạy function tổng
                RunFunctionsAfterLogin();
                // document.getElementById('div-has-button-guest-login').style.display = 'flex';

                setTimeout(() => {
                    document.querySelectorAll('.Favorite_row').forEach(row => {
                        row.style.display = 'flex';
                    });
                }, 1000);

            } else {
                // Xóa Local Storage nếu thông tin không khớp
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userText');
                document.getElementById('checkResponseMessage').textContent = 'Your account do not match';
                loaderifrememberlogin.classList.add('hidden_visibility');
                document.getElementById('checkFormContainer').style.display = 'flex';
                // document.getElementById('submitFormContainer').style.display = 'none';
                // document.getElementById('Page_after_login').style.display = 'none';
                // document.getElementById('div-has-button-guest-login').style.display = 'flex';
                Logout();


                // ngừng chạy function tổng
                StopRunFunctionsAfterLogin();
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('checkResponseMessage').textContent = 'Error: ' + error.message;
        }
    } else {
        // Buộc người dùng login nếu không có thông tin trong Local Storage
        document.getElementById('checkFormContainer').style.display = 'flex';
        // document.getElementById('submitFormContainer').style.display = 'none';
        // document.getElementById('Page_after_login').style.display = 'none';
        // document.getElementById('div-has-button-guest-login').style.display = 'flex';
        loaderifrememberlogin.classList.add('hidden_visibility');

        Logout();

        // ngừng chạy function tổng
        StopRunFunctionsAfterLogin();
    }
});



// Xử lý logout
document.getElementById('logoutButton').addEventListener('click', function () {
    // ngừng chạy function tổng
    setTimeout(function () {
        StopRunFunctionsAfterLogin();
    }, 3000);
    // Xóa thông tin Local Storage và quay về trang login
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userText');
    document.getElementById('displayName').textContent = '';
    document.getElementById('displayName2').textContent = '';
    document.getElementById('displayName2').style.display = 'inline';
    document.getElementById('displayRole').textContent = '';
    document.getElementById('displayEmail').textContent = '';
    document.getElementById('displayPassword').textContent = '';
    document.getElementById('displayPassword').style.display = 'inline';

    Logout();

    // document.getElementById('Page_after_login').style.display = 'none';
    document.getElementById('checkFormContainer').style.display = 'flex';
    // document.getElementById('submitFormContainer').style.display = 'none';
    // document.getElementById('div-has-button-guest-login').style.display = 'flex';
    document.getElementById('BoxEditPersonalSMS').style.display = 'none';
    document.getElementById('BoxEditPersonalSMSFromFetch').innerHTML = '';
    let fetchSMSContainer = document.getElementById('fetchSMSFromPersonal');
    fetchSMSContainer.querySelectorAll(':scope > *:not(#AdddivWrapper)').forEach(el => el.remove());
    document.getElementById('AdddivWrapper').style.display = 'none';
    document.getElementById('checkEmail').value = '';
    document.getElementById('checkText').value = '';
    document.getElementById('chat-gpt-answer').value = '';
    document.getElementById('your-question-for-chat-gpt').value = '';
    document.getElementById('checkResponseMessage').textContent = '';
    document.getElementById('responseMessage').textContent = '';
    document.getElementById('Background_Loader_If_Remember_Login').classList.add('hidden_visibility');
    document.getElementById('b4-To-do-list-content').style.display = 'flex';
    // document.getElementById('ChatGPTClass').style.display = 'flex';
    document.getElementById('Admin-Show-Container').style.display = 'none';
    document.getElementById('Manager-Show-Container').style.display = 'none';
    document.getElementById('container-input-edit-new-nickname').style.display = 'none';
    document.getElementById('container-input-edit-new-password').style.display = 'none';
    document.getElementById('edit-user-infomation').style.display = 'flex';
    document.getElementById('save-user-infomation').style.display = 'none';
    document.getElementById('cancel-user-infomation').style.display = 'none';
    document.getElementById('Re-fetch-new-request-more-document-NEW').style.display = 'none';
    document.getElementById('Approval-Part-More-Document').classList.add('hidden_visibility');
    document.querySelectorAll('.Favorite_row_checkbox').forEach(cb => {
        cb.checked = false;
    });

    document.getElementById('Approval-Part-More-Document-NEW-container').innerHTML = '';

    document.querySelectorAll('.Favorite_row').forEach(row => {
        row.style.display = 'none';
    });


    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach(function (c) {
        document.cookie = c.trim().split("=")[0] + "=;expires=" + new Date().toUTCString() + ";path=/";
    });
});

// Function to switch to check form
function switchTosubmitForm() {
    const submitFormContainer = document.getElementById('submitFormContainer');
    const checkFormContainer = document.getElementById('checkFormContainer');


    if (submitFormContainer.style.display === 'none') {
        submitFormContainer.style.display = 'flex';
        checkFormContainer.style.display = 'none';
        // document.getElementById('div-has-button-guest-login').style.display = 'flex';
        document.getElementById('submitForm').reset();
        document.getElementById('checkForm').reset();
        document.getElementById('checkEmail').value = '';
        document.getElementById('checkText').value = '';
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('text').value = '';
        document.getElementById('checkResponseMessage').textContent = '';
        document.getElementById('responseMessage').textContent = '';
    }
}

function switchToCheckForm() {
    const submitFormContainer = document.getElementById('submitFormContainer');
    const checkFormContainer = document.getElementById('checkFormContainer');


    if (submitFormContainer.style.display === 'flex') {
        submitFormContainer.style.display = 'none';
        checkFormContainer.style.display = 'flex';
        // document.getElementById('div-has-button-guest-login').style.display = 'flex';
        document.getElementById('submitForm').reset();
        document.getElementById('checkForm').reset();
        document.getElementById('checkEmail').value = '';
        document.getElementById('checkText').value = '';
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('text').value = '';
        document.getElementById('checkResponseMessage').textContent = '';
        document.getElementById('responseMessage').textContent = '';
    }
}

//bỏ space ở đầu và cuối chỗ Nick Name
function name_trimSpaces() {
    const input = document.getElementById("name");
    input.value = input.value.trim();
}

function email_trimSpaces() {
    const input = document.getElementById("email");
    input.value = input.value.trim();
}

function checkEmail_trimSpaces() {
    const input = document.getElementById("checkEmail");
    input.value = input.value.trim();
}



// Function to handle the Save button click event
document.getElementById('save-button').addEventListener('click', function () {
    const noteContent = document.getElementById('Add-To-do-list-content').value.trim(); // Get the content from the input field

    if (noteContent) {
        // Call createToDoLine to add the new To-Do-List to the container
        createToDoLine(noteContent, document.getElementById('my-To-do-list-personal-fetch-container').childElementCount);

        // Clear the input field after saving
        document.getElementById('Add-To-do-list-content').value = '';
        saveMyToDoList();
        saveMyToDoList();
        saveMyToDoList();
        saveMyToDoList();
    } else {
        console.log('No text to save');
    }
});

//Enter trong Add-To-do-list-content sẽ kích hoạt Savemytodolist
document.getElementById('Add-To-do-list-content').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const noteContent = e.target.value.trim(); // Sử dụng value thay vì textContent với input

        if (noteContent) {
            createToDoLine(noteContent, document.getElementById('my-To-do-list-personal-fetch-container').childElementCount);
            document.getElementById('Add-To-do-list-content').value = ''; // Clear input field
            saveMyToDoList();
        } else {
            console.log('No text to save');
        }
    }
});






//load phần my To-Do-List
async function loadMyToDoList() {

    const loader = document.getElementById('my-To-do-list-loader');
    loader.classList.remove('hidden');

    let email = document.getElementById('checkEmail').value.trim();
    if (!email) {
        email = localStorage.getItem('userEmail');
    }
    if (!email) {
        console.error('Email is missing.');
        return;
    }

    const data = {
        action: 'getToDoList',
        email: email
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(data)
        });
        const result = await response.text();

        // Clear any existing To-Do-List
        const noteContainer = document.getElementById('my-To-do-list-personal-fetch-container');
        noteContainer.innerHTML = '';

        // Split the result into lines and create div elements for each line
        const lines = result.split('\n');
        lines.forEach((line) => {
            createToDoLine(line, noteContainer);
        });

    } catch (error) {
        console.error('Error loading To-Do-List:', error);
        document.getElementById('checkResponseMessage').textContent = 'Error: ' + error.message;
    } finally {
        // Ẩn loader khi quá trình tải dữ liệu hoàn tất
        loader.classList.add('hidden');
    }
}



function createToDoLine(line, index) {
    const noteContainer = document.getElementById('my-To-do-list-personal-fetch-container');
    const nguyennhanchanedit = document.getElementById('nguyen-nhan-chan-edit');
    const b4Todolistcontent = document.getElementById('b4-To-do-list-content');



    // Kiểm tra số lượng divGroup hiện tại
    const currentDivGroups = noteContainer.querySelectorAll('.To-Do-Line-item');
    if (currentDivGroups.length >= 30) {
        return;
    }

    const divGroup = document.createElement('div');
    divGroup.classList.add('To-Do-Line-item');
    divGroup.draggable = false; // Cho phép kéo thả

    let isDragging = false; // Biến kiểm soát trạng thái kéo thả

    // Sự kiện dragstart (chỉ kích hoạt khi moveButton được giữ)
    divGroup.addEventListener('dragstart', (e) => {
        if (!isDragging) {
            e.preventDefault(); // Không cho phép kéo nếu không từ moveButton
        } else {
            e.dataTransfer.setData('text/plain', index); // Lưu chỉ số của phần tử
            divGroup.classList.add('dragging');
        }
    });

    // Sự kiện dragend để kết thúc kéo
    divGroup.addEventListener('dragend', () => {
        span.innerHTML = span.innerHTML.replace(/&nbsp;/g, ' ');
        divGroup.classList.remove('dragging');
        isDragging = false; // Reset trạng thái dragging
        saveMyToDoList(); // Lưu trạng thái sau khi di chuyển
        saveMyToDoList(); // Lưu trạng thái sau khi di chuyển
    });

    const reminderRegex = /\(reminder (\d{2}\/\d{2}\/\d{4})\)/;
    const reminderMatch = line.match(reminderRegex);
    let extractedDate = '';
    let hasReminder = false;

    if (reminderMatch) {
        extractedDate = reminderMatch[1];
        hasReminder = true;

        const [day, month, year] = extractedDate.split('/').map(Number);
        const reminderDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset giờ phút giây của ngày hôm nay

        if (reminderDate.getTime() === today.getTime()) {
            divGroup.classList.add('To-Do-toi-ngay-hom-nay');
        } else if (reminderDate.getTime() < today.getTime()) {
            divGroup.classList.add('To-Do-qua-ngay');
        }
    }


    // Tạo checkbox
    const labelcheckbox = document.createElement('label');
    labelcheckbox.classList.add('checkbox-container');

    const spancheckbox = document.createElement('div');
    spancheckbox.classList.add('checkmark');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.title = "Check là xong, Uncheck là chưa xong";
    // checkbox.classList.add('To-do-list_checkbox');
    checkbox.classList.add('custom-checkbox');
    checkbox.checked = line.startsWith("(done)");

    const span = document.createElement('span');
    span.contentEditable = true;
    span.textContent = line.replace(reminderRegex, '').replace(/^\((done|not done)\)\s*/, '');
    span.title = '';
    span.dataset.index = index;
    span.style.outline = 'none';
    span.style.userSelect = 'text';
    span.style.pointerEvents = 'auto';
    span.style.position = 'relative';
    span.style.left = '0';
    span.style.width = '43rem';

    const charCountDiv = document.createElement('div');
    charCountDiv.classList.add('charCountDiv');
    charCountDiv.textContent = `0 / 300`;

    const smalldiv = document.createElement('div');
    smalldiv.classList.add('smalldiv');

    const b4smalldiv = document.createElement('div');
    b4smalldiv.classList.add('b4smalldiv_in_MyToDoList');

    const deleteButton = document.createElement('div');
    deleteButton.classList.add('white-delete-icon');
    deleteButton.title = "Xóa việc làm này";

    deleteButton.onclick = () => {
        divGroup.classList.add('To-Do-CountDown-to-Delete'); // Thêm hiệu ứng đếm ngược

        moveButton.style.visibility = 'hidden';
        // Tạo chữ "Delay"
        const delayButton = document.createElement('div');
        delayButton.classList.add('gray-delete-icon');
        delayButton.style.right = '3%';
        delayButton.style.top = '50%';
        delayButton.style.display = 'flex';
        delayButton.style.position = 'absolute';
        delayButton.style.transform = 'translate(-50%,-50%)';
        delayButton.style.zIndex = '1';
        delayButton.title = "Hủy việc xóa";
        divGroup.appendChild(delayButton); // Thêm vào divGroup

        // Biến kiểm tra hủy
        let deleteCanceled = false;

        // Gán sự kiện click để hủy hành động xóa
        delayButton.onclick = (e) => {
            e.stopPropagation(); // Ngăn sự kiện từ phần tử cha
            deleteCanceled = true; // Đánh dấu hành động xóa bị hủy
            divGroup.classList.remove('To-Do-CountDown-to-Delete'); // Xóa lớp hiệu ứng
            moveButton.style.visibility = 'visible';
            delayButton.remove(); // Xóa nút "Delay"
        };

        // Đặt timeout để xóa phần tử sau 6 giây nếu không bị hủy
        setTimeout(() => {
            if (!deleteCanceled) {
                divGroup.remove(); // Xóa phần tử
                span.innerHTML = span.innerHTML.replace(/&nbsp;/g, ' ');
                saveMyToDoList();
                saveMyToDoList();
                saveMyToDoList();
                saveMyToDoList();
                updateToDoCounter(); // Cập nhật số đếm
            } else {
                console.log('Delete action canceled');
            }
        }, 14800);// gần 15 giây
    };


    const reminderbell = document.createElement('div');
    reminderbell.title = "Tạo reminder";
    reminderbell.onclick = () => {
        reminderbuttoncontainer.style.display = 'flex';

        const spans = noteContainer.querySelectorAll('span');  // Hủy tương tác tất cả span
        spans.forEach(sp => {
            sp.style.pointerEvents = 'none';
            sp.setAttribute('contenteditable', 'false');
        });

        // const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Hủy tương tác tất cả checkbox
        const checkboxes = noteContainer.querySelectorAll('.custom-checkbox');  // Hủy tương tác tất cả checkbox
        checkboxes.forEach(cb => {
            cb.style.pointerEvents = 'none';
        });

        const moveButtons = noteContainer.querySelectorAll('.orange-move-icon');  // Ẩn tất cả nút di chuyển
        moveButtons.forEach(btn => {
            btn.style.pointerEvents = 'none';
        });

        const reminderbells = noteContainer.querySelectorAll('.reminder-bell-icon-active, .reminder-bell-icon');  // Hủy tương tác tất cả reminder-bell
        reminderbells.forEach(rmbs => {
            rmbs.style.pointerEvents = 'none';
        });

        const deleteButtons = noteContainer.querySelectorAll('.white-delete-icon');  // Hủy tương tác tất cả nút xóa
        deleteButtons.forEach(dlbs => {
            dlbs.style.pointerEvents = 'none';
        });

        nguyennhanchanedit.style.visibility = 'visible';
        b4Todolistcontent.style.visibility = 'hidden';
    };


    const cancelButton = document.createElement('div');
    cancelButton.classList.add('gray-delete-icon');
    cancelButton.title = "Hủy việc chỉnh sửa";
    cancelButton.onclick = () => {
        divGroup.classList.remove('To-Do-Chinh-Sua'); // Loại bỏ lớp chỉ thị đang chỉnh sửa  

        const spans = noteContainer.querySelectorAll('span');  // nhận tương tác tất cả span
        spans.forEach(sp => {
            if (sp !== span) { // Ngoại trừ span đang chỉnh sửa
                sp.style.pointerEvents = 'all';
                sp.setAttribute('contenteditable', 'true');
            }
        });

        // const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Nhận tương tác tất cả checkbox
        const checkboxes = noteContainer.querySelectorAll('.custom-checkbox');  // Nhận tương tác tất cả checkbox
        checkboxes.forEach(cb => {
            cb.style.pointerEvents = 'all';
        });

        span.textContent = span.dataset.originalText || ''; // Khôi phục giá trị ban đầu của văn bản  
        delete span.dataset.originalText; // Xóa thuộc tính lưu trữ văn bản gốc  
        span.style.background = 'none'; // Loại bỏ nền khi chỉnh sửa  
        span.style.paddingRight = ''; // Xóa khoảng cách padding bên phải  
        span.title = ''; // Xóa tooltip của văn bản  

        const moveButtons = noteContainer.querySelectorAll('.orange-move-icon'); // Hiển thị nút di chuyển
        moveButtons.forEach(btn => {
            btn.style.visibility = 'visible';
        });

        reminderbell.style.display = 'flex'; // Hiển thị biểu tượng nhắc nhở
        const reminderbells = noteContainer.querySelectorAll('.reminder-bell-icon-active, .reminder-bell-icon');  // Nhập tương tác tất cả reminder-bell
        reminderbells.forEach(rmbs => {
            rmbs.style.visibility = 'visible';
        });

        deleteButton.style.display = 'flex'; // Hiển thị nút xóa 
        const deleteButtons = noteContainer.querySelectorAll('.white-delete-icon');  // Nhập tương tác tất cả nút xóa
        deleteButtons.forEach(dlbs => {
            dlbs.style.visibility = 'visible';
        });

        saveButton.style.display = 'none'; // Ẩn nút lưu  
        cancelButton.style.display = 'none'; // Ẩn nút hủy  

        charCountDiv.style.display = 'none'; // Ẩn bộ đếm ký tự

        nguyennhanchanedit.style.visibility = 'hidden';
        b4Todolistcontent.style.visibility = 'visible';
    };

    // Hiển thị nút lưu sau khi người dùng chỉnh sửa
    span.addEventListener('input', () => {
        divGroup.classList.add('To-Do-Chinh-Sua'); // Thêm lớp 'Chỉnh sửa' vào nhóm công việc  

        const spans = noteContainer.querySelectorAll('span');  // Hủy tương tác tất cả span
        spans.forEach(sp => {
            if (sp !== span) { // Ngoại trừ span đang chỉnh sửa
                sp.style.pointerEvents = 'none';
                sp.setAttribute('contenteditable', 'false');
            }
        });

        // const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Hủy tương tác tất cả checkbox
        const checkboxes = noteContainer.querySelectorAll('.custom-checkbox');  // Hủy tương tác tất cả checkbox
        checkboxes.forEach(cb => {
            cb.style.pointerEvents = 'none';
        });

        span.title = "Nhớ lưu chỉnh sửa"; // Thêm thông tin gợi ý khi di chuột vào văn bản  

        const moveButtons = noteContainer.querySelectorAll('.orange-move-icon');  // Ẩn tất cả nút di chuyển
        moveButtons.forEach(btn => {
            btn.style.visibility = 'hidden';
        });

        reminderbell.style.display = 'none'; // Ẩn biểu tượng nhắc nhở  
        const reminderbells = noteContainer.querySelectorAll('.reminder-bell-icon-active, .reminder-bell-icon');  // Hủy tương tác tất cả reminder-bell
        reminderbells.forEach(rmbs => {
            rmbs.style.visibility = 'hidden';
        });

        deleteButton.style.display = 'none'; // Ẩn nút xóa trong chế độ chỉnh sửa 
        const deleteButtons = noteContainer.querySelectorAll('.white-delete-icon');  // Hủy tương tác tất cả nút xóa
        deleteButtons.forEach(dlbs => {
            dlbs.style.visibility = 'hidden';
        });

        saveButton.style.display = 'flex'; // Hiện nút lưu  
        cancelButton.style.display = 'flex'; // Hiện nút hủy  

        charCountDiv.style.display = 'block'; // Hiện khung thông tin đếm ký tự  
        charCountDiv.textContent = `${span.textContent.length} / 300`; // Cập nhật thông tin đếm ký tự theo độ dài văn bản  

        nguyennhanchanedit.style.visibility = 'visible';
        b4Todolistcontent.style.visibility = 'hidden';
    });

    span.addEventListener('focus', () => {
        charCountDiv.textContent = `${span.textContent.length} / 300`; // Cập nhật thông tin đếm ký tự
        if (!span.dataset.originalText) {
            span.dataset.originalText = span.textContent; // Lưu nội dung ban đầu vào dataset
        }
    });

    span.addEventListener('keydown', (e) => {
        // Ngăn nhập liệu nếu đã đạt 300 ký tự và không nhấn backspace hoặc xóa
        if (span.textContent.length >= 300 && e.keyCode !== 8 && e.keyCode !== 46) {
            e.preventDefault();
        }

        // tổ hợp Shift + Enter được nhấn
        if (e.key === 'Enter') {
            e.preventDefault(); // Ngăn hành động mặc định của Shift + Enter  
            divGroup.classList.remove('To-Do-Chinh-Sua'); // Loại bỏ lớp chỉ thị đang chỉnh sửa  

            const spans = noteContainer.querySelectorAll('span');  // nhận tương tác tất cả span
            spans.forEach(sp => {
                if (sp !== span) { // Ngoại trừ span đang chỉnh sửa
                    sp.style.pointerEvents = 'all';
                    sp.setAttribute('contenteditable', 'true');
                }
            });

            // const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Nhận tương tác tất cả checkbox
            const checkboxes = noteContainer.querySelectorAll('.custom-checkbox');  // Nhận tương tác tất cả checkbox
            checkboxes.forEach(cb => {
                cb.style.pointerEvents = 'all';
            });

            span.innerHTML = span.innerHTML.replace(/&nbsp;/g, ' '); // Thay thế các khoảng trắng không ngắt thành khoảng trắng thường  
            saveMyToDoList(); // Lưu danh sách công việc  

            span.blur(); // Bỏ trạng thái focus của span  

            span.style.background = 'none'; // Loại bỏ nền khi chỉnh sửa  
            span.style.paddingRight = ''; // Xóa khoảng cách padding bên phải  
            span.title = ''; // Xóa tooltip của văn bản  

            reminderbell.style.display = 'flex'; // Hiển thị biểu tượng nhắc nhở
            const reminderbells = noteContainer.querySelectorAll('.reminder-bell-icon-active, .reminder-bell-icon');  // Nhập tương tác tất cả reminder-bell
            reminderbells.forEach(rmbs => {
                rmbs.style.visibility = 'visible';
            });

            const moveButtons = noteContainer.querySelectorAll('.orange-move-icon'); // Hiển thị nút di chuyển
            moveButtons.forEach(btn => {
                btn.style.visibility = 'visible';
            });

            deleteButton.style.display = 'flex'; // Hiển thị nút xóa 
            const deleteButtons = noteContainer.querySelectorAll('.white-delete-icon');  // Nhập tương tác tất cả nút xóa
            deleteButtons.forEach(dlbs => {
                dlbs.style.visibility = 'visible';
            });

            saveButton.style.display = 'none'; // Ẩn nút lưu  
            cancelButton.style.display = 'none'; // Ẩn nút hủy  

            charCountDiv.style.display = 'none'; // Ẩn bộ đếm ký tự  

            nguyennhanchanedit.style.visibility = 'hidden';
            b4Todolistcontent.style.visibility = 'visible';

            delete span.dataset.originalText; // Xóa thuộc tính lưu trữ văn bản gốc  
        }

        // Esc được nhấn
        if (e.key === 'Escape') {
            e.preventDefault(); // Ngăn hành động mặc định của sự kiện  
            divGroup.classList.remove('To-Do-Chinh-Sua'); // Xóa lớp "Chỉnh sửa" khỏi nhóm  

            const spans = noteContainer.querySelectorAll('span');  // nhận tương tác tất cả span
            spans.forEach(sp => {
                if (sp !== span) { // Ngoại trừ span đang chỉnh sửa
                    sp.style.pointerEvents = 'all';
                    sp.setAttribute('contenteditable', 'true');
                }
            });

            // const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Nhận tương tác tất cả checkbox
            const checkboxes = noteContainer.querySelectorAll('.custom-checkbox');  // Nhận tương tác tất cả checkbox
            checkboxes.forEach(cb => {
                cb.style.pointerEvents = 'all';
            });

            span.innerHTML = span.innerHTML.replace(/&nbsp;/g, ' '); // Thay thế các khoảng trắng không phải chuẩn HTML bằng khoảng trắng thông thường  
            span.textContent = span.dataset.originalText || ''; // Khôi phục lại giá trị ban đầu nếu có, nếu không thì để trống  

            span.style.background = 'none'; // Xóa nền của văn bản  
            span.style.paddingRight = ''; // Reset padding bên phải cho văn bản  
            span.title = ''; // Xóa thông tin title của văn bản  

            span.blur(); // Mất focus khỏi văn bản  

            reminderbell.style.display = 'flex'; // Hiện biểu tượng chuông nhắc nhở
            const reminderbells = noteContainer.querySelectorAll('.reminder-bell-icon-active, .reminder-bell-icon');  // Nhập tương tác tất cả reminder-bell
            reminderbells.forEach(rmbs => {
                rmbs.style.visibility = 'visible';
            });

            const moveButtons = noteContainer.querySelectorAll('.orange-move-icon'); // Hiển thị nút di chuyển
            moveButtons.forEach(btn => {
                btn.style.visibility = 'visible';
            });

            deleteButton.style.display = 'flex'; // Hiện nút xóa
            const deleteButtons = noteContainer.querySelectorAll('.white-delete-icon');  // Nhập tương tác tất cả nút xóa
            deleteButtons.forEach(dlbs => {
                dlbs.style.visibility = 'visible';
            });

            saveButton.style.display = 'none'; // Ẩn nút lưu  
            cancelButton.style.display = 'none'; // Ẩn nút hủy  
            charCountDiv.style.display = 'none'; // Ẩn khung thông tin đếm ký tự  

            nguyennhanchanedit.style.visibility = 'hidden';
            b4Todolistcontent.style.visibility = 'visible';

            delete span.dataset.originalText; // Xóa thông tin lưu trữ ban đầu trong dataset  
        }
    });


    const saveButton = document.createElement('div');
    saveButton.classList.add('white-edit-icon');
    saveButton.title = "Lưu chỉnh sửa (Enter)";
    saveButton.onclick = () => {
        divGroup.classList.remove('To-Do-Chinh-Sua'); // Xóa lớp chỉ báo đang chỉnh sửa  

        const spans = noteContainer.querySelectorAll('span');  // nhận tương tác tất cả span
        spans.forEach(sp => {
            if (sp !== span) { // Ngoại trừ span đang chỉnh sửa
                sp.style.pointerEvents = 'all';
                sp.setAttribute('contenteditable', 'true');
            }
        });

        // const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Nhận tương tác tất cả checkbox
        const checkboxes = noteContainer.querySelectorAll('.custom-checkbox');  // Nhận tương tác tất cả checkbox
        checkboxes.forEach(cb => {
            cb.style.pointerEvents = 'all';
        });

        span.innerHTML = span.innerHTML.replace(/&nbsp;/g, ' '); // Thay thế các khoảng trắng không chuẩn HTML thành khoảng trắng thông thường  

        span.style.background = 'none'; // Xóa nền văn bản  
        span.title = ''; // Xóa thông tin tooltip  
        span.style.paddingRight = ''; // Reset padding bên phải  

        const moveButtons = noteContainer.querySelectorAll('.orange-move-icon'); // Hiển thị nút di chuyển
        moveButtons.forEach(btn => {
            btn.style.visibility = 'visible';
        });

        reminderbell.style.display = 'flex'; // Hiện biểu tượng nhắc nhở
        const reminderbells = noteContainer.querySelectorAll('.reminder-bell-icon-active, .reminder-bell-icon');  // Nhập tương tác tất cả reminder-bell
        reminderbells.forEach(rmbs => {
            rmbs.style.visibility = 'visible';
        });

        deleteButton.style.display = 'flex'; // Hiện nút xóa  
        const deleteButtons = noteContainer.querySelectorAll('.white-delete-icon');  // Nhập tương tác tất cả nút xóa
        deleteButtons.forEach(dlbs => {
            dlbs.style.visibility = 'visible';
        });

        saveButton.style.display = 'none'; // Ẩn nút lưu  
        cancelButton.style.display = 'none'; // Ẩn nút hủy  

        charCountDiv.style.display = 'none'; // Ẩn khung thông tin đếm ký tự  

        nguyennhanchanedit.style.visibility = 'hidden';
        b4Todolistcontent.style.visibility = 'visible';

        saveMyToDoList(); // Lưu danh sách công việc  
        saveMyToDoList();
        saveMyToDoList();
        saveMyToDoList();

        delete span.dataset.originalText; // Xóa thông tin lưu trữ ban đầu trong dataset  
    };

    const moveButton = document.createElement('div');
    moveButton.classList.add('orange-move-icon');
    moveButton.title = "Di chuyển";
    moveButton.addEventListener('mousedown', () => {
        isDragging = true; // Kích hoạt trạng thái kéo thả
        divGroup.draggable = true; // Kích hoạt draggable khi moveButton được nhấn
    });

    moveButton.addEventListener('mouseup', () => {
        isDragging = false; // Tắt trạng thái kéo thả sau khi thả chuột
        divGroup.draggable = false; // Vô hiệu hóa draggable
    });

    moveButton.addEventListener('mouseleave', () => {
        isDragging = false; // Ngăn kéo thả khi chuột rời khỏi moveButton
        divGroup.draggable = false; // Vô hiệu hóa draggable
    });

    // Xử lý sự kiện dragover và drop cho noteContainer
    noteContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(noteContainer, e.clientY);
        const draggingElement = document.querySelector('.dragging');
        if (afterElement == null) {
            noteContainer.appendChild(draggingElement);
        } else {
            noteContainer.insertBefore(draggingElement, afterElement);
        }
    });

    checkbox.addEventListener('change', () => {
        span.innerHTML = span.innerHTML.replace(/&nbsp;/g, ' ');
        saveMyToDoList();
        saveMyToDoList();
        saveMyToDoList();
        saveMyToDoList();
        console.log('Checkbox state changed');
    });
    // Lưu khi thay đổi trạng thái checkbox

    noteContainer.appendChild(divGroup);
    divGroup.appendChild(b4smalldiv);
    divGroup.appendChild(span);
    divGroup.appendChild(smalldiv);

    b4smalldiv.appendChild(moveButton);
    b4smalldiv.appendChild(labelcheckbox);

    labelcheckbox.appendChild(checkbox);
    labelcheckbox.appendChild(spancheckbox);

    const reminderbuttoncontainer = document.createElement('div');
    reminderbuttoncontainer.classList.add('reminder-button-container');
    const Todoremindername = document.createElement('div');
    Todoremindername.textContent = 'Reminder To-Do';

    const inputdateremindertodo = document.createElement('input');
    inputdateremindertodo.classList.add('inputdateremindertodo');
    inputdateremindertodo.type = 'date';
    inputdateremindertodo.placeholder = 'YYYY-MM-DD';
    if (extractedDate) {
        const dateParts = extractedDate.split('/');
        inputdateremindertodo.value = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    }

    const HopChuacacNut = document.createElement('div');
    HopChuacacNut.classList.add('HopChuacacNut');

    const NutCaiReminder = document.createElement('div');
    NutCaiReminder.classList.add('NutCaiReminder');
    NutCaiReminder.title = 'Cài Reminder';
    NutCaiReminder.onclick = () => {
        const spans = noteContainer.querySelectorAll('span');  // nhận tương tác tất cả span
        spans.forEach(sp => {
            sp.style.pointerEvents = 'all';
            sp.setAttribute('contenteditable', 'true');
        });
        saveMyToDoList();
        saveMyToDoList();
        saveMyToDoList();
        saveMyToDoList();
        NutCaiReminder.style.display = 'none';
        NutHuyReminder.style.display = 'flex';
        reminderbell.classList.add('reminder-bell-icon-active');
        reminderbell.classList.remove('reminder-bell-icon');
        setTimeout(() => {
            loadMyToDoList().then(() => {
                nguyennhanchanedit.style.visibility = 'hidden';
                b4Todolistcontent.style.visibility = 'visible';
            });
        }, 500);
    };

    const NutHuyReminder = document.createElement('div');
    NutHuyReminder.classList.add('NutHuyReminder');
    NutHuyReminder.title = 'Hủy Reminder';
    NutHuyReminder.onclick = () => {
        const divGroup = NutHuyReminder.closest('.To-Do-Line-item');

        if (divGroup) {
            // Tìm inputdateremindertodo trong divGroup đó
            const inputdateremindertodo = divGroup.querySelector('input[type="date"]');

            if (inputdateremindertodo) {
                inputdateremindertodo.value = ''; // Clear thông tin date
            }
        }

        const spans = noteContainer.querySelectorAll('span');  // nhận tương tác tất cả span
        spans.forEach(sp => {
            sp.style.pointerEvents = 'all';
            sp.setAttribute('contenteditable', 'true');
        });

        saveMyToDoList();
        saveMyToDoList();
        saveMyToDoList();
        saveMyToDoList();
        NutCaiReminder.style.display = 'flex';
        NutHuyReminder.style.display = 'none';
        reminderbell.classList.remove('reminder-bell-icon-active');
        reminderbell.classList.add('reminder-bell-icon');
        setTimeout(() => {
            loadMyToDoList().then(() => {
                nguyennhanchanedit.style.visibility = 'hidden';
                b4Todolistcontent.style.visibility = 'visible';
            });
        }, 500);
    };


    if (hasReminder) {
        NutHuyReminder.style.display = 'flex';
        NutCaiReminder.style.display = 'none';
        reminderbell.classList.add('reminder-bell-icon-active');
        inputdateremindertodo.style.pointerEvents = 'none';
    } else {
        NutHuyReminder.style.display = 'none';
        NutCaiReminder.style.display = 'flex';
        reminderbell.classList.add('reminder-bell-icon');
        inputdateremindertodo.style.pointerEvents = '';
    }




    const NutTroLai = document.createElement('div');
    NutTroLai.classList.add('NutTroLai');
    NutTroLai.title = 'Trở lại';
    NutTroLai.onclick = () => {
        reminderbuttoncontainer.style.display = 'none';

        const spans = noteContainer.querySelectorAll('span');  // Hủy tương tác tất cả span
        spans.forEach(sp => {
            sp.style.pointerEvents = 'all';
            sp.setAttribute('contenteditable', 'true');
        });

        // const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Hủy tương tác tất cả checkbox
        const checkboxes = noteContainer.querySelectorAll('.custom-checkbox');  // Hủy tương tác tất cả checkbox
        checkboxes.forEach(cb => {
            cb.style.pointerEvents = 'all';
        });

        const moveButtons = noteContainer.querySelectorAll('.orange-move-icon');  // Ẩn tất cả nút di chuyển
        moveButtons.forEach(btn => {
            btn.style.pointerEvents = 'all';
        });

        const reminderbells = noteContainer.querySelectorAll('.reminder-bell-icon-active, .reminder-bell-icon');  // Hủy tương tác tất cả reminder-bell
        reminderbells.forEach(rmbs => {
            rmbs.style.pointerEvents = 'all';
        });

        const deleteButtons = noteContainer.querySelectorAll('.white-delete-icon');  // Hủy tương tác tất cả nút xóa
        deleteButtons.forEach(dlbs => {
            dlbs.style.pointerEvents = 'all';
        });

        nguyennhanchanedit.style.visibility = 'hidden';
        b4Todolistcontent.style.visibility = 'visible';
    };


    const Muiten = document.createElement('div');
    Muiten.classList.add('Muiten');


    reminderbuttoncontainer.appendChild(Todoremindername);
    reminderbuttoncontainer.appendChild(inputdateremindertodo);
    reminderbuttoncontainer.appendChild(HopChuacacNut);
    reminderbuttoncontainer.appendChild(Muiten);


    HopChuacacNut.appendChild(NutCaiReminder);
    HopChuacacNut.appendChild(NutHuyReminder);
    HopChuacacNut.appendChild(NutTroLai);


    smalldiv.appendChild(reminderbuttoncontainer);
    smalldiv.appendChild(reminderbell);
    smalldiv.appendChild(deleteButton);
    smalldiv.appendChild(saveButton);
    smalldiv.appendChild(cancelButton);
    smalldiv.appendChild(charCountDiv);

    // Cập nhật số đếm
    updateToDoCounter();
}

// Hàm trợ giúp xác định phần tử sau con trỏ
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.To-Do-Line-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Cập nhật số lượng To-Do-List hiện tại
function updateToDoCounter() {
    const noteContainer = document.getElementById('my-To-do-list-personal-fetch-container');
    const currentCount = noteContainer.querySelectorAll('.To-Do-Line-item').length;
    const counterElement = document.getElementById('Current-Number-of-To-do-list');

    // Cập nhật số đếm và hiển thị
    counterElement.innerHTML = `To-Do: ${currentCount} / 30`;
}







// Function to save To-Do-List
async function saveMyToDoList() {
    let email = document.getElementById('checkEmail').value.trim();
    if (!email) {
        email = localStorage.getItem('userEmail');
    }
    if (!email) {
        console.error('Email is missing.');
        return;
    }

    const noteContainer = document.getElementById('my-To-do-list-personal-fetch-container');
    const lines = Array.from(noteContainer.getElementsByClassName('To-Do-Line-item')) // Lọc các dòng ghi chú có class 'To-Do-Line-item'
        .map(divGroup => {
            const span = divGroup.querySelector('span[contentEditable="true"]');
            const checkbox = divGroup.querySelector('input[type="checkbox"]');
            const isChecked = checkbox ? checkbox.checked : false;
            const reminderInput = divGroup.querySelector('input[type="date"]');
            const reminderValue = reminderInput && reminderInput.value
                ? formatDateToDDMMYYYY(reminderInput.value)
                : '';

            let text = span ? span.innerHTML.trim() : '';

            if (reminderValue) {
                text += ` (reminder ${reminderValue})`;
            }

            return (isChecked ? "(done) " : "(not done) ") + text;
        });


    const data = {
        action: 'saveToDoList',
        email: email,
        toDoList: lines.join('\n') // Join all the lines into a single string
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(data)
        });
        const result = await response.text();
        console.log('To-Do-List saved successfully:', result);
    } catch (error) {
        console.error('Error saving To-Do-List:', error);
    }
}

// Hàm chuyển đổi ngày từ yyyy-mm-dd sang dd/mm/yyyy
function formatDateToDDMMYYYY(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

//Fetch ChatGPT Answer mỗi 1 giây
async function fetchChatGPTAnswer() {
    let email = document.getElementById('checkEmail').value.trim();
    if (!email) {
        email = localStorage.getItem('userEmail');
    }
    if (!email) {
        console.error('Email is missing.');
        return;
    }

    const data = {
        action: 'ChatGPTAnswer',
        email: email
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(data)
        });
        const result = await response.text();
        const formattedResult = result.replace(/\n/g, '<br>');
        const answerSpan = document.getElementById('chat-gpt-answer');
        answerSpan.innerHTML = formattedResult;

    } catch (error) {
        console.error('Error fetching ChatGPT answer:', error);
        const answerSpan = document.getElementById('chat-gpt-answer');
        if (answerSpan) answerSpan.textContent = 'Error: ' + error.message;
    }
}

setInterval(fetchChatGPTAnswer, 1000);



document.getElementById('save-button-Chat-GPT').addEventListener('click', function () {
    var userQuestion = document.getElementById('write-your-question-to-ask-GPT').value;
    var formattedQuestion = userQuestion.replace(/\n/g, '<br>');
    document.getElementById('your-question-for-chat-gpt').innerHTML = formattedQuestion;
    SendMyQuestionToGPT();
    SendMyQuestionToGPT();
    SendMyQuestionToGPT();
    SendMyQuestionToGPT();
    document.getElementById('write-your-question-to-ask-GPT').value = '';
});

document.getElementById('write-your-question-to-ask-GPT').addEventListener('keydown', function (event) {
    // Kiểm tra nếu nhấn Enter (không phải Shift hoặc Ctrl) để kích hoạt 'click'
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
        event.preventDefault();  // Ngừng hành động mặc định của Enter (xuống dòng)
        document.getElementById('save-button-Chat-GPT').click();
    }

    // Nếu nhấn Ctrl + Enter hoặc Shift + Enter thì xuống dòng
    if ((event.key === 'Enter' && event.shiftKey) || (event.key === 'Enter' && event.ctrlKey)) {
        // Không làm gì, cho phép xuống dòng
    }
});



//Gửi ChatGPT câu hỏi
async function SendMyQuestionToGPT() {
    let email = document.getElementById('checkEmail').value.trim();
    if (!email) {
        email = localStorage.getItem('userEmail');
    }
    if (!email) {
        console.error('Email is missing.');
        return;
    }

    const question = document.getElementById('your-question-for-chat-gpt').innerText.trim();
    if (!question) {
        console.error('Question is missing.');
        return;
    }

    const data = {
        action: 'QuestionToChatGPT',
        email: email,
        question: question
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(data)
        });
        const result = await response.text();
        console.log('Question sent to ChatGPT successfully:', result);
    } catch (error) {
        console.error('Error sending question to ChatGPT:', error);
    }
}


document.getElementById('select-for-asking-open-AI').addEventListener('change', function () {
    const selectElement = this;
    const askMoreInput = document.getElementById('ask-more-for-open-ai');
    const questionDisplay = document.getElementById('your-question-for-chat-gpt');
    let userInputs = [];
    let stepIndex = 0;

    const placeholders = [
        'Chủ đề tin nhắn. Enter khi hoàn thành',
        'Nội dung chính. Enter khi hoàn thành',
        'Hạn dùng. Enter khi hoàn thành',
    ];

    function resetInput() {
        userInputs = [];
        stepIndex = 0;
        askMoreInput.style.display = 'none';
        askMoreInput.value = '';
        askMoreInput.placeholder = '';
        selectElement.selectedIndex = 0;
    }

    function handleInput(event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            // Lưu giá trị, kể cả khi rỗng
            userInputs.push(askMoreInput.value.trim());
            console.log(`Saved input [Step ${stepIndex + 1}]:`, askMoreInput.value.trim());
            askMoreInput.value = '';
            stepIndex++;

            if (stepIndex < placeholders.length) {
                askMoreInput.placeholder = placeholders[stepIndex];
            } else {
                // Ghép các giá trị thành câu hỏi cuối cùng và gửi đến GPT
                const questionText = `Soạn tin nhắn từ 90 đến 110 ký tự theo chủ đề "${userInputs[0] || 'chưa nhập'}", tập trung vào "${userInputs[1] || 'chưa nhập'}", hạn sử dụng "${userInputs[2] || 'chưa nhập'}", chuyển tất cả thành tiếng Anh, cho 3 mẫu tin nhắn.`;
                questionDisplay.innerText = questionText;
                SendMyQuestionToGPT();
                resetInput();
            }
        } else if (event.key === 'Escape') {
            event.preventDefault();
            console.log('Input process canceled.');
            resetInput();
        }
    }

    // Check which option is selected
    const selectedOptionId = selectElement.options[selectElement.selectedIndex].id;

    if (selectedOptionId === 'option1') {
        const questionText = selectElement.options[selectElement.selectedIndex].text;
        questionDisplay.innerText = questionText;
        SendMyQuestionToGPT();
        resetInput(); // Reset UI just in case
    } else if (selectedOptionId === 'option2') {
        askMoreInput.style.display = 'inline-block';
        askMoreInput.placeholder = placeholders[stepIndex];
        askMoreInput.addEventListener('keydown', handleInput);
    } else {
        resetInput(); // Reset if an invalid option is selected
    }
});


//Bấm vào nút Edit trong User's Information
document.getElementById('edit-user-infomation').addEventListener('click', function () {
    // Hiển thị các container chỉnh sửa thông tin
    document.getElementById('container-input-edit-new-nickname').style.display = 'flex';
    document.getElementById('container-input-edit-new-password').style.display = 'flex';
    document.getElementById('save-user-infomation').style.display = 'flex';
    document.getElementById('cancel-user-infomation').style.display = 'flex';

    // Ẩn nút chỉnh sửa thông tin
    this.style.display = 'none';
    document.getElementById('displayPassword').style.display = 'none';
    document.getElementById('displayName2').style.display = 'none';

});


document.getElementById('save-user-infomation').addEventListener('click', function () {
    const newNickname = document.getElementById('edit-new-nickname').value.trim();
    const newPassword = document.getElementById('edit-new-password').value.trim();
    const userEmail = localStorage.getItem('userEmail');  // Giả sử email được lưu trong localStorage

    // Gán giá trị vào các phần tử hiển thị
    if (newNickname) {
        document.getElementById('displayName2').textContent = newNickname;
        document.getElementById('displayName').textContent = newNickname;
    }
    if (newPassword) {
        // Tạo dấu sao (*) với số lượng tương ứng với độ dài mật khẩu
        let maskedPassword = '*'.repeat(newPassword.length);
        document.getElementById('displayPassword').textContent = maskedPassword;
        // Lưu password mới vào localStorage
        localStorage.setItem('userText', newPassword);
    }

    // Gửi yêu cầu tới API để cập nhật thông tin
    const data = new URLSearchParams();
    data.append('action', 'savenewinfo');
    data.append('email', userEmail);  // Thêm email của người dùng
    data.append('name', newNickname);
    data.append('text', newPassword);

    fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec', {
        method: 'POST',
        body: data
    })
        .then(response => response.text())
        .then(result => {
            // Xử lý kết quả từ API
            alert(result);  // Hiển thị thông báo từ API
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Có lỗi xảy ra khi gửi dữ liệu!');
        });

    // Ẩn các trường nhập và hiển thị thông tin đã chỉnh sửa
    document.getElementById('container-input-edit-new-nickname').style.display = 'none';
    document.getElementById('container-input-edit-new-password').style.display = 'none';
    document.getElementById('edit-user-infomation').style.display = 'flex';

    // Ẩn nút chỉnh sửa thông tin
    this.style.display = 'none';
    document.getElementById('cancel-user-infomation').style.display = 'none';

    document.getElementById('displayPassword').style.display = 'inline';
    document.getElementById('displayName2').style.display = 'inline';

    setTimeout(() => {
        document.getElementById('edit-new-nickname').value = '';
        document.getElementById('edit-new-password').value = '';
    }, 200);
});


document.getElementById('cancel-user-infomation').addEventListener('click', function () {
    // Ẩn các trường nhập và hiển thị thông tin đã chỉnh sửa
    document.getElementById('container-input-edit-new-nickname').style.display = 'none';
    document.getElementById('container-input-edit-new-password').style.display = 'none';
    document.getElementById('edit-user-infomation').style.display = 'flex';

    // Ẩn nút chỉnh sửa thông tin
    this.style.display = 'none';
    document.getElementById('save-user-infomation').style.display = 'none';

    document.getElementById('displayPassword').style.display = 'inline';
    document.getElementById('displayName2').style.display = 'inline';

    setTimeout(() => {
        document.getElementById('edit-new-nickname').value = '';
        document.getElementById('edit-new-password').value = '';
    }, 200);
});




//Kiểm tra role để display
function checkRoleAndDisplay() {
    const role = document.getElementById('displayRole').textContent.trim();

    // Lấy các phần tử cần hiển thị/ẩn
    // const ChatGPTClass = document.getElementById('ChatGPTClass');
    const AdminContainer = document.getElementById('Admin-Show-Container');
    const ManagerContainer = document.getElementById('Manager-Show-Container');
    const ApprovalPartMD = document.getElementById('Approval-Part-More-Document');
    const RefetchnewrequestmoredocumentNEW = document.getElementById('Re-fetch-new-request-more-document-NEW');




    // Kiểm tra giá trị của displayRole và thay đổi display cho các phần tử
    if (role === 'Admin') {
        // ChatGPTClass.style.display = 'flex';
        AdminContainer.style.display = 'flex';
        ManagerContainer.style.display = 'flex';
        RefetchnewrequestmoredocumentNEW.style.display = 'flex';
        ApprovalPartMD.classList.remove('hidden_visibility');

    } else if (role === 'Manager') {
        // ChatGPTClass.style.display = 'none';
        AdminContainer.style.display = 'none';
        ManagerContainer.style.display = 'flex';
        RefetchnewrequestmoredocumentNEW.style.display = 'flex';
        ApprovalPartMD.classList.remove('hidden_visibility');

    } else if (role === 'User') {
        // ChatGPTClass.style.display = 'none';
        AdminContainer.style.display = 'none';
        ManagerContainer.style.display = 'none';
        RefetchnewrequestmoredocumentNEW.style.display = 'none';

    } else {
        // ChatGPTClass.style.display = 'none';
        AdminContainer.style.display = 'none';
        ManagerContainer.style.display = 'none';
        RefetchnewrequestmoredocumentNEW.style.display = 'none';

    }
}


//load phần my SMS
async function loadMySMS() {
    let email = document.getElementById('checkEmail').value.trim();
    if (!email) {
        email = localStorage.getItem('userEmail');
    }
    if (!email) {
        alert('Please enter an email address.');
        return;
    }

    const data = {
        action: 'getPersonalSMS',
        email: email
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.text();

        // Tạo danh sách SMS từ dữ liệu trả về (không cần đảm bảo ít nhất 6 SMS)
        const SMSList = result.trim() ? result.split('\n').map((line) => line.trim()).filter((line) => line.length > 0) : [];

        // Gọi createSMSLine để tạo các div từ danh sách SMS
        createSMSLine(SMSList);

    } catch (error) {
        console.error('Error loading Personal SMS:', error);
    }
}



let originalSMSList = [];

function createSMSLine(SMSList) {
    const noteContainer = document.getElementById('fetchSMSFromPersonal');
    const BoxEditPersonalSMSFromFetch = document.getElementById('BoxEditPersonalSMSFromFetch');
    const BoxEditPersonalSMS = document.getElementById('BoxEditPersonalSMS');
    const AdddivWrapper = document.getElementById('AdddivWrapper');

    noteContainer.innerHTML = '';
    BoxEditPersonalSMSFromFetch.innerHTML = ''; // Xóa nội dung cũ
    originalSMSList = [...SMSList];

    SMSList.forEach(SMS => {
        const divWrapper = document.createElement('div');
        divWrapper.className = 'columnC';

        let [divContent, spanContent] = SMS.split('{-}').map(part => part.trim().replace(/{\^p}/g, '\n'));
        divContent = divContent || ''; // Nếu trống, giữ nguyên chuỗi rỗng
        spanContent = spanContent || '';

        // Luôn tạo div hiển thị
        const divElement = document.createElement('div');
        divElement.textContent = divContent;
        divWrapper.appendChild(divElement);

        // Luôn tạo span ẩn
        const spanElement = document.createElement('span');
        spanElement.style.display = 'none';
        spanElement.textContent = spanContent;
        divWrapper.appendChild(spanElement);

        divWrapper.addEventListener('click', () => {
            const contentToCopy = spanContent.trim();
            navigator.clipboard.writeText(contentToCopy).then(() => {
                divWrapper.innerText = 'Copied';
                divWrapper.style.color = 'red';
                divWrapper.style.backgroundColor = 'yellow';

                setTimeout(() => {
                    divWrapper.innerHTML = '';
                    const divElement = document.createElement('div');
                    divElement.textContent = divContent;
                    divWrapper.appendChild(divElement);

                    const spanElement = document.createElement('span');
                    spanElement.style.display = 'none';
                    spanElement.textContent = spanContent;
                    divWrapper.appendChild(spanElement);

                    divWrapper.style.color = '';
                    divWrapper.style.backgroundColor = '';
                }, 3000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });

        noteContainer.appendChild(divWrapper);
    });

    if (AdddivWrapper) {
        noteContainer.appendChild(AdddivWrapper);
        AdddivWrapper.addEventListener('click', () => {
            if (BoxEditPersonalSMS) {
                BoxEditPersonalSMS.style.display = 'flex';
            }
        });
    }

    const totalLines = 10;

    SMSList.forEach((SMS, index) => {
        const divWrapperinedit = document.createElement('div');

        let [subjectContent, Content] = SMS.split('{-}').map(part => part.trim().replace(/{\^p}/g, '\n'));
        subjectContent = subjectContent || ''; // Đảm bảo input vẫn tạo nếu trống
        Content = Content || '';

        // Luôn tạo input, ngay cả khi subjectContent trống
        const divElementinedit = document.createElement('input');
        divElementinedit.value = subjectContent;
        divElementinedit.placeholder = `Subject #${index + 1}`;
        divWrapperinedit.appendChild(divElementinedit);

        // Luôn tạo textarea, ngay cả khi Content trống
        const spanElementinedit = document.createElement('textarea');
        spanElementinedit.value = Content;
        spanElementinedit.placeholder = `Content SMS #${index + 1}`;
        divWrapperinedit.appendChild(spanElementinedit);

        BoxEditPersonalSMSFromFetch.appendChild(divWrapperinedit);
    });

    // Thêm dòng trống nếu chưa đủ totalLines
    const remainingLines = totalLines - SMSList.length;
    for (let i = 0; i < remainingLines; i++) {
        const divWrapperinedit = document.createElement('div');

        const divElementinedit = document.createElement('input');
        divElementinedit.placeholder = `Subject #${SMSList.length + i + 1}`;
        divWrapperinedit.appendChild(divElementinedit);

        const spanElementinedit = document.createElement('textarea');
        spanElementinedit.placeholder = `Content SMS #${SMSList.length + i + 1}`;
        divWrapperinedit.appendChild(spanElementinedit);

        BoxEditPersonalSMSFromFetch.appendChild(divWrapperinedit);
    }
}

document.getElementById('save-button-for-BoxEditPersonalSMS').addEventListener('click', () => {
    const BoxEditPersonalSMSFromFetch = document.getElementById('BoxEditPersonalSMSFromFetch');
    let newSMSList = [];

    BoxEditPersonalSMSFromFetch.querySelectorAll('div').forEach(div => {
        const subjectInput = div.querySelector('input');
        const contentTextarea = div.querySelector('textarea');

        const subjectText = subjectInput ? subjectInput.value.trim() : '';
        const contentText = contentTextarea ? contentTextarea.value.trim() : '';

        if (subjectText || contentText) {
            newSMSList.push(`${subjectText} {-} ${contentText}`);
        }
    });

    // Kiểm tra nếu tất cả các dòng đều trống, thì newSMSList phải là mảng rỗng
    if (newSMSList.every(SMS => SMS === ' {-} ')) {
        newSMSList = [];
    }

    createSMSLine(newSMSList);
    savePersonalSMS();
});


async function savePersonalSMS(personalSMS = '') {
    let email = document.getElementById('checkEmail').value.trim();
    if (!email) {
        email = localStorage.getItem('userEmail');
    }
    if (!email) {
        console.error('Email is missing.');
        return;
    }

    const noteContainer = document.getElementById('fetchSMSFromPersonal');
    const smsList = Array.from(noteContainer.children)
        .filter(childDiv => childDiv.id !== 'AdddivWrapper') // Lọc bỏ phần tử không liên quan
        .map(childDiv => {
            const divContent = childDiv.querySelector('div') ? childDiv.querySelector('div').textContent.trim() : '';
            const spanContent = childDiv.querySelector('span') ? childDiv.querySelector('span').textContent.trim() : '';

            // Thay đổi xuống dòng thành {^p}
            const formattedDivContent = divContent.replace(/\n/g, '{^p}');
            const formattedSpanContent = spanContent.replace(/\n/g, '{^p}');

            // Chỉ lưu nếu ít nhất một trong hai giá trị có nội dung
            return (formattedDivContent || formattedSpanContent) ? `${formattedDivContent}{-}${formattedSpanContent}` : null;
        })
        .filter(Boolean); // Loại bỏ các dòng null (tức là những dòng trống)

    // Nếu `personalSMS` không được truyền, sử dụng dữ liệu từ giao diện
    if (!personalSMS) {
        personalSMS = smsList.length > 0 ? smsList.join('\n') : '';
    }

    const data = {
        action: 'savePersonalSMS',
        email: email,
        personalSMS: personalSMS // Dữ liệu có thể là chuỗi rỗng nếu không có tin nhắn hợp lệ
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(data)
        });
        const result = await response.text();
        console.log('SMS data saved successfully:', result);
    } catch (error) {
        console.error('Error saving SMS data:', error);
    }
}




// Cancel button functionality: Revert only unsaved changes
document.getElementById('close-button-for-BoxEditPersonalSMS').addEventListener('click', () => {
    const BoxEditPersonalSMSFromFetch = document.getElementById('BoxEditPersonalSMSFromFetch');
    const BoxEditPersonalSMS = document.getElementById('BoxEditPersonalSMS');
    BoxEditPersonalSMSFromFetch.innerHTML = "";
    loadMySMS();
    BoxEditPersonalSMS.style.display = 'none';
});






// Delete button in New More Document
document.getElementById('DeleteBtn_Editing_MoreDoc_NewVer').addEventListener('click', async () => {
    const idValue = document.getElementById('id-of-row-more-document').textContent.trim();

    // Lấy thông tin từ displayName và displayEmail
    let displayName = document.getElementById("displayName").innerText.trim();
    let displayEmail = document.getElementById("displayEmail").innerText.trim();

    // Thiết lập giá trị cho title và content khi yêu cầu xóa
    let titleValue = "DELETE";
    let tagValue = "DELETE";
    let contentValue = "This User request DELETE this row";

    // Thay đổi format của title và content (in đậm và màu đỏ)
    titleValue = `<font style="color:red; font-weight:bold;">${titleValue}</font>`;
    contentValue = `<font style="color:red; font-weight:bold;">${contentValue}</font>`;

    // Format dữ liệu mới
    const newValue = `[Emp:${displayName} (${displayEmail})] ${titleValue} ${tagValue ? `[TAG:${tagValue}]` : ''}{-}${contentValue}`;

    // Lấy các phần tử trạng thái
    const loader = document.getElementById("loader-updating-more-documents_NEW");
    const statusContainer = document.getElementById("status-of-updating-edit-more-documents-container_NEW");

    // Hiển thị loader và trạng thái "Đang lưu..."
    loader.classList.remove("hidden");

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                action: "RequestEditRowMoreDocumentsNew",
                lookupValue: idValue,
                newValue: newValue
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.text();
        console.log('Server response:', result);

        if (result.includes("Row updated successfully")) {
            statusContainer.innerHTML = "Yêu cầu xóa đã được gửi! Vui lòng chờ duyệt từ Leader của bạn.";
            statusContainer.style.backgroundColor = 'green';
            statusContainer.style.color = 'white';
            statusContainer.style.display = 'flex';
            setTimeout(() => {
                statusContainer.innerHTML = "";
                statusContainer.style.backgroundColor = '';
                statusContainer.style.color = '';
                statusContainer.style.display = '';
            }, 5000);
        } else {
            throw new Error("Lỗi khi lưu: " + result);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        statusContainer.innerText = `Lỗi khi lưu dữ liệu: ${error.message}`;
        statusContainer.style.backgroundColor = "red";
        statusContainer.style.color = 'white';
        statusContainer.style.display = 'flex';
        setTimeout(() => {
            statusContainer.innerHTML = "";
            statusContainer.style.backgroundColor = '';
            statusContainer.style.color = '';
            statusContainer.style.display = '';
        }, 5000);
    } finally {
        // Ẩn loader sau khi hoàn tất
        loader.classList.add("hidden");
    }

    updateNumbersOfRequestInMoreDocumentNEW();
});


// Load phần My Favorite Row trong More Document NEW
async function loadPersonalFavoriteRowInMoreDocumentNEW() {
    let email = document.getElementById('checkEmail').value.trim();
    if (!email) {
        email = localStorage.getItem('userEmail');
    }
    if (!email) {
        alert('Please enter an email address.');
        return;
    }

    const data = {
        action: 'getPersonalFavoriteRowInMoreDocumentNEW',
        email: email
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.text();

        // Tạo danh sách từ dữ liệu trả về theo định dạng "70570069, 38185104, ............."
        const FavoriteRow = result.trim() ? result.split(', ').map((line) => line.trim()).filter((line) => line.length > 0) : [];

        // Lấy tất cả các dòng trong bảng #more-document-table_NEW
        const rows = document.querySelectorAll('#more-document-table_NEW tr');

        // Duyệt qua từng dòng
        rows.forEach(row => {
            // Lấy giá trị của td thứ 2 trong dòng
            const secondColumnValue = row.cells[1]?.textContent.trim();

            // Kiểm tra nếu giá trị td thứ 2 có trong FavoriteRow
            if (FavoriteRow.includes(secondColumnValue)) {
                // Đánh dấu checkbox trong td thứ 1 của dòng
                const checkbox = row.cells[0]?.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = true;
                }
                document.querySelectorAll('.Favorite_row').forEach(row => {
                    row.style.display = 'flex';
                });
            }
        });

    } catch (error) {
        console.error('Error loading Personal Favorite Row In More Document NEW:', error);
    }
}


// Lưu trạng thái checkbox các dòng Favorite vào Google Sheets
let debounceSaveTimer;

function initFavoriteCheckboxWatcher() {
    const table = document.querySelector('#more-document-table_NEW');
    if (!table) return;

    table.addEventListener('change', function (e) {
        if (e.target && e.target.classList.contains('Favorite_row_checkbox')) {
            clearTimeout(debounceSaveTimer);

            debounceSaveTimer = setTimeout(() => {
                const selectedIDs = getCheckedFavoriteIDs(table);
                submitFavoriteIDs(selectedIDs);
            }, 500);
        }
    });
}

function getCheckedFavoriteIDs(table) {
    const ids = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const checkbox = cells[0]?.querySelector('.Favorite_row_checkbox');
        const id = cells[1]?.textContent.trim();

        if (checkbox && checkbox.checked && id) {
            ids.push(id);
        }
    });

    return ids.join(', ');
}

async function submitFavoriteIDs(idListString) {
    const emailInput = document.getElementById('checkEmail');
    const email = emailInput?.value.trim() || localStorage.getItem('userEmail');
    if (!email) return;

    const data = {
        action: 'SavePersonalFavoriteRowInMoreDocumentNEW',
        email: email,
        personalFavoriteRow: idListString
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    try {
        await fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(data)
        });
    } catch (_) { }
}

document.addEventListener('DOMContentLoaded', initFavoriteCheckboxWatcher);





function isEmptyContent(html) {
    const cleaned = html
        .replace(/<br\s*\/?>/gi, '')
        .replace(/&nbsp;/gi, '')
        .replace(/\s+/g, '')
        .trim();
    return cleaned.length === 0;
}


// Hàm cập nhật yêu cầu trong More Document NEW
document.querySelector('#SaveBtn_RequestAddRow_MoreDocTable_NewVer').addEventListener('click', async () => {
    let displayName = document.getElementById("displayName").innerText.trim();
    let displayEmail = document.getElementById("displayEmail").innerText.trim();

    let titleValue = document.getElementById('Title-Of-Row-More-Document_add-new-row').innerHTML.trim();
    let contentValue = document.getElementById('Content-Of-Row-More-Document_add-new-row').innerHTML.trim();

    const loader = document.getElementById("loader-updating-more-documents_NEW_add-new-row");

    const isNotLoggedIn = !displayName || !displayEmail;
    const isTitleEmpty = isEmptyContent(titleValue);
    const isContentEmpty = isEmptyContent(contentValue);
    const isContentIncomplete = isTitleEmpty || isContentEmpty;

    if (isNotLoggedIn && isContentIncomplete) {
        StatusUpdateBox("Add New Row", "Bạn chưa đăng nhập.", "red");
        return;
    } else if (isNotLoggedIn) {
        StatusUpdateBox("Add New Row", "Bạn chưa đăng nhập.", "red");
        return;
    } else if (isContentIncomplete) {
        StatusUpdateBox("Add New Row", "Vui lòng nhập đầy đủ Tiêu đề và Nội dung.", "red");
        return;
    }

    titleValue = cleanLinks(titleValue);
    contentValue = cleanLinks(contentValue);

    const tagValue = Array.from(document.querySelectorAll('#Tag-Of-Row-More-Document_add-new-row button'))
        .map(button => button.textContent.trim())
        .join(',');

    const formattedValue =
        `[Emp:${displayName} (${displayEmail})] ${titleValue} ${tagValue ? `[TAG:${tagValue}]` : ''}{-}${contentValue}`;

    loader.classList.remove("hidden");

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec', {
            method: 'POST',
            body: new URLSearchParams({
                action: 'RequestAddingNEWRowIntoMoreDocumentsNew',
                newValue: formattedValue
            })
        });

        if (!response.ok) {
            StatusUpdateBox("Add New Row", "Lỗi khi lưu: " + response.status, "red");
            return;
        }

        const result = await response.text();

        if (result.toLowerCase().includes("row") && result.toLowerCase().includes("added")) {
            StatusUpdateBox("Add New Row", "Lưu thành công! Vui lòng chờ duyệt từ Leader của bạn.", "green");
        } else {
            StatusUpdateBox("Add New Row", "Lỗi khi lưu: " + result, "red");
            return;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        StatusUpdateBox("Add New Row", `Lỗi khi lưu dữ liệu: ${error.message}`, "red");
    } finally {
        loader.classList.add("hidden");
    }

    updateNumbersOfRequestInMoreDocumentNEW();
});




// Hàm xử lý link trong contenteditable (giữ nguyên href, bỏ tag <a>)
function cleanLinks(html) {
    return html.replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '$1');
}

// Save button in New More Document
document.getElementById('SaveBtn_Editing_MoreDoc_NewVer').addEventListener('click', async () => {
    const idValue = document.getElementById('id-of-row-more-document').textContent.trim();

    let displayName = document.getElementById("displayName").innerText.trim();
    let displayEmail = document.getElementById("displayEmail").innerText.trim();

    let titleValue = document.getElementById('Title-Of-Row-More-Document').innerHTML.trim();
    let contentValue = document.getElementById('Content-Of-Row-More-Document').innerHTML.trim();

    const loader = document.getElementById("loader-updating-more-documents_NEW");
    const statusContainer = document.getElementById("status-of-updating-edit-more-documents-container_NEW");

    const isNotLoggedIn = !displayName || !displayEmail;
    const isTitleEmpty = isEmptyContent(titleValue);
    const isContentEmpty = isEmptyContent(contentValue);
    const isContentIncomplete = isTitleEmpty || isContentEmpty;

    if (isNotLoggedIn && isContentIncomplete) {
        showStatus("Bạn chưa đăng nhập.", "red");
        return;
    } else if (isNotLoggedIn) {
        showStatus("Bạn chưa đăng nhập.", "red");
        return;
    } else if (isContentIncomplete) {
        showStatus("Vui lòng nhập đầy đủ Tiêu đề và Nội dung.", "red");
        return;
    }

    // // Thay thế xuống dòng <br> thành {^p} để giữ format
    // titleValue = titleValue.replace(/<br\s*\/?>/g, '{^p}');
    // contentValue = contentValue.replace(/<br\s*\/?>/g, '{^p}');

    titleValue = cleanLinks(titleValue);
    contentValue = cleanLinks(contentValue);

    // Lấy nội dung HTML từ div contenteditable để giữ nguyên format
    let tagValue = Array.from(document.querySelectorAll('#Tag-Of-Row-More-Document button'))
        .map(button => button.textContent.trim())
        .join(',');

    // Format dữ liệu mới (chỉ giữ tiêu đề trong title)
    const newValue = `[Emp:${displayName} (${displayEmail})] ${titleValue} ${tagValue ? `[TAG:${tagValue}]` : ''}{-}${contentValue}`;

    loader.classList.remove("hidden");

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                action: "RequestEditRowMoreDocumentsNew",
                lookupValue: idValue,
                newValue: newValue
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.text();
        console.log('Server response:', result);

        if (result.toLowerCase().includes("updated")) {
            showStatus("Lưu thành công! Vui lòng chờ duyệt từ Leader của bạn.", "green");
        } else {
            throw new Error("Lỗi khi lưu: " + result);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showStatus(`Lỗi khi lưu dữ liệu: ${error.message}`, "red");
    } finally {
        loader.classList.add("hidden");
    }

    function showStatus(message, color) {
        statusContainer.innerHTML = message;
        statusContainer.style.backgroundColor = color;
        statusContainer.style.color = 'white';
        statusContainer.style.display = 'flex';
        setTimeout(() => {
            statusContainer.innerHTML = "";
            statusContainer.style.backgroundColor = '';
            statusContainer.style.color = '';
            statusContainer.style.display = '';
        }, 5000);
    }

    updateNumbersOfRequestInMoreDocumentNEW();
});















// // Lấy các request trong More Document NEW
document.getElementById("Re-fetch-new-request-more-document-NEW").addEventListener("click", async function (event) {
    const btn = event.currentTarget;

    // Lấy role và kiểm tra nếu là Manager hoặc Admin
    const role = document.getElementById("displayRole")?.textContent.trim();

    if (role === "Manager" || role === "Admin") {
        btn.disabled = true;
        await fetchAndRenderMoreDocumentApproval();
        btn.disabled = false;
    } else {
        alert("Get your ass out of here. You do not have permission to perform this action.");
    }
});



async function fetchAndRenderMoreDocumentApproval() {
    const container = document.getElementById("Approval-Part-More-Document-NEW-container");
    container.innerHTML = 'Loading...';

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=getAllIdRequestEditOrRequestDeleteMoreDocumentNEW");
        const data = await response.json();

        container.innerHTML = '';
        const groupedData = {};
        data.forEach(item => {
            const { id, status, content, cell } = item;
            if (!groupedData[id]) groupedData[id] = [];
            groupedData[id].push({ status, content, cell });
        });

        for (const id in groupedData) {
            const groupItems = groupedData[id];

            const bigGroupDiv = document.createElement('div');
            bigGroupDiv.className = 'big-group-request';
            bigGroupDiv.dataset.id = id;
            bigGroupDiv.title = `Row ID: ${id}`;

            const hasAddNew = groupItems.some(item => item.status === "RequestAddNew");
            bigGroupDiv.style.backgroundColor = hasAddNew ? "rgba(154, 255, 193, 0.4)" : "";

            const title = document.createElement('h2');
            title.textContent = `Row ID: ${id}`;
            bigGroupDiv.appendChild(title);

            const originGroupDiv = document.createElement('div');
            originGroupDiv.className = 'origin-group-request';

            const requestGroupDiv = document.createElement('div');
            requestGroupDiv.className = 'non-origin-group-request';

            let originalTitle = "";
            let originalContent = "";
            let tagListOrigin = [];

            groupItems.forEach(({ status, content, cell }) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'request-item';

                let statusLabel = status;
                if (status === "RequestEdit") statusLabel = "EDITTING";
                else if (status === "RequestAddNew") statusLabel = "<span>ADD NEW ROW</span>";
                else if (status === "ORIGIN (GỐC)") statusLabel = "<text>ORIGINAL ROW</text>";

                let contentHTML = '';
                if (content.includes("{-}")) {
                    const [titlePartRaw, contentPartRaw] = content.split("{-}");
                    let titleProcessed = titlePartRaw.replace(/{\^p}/g, "<br>");
                    let contentProcessed = contentPartRaw.replace(/{\^p}/g, "<br>");

                    titleProcessed = titleProcessed.replace(/\[TAG:[^\]]+\]/g, '').trim();

                    const getTagsFromText = (text) => {
                        const tagRegex = /\[TAG:([^\]]+)\]/;
                        const tagMatch = text.match(tagRegex);
                        return tagMatch ? tagMatch[1].split(',').map(t => t.trim()) : [];
                    };

                    // --- Tách Cell ---
                    let cellHTML = '';
                    if (cell) {
                        cellHTML = `<div class="Cell-container">${cell}</div>`;
                    }

                    // --- Tách Employee ---
                    let empHTML = '';
                    const empRegex = /\[Emp:([^\]]+)\]/;
                    const empMatch = titleProcessed.match(empRegex);
                    if (empMatch) {
                        empHTML = `<div class="Employee-container" title="Employee">${empMatch[1]}</div>`;
                        titleProcessed = titleProcessed.replace(empRegex, '').trim();
                    }

                    // --- Tách Tags ---
                    let tagHTML = '';
                    const tagListRequest = getTagsFromText(titlePartRaw);
                    if (status === "ORIGIN (GỐC)") {
                        tagListOrigin = [...tagListRequest];
                        const tagButtons = tagListOrigin.map(tag => `<button class="tag-More-Documents">${tag}</button>`).join(' ');
                        tagHTML = `<div class="Tag-container" title="Tag">${tagButtons}</div>`;
                        originalTitle = titleProcessed;
                        originalContent = contentProcessed;

                        contentHTML = `
                            <div style="height: 4.5rem; visibility: hidden;"></div>
                            ${cellHTML}
                            ${tagHTML}
                            ${empHTML}
                            <div class="Title-container" title="Title">${titleProcessed}</div>
                            <div class="Content-container" title="Content">${contentProcessed}</div>
                        `;
                    } else if (status === "RequestAddNew") {
                        const extraClass = 'green-yellow-background-border';
                        const tagButtons = tagListRequest.map(tag => `<button class="tag-More-Documents ${extraClass}">${tag}</button>`).join(' ');
                        tagHTML = `<div class="Tag-container ${extraClass}" title="Tag">${tagButtons}</div>`;

                        contentHTML = `
                            ${cellHTML}
                            ${tagHTML}
                            ${empHTML ? empHTML.replace('Employee-container', `Employee-container ${extraClass}`) : ''}
                            <div class="Title-container ${extraClass}" title="Title">${titleProcessed}</div>
                            <div class="Content-container ${extraClass}" title="Content">${contentProcessed}</div>
                        `;
                    } else {
                        const tagButtons = tagListRequest.map(tag => `<button class="tag-More-Documents">${tag}</button>`).join(' ');
                        tagHTML = `<div class="Tag-container" title="Tag">${tagButtons}</div>`;



                        // const allTags = new Set([...tagListOrigin, ...tagListRequest]);
                        // const tagButtons = Array.from(allTags).map(tag => {
                        // const inOrigin = tagListOrigin.includes(tag);
                        // const inRequest = tagListRequest.includes(tag);
                        // let cls = "tag-More-Documents";
                        // let titleText = "";

                        // if (inOrigin && !inRequest) {
                        //     cls += " gray-background-tag";
                        //     titleText = "Tag này đã bị xoá";
                        // } else if (!inOrigin && inRequest) {
                        //     cls += " green-background-tag";
                        //     titleText = "Tag này được thêm mới";
                        // }

                        //     return `<button class="${cls}"${titleText ? ` title="${titleText}"` : ""}>${tag}</button>`;
                        // }).join(' ');

                        // tagHTML = `<div class="Tag-container" title="Tag">${tagButtons}</div>`;

                        // if (status === "RequestEdit") {
                        //     if (titleProcessed !== originalTitle) {
                        //         titleProcessed = highlightDiff(originalTitle, titleProcessed);
                        //     }
                        //     if (contentProcessed !== originalContent) {
                        //         contentProcessed = highlightDiff(originalContent, contentProcessed);
                        //     }
                        // }


                        // console.log(bigGroupDiv);

                        if (status === "RequestEdit") {
                            highlightTagDifferences(bigGroupDiv);
                            highlightDiffForGroup(bigGroupDiv);
                        }




                        contentHTML = `
                            ${cellHTML}
                            ${empHTML}
                            ${tagHTML}
                            <div class="Title-container" title="Title">${titleProcessed}</div>
                            <div class="Content-container" title="Content">${contentProcessed}</div>
                        `;
                    }
                } else {
                    const contentProcessed = convertUrlsToLinks(content.replace(/{\^p}/g, "<br>"));
                    contentHTML = `<div>${contentProcessed}</div>`;
                }

                itemDiv.innerHTML = `
                    <h3>${statusLabel}</h3>
                    ${contentHTML}
                `;

                // --- Thêm hai nút CHECK và CROSS ---
                const buttonWrapper = document.createElement('div');
                buttonWrapper.className = 'two-button-for-request-item';

                const checkBtn = document.createElement('div');
                checkBtn.className = 'check-button-for-request-item';
                checkBtn.title = 'Approve this request';
                checkBtn.textContent = '✔';
                checkBtn.onclick = () => checkButtonForRequestItem(id, content, cell);

                const crossBtn = document.createElement('div');
                crossBtn.className = 'cross-button-for-request-item';
                crossBtn.title = 'Deny this request';
                crossBtn.textContent = '✖';
                crossBtn.onclick = () => crossButtonForRequestItem(cell);

                buttonWrapper.appendChild(checkBtn);
                buttonWrapper.appendChild(crossBtn);
                itemDiv.appendChild(buttonWrapper);

                if (status === "ORIGIN (GỐC)") {
                    originGroupDiv.appendChild(itemDiv);
                } else {
                    requestGroupDiv.appendChild(itemDiv);
                }
            });


            const OrginAndRequestGroupDiv = document.createElement('div');
            OrginAndRequestGroupDiv.className = 'origin-and-request-group';

            if (originGroupDiv.childElementCount > 0) {
                OrginAndRequestGroupDiv.appendChild(originGroupDiv);
            }

            if (requestGroupDiv.childElementCount > 0) {
                OrginAndRequestGroupDiv.appendChild(requestGroupDiv);
            }

            bigGroupDiv.appendChild(OrginAndRequestGroupDiv);
            container.appendChild(bigGroupDiv);
        }

    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        container.innerHTML = '<p style="color:red;">Lỗi khi tải dữ liệu.</p>';
    }
}







function highlightTagDifferences(Group) {
    const allRequestTags = Group.querySelectorAll('.non-origin-group-request .tag-More-Documents');
    allRequestTags.forEach(btn => {
        btn.className = 'tag-More-Documents';
    });

    setTimeout(() => {
        const originItem = Group.querySelector('.origin-group-request .request-item');
        const originTags = Array.from(originItem?.querySelectorAll('.tag-More-Documents') || []).map(tag => tag.textContent.trim());

        const requestItems = Group.querySelectorAll('.non-origin-group-request .request-item');

        requestItems.forEach(requestItem => {
            const requestTags = Array.from(requestItem.querySelectorAll('.tag-More-Documents')).map(tag => tag.textContent.trim());

            const tagsRemoved = originTags.filter(tag => !requestTags.includes(tag));
            const tagsAdded = requestTags.filter(tag => !originTags.includes(tag));

            const tagContainer = requestItem.querySelector('.Tag-container');

            Array.from(requestItem.querySelectorAll('.tag-More-Documents')).forEach(button => {
                const tagText = button.textContent.trim();
                if (tagsAdded.includes(tagText)) {
                    button.classList.add('green-background-tag');
                    button.title = 'Tag này được thêm mới';
                }
            });

            tagsRemoved.forEach(tag => {
                const removedTagBtn = document.createElement('button');
                removedTagBtn.className = 'tag-More-Documents gray-background-tag';
                removedTagBtn.title = 'Tag này sẽ bị xoá';
                removedTagBtn.textContent = tag;
                tagContainer?.appendChild(removedTagBtn);
            });
        });
    }, 1000);
}






function highlightDiffForGroup(Group) {
    Group.querySelectorAll('mark').forEach(mark => {
        const parent = mark.parentNode;
        while (mark.firstChild) {
            parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
    });

    setTimeout(() => {
        const originAndRequestGroupDiv = Group.querySelector('.origin-and-request-group');
        if (!originAndRequestGroupDiv) return;

        const originGroupDiv = originAndRequestGroupDiv.querySelector('.origin-group-request');
        const nonOriginGroupDiv = originAndRequestGroupDiv.querySelector('.non-origin-group-request');

        if (!originGroupDiv || !nonOriginGroupDiv) return;

        // So sánh và highlight cho Title
        const originTitleContainer = originGroupDiv.querySelector('.Title-container');
        if (originTitleContainer) {
            const originTitleContent = originTitleContainer.innerHTML;

            const nonOriginTitleContainers = nonOriginGroupDiv.querySelectorAll('.Title-container');
            nonOriginTitleContainers.forEach(nonOriginTitleContainer => {
                let nonOriginTitleContent = nonOriginTitleContainer.innerHTML;

                if (originTitleContent !== nonOriginTitleContent) {
                    if (nonOriginTitleContainer.querySelector('mark')) {
                        nonOriginTitleContainer.innerHTML = nonOriginTitleContainer.innerHTML.replace(/<mark[^>]*>/g, '').replace(/<\/mark>/g, '');
                    }
                    nonOriginTitleContainer.innerHTML = `<mark>${nonOriginTitleContainer.innerHTML}</mark>`;
                }
            });
        }

        // So sánh và highlight cho Content
        const originContentContainer = originGroupDiv.querySelector('.Content-container');
        if (originContentContainer) {
            const originContent = originContentContainer.innerHTML;

            const nonOriginContentContainers = nonOriginGroupDiv.querySelectorAll('.Content-container');
            nonOriginContentContainers.forEach(nonOriginContentContainer => {
                let nonOriginContent = nonOriginContentContainer.innerHTML;

                if (originContent !== nonOriginContent) {
                    if (nonOriginContentContainer.querySelector('mark')) {
                        nonOriginContentContainer.innerHTML = nonOriginContentContainer.innerHTML.replace(/<mark[^>]*>/g, '').replace(/<\/mark>/g, '');
                    }
                    nonOriginContentContainer.innerHTML = `<mark>${nonOriginContentContainer.innerHTML}</mark>`;
                }
            });
        }
    }, 1000);
}


// Bấm nút Cross để xóa request
function crossButtonForRequestItem(cell) {
    const button = event.currentTarget;
    const requestItem = button.closest('.request-item');
    const requestGroupDiv = requestItem.closest('.non-origin-group-request');
    const bigGroupDiv = requestItem.closest('.big-group-request');

    const overlay = document.createElement('div');
    overlay.className = 'countdown-text-request-item';

    let countdown = 5;
    const countdownText = document.createElement('div');
    countdownText.textContent = `Delete this request in ${countdown} seconds...`;

    const cancelBtn = document.createElement('div');
    cancelBtn.className = 'cross-button-for-request-item';
    cancelBtn.title = 'Cancel this Deny';
    cancelBtn.textContent = '✖';


    overlay.appendChild(cancelBtn);
    overlay.appendChild(countdownText);
    requestItem.appendChild(overlay);

    const interval = setInterval(() => {
        countdown--;
        countdownText.textContent = `Delete this request in ${countdown} seconds...`;

        if (countdown === 0) {
            clearInterval(interval);
            overlay.remove();
            requestItem.remove();

            fetch("https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    action: "EraseCellAfterDenyMoreDocumentNEW",
                    cell: cell
                })
            })
                .then(res => res.text())
                .then(result => {
                    console.log("Backend response:", result);
                })
                .catch(err => {
                    console.error("Error sending to backend:", err);
                });

            if (requestGroupDiv.querySelectorAll('.request-item').length === 0) {
                bigGroupDiv.remove();
            }
        }
    }, 1000);

    cancelBtn.addEventListener('click', () => {
        clearInterval(interval);
        overlay.remove();
    });

    updateNumbersOfRequestInMoreDocumentNEW();
}


// Bấm nút Check để nhận request
function checkButtonForRequestItem(id, content, cell) {
    const contentToSend = content.replace(/\[Emp:.*?\]/, "").trim();

    const button = event.currentTarget;
    const requestItem = button.closest('.request-item');
    const requestGroupDiv = requestItem.closest('.non-origin-group-request');
    const bigGroupDiv = requestItem.closest('.big-group-request');
    const originGroupDiv = bigGroupDiv.querySelector('.origin-group-request');

    // Countdown overlay cho request-item
    const overlay = document.createElement('div');
    overlay.className = 'countdown-text-request-item green-background';

    let countdown = 5;
    const countdownText = document.createElement('div');
    countdownText.textContent = `Approve this request in ${countdown} seconds...`;

    const cancelBtn = document.createElement('div');
    cancelBtn.className = 'cross-button-for-request-item';
    cancelBtn.title = 'Cancel this Approval';
    cancelBtn.textContent = '✖';

    overlay.appendChild(cancelBtn);
    overlay.appendChild(countdownText);
    requestItem.appendChild(overlay);

    // COUNTDOWN chính
    const interval = setInterval(() => {
        countdown--;
        countdownText.textContent = `Approve this request in ${countdown} seconds...`;

        if (countdown === 0) {
            clearInterval(interval);
            overlay.remove();
            requestItem.remove();

            // Tạo loading overlay cho toàn bộ big-group-request
            const bigOverlay = document.createElement('div');
            bigOverlay.className = 'countdown-text-request-item green-big-background';
            bigOverlay.textContent = 'Processing approval... Please wait';
            bigGroupDiv.appendChild(bigOverlay);

            // Gửi dữ liệu
            const fetch1 = fetch("https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    action: "UpdateColumnBAfterFoundIDInMoreDocumentsNew",
                    id: id,
                    contentToSend: contentToSend
                })
            });

            const fetch2 = fetch("https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    action: "EraseCellAfterDenyMoreDocumentNEW",
                    cell: cell
                })
            });

            Promise.all([fetch1, fetch2])
                .then(responses => Promise.all(responses.map(r => r.text())))
                .then(([result1, result2]) => {
                    bigOverlay.remove(); // ❌ Remove loading

                    // Cập nhật nội dung trong origin-group
                    if (originGroupDiv && requestItem) {
                        const tagContainers = originGroupDiv.querySelectorAll('.Tag-container');
                        const titleContainers = originGroupDiv.querySelectorAll('.Title-container');
                        const contentContainers = originGroupDiv.querySelectorAll('.Content-container');

                        tagContainers.forEach(tag => tag.textContent = '');
                        titleContainers.forEach(title => title.textContent = '');
                        contentContainers.forEach(content => content.textContent = '');

                        const newTag = requestItem.querySelector('.Tag-container');
                        const newTitle = requestItem.querySelector('.Title-container');
                        const newContent = requestItem.querySelector('.Content-container');

                        if (newTag && tagContainers.length > 0) {
                            const tagContainer = tagContainers[0];
                            tagContainer.innerHTML = '';

                            const buttons = newTag.querySelectorAll('button.tag-More-Documents');
                            buttons.forEach(btn => {
                                if (!btn.classList.contains('gray-background-tag')) {
                                    const clonedBtn = btn.cloneNode(true);
                                    clonedBtn.classList.remove('green-background-tag');
                                    tagContainer.appendChild(clonedBtn);
                                }
                            });
                        }

                        if (newTitle && titleContainers.length > 0) {
                            const cleanTitleHTML = newTitle.innerHTML.replace(/<mark[^>]*>/g, '').replace(/<\/mark>/g, '');
                            titleContainers[0].innerHTML = cleanTitleHTML;
                        }

                        if (newContent && contentContainers.length > 0) {
                            const cleanContentHTML = newContent.innerHTML.replace(/<mark[^>]*>/g, '').replace(/<\/mark>/g, '');
                            contentContainers[0].innerHTML = cleanContentHTML;
                        }

                        setTimeout(() => {
                            highlightDiffForGroup(bigGroupDiv);
                            highlightTagDifferences(bigGroupDiv);
                        }, 0);
                    }

                    // Xoá các tag xám trong tất cả request-item
                    const allRequestItems = requestGroupDiv.querySelectorAll('.request-item');
                    allRequestItems.forEach(item => {
                        const grayTags = item.querySelectorAll('button.tag-More-Documents.gray-background-tag');
                        grayTags.forEach(tag => tag.remove());
                    });

                    // Xoá cả nhóm nếu không còn request
                    if (requestGroupDiv.querySelectorAll('.request-item').length === 0) {
                        bigGroupDiv.remove();
                    }
                })
                .catch(err => {
                    console.error("Error in one of the fetch requests:", err);
                    bigOverlay.textContent = '❌ Error occurred while processing!';
                    bigOverlay.style.backgroundColor = 'red';
                });
        }
    }, 1000);

    cancelBtn.addEventListener('click', () => {
        clearInterval(interval);
        overlay.remove();
    });

    updateNumbersOfRequestInMoreDocumentNEW();
}




document.addEventListener("DOMContentLoaded", function () {
    function updateLabel(inputId) {
        const dateInput = document.getElementById(inputId);
        const dateLabel = document.querySelector(`label[for='${inputId}']`);

        // Khi click vào label, mở lịch chọn ngày
        dateLabel.addEventListener("click", function () {
            dateInput.showPicker(); // Mở lịch chọn ngày
        });

        dateInput.addEventListener("change", function () {
            if (this.value) {
                // Lấy giá trị YYYY-MM-DD và tách thành phần ngày, tháng, năm
                const [year, month, day] = this.value.split('-');

                // Tạo đối tượng Date theo giờ địa phương, tránh lỗi múi giờ
                const selectedDate = new Date(year, month - 1, day);

                // Định dạng ngày thành 'Sun, 16-02-2025'
                const options = { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' };
                const formattedDate = selectedDate.toLocaleDateString('en-GB', options).replace(/\//g, '-');

                // Cập nhật nội dung label
                dateLabel.textContent = formattedDate;
            } else {
                dateLabel.textContent = "Choose Date"; // Khi input trống, đặt lại label
            }
        });

    }

    // Kích hoạt cho cả hai input
    updateLabel("input-Current-store-time");
    updateLabel("input-Time-chosen-by-customer");
});



// Function to convert time to 12-hour format with AM/PM
function convertTo12HourFormat(hour, minute, second) {
    let amPm = hour >= 12 ? "PM" : "AM";
    if (hour > 12) {
        hour -= 12;
    } else if (hour === 0) {
        hour = 12;
    }

    minute = minute.toString().padStart(2, "0");
    second = second.toString().padStart(2, "0");

    return `${hour}:${minute}:${second} ${amPm}`;
}

// Update clocks for Houston and HCM
function updateClocks() {
    const houstonTime = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
    const hcmTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
    const vicTime = new Date().toLocaleString("en-US", { timeZone: "Australia/Melbourne" });

    const houstonDate = new Date(houstonTime);
    const hcmDate = new Date(hcmTime);
    const vicDate = new Date(vicTime);

    function formatDate(date, style) {
        const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const daysVietnamese = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        if (style === "houston") {
            return `${daysShort[date.getDay()]}, ${day}-${month}-${year}`;
        } else if (style === "hcm") {
            return `${daysVietnamese[date.getDay()]}, ${day}-${month}-${year}`;
        } else if (style === "vic") {
            return `${daysShort[date.getDay()]}, ${day}-${month}-${year}`;
        }
    }

    const houston12Hour = convertTo12HourFormat(houstonDate.getHours(), houstonDate.getMinutes(), houstonDate.getSeconds());
    document.getElementById("houstonDay").textContent = formatDate(houstonDate, "houston");
    document.getElementById("houstonClock").textContent = houstonDate.toLocaleTimeString();
    document.getElementById("houstonDay2").textContent = formatDate(houstonDate, "houston");
    document.getElementById("Now-date-in-TX").textContent = formatDate(houstonDate, "houston");
    document.getElementById("houstonClock2").textContent = houstonDate.toLocaleTimeString();
    document.getElementById("Now-time-in-TX").textContent = houston12Hour;

    document.getElementById("hcmDay").textContent = formatDate(hcmDate, "hcm");
    document.getElementById("hcmClock").textContent = hcmDate.toLocaleTimeString();
    document.getElementById("hcmDay2").textContent = formatDate(hcmDate, "hcm");
    document.getElementById("hcmClock2").textContent = hcmDate.toLocaleTimeString();

    document.getElementById("VicDay2").textContent = formatDate(vicDate, "vic");
    document.getElementById("VicClock2").textContent = vicDate.toLocaleTimeString();
}


setInterval(updateClocks, 1000);

updateClocks();




//tính toán
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("input-Current-store-time").addEventListener("change", updateStoreTime);
    document.getElementById("Now-hour-time-in-store").addEventListener("change", updateStoreTime);
    document.getElementById("store-am-pm").addEventListener("change", updateStoreTime);
    document.getElementById("input-Time-chosen-by-customer").addEventListener("change", updateCustomerTime);
    document.getElementById("hour-time-they-choose").addEventListener("change", updateCustomerTime);
    document.getElementById("customer-am-pm").addEventListener("change", updateCustomerTime);
    document.getElementById("input-Current-store-time").addEventListener("change", calculateTimeDifference);
    document.getElementById("Now-hour-time-in-store").addEventListener("change", calculateTimeDifference);
    document.getElementById("store-am-pm").addEventListener("change", calculateTimeDifference);
});

function updateStoreTime() {
    const dateInput = document.getElementById("input-Current-store-time").value;
    const hourInput = document.getElementById("Now-hour-time-in-store").value;
    const ampm = document.getElementById("store-am-pm").value;

    // Kiểm tra nếu có đủ thông tin
    if (dateInput && hourInput && ampm) {
        // Tạo đối tượng Date từ ngày đầu vào và sử dụng múi giờ địa phương
        const date = new Date(dateInput + "T00:00:00");  // Tạo ngày từ input, mặc định là 00:00 theo múi giờ địa phương

        let hour = parseInt(hourInput);

        // Cộng thêm 12 giờ nếu là PM
        if (ampm === "PM" && hour !== 12) {
            hour += 12;
        }

        // Đảm bảo giờ không phải là 12AM
        if (ampm === "AM" && hour === 12) {
            hour = 0;
        }

        // Cập nhật giờ cho đối tượng Date
        date.setHours(hour);  // Sử dụng setHours để đảm bảo múi giờ địa phương

        // Định dạng ngày và giờ theo mẫu yêu cầu (ngày theo "DD-MM-YYYY" và giờ theo "hh:mm AM/PM")
        const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-GB', optionsDate);  // Dùng 'en-GB' để lấy định dạng DD-MM-YYYY
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = date.toLocaleTimeString('en-US', optionsTime);  // Định dạng giờ

        // Ghép ngày và giờ lại với nhau theo định dạng "DD-MM-YYYY hh:mm AM/PM"
        const formattedDateTime = `${formattedDate} ${formattedTime}`;

        // Cập nhật giá trị hiển thị cho Current-store-time
        document.getElementById("Current-store-time").textContent = formattedDateTime;

        // Trả về đối tượng Date để tính toán chênh lệch giờ sau này
        return date;
    }
}

function updateTexasTime() {
    // Lấy thời gian hiện tại ở Texas (múi giờ của Texas là UTC -6 hoặc UTC -5 vào mùa hè)
    const texasTime = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });

    // Tạo đối tượng Date từ thời gian hiện tại ở Texas
    const dateInTX = new Date(texasTime);

    // Đặt số phút thành 00
    dateInTX.setMinutes(0);

    // Định dạng ngày và giờ cho phần tử #Now-date-in-TX và #Now-time-in-TX
    const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = dateInTX.toLocaleDateString('en-GB', optionsDate);  // Dùng 'en-GB' để lấy định dạng DD-MM-YYYY

    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
    let formattedTime = dateInTX.toLocaleTimeString('en-US', optionsTime);  // Định dạng giờ

    formattedTime = formattedTime.replace(/([APM]{2})$/, ' $1');  // Đảm bảo giờ có AM/PM

    // Ghép lại và đưa vào #Now-in-TX theo định dạng "DD-MM-YYYY hh:mm AM/PM"
    const formattedNow = `${formattedDate} ${formattedTime}`;

    // Cập nhật các phần tử #Now-date-in-TX và #Now-time-in-TX
    // document.getElementById("Now-date-in-TX").textContent = formattedDate;
    // document.getElementById("Now-time-in-TX").textContent = formattedTime;

    // Cập nhật #Now-in-TX
    document.getElementById("Now-in-TX").textContent = formattedNow;

    // Trả về đối tượng Date để tính toán chênh lệch giờ sau này
    return dateInTX;
}

// Gọi hàm updateTexasTime để cập nhật thời gian lúc load trang
updateTexasTime();
setInterval(updateTexasTime, 1000);



function updateCustomerTime() {
    const dateInput = document.getElementById("input-Time-chosen-by-customer").value;
    const hourInput = document.getElementById("hour-time-they-choose").value;
    const ampm = document.getElementById("customer-am-pm").value;

    // Kiểm tra nếu có đủ thông tin
    if (dateInput && hourInput && ampm) {
        // Tạo đối tượng Date từ ngày đầu vào và sử dụng múi giờ địa phương
        const date = new Date(dateInput + "T00:00:00");  // Tạo ngày từ input, mặc định là 00:00 theo múi giờ địa phương

        let hour = parseInt(hourInput);

        // Cộng thêm 12 giờ nếu là PM
        if (ampm === "PM" && hour !== 12) {
            hour += 12;
        }

        // Đảm bảo giờ không phải là 12AM
        if (ampm === "AM" && hour === 12) {
            hour = 0;
        }

        // Cập nhật giờ cho đối tượng Date
        date.setHours(hour);  // Sử dụng setHours để đảm bảo múi giờ địa phương

        // Định dạng ngày và giờ theo mẫu yêu cầu (ngày theo "DD-MM-YYYY" và giờ theo "hh:mm AM/PM")
        const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-GB', optionsDate);  // Dùng 'en-GB' để lấy định dạng DD-MM-YYYY
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = date.toLocaleTimeString('en-US', optionsTime);  // Định dạng giờ

        // Ghép ngày và giờ lại với nhau theo định dạng "DD-MM-YYYY hh:mm AM/PM"
        const formattedDateTime = `${formattedDate} ${formattedTime}`;

        // Cập nhật giá trị hiển thị cho Current-store-time
        document.getElementById("Date-Time-chosen-by-customer").textContent = formattedDateTime;

        // Trả về đối tượng Date để tính toán chênh lệch giờ sau này
        return date;
    }
}


function calculateTimeDifference() {
    const storeTime = updateStoreTime();  // Lấy thời gian từ hàm updateStoreTime
    const texasTime = updateTexasTime();  // Lấy thời gian từ hàm updateTexasTime

    // Kiểm tra nếu cả hai giá trị đều hợp lệ
    if (storeTime && texasTime) {
        // Tính sự chênh lệch thời gian mà không cần giá trị tuyệt đối
        const timeDifference = storeTime - texasTime;  // Không sử dụng Math.abs()

        // Chuyển sự chênh lệch từ milliseconds sang giờ và làm tròn
        const differenceInHours = Math.round(timeDifference / (1000 * 60 * 60));  // Cắt phần thập phân

        // Kiểm tra nếu differenceInHours là số âm
        if (differenceInHours < 0) {
            // Nếu là số âm, thông báo tiệm trễ hơn Texas
            document.getElementById("chech-lech-gio").innerHTML = `${differenceInHours} giờ, nghĩa là Giờ Tiệm <span style="color:red">TRỄ</span> hơn Giờ Texas ${Math.abs(differenceInHours)} giờ`;
        } else if (differenceInHours > 0) {
            // Nếu là số dương, thông báo tiệm sớm hơn Texas
            document.getElementById("chech-lech-gio").innerHTML = `${differenceInHours} giờ, nghĩa là Giờ Tiệm <span style="color:red">SỚM</span> hơn Giờ Texas ${Math.abs(differenceInHours)} giờ`;
        } else {
            // Nếu là 0, thông báo không có sự chênh lệch
            document.getElementById("chech-lech-gio").innerHTML = `${differenceInHours} giờ, nghĩa là Giờ Tiệm và Giờ Texas <span style="color:red">BẰNG NHAU</span>`;
        }
    }
}



function calculateAppointmentTime() {
    // Lấy thời gian khách hàng đã chọn từ updateCustomerTime
    const customerTime = updateCustomerTime();

    // Lấy sự chênh lệch thời gian từ calculateTimeDifference
    const timeDifferenceText = document.getElementById("chech-lech-gio").textContent;
    const timeDifference = parseInt(timeDifferenceText.split(":")[0].trim());  // Lấy số giờ từ phần tử #chech-lech-gio

    // Kiểm tra nếu customerTime và timeDifference hợp lệ
    if (customerTime && !isNaN(timeDifference)) {
        // Trừ sự chênh lệch giờ từ thời gian khách hàng đã chọn
        const appointmentTime = new Date(customerTime);
        appointmentTime.setHours(appointmentTime.getHours() - timeDifference);

        // Định dạng lại thời gian của cuộc hẹn theo định dạng "Mon, 19-02-2025"
        const optionsDate = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = appointmentTime.toLocaleDateString('en-GB', optionsDate);  // Dùng 'en-GB' để lấy định dạng "Mon, 19-02-2025"

        // Thay đổi dấu phân cách '/' thành '-'
        const formattedDateWithDash = formattedDate.replace(/\//g, '-');

        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = appointmentTime.toLocaleTimeString('en-US', optionsTime);  // Định dạng giờ

        // Cập nhật giá trị hiển thị cho phần tử #date-right-appointments-in-TX (chỉ ngày)
        document.getElementById("date-right-appointments-in-TX").textContent = formattedDateWithDash;

        // Cập nhật giá trị hiển thị cho phần tử #time-right-appointments-in-TX (chỉ giờ)
        document.getElementById("time-right-appointments-in-TX").textContent = formattedTime;
    }
}







//Đóng tất cả các header-container
document.addEventListener('click', function (event) {
    const headerMainContainer = document.querySelector('#header-main-container');
    const checkboxes = headerMainContainer.querySelectorAll('#header-main-container > div > input[type="checkbox"]');

    // Kiểm tra nếu người dùng bấm bên ngoài #header-main-container
    if (!headerMainContainer.contains(event.target)) {
        // Bỏ chọn tất cả các checkbox
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    } else {
        // Nếu bấm vào một checkbox
        const clickedCheckbox = event.target.closest('input[type="checkbox"]');
        if (clickedCheckbox && !clickedCheckbox.classList.contains('theme-switch__checkbox')) {
            // Bỏ chọn tất cả các checkbox khác, trừ checkbox vừa bấm
            checkboxes.forEach(checkbox => {
                if (checkbox !== clickedCheckbox && !checkbox.classList.contains('theme-switch__checkbox')) {
                    checkbox.checked = false;
                }
            });
        }
    }
});


// Chuyển qua lại dark mode và light mode
const themeSwitchCheckbox = document.querySelector('.theme-switch__checkbox');
const sunMoonIcon = document.getElementById('Sun-Moon_icon_ID');
const iframeOnboard = document.getElementById('iframe-onboard'); // Lấy iframe

// Kiểm tra và thiết lập trạng thái ban đầu
if (localStorage.getItem('darkMode') === 'enabled') {
    document.documentElement.classList.toggle('dark-mode');
    themeSwitchCheckbox.checked = true;
    sunMoonIcon.className = 'moon-and-shadow-icon';
    if (iframeOnboard) iframeOnboard.style.filter = 'invert(100%) brightness(2)'; // Nghịch màu iframe
} else {
    sunMoonIcon.className = 'sun-and-glow-icon';
    if (iframeOnboard) iframeOnboard.style.filter = ''; // Bỏ nghịch màu
}

// Lắng nghe sự kiện thay đổi chế độ sáng/tối
themeSwitchCheckbox.addEventListener('change', function () {
    if (this.checked) {
        document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        sunMoonIcon.className = 'moon-and-shadow-icon';
        if (iframeOnboard) iframeOnboard.style.filter = 'invert(100%) brightness(2)'; // Nghịch màu iframe
    } else {
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        sunMoonIcon.className = 'sun-and-glow-icon';
        if (iframeOnboard) iframeOnboard.style.filter = ''; // Bỏ nghịch màu
    }
});




// Di chuyển các containter Tools
document.querySelectorAll('.movearea').forEach(movearea => {
    movearea.addEventListener('mousedown', function (e) {
        const parent = this.parentElement;

        const computedStyle = window.getComputedStyle(parent);
        if (!parent.style.width) {
            parent.style.width = computedStyle.width; // Lấy kích thước thực tế
        }
        if (!parent.style.height) {
            parent.style.height = computedStyle.height;
        }

        const rect = parent.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        function onMouseMove(event) {
            // Đặt phần tử cha ở giữa con chuột
            parent.style.left = `${event.clientX - 0}px`;
            parent.style.top = `${event.clientY - 20}px`;
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});



// Đóng popup yêu cầu quyền truy cập
document.getElementById('close-popup-request-permission').addEventListener('click', function () {
    document.getElementById('Popup_Request_Permission_Container').classList.add('hidden_visibility');
    document.getElementById('USERrequestClipboard').style.transition = 'unset';
    document.getElementById('USERrequestMultiplePopups').style.transition = 'unset';
});

document.getElementById('open-popup-request-permission').addEventListener('click', function () {
    document.getElementById('Popup_Request_Permission_Container').classList.remove('hidden_visibility');
    document.getElementById('USERrequestClipboard').style.transition = 'var(--transition-all-500ms)';
    document.getElementById('USERrequestMultiplePopups').style.transition = 'var(--transition-all-500ms)';
});

document.getElementById('close-Open-After-USERrequestMultiplePopups-final').addEventListener('click', function () {
    document.getElementById('Open-After-USERrequestMultiplePopups-final').classList.add('DisplayNone');
});





document.getElementById('refresh-more-documents-container_NEW').addEventListener('click', async function () {
    await fetchAndDisplayDocumentsNEW();
    await loadPersonalFavoriteRowInMoreDocumentNEW();
    StatusUpdateBox("More Document", "Cập nhật thành công", "green");
});




async function fetchAndDisplayDocumentsNEW() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=GetMoreDocumentsNEW');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            const container = document.querySelector('#more-document-table_NEW');
            container.innerHTML = ''; // Xóa nội dung cũ

            // Tạo bảng
            let table = document.createElement('table');
            let tbody = document.createElement('tbody');

            data.forEach(row => {
                let tr = document.createElement('tr');
                tr.classList.add("tr-NEW");

                // Tạo td cho checkbox
                let checkboxTd = document.createElement('td');
                let checkboxLabel = document.createElement('label');
                checkboxLabel.classList.add("Favorite_row");
                checkboxLabel.title = "Mark as your favorite";

                // Tạo input checkbox
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.classList.add("Favorite_row_checkbox");


                // Thêm SVG
                let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("viewBox", "0 0 24 24");
                svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                svg.innerHTML = `<g><g><path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path></g></g>`;


                // Gắn input và SVG vào label
                checkboxLabel.appendChild(checkbox);
                checkboxLabel.appendChild(svg);

                // Gắn label vào td
                checkboxTd.appendChild(checkboxLabel);

                // Gắn td vào tr
                tr.appendChild(checkboxTd);


                let cellValues = Object.values(row).map(value => String(value).trim());
                let lastCellIndex = cellValues.reduce((count, text) => count + text.split('{-}').length, 0) - 1;
                let cellCount = 0;

                cellValues.forEach(text => {
                    let tagMatch = text.match(/\[TAG:(.*?)\]/); // Tìm chuỗi [TAG:...]
                    let cells = text.split('{-}').map(cell => cell.trim()); // Tách thành các ô nếu có {-}

                    cells.forEach((cellContent, index) => {
                        let td = document.createElement('td');
                        let finalContent = '';

                        if (cellCount === 0) {
                            td.classList.add('DisplayNone', 'Width0percent'); // ẩn hoàn toàn
                        }

                        if (tagMatch && index === 0) {
                            // Nếu có TAG và đây là ô đầu tiên, chèn button vào cùng cell
                            let tags = tagMatch[1].split(',').map(tag => tag.trim());
                            let tagButtons = tags.map(tag => {
                                let button = document.createElement('button'); // Tạo button bằng JS
                                button.textContent = tag; // Gán nội dung cho button
                                button.classList.add('tag-More-Documents'); // Thêm class
                                // button.classList.add(tag.replace(/\s+/g, '')); // Thêm class theo tên tag, viết liền
                                return button.outerHTML; // Chuyển button thành HTML string
                            }).join(' ');

                            // Xóa [TAG:...] khỏi chuỗi gốc
                            cellContent = cellContent.replace(tagMatch[0], '').trim();
                            finalContent = cellContent + '<br>' + tagButtons;
                        } else {
                            finalContent = cellContent;
                        }

                        // Xử lý xuống dòng `{^p}`
                        finalContent = finalContent.replace(/{\^p}/g, '<br>');

                        // Chuyển đổi URL thành liên kết
                        td.innerHTML = convertUrlsToLinks(finalContent);


                        const AddingNewRowButton = document.getElementById('Add-new-row-into-More-Document-NEW');
                        AddingNewRowButton.addEventListener('click', () => {
                            const mainDropdown = document.getElementById('dropdown-for-choose-main-new-tag');
                            const newDropdown2 = document.getElementById('dropdown-for-choose-new-tag_add-new-row');

                            // Xóa nội dung cũ trong newDropdown
                            newDropdown2.innerHTML = '';

                            // Clone và chuyển nội dung sang dropdown mới
                            mainDropdown.querySelectorAll('button').forEach(button => {
                                let clonedButton = button.cloneNode(true);
                                clonedButton.classList.add('tag-More-Documents');
                                clonedButton.style.cursor = 'pointer';
                                newDropdown2.appendChild(clonedButton);
                            });


                            document.getElementById('search-tag-in-more-document-table-new_add-new-row').addEventListener('focus', () => {
                                document.getElementById('dropdown-for-choose-new-tag_add-new-row').style.display = 'block';
                            });

                            document.addEventListener('click', (event) => {
                                const searchInput = document.getElementById('search-tag-in-more-document-table-new_add-new-row');
                                const dropdown = document.getElementById('dropdown-for-choose-new-tag_add-new-row');

                                if (!dropdown.contains(event.target) && event.target !== searchInput) {
                                    dropdown.style.display = 'none';
                                }
                            });

                            document.getElementById('dropdown-for-choose-new-tag_add-new-row').addEventListener('click', (event) => {
                                if (event.target.tagName === 'BUTTON') {
                                    event.stopPropagation();
                                }
                            });

                            function setupTagSearch() {
                                const searchInput = document.getElementById('search-tag-in-more-document-table-new_add-new-row');
                                const dropdown = document.getElementById('dropdown-for-choose-new-tag_add-new-row');

                                // Tạo phần tử "No result" nếu chưa có
                                let noResultDiv = dropdown.querySelector('.no-result');
                                if (!noResultDiv) {
                                    noResultDiv = document.createElement('div');
                                    noResultDiv.textContent = 'No result';
                                    noResultDiv.classList.add('no-result');
                                    noResultDiv.style.display = 'none'; // Ẩn ban đầu
                                    noResultDiv.style.color = '#888';
                                    noResultDiv.style.textAlign = 'center';
                                    dropdown.appendChild(noResultDiv);
                                }

                                searchInput.addEventListener('input', () => {
                                    const searchText = searchInput.value.trim().toLowerCase();
                                    const buttons = dropdown.querySelectorAll('button');

                                    let hasMatch = false; // Kiểm tra xem có tag nào khớp không

                                    buttons.forEach(button => {
                                        if (button.textContent.toLowerCase().includes(searchText)) {
                                            button.style.display = 'inline-flex';
                                            hasMatch = true;
                                        } else {
                                            button.style.display = 'none';
                                        }
                                    });

                                    // Hiển thị "No result" nếu không tìm thấy kết quả
                                    noResultDiv.style.display = hasMatch ? 'none' : 'block';
                                });
                            }

                            // Gọi lại hàm sau khi load dữ liệu xong
                            setupTagSearch();

                            function setupTagToggle() {
                                const tagContainer = document.getElementById('Tag-Of-Row-More-Document_add-new-row');
                                const dropdownContainer = document.getElementById('dropdown-for-choose-new-tag_add-new-row');

                                // Tạo phần tử "No result" nếu chưa có
                                let noResultDiv = dropdownContainer.querySelector('.no-result');
                                if (!noResultDiv) {
                                    noResultDiv = document.createElement('div');
                                    noResultDiv.textContent = 'No result';
                                    noResultDiv.classList.add('no-result');
                                    noResultDiv.style.display = 'none'; // Ẩn ban đầu
                                    noResultDiv.style.padding = '0.5rem';
                                    noResultDiv.style.color = '#888';
                                    noResultDiv.style.textAlign = 'center';
                                    dropdownContainer.appendChild(noResultDiv);
                                }

                                function moveTag(tagButton, fromContainer, toContainer) {
                                    fromContainer.removeChild(tagButton);
                                    toContainer.appendChild(tagButton);
                                    checkDropdownEmpty(); // Kiểm tra xem dropdown có trống không
                                }

                                function addTagClickListener(container, fromContainer, toContainer) {
                                    container.addEventListener('click', (event) => {
                                        if (event.target.tagName === 'BUTTON') {
                                            moveTag(event.target, fromContainer, toContainer);
                                        }
                                    });
                                }

                                function checkDropdownEmpty() {
                                    const buttons = dropdownContainer.querySelectorAll('button');
                                    noResultDiv.style.display = buttons.length === 0 ? 'block' : 'none';
                                }

                                addTagClickListener(tagContainer, tagContainer, dropdownContainer);
                                addTagClickListener(dropdownContainer, dropdownContainer, tagContainer);
                            }


                            // Gọi hàm này sau khi load xong dữ liệu
                            setupTagToggle();


                        });




                        // Nếu là ô cuối cùng của dòng, thêm class "td-can-be-edited"
                        if (cellCount === lastCellIndex) {
                            td.classList.add('td-can-be-edited');
                            const tdadding = document.createElement('div');
                            tdadding.classList.add('td-adding');
                            td.appendChild(tdadding);

                            tdadding.addEventListener('click', () => {
                                const tr = tdadding.closest('tr'); // Lấy hàng chứa td
                                const tds = tr.querySelectorAll('td'); // Lấy danh sách tất cả td trong tr

                                if (tds.length >= 3) {
                                    // Lấy dữ liệu từ các ô
                                    const idValue = tds[1].textContent.trim(); // Ô đầu tiên
                                    let titleTd = tds[2]; // Ô thứ 2 (chứa tiêu đề + tag)
                                    let contentTd = tds[3]; // Ô thứ 3 (chứa nội dung)

                                    let tags = [];

                                    // Lấy các button chứa tag
                                    titleTd.querySelectorAll('button.tag-More-Documents').forEach(button => {
                                        tags.push(button.textContent.trim());
                                    });

                                    // Lấy nội dung tiêu đề, loại bỏ button
                                    let titleClone = titleTd.cloneNode(true);
                                    titleClone.querySelectorAll('button').forEach(btn => btn.remove());
                                    let titleValue = titleClone.innerHTML.replace(/<br\s*\/?>/gi, '\n').trim();


                                    // **Xử lý Content:**
                                    let contentClone = contentTd.cloneNode(true);
                                    contentClone.querySelectorAll('.td-adding').forEach(div => div.remove());

                                    // Lấy nội dung, giữ nguyên các thẻ <br>
                                    let contentValue = contentClone.innerHTML.trim();

                                    // Đổ nội dung vào div contenteditable
                                    document.getElementById('Content-Of-Row-More-Document').innerHTML = contentValue;


                                    // Cập nhật vào các input
                                    document.getElementById('id-of-row-more-document').textContent = idValue;
                                    document.getElementById('Tag-Of-Row-More-Document').innerHTML = tags.map(tag => {
                                        let button = document.createElement('button'); // Tạo button cho tag
                                        button.textContent = tag;
                                        button.classList.add('tag-More-Documents');
                                        button.style.cursor = 'pointer';
                                        return button.outerHTML;
                                    }).join(' ');

                                    document.getElementById('Title-Of-Row-More-Document').innerHTML = titleValue.replace(/\n/g, '<br>');
                                    // document.getElementById('Content-Of-Row-More-Document').innerHTML = contentValue.replace(/\n/g, '<br>');

                                    // Hiển thị khung chỉnh sửa
                                    document.getElementById('More-Document_container_Edit_NEW').style.display = 'flex';

                                    const mainDropdown = document.getElementById('dropdown-for-choose-main-new-tag');
                                    const newDropdown = document.getElementById('dropdown-for-choose-new-tag');
                                    const existingTags = new Set();

                                    document.querySelectorAll('#Tag-Of-Row-More-Document button').forEach(button => {
                                        existingTags.add(button.textContent.trim()); // Thêm tag vào Set
                                    });
                                    // Xóa nội dung cũ trong newDropdown
                                    newDropdown.innerHTML = '';

                                    // Clone và chuyển nội dung sang dropdown mới
                                    mainDropdown.querySelectorAll('button').forEach(button => {
                                        let tagName = button.textContent.trim();
                                        if (!existingTags.has(tagName)) {
                                            let clonedbutton = button.cloneNode(true);
                                            clonedbutton.classList.add('tag-More-Documents');
                                            clonedbutton.style.cursor = 'pointer';
                                            newDropdown.appendChild(clonedbutton);
                                        }
                                    });


                                    document.getElementById('search-tag-in-more-document-table-new').addEventListener('focus', () => {
                                        document.getElementById('dropdown-for-choose-new-tag').style.display = 'block';
                                    });


                                    document.addEventListener('click', (event) => {
                                        const searchInput = document.getElementById('search-tag-in-more-document-table-new');
                                        const dropdown = document.getElementById('dropdown-for-choose-new-tag');

                                        if (!dropdown.contains(event.target) && event.target !== searchInput) {
                                            dropdown.style.display = 'none';
                                        }
                                    });

                                    // Khi click vào button trong dropdown thì dropdown không bị ẩn
                                    document.getElementById('dropdown-for-choose-new-tag').addEventListener('click', (event) => {
                                        if (event.target.tagName === 'BUTTON') {
                                            event.stopPropagation();
                                        }
                                    });

                                    function setupTagSearch() {
                                        const searchInput = document.getElementById('search-tag-in-more-document-table-new');
                                        const dropdown = document.getElementById('dropdown-for-choose-new-tag');

                                        // Tạo phần tử "No result" nếu chưa có
                                        let noResultDiv = dropdown.querySelector('.no-result');
                                        if (!noResultDiv) {
                                            noResultDiv = document.createElement('div');
                                            noResultDiv.textContent = 'No result';
                                            noResultDiv.classList.add('no-result');
                                            noResultDiv.style.display = 'none'; // Ẩn ban đầu
                                            noResultDiv.style.color = '#888';
                                            noResultDiv.style.textAlign = 'center';
                                            dropdown.appendChild(noResultDiv);
                                        }

                                        searchInput.addEventListener('input', () => {
                                            const searchText = searchInput.value.trim().toLowerCase();
                                            const buttons = dropdown.querySelectorAll('button');

                                            let hasMatch = false; // Kiểm tra xem có tag nào khớp không

                                            buttons.forEach(button => {
                                                if (button.textContent.toLowerCase().includes(searchText)) {
                                                    button.style.display = 'inline-flex';
                                                    hasMatch = true;
                                                } else {
                                                    button.style.display = 'none';
                                                }
                                            });

                                            // Hiển thị "No result" nếu không tìm thấy kết quả
                                            noResultDiv.style.display = hasMatch ? 'none' : 'block';
                                        });
                                    }

                                    // Gọi lại hàm sau khi load dữ liệu xong
                                    setupTagSearch();



                                    function setupTagToggle() {
                                        const tagContainer = document.getElementById('Tag-Of-Row-More-Document');
                                        const dropdownContainer = document.getElementById('dropdown-for-choose-new-tag');

                                        // Tạo phần tử "No result" nếu chưa có
                                        let noResultDiv = dropdownContainer.querySelector('.no-result');
                                        if (!noResultDiv) {
                                            noResultDiv = document.createElement('div');
                                            noResultDiv.textContent = 'No result';
                                            noResultDiv.classList.add('no-result');
                                            noResultDiv.style.display = 'none'; // Ẩn ban đầu
                                            noResultDiv.style.padding = '0.5rem';
                                            noResultDiv.style.color = '#888';
                                            noResultDiv.style.textAlign = 'center';
                                            dropdownContainer.appendChild(noResultDiv);
                                        }

                                        function moveTag(tagButton, fromContainer, toContainer) {
                                            fromContainer.removeChild(tagButton);
                                            toContainer.appendChild(tagButton);
                                            checkDropdownEmpty(); // Kiểm tra xem dropdown có trống không
                                        }

                                        function addTagClickListener(container, fromContainer, toContainer) {
                                            container.addEventListener('click', (event) => {
                                                if (event.target.tagName === 'BUTTON') {
                                                    moveTag(event.target, fromContainer, toContainer);
                                                }
                                            });
                                        }

                                        function checkDropdownEmpty() {
                                            const buttons = dropdownContainer.querySelectorAll('button');
                                            noResultDiv.style.display = buttons.length === 0 ? 'block' : 'none';
                                        }

                                        addTagClickListener(tagContainer, tagContainer, dropdownContainer);
                                        addTagClickListener(dropdownContainer, dropdownContainer, tagContainer);
                                    }


                                    // Gọi hàm này sau khi load xong dữ liệu
                                    setupTagToggle();
                                }
                            });
                        }

                        tr.appendChild(td);
                        cellCount++;
                    });
                });

                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
            container.appendChild(table);
        } else {
            console.error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
}



