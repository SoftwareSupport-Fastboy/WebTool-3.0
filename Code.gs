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

  // Xử lý hành động "check" để kiểm tra thông tin đăng nhập
  if (action == "check") {
    var email = e.parameter.email;
    var text = e.parameter.text;

    for (var i = 1; i < rows.length; i++) { // Bỏ qua dòng tiêu đề
      if (rows[i][1] == email && rows[i][2] == text) {
        return ContentService.createTextOutput("Valid information");
      }
    }

    return ContentService.createTextOutput("Invalid information");
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

  // Xử lý hành động "getLichTrucCopy" để lấy nội dung từ sheet "Lich Truc (copy)"
if (action == "getLichTrucCopy") {
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
                data[i][j] = "Ngày " + Utilities.formatDate(data[i][j], Session.getScriptTimeZone(), "dd");
            }
        }
    }

    // Chuyển dữ liệu thành JSON để dễ sử dụng trong frontend
    var jsonData = JSON.stringify(data);
    return ContentService.createTextOutput(jsonData).setMimeType(ContentService.MimeType.JSON);
}

}