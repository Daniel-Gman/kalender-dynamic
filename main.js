// Get elements from HTML ID
const kalender = document.getElementById('kalender');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const currentMonthSpan = document.getElementById('currentMonth');

// Create variables used in the kalender
let currentYear;
let currentMonth;

// Add event listeners to have functions on clicks
prevMonthButton.addEventListener('click', () => updateCalendar(-1));
nextMonthButton.addEventListener('click', () => updateCalendar(1));

// Function to update calendar basdd on month and year
function updateCalendar(monthOffset) {
    currentMonth += monthOffset;
    if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
    } else if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
    }
    createCalendar(currentYear, currentMonth);
}

// Function to create calendar
function createCalendar(year, month) {
    const date = new Date(year, month - 1, 1);
    // January is 0, February is 1, March is 2.... 
    // when we write new Date(year, month - 1, 1), we're telling JavaScript to create a date for the first day of the specified month and year.
    const daysInMonth = new Date(year, month, 0).getDate();
    const startDay = date.getDay();

    kalender.innerHTML = '';

    // Create header row based on the days in a week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const headerCell = document.createElement('div');
        headerCell.classList.add('day');
        headerCell.textContent = day;
        kalender.appendChild(headerCell);
    });

    // Fill in days using nested loop (loop in een loop)
    let dayCounter = 1;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day');
            if ((i === 0 && j < startDay) || dayCounter > daysInMonth)
            // If i is equal to 0 and j is smaller than startDay OR dayCounter is greater than daysInMonth:
            {
                dayCell.classList.add('empty');
            } else {
                dayCell.textContent = dayCounter++;
            }
            kalender.appendChild(dayCell);
        }
    }

    // Update current month span based on the info given by line: 30
    currentMonthSpan.textContent = new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// create kalender based on the current date
const currentDate = new Date();
currentYear = currentDate.getFullYear();
currentMonth = currentDate.getMonth() + 1;
createCalendar(currentYear, currentMonth);




//Made by Daniel Vermeulen
// If anyone has this tag or any similair comment tags in the html, css or js page its FRAUDE