function showForm(formType) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    const selector = formType === 'signin' ? 'Sign In' : 'Sign Up';
    document.querySelectorAll('.tab').forEach(tab => {
        if (tab.textContent === selector) tab.classList.add('active');
    });
    document.querySelectorAll('.form').forEach(form => form.classList.remove('active'));
    document.getElementById(`${formType}-form`).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const API_URL = '/api';
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    
    const handleAuth = async (form, endpoint) => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const isDoctor = document.body.id === 'doc-login-page';
        data.role = isDoctor ? 'doctor' : 'patient';
        
        const errorMessageElement = form.querySelector('.error-message');
        errorMessageElement.textContent = ''; // Clear previous errors

        try {
            const response = await fetch(`${API_URL}/auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                errorMessageElement.textContent = result.message || 'An error occurred.';
                return;
            }

            // On successful login/signup, redirect
            if (isDoctor) {
                window.location.href = '/doctor/dashboard';
            } else {
                // This would be the patient dashboard
                window.location.href = '/patient/dashboard'; 
            }

        } catch (error) {
            errorMessageElement.textContent = 'Could not connect to the server.';
        }
    };

    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleAuth(signinForm, 'login');
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleAuth(signupForm, 'register');
        });
    }
});
