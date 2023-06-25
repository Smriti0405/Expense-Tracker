
var states = {
    current_balance: 0,
    income: 0,
    expense: 0,
    history: [
    ]
}


let balance = document.querySelector('#current_balance'); 
let total_income = document.querySelector('#income');
let total_expense = document.querySelector('#expense');
let transactions_container = document.querySelector('#transaction');
let income_btn = document.querySelector('#income_btn');
let expense_btn = document.querySelector('#expense_btn');
let title = document.querySelector('#title');
let amount = document.querySelector('#amount');


function uid(){
    return Math.round(Math.random()*100000);
}


function manage(){
    let stateStorage = JSON.parse(localStorage.getItem('expenseTracker'));
    if(stateStorage !== null){
        states = stateStorage;
    }
    updateChart(states.income, states.expense);
    newTransactions();
    calculate();
}

function newTransactions(){
    income_btn.addEventListener('click',addIncome);
    expense_btn.addEventListener('click',addExpense);
}

function addIncome(){
    addTransaction(title.value,amount.value,'income');
}
function addExpense(){
    addTransaction(title.value,amount.value,'expense');
}

function deleteEvent(event){
    let val = parseInt(event.target.getAttribute('data-id'));
    let index;

    for(let i=0; i<states.history.length; i++){
        if(states.history[i].id === val){
            index = i;
            break;
        }
    }

    states.history.splice(index,1);
    calculate();
    updateChart(states.income, states.expense);
}

function editEvent(event){
    let val = parseInt(event.target.getAttribute('data-id'));

    for(let i=0; i<states.history.length; i++){
        if(states.history[i].id === val){
            title.value = states.history[i].name;
            amount.value = states.history[i].amount;
            break;
        }
    }
    deleteEvent(event);
}

function addTransaction(name, amt, type){
    if(name === '' || amt === ''){
        alert('Please enter a valid value!')
    }
    else{
        let transaction = {id: uid(),
            name: name, 
            amount: parseInt(amt), 
            type: type}

        states.history.push(transaction);
        title.value = '';
        amount.value = '';
        calculate();
    }
}

function calculate(){
    let balance=0, income=0, expense=0;
    for(let i=0; i<states.history.length; i++){
        if(states.history[i].type == 'income'){
            income += states.history[i].amount;
        }
        else if(states.history[i].type == 'expense'){
            expense += states.history[i].amount;
        }
    }
    balance = income-expense;
    
    states.current_balance = balance;
    states.income = income;
    states.expense = expense;

    localStorage.setItem('expenseTracker', JSON.stringify(states))
    setValues();
}


function setValues(){

    balance.innerHTML = `<span>&#8377;</span> ${states.current_balance}`;
    total_income.innerHTML = `<span>&#8377;</span> ${states.income}`;
    total_expense.innerHTML = `<span>&#8377;</span> ${states.expense}`;  

    let transaction, amount, container, button_delete, button_edit;

    transactions_container.innerHTML = '';
    for(let i=0; i<states.history.length; i++){
        
        transaction = document.createElement('li');
        transaction.append(states.history[i].name);
        container = document.createElement('div');
        amount = document.createElement('span');
        
        if(states.history[i].type == 'income'){
            amount.classList.add('inc_amt')
        }
        else if(states.history[i].type == 'expense'){
            amount.classList.add('exp_amt');
        }

        amount.innerHTML = `<span>&#8377;</span> ${states.history[i].amount}`;
        container.appendChild(amount);
        transaction.appendChild(container);

        button_delete = document.createElement('button');
        button_delete.classList.add('fa-solid', 'fa-trash', 'btn');
        button_edit = document.createElement('button');
        button_edit.classList.add('fa-solid', 'fa-pen-to-square', 'btn');
        
        button_delete.setAttribute('data-id', states.history[i].id);
        button_delete.addEventListener('click', deleteEvent);
        button_edit.setAttribute('data-id', states.history[i].id);
        button_edit.addEventListener('click', editEvent);
        
        container.appendChild(button_delete);
        container.appendChild(button_edit);
        transactions_container.appendChild(transaction);

        updateChart(states.income, states.expense);
    }

}

manage();