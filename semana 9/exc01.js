function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    let multiplier = 10;

    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * multiplier;
        multiplier--;
    }

    let remainder = (sum * 10) % 11;
    let firstDigit = remainder === 10 ? 0 : remainder;

    if (parseInt(cpf[9]) !== firstDigit) return false;

    sum = 0;
    multiplier = 11;

    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * multiplier;
        multiplier--;
    }

    remainder = (sum * 10) % 11;
    let secondDigit = remainder === 10 ? 0 : remainder;

    if (parseInt(cpf[10]) !== secondDigit) return false;

    return true;
}

document.getElementById('validateBtn').addEventListener('click', function() {
    const cpfInput = document.getElementById('cpfInput');
    const result = document.getElementById('result');
    const resultText = document.getElementById('resultText');

    const cpf = cpfInput.value.trim();

    if (!cpf) {
        resultText.textContent = 'Digite um CPF';
        result.classList.remove('hidden', 'valid', 'invalid');
        result.classList.add('invalid');
        return;
    }

    const isValid = validateCPF(cpf);

    result.classList.remove('hidden');

    if (isValid) {
        resultText.textContent = '✓ CPF Válido';
        result.classList.remove('invalid');
        result.classList.add('valid');
    } else {
        resultText.textContent = '✗ CPF Inválido';
        result.classList.remove('valid');
        result.classList.add('invalid');
    }
});

document.getElementById('cpfInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('validateBtn').click();
    }
});