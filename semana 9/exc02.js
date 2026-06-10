const celsiusInput = document.getElementById('celsius');
const fahrenheitInput = document.getElementById('fahrenheit');

celsiusInput.addEventListener('input', function() {
    const celsius = parseFloat(this.value);

    if (isNaN(celsius) || this.value === '') {
        fahrenheitInput.value = '';
    } else {
        const fahrenheit = (celsius * 9 / 5) + 32;
        fahrenheitInput.value = fahrenheit.toFixed(2);
    }
});

fahrenheitInput.addEventListener('input', function() {
    const fahrenheit = parseFloat(this.value);

    if (isNaN(fahrenheit) || this.value === '') {
        celsiusInput.value = '';
    } else {
        const celsius = (fahrenheit - 32) * 5 / 9;
        celsiusInput.value = celsius.toFixed(2);
    }
});