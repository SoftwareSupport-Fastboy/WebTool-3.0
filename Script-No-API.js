// liệt kê giá trị pixel của 1 rem
const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
console.log(`0.5rem = ${0.5 * remInPx}px`);
console.log(`1rem = ${1 * remInPx}px`);
console.log(`2rem = ${2 * remInPx}px`);



// bấm ra ngoài để ẩn hộp filter tag
document.addEventListener('click', function (event) {
    if (!document.getElementById('tag-in-more-document-containter').contains(event.target) &&
        !document.getElementById('filter-tag-in-more-document-container').contains(event.target) &&
        !document.getElementById('filter-tag-in-more-document').contains(event.target)) {
        document.getElementById('filter-tag-in-more-document').checked = false;
    }
});



// hiện ẩn box
const clockContainer = document.getElementById('Time-converter-logo');
const converterTimeContainer = document.getElementById('Time-converter-container');
const lichtruccalendarID = document.getElementById('lichtruc-calendar_ID');
const lichtruccuoituancontainer = document.getElementById('lichtruccuoituan_container');
const OnboardcalendarID = document.getElementById('Onboard-calendar_ID');
const Onboardcontainer = document.getElementById('Onboard_container');
const MoredocumentID = document.getElementById('More-document_ID');
const MoreDocumentcontainer = document.getElementById('More-Document_container');
const MoredocumentIDNEW = document.getElementById('More-document_ID_NEW');
const MoreDocumentcontainerNEW = document.getElementById('More-Document_container_NEW');
const announcementID = document.getElementById('announcement_ID');
const Annoucementscontainer = document.getElementById('Annoucements_container');


clockContainer.addEventListener('click', function (event) {
    event.stopPropagation();
    if (converterTimeContainer.style.display === 'flex') {
        converterTimeContainer.style.display = 'none';
    }
    else {
        converterTimeContainer.style.display = 'flex';
        lichtruccuoituancontainer.style.display = 'none';
        Onboardcontainer.style.display = 'none';
        MoreDocumentcontainer.style.display = 'none';
        MoreDocumentcontainerNEW.style.display = 'none';
        Annoucementscontainer.style.display = 'none';
    }
});


lichtruccalendarID.addEventListener('click', function (event) {
    event.stopPropagation();
    if (lichtruccuoituancontainer.style.display === 'flex') {
        lichtruccuoituancontainer.style.display = 'none';
    } else {
        converterTimeContainer.style.display = 'none';
        lichtruccuoituancontainer.style.display = 'flex';
        Onboardcontainer.style.display = 'none';
        MoreDocumentcontainer.style.display = 'none';
        MoreDocumentcontainerNEW.style.display = 'none';
        Annoucementscontainer.style.display = 'none';
    }
});

OnboardcalendarID.addEventListener('click', function (event) {
    event.stopPropagation();
    if (Onboardcontainer.style.display === 'flex') {
        Onboardcontainer.style.display = 'none';
    } else {
        converterTimeContainer.style.display = 'none';
        lichtruccuoituancontainer.style.display = 'none';
        Onboardcontainer.style.display = 'flex';
        MoreDocumentcontainer.style.display = 'none';
        MoreDocumentcontainerNEW.style.display = 'none';
        Annoucementscontainer.style.display = 'none';
    }
});

MoredocumentID.addEventListener('click', function (event) {
    event.stopPropagation();
    converterTimeContainer.style.display = 'none';
    lichtruccuoituancontainer.style.display = 'none';
    Onboardcontainer.style.display = 'none';
    MoreDocumentcontainer.style.display = 'flex';
    MoreDocumentcontainerNEW.style.display = 'none';
    Annoucementscontainer.style.display = 'none';
});

MoredocumentIDNEW.addEventListener('click', function (event) {
    event.stopPropagation();
    if (MoreDocumentcontainerNEW.style.display === 'flex') {
        MoreDocumentcontainerNEW.style.display = 'none';
    } else {
        converterTimeContainer.style.display = 'none';
        lichtruccuoituancontainer.style.display = 'none';
        Onboardcontainer.style.display = 'none';
        MoreDocumentcontainer.style.display = 'none';
        MoreDocumentcontainerNEW.style.display = 'flex';
        Annoucementscontainer.style.display = 'none';
    }
});

announcementID.addEventListener('click', function (event) {
    event.stopPropagation();
    if (Annoucementscontainer.style.display === 'flex') {
        Annoucementscontainer.style.display = 'none';
    } else {
        converterTimeContainer.style.display = 'none';
        lichtruccuoituancontainer.style.display = 'none';
        Onboardcontainer.style.display = 'none';
        MoreDocumentcontainer.style.display = 'none';
        MoreDocumentcontainerNEW.style.display = 'none';
        Annoucementscontainer.style.display = 'flex';
    }
});








// document.addEventListener('click', function (event) {
//     if (
//         !clockContainer.contains(event.target) &&
//         !converterTimeContainer.contains(event.target) &&
//         !event.target.classList.contains('white-delete-icon')
//     ) {
//         converterTimeContainer.style.display = 'none';
//     }
// });


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".close-in-container").forEach(button => {
        button.addEventListener("click", function () {
            let container = this.closest(".Tools-Container");
            if (container) {
                container.style.display = "none";
            }
        });
    });
});


document.getElementById('close-without-save-button-for-more-document-table_NEW').addEventListener('click', () => {
    // Ẩn container chỉnh sửa
    document.getElementById('More-Document_container_Edit_NEW').style.display = 'none';

    // Reset nội dung các trường
    document.getElementById('status-of-updating-edit-more-documents-container_NEW').textContent = '';
    document.getElementById('id-of-row-more-document').textContent = '';
    document.getElementById('Title-Of-Row-More-Document').innerHTML = '';
    document.getElementById('Tag-Of-Row-More-Document').innerHTML = '';
    document.getElementById('dropdown-for-choose-new-tag').innerHTML = '';
    document.getElementById('Content-Of-Row-More-Document').innerHTML = '';
});

document.getElementById('close-without-save-button-for-more-document-table_NEW_add-new-row').addEventListener('click', () => {
    // Ẩn container chỉnh sửa
    document.getElementById('More-Document_container_Edit_NEW_add-new-row').style.display = 'none';

    // Reset nội dung các trường
    document.getElementById('status-of-updating-edit-more-documents-container_NEW_add-new-row').textContent = '';
    document.getElementById('id-of-row-more-document').textContent = '';
    document.getElementById('Title-Of-Row-More-Document_add-new-row').innerHTML = '';
    document.getElementById('Tag-Of-Row-More-Document_add-new-row').innerHTML = '';
    document.getElementById('dropdown-for-choose-new-tag_add-new-row').innerHTML = '';
    document.getElementById('Content-Of-Row-More-Document_add-new-row').innerHTML = '';
});

// //Máy tính Calculator
// let history = []; // Array to store history

// let appendEnabled = true; // Control flag for append functionality

// function appendToDisplay(value) {
// if (!appendEnabled) return; // Check if appending is enabled

// const display = document.getElementById('input_calculator_ID');
// const lastChar = display.value[display.value.length - 1];

// // Prevent entering multiple operators or multiple decimals in one number
// if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(lastChar)) return;
// if (value === '.' && lastChar === '.') return;

// display.value += value;
// clearError(); // Clear any existing error when typing

// display.scrollLeft = display.scrollWidth;
// }

// function disableAppend() {
// appendEnabled = false; // Disable appending when input is focused
// }

// function enableAppend() {
// appendEnabled = true; // Enable appending when input is blurred
// }

// function clearDisplay() {
// document.getElementById('input_calculator_ID').value = ''; // Clears all input
// clearError(); // Clear any existing error
// }

// function clearError() {
// document.getElementById('error-message').innerText = 'ㅤ'; // Clear error message
// }

// function showError(message) {
// const errorMessage = document.getElementById('error-message');
// errorMessage.innerText = message; // Set the error message
// }

// function calculate() {
// const display = document.getElementById('input_calculator_ID');
// const expression = display.value;

// // Check for division by zero
// if (expression.includes('/0')) {
//     showError('Cannot divide by zero');
//     return;
// }

// try {
//     const result = eval(expression);
//     display.value = result;
//     clearError(); // Clear error if calculation is successful

//     // Add to history
//     addToHistory(`${expression} = ${result}`);
// } catch {
//     showError('Please recheck your math'); // Show error if calculation fails
// }
// }

// function addToHistory(entry) {
// history.unshift(entry); // Add entry to the start of the history array
// updateHistoryDisplay(); // Update the history display
// }

// function updateHistoryDisplay() {
// const historyContainer = document.getElementById('history-of-calculator');
// historyContainer.innerHTML = history.map(item => `<div>${item}</div>`).join(''); // Display history
// historyContainer.scrollTop = 0; // Scroll to the top
// }

// function backspace() {
// const display = document.getElementById('input_calculator_ID');
// display.value = display.value.slice(0, -1); // Remove last character
// clearError(); // Clear error when editing
// }

// document.getElementById('calculator').addEventListener('keydown', function(event) {
//     const key = event.key;

//     if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
//         appendToDisplay(key);
//     } else if (key === 'Enter') {
//         event.preventDefault(); // Prevent form submission
//         calculate(); // Call calculate on Enter
//     } else if (key === 'Backspace') {
//         backspace(); // Call backspace function
//     } else if (key === 'Escape') {
//         clearDisplay(); // Clear all input
//     }
// });





//function cho phần tìm kiếm khách hàng
function handleKey(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("findButton").click();
    }

    if (event.key === "Escape") {
        event.preventDefault();
        document.getElementById("resetButton").click();
    }
}

//function cho lọc số phone phần tìm kiếm khách hàng
document.getElementById("PhonetextInput").addEventListener("input", function () {
    let phoneValue = this.value.replace(/[^0-9]/g, '');
    if (phoneValue.length > 12) {
        phoneValue = phoneValue.substring(0, 12) + "...";
    }
    document.getElementById("PhonetextOutput").textContent = phoneValue;
});

//function reset lại zip code, phone ở phần tìm kiếm khách hàng
document.getElementById("resetButton").addEventListener("click", function () {
    document.getElementById("ZiptextInput").value = "";
    document.getElementById("PhonetextInput").value = "";
    document.getElementById("ZipnumericOutput").textContent = "";
    document.getElementById("PhonetextOutput").textContent = "";
});

//function cho phần tìm kiếm khách hàng
document.getElementById("findButton").addEventListener("click", function (event) {
    event.preventDefault(); // Ngừng gửi form theo mặc định

    const zipCode = document.getElementById("ZipnumericOutput").innerText;
    const phone = document.getElementById("PhonetextOutput").innerText;

    // Construct the base URL
    const baseUrl = "https://crm.fastboy.dev/clients/company?page=1&itemsPerPage=20&order%5BwhmcsId%5D=desc";

    // Tạo URL cho ZipnumericOutput
    const urlParams = `postal_name=${zipCode}`;

    // Kiểm tra trường hợp và mở các website tương ứng
    if (zipCode && phone) {
        // Nếu có cả ZipnumericOutput và PhonetextOutput
        window.open(baseUrl + "&" + urlParams, "_blank");
        window.open(baseUrl + "&contact_phone=" + phone, "_blank");
        window.open(baseUrl + "&business_phone=" + phone, "_blank");
    } else if (zipCode) {
        // Nếu chỉ có ZipnumericOutput
        window.open(baseUrl + "&" + urlParams, "_blank");
    } else if (phone) {
        // Nếu chỉ có PhonetextOutput
        window.open(baseUrl + "&contact_phone=" + phone, "_blank");
        window.open(baseUrl + "&business_phone=" + phone, "_blank");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("lock-combo-activate");

    // Load saved state from localStorage
    const savedState = localStorage.getItem("lock-combo-activate");
    if (savedState !== null) {
        checkbox.checked = savedState === "true"; // Convert string back to boolean
    }

    // Save state to localStorage on change
    checkbox.addEventListener("change", function () {
        localStorage.setItem("lock-combo-activate", checkbox.checked);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("lock-combo-activate-dashboard2");

    // Load saved state from localStorage
    const savedState = localStorage.getItem("lock-combo-activate-dashboard2");
    if (savedState !== null) {
        checkbox.checked = savedState === "true"; // Convert string back to boolean
    }

    // Save state to localStorage on change
    checkbox.addEventListener("change", function () {
        localStorage.setItem("lock-combo-activate-dashboard2", checkbox.checked);
    });
});

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

function FindStoreID() {
    var FindStoreIDA = document.getElementById("URLDashboardInput").value;
    var FindStoreIDB = FindStoreIDA.replace("https://insight2020.gci.fast-boy.net/gci/tenant-server/redirect?url=https%3A%2F%2Fapps.gocheckin.net%2Fpages%2Flogin%3Fid%3D", "");
    var FindStoreIDC = "%26token";
    var FindStoreIDD = FindStoreIDB.indexOf(FindStoreIDC);
    var FindStoreIDE = FindStoreIDB.substring(FindStoreIDD);
    var FindStoreIDF = FindStoreIDB.replace(FindStoreIDE, ""); /* Store ID của tiệm */
    document.getElementById("URLDashboardOutput").innerHTML = FindStoreIDF;
    var FindStoreIDG = FindStoreIDE.replace("%26token%3", "token%3").replace("insight_id%3D136", ""); /* Token lấy từ Dashboard 2.0 */
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
    const Pageafterlogin = document.getElementById('Page_after_login');
    Pageafterlogin.style.display = 'flex';
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

        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
            statusContainer.innerHTML = "";
            statusContainer.style.backgroundColor = '';
            statusContainer.style.color = '';
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





document.getElementById("Add-new-row-into-More-Document-NEW").addEventListener("click", function () {
    const container = document.getElementById("More-Document_container_Edit_NEW_add-new-row");
    container.style.display = "flex";
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