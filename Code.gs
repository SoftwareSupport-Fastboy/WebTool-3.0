function doPost(e) {
  var action = e.parameter.action;
  var sheetName = e.parameter.sheetName || "Personal Account"; // Mặc định sử dụng sheet "Personal Account"

  // Lấy bảng tính và trang tính theo tên
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet not found.");
  }

  var rows = sheet.getDataRange().getValues();

  // Xử lý hành động "submit" để đăng ký người dùng
  if (action == "submit") {
    var name = e.parameter.name;
    var email = e.parameter.email;
    var text = e.parameter.text;

    var nameExists = false;
    var emailExists = false;

    for (var i = 1; i < rows.length; i++) { // Bỏ qua dòng tiêu đề
      if (rows[i][0] === name) {
        nameExists = true;
      }
      if (rows[i][1] === email) {
        emailExists = true;
      }
    }

    if (nameExists && emailExists) {
      return ContentService.createTextOutput("Error: Name and Email are already taken");
    } else if (nameExists) {
      return ContentService.createTextOutput("Error: Name is already taken");
    } else if (emailExists) {
      return ContentService.createTextOutput("Error: Email is already taken");
    }

    sheet.appendRow([name, email, text]);
    return ContentService.createTextOutput("Row added successfully!");
  }

  // Xử lý hành động "savenewinfo" để cập nhật thông tin người dùng dựa trên email
  if (action == "savenewinfo") {
    var name = e.parameter.name;
    var email = e.parameter.email;
    var text = e.parameter.text;

    var emailFound = false;

    for (var i = 1; i < rows.length; i++) { // Bỏ qua dòng tiêu đề
      if (rows[i][1] === email) {
        // Nếu email tồn tại, cập nhật name và text
        sheet.getRange(i + 1, 1).setValue(name); // Cột 1: name
        sheet.getRange(i + 1, 3).setValue(text); // Cột 3: text
        emailFound = true;
        break;
      }
    }

    if (emailFound) {
      return ContentService.createTextOutput("Update successfully!");
    } else {
      return ContentService.createTextOutput("Error: Email not found");
    }
  }

  // Xử lý hành động "check" để kiểm tra thông tin đăng nhập
  if (action == "check") {
    var email = e.parameter.email;
    var text = e.parameter.text;

    for (var i = 1; i < rows.length; i++) { // Bỏ qua dòng tiêu đề
      if (rows[i][1] == email && rows[i][2] == text) {
        // Trả về JSON chứa thông tin Name
        var result = {
          status: "Valid information",
          name: rows[i][0],
          role: rows[i][3]
        };
        return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "Invalid information" })).setMimeType(ContentService.MimeType.JSON);
  }

  // Xử lý hành động "getToDoList" để lấy danh sách công việc từ cột E dựa trên email
  if (action == "getToDoList") {
    const email = e.parameter.email;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === email) {
        const toDoList = rows[i][4] || ''; // Cột E (chỉ số 4)
        return ContentService.createTextOutput(toDoList);
      }
    }
    return ContentService.createTextOutput(''); // Trả về chuỗi rỗng nếu không tìm thấy email
  }

  // Xử lý hành động "saveToDoList" để lưu hoặc cập nhật danh sách công việc
  if (action == "saveToDoList") {
    const email = e.parameter.email;
    const toDoList = e.parameter.toDoList;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === email) {
        sheet.getRange(i + 1, 5).setValue(toDoList); // Cập nhật nội dung mới vào cột E
        return ContentService.createTextOutput('To-do list updated successfully.');
      }
    }
    return ContentService.createTextOutput('Error: Email not found.');
  }

  // Xử lý hành động "getPersonalSMS" để lấy danh sách SMS từ cột F dựa trên email
  if (action == "getPersonalSMS") {
    const email = e.parameter.email;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === email) {
        const toDoList = rows[i][5] || ''; // Cột F
        return ContentService.createTextOutput(toDoList);
      }
    }
    return ContentService.createTextOutput(''); // Trả về chuỗi rỗng nếu không tìm thấy email
  }

  // Xử lý hành động "savePersonalSMS" để lưu hoặc cập nhật danh sách SMS
  if (action == "savePersonalSMS") {
    const email = e.parameter.email;
    const personalSMS = e.parameter.personalSMS; // Assuming the personal SMS list is passed in the parameter

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === email) { // Compare email with column B
        sheet.getRange(i + 1, 6).setValue(personalSMS); // Update content in column F (index 5)
        return ContentService.createTextOutput('Đã lưu thành công');
      }
    }
    return ContentService.createTextOutput('Error: Email not found.');
  }

  // Xử lý hành động "editA1-trong-lich-truc-copy" để chỉnh sửa ô A1 trong sheet "Lich Truc (copy)"
  if (action == "editA1-trong-lich-truc-copy") {
    var value = e.parameter.value;
    var targetSheet = spreadsheet.getSheetByName("Lich Truc (copy)");
    if (!targetSheet) {
      return ContentService.createTextOutput("Error: Sheet 'Lich Truc (copy)' not found.");
    }

    targetSheet.getRange("A1").setValue(value); // Cập nhật giá trị cho ô A1
    return ContentService.createTextOutput("A1 updated successfully!");
  }

  // Action: ChatGPTAnswer
  if (action == "ChatGPTAnswer") {
    const email = e.parameter.email;

    for (var i = 1; i < rows.length; i++) { // Bỏ qua dòng tiêu đề
      if (rows[i][1] === email) { // So sánh với cột B (email)
        const customData = rows[i][7]; // Lấy dữ liệu từ cột H (chỉ số 7)
        return ContentService.createTextOutput(customData);
      }
    }
    return ContentService.createTextOutput("Error: Email not found.");
  }

  // Action: QuestionToChatGPT
  if (action == "QuestionToChatGPT") {
    const email = e.parameter.email;
    const question = e.parameter.question;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === email) {
        sheet.getRange(i + 1, 7).setValue(question); // Cập nhật nội dung mới vào cột G
        return ContentService.createTextOutput('QuestionToChatGPT updated successfully.');
      }
    }
    return ContentService.createTextOutput('Error: Email not found.');
  }

  // Action: setRefreshFlag
  if (action == "setRefreshFlag") {
    var mainSheet = spreadsheet.getSheetByName("Main Interface");
    if (!mainSheet) {
      return ContentService.createTextOutput("Error: Sheet 'Main Interface' not found.");
    }

    // Tìm ô chứa chữ "Refresh All Trigger"
    var range = mainSheet.getDataRange();
    var values = range.getValues();
    var found = false;

    for (var i = 0; i < values.length; i++) {
      for (var j = 0; j < values[i].length; j++) {
        if (values[i][j] === "Refresh All Trigger") {
          var timestamp = new Date().getTime(); // Lấy timestamp hiện tại
          mainSheet.getRange(i + 2, j + 1).setValue(timestamp); // ô bên dưới = i+2 (vì i bắt đầu từ 0), cột j+1
          found = true;
          return ContentService.createTextOutput("Refresh flag updated: " + timestamp);
        }
      }
    }

    if (!found) {
      return ContentService.createTextOutput("Error: 'Refresh All Trigger' not found.");
    }
  }


  // Action: RequestEditRowMoreDocumentsNew
  if (action == "RequestEditRowMoreDocumentsNew") {
    var lookupValue = e.parameter.lookupValue; // Giá trị để tìm trong cột A
    var newValue = e.parameter.newValue; // Dữ liệu mới cần ghi
    var sheet = spreadsheet.getSheetByName("More Documents new");

    if (!sheet) {
      return ContentService.createTextOutput("Error: Sheet 'More Documents new' not found.");
    }

    var data = sheet.getDataRange().getValues();
    var rowIndex = -1;

    // Tìm hàng chứa lookupValue trong cột A
    for (var i = 1; i < data.length; i++) { // Bỏ qua tiêu đề (nếu có)
      if (Number(data[i][0]) === Number(lookupValue)) {
        rowIndex = i + 1; // Chuyển về chỉ mục sheet
        break;
      }
    }

    if (rowIndex === -1) {
      return ContentService.createTextOutput("Error: Lookup value not found in column A.");
    }

    // Tìm cột trống gần nhất từ cột C trở đi
    var lastColumn = sheet.getMaxColumns();
    var targetColumn = -1;

    for (var col = 4; col <= lastColumn; col++) { // Cột C là chỉ mục 3
      if (!sheet.getRange(rowIndex, col).getValue()) { // Nếu ô trống
        targetColumn = col;
        break;
      }
    }

    if (targetColumn === -1) {
      return ContentService.createTextOutput("Error: No empty columns available.");
    }

    sheet.getRange(rowIndex, targetColumn).setValue(newValue);
    return ContentService.createTextOutput("Row updated successfully!");
  }

  // Xử lý hành động "getPersonalFavoriteRowInMoreDocumentNEW" để lấy danh sách các dòng yêu thích ở cột I dựa trên email
  if (action == "getPersonalFavoriteRowInMoreDocumentNEW") {
    const email = e.parameter.email;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === email) {
        const toDoList = rows[i][8] || ''; // Cột F
        return ContentService.createTextOutput(toDoList);
      }
    }
    return ContentService.createTextOutput(''); // Trả về chuỗi rỗng nếu không tìm thấy email
  }

  // Xử lý hành động "SavePersonalFavoriteRowInMoreDocumentNEW" để lưu danh sách các dòng yêu thích ở cột I dựa trên email lưu hoặc cập nhật danh sách SMS
  if (action == "SavePersonalFavoriteRowInMoreDocumentNEW") {
    const email = e.parameter.email;
    const personalFavoriteRow = e.parameter.personalFavoriteRow; // Assuming the personal SMS list is passed in the parameter

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === email) {
        sheet.getRange(i + 1, 9).setValue(personalFavoriteRow); // Cột I là cột thứ 9
        return ContentService.createTextOutput('Personal Favorite Row updated successfully.');
      }
    }
    return ContentService.createTextOutput('Error: Email not found.');
  }

  // Action: RequestAddingNEWRowIntoMoreDocumentsNew
  if (action == "RequestAddingNEWRowIntoMoreDocumentsNew") {
    var newValue = e.parameter.newValue; // Dữ liệu mới cần ghi
    var sheet = spreadsheet.getSheetByName("More Documents new");

    if (!sheet) {
      return ContentService.createTextOutput("Error: Sheet 'More Documents new' not found.");
    }

    // Lấy toàn bộ dữ liệu trong bảng
    var data = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();

    // Tìm hàng cuối thực sự có dữ liệu ở cột A hoặc B
    var realLastRow = 0;
    for (var i = data.length - 1; i >= 0; i--) {
      if ((data[i][0] !== "" && data[i][0] !== null) || (data[i][1] !== "" && data[i][1] !== null)) {
        realLastRow = i + 1;
        break;
      }
    }

    var newRow = realLastRow + 1;

    // Lấy giá trị cột A của hàng cuối, và +1
    var lastNumber = Number(data[realLastRow - 1][0]); // [row][col], col=0 là cột A
    if (isNaN(lastNumber)) lastNumber = 0;
    var newNumber = lastNumber + 1;

    // Ghi dữ liệu vào hàng mới
    sheet.getRange(newRow, 1).setValue(newNumber);     // Cột A
    sheet.getRange(newRow, 4).setValue(newValue);      // Cột D

    return ContentService.createTextOutput("New row added at row " + newRow + " with ID " + newNumber);
  }

  // Action: EraseCellAfterDenyMoreDocumentNEW dùng để xoá request
  if (action == "EraseCellAfterDenyMoreDocumentNEW") {
    var cell = e.parameter.cell; // Địa chỉ ô cần xoá
    var sheet = spreadsheet.getSheetByName("More Documents new");

    if (!sheet) {
      return ContentService.createTextOutput("Error: Sheet 'More Documents new' not found.");
    }

    try {
      // Xoá nội dung ô
      sheet.getRange(cell).setValue("");
      return ContentService.createTextOutput("Success: Erased content at cell " + cell);
    } catch (error) {
      return ContentService.createTextOutput("Error while erasing cell: " + error.message);
    }
  }

  // Action: UpdateColumnBAfterFoundIDInMoreDocumentsNew dùng để thay thế request vào origin
  if (action == "UpdateColumnBAfterFoundIDInMoreDocumentsNew") {
    var id = e.parameter.id;
    var contentToSend = e.parameter.contentToSend;
    var sheet = spreadsheet.getSheetByName("More Documents new");

    if (!sheet) {
      return ContentService.createTextOutput("Error: Sheet 'More Documents new' not found.");
    }

    var data = sheet.getDataRange().getValues();
    var found = false;

    for (var i = 1; i < data.length; i++) {
      if (Number(data[i][0]) === Number(id)) {
        var rowIndex = i + 1;
        sheet.getRange(rowIndex, 2).setValue(""); // Xoá ô cột B
        sheet.getRange(rowIndex, 2).setValue(contentToSend); // Ghi nội dung mới
        found = true;
        break;
      }
    }

    if (found) {
      return ContentService.createTextOutput("Success: Updated content in column B for ID " + id);
    } else {
      return ContentService.createTextOutput("Error: ID not found in column A.");
    }
  }








}



function doGet(e) {
  const action = e.parameter.action;
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  switch (action) {
    case "getLichTrucCopy":
      return getLichTrucCopy(spreadsheet);
    case "getSMSData":
      return getSMSData(spreadsheet);
    case "CheckIDInformation":
      return CheckIDInformation(spreadsheet);
    case "GetServer":
      return GetServer(spreadsheet);
    case "GetOtherDocuments":
      return GetOtherDocuments(spreadsheet);
    //    case "GetMoreDocuments":
    //      return GetMoreDocuments(spreadsheet);
    case "GetMoreDocumentsNEW":
      return GetMoreDocumentsNEW(spreadsheet);
    case "GetMoreDocumentsNewVersion":
      return GetMoreDocumentsNewVersion(spreadsheet);
    case "GetAnnoucements":
      return GetAnnoucements(spreadsheet);
    case "getRefreshFlag":
      return getRefreshFlag(spreadsheet);
    case "getTagForMoreDocumentsNew":
      return getTagForMoreDocumentsNew(spreadsheet);
    case "getNumbersOfRequestInMoreDocumentNEW":
      return getNumbersOfRequestInMoreDocumentNEW(spreadsheet);
    case "getAllIdRequestEditOrRequestDeleteMoreDocumentNEW":
      return getAllIdRequestEditOrRequestDeleteMoreDocumentNEW(spreadsheet);
    case "getMiniRunningAnnoucement":
      return getMiniRunningAnnoucement(spreadsheet);
    case "checkIPAccess":
      return checkIPAccess(spreadsheet, e);



    default:
      return ContentService.createTextOutput(JSON.stringify({ error: "Invalid action" })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getLichTrucCopy(spreadsheet) {
  var targetSheet = spreadsheet.getSheetByName("Lich Truc (copy)");
  if (!targetSheet) {
    return ContentService.createTextOutput("Error: Sheet 'Lich Truc (copy)' not found.");
  }

  var data = targetSheet.getDataRange().getValues();
  var timeZone = Session.getScriptTimeZone();
  var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // 1. Lọc bỏ toàn bộ dòng có chứa chữ "software support"
  var filteredData = data.filter(function (row) {
    return !row.join(" ").toLowerCase().includes("software support");
  });

  // 2. Tìm cột nào có chứa chữ "tổng số ngày"
  var columnsToRemove = [];
  var lowerCaseMatrix = filteredData.map(r => r.map(c => String(c).toLowerCase()));

  for (var col = 0; col < lowerCaseMatrix[0].length; col++) {
    for (var row = 0; row < lowerCaseMatrix.length; row++) {
      if (lowerCaseMatrix[row][col].includes("tổng số ngày")) {
        columnsToRemove.push(col);
        break;
      }
    }
  }

  // 3. Xóa các cột tìm được
  if (columnsToRemove.length > 0) {
    // Sắp xếp ngược để splice không bị lệch index
    columnsToRemove.sort((a, b) => b - a);

    filteredData = filteredData.map(function (row) {
      columnsToRemove.forEach(function (colIndex) {
        row.splice(colIndex, 1);
      });
      return row;
    });
  }

  // 4. Format ngày sau khi đã xoá cột
  for (var i = 0; i < filteredData.length; i++) {
    for (var j = 0; j < filteredData[i].length; j++) {
      if (Object.prototype.toString.call(filteredData[i][j]) === "[object Date]") {
        var date = filteredData[i][j];
        var dayName = daysOfWeek[date.getDay()];
        var dateFormatted = Utilities.formatDate(date, timeZone, "dd/MM");
        filteredData[i][j] = dayName + ", " + dateFormatted + " (TX)";
      }
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify(filteredData))
    .setMimeType(ContentService.MimeType.JSON);
}


function getSMSData(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("SMS chung");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'SMS chung' not found.");
  }
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues();
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}


// Lấy Profile, Contact, Tickets, Insight, Open Tickets
function CheckIDInformation(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("Main Interface");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'Main Interface' not found.");
  }

  const data = sheet.getRange("A3:C12").getValues();

  // Lọc dữ liệu để chỉ lấy các dòng có thông tin trong cả cột A và B
  const filteredData = data.filter(row => row[0] !== "" && row[1] !== "");

  return ContentService.createTextOutput(JSON.stringify(filteredData)).setMimeType(ContentService.MimeType.JSON);
}

// Lấy server của insight
function GetServer(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("Main Interface");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'Main Interface' not found.");
  }

  // Lấy dữ liệu từ cột D đến F, bắt đầu từ hàng 3 tới hàng cuối cùng
  const lastRow = sheet.getLastRow();
  const dataRange = "E3:G" + lastRow;
  const data = sheet.getRange(dataRange).getValues();

  const filteredData = data.filter(function (row) {
    return row[0] !== "" && row[1] !== "" && row[2] !== "";
  });

  return ContentService.createTextOutput(JSON.stringify(filteredData)).setMimeType(ContentService.MimeType.JSON);
}


function GetOtherDocuments(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("Main Interface");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'Main Interface' not found.");
  }

  // Chỉ lấy dữ liệu từ phạm vi A16:B35
  const data = sheet.getRange("A16:B35").getValues();

  // Lọc dữ liệu để chỉ lấy các dòng có thông tin trong cả cột A và B
  const filteredData = data.filter(row => row[0] !== "" && row[1] !== "");

  return ContentService.createTextOutput(JSON.stringify(filteredData)).setMimeType(ContentService.MimeType.JSON);
}


//function GetMoreDocuments(spreadsheet) {
//  const sheet = spreadsheet.getSheetByName("More Documents");
//  if (!sheet) {
//    return ContentService.createTextOutput("Error: Sheet 'More Documents' not found.");
//  }
//  const data = sheet.getRange(1, 1, sheet.getLastRow(), 2).getValues(); // Get data from columns A and B
//  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
//}

function GetMoreDocumentsNEW(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("More Documents new");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'More Documents new' not found.");
  }

  const data = sheet.getRange("A:B").getValues().slice(1); // Lấy toàn bộ cột A và B, bỏ dòng tiêu đề
  const filteredData = data.filter(row => row[0] && row[1]); // Chỉ giữ lại dòng có cả cột A và B

  return ContentService.createTextOutput(JSON.stringify(filteredData))
    .setMimeType(ContentService.MimeType.JSON);
}



function GetMoreDocumentsNewVersion(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("More Documents new");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'More Documents new' not found.");
  }

  const data = sheet.getRange("A:B").getValues().slice(1); // Lấy toàn bộ cột A và B, bỏ dòng tiêu đề
  const filteredData = data.filter(row => row[0] && row[1]); // Chỉ giữ lại dòng có cả cột A và B

  const parsedData = filteredData.map(row => {
    const id = row[0];
    const rawText = row[1];

    // Decode HTML entities
    const decodedText = rawText
      .replace(/\\u003C/g, "<")
      .replace(/\\u003E/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/​/g, ""); // loại bỏ ký tự zero-width space (nếu có)

    // Tách Title và Content
    const parts = decodedText.split("{-}");
    const titleAndTags = parts[0] ? parts[0].trim() : "";
    const content = parts[1] ? parts[1].trim().replace(/<br\s*\/?>/gi, "\n") : "";

    // Tách Tag nếu có
    let title = titleAndTags;
    let tags = [];
    const tagMatch = titleAndTags.match(/\[TAG:(.*?)\]/);
    if (tagMatch) {
      const tagString = tagMatch[1];
      tags = tagString.split(",").map(tag => tag.trim());
      title = titleAndTags.replace(tagMatch[0], "").trim(); // remove [TAG:...] khỏi title
    }

    // Xóa thẻ HTML còn lại nếu có trong title
    title = title.replace(/<[^>]+>/g, "");

    return {
      id,
      title,
      tags,
      content
    };
  });

  return ContentService.createTextOutput(JSON.stringify(parsedData))
    .setMimeType(ContentService.MimeType.JSON);
}



function GetAnnoucements(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("Annoucements");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'Annoucements' not found.");
  }
  const data = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues(); // Get data from columns A and B
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

//Xác định ô có chứa timestamp (là ô nằm dưới ô có giá trị "Refresh All Trigger")
function getRefreshFlag(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("Main Interface");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'Main Interface' not found.");
  }

  // Tìm ô chứa chữ "Refresh All Trigger"
  const range = sheet.getDataRange();
  const values = range.getValues();
  let refreshFlag = null;

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      if (values[i][j] === "Refresh All Trigger") {
        refreshFlag = sheet.getRange(i + 2, j + 1).getValue().toString().trim(); // lấy ô ngay bên dưới
        break;
      }
    }
    if (refreshFlag !== null) break;
  }

  if (refreshFlag === null) {
    return ContentService.createTextOutput("Error: 'Refresh All Trigger' not found.");
  }

  return ContentService.createTextOutput(JSON.stringify({ refresh: refreshFlag })).setMimeType(ContentService.MimeType.JSON);
}


// Lấy các Tag của More Documents New
function getTagForMoreDocumentsNew(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("Main Interface");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'Main Interface' not found.");
  }

  const range = sheet.getDataRange();
  const values = range.getValues();
  let startRow = null;
  let col = null;

  // Tìm ô chứa "Tag For More Documents New"
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      if (values[i][j] === "Tag For More Documents New") {
        startRow = i + 2; // ô bên dưới = hàng i + 2 (vì i bắt đầu từ 0)
        col = j + 1;      // cột j + 1
        break;
      }
    }
    if (startRow !== null) break;
  }

  if (startRow === null) {
    return ContentService.createTextOutput("Error: 'Tag For More Documents New' not found.");
  }

  // Lấy toàn bộ các ô bên dưới
  const lastRow = sheet.getLastRow();
  const dataRange = sheet.getRange(startRow, col, lastRow - startRow + 1, 1);
  const data = dataRange.getValues();

  // Lọc bỏ các ô trống
  const filteredData = data.filter(row => row[0] !== "");

  return ContentService.createTextOutput(JSON.stringify(filteredData)).setMimeType(ContentService.MimeType.JSON);
}


function getNumbersOfRequestInMoreDocumentNEW(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("More Documents new");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'More Documents new' not found.");
  }

  const data = sheet.getRange(2, 4, sheet.getLastRow() - 1, sheet.getLastColumn() - 3).getValues();
  let count = 0;
  for (let row of data) {
    for (let cell of row) {
      if (cell !== "") count++;
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ count })).setMimeType(ContentService.MimeType.JSON);
}

function getAllIdRequestEditOrRequestDeleteMoreDocumentNEW(spreadsheet) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("More Documents new");

  if (!sheet) {
    return ContentService.createTextOutput("Sheet 'More Documents new' not found")
      .setMimeType(ContentService.MimeType.TEXT);
  }

  const data = sheet.getRange("A2:AA").getValues(); // Lấy từ A2 đến AA để có đủ dữ liệu
  const results = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const id = row[0];      // Cột A (ID)
    const colB = row[1];    // Cột B (nội dung gốc nếu có)

    const rowResults = [];  // Danh sách tạm để chứa các Request trong hàng này
    let hasEditRequest = false;

    for (let j = 3; j < row.length; j++) { // Duyệt từ cột D trở đi
      const cellValue = row[j];

      if (cellValue !== "") {
        const status = colB !== "" ? "RequestEdit" : "RequestAddNew";

        const columnLetter = getColumnLetter(j + 1);
        const cellAddress = columnLetter + (i + 2);

        rowResults.push({
          id: id,
          status: status,
          content: cellValue,
          cell: cellAddress
        });

        if (status === "RequestEdit") {
          hasEditRequest = true;
        }
      }
    }

    // Nếu có RequestEdit thì thêm Origin vào đầu
    if (hasEditRequest) {
      rowResults.unshift({
        id: id,
        status: "ORIGIN (GỐC)",
        content: colB,
        cell: "B" + (i + 2)
      });
    }

    // Thêm tất cả phần tử của hàng này vào kết quả chung
    results.push(...rowResults);
  }

  return ContentService
    .createTextOutput(JSON.stringify(results))
    .setMimeType(ContentService.MimeType.JSON);

  function getColumnLetter(col) {
    let letter = '';
    while (col > 0) {
      const mod = (col - 1) % 26;
      letter = String.fromCharCode(65 + mod) + letter;
      col = Math.floor((col - mod) / 26);
    }
    return letter;
  }
}


function getMiniRunningAnnoucement(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("Main Interface");
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ error: "Sheet 'Main Interface' not found" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const range = sheet.getRange("K3:N10");
  const values = range.getValues();

  // Lọc bỏ những dòng có ô trống
  const filtered = values.filter(row => row.every(cell => cell !== "" && cell !== null));

  return ContentService.createTextOutput(JSON.stringify({ data: filtered }))
    .setMimeType(ContentService.MimeType.JSON);
}

function checkIPAccess(spreadsheet, e) {
  var ipToCheck = e.parameter.ip;
  if (!ipToCheck) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: "No IP provided" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var sheet = spreadsheet.getSheetByName("Main Interface");
  if (!sheet) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: "Sheet not found" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var values = sheet.getRange("B39:B58").getValues();
  var allowedIPs = values.flat().filter(ip => ip.toString().trim() !== "");

  var isAllowed = allowedIPs.includes(ipToCheck);

  return ContentService.createTextOutput(
    JSON.stringify({ allowed: isAllowed })
  ).setMimeType(ContentService.MimeType.JSON);
}

