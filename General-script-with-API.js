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




// Sửa lại giá trị của ô A1 trong Sheet "Lich Truc (copy)"
document.getElementById('updateA1Btn').addEventListener('click', function () {
    // Lấy giá trị từ các input
    var sheetName = document.getElementById('sua-ten-sheet').value;
    var cellReference = document.getElementById('sua-o-dau-tien-trong-sheet').value;
    var lastcellReference = document.getElementById('sua-o-cuoi-cung-trong-sheet').value;
    var statusContainer = document.getElementById('status-of-updating-lichtruc-container');
    var loaderupdatelichtruc = document.getElementById('loader-update-lichtruc');
    var updateidlichtruc = document.getElementById('update-id-lichtruc');

    // Xóa thông báo cũ
    statusContainer.innerHTML = '';

    if (!sheetName || !cellReference || !lastcellReference) {
        statusContainer.innerHTML = "Vui lòng nhập đầy đủ thông tin.";
        statusContainer.style.backgroundColor = 'red';
        statusContainer.style.color = 'white';
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
            autoHideStatus();
        })
        .finally(() => {
            // Ẩn loader sau khi hoàn thành hoặc gặp lỗi
            loaderupdatelichtruc.classList.add('hidden');
            updateidlichtruc.classList.remove('hidden');
        });

    // Hàm tự động ẩn thông báo sau 3 giây
    function autoHideStatus() {
        setTimeout(function () {
            statusContainer.innerHTML = "";
            statusContainer.style.backgroundColor = '';
            statusContainer.style.color = '';

        }, 3000); // Ẩn sau 3 giây
    }
});



// Hiển thị Lịch trực cuối tuần
fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=getLichTrucCopy', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
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
                    table += '<th><div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 1rem"><div class="white-delete-icon"></div><span>' + data[0][i] + '</span></div></th>';
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
document.getElementById('Show-all-in-lichtruc-container').addEventListener('click', function () {
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
    statusContainer.style.backgroundColor = 'green';
    statusContainer.style.color = 'white';
    setTimeout(function () {
        statusContainer.innerHTML = "";
        statusContainer.style.backgroundColor = '';
        statusContainer.style.color = '';
    }, 3000);
});



// Nút refresh
function refreshLichTruc() {
    const targetView = document.getElementById('lich-truc-cuoi-tuan-view');
    const statusContainer = document.getElementById('status-of-updating-lichtruc-container');
    const loaderlichtruc = document.getElementById('loader-lichtruc');

    // Hiển thị loader & xóa nội dung cũ trước khi fetch
    loaderlichtruc.classList.remove('hidden');
    targetView.innerHTML = "";

    console.log("🔄 Đang tải dữ liệu...");

    // Gọi fetch dữ liệu từ Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=getLichTrucCopy', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ Dữ liệu đã nhận:", data);

            // Kiểm tra nếu dữ liệu rỗng
            if (!data || data.length === 0) {
                targetView.innerHTML = "<p>Không có dữ liệu.</p>";
                return;
            }

            // Tạo bảng từ dữ liệu
            let table = '<table border="1" cellpadding="5" cellspacing="0">';

            table += '<thead style="z-index:10;"><tr>';
            for (let i = 0; i < data[0].length; i++) {
                if (i === 0) {
                    table += `<th>${data[0][i]}</th>`;
                } else {
                    table += `<th><div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 1rem"><div class="white-delete-icon"></div><span>${data[0][i]}</span></div></th>`;
                }
            }
            table += '</tr></thead>';

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
            console.error("❌ Lỗi khi tải dữ liệu:", error);
            targetView.innerHTML = `<p style="color: red;">Lỗi khi tải dữ liệu: ${error.message}</p>`;
        })
        .finally(() => {
            // Ẩn loader khi hoàn tất
            loaderlichtruc.classList.add('hidden');

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
        });
}







function fetchSMSData() {
    const url = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=getSMSData'; // Updated URL
    const params = {}; // No need to pass action in params since it's already in the URL

    // Gửi yêu cầu GET tới backend
    fetch(url, {
        method: 'GET',  // Changed method to GET
    })
        .then(response => response.json())  // Chuyển dữ liệu từ JSON
        .then(data => renderSMSData(data))  // Xử lý và hiển thị dữ liệu
        .catch(error => console.error('Error fetching data:', error));
}


fetchSMSData();

function renderSMSData(data) {
    const container = document.getElementById('fetchSMSFromManagers');

    // Hàm để gom nhóm dữ liệu theo cột A
    function groupBy(data, columnIndex) {
        return data.reduce((groups, item) => {
            const key = item[columnIndex];
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {});
    }

    // Hàm để chuyển đổi ký tự có dấu thành không dấu
    function removeAccents(str) {
        var accents = 'ÀÁÂÃĂẠẢẤẦẨẪẬẮẰẲẴẶàáâãăạảấầẩẫậắằẳẵặĐđÝỲỴỶỸýỳỵỷỹÌÍĨỈỊìíĩỉịÙÚŨƯỤỦỨỪỬỮỰùúũưụủứừửữựÒÓÔÕƠỌỎỐỒỔỖỘỚỜỞỠỢòóôõơọỏốồổỗộớờởỡợÈÉÊẸẺẼẾỀỂỄỆèéêẹẻẽếềểễệ';
        var accentsOut = 'AAAAAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaDdYYYYYyyyyyIIIIIiiiiiUUUUUUUUUUUuuuuuuuuuuuOOOOOOOOOOOOOOOOOoooooooooooooooooEEEEEEEEEEEeeeeeeeeeee';

        return str.split('').map(function (char) {
            var index = accents.indexOf(char);
            return index !== -1 ? accentsOut.charAt(index) : char;
        }).join('');
    }

    // Sắp xếp dữ liệu theo cột A để gom nhóm
    const groupedData = groupBy(data, 1); // Sắp xếp theo cột A (index 0)

    // Tạo nhóm DOM
    for (const group in groupedData) {
        const columnB = document.createElement('div');
        columnB.classList.add('columnB'); // Thêm lớp cho nhóm
        columnB.setAttribute('data-group-title', group);

        const columngroupC = document.createElement('div');
        columngroupC.classList.add('columngroupC');

        let createdInput = false; // Cờ để kiểm tra xem đã tạo input chưa

        // Thêm các cột B và C tương ứng dưới cột A
        groupedData[group].forEach(item => {
            const columnC = document.createElement('div');
            columnC.classList.add('columnC');
            columnC.innerText = item[2]; // Cột B (index 1)

            // Thay đổi columnD thành <span> thay vì <div>
            const columnD = document.createElement('span');
            columnD.classList.add('columnD');
            columnD.style.display = 'none';
            columnD.innerText = item[3]; // Cột C (index 2)
            columnD.setAttribute('data-original', item[3]);

            // Gắn sự kiện click để copy nội dung columnD
            columnC.addEventListener('click', () => {
                const originalText = columnC.innerText; // Lưu nội dung ban đầu
                const contentToCopy = columnD.innerHTML.replace(/<br\s*\/?>/gi, '\n').trim();

                navigator.clipboard.writeText(contentToCopy).then(() => {
                    columnC.innerText = 'Copied'; // Đổi nội dung thành "Copied"
                    columnC.style.color = 'red';
                    columnC.style.backgroundColor = 'yellow';
                    // Sau 3 giây, khôi phục nội dung ban đầu
                    setTimeout(() => {
                        columnC.innerText = originalText;
                        columnC.style.color = '';
                        columnC.style.backgroundColor = '';
                    }, 3000); // 3000 ms = 3 giây
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });



            // Nếu item[0] bằng "Có" và chưa tạo input, tạo 1 input cho nhóm này
            if (item[0] === "Có" && !createdInput) {
                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.placeholder = 'Your Name';
                inputField.classList.add('columnA'); // Thêm lớp CSS nếu cần
                columnB.appendChild(inputField);
                createdInput = true; // Đánh dấu đã tạo input cho nhóm này

                // Gắn sự kiện cho inputField
                inputField.addEventListener('input', function () {
                    let value = inputField.value;

                    // Chuyển đổi value thành không dấu
                    let value2 = removeAccents(value);

                    // Lặp qua tất cả các columnD trong nhóm và cập nhật nội dung
                    columngroupC.querySelectorAll('.columnD').forEach(columnD => {
                        let originalText = columnD.getAttribute('data-original'); // Lấy giá trị gốc
                        columnD.innerText = originalText.replace('***', value).replace('---', value2);
                    });
                });
            }

            columnC.appendChild(columnD);
            columngroupC.appendChild(columnC);
        });

        columnB.appendChild(columngroupC);

        // Thêm nhóm vào container, Thêm nhóm vào trước div "My-Personal-SMS"
        const personalSMS = document.querySelector('.columnB.My-Personal-SMS');
        container.insertBefore(columnB, personalSMS);

    }
}



fetchAndDisplayCheckIDInformation();


async function fetchAndDisplayCheckIDInformation() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=CheckIDInformation'; // Updated URL

    try {
        const response = await fetch(scriptURL, {
            method: 'GET',  // Changed method to GET since action is part of the URL
        });

        const result = await response.json();

        // Pass the fetched result to the createLinks function
        createLinks(result);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



function createLinks(result) {
    // Clear existing content
    const container = document.getElementById('fetch-check-id-information');
    container.innerHTML = '';

    result.forEach((item, index) => {
        const name = item[0];  // Name from column A
        let linkUrl = item[1];  // URL from column B

        // Create the <a> element
        const link = document.createElement('a');
        link.href = linkUrl;
        link.classList.add('Open-button');
        link.textContent = name;

        // Tạo checkbox
        const labelcheckbox = document.createElement('label');
        labelcheckbox.classList.add('checkbox-container', 'absolutecenter');

        const divcheckbox = document.createElement('div');
        divcheckbox.classList.add('checkmark');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.classList.add('custom-checkbox');

        // Check localStorage to restore the state of the checkbox
        const storedState = localStorage.getItem('checkboxState' + index);
        if (storedState === 'checked') {
            input.checked = true;
        } else {
            input.checked = false;
        }

        // Add event listener to change localStorage when checkbox state changes
        input.addEventListener('change', function () {
            if (input.checked) {
                localStorage.setItem('checkboxState' + index, 'checked');
            } else {
                localStorage.setItem('checkboxState' + index, 'unchecked');
            }
        });

        const group = document.createElement('div');
        group.style.position = 'relative';
        group.appendChild(link);
        group.appendChild(labelcheckbox);

        labelcheckbox.appendChild(input);
        labelcheckbox.appendChild(divcheckbox);

        // Add event listener to replace "*****" and open in new tabs
        link.addEventListener('click', function (event) {
            // Prevent the default action of opening the link
            event.preventDefault();

            // Check if the checkbox is checked
            const isLockChecked = document.getElementById('lock-combo-activate').checked;
            if (isLockChecked) {
                // If checked, execute pasteClipboard and updateCheckInfo
                pasteClipboard().then(() => {
                    const customValues = document.getElementById('id-of-check-id-information')?.textContent.split(',');

                    if (customValues && customValues.length > 0) {
                        customValues.forEach(customValue => {
                            customValue = customValue.trim();
                            const modifiedLinkUrl = linkUrl.replace('*****', customValue);
                            console.log("Modified Link URL:", modifiedLinkUrl);

                            // Now open the modified link in a new tab
                            window.open(modifiedLinkUrl, '_blank');
                        });
                    } else {
                        console.log("No custom values found in span.");
                        alert("Please enter valid values in the input field.");
                    }
                });
            } else {
                // If not checked, just proceed with the link click as usual
                const customValues = document.getElementById('id-of-check-id-information')?.textContent.split(',');

                if (customValues && customValues.length > 0) {
                    customValues.forEach(customValue => {
                        customValue = customValue.trim();
                        const modifiedLinkUrl = linkUrl.replace('*****', customValue);
                        console.log("Modified Link URL:", modifiedLinkUrl);

                        window.open(modifiedLinkUrl, '_blank');
                    });
                } else {
                    console.log("No custom values found in span.");
                    alert("Please enter valid values in the input field.");
                }
            }
        });

        container.appendChild(group);
    });
}



fetchAndDisplayGetServer();

let map = {}; // Biến lưu trữ dữ liệu sau khi fetch

async function fetchAndDisplayGetServer() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=GetServer'; // Updated URL

    try {
        const response = await fetch(scriptURL, {
            method: 'GET',  // Changed method to GET since action is part of the URL
        });

        const result = await response.json();

        // Pass the fetched result to the createLinks function
        createLinksGetServer(result);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function createLinksGetServer(data) {
    const dropdown = document.getElementById("dropdown");
    dropdown.innerHTML = ""; // Clear existing options

    map = {}; // Reset map

    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Click to choose Server";
    defaultOption.disabled = true; // Không cho phép chọn lại nếu đã chọn server khác
    defaultOption.selected = true; // Là tùy chọn mặc định
    dropdown.appendChild(defaultOption);

    // Add server options from data
    data.forEach((row, index) => {
        const [serverName, someValue, serverIDH] = row;

        // Populate the dropdown with server names
        const option = document.createElement("option");
        option.value = index;
        option.textContent = serverName;
        dropdown.appendChild(option);

        // Map index to server details
        map[index] = {
            name: serverName,
            someValue: someValue,
            serverIDH: serverIDH // Cột thứ 3
        };
    });
}


fetchAndDisplayGetOtherDocuments();

async function fetchAndDisplayGetOtherDocuments() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=GetOtherDocuments'; // Updated URL

    try {
        const response = await fetch(scriptURL, {
            method: 'GET',  // Changed method to GET since action is part of the URL
        });

        const result = await response.json();

        // Pass the fetched result to the createLinks function
        createLinksGetOtherDocuments(result);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function createLinksGetOtherDocuments(data) {
    // Get the container where the links will be appended
    const container = document.getElementById('fetch-other-documents'); // Ensure you have an element with this ID in your HTML
    container.innerHTML = '';
    data.forEach(row => {
        const link = document.createElement('a');

        link.textContent = row[0];
        link.href = row[1];
        link.target = '_blank';
        link.classList.add('Open-button');
        container.appendChild(link);
    });
}

fetchAndDisplayDocuments();

async function fetchAndDisplayDocuments() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=GetMoreDocuments');
        const data = await response.json();

        function convertUrlsToLinks(text) {
            var urlRegex = /(https?:\/\/[^\s<]+)/g;
            text = text.replace(urlRegex, function (url) {
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            });
            return text.replace(/\n/g, '<br>');  // Convert line breaks to <br> tags
        }

        if (Array.isArray(data) && data.length > 0) {
            const container = document.querySelector('#more-document-table');
            container.innerHTML = '';

            const table = document.createElement('table');
            const tbody = document.createElement('tbody');

            data.forEach(row => {
                const tableRow = document.createElement('tr');
                const titleCell = document.createElement('td');
                titleCell.innerHTML = convertUrlsToLinks(row[0]);
                tableRow.appendChild(titleCell);

                const dateCell = document.createElement('td');
                dateCell.innerHTML = convertUrlsToLinks(row[1]);
                tableRow.appendChild(dateCell);

                tbody.appendChild(tableRow);
            });

            table.appendChild(tbody);
            container.appendChild(table);
        } else {
            console.error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
}


document.getElementById("refresh-more-documents-container").addEventListener("click", async function () {
    const statusContainer = document.getElementById('status-of-updating-more-documents-container');
    statusContainer.innerHTML = "";
    statusContainer.style.backgroundColor = '';
    statusContainer.style.color = '';

    const loader = document.getElementById('loader-more-documents');
    loader.classList.remove('hidden'); // Hiện loader

    const container = document.querySelector('#more-document-table');
    container.innerHTML = ''; // Xóa nội dung cũ

    await fetchAndDisplayDocuments(); // Chờ fetch hoàn tất

    loader.classList.add('hidden'); // Ẩn loader ngay sau khi fetch hoàn tất

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

});




fetchAndDisplayDocumentsNEW();

async function fetchAndDisplayDocumentsNEW() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=GetMoreDocumentsNEW');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            const container = document.querySelector('#more-document-table_NEW');
            container.innerHTML = ''; // Xóa nội dung cũ

            // Tạo bảng
            let table = document.createElement('table');
            let tbody = document.createElement('tbody');

            data.forEach(row => {
                let tr = document.createElement('tr');
                tr.classList.add("tr-NEW");

                // Tạo td cho checkbox
                let checkboxTd = document.createElement('td');
                let checkboxLabel = document.createElement('label');
                checkboxLabel.classList.add("Favorite_row");
                checkboxLabel.title = "Mark as your favorite";

                // Tạo input checkbox
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.classList.add("Favorite_row_checkbox");


                // Thêm SVG
                let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("viewBox", "0 0 24 24");
                svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                svg.innerHTML = `<g><g><path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path></g></g>`;


                // Gắn input và SVG vào label
                checkboxLabel.appendChild(checkbox);
                checkboxLabel.appendChild(svg);

                // Gắn label vào td
                checkboxTd.appendChild(checkboxLabel);

                // Gắn td vào tr
                tr.appendChild(checkboxTd);


                let cellValues = Object.values(row).map(value => String(value).trim());
                let lastCellIndex = cellValues.reduce((count, text) => count + text.split('{-}').length, 0) - 1;
                let cellCount = 0;

                cellValues.forEach(text => {
                    let tagMatch = text.match(/\[TAG:(.*?)\]/); // Tìm chuỗi [TAG:...]
                    let cells = text.split('{-}').map(cell => cell.trim()); // Tách thành các ô nếu có {-}

                    cells.forEach((cellContent, index) => {
                        let td = document.createElement('td');
                        let finalContent = '';

                        if (tagMatch && index === 0) {
                            // Nếu có TAG và đây là ô đầu tiên, chèn button vào cùng cell
                            let tags = tagMatch[1].split(',').map(tag => tag.trim());
                            let tagButtons = tags.map(tag => {
                                let button = document.createElement('button'); // Tạo button bằng JS
                                button.textContent = tag; // Gán nội dung cho button
                                button.classList.add('tag-More-Documents'); // Thêm class
                                // button.classList.add(tag.replace(/\s+/g, '')); // Thêm class theo tên tag, viết liền
                                return button.outerHTML; // Chuyển button thành HTML string
                            }).join(' ');

                            // Xóa [TAG:...] khỏi chuỗi gốc
                            cellContent = cellContent.replace(tagMatch[0], '').trim();
                            finalContent = cellContent + '<br>' + tagButtons;
                        } else {
                            finalContent = cellContent;
                        }

                        // Xử lý xuống dòng `{^p}`
                        finalContent = finalContent.replace(/{\^p}/g, '<br>');

                        // Chuyển đổi URL thành liên kết
                        td.innerHTML = convertUrlsToLinks(finalContent);


                        const AddingNewRowButton = document.getElementById('Add-new-row-into-More-Document-NEW');
                        AddingNewRowButton.addEventListener('click', () => {
                            const mainDropdown = document.getElementById('dropdown-for-choose-main-new-tag');
                            const newDropdown2 = document.getElementById('dropdown-for-choose-new-tag_add-new-row');

                            // Xóa nội dung cũ trong newDropdown
                            newDropdown2.innerHTML = '';

                            // Clone và chuyển nội dung sang dropdown mới
                            mainDropdown.querySelectorAll('button').forEach(button => {
                                let clonedButton = button.cloneNode(true);
                                clonedButton.classList.add('tag-More-Documents');
                                clonedButton.style.cursor = 'pointer';
                                newDropdown2.appendChild(clonedButton);
                            });


                            document.getElementById('search-tag-in-more-document-table-new_add-new-row').addEventListener('focus', () => {
                                document.getElementById('dropdown-for-choose-new-tag_add-new-row').style.display = 'block';
                            });

                            document.addEventListener('click', (event) => {
                                const searchInput = document.getElementById('search-tag-in-more-document-table-new_add-new-row');
                                const dropdown = document.getElementById('dropdown-for-choose-new-tag_add-new-row');

                                if (!dropdown.contains(event.target) && event.target !== searchInput) {
                                    dropdown.style.display = 'none';
                                }
                            });

                            document.getElementById('dropdown-for-choose-new-tag_add-new-row').addEventListener('click', (event) => {
                                if (event.target.tagName === 'BUTTON') {
                                    event.stopPropagation();
                                }
                            });

                            function setupTagSearch() {
                                const searchInput = document.getElementById('search-tag-in-more-document-table-new_add-new-row');
                                const dropdown = document.getElementById('dropdown-for-choose-new-tag_add-new-row');

                                // Tạo phần tử "No result" nếu chưa có
                                let noResultDiv = dropdown.querySelector('.no-result');
                                if (!noResultDiv) {
                                    noResultDiv = document.createElement('div');
                                    noResultDiv.textContent = 'No result';
                                    noResultDiv.classList.add('no-result');
                                    noResultDiv.style.display = 'none'; // Ẩn ban đầu
                                    noResultDiv.style.color = '#888';
                                    noResultDiv.style.textAlign = 'center';
                                    dropdown.appendChild(noResultDiv);
                                }

                                searchInput.addEventListener('input', () => {
                                    const searchText = searchInput.value.trim().toLowerCase();
                                    const buttons = dropdown.querySelectorAll('button');

                                    let hasMatch = false; // Kiểm tra xem có tag nào khớp không

                                    buttons.forEach(button => {
                                        if (button.textContent.toLowerCase().includes(searchText)) {
                                            button.style.display = 'inline-flex';
                                            hasMatch = true;
                                        } else {
                                            button.style.display = 'none';
                                        }
                                    });

                                    // Hiển thị "No result" nếu không tìm thấy kết quả
                                    noResultDiv.style.display = hasMatch ? 'none' : 'block';
                                });
                            }

                            // Gọi lại hàm sau khi load dữ liệu xong
                            setupTagSearch();

                            function setupTagToggle() {
                                const tagContainer = document.getElementById('Tag-Of-Row-More-Document_add-new-row');
                                const dropdownContainer = document.getElementById('dropdown-for-choose-new-tag_add-new-row');

                                // Tạo phần tử "No result" nếu chưa có
                                let noResultDiv = dropdownContainer.querySelector('.no-result');
                                if (!noResultDiv) {
                                    noResultDiv = document.createElement('div');
                                    noResultDiv.textContent = 'No result';
                                    noResultDiv.classList.add('no-result');
                                    noResultDiv.style.display = 'none'; // Ẩn ban đầu
                                    noResultDiv.style.padding = '0.5rem';
                                    noResultDiv.style.color = '#888';
                                    noResultDiv.style.textAlign = 'center';
                                    dropdownContainer.appendChild(noResultDiv);
                                }

                                function moveTag(tagButton, fromContainer, toContainer) {
                                    fromContainer.removeChild(tagButton);
                                    toContainer.appendChild(tagButton);
                                    checkDropdownEmpty(); // Kiểm tra xem dropdown có trống không
                                }

                                function addTagClickListener(container, fromContainer, toContainer) {
                                    container.addEventListener('click', (event) => {
                                        if (event.target.tagName === 'BUTTON') {
                                            moveTag(event.target, fromContainer, toContainer);
                                        }
                                    });
                                }

                                function checkDropdownEmpty() {
                                    const buttons = dropdownContainer.querySelectorAll('button');
                                    noResultDiv.style.display = buttons.length === 0 ? 'block' : 'none';
                                }

                                addTagClickListener(tagContainer, tagContainer, dropdownContainer);
                                addTagClickListener(dropdownContainer, dropdownContainer, tagContainer);
                            }


                            // Gọi hàm này sau khi load xong dữ liệu
                            setupTagToggle();


                        });




                        // Nếu là ô cuối cùng của dòng, thêm class "td-can-be-edited"
                        if (cellCount === lastCellIndex) {
                            td.classList.add('td-can-be-edited');
                            const tdadding = document.createElement('div');
                            tdadding.classList.add('td-adding');
                            td.appendChild(tdadding);

                            tdadding.addEventListener('click', () => {
                                const tr = tdadding.closest('tr'); // Lấy hàng chứa td
                                const tds = tr.querySelectorAll('td'); // Lấy danh sách tất cả td trong tr

                                if (tds.length >= 3) {
                                    // Lấy dữ liệu từ các ô
                                    const idValue = tds[1].textContent.trim(); // Ô đầu tiên
                                    let titleTd = tds[2]; // Ô thứ 2 (chứa tiêu đề + tag)
                                    let contentTd = tds[3]; // Ô thứ 3 (chứa nội dung)

                                    let tags = [];

                                    // Lấy các button chứa tag
                                    titleTd.querySelectorAll('button.tag-More-Documents').forEach(button => {
                                        tags.push(button.textContent.trim());
                                    });

                                    // Lấy nội dung tiêu đề, loại bỏ button
                                    let titleClone = titleTd.cloneNode(true);
                                    titleClone.querySelectorAll('button').forEach(btn => btn.remove());
                                    let titleValue = titleClone.innerHTML.replace(/<br\s*\/?>/gi, '\n').trim();


                                    // **Xử lý Content:**
                                    let contentClone = contentTd.cloneNode(true);
                                    contentClone.querySelectorAll('.td-adding').forEach(div => div.remove());

                                    // Lấy nội dung, giữ nguyên các thẻ <br>
                                    let contentValue = contentClone.innerHTML.trim();

                                    // Đổ nội dung vào div contenteditable
                                    document.getElementById('Content-Of-Row-More-Document').innerHTML = contentValue;


                                    // Cập nhật vào các input
                                    document.getElementById('id-of-row-more-document').textContent = idValue;
                                    document.getElementById('Tag-Of-Row-More-Document').innerHTML = tags.map(tag => {
                                        let button = document.createElement('button'); // Tạo button cho tag
                                        button.textContent = tag;
                                        button.classList.add('tag-More-Documents');
                                        button.style.cursor = 'pointer';
                                        return button.outerHTML;
                                    }).join(' ');

                                    document.getElementById('Title-Of-Row-More-Document').innerHTML = titleValue.replace(/\n/g, '<br>');
                                    // document.getElementById('Content-Of-Row-More-Document').innerHTML = contentValue.replace(/\n/g, '<br>');

                                    // Hiển thị khung chỉnh sửa
                                    document.getElementById('More-Document_container_Edit_NEW').style.display = 'flex';

                                    const mainDropdown = document.getElementById('dropdown-for-choose-main-new-tag');
                                    const newDropdown = document.getElementById('dropdown-for-choose-new-tag');
                                    const existingTags = new Set();

                                    document.querySelectorAll('#Tag-Of-Row-More-Document button').forEach(button => {
                                        existingTags.add(button.textContent.trim()); // Thêm tag vào Set
                                    });
                                    // Xóa nội dung cũ trong newDropdown
                                    newDropdown.innerHTML = '';

                                    // Clone và chuyển nội dung sang dropdown mới
                                    mainDropdown.querySelectorAll('button').forEach(button => {
                                        let tagName = button.textContent.trim();
                                        if (!existingTags.has(tagName)) {
                                            let clonedbutton = button.cloneNode(true);
                                            clonedbutton.classList.add('tag-More-Documents');
                                            clonedbutton.style.cursor = 'pointer';
                                            newDropdown.appendChild(clonedbutton);
                                        }
                                    });


                                    document.getElementById('search-tag-in-more-document-table-new').addEventListener('focus', () => {
                                        document.getElementById('dropdown-for-choose-new-tag').style.display = 'block';
                                    });


                                    document.addEventListener('click', (event) => {
                                        const searchInput = document.getElementById('search-tag-in-more-document-table-new');
                                        const dropdown = document.getElementById('dropdown-for-choose-new-tag');

                                        if (!dropdown.contains(event.target) && event.target !== searchInput) {
                                            dropdown.style.display = 'none';
                                        }
                                    });

                                    // Khi click vào button trong dropdown thì dropdown không bị ẩn
                                    document.getElementById('dropdown-for-choose-new-tag').addEventListener('click', (event) => {
                                        if (event.target.tagName === 'BUTTON') {
                                            event.stopPropagation();
                                        }
                                    });

                                    function setupTagSearch() {
                                        const searchInput = document.getElementById('search-tag-in-more-document-table-new');
                                        const dropdown = document.getElementById('dropdown-for-choose-new-tag');

                                        // Tạo phần tử "No result" nếu chưa có
                                        let noResultDiv = dropdown.querySelector('.no-result');
                                        if (!noResultDiv) {
                                            noResultDiv = document.createElement('div');
                                            noResultDiv.textContent = 'No result';
                                            noResultDiv.classList.add('no-result');
                                            noResultDiv.style.display = 'none'; // Ẩn ban đầu
                                            noResultDiv.style.color = '#888';
                                            noResultDiv.style.textAlign = 'center';
                                            dropdown.appendChild(noResultDiv);
                                        }

                                        searchInput.addEventListener('input', () => {
                                            const searchText = searchInput.value.trim().toLowerCase();
                                            const buttons = dropdown.querySelectorAll('button');

                                            let hasMatch = false; // Kiểm tra xem có tag nào khớp không

                                            buttons.forEach(button => {
                                                if (button.textContent.toLowerCase().includes(searchText)) {
                                                    button.style.display = 'inline-flex';
                                                    hasMatch = true;
                                                } else {
                                                    button.style.display = 'none';
                                                }
                                            });

                                            // Hiển thị "No result" nếu không tìm thấy kết quả
                                            noResultDiv.style.display = hasMatch ? 'none' : 'block';
                                        });
                                    }

                                    // Gọi lại hàm sau khi load dữ liệu xong
                                    setupTagSearch();



                                    function setupTagToggle() {
                                        const tagContainer = document.getElementById('Tag-Of-Row-More-Document');
                                        const dropdownContainer = document.getElementById('dropdown-for-choose-new-tag');

                                        // Tạo phần tử "No result" nếu chưa có
                                        let noResultDiv = dropdownContainer.querySelector('.no-result');
                                        if (!noResultDiv) {
                                            noResultDiv = document.createElement('div');
                                            noResultDiv.textContent = 'No result';
                                            noResultDiv.classList.add('no-result');
                                            noResultDiv.style.display = 'none'; // Ẩn ban đầu
                                            noResultDiv.style.padding = '0.5rem';
                                            noResultDiv.style.color = '#888';
                                            noResultDiv.style.textAlign = 'center';
                                            dropdownContainer.appendChild(noResultDiv);
                                        }

                                        function moveTag(tagButton, fromContainer, toContainer) {
                                            fromContainer.removeChild(tagButton);
                                            toContainer.appendChild(tagButton);
                                            checkDropdownEmpty(); // Kiểm tra xem dropdown có trống không
                                        }

                                        function addTagClickListener(container, fromContainer, toContainer) {
                                            container.addEventListener('click', (event) => {
                                                if (event.target.tagName === 'BUTTON') {
                                                    moveTag(event.target, fromContainer, toContainer);
                                                }
                                            });
                                        }

                                        function checkDropdownEmpty() {
                                            const buttons = dropdownContainer.querySelectorAll('button');
                                            noResultDiv.style.display = buttons.length === 0 ? 'block' : 'none';
                                        }

                                        addTagClickListener(tagContainer, tagContainer, dropdownContainer);
                                        addTagClickListener(dropdownContainer, dropdownContainer, tagContainer);
                                    }


                                    // Gọi hàm này sau khi load xong dữ liệu
                                    setupTagToggle();
                                }
                            });
                        }

                        tr.appendChild(td);
                        cellCount++;
                    });
                });

                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
            container.appendChild(table);
        } else {
            console.error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
}

// Chuyển đổi URL thành liên kết (Gọi sau cùng)
function convertUrlsToLinks(text) {
    var urlRegex = /(https?:\/\/[^\s<]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
}



async function loadTags() {
    const url = "https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=getTagForMoreDocumentsNew";
    try {
        const response = await fetch(url);
        const tags = await response.json();

        const dropdownDiv = document.getElementById("dropdown-for-choose-main-new-tag");
        const tagContainer = document.getElementById("tag-in-more-document");

        tags.forEach(tag => {
            // Tạo nút trong dropdown
            const tagButton = document.createElement("button");
            tagButton.textContent = tag;
            dropdownDiv.appendChild(tagButton);

            // Tạo checkbox dạng label trong #tag-in-more-document
            const wrapperDiv = document.createElement("div");

            const label = document.createElement("label");
            label.className = "checkbox-container";

            const input = document.createElement("input");
            input.className = "custom-checkbox";
            input.type = "checkbox";
            input.value = tag; // lưu giá trị tag khi cần dùng lại

            const checkmark = document.createElement("span");
            checkmark.className = "checkmark";

            const tagText = document.createElement("span");
            tagText.className = "tag-More-Documents";
            tagText.textContent = tag;

            label.appendChild(input);
            label.appendChild(checkmark);
            label.appendChild(tagText);
            wrapperDiv.appendChild(label);

            tagContainer.appendChild(wrapperDiv);
        });
    } catch (error) {
        console.error("Lỗi khi tải danh sách tag:", error);
    }
}

window.addEventListener("DOMContentLoaded", loadTags);












fetchAndDisplayAnnoucements();

async function fetchAndDisplayAnnoucements() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec?action=GetAnnoucements');
        const data = await response.json();

        function convertUrlsToLinks(text) {
            var urlRegex = /(https?:\/\/[^\s<]+)/g;
            text = text.replace(urlRegex, function (url) {
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            });
            return text.replace(/\n/g, '<br>');  // Convert line breaks to <br> tags
        }

        if (Array.isArray(data) && data.length > 0) {
            const container = document.querySelector('#Annoucements-table');
            container.innerHTML = '';

            const table = document.createElement('table');
            const tbody = document.createElement('tbody');

            data.forEach(row => {
                const tableRow = document.createElement('tr');
                const titleCell = document.createElement('td');
                titleCell.innerHTML = convertUrlsToLinks(row[0]);
                tableRow.appendChild(titleCell);

                tbody.appendChild(tableRow);
            });

            table.appendChild(tbody);
            container.appendChild(table);
        } else {
            console.error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
}


document.getElementById("refresh-annoucement-container").addEventListener("click", async function () {
    const statusContainer = document.getElementById('status-of-updating-Annoucements_container-container');
    statusContainer.innerHTML = "";
    statusContainer.style.backgroundColor = '';
    statusContainer.style.color = '';

    const loader = document.getElementById('loader-Annoucements_container');
    loader.classList.remove('hidden'); // Hiện loader

    const container = document.querySelector('#Annoucements-table');
    container.innerHTML = ''; // Xóa nội dung cũ

    await fetchAndDisplayAnnoucements(); // Chờ fetch hoàn tất

    loader.classList.add('hidden'); // Ẩn loader ngay sau khi fetch hoàn tất

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

});



//Push refresh all users
document.getElementById('Push-Refresh-All-User').addEventListener('click', function () {
    var scriptURL = 'https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec';

    var data = {
        action: 'setRefreshFlag',
        timestamp: new Date().getTime() // Gửi timestamp theo milliseconds
    };

    fetch(scriptURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data).toString()
    }).then(response => console.log('Push refresh signal sent with timestamp:', data.timestamp))
        .catch(error => console.error('Error:', error));
});


// //Kiểm tra timestamp để refresh all users
let lastTimestamp = null; // Lưu timestamp lần cuối

function checkRefreshTimestamp() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbxy2wam-fhMZKGwB5LrJWTT-sCzpCytwZhUIcjBhmx9SojWSuAwVudAPCRx0CN7488/exec";

    fetch(scriptURL + "?action=getRefreshFlag")
        .then(response => response.json())
        .then(data => {
            console.log("Timestamp mới:", data.refresh);

            if (lastTimestamp !== null && data.refresh !== lastTimestamp) {
                location.reload(); // Reload nếu timestamp thay đổi
            }

            lastTimestamp = data.refresh; // Cập nhật timestamp mới
        })
        .catch(error => console.error("Lỗi khi lấy timestamp:", error));
}

// Gọi hàm này mỗi 10 giây để kiểm tra
setInterval(checkRefreshTimestamp, 5000);