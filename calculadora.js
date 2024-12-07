// Función que muestra el campo de monto personalizado cuando se selecciona "Otro"
function showCustomCapitalInput() {
    let capitalSelect = document.getElementById("capital");
    let customCapitalInput = document.getElementById("customCapital");
    
    if (capitalSelect.value === "other") {
        customCapitalInput.style.display = "block";
    } else {
        customCapitalInput.style.display = "none";
    }
}

// Función para habilitar o deshabilitar el botón de calcular
function toggleCalculateButton() {
    let income = document.getElementById("income").value;
    let capital = document.getElementById("capital").value;
    let customCapital = document.getElementById("customCapital").value;
    let installments = document.getElementById("installments").value;
    let calculateButton = document.getElementById("calculateButton");

    // Verificar si todos los campos son válidos
    if (
        income !== "" && capital !== "" && installments !== "" &&
        !document.getElementById("income").classList.contains("invalid") &&
        !document.getElementById("capital").classList.contains("invalid") &&
        !document.getElementById("installments").classList.contains("invalid")
    ) {
        calculateButton.disabled = false; // Habilitar el botón
    } else {
        calculateButton.disabled = true; // Deshabilitar el botón
    }
}

// Función para validar los campos y calcular el préstamo
function validateAndCalculate() {
    let income = parseFloat(document.getElementById("income").value);
    let capital = document.getElementById("capital").value;
    let customCapital = document.getElementById("customCapital").value;
    let installments = parseInt(document.getElementById("installments").value);

    // Limpiar mensajes de error
    document.getElementById("incomeError").innerText = "";
    document.getElementById("capitalError").innerText = "";
    document.getElementById("installmentsError").innerText = "";
    document.getElementById("result").innerText = "";

    // Limpiar clases invalidas
    document.getElementById("income").classList.remove("invalid");
    document.getElementById("capital").classList.remove("invalid");
    document.getElementById("installments").classList.remove("invalid");

    // Validar ingresos (al menos 6 dígitos)
    if (isNaN(income) || income <= 0 || !Number.isInteger(income)) {
        document.getElementById("incomeError").innerText = "Por favor, ingresa un valor válido para tus ingresos.";
        document.getElementById("income").classList.add("invalid");
        toggleCalculateButton(); // Actualizar el estado del botón
        return;
    } else if (income < 1000000) {
        document.getElementById("incomeError").innerText = "Por favor, ingresa un ingreso de al menos 1,000,000.";
        document.getElementById("income").classList.add("invalid");
        toggleCalculateButton(); // Actualizar el estado del botón
        return;
    } else if (income > 30000000) {
        document.getElementById("incomeError").innerText = "El salario no puede exceder 30,000,000.";
        document.getElementById("income").classList.add("invalid");
        toggleCalculateButton(); // Actualizar el estado del botón
        return;
    }

    // Validar monto del préstamo
    if (capital === "other") {
        capital = parseFloat(customCapital);
        if (isNaN(capital) || capital <= 0 || !Number.isInteger(capital)) {
            document.getElementById("capitalError").innerText = "Por favor, ingresa un monto válido para el préstamo.";
            document.getElementById("capital").classList.add("invalid");
            toggleCalculateButton(); // Actualizar el estado del botón
            return;
        } else if (capital > 1000000000) {
            document.getElementById("capitalError").innerText = "El monto del préstamo no puede exceder 1,000,000,000.";
            document.getElementById("capital").classList.add("invalid");
            toggleCalculateButton(); // Actualizar el estado del botón
            return;
        }
    } else {
        capital = parseFloat(capital);
    }

    // Validar cuotas
    if (isNaN(installments) || installments <= 0 || !Number.isInteger(installments)) {
        document.getElementById("installmentsError").innerText = "Por favor, ingresa un número válido de cuotas.";
        document.getElementById("installments").classList.add("invalid");
        toggleCalculateButton(); // Actualizar el estado del botón
        return;
    }

    // Validación de elegibilidad según los ingresos
    let maxLoanAmount = 0;
    if (income >= 2000000 && income <= 3000000) {
        maxLoanAmount = 20000000;
        if (capital < 10000000 || capital > maxLoanAmount) {
            document.getElementById("result").innerText = "No cumples con los requisitos para este préstamo. El préstamo debe estar entre $10,000,000 y $20,000,000.";
            toggleCalculateButton(); // Actualizar el estado del botón
            return;
        }
    } else if (income >= 3500000) {
        maxLoanAmount = 1000000000;
        if (capital < 10000000 || capital > maxLoanAmount) {
            document.getElementById("result").innerText = "No cumples con los requisitos para este préstamo. El préstamo debe estar entre $10,000,000 y $1,000,000,000.";
            toggleCalculateButton(); // Actualizar el estado del botón
            return;
        }
    } else {
        document.getElementById("result").innerText = "No eres elegible para un préstamo con este salario.";
        toggleCalculateButton(); // Actualizar el estado del botón
        return;
    }

    // Tasa fija
    const fixedRate = 12.5; // Tasa anual fija en porcentaje
    const monthlyRate = fixedRate / 12 / 100;

    // Calcular cuota mensual
    let monthlyPayment = (capital * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -installments));

    // Calcular total a pagar
    let totalAmount = monthlyPayment * installments;

    // Mostrar resultado
    document.getElementById("result").innerText = `Tu préstamo es de $${capital.toLocaleString()} a ${installments} cuotas. Tu cuota mensual es de $${monthlyPayment.toFixed(2)}. El total a pagar es $${totalAmount.toFixed(2)}.`;
    toggleCalculateButton(); // Actualizar el estado del botón
}

// Validación automática de ingresos (al perder foco del campo)
document.getElementById("income").addEventListener("blur", function() {
    let income = parseFloat(this.value);
    if (isNaN(income) || income <= 0 || !Number.isInteger(income)) {
        document.getElementById("incomeError").innerText = "Por favor, ingresa un valor válido para tus ingresos.";
        this.classList.add("invalid");
    } else if (income < 1000000) {
        document.getElementById("incomeError").innerText = "Por favor, ingresa un ingreso de al menos 1,000,000.";
        this.classList.add("invalid");
    } else if (income > 30000000) {
        document.getElementById("incomeError").innerText = "El salario no puede exceder 30,000,000.";
        this.classList.add("invalid");
    } else {
        document.getElementById("incomeError").innerText = "";
        this.classList.remove("invalid");
    }
    toggleCalculateButton(); // Actualizar el estado del botón
});

// Validación automática de monto de préstamo (al perder foco del campo)
document.getElementById("capital").addEventListener("blur", function() {
    let capital = this.value;
    if (capital === "other") {
        let customCapital = document.getElementById("customCapital").value;
        if (isNaN(customCapital) || customCapital <= 0 || !Number.isInteger(Number(customCapital))) {
            document.getElementById("capitalError").innerText = "Por favor, ingresa un monto válido para el préstamo.";
            this.classList.add("invalid");
        } else {
            document.getElementById("capitalError").innerText = "";
            this.classList.remove("invalid");
        }
    }
    toggleCalculateButton(); // Actualizar el estado del botón
});

// Validación automática de cuotas (al perder foco del campo)
document.getElementById("installments").addEventListener("blur", function() {
    let installments = this.value;
    if (isNaN(installments) || installments <= 0 || !Number.isInteger(Number(installments))) {
        document.getElementById("installmentsError").innerText = "Por favor, ingresa un número válido de cuotas.";
        this.classList.add("invalid");
    } else {
        document.getElementById("installmentsError").innerText = "";
        this.classList.remove("invalid");
    }
    toggleCalculateButton(); // Actualizar el estado del botón
});
