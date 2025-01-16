function saveToLocalStorage() {
    const rows = [];
    const tableRows = document.querySelectorAll("#loadingSheet tbody tr");

    tableRows.forEach((row) => {
        const data = {
            part: row.querySelector("td:nth-child(1) select").value,
            color: row.querySelector("td:nth-child(2) select").value,
            total: row.querySelector("td:nth-child(3)").innerText,
            rework: row.querySelector("td:nth-child(4) .number-input").value,
            polished: row.querySelector("td:nth-child(5) .number-input").value,
            scrap: row.querySelector("td:nth-child(6) .number-input").value,
            remarks: row.querySelector("td:nth-child(7) .number-input").value,
            date: row.querySelector("td:nth-child(8)").innerText, // Save the date
        };
        rows.push(data);
    });

    localStorage.setItem("pp2_offloading_sheet", JSON.stringify(rows));
    alert("Data saved to local storage!");
}
