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
    // Automatically call the function whenever inputs change
    document.getElementById("Now-hour-time-in-store").addEventListener("input", calculateAppointmentTime);
    document.getElementById("store-am-pm").addEventListener("change", calculateAppointmentTime);
    document.getElementById("hour-time-they-choose").addEventListener("input", calculateAppointmentTime);
    document.getElementById("customer-am-pm").addEventListener("change", calculateAppointmentTime);
});

function calculateAppointmentTime() {
    // Step 1: Extract values from the inputs
    let storeHour = parseInt(document.getElementById("Now-hour-time-in-store").value);
    let storeAmPm = document.getElementById("store-am-pm").value;

    let customerHour = parseInt(document.getElementById("hour-time-they-choose").value);
    let customerAmPm = document.getElementById("customer-am-pm").value;

    // Step 2: Convert store time to 24-hour format (ignore minutes)
    if (storeAmPm === "PM" && storeHour !== 12) {
        storeHour += 12;
    } else if (storeAmPm === "AM" && storeHour === 12) {
        storeHour = 0;
    }

    // Convert customer time to 24-hour format (ignore minutes)
    if (customerAmPm === "PM" && customerHour !== 12) {
        customerHour += 12;
    } else if (customerAmPm === "AM" && customerHour === 12) {
        customerHour = 0;
    }

    // Step 3: Get the current Texas time from the page (in 12-hour format)
    let texasTime = document.getElementById("Now-time-in-TX").innerText;
    let texasAmPm = texasTime.split(" ")[1]; // AM or PM
    let texasHour = parseInt(texasTime.split(":")[0]);

    // Convert Texas time from 12-hour to 24-hour format (ignore minutes)
    if (texasAmPm === "PM" && texasHour !== 12) {
        texasHour += 12;
    } else if (texasAmPm === "AM" && texasHour === 12) {
        texasHour = 0;
    }

    // Step 4: Calculate the difference between store time and Texas time
    let storeTimeInHours = storeHour;
    let texasTimeInHours = texasHour;

    // Calculate the difference, ensuring the time difference is positive
    let timeDifference = texasTimeInHours - storeTimeInHours;

    if (timeDifference < 0) {
        // If the time difference is negative (i.e., Texas time is earlier), adjust by adding 24 hours
        timeDifference += 24;
    }

    // Step 5: Adjust customer's time based on the time difference
    let adjustedCustomerTimeInTexas = (customerHour + timeDifference) % 24;

    // Convert adjusted time back to 12-hour format
    let adjustedCustomerAmPm = adjustedCustomerTimeInTexas >= 12 ? "PM" : "AM";
    if (adjustedCustomerTimeInTexas > 12) {
        adjustedCustomerTimeInTexas -= 12;
    } else if (adjustedCustomerTimeInTexas === 0) {
        adjustedCustomerTimeInTexas = 12;
    }

    // Step 6: Display the appointment time in Texas time
    document.getElementById("time-right-appointments-in-TX").innerText = `${adjustedCustomerTimeInTexas} ${adjustedCustomerAmPm}`;
}




//Đóng tất cả các header-container
document.addEventListener('click', function(event) {
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

