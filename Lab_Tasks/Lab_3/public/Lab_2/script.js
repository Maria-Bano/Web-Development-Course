// Proceed to shipping step
function proceedToShipping() {
    // Validate form first
    const form = document.getElementById("shipping-form");
    const inputs = form.querySelectorAll("input[required]");
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = "red";
        } else {
            input.style.borderColor = "#ddd";
        }
    });
    
    if (isValid) {
        // In a real implementation, you would proceed to next step
        alert("Proceeding to shipping step");
        // You would update the progress indicators here
    }
}

// Close when clicking outside (if you want this functionality)
window.onclick = function(event) {
    const checkoutPage = document.getElementById("checkout-page");
    if (event.target == checkoutPage) {
        closeCheckoutForm();
    }
}

// Existing form validation can be repurposed for the shipping form