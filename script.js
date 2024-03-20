document.addEventListener("DOMContentLoaded", function () {
  const rows = document.querySelectorAll("#myTable tbody tr");
  rows.forEach((row) => {
    row.addEventListener("click", function () {
      this.classList.toggle("selected");
    });
  });
});

function downloadSelectedRows() {
  const selectedRows = Array.from(
    document.querySelectorAll("#myTable tbody tr.selected")
  );
  if (selectedRows.length === 0) {
    alert("No rows selected!");
    return;
  }

  const headers = Array.from(document.querySelectorAll("#myTable th")).map(
    (header) => header.innerText
  );
  const data = selectedRows.map((row) =>
    Array.from(row.children).map((cell) => cell.innerText)
  );

  const csvContent =
    headers.join(",") + "\n" + data.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "selected_rows.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
