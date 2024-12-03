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

    const houstonDate = new Date(houstonTime);
    const hcmDate = new Date(hcmTime);

    function formatDate(date, style) {
        const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const daysVietnamese = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        if (style === "houston") {
            return `${daysShort[date.getDay()]}, ${day}-${month}-${year}`;
        } else if (style === "hcm") {
            return `${daysVietnamese[date.getDay()]}, ${day}-${month}-${year}`;
        }
    }

    const houston12Hour = convertTo12HourFormat(houstonDate.getHours(), houstonDate.getMinutes(), houstonDate.getSeconds());
    document.getElementById("houstonDay").textContent = formatDate(houstonDate, "houston");
    document.getElementById("houstonClock").textContent = houstonDate.toLocaleTimeString();
    document.getElementById("Now-time-in-TX").textContent = houston12Hour;

    document.getElementById("hcmDay").textContent = formatDate(hcmDate, "hcm");
    document.getElementById("hcmClock").textContent = hcmDate.toLocaleTimeString();
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




// hiện ẩn box
const clockContainer = document.getElementById('clock-button-converter');
const converterTimeContainer = document.querySelector('.Converter_time_container');
const MyToDoList = document.getElementById('My_To-Do-List_ID');
const MyToDoListcontainer = document.querySelector('.My_To-Do-List_container');
const SunMoonIcon = document.getElementById('Sun-Moon_icon_ID');
const toggledarklightmodecontainer = document.querySelector('.toggle-darkmode-lightmode');


clockContainer.addEventListener('click', function(event) {
    event.stopPropagation();
    converterTimeContainer.style.display = 'flex';
    MyToDoListcontainer.style.display = 'none';
    toggledarklightmodecontainer.style.display = 'none';
});

MyToDoList.addEventListener('click', function(event) {
    event.stopPropagation();
    converterTimeContainer.style.display = 'none';
    MyToDoListcontainer.style.display = 'inline';
    toggledarklightmodecontainer.style.display = 'none';
});

SunMoonIcon.addEventListener('click', function(event) {
    event.stopPropagation();
    converterTimeContainer.style.display = 'none';
    MyToDoListcontainer.style.display = 'none';
    toggledarklightmodecontainer.style.display = 'flex';
});


document.addEventListener('click', function(event) {
    if (
        !clockContainer.contains(event.target) &&
        !converterTimeContainer.contains(event.target) &&
        !MyToDoList.contains(event.target) &&
        !MyToDoListcontainer.contains(event.target) &&
        !SunMoonIcon.contains(event.target) &&
        !toggledarklightmodecontainer.contains(event.target) &&
        !event.target.classList.contains('white-delete-icon') // Không ẩn khi nhấn vào white-delete-icon
    ) {
        converterTimeContainer.style.display = 'none';
        MyToDoListcontainer.style.display = 'none';
        toggledarklightmodecontainer.style.display = 'none';
    }
});









// Chuyển qua lại dark mode và light mode
const themeSwitchCheckbox = document.querySelector('.theme-switch__checkbox');
const sunMoonIcon = document.getElementById('Sun-Moon_icon_ID');

// Kiểm tra và thiết lập trạng thái ban đầu
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    themeSwitchCheckbox.checked = true;
    sunMoonIcon.className = 'moon-and-shadow-icon';
} else {
    sunMoonIcon.className = 'sun-and-glow-icon';
}

// Lắng nghe sự kiện thay đổi chế độ sáng/tối
themeSwitchCheckbox.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        sunMoonIcon.className = 'moon-and-shadow-icon';
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        sunMoonIcon.className = 'sun-and-glow-icon';
    }
});



document.querySelector('.right-tools-container').addEventListener('mouseover', function () {
    const clocks = document.querySelector('.clocks');
    if (clocks) {
        clocks.style.marginRight = '80px';
    }
});

document.querySelector('.right-tools-container').addEventListener('mouseout', function () {
    const clocks = document.querySelector('.clocks');
    if (clocks) {
        clocks.style.marginRight = ''; // Reset margin-right to default
    }
});
