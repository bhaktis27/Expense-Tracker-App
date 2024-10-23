// Select DOM elements
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalSpendingElement = document.getElementById('total-spending');
const filterInput = document.getElementById('filter');

// Initialize an array to hold expenses
let expenses = [];

// Event listener for the form submission
expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = new Date().toLocaleDateString();

    // Create an expense object
    const expense = { description, amount, category, date };
    expenses.push(expense);

    // Clear form fields
    expenseForm.reset();

    // Update the UI
    updateUI();
});

// Function to update the UI
function updateUI() {
    // Clear the expense list
    expenseList.innerHTML = '';

    // Calculate total spending
    const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalSpendingElement.textContent = totalSpending.toFixed(2);

    // Display each expense
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.textContent = `${expense.description} - $${expense.amount.toFixed(2)} (${expense.category}) on ${expense.date}`;
        li.dataset.index = index; // Store index for potential deletion or editing
        expenseList.appendChild(li);
    });
}

// Event listener for filter input
filterInput.addEventListener('input', function() {
    const filterValue = filterInput.value.toLowerCase();
    const filteredExpenses = expenses.filter(expense => 
        expense.category.toLowerCase().includes(filterValue) ||
        expense.date.includes(filterValue)
    );
    
    // Clear the expense list and display filtered expenses
    expenseList.innerHTML = '';
    filteredExpenses.forEach((expense) => {
        const li = document.createElement('li');
        li.textContent = `${expense.description} - $${expense.amount.toFixed(2)} (${expense.category}) on ${expense.date}`;
        expenseList.appendChild(li);
    });
});
