$(window).on('load', function() {
    const submitButton = $('#contact-form-submit');
    submitButton.prop('disabled', true);
});


document.getElementById("contactForm").addEventListener("input", function () {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const submitButton = document.getElementById("contact-form-submit");
    if (name && email && message && emailRegex.test(email)) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});

async function recaptcha(token) {
    console.log(token);

    // Clear any previous messages
    const messageDiv = document.getElementById("messageDiv");
    messageDiv.innerHTML = "";


    // Convert form data to URL-encoded string
    const formData = new FormData(document.getElementById("contactForm"));
    let urlEncodedData = new URLSearchParams(formData).toString();
    urlEncodedData += `&g-recaptcha-response=${token}`;

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
        messageDiv.innerHTML = `<p>Thank you for reaching out, we will get back to you shortly! We aim to reply all queries within 1-2 business days.</p>`;
    } else {
        messageDiv.innerHTML = `<p style='color: red;'>An error occurred while submitting your request. Please email us directly at <a href="mailto:hello@undream.ai" style="color:red;text-decoration:underline;">hello@undream.ai</a>.</p>`;
    }
}
