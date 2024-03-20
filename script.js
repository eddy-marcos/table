$(document).ready(function () {
  $("#myTable tbody tr").click(function () {
    $(this).toggleClass("selected");
  });

  $("#downloadBtn").click(function () {
    const selectedRows = $("#myTable tbody tr.selected");
    if (selectedRows.length === 0) {
      alert("No rows selected!");
      return;
    }

    const wb = XLSX.utils.book_new();
    selectedRows.each(function (index) {
      const rowData = [];
      $(this)
        .find("td")
        .each(function () {
          rowData.push($(this).text());
        });
      const ws = XLSX.utils.aoa_to_sheet([rowData]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet " + (index + 1));
    });

    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      "selected_rows.xlsx"
    );
  });
});
