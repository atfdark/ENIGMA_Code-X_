function showForm(formType) {
    // Update tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab').forEach(tab => {
        if ((formType === 'signin' && tab.textContent === 'Sign In') || 
            (formType === 'signup' && tab.textContent === 'Sign Up')) {
            tab.classList.add('active');
        }
    });
    
    // Update forms
    document.querySelectorAll('.form').forEach(form => {
        form.classList.remove('active');
    });
    
    document.getElementById(formType + '-form').classList.add('active');
}

// --- FORM SUBMISSION LOGIC (THE FIX IS HERE) ---

// Handle the sign-in form submission
document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Check which login page we are on by looking at the body's ID
    if (document.body.id === 'doc-login-page') {
        // Redirect to the DOCTOR DASHBOARD ROUTE
        window.location.href = '/doctor/dashboard'; 
    } else {
        // Redirect to the PATIENT DASHBOARD ROUTE
        window.location.href = '/patient/dashboard';
    }
});

// Handle the sign-up form submission
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // For now, we'll redirect both login and signup to the same place.
    // In a real app, you would first send the data to your /api/auth/register endpoint.
    if (document.body.id === 'doc-login-page') {
        // Redirect to the DOCTOR DASHBOARD ROUTE
        window.location.href = '/doctor/dashboard';
    } else {
        // Redirect to the PATIENT DASHBOARD ROUTE
        window.location.href = '/patient/dashboard';
    }
});


// --- Helper scripts for UI (Password toggle, validation, etc.) ---

const passwordInput = document.getElementById('password-input');
const passwordStrength = document.querySelector('.password-strength');

if (passwordInput) {
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let strength = 'weak';

        if (password.length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) {
            strength = 'strong';
        } else if (password.length >= 8 && (/[A-Z]/.test(password) || /[a-z]/.test(password)) && /\d/.test(password)) {
            strength = 'medium';
        }

        passwordStrength.className = 'password-strength ' + strength;
    });
}

const togglePasswordIcons = document.querySelectorAll('.toggle-password');

togglePasswordIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const passwordInput = icon.parentElement.querySelector('input[type="password"], input[type="text"]');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    });
});

const charCounterFields = document.querySelectorAll('input[maxlength]');

charCounterFields.forEach(field => {
    const charCounter = field.nextElementSibling;
    if (charCounter && charCounter.classList.contains('char-counter')) {
        field.addEventListener('input', () => {
            const currentLength = field.value.length;
            const maxLength = field.getAttribute('maxlength');
            charCounter.textContent = `${currentLength}/${maxLength}`;
        });
    }
});

const emailInputs = document.querySelectorAll('input[type="email"]');

emailInputs.forEach(emailInput => {
    const validationMessage = emailInput.nextElementSibling;
    if (validationMessage && validationMessage.classList.contains('validation-message')) {
        emailInput.addEventListener('input', () => {
            if (emailInput.validity.valid) {
                validationMessage.textContent = '';
            }
        });
        emailInput.addEventListener('invalid', () => {
            if (emailInput.validity.valueMissing) {
                validationMessage.textContent = 'Please enter an email address.';
            } else if (emailInput.validity.typeMismatch) {
                validationMessage.textContent = 'Please enter a valid email address.';
            }
        });
    }
});

const password = document.getElementById('password-input');
const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]');

function validatePassword() {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords Don't Match");
  } else {
    confirmPassword.setCustomValidity('');
  }
}

if (password && confirmPassword) {
    password.onchange = validatePassword;
    confirmPassword.onkeyup = validatePassword;
}

