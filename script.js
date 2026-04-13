const dateInput = document.getElementById("dateInput");
const errorMsg = document.getElementById("errorMsg");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("bookingForm");
const todayBtn = document.getElementById("todayBtn");

submitBtn.disabled = true;

/**
 * Flatpickr Setup
 */
flatpickr(dateInput, {
    dateFormat: "Y-m-d",
    minDate: "today",

    // Disable Sundays + Blackout dates
    disable: [
        function(date) {
            return date.getDay() === 0; // Sunday
        },
        function(date) {
            return (
                date.getMonth() === 11 &&
                (date.getDate() === 24 || date.getDate() === 25)
            );
        }
    ],

    // Use REAL Date object (FIXED)
    onChange: function(selectedDates) {
        validateDate(selectedDates[0]);
    }
});

/**
 * MAIN VALIDATION FUNCTION
 */
function validateDate(selectedDate) {

    if (!selectedDate) {
        errorMsg.textContent = "Please select a date.";
        submitBtn.disabled = true;
        return false;
    }

    // Normalize time (prevents timezone bugs)
    selectedDate.setHours(0, 0, 0, 0);

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    let error = "";

    // ❌ Past date check
    if (selectedDate < todayDate) {
        error = "Past dates are not allowed.";
    }

    // ❌ Sunday check
    if (selectedDate.getDay() === 0) {
        error = "Sundays are not available for training.";
    }

    // ❌ Blackout dates (Dec 24 & 25)
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    if (
        (month === 12 && day === 24) ||
        (month === 12 && day === 25)
    ) {
        error = "Selected date is a holiday blackout (Dec 24–25).";
    }

    // UI update
    if (error) {
        errorMsg.textContent = error;
        submitBtn.disabled = true;
        return false;
    }

    errorMsg.textContent = "";
    submitBtn.disabled = false;
    return true;
}

/**
 * FORM SUBMIT SAFETY CHECK
 */
form.addEventListener("submit", function (e) {
    const selectedDates = dateInput.value;

    if (!selectedDates) {
        e.preventDefault();
        validateDate(null);
        return;
    }

    const [year, month, day] = selectedDates.split("-");
    const selectedDate = new Date(year, month - 1, day);
    selectedDate.setHours(0, 0, 0, 0);

    if (!validateDate(selectedDate)) {
        e.preventDefault();
        return;
    }

    e.preventDefault();
    alert("Valid date selected! Added to cart.");
});

/**
 * TODAY BUTTON
 */
todayBtn.addEventListener("click", () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    dateInput._flatpickr.setDate(today, true);

    validateDate(today);
});