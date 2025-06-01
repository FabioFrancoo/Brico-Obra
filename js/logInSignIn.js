document.addEventListener('DOMContentLoaded', function() {
    const clientBtn = document.getElementById('clientBtn');
    const supplierBtn = document.getElementById('supplierBtn');
    
    const clientSignupForm = document.getElementById('clientSignupForm');
    const supplierSignupForm = document.getElementById('supplierSignupForm');
    
    // Login form elements
    const loginForm = document.getElementById('loginForm');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    const loginEmailError = document.getElementById('loginEmailError');
    const loginPasswordError = document.getElementById('loginPasswordError');

    // Client Signup form elements
    const clientCreateForm = document.getElementById('clientCreateForm');
    const clientNameInput = document.getElementById('clientName');
    const clientSurnameInput = document.getElementById('clientSurname');
    const clientEmailInput = document.getElementById('clientEmail');
    const clientPasswordInput = document.getElementById('clientPassword');
    const clientNameError = document.getElementById('clientNameError');
    const clientSurnameError = document.getElementById('clientSurnameError');
    const clientEmailError = document.getElementById('clientEmailError');
    const clientPasswordError = document.getElementById('clientPasswordError');

    // Supplier Signup form elements
    const supplierCreateForm = document.getElementById('supplierCreateForm');
    const supplierNameInput = document.getElementById('supplierName');
    const supplierEmailInput = document.getElementById('supplierEmail');
    const supplierPasswordInput = document.getElementById('supplierPassword');
    const activityProofInput = document.getElementById('activityProof');
    const activityFileNameSpan = document.getElementById('activityFileName');
    const supplierNameError = document.getElementById('supplierNameError');
    const supplierEmailError = document.getElementById('supplierEmailError');
    const supplierPasswordError = document.getElementById('supplierPasswordError');
    const activityProofError = document.getElementById('activityProofError');

    // Variable to keep track of the currently active form type ('client' or 'supplier')
    let currentFormType = 'client'; // Default to client

    // Helper function to validate email format
    function isValidEmail(email) {
        // Simple regex for email validation (can be more robust)
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Helper function to display/hide error messages
    function showError(element, message, inputElement) {
        element.textContent = message;
        element.classList.remove('hidden');
        if (inputElement) {
            inputElement.classList.add('border-red-500');
        }
    }

    function hideError(element, inputElement) {
        element.classList.add('hidden');
        element.textContent = ''; // Clear message when hidden
        if (inputElement) {
            inputElement.classList.remove('border-red-500');
        }
    }

    function setFormType(type) {
        currentFormType = type; // Update the global variable

        // Reset all validation errors when switching form types
        resetValidationErrors();

        if (type === 'client') {
            // Update button styles
            clientBtn.classList.remove('border', 'border-orange-500', 'text-orange-500');
            clientBtn.classList.add('bg-orange-500', 'text-white');
            supplierBtn.classList.remove('bg-orange-500', 'text-white');
            supplierBtn.classList.add('border', 'border-orange-500', 'text-orange-500');

            // Show client form, hide supplier form
            clientSignupForm.classList.remove('hidden');
            supplierSignupForm.classList.add('hidden');
        } else if (type === 'supplier') {
            // Update button styles
            supplierBtn.classList.remove('border', 'border-orange-500', 'text-orange-500');
            supplierBtn.classList.add('bg-orange-500', 'text-white');
            clientBtn.classList.remove('bg-orange-500', 'text-white');
            clientBtn.classList.add('border', 'border-orange-500', 'text-orange-500');

            // Hide client form, show supplier form
            clientSignupForm.classList.add('hidden');
            supplierSignupForm.classList.remove('hidden');
        }
    }

    function resetValidationErrors() {
        // Login Form
        hideError(loginEmailError, loginEmailInput);
        hideError(loginPasswordError, loginPasswordInput);

        // Client Signup Form
        hideError(clientNameError, clientNameInput);
        hideError(clientSurnameError, clientSurnameInput);
        hideError(clientEmailError, clientEmailInput);
        hideError(clientPasswordError, clientPasswordInput);

        // Supplier Signup Form
        hideError(supplierNameError, supplierNameInput);
        hideError(supplierEmailError, supplierEmailInput);
        hideError(supplierPasswordError, supplierPasswordInput);
        hideError(activityProofError, activityProofInput); // Pass the input directly
        activityProofInput.closest('.relative').classList.remove('border-red-500'); // Ensure parent div border is reset
    }

    // Initial form type setup (default to client)
    setFormType('client');

    // Event listeners for top buttons (Cliente / Fornecedor)
    clientBtn.addEventListener('click', function() {
        setFormType('client');
    });

    supplierBtn.addEventListener('click', function() {
        setFormType('supplier');
    });

    // --- Validation Functions (now only called on submit) ---

    function validateLoginForm() {
        let isValid = true;

        // Email validation
        if (loginEmailInput.value.trim() === '') {
            showError(loginEmailError, 'O email é obrigatório.', loginEmailInput);
            isValid = false;
        } else if (!isValidEmail(loginEmailInput.value.trim())) {
            showError(loginEmailError, 'Por favor, insira um email válido.', loginEmailInput);
            isValid = false;
        } else {
            hideError(loginEmailError, loginEmailInput);
        }

        // Password validation
        if (loginPasswordInput.value.trim() === '') {
            showError(loginPasswordError, 'A password é obrigatória.', loginPasswordInput);
            isValid = false;
        } else {
            hideError(loginPasswordError, loginPasswordInput);
        }

        return isValid;
    }

    function validateClientSignupForm() {
        let isValid = true;

        // Name validation
        if (clientNameInput.value.trim() === '') {
            showError(clientNameError, 'O nome é obrigatório.', clientNameInput);
            isValid = false;
        } else {
            hideError(clientNameError, clientNameInput);
        }

        // Surname validation
        if (clientSurnameInput.value.trim() === '') {
            showError(clientSurnameError, 'O apelido é obrigatório.', clientSurnameInput);
            isValid = false;
        } else {
            hideError(clientSurnameError, clientSurnameInput);
        }

        // Email validation
        if (clientEmailInput.value.trim() === '') {
            showError(clientEmailError, 'O email é obrigatório.', clientEmailInput);
            isValid = false;
        } else if (!isValidEmail(clientEmailInput.value.trim())) {
            showError(clientEmailError, 'Por favor, insira um email válido.', clientEmailInput);
            isValid = false;
        } else {
            hideError(clientEmailError, clientEmailInput);
        }

        // Password validation
        if (clientPasswordInput.value.trim() === '') {
            showError(clientPasswordError, 'A password é obrigatória.', clientPasswordInput);
            isValid = false;
        } else {
            hideError(clientPasswordError, clientPasswordInput);
        }

        return isValid;
    }

    function validateSupplierSignupForm() {
        let isValid = true;

        // Company Name validation
        if (supplierNameInput.value.trim() === '') {
            showError(supplierNameError, 'O nome da empresa é obrigatório.', supplierNameInput);
            isValid = false;
        } else {
            hideError(supplierNameError, supplierNameInput);
        }

        // Email validation
        if (supplierEmailInput.value.trim() === '') {
            showError(supplierEmailError, 'O email é obrigatório.', supplierEmailInput);
            isValid = false;
        } else if (!isValidEmail(supplierEmailInput.value.trim())) {
            showError(supplierEmailError, 'Por favor, insira um email válido.', supplierEmailInput);
            isValid = false;
        } else {
            hideError(supplierEmailError, supplierEmailInput);
        }

        // Password validation
        if (supplierPasswordInput.value.trim() === '') {
            showError(supplierPasswordError, 'A password é obrigatória.', supplierPasswordInput);
            isValid = false;
        } else {
            hideError(supplierPasswordError, supplierPasswordInput);
        }

        // Activity Proof validation
        if (activityProofInput.files.length === 0) {
            showError(activityProofError, 'O comprovativo de atividade é obrigatório.', activityProofInput);
            activityProofInput.closest('.relative').classList.add('border-red-500'); // Apply red border to the custom file input div
            isValid = false;
        } else {
            hideError(activityProofError, activityProofInput);
            activityProofInput.closest('.relative').classList.remove('border-red-500');
        }

        return isValid;
    }

    // --- Form Submission Event Listeners ---

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        if (validateLoginForm()) {
            // If validation passes, proceed with redirection
            if (currentFormType === 'client') {
                window.location.href = '../html/index_loged.html'; // Redirect to client dashboard
            } else if (currentFormType === 'supplier') {
                window.location.href = '../html/paginaFornecedor.html'; // Redirect to supplier dashboard
            }
        }
    });

    clientCreateForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        if (validateClientSignupForm()) {
            // If validation passes, proceed with redirection
            window.location.href = '../html/index_loged.html'; // Redirect to client dashboard after signup
        }
    });

    supplierCreateForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        if (validateSupplierSignupForm()) {
            // If validation passes, proceed with redirection
            window.location.href = '../html/paginaFornecedor.html'; // Redirect to supplier dashboard after signup
        }
    });

    // Event listener for supplier file input change (updates file name and clears error)
    activityProofInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            activityFileNameSpan.textContent = this.files[0].name;
            hideError(activityProofError, activityProofInput); // Hide error when file is selected
            activityProofInput.closest('.relative').classList.remove('border-red-500');
        } else {
            activityFileNameSpan.textContent = 'Carregar ficheiros';
            // Do not show error here, it will be handled by validation on submit
        }
    });
});