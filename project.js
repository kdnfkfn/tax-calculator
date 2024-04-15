function calculateTax() {
    resetErrorIcons();

    var age = document.getElementById('age').value;
    var income = parseFloat(document.getElementById('income').value);
    var extraIncome = parseFloat(document.getElementById('extraIncome').value);
    var deductions = parseFloat(document.getElementById('deductions').value);

    var valid = validateForm(age, income, extraIncome, deductions);

    if (valid) {
        var taxRate = getTaxRate(age);
        var taxableIncome = income + extraIncome - deductions;
        var taxAmount = (taxableIncome > 800000) ? (taxableIncome - 800000) * taxRate : 0;

        document.getElementById('taxResult').innerHTML = "Tax Amount: " + taxAmount.toFixed(2) + " Lakhs";
        document.getElementById('modal').style.display = 'block';
    }
}

function getTaxRate(age) {
    switch (age) {
        case '<40':
            return 0.3;
        case '>=40&<60':
            return 0.4;
        case '>=60':
            return 0.1;
    }
}

function validateForm(age, income, extraIncome, deductions) {
    var valid = true;

    if (!age) {
        showErrorIcon('ageErrorIcon', 'Age is required');
        valid = false;
    }

    if (isNaN(income)) {
        showErrorIcon('incomeErrorIcon', 'Gross Annual Income must be a number');
        valid = false;
    }

    if (isNaN(extraIncome)) {
        showErrorIcon('extraIncomeErrorIcon', 'Extra Income must be a number');
        valid = false;
    }

    if (isNaN(deductions)) {
        showErrorIcon('deductionsErrorIcon', 'Deductions must be a number');
        valid = false;
    }

    return valid;
}

function showErrorIcon(iconId, errorMessage) {
    document.getElementById(iconId).style.display = 'inline';
    document.getElementById(iconId).setAttribute('title', errorMessage);
}

function resetErrorIcons() {
    var icons = document.getElementsByClassName('error-icon');
    for (var i = 0; i < icons.length; i++) {
        icons[i].style.display = 'none';
        icons[i].removeAttribute('title');
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
