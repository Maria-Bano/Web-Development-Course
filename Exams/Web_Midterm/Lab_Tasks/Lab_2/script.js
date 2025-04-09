function showCheckoutForm() {
  document.getElementById("checkout-modal").style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeCheckoutForm() {
  document.getElementById("checkout-modal").style.display = "none";
  document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById("checkout-modal");
  if (event.target == modal) {
      closeCheckoutForm();
  }
}

// Form validation
document.getElementById("checkout-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  // Validate form fields
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const cardNumber = document.getElementById("cardNumber");
  const expiry = document.getElementById("expiry");
  const cvv = document.getElementById("cvv");
  
  let isValid = true;
  
  // Reset error messages
  document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
  
  // Validate each field
  if (!fullName.value.match(/^[A-Za-z\s]+$/)) {
      document.getElementById("name-error").textContent = "Please enter a valid name";
      isValid = false;
  }
  
  if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      document.getElementById("email-error").textContent = "Please enter a valid email";
      isValid = false;
  }
  
  if (!phone.value.match(/^\d{10,15}$/)) {
      document.getElementById("phone-error").textContent = "Please enter a valid phone number (10-15 digits)";
      isValid = false;
  }
  
  if (address.value.trim() === "") {
      document.getElementById("address-error").textContent = "Please enter your address";
      isValid = false;
  }
  
  if (!cardNumber.value.match(/^\d{16}$/)) {
      document.getElementById("card-error").textContent = "Please enter a valid 16-digit card number";
      isValid = false;
  }
  
  if (expiry.value === "") {
      document.getElementById("expiry-error").textContent = "Please select expiry date";
      isValid = false;
  }
  
  if (!cvv.value.match(/^\d{3}$/)) {
      document.getElementById("cvv-error").textContent = "Please enter a valid 3-digit CVV";
      isValid = false;
  }
  
  if (isValid) {
      alert("Order placed successfully!");
      closeCheckoutForm();
      this.reset();
  }
});