// function gọi sau khi login thành công
let runFunctionsIntervalID; // Biến lưu ID của setInterval

function RunFunctionsAfterLogin() {
    console.log("manageFunctions đang chạy...");

    // Gọi các function con bạn muốn tại đây
    loadMyToDoList();
    
}

// function ngừng các function khác
function StopRunFunctionsAfterLogin() {
    console.log("RunFunctionsAfterLogin đã dừng.");
    const noteContainer = document.getElementById('my-To-do-list-personal-fetch-container');
    noteContainer.textContent = '';
}
    


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

// Form submission to add data
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


// Đăng nhập Login
document.getElementById('checkForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Ẩn thông điệp lỗi
    document.getElementById('checkResponseMessage').textContent = '';

    // Hiển thị loader khi đang xử lý
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
        const result = await response.text();

        if (result === 'Valid information') {
            if (rememberLogin) {
                // Lưu thông tin vào localStorage nếu chọn "Remember me"
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userText', text);
            } else {
                // Xóa thông tin nếu không chọn "Remember me"
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userText');
            }

            // Hiển thị phần ghi chú sau khi đăng nhập thành công
            document.getElementById('checkFormContainer').style.display = 'none';
            document.getElementById('Page_after_login').style.display = 'flex';
            // chạy function tổng
            RunFunctionsAfterLogin();
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
    const loaderifrememberlogin = document.getElementById('loader-if-remember-login');
    loaderifrememberlogin.classList.remove('hidden_visibility');

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
            const result = await response.text();


            if (result === 'Valid information') {
                // Cho phép truy cập nếu thông tin khớp
                document.getElementById('checkFormContainer').style.display = 'none';
                document.getElementById('submitFormContainer').style.display = 'none';
                document.getElementById('Page_after_login').style.display = 'flex';
                document.getElementById('loader-if-remember-login').classList.add('hidden_visibility');
                // chạy function tổng
                RunFunctionsAfterLogin();
            } else {
                // Xóa Local Storage nếu thông tin không khớp
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userText');
                document.getElementById('checkResponseMessage').textContent = 'Your account do not match';
                document.getElementById('loader-if-remember-login').classList.add('hidden_visibility');
                document.getElementById('checkFormContainer').style.display = 'block';
                document.getElementById('submitFormContainer').style.display = 'none';
                document.getElementById('Page_after_login').style.display = 'none';
                // ngừng chạy function tổng
                StopRunFunctionsAfterLogin();
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('checkResponseMessage').textContent = 'Error: ' + error.message;
        }
    } else {
        // Buộc người dùng login nếu không có thông tin trong Local Storage
        document.getElementById('checkFormContainer').style.display = 'block';
        document.getElementById('submitFormContainer').style.display = 'none';
        document.getElementById('Page_after_login').style.display = 'none';
        loaderifrememberlogin.classList.add('hidden_visibility');
        // ngừng chạy function tổng
        StopRunFunctionsAfterLogin();
    }
});

// Xử lý logout
document.getElementById('logoutButton').addEventListener('click', function () {
    // ngừng chạy function tổng
    setTimeout(function() {
        StopRunFunctionsAfterLogin();
    }, 3000);
    // Xóa thông tin Local Storage và quay về trang login
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userText');
    document.getElementById('Page_after_login').style.display = 'none';
    document.getElementById('checkFormContainer').style.display = 'block';
    document.getElementById('submitFormContainer').style.display = 'none';
    document.getElementById('checkEmail').value = '';
    document.getElementById('checkText').value = '';
    document.getElementById('checkResponseMessage').textContent = '';
    document.getElementById('responseMessage').textContent = '';
    document.getElementById('loader-if-remember-login').classList.add('hidden_visibility');
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach(function(c) {
       document.cookie = c.trim().split("=")[0] + "=;expires=" + new Date().toUTCString() + ";path=/";
    });
});

// Function to switch to check form
function switchTosubmitForm() {
    const submitFormContainer = document.getElementById('submitFormContainer');
    const checkFormContainer = document.getElementById('checkFormContainer');


    if (submitFormContainer.style.display === 'none') {
        submitFormContainer.style.display = 'block';
        checkFormContainer.style.display = 'none';
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


    if (submitFormContainer.style.display === 'block') {
        submitFormContainer.style.display = 'none';
        checkFormContainer.style.display = 'block';
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

// Function to create a new To-Do-List line div with contentEditable and a delete button
function createToDoLine(line, index) {
    const noteContainer = document.getElementById('my-To-do-list-personal-fetch-container');
    const nguyennhanchanedit = document.getElementById('nguyen-nhan-chan-edit');
    
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
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.title = "Check là xong, Uncheck là chưa xong";
    checkbox.classList.add('To-do-list_checkbox');
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
    span.style.width = '430px';

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

        const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Hủy tương tác tất cả checkbox
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

        const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Nhận tương tác tất cả checkbox
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

        const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Hủy tương tác tất cả checkbox
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
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault(); // Ngăn hành động mặc định của Shift + Enter  
            divGroup.classList.remove('To-Do-Chinh-Sua'); // Loại bỏ lớp chỉ thị đang chỉnh sửa  

            const spans = noteContainer.querySelectorAll('span');  // nhận tương tác tất cả span
            spans.forEach(sp => {
                if (sp !== span) { // Ngoại trừ span đang chỉnh sửa
                    sp.style.pointerEvents = 'all';
                    sp.setAttribute('contenteditable', 'true');
                }
            });

            const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Nhận tương tác tất cả checkbox
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

            const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Nhận tương tác tất cả checkbox
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

            delete span.dataset.originalText; // Xóa thông tin lưu trữ ban đầu trong dataset  
        }
    });
    

    const saveButton = document.createElement('div');
    saveButton.classList.add('white-edit-icon');
    saveButton.title = "Lưu chỉnh sửa (Shift + Enter)";
    saveButton.onclick = () => {
        divGroup.classList.remove('To-Do-Chinh-Sua'); // Xóa lớp chỉ báo đang chỉnh sửa  

        const spans = noteContainer.querySelectorAll('span');  // nhận tương tác tất cả span
        spans.forEach(sp => {
            if (sp !== span) { // Ngoại trừ span đang chỉnh sửa
                sp.style.pointerEvents = 'all';
                sp.setAttribute('contenteditable', 'true');
            }
        });

        const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Nhận tương tác tất cả checkbox
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
    b4smalldiv.appendChild(checkbox);

    const reminderbuttoncontainer = document.createElement('div');
    reminderbuttoncontainer.classList.add('reminder-button-container');
    const Todoremindername = document.createElement('div');
    Todoremindername.textContent = 'Reminder To-Do';

    const inputdateremindertodo = document.createElement('input');
    inputdateremindertodo.classList.add('inputdateremindertodo');
    inputdateremindertodo.type = 'date';
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

        const checkboxes = noteContainer.querySelectorAll('.To-do-list_checkbox');  // Hủy tương tác tất cả checkbox
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








// Hàm chuyển đổi ngày từ yyyy-mm-dd sang dd/mm/yyyy
function formatDateToDDMMYYYY(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
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




// Function to handle the Save button click event
document.getElementById('save-button').addEventListener('click', function() {
    const noteContent = document.getElementById('Add-To-do-list-content').textContent.trim(); // Get the content from the input field

    if (noteContent) {
        // Call createToDoLine to add the new To-Do-List to the container
        createToDoLine(noteContent, document.getElementById('my-To-do-list-personal-fetch-container').childElementCount);

        // Clear the input field after saving
        document.getElementById('Add-To-do-list-content').textContent  = '';
        saveMyToDoList();
        saveMyToDoList();
        saveMyToDoList();
        saveMyToDoList();
    } else {
        console.log('No text to save');
    }
});

//Shift + Enter trong Add-To-do-list-content sẽ kích hoạt Savemytodolist
document.getElementById('Add-To-do-list-content').addEventListener('keydown', function(e) {
    // Kiểm tra nếu người dùng bấm Shift + Enter
    if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault(); // Ngăn hành động mặc định của Enter
        const noteContent = e.target.textContent.trim();

        if (noteContent) {
            createToDoLine(noteContent, document.getElementById('my-To-do-list-personal-fetch-container').childElementCount);
            document.getElementById('Add-To-do-list-content').textContent = ''; // Clear input field
            saveMyToDoList();
        } else {
            console.log('No text to save');
        }
    }
});







// Sửa lại giá trị của ô A1 trong Sheet "Lich Truc (copy)"
document.getElementById('updateA1Btn').addEventListener('click', function() {
    // Lấy giá trị từ các input
    var sheetName = document.getElementById('sua-ten-sheet').value;
    var cellReference = document.getElementById('sua-o-dau-tien-trong-sheet').value;
    var lastcellReference = document.getElementById('sua-o-cuoi-cung-trong-sheet').value;
    var statusContainer = document.getElementById('status-of-updating-lichtruc-container');
    var loaderupdatelichtruc = document.getElementById('loader-update-lichtruc');
    var updateidlichtruc = document.getElementById('update-id-lichtruc');
    
    // Xóa thông báo cũ
    statusContainer.innerHTML = '';
    statusContainer.style.display = 'none'; // Ẩn thông báo lúc ban đầu

    if (!sheetName || !cellReference || !lastcellReference) {
        statusContainer.innerHTML = "Vui lòng nhập<br>đầy đủ thông tin.";
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
        setTimeout(function() {
            statusContainer.style.display = 'none';
        }, 3000); // Ẩn sau 3 giây
    }
});



// Hiển thị Lịch trực cuối tuần
fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    action: 'getLichTrucCopy' // Action để lấy dữ liệu từ sheet "Lich Truc (copy)"
  })
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
          table += '<th><div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 10px"><div class="white-delete-icon"></div><span>' + data[0][i] + '</span></div></th>';
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
document.getElementById('Show-all-in-lichtruc-container').addEventListener('click', function() {
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
    statusContainer.style.display = 'flex';
    statusContainer.style.backgroundColor = 'green';
    statusContainer.style.color = 'white';
    setTimeout(function() {
        statusContainer.style.display = 'none';
    }, 3000);
  });



// Nút refresh
function refreshLichTruc() {
    const loader = document.getElementById('loader-refresh-lichtruc');
    const targetView = document.getElementById('lich-truc-cuoi-tuan-view');
    const statusContainer = document.getElementById('status-of-updating-lichtruc-container');
    const refreshidlichtruc = document.getElementById('refresh-id-lichtruc');
    
    // Hiện loader
    loader.classList.remove('hidden');
    refreshidlichtruc.classList.add('hidden');
  
    // Gọi fetch dữ liệu từ Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        action: 'getLichTrucCopy'
      })
    })
      .then(response => response.json())
      .then(data => {
        // Tạo bảng từ dữ liệu
        let table = '<table border="1" cellpadding="5" cellspacing="0">';
        
        table += '<thead style="z-index:10;"><tr>';
        if (data.length > 0) {
          for (let i = 0; i < data[0].length; i++) {
            if (i === 0) {
              table += `<th>${data[0][i]}</th>`;
            } else {
              table += `<th><div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 10px"><div class="white-delete-icon"></div><span>${data[0][i]}</span></div></th>`;
            }
          }
          table += '</tr></thead>';
        }
  
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
        console.error('Error:', error);
        targetView.innerHTML = 'Lỗi khi tải dữ liệu.';
      })
      .finally(() => {
        // Ẩn loader sau khi hoàn thành
        loader.classList.add('hidden');
        refreshidlichtruc.classList.remove('hidden');
  
        // Hiện thông báo cập nhật thành công
        statusContainer.innerHTML = "Đã cập nhật xong";
        statusContainer.style.display = 'flex';
        statusContainer.style.backgroundColor = 'green';
        statusContainer.style.color = 'white';
  
        // Tự động ẩn thông báo sau 3 giây
        setTimeout(function() {
          statusContainer.style.display = 'none';
        }, 3000);
      });
  }
  