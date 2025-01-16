function addRow() {
    const table = document.getElementById("loadingSheet").querySelector("tbody");
    const newRow = table.rows[0].cloneNode(true);

    // Reset inputs and total for the new row
    const inputs = newRow.querySelectorAll("input");
    inputs.forEach((input) => (input.value = 0));
    newRow.querySelector(".total-cell").textContent = "0";
    newRow.querySelector(".date-cell").textContent = new Date().toDateString(); // Add date

    table.appendChild(newRow);
}