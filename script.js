const dateInput = document.getElementById("dateInput");
const errorMsg = document.getElementById("errorMsg");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("bookingForm");

const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

submitBtn.disabled = true;

dateInput.value = today;

function validateDate() {
    const selectedValue = dateInput.value;

    if (!selectedValue) return;

    const selectedDate = new Date(selectedValue);
    const todayDate = new Date();

    todayDate.setHours(0, 0, 0, 0);

    let error = "";

    if (selectedDate < todayDate) {
        error = "Past dates are not allowed.";
    }

    else if (selectedDate.getDate() === 0) {
        error = "Sundays are not available.";
    }

    else if (selectedDate.getMonth() === 11 && (selectedDate.getDate() === 24 || selectedDate.getDate() === 25)){
        error = "selected date is a holiday blackout.";
    }

    if (error) {
        errorMsg.textContent = error;
        submitBtn.disabled = true;
        return false;
    }else {
        errorMsg.textContent = "";
        submitBtn.disabled = false;
        return true;
    }

}

dateInput.addEventListener("change", validateDate);

form.addEventListener("submit", function (e) {
    if (!validateDate()){
        e.preventDefault();
    } else {
        e.preventDefault();
        alert("valid date selected! Added to cart.");
    }
});

validateDate();