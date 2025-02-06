// hiện ẩn box
const clockContainer = document.getElementById('clock-button-converter');
const converterTimeContainer = document.querySelector('.Converter_time_container');
const calculatorID = document.getElementById('calculator_ID');
const calculatorcontainer = document.querySelector('.calculator_container');
const lichtruccalendarID = document.getElementById('lichtruc-calendar_ID');
const lichtruccuoituancontainer = document.querySelector('.lichtruccuoituan_container');
const OnboardcalendarID = document.getElementById('Onboard-calendar_ID');
const Onboardcontainer = document.querySelector('.Onboard_container');
const MoredocumentID = document.getElementById('More-document_ID');
const MoreDocumentcontainer = document.querySelector('.More-Document_container');
const announcementID = document.getElementById('announcement_ID');
const Annoucementscontainer = document.querySelector('.Annoucements_container');




clockContainer.addEventListener('click', function(event) {
    event.stopPropagation();
    converterTimeContainer.style.display = 'flex';
    calculatorcontainer.style.display = 'none';
    lichtruccuoituancontainer.style.display = 'none';
    Onboardcontainer.style.display = 'none';
    MoreDocumentcontainer.style.display = 'none';
    Annoucementscontainer.style.display = 'none';
});

calculatorID.addEventListener('click', function(event) {
    event.stopPropagation();
    converterTimeContainer.style.display = 'none';
    calculatorcontainer.style.display = 'flex';
    lichtruccuoituancontainer.style.display = 'none';
    Onboardcontainer.style.display = 'none';
    MoreDocumentcontainer.style.display = 'none';
    Annoucementscontainer.style.display = 'none';
});

lichtruccalendarID.addEventListener('click', function(event) {
    event.stopPropagation();
    converterTimeContainer.style.display = 'none';
    calculatorcontainer.style.display = 'none';
    lichtruccuoituancontainer.style.display = 'flex';
    Onboardcontainer.style.display = 'none';
    MoreDocumentcontainer.style.display = 'none';
    Annoucementscontainer.style.display = 'none';
});

OnboardcalendarID.addEventListener('click', function(event) {
    event.stopPropagation();
    converterTimeContainer.style.display = 'none';
    calculatorcontainer.style.display = 'none';
    lichtruccuoituancontainer.style.display = 'none';
    Onboardcontainer.style.display = 'flex';
    MoreDocumentcontainer.style.display = 'none';
    Annoucementscontainer.style.display = 'none';
});

MoredocumentID.addEventListener('click', function(event) {
    event.stopPropagation();
    converterTimeContainer.style.display = 'none';
    calculatorcontainer.style.display = 'none';
    lichtruccuoituancontainer.style.display = 'none';
    Onboardcontainer.style.display = 'none';
    MoreDocumentcontainer.style.display = 'flex';
    Annoucementscontainer.style.display = 'none';
});

announcementID.addEventListener('click', function(event) {
    event.stopPropagation();
    converterTimeContainer.style.display = 'none';
    calculatorcontainer.style.display = 'none';
    lichtruccuoituancontainer.style.display = 'none';
    Onboardcontainer.style.display = 'none';
    MoreDocumentcontainer.style.display = 'none';
    Annoucementscontainer.style.display = 'flex';
});



document.addEventListener('click', function(event) {
    if (
        !clockContainer.contains(event.target) &&
        !converterTimeContainer.contains(event.target) &&
        !event.target.classList.contains('white-delete-icon') && // Không ẩn khi nhấn vào white-delete-icon
        !calculatorID.contains(event.target) &&
        !calculatorcontainer.contains(event.target) &&
        !lichtruccalendarID.contains(event.target) &&
        !lichtruccuoituancontainer.contains(event.target) &&
        !OnboardcalendarID.contains(event.target) &&
        !Onboardcontainer.contains(event.target) &&
        !MoredocumentID.contains(event.target) &&
        !MoreDocumentcontainer.contains(event.target) &&
        !announcementID.contains(event.target) &&
        !Annoucementscontainer.contains(event.target)
    ) {
        converterTimeContainer.style.display = 'none';
        calculatorcontainer.style.display = 'none';
        lichtruccuoituancontainer.style.display = 'none';
        Onboardcontainer.style.display = 'none';
        MoreDocumentcontainer.style.display = 'none';
        Annoucementscontainer.style.display = 'none';
    }
});







//Máy tính Calculator
let history = []; // Array to store history

let appendEnabled = true; // Control flag for append functionality

function appendToDisplay(value) {
if (!appendEnabled) return; // Check if appending is enabled

const display = document.getElementById('input_calculator_ID');
const lastChar = display.value[display.value.length - 1];

// Prevent entering multiple operators or multiple decimals in one number
if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(lastChar)) return;
if (value === '.' && lastChar === '.') return;

display.value += value;
clearError(); // Clear any existing error when typing

display.scrollLeft = display.scrollWidth;
}

function disableAppend() {
appendEnabled = false; // Disable appending when input is focused
}

function enableAppend() {
appendEnabled = true; // Enable appending when input is blurred
}

function clearDisplay() {
document.getElementById('input_calculator_ID').value = ''; // Clears all input
clearError(); // Clear any existing error
}

function clearError() {
document.getElementById('error-message').innerText = 'ㅤ'; // Clear error message
}

function showError(message) {
const errorMessage = document.getElementById('error-message');
errorMessage.innerText = message; // Set the error message
}

function calculate() {
const display = document.getElementById('input_calculator_ID');
const expression = display.value;

// Check for division by zero
if (expression.includes('/0')) {
    showError('Cannot divide by zero');
    return;
}

try {
    const result = eval(expression);
    display.value = result;
    clearError(); // Clear error if calculation is successful

    // Add to history
    addToHistory(`${expression} = ${result}`);
} catch {
    showError('Please recheck your math'); // Show error if calculation fails
}
}

function addToHistory(entry) {
history.unshift(entry); // Add entry to the start of the history array
updateHistoryDisplay(); // Update the history display
}

function updateHistoryDisplay() {
const historyContainer = document.getElementById('history-of-calculator');
historyContainer.innerHTML = history.map(item => `<div>${item}</div>`).join(''); // Display history
historyContainer.scrollTop = 0; // Scroll to the top
}

function backspace() {
const display = document.getElementById('input_calculator_ID');
display.value = display.value.slice(0, -1); // Remove last character
clearError(); // Clear error when editing
}

document.getElementById('calculator').addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        calculate(); // Call calculate on Enter
    } else if (key === 'Backspace') {
        backspace(); // Call backspace function
    } else if (key === 'Escape') {
        clearDisplay(); // Clear all input
    }
});





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
    const checkboxes = document.querySelectorAll('.input-checkbox-Open-button');
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
    checkboxes.forEach((checkbox, index) => {
        const link = checkbox.previousElementSibling; // Get the <a> corresponding to the checkbox
        const linkUrl = link.href;

        if (checkbox.checked) {
            // Get custom values from the span
            const customValues = document.getElementById('id-of-check-id-information')?.textContent.split(',');

            if (customValues && customValues.length > 0) {
                customValues.forEach(customValue => {
                    customValue = customValue.trim();
                    const modifiedLinkUrl = linkUrl.replace('*****', customValue);
                    console.log("Modified Link URL:", modifiedLinkUrl);

                    // Open the modified link in a new tab
                    window.open(modifiedLinkUrl, '_blank');
                });
            } else {
                console.log("No custom values found in span.");
                alert("Please enter valid values in the input field.");
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




document.getElementById('search-in-more-document-table').addEventListener('input', function() {
    searchContent('moreDocuments');
});

document.getElementById('search-in-Annoucements-table').addEventListener('input', function() {
    searchContent('announcements');
});

var debounceTimeout;

function searchContent(contentType) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(function() {
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
                var firstLetters = txtValue.split(' ').map(function(word) {
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
document.addEventListener('click', function(event) {
    if (event.target.id === 'button-guest-login') {
        const Pageafterlogin = document.getElementById('Page_after_login');
        Pageafterlogin.style.display = 'flex';
        const b4Todolistcontent = document.getElementById('b4-To-do-list-content');
        const ChatGPTClass = document.getElementById('ChatGPTClass');
        b4Todolistcontent.style.display = 'none';
        ChatGPTClass.style.display = 'none';
        const edituserinfomation = document.getElementById('edit-user-infomation');
        edituserinfomation.style.display = 'none';
        const saveuserinfomation = document.getElementById('save-user-infomation');
        saveuserinfomation.style.display = 'none';
        const canceluserinfomation = document.getElementById('cancel-user-infomation');
        canceluserinfomation.style.display = 'none';
        document.getElementById('container-input-edit-new-nickname').style.display = 'none';
        document.getElementById('container-input-edit-new-password').style.display = 'none';
       
    }
});