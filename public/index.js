// Valideer de invoer van de gebruiker
function validateForm() {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (!email.includes('@')) {
        alert('Voer een geldig e-mailadres in');
        return false;
    }

    if (password.length < 8) {
        alert('Het wachtwoord moet minimaal 8 tekens lang zijn');
        return false;
    }

    return true;
}

// Verzend het formulier naar de API
function submitForm() {
    if (!validateForm()) {
        return;
    }

    const formData = new FormData(document.querySelector('form'));

    fetch('/users', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const email = data.user.email;
                // Redirect naar de welkomstpagina en geef de gebruikersnaam door
                window.location.href = 'welcome.html?email=' + email;
            } else {
                alert(data.error);
            }
        });
}

// Maak de knop actief
document.querySelector('form button').addEventListener('click', submitForm);
