document.getElementById("downloadPDF").addEventListener("click", function () {
    const cityNames_eng = {
        "0": "Dhaka",
        "1": "Madaripur, Barisal, Shariatpur, Tangail, Jamalpur, Kurigram, Manikganj",
        "2": "Faridpur, Jhalokathi, Sirajganj, Patuakhali, Sherpur, Bagerhat",
        "3": "Pirojpur, Bogura, Gopalganj, Barguna, Khulna, Narail, Gaibandha",
        "4": "Magura, Rajbari, Rangpur, Bogura, Kurigram",
        "5": "Kushtia, Jashore, Jhenaidah, Pabna, Satkhira, Lalmonirhat",
        "6": "Chuadanga, Natore, Joypurhat, Naogaon",
        "7": "Meherpur, Rajshahi, Nilphamari, Dinajpur",
        "8": "Panchagarh",
        "9": "Chapai Nawabganj, Thakurgaon",
        "-1": "Gazipur, Mymensingh, Chandpur, Munshiganj, Narayanganj, Narsingdi, Netrokona, Pirojpur",
        "-2": "Bhola, Lakshmipur, Kishoreganj",
        "-3": "Brahmanbaria, Noakhali",
        "-4": "Habiganj, Comilla, Sunamganj",
        "-5": "Feni",
        "-6": "Moulvibazar, Sylhet, Chattogram",
        "-7": "Khagrachari, Cox's Bazar",
        "-8": "Rangamati, Bandarban"
    };

    const { jsPDF } = window.jspdf;
    let pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    let selectedValue = document.getElementById("district").value;
    let selectedCityTextEng = cityNames_eng[selectedValue];

    // Set title with larger font size and blue color
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 102, 204);  // Blue title
    pdf.text(selectedCityTextEng + " - Ramadan Calendar (2025)", 10, 10);

    // Header background rectangle
    pdf.setFillColor(0, 102, 204); // Blue color for header
    pdf.rect(0, 0, 210, 20, 'F');

    // White text on the header background
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.text(selectedCityTextEng + " - Ramadan Calendar (2025)", 10, 10);

    let currentYPosition = 25;  // Set starting Y position for the content

    // Function to extract table data from HTML and generate table with headers
    function addTable(title, tableId) {
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(0, 102, 204);
        pdf.text(title, 10, currentYPosition);
        currentYPosition += 5;

        // Extract table data from HTML
        let table = document.querySelector(tableId);
        let tableData = [];
        let rows = table.querySelectorAll("tr");

        rows.forEach((row, rowIndex) => {
            let rowData = [];
            let cells = row.querySelectorAll("td, th");
            cells.forEach(cell => rowData.push(cell.innerText.trim()));
            tableData.push(rowData);
        });

        pdf.autoTable({
            startY: currentYPosition,
            head: [["Day", "Date", "Day of Week", "Sehri (AM)", "Iftar (PM)"]],  // Manually added headers
            body: tableData, // Table content from HTML
            styles: {
                fontSize: 8,
                cellPadding: 1,
                halign: 'center',
                valign: 'middle',
                textColor: [0, 0, 0],  // Black text
                lineColor: [0, 102, 204],
                lineWidth: 0.1
            },
            headStyles: {
                fillColor: [0, 102, 204],  // Blue header
                textColor: [255, 255, 255], // White header text
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240]  // Light gray alternate rows
            },
            margin: { top: 5, left: 10, right: 10 },
            pageBreak: 'avoid'  // Ensures everything stays on one page
        });

        currentYPosition = pdf.lastAutoTable.finalY + 5;
    }

    // Add tables with headers
    addTable("Rahmah (Mercy) - Days 1-10", "#rahmahBody");
    addTable("Maghfirah (Forgiveness) - Days 11-20", "#maghfirahBody");
    addTable("Najah (Salvation) - Days 21-30", "#najahBody");

    // Add Credit Section
    currentYPosition += 5;
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 0, 0);
    pdf.text("Prepared by:", 10, currentYPosition);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.text("Md Khorshed Alom", 10, currentYPosition + 5);
    pdf.text("B.Sc. in CSE, Stamford University Bangladesh", 10, currentYPosition + 10);
    pdf.text("Contact: khorshed.cse.se@gmail.com", 10, currentYPosition + 15);

    pdf.save(`Ramadan_Calendar_2025_${selectedCityTextEng}.pdf`);
});
