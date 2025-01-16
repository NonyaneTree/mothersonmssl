// Save data with a timestamp to localStorage
function saveDataWithExpiry() {
    const tableRows = document.querySelectorAll("#loadingSheet tbody tr");
    const data = [];

    // Collect table data
    tableRows.forEach((row) => {
        const rowData = {
            part: row.querySelector("td:nth-child(1) select").value,
            color: row.querySelector("td:nth-child(2) select").value,
            total: row.querySelector("td:nth-child(3)").textContent,
            rework: row.querySelector("td:nth-child(4) input").value,
            polished: row.querySelector("td:nth-child(5) input").value,
            scrap: row.querySelector("td:nth-child(6) input").value,
            remarks: row.querySelector("td:nth-child(7) input").value,
            date: row.querySelector("td:nth-child(8)").textContent,
        };
        data.push(rowData);
    });

    // Create an object with data and an expiry timestamp (1 month from now)
    const expiryTimestamp = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
    const storageObject = {
        data,
        expiry: expiryTimestamp,
    };

    // Save to localStorage
    localStorage.setItem("pp2_offloading_sheet", JSON.stringify(storageObject));
    alert("Data saved for a month!");
}

// Load data from localStorage if not expired
function loadDataWithExpiry() {
    const storedData = localStorage.getItem("pp2_offloading_sheet");

    if (storedData) {
        const { data, expiry } = JSON.parse(storedData);
        const now = new Date().getTime();

        // Check if data has expired
        if (now > expiry) {
            alert("Stored data has expired!");
            localStorage.removeItem("pp2_offloading_sheet"); // Remove expired data
            return;
        }

        // Populate table with stored data
        const tableBody = document.querySelector("#loadingSheet tbody");
        tableBody.innerHTML = ""; // Clear existing rows

        data.forEach((rowData) => {
            const newRow = document.createElement("tr");

            newRow.innerHTML = `
                <td>
                    <select>
                        <option value="H Bar_WLT" ${rowData.part === "H Bar_WLT" ? "selected" : ""}>H Bar_WLT</option>
                        <option value="H_Bar LTD" ${rowData.part === "H_Bar LTD" ? "selected" : ""}>H_Bar LTD</option>
                        <option value="WLT" ${rowData.part === "WLT" ? "selected" : ""}>WLT</option>
                        <option value="XLT" ${rowData.part === "XLT" ? "selected" : ""}>XLT</option>
                    </select>
                </td>
                <td>
                    <select>
                        <option value="Boulder Gray" ${rowData.color === "Boulder Gray" ? "selected" : ""}>Boulder Gray</option>
                        <option value="Black" ${rowData.color === "Black" ? "selected" : ""}>Black</option>
                    </select>
                </td>
                <td class="total-cell">${rowData.total || 0}</td>
                <td class="rework-cell"><input type="number" class="number-input" value="${rowData.rework || 0}" /></td>
                <td class="polished-cell"><input type="number" class="number-input" value="${rowData.polished || 0}" /></td>
                <td class="scrap-cell"><input type="number" class="number-input" value="${rowData.scrap || 0}" /></td>
                <td class="remarks-cell"><input type="number" class="number-input" value="${rowData.remarks || 0}" /></td>
                <td class="date-cell">${rowData.date || new Date().toDateString()}</td>
            `;
            tableBody.appendChild(newRow);
        });

        alert("Data loaded successfully!");
    } else {
        alert("No data found in local storage!");
    }
}

// Clear all stored data manually
function clearStoredData() {
    localStorage.removeItem("pp2_offloading_sheet");
    alert("Stored data cleared!");
}