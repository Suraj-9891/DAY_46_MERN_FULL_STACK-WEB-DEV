async function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    const apiKey = 'YOUR_API_KEY'; // Replace with a real API key for currency conversion
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.rates[toCurrency]) {
            const rate = data.rates[toCurrency];
            const result = (amount * rate).toFixed(2);

            document.getElementById('output').innerHTML = 
                `<p>Converted Amount: <span>${result} ${toCurrency}</span></p>`;
        } else {
            alert('Conversion rate not available for the selected currencies.');
        }
    } catch (error) {
        alert('Error fetching conversion rates.');
        console.error(error);
    }
}

function resetForm() {
    document.getElementById('fromCurrency').value = 'EUR';
    document.getElementById('toCurrency').value = 'USD';
    document.getElementById('amount').value = '';
    document.getElementById('output').innerHTML = '';
}

function swapCurrencies() {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
}

function printResult() {
    const printContent = document.querySelector('#output').innerHTML;
    const win = window.open('', '', 'width=800,height=600');
    win.document.write('<html><head><title>Print</title></head><body>' + printContent + '</body></html>');
    win.document.close();
    win.print();
}