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

// Form submission handlers
document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (document.body.id === 'doc-login-page') {
        window.location.href = 'doc-dash.html';
    } else {
        // In a real application, you would handle the patient sign in process here
        // For now, we'll just show an alert.
        alert('Patient sign in functionality would be implemented here.');
    }
});

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (document.body.id === 'doc-login-page') {
        window.location.href = 'doc-dash.html';
    } else {
        // In a real application, you would handle the patient sign up process here
        // For now, we'll just show an alert.
        alert('Patient sign up functionality would be implemented here.');
    }
});

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
    if (charCounter) {
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
    if (validationMessage) {
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