const incomeArea = document.querySelector('.income-area');
const expensesArea = document.querySelector('.expenses-area');
const availableMoney = document.querySelector('.available-money');
const addTransactionPanel = document.querySelector('.add-transaction-panel')
const lightStyle = document.querySelector('.light');
const darkStyle = document.querySelector('.dark')



const addBtn = document.querySelector('.add-transactions');
const deleteBtn = document.getElementsByClassName('delete');
const deleteAllBtn = document.querySelector('.delete-all');
const cancelBtn = document.querySelector('.cancel');
const saveBtn = document.querySelector('.save');

const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const category = document.querySelector('#category')


let root = document.documentElement;
let moneyArr = [0];
let IdTransaction = 0;
let categoryIcon;
let selectedCategory;




const addTransactionShow = () => {
    addTransactionPanel.style.display = "flex";
}

const addTransactionCancel = () => {
    addTransactionPanel.style.display = "none";
    clearInputs();
}


const checkForm = () => {
    if (nameInput.value === '' || amountInput.value === '' || category.value === 'none') {
        alert('Wypełnij wszystkie pola')
    } else {
        createNewTransaction();
    }
}

const clearInputs = () => {
    nameInput.value = '';
    amountInput.value = '';
    category.selectedIndex = 0;
}

const createNewTransaction = () => {
    const newTransaction = document.createElement('div');
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute('id', IdTransaction);
    checkCategory(selectedCategory);
    moneyArr.push(parseFloat(amountInput.value));
    countMoney(moneyArr);





    newTransaction.innerHTML = `<p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
    <p class="transaction-amount">${amountInput.value}zł
    <button class="delete" onclick="deleteTransaction(${IdTransaction})"><i class="fas fa-times"></i></button></p>
</div>`;

    amountInput.value > 0 ? incomeArea.appendChild(newTransaction) && newTransaction.classList.add('income') : expensesArea.appendChild(newTransaction) && newTransaction.classList.add('expense');




    addTransactionCancel();
    IdTransaction++;
};


const checkCategory = transaction => {
    switch (transaction) {
        case '[ + ] Przychód':
            categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
            break;
        case '[ - ] Zakupy':
            categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
            break;
        case '[ - ] Dom':
            categoryIcon = '<i class="fas fa-hamburger"></i>';
            break;
        case '[ - ] Paliwo':
            categoryIcon = '<i class="fas fa-film"></i>';
            break;
    }
};

const selectCategory = () => {
    selectedCategory = category.options[category.selectedIndex].text;
}


const countMoney = money => {
    const newMoney = money.reduce((a, b) => a + b);
    availableMoney.textContent = `${newMoney}zł`
}


const deleteTransaction = IdTransaction => {
    const transactionToDelete = document.getElementById(IdTransaction)
    const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText);

    const indexOfTransaction = moneyArr.indexOf(transactionAmount);
    moneyArr.splice(indexOfTransaction, 1);
    transactionToDelete.classList.contains('income') ? incomeArea.removeChild(transactionToDelete) : expensesArea.removeChild(transactionToDelete);
    countMoney(moneyArr)
}


const deleteAllTransactions = () => {
    incomeArea.innerHTML = '<h3>Przychód:</h3>';
    expensesArea.innerHTML = '<h3>Wydatki:</h3>';
    availableMoney.textContent = '0zł';
    moneyArr = [0];
}

const changeStyleToLight = () => {
    root.style.setProperty('--first-color', '#F9F9F9')
    root.style.setProperty('--second-color', '#14161F')
    root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)')
}
const changeStyleToDark = () => {
    root.style.setProperty('--first-color', '#14161F')
    root.style.setProperty('--second-color', '#F9F9F9')
    root.style.setProperty('--border-color', 'rgba(255, 255, 255, .4)')
}
addBtn.addEventListener('click', addTransactionShow);
cancelBtn.addEventListener('click', addTransactionCancel);
saveBtn.addEventListener('click', checkForm);
deleteAllBtn.addEventListener('click', deleteAllTransactions);
lightStyle.addEventListener('click', changeStyleToLight);
darkStyle.addEventListener('click', changeStyleToDark);