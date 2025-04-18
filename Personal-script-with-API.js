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

            document.getElementById('checkFormContainer').style.display = 'none';
            document.getElementById('Page_after_login').style.display = 'flex';

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
    const loaderifrememberlogin = document.getElementById('loader-if-remember-login');
    loaderifrememberlogin.classList.remove('hidden_visibility');
    document.getElementById('div-has-button-guest-login').style.display = 'none';



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
                document.getElementById('div-has-button-guest-login').style.display = 'flex';

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
                document.getElementById('checkFormContainer').style.display = 'block';
                document.getElementById('submitFormContainer').style.display = 'none';
                document.getElementById('Page_after_login').style.display = 'none';
                document.getElementById('div-has-button-guest-login').style.display = 'flex';
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
        document.getElementById('div-has-button-guest-login').style.display = 'flex';

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



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("N-Title").addEventListener("click", function () {
        document.execCommand("removeFormat", false, null);
    });
    document.getElementById("N-Content").addEventListener("click", function () {
        document.execCommand("removeFormat", false, null);
    });
    document.getElementById("N-Title_add-new-row").addEventListener("click", function () {
        document.execCommand("removeFormat", false, null);
    });
    document.getElementById("N-Content_add-new-row").addEventListener("click", function () {
        document.execCommand("removeFormat", false, null);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Hàm xử lý click cho nút định dạng chữ
    function applyStyle(command, elementId) {
        document.getElementById(elementId).addEventListener("click", function () {
            document.execCommand(command, false, null);
        });
    }

    // Gán sự kiện cho các nút style của Title
    applyStyle("bold", "B-Title");
    applyStyle("italic", "I-Title");
    applyStyle("underline", "U-Title");
    applyStyle("strikeThrough", "S-Title");

    // Gán sự kiện cho các nút style của Content
    applyStyle("bold", "B-Content");
    applyStyle("italic", "I-Content");
    applyStyle("underline", "U-Content");
    applyStyle("strikeThrough", "S-Content");

    // Gán sự kiện cho các nút style của Title_add-new-row
    applyStyle("bold", "B-Title_add-new-row");
    applyStyle("italic", "I-Title_add-new-row");
    applyStyle("underline", "U-Title_add-new-row");
    applyStyle("strikeThrough", "S-Title_add-new-row");

    // Gán sự kiện cho các nút style của Content_add-new-row
    applyStyle("bold", "B-Content_add-new-row");
    applyStyle("italic", "I-Content_add-new-row");
    applyStyle("underline", "U-Content_add-new-row");
    applyStyle("strikeThrough", "S-Content_add-new-row");
});

document.addEventListener("DOMContentLoaded", function () {
    function getComputedVar(variable) {
        return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    }

    function applyColor(colorVar, elementId) {
        document.getElementById(elementId).addEventListener("click", function () {
            let color = getComputedVar(colorVar);
            document.execCommand("foreColor", false, color);
        });
    }

    // Gán sự kiện cho các nút màu của Title
    applyColor("--colorblack", "black-Title");
    applyColor("--colororangered", "orangered-Title");
    applyColor("--colorblue", "lightblue-Title");
    applyColor("--colorgreen", "green-Title");
    applyColor("--colordeeppink", "dark-pink-Title");

    // Gán sự kiện cho các nút màu của Content
    applyColor("--colorblack", "black-Content");
    applyColor("--colororangered", "orangered-Content");
    applyColor("--colorblue", "lightblue-Content");
    applyColor("--colorgreen", "green-Content");
    applyColor("--colordeeppink", "dark-pink-Content");

    // Gán sự kiện cho các nút màu của Title_add-new-row
    applyColor("--colorblack", "black-Title_add-new-row");
    applyColor("--colororangered", "orangered-Title_add-new-row");
    applyColor("--colorblue", "lightblue-Title_add-new-row");
    applyColor("--colorgreen", "green-Title_add-new-row");
    applyColor("--colordeeppink", "dark-pink-Title_add-new-row");

    // Gán sự kiện cho các nút màu của Content_add-new-row
    applyColor("--colorblack", "black-Content_add-new-row");
    applyColor("--colororangered", "orangered-Content_add-new-row");
    applyColor("--colorblue", "lightblue-Content_add-new-row");
    applyColor("--colorgreen", "green-Content_add-new-row");
    applyColor("--colordeeppink", "dark-pink-Content_add-new-row");
});

document.addEventListener("DOMContentLoaded", function () {
    function insertSymbol(symbol, elementId) {
        document.getElementById(elementId).addEventListener("click", function () {
            document.execCommand("insertText", false, symbol);
        });
    }

    // Gán sự kiện cho các nút symbol của Title
    insertSymbol("➜", "arrow-Title");
    insertSymbol("➥", "RightArrow-UpTail-Title");
    insertSymbol("▶", "triangle-Title");
    insertSymbol("𒊹", "circle-Title");
    insertSymbol("⏹︎", "square-Title");
    insertSymbol("✔️", "check-Title");
    insertSymbol("❌", "cross-Title");

    // Gán sự kiện cho các nút symbol của Content
    insertSymbol("➜", "arrow-Content");
    insertSymbol("➥", "RightArrow-UpTail-Content");
    insertSymbol("▶", "triangle-Content");
    insertSymbol("𒊹", "circle-Content");
    insertSymbol("⏹︎", "square-Content");
    insertSymbol("✔️", "check-Content");
    insertSymbol("❌", "cross-Content");

    // Gán sự kiện cho các nút symbol của Title_add-new-row
    insertSymbol("➜", "arrow-Title_add-new-row");
    insertSymbol("➥", "RightArrow-UpTail-Title_add-new-row");
    insertSymbol("▶", "triangle-Title_add-new-row");
    insertSymbol("𒊹", "circle-Title_add-new-row");
    insertSymbol("⏹︎", "square-Title_add-new-row");
    insertSymbol("✔️", "check-Title_add-new-row");
    insertSymbol("❌", "cross-Title_add-new-row");

    // Gán sự kiện cho các nút symbol của Content_add-new-row
    insertSymbol("➜", "arrow-Content_add-new-row");
    insertSymbol("➥", "RightArrow-UpTail-Content_add-new-row");
    insertSymbol("▶", "triangle-Content_add-new-row");
    insertSymbol("𒊹", "circle-Content_add-new-row");
    insertSymbol("⏹︎", "square-Content_add-new-row");
    insertSymbol("✔️", "check-Content_add-new-row");
    insertSymbol("❌", "cross-Content_add-new-row");
});


// Delete button in New More Document
document.getElementById('delete-button-for-more-document-table_NEW').addEventListener('click', async () => {
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
            setTimeout(() => {
                statusContainer.innerHTML = "";
                statusContainer.style.backgroundColor = '';
                statusContainer.style.color = '';
            }, 5000);
        } else {
            throw new Error("Lỗi khi lưu: " + result);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        statusContainer.innerText = `Lỗi khi lưu dữ liệu: ${error.message}`;
        statusContainer.style.backgroundColor = "red";
        statusContainer.style.color = 'white';
        setTimeout(() => {
            statusContainer.innerHTML = "";
            statusContainer.style.backgroundColor = '';
            statusContainer.style.color = '';
        }, 5000);
    } finally {
        // Ẩn loader sau khi hoàn tất
        loader.classList.add("hidden");
    }
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

document.querySelector('#save-request-changes-button-for-more-document-table_NEW_add-new-row').addEventListener('click', async () => {
    let displayName = document.getElementById("displayName").innerText.trim();
    let displayEmail = document.getElementById("displayEmail").innerText.trim();

    let titleValue = document.getElementById('Title-Of-Row-More-Document_add-new-row').innerHTML.trim();
    let contentValue = document.getElementById('Content-Of-Row-More-Document_add-new-row').innerHTML.trim();

    const loader = document.getElementById("loader-updating-more-documents_NEW_add-new-row");
    const statusContainer = document.getElementById("status-of-updating-edit-more-documents-container_NEW_add-new-row");

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

    // // Nếu không có lỗi, tiếp tục xử lý
    // titleValue = titleValue.replace(/<br\s*\/?>/g, '{^p}');
    // contentValue = contentValue.replace(/<br\s*\/?>/g, '{^p}');

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
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.text();
        console.log('Server response:', result);

        if (result.toLowerCase().includes("row") && result.toLowerCase().includes("added")) {
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
        setTimeout(() => {
            statusContainer.innerHTML = "";
            statusContainer.style.backgroundColor = '';
            statusContainer.style.color = '';
        }, 5000);
    }
});



// Hàm xử lý link trong contenteditable (giữ nguyên href, bỏ tag <a>)
function cleanLinks(html) {
    return html.replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '$1');
}

// Save button in New More Document
document.getElementById('save-request-changes-button-for-more-document-table_NEW').addEventListener('click', async () => {
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
        setTimeout(() => {
            statusContainer.innerHTML = "";
            statusContainer.style.backgroundColor = '';
            statusContainer.style.color = '';
        }, 5000);
    }
});


// Lấy số lượng request trong More Document NEW
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

updateNumbersOfRequestInMoreDocumentNEW();
setInterval(updateNumbersOfRequestInMoreDocumentNEW, 2000);


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
            div.addEventListener("input", () => {
                let html = div.innerHTML;
                html = html.replace(/<div>/gi, "").replace(/<\/div>/gi, "<br>");
                div.innerHTML = html;
                placeCaretAtEnd(div);
            });
        }
    });

    function placeCaretAtEnd(el) {
        el.focus();
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
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
}