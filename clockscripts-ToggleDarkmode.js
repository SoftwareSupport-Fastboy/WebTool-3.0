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
            document.getElementById("chech-lech-gio").innerHTML  = `${differenceInHours} giờ, nghĩa là Giờ Tiệm <span style="color:red">TRỄ</span> hơn Giờ Texas ${Math.abs(differenceInHours)} giờ`;
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

