// Array de objetos para los bancos y sus tasas de interés
const banks = [
    { name: "bancoBogota", interestRate: 0.115, label: "Tasa de interés: 11.5%" },
    { name: "bancolombia", interestRate: 0.15, label: "Tasa de interés: 15%" },
    { name: "davivienda", interestRate: 0.08, label: "Tasa de interés: 8%" },
    { name: "bbva", interestRate: 0.115, label: "Tasa de interés: 11.5%" },
    { name: "bancoPopular", interestRate: 0.05, label: "Tasa de interés: 5%" }
];

// Función para mostrar el input de capital personalizado
function showCustomCapitalInput() {
    const capitalSelect = document.getElementById("capital");
    const customCapitalInput = document.getElementById("customCapital");

    if (capitalSelect.value === "") {
        customCapitalInput.style.display = "none";
    } else {
        customCapitalInput.style.display = "block";
    }
}

// Función para actualizar la tasa de interés según el banco seleccionado
function updateInterestRate() {
    const bankValue = document.getElementById("bank").value;
    const interestRateElement = document.getElementById("interestRate");

    // Buscar el banco seleccionado en el array
    const selectedBank = banks.find(bank => bank.name === bankValue);

    if (selectedBank) {
        interestRateElement.innerText = selectedBank.label;

        // Mostrar en la consola el banco seleccionado y su tasa de interés
        console.log(`Banco seleccionado: ${selectedBank.name}`);
        console.log(`Tasa de interés: ${selectedBank.interestRate * 100}%`);
    } else {
        interestRateElement.innerText = "";
    }

    toggleCalculateButton(); // Actualizar el estado del botón después de seleccionar el banco
}

// Función para habilitar el botón de calcular si todos los campos están completos
function toggleCalculateButton() {
    const income = document.getElementById("income").value;
    const capital = document.getElementById("capital").value || document.getElementById("customCapital").value;
    const installments = document.getElementById("installments").value;
    const bank = document.getElementById("bank").value;

    const calculateButton = document.getElementById("calculateButton");

    if (income && capital && installments && bank) {
        calculateButton.disabled = false;
    } else {
        calculateButton.disabled = true;
    }
}

// Función para validar los campos antes de calcular
function validateAndCalculate() {
    const income = document.getElementById("income");
    const capital = document.getElementById("capital").value || document.getElementById("customCapital").value;
    const installments = document.getElementById("installments");
    const bank = document.getElementById("bank").value;

    let valid = true;

    // Validación para el campo de ingresos
    if (!income.value || income.value <= 0) {
        document.getElementById("incomeError").innerText = "Por favor, ingresa un valor válido para los ingresos.";
        valid = false;
    } else {
        document.getElementById("incomeError").innerText = "";
    }

    // Validación para el campo de monto del préstamo
    if (!capital || capital <= 0) {
        document.getElementById("capitalError").innerText = "Por favor, selecciona o ingresa un monto válido.";
        valid = false;
    } else {
        document.getElementById("capitalError").innerText = "";
    }

    // Validación para el campo de cuotas
    if (!installments.value || installments.value <= 0) {
        document.getElementById("installmentsError").innerText = "Por favor, ingresa un número válido de cuotas.";
        valid = false;
    } else {
        document.getElementById("installmentsError").innerText = "";
    }

    // Validación para el campo de banco
    if (!bank) {
        document.getElementById("bankError").innerText = "Por favor, selecciona un banco.";
        valid = false;
    } else {
        document.getElementById("bankError").innerText = "";
    }

    // Si todos los campos son válidos, calculamos el préstamo
    if (valid) {
        calculateLoan();
    }
}

// Función para calcular el préstamo
function calculateLoan() {
    const income = parseFloat(document.getElementById("income").value);
    const capital = parseFloat(document.getElementById("capital").value || document.getElementById("customCapital").value);
    const installments = parseInt(document.getElementById("installments").value);
    const bankValue = document.getElementById("bank").value;

    // Buscar el banco seleccionado en el array
    const selectedBank = banks.find(bank => bank.name === bankValue);

    if (!selectedBank) {
        alert("Por favor, selecciona un banco.");
        return;
    }

    // Obtener la tasa de interés según el banco
    const interestRate = selectedBank.interestRate;

    // Cálculo de la cuota mensual
    const monthlyInterest = interestRate / 12;
    const loanAmount = capital;
    const months = installments;
    const numerator = monthlyInterest * Math.pow(1 + monthlyInterest, months);
    const denominator = Math.pow(1 + monthlyInterest, months) - 1;
    const monthlyPayment = loanAmount * (numerator / denominator);

    // Mostrar el resultado
    const result = document.getElementById("result");
    result.innerHTML = `El monto del préstamo es: $${loanAmount.toLocaleString()} <br>
                        La cuota mensual es: $${monthlyPayment.toLocaleString()} <br>
                        Total a pagar: $${(monthlyPayment * months).toLocaleString()}`;
}
