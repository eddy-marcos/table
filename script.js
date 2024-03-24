function downloadSelectedRowsToExcel() {
  var iframeContent = $("#appFrame").contents();
  var selectedRows = iframeContent.find(".ag-row.selected");

  var wb = XLSX.utils.book_new();

  selectedRows.each(function (index) {
    var row = $(this);
    var rowData = [];
    row.find(".ag-cell").each(function () {
      var cellData = $(this).text().trim();
      rowData.push(cellData);
    });

    var ws = XLSX.utils.aoa_to_sheet([rowData]);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet" + (index + 1));
  });

  var excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  var blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "selected_rows.xlsx");
}

$("#downloadBtn").on("click", function () {
  downloadSelectedRowsToExcel();
});

$(document).ready(function () {
  $("#appFrame")
    .contents()
    .find(".ag-row")
    .on("click", function () {
      $(this).toggleClass("selected");
    });
});
