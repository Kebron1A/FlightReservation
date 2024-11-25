// Display the estimated price dynamically
document.getElementById("toLocation").addEventListener("input", function () {
    const fromLocation = document.getElementById("fromLocation").value.trim();
    const toLocation = document.getElementById("toLocation").value.trim();

    if (fromLocation && toLocation) {
        const estimatedPrice = Math.floor(Math.random() * 500 + 100); // Random price between $100 and $600
        document.getElementById("estimatedPrice").textContent = estimatedPrice;
        document.getElementById("estimatedPriceDisplay").classList.remove("hidden");
    } else {
        document.getElementById("estimatedPriceDisplay").classList.add("hidden");
    }
});

// Confirm flight details and validate inputs
document.getElementById("confirmButton").addEventListener("click", function () {
    const birthDateValue = document.getElementById("birthDate").value;
    const fromLocation = document.getElementById("fromLocation").value.trim();
    const fromState = document.getElementById("fromState").value;
    const toLocation = document.getElementById("toLocation").value.trim();
    const toState = document.getElementById("toState").value;
    const preferredDays = document.getElementById("preferredDays").value;

    // Ensure states are selected
    if (!fromState) {
        alert("Please select a departure state.");
        return;
    }
    if (!toState) {
        alert("Please select an arrival state.");
        return;
    }

    // Calculate age
    const birthDate = new Date(birthDateValue);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        alert("You must be at least 18 years old to book a flight.");
        return;
    }

    if (fromLocation && toLocation && preferredDays) {
        document.getElementById("confirmFrom").textContent = fromLocation;
        document.getElementById("confirmFromState").textContent = fromState;
        document.getElementById("confirmTo").textContent = toLocation;
        document.getElementById("confirmToState").textContent = toState;
        document.getElementById("confirmDays").textContent = preferredDays;
        document.getElementById("confirmPrice").textContent = document.getElementById("estimatedPrice").textContent;

        document.getElementById("flightForm").classList.remove("active");
        document.getElementById("confirmationMessage").classList.add("active");
    } else {
        alert("Please fill out all required fields!");
    }
});

// Display thank-you message after confirmation
document.getElementById("submitButton").addEventListener("click", function () {
    document.getElementById("confirmationMessage").classList.remove("active");
    document.getElementById("thankYouMessage").classList.add("active");
});
