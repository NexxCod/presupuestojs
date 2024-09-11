// Arreglo para almacenar las transacciones
let transactions = [];

// Función para agregar una transacción
function addTransaction(description, amount) {
    const transaction = {
        id: Date.now(),
        description,
        amount: parseFloat(amount)
    };
    transactions.push(transaction);
    updateUI();
}

// Función para calcular el total del presupuesto
function calculateTotal() {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

// Función para actualizar la interfaz
function updateUI() {
    const transactionsList = document.getElementById('transactions-list');
    const totalBudget = document.getElementById('total-budget');

    // Limpiar la lista de transacciones
    transactionsList.innerHTML = '';

    // Mostrar las transacciones en la UI
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.textContent = `${transaction.description}: $${transaction.amount.toFixed(2)}`;
        transactionsList.appendChild(li);
    });

    // Actualizar el presupuesto total
    totalBudget.textContent = `$${calculateTotal().toFixed(2)}`;
}

// Función para filtrar transacciones por monto mayor a un valor
function filterLargeTransactions(limit) {
    return transactions.filter(transaction => transaction.amount > limit);
}

// Función para verificar si existe una transacción con un monto exacto
function hasSpecificTransaction(value) {
    return transactions.some(transaction => transaction.amount === value);
}

// Evento para agregar una transacción
document.getElementById('add-btn').addEventListener('click', () => {
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;

    if (description !== '' && amount !== '') {
        addTransaction(description, amount);
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
    }
});

// Evento para filtrar transacciones mayores a un valor
document.getElementById('filter-btn').addEventListener('click', () => {
    const filterAmount = document.getElementById('filter-amount').value;
    const filteredTransactionsList = document.getElementById('filtered-transactions-list');

    // Limpiar la lista de transacciones filtradas
    filteredTransactionsList.innerHTML = '';

    // Filtrar y mostrar las transacciones
    const filteredTransactions = filterLargeTransactions(parseFloat(filterAmount));
    filteredTransactions.forEach(transaction => {
        const li = document.createElement('li');
        li.textContent = `${transaction.description}: $${transaction.amount.toFixed(2)}`;
        filteredTransactionsList.appendChild(li);
    });
});

// Evento para verificar si existe una transacción con un monto exacto
document.getElementById('check-btn').addEventListener('click', () => {
    const checkAmount = parseFloat(document.getElementById('check-amount').value);
    const checkResult = document.getElementById('check-result');

    // Verificar si existe una transacción con ese monto
    const exists = hasSpecificTransaction(checkAmount);

    if (exists) {
        checkResult.textContent = `¡Existe una transacción con el monto de $${checkAmount}!`;
        checkResult.style.color = 'green';
    } else {
        checkResult.textContent = `No existe ninguna transacción con el monto de $${checkAmount}.`;
        checkResult.style.color = 'red';
    }
});