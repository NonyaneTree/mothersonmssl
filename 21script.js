let doc; // Declare jsPDF document object globally

function initializePDF() {
    const { jsPDF } = window.jspdf;
    doc = new jsPDF(); // Initialize jsPDF instance

    doc.setFontSize(16);
    doc.text("PP2 Off Loading Sheet", 10, 10);

    let y = 20;
    doc.setFontSize(12);
    doc.text("Part", 10, y);
    doc.text("Color", 60, y);
    doc.text("Total", 110, y);
    doc.text("Rework (Defect)", 140, y);
    doc.text("Polished", 180, y);
    doc.text("Scrap (Defect)", 220, y);
    doc.text("Remarks", 260, y);
    doc.text("Date", 280, y); // Include the Date column
    y += 10;
}

function addDataToPDF(row) {
    const cells = row.querySelectorAll("td");
    const reworkDefect = cells[3].querySelector("select").value;
    const scrapDefect = cells[5].querySelector("select").value;
    const date = cells[7].querySelector("input").value; // Date value

    // Create the text string for each row
    const rowText = `${cells[0].querySelector("select").value} | ${cells[1].querySelector("select").value} | ${cells[2].textContent} | ${cells[3].querySelector("input").value} (${reworkDefect}) | ${cells[4].querySelector("input").value} | ${cells[5].querySelector("input").value} (${scrapDefect}) | ${cells[6].querySelector("input").value} | ${date}`;
    
    // Add the row data to doc.text
    let y = doc.internal.pageSize.height - 10;
    doc.text(rowText, 10, y);
}

function generatePDF() {
    // Create PDF with all data stored in doc.text
    doc.save("PP2_Off_Loading_Sheet.pdf");
}

// Add event listener for each Add button in the table
function addEventListenersToAddButtons() {
    const addButtons = document.querySelectorAll(".calc-btn");
    addButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            const row = event.target.closest("tr"); // Find the row the button belongs to
            addDataToPDF(row); // Add the row data to the PDF
        });
    });
}

// Run this function on page load or after dynamic content loading
function loadTableData() {
    // Your logic to load the table rows, which may be dynamic
    addEventListenersToAddButtons(); // Attach event listeners to add buttons
}

document.getElementById("compileBtn").addEventListener("click", generatePDF);

// Initialize PDF when the page loads
initializePDF();
loadTableData();
