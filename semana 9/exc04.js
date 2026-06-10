document.getElementById('calculateBtn').addEventListener('click', function() {
    const cardBrand = document.getElementById('cardBrand').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const installments = parseInt(document.getElementById('installments').value);

    const result = document.getElementById('result');

    if (!cardBrand) {
        alert('Selecione uma bandeira');
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert('Digite um valor válido');
        return;
    }

    if (isNaN(installments) || installments < 1) {
        alert('Digite o número de parcelas');
        return;
    }

    let brandFeeRate;

    switch(cardBrand) {
        case 'visa':
            brandFeeRate = 0.02;
            break;
        case 'mastercard':
            brandFeeRate = 0.0185;
            break;
        case 'elo':
            brandFeeRate = 0.03;
            break;
        default:
            brandFeeRate = 0;
    }

    const brandTaxValue = amount * brandFeeRate;
    const interestTotal = amount * (0.015 * installments);
    const fixedFeeValue = 12.50 * installments;

    const totalValue = amount + brandTaxValue + interestTotal + fixedFeeValue;
    const installmentValue = totalValue / installments;

    document.getElementById('brandTax').textContent = 'R$ ' + brandTaxValue.toFixed(2);
    document.getElementById('interests').textContent = 'R$ ' + interestTotal.toFixed(2);
    document.getElementById('fixedFee').textContent = 'R$ ' + fixedFeeValue.toFixed(2);
    document.getElementById('installmentValue').textContent = 'R$ ' + installmentValue.toFixed(2);

    result.classList.remove('hidden');
});