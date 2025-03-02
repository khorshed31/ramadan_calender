const ramadanStart = new Date(2025, 2, 2);
    const dhakaTimings = [
        ["05:04", "06:02"], ["05:03", "06:03"], ["05:02", "06:03"],
        ["05:01", "06:04"], ["05:00", "06:04"], ["04:59", "06:05"],
        ["04:58", "06:05"], ["04:57", "06:06"], ["04:56", "06:06"],
        ["04:55", "06:06"], ["04:54", "06:07"], ["04:53", "06:07"],
        ["04:52", "06:08"], ["04:51", "06:08"], ["04:50", "06:08"],
        ["04:49", "06:09"], ["04:48", "06:09"], ["04:47", "06:10"],
        ["04:46", "06:10"], ["04:45", "06:10"], ["04:44", "06:11"],
        ["04:43", "06:11"], ["04:42", "06:11"], ["04:41", "06:12"],
        ["04:40", "06:12"], ["04:39", "06:13"], ["04:38", "06:13"],
        ["04:36", "06:14"], ["04:35", "06:14"], ["04:34", "06:15"]
    ];

    // Adjust timings based on the district value
    function adjustTime(time, adjustment) {
        let [hours, minutes] = time.split(":").map(Number);
        minutes += adjustment;
        if (minutes >= 60) { hours += 1; minutes -= 60; }
        if (minutes < 0) { hours -= 1; minutes += 60; }
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    // Update all timings based on the selected district
    function updateTimes() {
        let districtValue = parseInt(document.getElementById("district").value);
        let selectedCityText = document.getElementById("selectedCity");

        let rahmahBody = document.getElementById("rahmahBody");
        let maghfirahBody = document.getElementById("maghfirahBody");
        let najahBody = document.getElementById("najahBody");
    
            const cityNames = {
                "0": "ঢাকা",
                "1": "মাদারীপুর, বরিশাল, শরীয়তপুর, টাঙ্গাইল, জামালপুর, কুড়িগ্রাম, মানিকগঞ্জ",
                "2": "ফরিদপুর, ঝালকাঠি, সিরাজগঞ্জ, পটুয়াখালী, শেরপুর, বাগেরহাট",
                "3": "পিরোজপুর, বগুড়া, গোপালগঞ্জ, বরগুনা, খুলনা, নড়াইল, গাইবান্ধা",
                "4": "মাগুরা, রাজবাড়ী, রংপুর, বগুড়া, কুড়িগ্রাম",
                "5": "কুষ্টিয়া, যশোর, ঝিনাইদহ, পাবনা, সাতক্ষীরা, লালমনিরহাট",
                "6": "চুয়াডাঙ্গা, নাটোর, জয়পুরহাট, নওগাঁ",
                "7": "মেহেরপুর, রাজশাহী, নীলফামারী, দিনাজপুর",
                "8": "পঞ্চগড়",
                "9": "চাঁপাইনবাবগঞ্জ, ঠাকুরগাঁও",
                "-1": "গাজীপুর, ময়মনসিংহ, চাঁদপুর, মুন্সিগঞ্জ, নারায়ণগঞ্জ, নরসিংদী, নেত্রকোনা, পিরোজপুর",
                "-2": "ভোলা, লক্ষ্মীপুর, কিশোরগঞ্জ",
                "-3": "ব্রাহ্মণবাড়িয়া, নোয়াখালী",
                "-4": "হবিগঞ্জ, কুমিল্লা, সুনামগঞ্জ",
                "-5": "ফেনী",
                "-6": "মৌলভীবাজার, সিলেট, চট্টগ্রাম",
                "-7": "খাগড়াছড়ি, কক্সবাজার",
                "-8": "রাঙ্গামাটি, বান্দরবান"
            };
    
            // Update selected city text
        selectedCityText.textContent = cityNames[districtValue] || "Unknown";

        // Reset tables
        rahmahBody.innerHTML = "";
        maghfirahBody.innerHTML = "";
        najahBody.innerHTML = "";

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let today = new Date();
        let ramadanStartDate = new Date(2025, 2, 2); // Ramadan starts on March 2, 2025
        let dayIndex = Math.floor((today - ramadanStartDate) / (1000 * 60 * 60 * 24));

        for (let i = 0; i < dhakaTimings.length; i++) {
            let date = new Date(2025, 2, i + 2);
            let dayOfWeek = days[date.getDay()];
            let sehri = adjustTime(dhakaTimings[i][0], districtValue);
            let iftar = adjustTime(dhakaTimings[i][1], districtValue);

            let isToday = (dayIndex === i);

            let rowHTML = `<tr class="${isToday ? 'highlight-today' : ''}">
                <td>${i + 1}</td>
                <td>${date.getDate()} March</td>
                <td>${dayOfWeek}</td>
                <td>${sehri}</td>
                <td>${iftar}</td>
            </tr>`;

            if (i < 10) {
                rahmahBody.innerHTML += rowHTML;
            } else if (i >= 10 && i < 20) {
                maghfirahBody.innerHTML += rowHTML;
            } else {
                najahBody.innerHTML += rowHTML;
            }
        }

        let sehriTime = document.getElementById("sehriTime");
        let iftarTime = document.getElementById("iftarTime");
        
        if (dayIndex >= 0 && dayIndex < dhakaTimings.length) {
            let sehriTime = adjustTime(dhakaTimings[dayIndex][0], districtValue); // Example: "5:04"
            let iftarTime = adjustTime(dhakaTimings[dayIndex][1], districtValue); // Example: "6:02"
    
            document.getElementById("sehriTime").textContent = `🌙 Sehri: ${sehriTime} AM`;
            document.getElementById("iftarTime").textContent = `🌅 Iftar: ${iftarTime} PM`;
    
            startCountdown("sehriCountdown", sehriTime, false); // AM = false
            startCountdown("iftarCountdown", iftarTime, true);  // PM = true
        } else {
            document.getElementById("sehriTime").textContent = "🌙 Sehri: --:-- AM";
            document.getElementById("iftarTime").textContent = "🌅 Iftar: --:-- PM";
        }
    }

    function updateTodayInfo() {
        let today = new Date();
        let ramadanStart = new Date(2025, 2, 2); // March 2, 2025
        let dayDiff = Math.floor((today - ramadanStart) / (1000 * 60 * 60 * 24)) + 1;
    
        // Format today's date
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = today.toLocaleDateString('en-US', options);
    
        // Update HTML
        document.getElementById("todayDate").textContent = `📅 Today: ${formattedDate}`;
        document.getElementById("ramadanDay").textContent = (dayDiff >= 1 && dayDiff <= 30) 
            ? `🕌 Ramadan Day: ${dayDiff}` 
            : `🕌 Ramadan Not Started / Ended`;
    }

    let sehriInterval, iftarInterval; // Store interval IDs

    // Function to start countdown and display "Time is Over" if time is passed
    function startCountdown(targetId, targetTime, isPM = false) {
        function updateCountdown() {
            let now = new Date();
            let [hours, minutes] = targetTime.split(":").map(Number);

            // Convert 12-hour format to 24-hour format
            if (isPM && hours !== 12) {
                hours += 12;
            } else if (!isPM && hours === 12) {
                hours = 0;
            }

            let target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
            
            // Check if the target time is already passed
            if (now >= target) {
                // If the time is passed, show "Time is Over"
                let countdownElement = document.getElementById(targetId);
                if (countdownElement) {
                    let label = targetId === "sehriCountdown" ? "🌙 Sehri Countdown:" : "🌅 Iftar Countdown:";
                    countdownElement.textContent = `${label} Time is Over`;
                }
                return;
            }

            let diff = target - now;
            let remainingHours = Math.floor(diff / (1000 * 60 * 60));
            let remainingMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            let remainingSeconds = Math.floor((diff % (1000 * 60)) / 1000);

            let countdownElement = document.getElementById(targetId);
            if (countdownElement) {
                let label = targetId === "sehriCountdown" ? "🌙 Sehri Countdown:" : "🌅 Iftar Countdown:";
                countdownElement.textContent = `${label} ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
            }
        }

        // Clear previous interval before starting a new one
        if (targetId === "sehriCountdown") {
            clearInterval(sehriInterval);
            sehriInterval = setInterval(updateCountdown, 1000);
        } else {
            clearInterval(iftarInterval);
            iftarInterval = setInterval(updateCountdown, 1000);
        }

        updateCountdown(); // Initial call
    }

    // Function to update Sehri & Iftar times when district is changed
    function updateDistrictTimings(sehriTime, iftarTime) {
        startCountdown("sehriCountdown", sehriTime, false); // Sehri is always AM
        startCountdown("iftarCountdown", iftarTime, true); // Iftar is always PM
    }

    // Function to update today's countdowns when the day changes
    function updateTodayCountdown() {
        let today = new Date();
        let ramadanStart = new Date(2025, 2, 2); // March 2, 2025
        let dayDiff = Math.floor((today - ramadanStart) / (1000 * 60 * 60 * 24)) + 1;

        let districtValue = parseInt(document.getElementById("district").value);
        let ramadanStartDate = new Date(2025, 2, 2);
        let dayIndex = Math.floor((today - ramadanStartDate) / (1000 * 60 * 60 * 24));
        let sehriTime1 = adjustTime(dhakaTimings[dayIndex][0], districtValue); // Example: "5:04"
        let iftarTime1 = adjustTime(dhakaTimings[dayIndex][1], districtValue); // Example: "6:02"

        if (dayDiff >= 1 && dayDiff <= 30) {
            // Only update countdowns for valid Ramadan days
            updateDistrictTimings(sehriTime1, iftarTime1);
        } else {
            // If it's not Ramadan, show "Ramadan is not active" message
            document.getElementById("sehriCountdown").textContent = "🌙 Sehri Countdown: Ramadan Not Active";
            document.getElementById("iftarCountdown").textContent = "🌅 Iftar Countdown: Ramadan Not Active";
        }
    }
    // Modify updateTodayCountdown to include notifications
    function updateTodayCountdown() {
        let today = new Date();
        let ramadanStart = new Date(2025, 2, 2); // March 2, 2025
        let dayDiff = Math.floor((today - ramadanStart) / (1000 * 60 * 60 * 24)) + 1;

        let districtValue = parseInt(document.getElementById("district").value);
        let ramadanStartDate = new Date(2025, 2, 2);
        let dayIndex = Math.floor((today - ramadanStartDate) / (1000 * 60 * 60 * 24));

        if (dayIndex >= 0 && dayIndex < dhakaTimings.length) {
            let sehriTime = adjustTime(dhakaTimings[dayIndex][0], districtValue);
            let iftarTime = adjustTime(dhakaTimings[dayIndex][1], districtValue);

            updateDistrictTimings(sehriTime, iftarTime);
            scheduleNotifications(sehriTime, iftarTime); // Schedule notifications
        } else {
            document.getElementById("sehriCountdown").textContent = "🌙 Sehri Countdown: Ramadan Not Active";
            document.getElementById("iftarCountdown").textContent = "🌅 Iftar Countdown: Ramadan Not Active";
        }
    }

    // Request permission on page load
    window.onload = function () {
        updateTodayInfo();
        updateTimes();
        updateTodayCountdown();
    };