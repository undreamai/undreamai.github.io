document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    // Clear any previous messages
    const messageDiv = document.getElementById("messageDiv");
    messageDiv.innerHTML = "";

    // Get form values
    const name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        messageDiv.innerHTML = "<p style='color: red;'>Please enter a valid email address.</p>";
        return;
    }

    // Convert form data to URL-encoded string
    const formData = new FormData(document.getElementById("contactForm"));
    const urlEncodedData = new URLSearchParams(formData).toString();

    let success = false;
    try {
        // Make the API request
        const response = await fetch("https://2dedl8d0p8.execute-api.eu-central-1.amazonaws.com/default/ContactFormHandler", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: urlEncodedData
        });

        // Check if the response was successful
        const result = await response.json();
        success = response.ok;
    } catch (error) {
        success = false;
    }

    document.getElementById("contactForm").style.display = "none";
    if (success) {
        messageDiv.innerHTML = `<p>Thank you for reaching out, we will get back to you shortly! We aim to reply to all queries within 1-2 business days.</p>`;
    } else {
        messageDiv.innerHTML = `<p style='color: red;'>An error occurred while submitting your request. Please email us directly at <a href="mailto:hello@undream.ai" style="color:red;text-decoration:underline;">hello@undream.ai</a>.</p>`;
    }
});
