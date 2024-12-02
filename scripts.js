// function gọi sau khi login thành công
let runFunctionsIntervalID; // Biến lưu ID của setInterval

function RunFunctionsAfterLogin() {
    console.log("manageFunctions đang chạy...");

    // Gọi các function con bạn muốn tại đây
    loadNote();
    
}

// function ngừng các function khác
function StopRunFunctionsAfterLogin() {
    console.log("RunFunctionsAfterLogin đã dừng.");
    const noteContainer = document.getElementById('note-container');
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
        document.getElementById('note-container').textContent = '';
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
                document.getElementById('note-container').textContent = '';
                // chạy function tổng
                RunFunctionsAfterLogin();
            } else {
                // Xóa Local Storage nếu thông tin không khớp
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userText');
                document.getElementById('checkResponseMessage').textContent = 'Your account do not match';
                document.getElementById('checkFormContainer').style.display = 'block';
                document.getElementById('submitFormContainer').style.display = 'none';
                document.getElementById('Page_after_login').style.display = 'none';
                document.getElementById('note-container').textContent = '';
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
        document.getElementById('note-container').textContent = '';
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



//load phần my note
  async function loadNote() {

    const loader = document.getElementById('my-note-loader');
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
        action: 'getNote',
        email: email
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(data)
        });
        const result = await response.text();

        // Clear any existing notes
        const noteContainer = document.getElementById('note-container');
        noteContainer.innerHTML = '';

        // Split the result into lines and create div elements for each line
        const lines = result.split('\n');
        lines.forEach((line, index) => {
            createNoteLine(line, index);
        });

    } catch (error) {
        console.error('Error loading note:', error);
        document.getElementById('checkResponseMessage').textContent = 'Error: ' + error.message;
    } finally {
        // Ẩn loader khi quá trình tải dữ liệu hoàn tất
        loader.classList.add('hidden');
    }
}

// Function to create a new note line div with contentEditable and a delete button
function createNoteLine(line, index, isChecked) {
    const noteContainer = document.getElementById('note-container');
    
    const divGroup = document.createElement('div');
    divGroup.classList.add('note-item');

    // Create a checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.title = "Check là xong, Uncheck là chưa xong";
    checkbox.classList.add('note-checkbox');

    if (line.startsWith("(done)")) {
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
    }

    const div = document.createElement('span');
    div.contentEditable = true;
    div.textContent = line.replace(/^\((done|not done)\)\s*/, '');
    div.title = '';
    div.dataset.index = index;

    const smalldiv = document.createElement('div');

    const deleteButton = document.createElement('div');
    deleteButton.classList.add('white-delete-icon');
    deleteButton.title = "Xóa việc làm này";
    deleteButton.onclick = () => {
        divGroup.remove(); // Remove the note line from UI
        saveNote();
    };

    div.addEventListener('input', () => {
        deleteButton.style.display = 'none'; // Hide delete button on edit
        saveButton.style.display = 'flex';
        div.style.background = 'rgba(144, 238, 144, 0.5)';
        div.title = "Nhớ lưu chỉnh sửa";
        
        // Process URLs to make them clickable
        processURLs(div);
    });

    const saveButton = document.createElement('div');
    saveButton.classList.add('white-edit-icon');
    saveButton.title = "Lưu chỉnh sửa";
    saveButton.onclick = () => {
        saveNote(); // Remove the note line from UI
        deleteButton.style.display = 'flex';
        saveButton.style.display = 'none';
        div.style.background = 'none';
        div.title = '';
    };

    // Thêm sự kiện lắng nghe cho checkbox để gọi saveNote mỗi khi thay đổi
    checkbox.addEventListener('change', saveNote);

    smalldiv.appendChild(saveButton);
    smalldiv.appendChild(deleteButton);
    divGroup.appendChild(checkbox);
    divGroup.appendChild(div);
    divGroup.appendChild(smalldiv);

    noteContainer.appendChild(divGroup);

    // Function to process and convert URLs in the content
    function processURLs(contentDiv) {
        let content = contentDiv.innerHTML; // Get the current HTML content of the div

        // Regex to match URLs (simple version)
        const urlRegex = /https?:\/\/[^\s]+/g;

        content = content.replace(urlRegex, function(url) {
            // Wrap the URL in an anchor tag to make it clickable
            return `<a href="${url}" target="_blank" style="color: blue; text-decoration: underline;">${url}</a>`;
        });

        contentDiv.innerHTML = content; // Update the content of the div
    }
}


// Function to save notes
async function saveNote() {
    let email = document.getElementById('checkEmail').value.trim();
    if (!email) {
        email = localStorage.getItem('userEmail');
    }
    if (!email) {
        console.error('Email is missing.');
        return;
    }

    const noteContainer = document.getElementById('note-container');
    const lines = Array.from(noteContainer.getElementsByClassName('note-item'))  // Lọc các dòng ghi chú có class 'note-item'
        .map(divGroup => {
            const div = divGroup.querySelector('div[contentEditable="true"]'); // Lấy nội dung của div contentEditable
            const checkbox = divGroup.querySelector('input[type="checkbox"]');  // Lấy checkbox trong dòng ghi chú
            const isChecked = checkbox ? checkbox.checked : false;  // Kiểm tra trạng thái checkbox
            const text = div ? div.textContent.trim() : '';  // Lấy nội dung dòng ghi chú
            
            // Nếu checkbox được chọn, prepend "(done)", nếu không prepend "(not done)"
            return (isChecked ? "(done) " : "(not done) ") + text;
        });

    const data = {
        action: 'saveNote',
        email: email,
        note: lines.join('\n') // Join all the lines into a single string
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(data)
        });
        const result = await response.text();
        console.log('Note saved successfully:', result);
    } catch (error) {
        console.error('Error saving note:', error);
    }
}



// Function to handle the Save button click event
document.getElementById('save-button').addEventListener('click', function() {
    const noteContent = document.getElementById('note-content').textContent.trim(); // Get the content from the input field

    if (noteContent) {
        // Call createNoteLine to add the new note to the container
        createNoteLine(noteContent, document.getElementById('note-container').childElementCount);

        // Clear the input field after saving
        document.getElementById('note-content').textContent  = '';
        saveNote();
    } else {
        console.log('No text to save');
    }
});
