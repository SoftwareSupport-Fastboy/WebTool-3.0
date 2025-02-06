// function gọi sau khi login thành công
let runFunctionsIntervalID; // Biến lưu ID của setInterval

function RunFunctionsAfterLogin() {
    console.log("manageFunctions đang chạy...");

    // Gọi các function con bạn muốn tại đây
    loadMyToDoList();
    checkRoleAndDisplay();
    loadMySMS();
    const AdddivWrapper = document.getElementById('AdddivWrapper');
    AdddivWrapper.style.display = 'flex';
}




// function ngừng các function khác
function StopRunFunctionsAfterLogin() {
    console.log("RunFunctionsAfterLogin đã dừng.");
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

            document.getElementById('checkFormContainer').style.display = 'none';
            document.getElementById('Page_after_login').style.display = 'flex';
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
            const result = await response.json(); // Lấy kết quả dưới dạng JSON

            if (result.status === 'Valid information') {
                // Cho phép truy cập nếu thông tin khớp
                document.getElementById('checkFormContainer').style.display = 'none';
                document.getElementById('submitFormContainer').style.display = 'none';
                document.getElementById('Page_after_login').style.display = 'flex';
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
            } else {
                // Xóa Local Storage nếu thông tin không khớp
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userText');
                document.getElementById('checkResponseMessage').textContent = 'Your account do not match';
                loaderifrememberlogin.classList.add('hidden_visibility');
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
    document.getElementById('Page_after_login').style.display = 'none';
    document.getElementById('checkFormContainer').style.display = 'block';
    document.getElementById('submitFormContainer').style.display = 'none';
    document.getElementById('right-tools-container').style.display = 'none';
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
    document.getElementById('loader-if-remember-login').classList.add('hidden_visibility');
    document.getElementById('click-to-Web-Tools-Google-Sheets').style.display = 'none';
    document.getElementById('b4-To-do-list-content').style.display = 'flex';
    document.getElementById('ChatGPTClass').style.display = 'flex';
    document.getElementById('container-input-edit-new-nickname').style.display = 'none';
    document.getElementById('container-input-edit-new-password').style.display = 'none';
    document.getElementById('edit-user-infomation').style.display = 'flex';
    document.getElementById('save-user-infomation').style.display = 'none';
    document.getElementById('cancel-user-infomation').style.display = 'none';
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
        b4Todolistcontent.style.display = 'none';
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
        b4Todolistcontent.style.display = 'flex';
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
        b4Todolistcontent.style.display = 'none';
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
            b4Todolistcontent.style.display = 'flex';

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
            b4Todolistcontent.style.display = 'flex';

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
        b4Todolistcontent.style.display = 'flex';

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
                b4Todolistcontent.style.display = 'flex';
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
                b4Todolistcontent.style.display = 'flex';
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
        b4Todolistcontent.style.display = 'flex';
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
    const ChatGPTClass = document.getElementById('ChatGPTClass');
    const righttoolscontainer = document.getElementById('right-tools-container');
    const clicktoWebToolsGoogleSheets = document.getElementById('click-to-Web-Tools-Google-Sheets');

    // Kiểm tra giá trị của displayRole và thay đổi display cho các phần tử
    if (role === 'Admin') {
        ChatGPTClass.style.display = 'flex';
        righttoolscontainer.style.display = 'block';
        clicktoWebToolsGoogleSheets.style.display = 'flex';

    } else if (role === 'Manager') {
        ChatGPTClass.style.display = 'none';
        righttoolscontainer.style.display = 'none';
        clicktoWebToolsGoogleSheets.style.display = 'none';

    } else if (role === 'User') {
        ChatGPTClass.style.display = 'none';
        righttoolscontainer.style.display = 'none';
        clicktoWebToolsGoogleSheets.style.display = 'none';


    } else {
        ChatGPTClass.style.display = 'none';
        righttoolscontainer.style.display = 'none';
        clicktoWebToolsGoogleSheets.style.display = 'none';


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



// function createSMSLine(SMSList) {
//     const noteContainer = document.getElementById('fetchSMSFromPersonal');
//     const BoxEditPersonalSMSFromFetch = document.getElementById('BoxEditPersonalSMSFromFetch');
//     const BoxEditPersonalSMS = document.getElementById('BoxEditPersonalSMS');
//     const AdddivWrapper = document.getElementById('AdddivWrapper');

//     noteContainer.innerHTML = ''; // Clear previous content

//     // Lặp qua danh sách SMS để tạo các phần tử
//     SMSList.forEach(SMS => {
//         const divWrapper = document.createElement('div');
//         divWrapper.className = 'columnC';

//         // Kiểm tra nếu SMS có nội dung trước và sau {-}
//         const [divContent, spanContent] = SMS.split('{-}').map((part) => part.trim());

//         if (divContent) {
//             const divElement = document.createElement('div');
//             divElement.textContent = divContent;
//             divWrapper.appendChild(divElement);
//         }

//         if (spanContent) {
//             const spanElement = document.createElement('span');
//             spanElement.style.display = 'none'; // Làm cho span ẩn ban đầu
//             spanElement.textContent = spanContent;
//             divWrapper.appendChild(spanElement);
//         }

//         // Thêm sự kiện click để sao chép nội dung
//         divWrapper.addEventListener('click', () => {
//             const originalText = divWrapper.innerText; // Lưu lại văn bản gốc
//             const contentToCopy = spanContent.trim(); // Nội dung để sao chép từ span

//             // Sao chép nội dung vào clipboard
//             navigator.clipboard.writeText(contentToCopy).then(() => {
//                 divWrapper.innerText = 'Copied'; // Thay đổi văn bản của wrapper thành "Copied"
//                 divWrapper.style.color = 'red';
//                 divWrapper.style.backgroundColor = 'yellow';

//                 // Sau 3 giây, khôi phục lại nội dung và kiểu dáng ban đầu
//                 setTimeout(() => {
//                     divWrapper.innerHTML = ''; // Xóa nội dung
//                     if (divContent) {
//                         const divElement = document.createElement('div');
//                         divElement.textContent = divContent;
//                         divWrapper.appendChild(divElement); // Thêm lại nội dung div
//                     }
//                     if (spanContent) {
//                         const spanElement = document.createElement('span');
//                         spanElement.style.display = 'none';
//                         spanElement.textContent = spanContent;
//                         divWrapper.appendChild(spanElement); // Thêm lại nội dung span
//                     }
//                     divWrapper.style.color = ''; // Đặt lại kiểu dáng
//                     divWrapper.style.backgroundColor = '';
//                 }, 3000); // 3000 ms = 3 giây
//             }).catch(err => {
//                 console.error('Failed to copy text: ', err);
//             });
//         });

//         noteContainer.appendChild(divWrapper); // Thêm divWrapper vào container
//     });
//     if (AdddivWrapper) {
//         noteContainer.appendChild(AdddivWrapper);
//     }

//     // Thêm sự kiện click cho AdddivWrapper để hiển thị BoxEditPersonalSMS
//     if (AdddivWrapper) {
//         AdddivWrapper.addEventListener('click', () => {
//             if (BoxEditPersonalSMS) {
//                 BoxEditPersonalSMS.style.display = 'flex';
//             }
//         });
//     }

//     const totalLines = 10;

//     SMSList.forEach((SMS, index) => {
//         const divWrapperinedit = document.createElement('div');

//         const [subjectContent, Content] = SMS.split('{-}').map((part) => part.trim());

//         if (subjectContent) {
//             const divElementinedit = document.createElement('input');
//             divElementinedit.value = subjectContent;
//             divElementinedit.placeholder = `Subject #${index + 1}`; // Thêm placeholder cho input
//             divWrapperinedit.appendChild(divElementinedit);
//         }

//         if (Content) {
//             const spanElementinedit = document.createElement('textarea');
//             spanElementinedit.value = Content;
//             spanElementinedit.placeholder = `Content SMS #${index + 1}`; // Thêm placeholder cho textarea
//             divWrapperinedit.appendChild(spanElementinedit);
//         }

//         BoxEditPersonalSMSFromFetch.appendChild(divWrapperinedit);
//     });

//     const remainingLines = totalLines - SMSList.length;
//     for (let i = 0; i < remainingLines; i++) {
//         const divWrapperinedit = document.createElement('div');

//         const divElementinedit = document.createElement('input');
//         divElementinedit.placeholder = `Subject #${SMSList.length + i + 1}`; // Placeholder cho input
//         divWrapperinedit.appendChild(divElementinedit);

//         const spanElementinedit = document.createElement('textarea');
//         spanElementinedit.placeholder = `Content SMS #${SMSList.length + i + 1}`; // Placeholder cho textarea
//         divWrapperinedit.appendChild(spanElementinedit);

//         BoxEditPersonalSMSFromFetch.appendChild(divWrapperinedit);
//     }
// }


// document.getElementById('save-button-for-BoxEditPersonalSMS').addEventListener('click', () => {
//     const BoxEditPersonalSMSFromFetch = document.getElementById('BoxEditPersonalSMSFromFetch');
//     const newSMSList = [];
//     BoxEditPersonalSMSFromFetch.querySelectorAll('div').forEach(div => {
//         const subjectInput = div.querySelector('input');
//         const contentTextarea = div.querySelector('textarea');

//         const subjectText = subjectInput ? subjectInput.value.trim() : '';
//         const contentText = contentTextarea ? contentTextarea.value.trim() : '';

//         if (subjectText || contentText) {
//             newSMSList.push(`${subjectText} {-} ${contentText}`);
//         }
//     });
//     BoxEditPersonalSMSFromFetch.innerHTML = '';
//     createSMSLine(newSMSList);
// });


// document.getElementById('cancel-button-for-BoxEditPersonalSMS').addEventListener('click', () => {
//     // Reset content of BoxEditPersonalSMSFromFetch (clear all the changes made in the input/textarea fields)
//     const BoxEditPersonalSMSFromFetch = document.getElementById('BoxEditPersonalSMSFromFetch');
//     BoxEditPersonalSMSFromFetch.innerHTML = '';

//     // Hide the BoxEditPersonalSMS container
//     const BoxEditPersonalSMS = document.getElementById('BoxEditPersonalSMS');
//     if (BoxEditPersonalSMS) {
//         BoxEditPersonalSMS.style.display = 'none';
//     }
// });


let originalSMSList = [];

function createSMSLine(SMSList) {
    const noteContainer = document.getElementById('fetchSMSFromPersonal');
    const BoxEditPersonalSMSFromFetch = document.getElementById('BoxEditPersonalSMSFromFetch');
    const BoxEditPersonalSMS = document.getElementById('BoxEditPersonalSMS');
    const AdddivWrapper = document.getElementById('AdddivWrapper');

    noteContainer.innerHTML = ''; // Clear previous content

    // Store original SMS list for reverting changes
    originalSMSList = [...SMSList];

    SMSList.forEach(SMS => {
        const divWrapper = document.createElement('div');
        divWrapper.className = 'columnC';

        const [divContent, spanContent] = SMS.split('{-}').map(part => part.trim());

        if (divContent) {
            const divElement = document.createElement('div');
            divElement.textContent = divContent;
            divWrapper.appendChild(divElement);
        }

        if (spanContent) {
            const spanElement = document.createElement('span');
            spanElement.style.display = 'none'; // Hide span initially
            spanElement.textContent = spanContent;
            divWrapper.appendChild(spanElement);
        }

        divWrapper.addEventListener('click', () => {
            const originalText = divWrapper.innerText;
            const contentToCopy = spanContent.trim();

            navigator.clipboard.writeText(contentToCopy).then(() => {
                divWrapper.innerText = 'Copied';
                divWrapper.style.color = 'red';
                divWrapper.style.backgroundColor = 'yellow';

                setTimeout(() => {
                    divWrapper.innerHTML = '';
                    if (divContent) {
                        const divElement = document.createElement('div');
                        divElement.textContent = divContent;
                        divWrapper.appendChild(divElement);
                    }
                    if (spanContent) {
                        const spanElement = document.createElement('span');
                        spanElement.style.display = 'none';
                        spanElement.textContent = spanContent;
                        divWrapper.appendChild(spanElement);
                    }
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
    }

    if (AdddivWrapper) {
        AdddivWrapper.addEventListener('click', () => {
            if (BoxEditPersonalSMS) {
                BoxEditPersonalSMS.style.display = 'flex';
            }
        });
    }

    const totalLines = 10;

    SMSList.forEach((SMS, index) => {
        const divWrapperinedit = document.createElement('div');

        const [subjectContent, Content] = SMS.split('{-}').map(part => part.trim());

        if (subjectContent) {
            const divElementinedit = document.createElement('input');
            divElementinedit.value = subjectContent;
            divElementinedit.placeholder = `Subject #${index + 1}`;
            divWrapperinedit.appendChild(divElementinedit);
        }

        if (Content) {
            const spanElementinedit = document.createElement('textarea');
            spanElementinedit.value = Content;
            spanElementinedit.placeholder = `Content SMS #${index + 1}`;
            divWrapperinedit.appendChild(spanElementinedit);
        }

        BoxEditPersonalSMSFromFetch.appendChild(divWrapperinedit);
    });

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
    const newSMSList = [];
    BoxEditPersonalSMSFromFetch.querySelectorAll('div').forEach(div => {
        const subjectInput = div.querySelector('input');
        const contentTextarea = div.querySelector('textarea');

        const subjectText = subjectInput ? subjectInput.value.trim() : '';
        const contentText = contentTextarea ? contentTextarea.value.trim() : '';

        if (subjectText || contentText) {
            newSMSList.push(`${subjectText} {-} ${contentText}`);
        }
    });
    BoxEditPersonalSMSFromFetch.innerHTML = '';
    createSMSLine(newSMSList);
    savePersonalSMS();
});

async function savePersonalSMS() {
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
        .filter(childDiv => childDiv.id !== 'AdddivWrapper') // Lọc các div không có id là 'AdddivWrapper'
        .map(childDiv => {
            const divContent = childDiv.querySelector('div') ? childDiv.querySelector('div').textContent.trim() : '';
            const spanContent = childDiv.querySelector('span') ? childDiv.querySelector('span').textContent.trim() : '';

            if (divContent || spanContent) {
                return `${divContent}{-}${spanContent}`;
            }
            return ''; // Nếu không có dữ liệu, trả về chuỗi rỗng
        })
        .filter(text => text); // Loại bỏ các dòng rỗng

    if (smsList.length === 0) {
        console.log('No SMS data to save.');
        return;
    }

    const data = {
        action: 'savePersonalSMS',
        email: email,
        personalSMS: smsList.join('\n') // Nối các dòng SMS lại thành một chuỗi
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
document.getElementById('cancel-button-for-BoxEditPersonalSMS').addEventListener('click', () => {
    const BoxEditPersonalSMSFromFetch = document.getElementById('BoxEditPersonalSMSFromFetch');
    const BoxEditPersonalSMS = document.getElementById('BoxEditPersonalSMS');
    BoxEditPersonalSMSFromFetch.innerHTML = "";
    loadMySMS();
    BoxEditPersonalSMS.style.display = 'none';
});
