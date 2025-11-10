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
        return ContentService.createTextOutput('Personal SMS updated successfully.');
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

    var timestamp = new Date().getTime(); // Lấy timestamp hiện tại
    mainSheet.getRange("H2").setValue(timestamp); // Cập nhật vào ô H2

    return ContentService.createTextOutput("Refresh flag updated: " + timestamp);
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

    for (var col = 3; col <= lastColumn; col++) { // Cột C là chỉ mục 3
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
    case "GetMoreDocuments":
      return GetMoreDocuments(spreadsheet);
    case "GetMoreDocumentsNEW":
      return GetMoreDocumentsNEW(spreadsheet);
    case "GetAnnoucements":
      return GetAnnoucements(spreadsheet);
    case "getRefreshFlag":
      return getRefreshFlag(spreadsheet);

    default:
      return ContentService.createTextOutput(JSON.stringify({ error: "Invalid action" })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getLichTrucCopy(spreadsheet) {
  var targetSheet = spreadsheet.getSheetByName("Lich Truc (copy)");
  if (!targetSheet) {
    return ContentService.createTextOutput("Error: Sheet 'Lich Truc (copy)' not found.");
  }

  // Lấy tất cả dữ liệu từ sheet "Lich Truc (copy)"
  var data = targetSheet.getDataRange().getValues();

  // Xử lý định dạng ngày tháng (nếu cần)
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      if (Object.prototype.toString.call(data[i][j]) === "[object Date]") {
        // Chuyển ngày thành định dạng DD-MM
        data[i][j] = "Ngày " + Utilities.formatDate(data[i][j], Session.getScriptTimeZone(), "dd/MM");
      }
    }
  }

  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function getSMSData(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("SMS chung");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'SMS chung' not found.");
  }
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues();
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function CheckIDInformation(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("Main Interface");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'Main Interface' not found.");
  }

  // Chỉ lấy dữ liệu từ phạm vi A3:B12
  const data = sheet.getRange("A3:B12").getValues();

  // Lọc dữ liệu để chỉ lấy các dòng có thông tin trong cả cột A và B
  const filteredData = data.filter(row => row[0] !== "" && row[1] !== "");

  return ContentService.createTextOutput(JSON.stringify(filteredData)).setMimeType(ContentService.MimeType.JSON);
}

function GetServer(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("Main Interface");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'Server' not found.");
  }
  const data = sheet.getRange(3, 4, sheet.getLastRow() - 2, 3).getValues();

  // Lọc dữ liệu để chỉ lấy các dòng có thông tin trong cả cột A và B
  const filteredData = data.filter(function (row) {
    return row[0] !== "" && row[1] !== "" && row[2] !== ""; // Kiểm tra đều không rỗng
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


function GetMoreDocuments(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("More Documents");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'More Documents' not found.");
  }
  const data = sheet.getRange(1, 1, sheet.getLastRow(), 2).getValues(); // Get data from columns A and B
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function GetMoreDocumentsNEW(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("More Documents new");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'More Documents new' not found.");
  }

  const data = sheet.getRange("A:B").getValues().slice(1); // Lấy toàn bộ cột B
  const filteredData = data.filter(row => row[0]); // Loại bỏ các dòng trống

  return ContentService.createTextOutput(JSON.stringify(filteredData))
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

function getRefreshFlag(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("Main Interface");
  if (!sheet) {
    return ContentService.createTextOutput("Error: Sheet 'Main Interface' not found.");
  }
  var refreshFlag = sheet.getRange("H2").getValue().toString().trim();
  return ContentService.createTextOutput(JSON.stringify({ refresh: refreshFlag })).setMimeType(ContentService.MimeType.JSON);
}




