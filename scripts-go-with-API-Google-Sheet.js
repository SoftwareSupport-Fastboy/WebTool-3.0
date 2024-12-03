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
        lines.forEach((line, index) => {
            createToDoLine(line, index);
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
function createToDoLine(line, index, isChecked) {
    const noteContainer = document.getElementById('my-To-do-list-personal-fetch-container');
    
    const divGroup = document.createElement('div');
    divGroup.classList.add('To-Do-Line-item');

    // Tạo checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.title = "Check là xong, Uncheck là chưa xong";
    checkbox.classList.add('To-do-list_checkbox');
    checkbox.checked = line.startsWith("(done)");

    const span = document.createElement('span');
    span.contentEditable = true;
    span.textContent = line.replace(/^\((done|not done)\)\s*/, '');
    span.title = '';
    span.dataset.index = index;

    const smalldiv = document.createElement('div');

    const deleteButton = document.createElement('div');
    deleteButton.classList.add('white-delete-icon');
    deleteButton.title = "Xóa việc làm này";
    deleteButton.onclick = () => {
        divGroup.remove(); // Remove the To-Do-List line from UI
        saveMyToDoList();
    };

    // Hiển thị nút lưu sau khi người dùng chỉnh sửa
    span.addEventListener('input', () => {
        deleteButton.style.display = 'none'; // Hide delete button on edit
        saveButton.style.display = 'flex';
        span.style.background = 'rgba(0, 132, 255, 0.5)';
        span.title = "Nhớ lưu chỉnh sửa";
    });

    const saveButton = document.createElement('div');
    saveButton.classList.add('white-edit-icon');
    saveButton.title = "Lưu chỉnh sửa";
    saveButton.onclick = () => {
        saveMyToDoList(); // Save the To-Do-List
        deleteButton.style.display = 'flex';
        saveButton.style.display = 'none';
        span.style.background = 'none';
        span.title = '';
        // Đảm bảo xử lý URL sau khi các thao tác khác hoàn tất
        setTimeout(() => {
            processURLs(span);
        }, 100); 
    };

    checkbox.addEventListener('change', saveMyToDoList); // Lưu khi thay đổi trạng thái checkbox

    smalldiv.appendChild(saveButton);
    smalldiv.appendChild(deleteButton);
    divGroup.appendChild(checkbox);
    divGroup.appendChild(span);
    divGroup.appendChild(smalldiv);

    noteContainer.appendChild(divGroup);
    processURLs(span);

    // Xử lý và thêm các phần tử liên quan đến URL
    function processURLs(contentSpan) {
        let content = contentSpan.textContent.trim(); // Lấy nội dung hiện tại

        // Regex để nhận diện URL
        const urlRegex = /https?:\/\/[^\s]+/g;

        // Chia nội dung thành các phần dựa trên URL
        const parts = content.split(urlRegex);

        // Lấy các URL từ nội dung
        const urls = content.match(urlRegex);

        // Nếu không có URL, không cần xử lý
        if (!urls) return;

        // Tạo nội dung mới với các liên kết và nút "Truy cập"
        let newContent = '';
        parts.forEach((part, index) => {
            newContent += `<span>${part}</span>`;
            if (urls && urls[index]) {
                // Bọc URL trong một div để xử lý hover
                newContent += `
                    <div style="display: inline; position: relative;" class="url-container">
                        <a href="${urls[index]}" 
                           target="_blank"
                           class="link-access-icon"
                           title="Truy cập"
                           contenteditable="false">
                        </a>
                        <span style="text-decoration: underline; font-style: italic;">${urls[index]}</span>
                    </div>`;
            }
        });

        // Thay thế nội dung trong span
        contentSpan.innerHTML = newContent;

        // Đặt lại trạng thái chỉnh sửa cho nội dung
        contentSpan.contentEditable = true;
    }
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
            const span = divGroup.querySelector('span[contentEditable="true"]'); // Lấy nội dung của div contentEditable
            const checkbox = divGroup.querySelector('input[type="checkbox"]'); // Lấy checkbox trong dòng ghi chú
            const isChecked = checkbox ? checkbox.checked : false; // Kiểm tra trạng thái checkbox

            let text = span ? span.innerHTML.trim() : ''; // Lấy nội dung HTML của dòng ghi chú
            
            // Loại bỏ tất cả các thẻ <div> và <a> trong span
            text = text
                .replace(/<div[^>]*>/g, '') // Xóa thẻ <div>
                .replace(/<\/div>/g, '')     // Xóa thẻ đóng </div>
                .replace(/<a[^>]*>/g, '')    // Xóa thẻ mở <a>
                .replace(/<\/a>/g, '')       // Xóa thẻ đóng </a>
                .replace(/<span[^>]*>/g, '') // Xóa thẻ mở <span>
                .replace(/<\/span>/g, '')    // Xóa thẻ đóng </span>
                .replace(/\s+/g, ' ');       // Thay thế nhiều khoảng trắng bằng một khoảng trắng duy nhất

            // Nếu checkbox được chọn, prepend "(done)", nếu không prepend "(not done)"
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
    } else {
        console.log('No text to save');
    }
});
