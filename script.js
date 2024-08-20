//1.Create initiate Reference
let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");

const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");



let tempAmount = 0;


//2.Function to set Budget

totalAmountButton.addEventListener("click", () => {

    tempAmount = totalAmount.value;
 
    
    //empty or negative input
    if(tempAmount == "" || tempAmount < 0 ) {
        errorMessage.classList.remove("hide");
    } else{
        errorMessage.classList.add("hide");
        //Set Budget
        amount.innerHTML = tempAmount;
        //Set balanace
        balanceValue.innerText = tempAmount - expenditureValue.innerText;

        //Clear Input Box
        totalAmount.value = "";
    }
    
});



//3.Function To Disable `Edit` & `Delete` Button

const disablebuttons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach(element => {
        element.disabled = bool;
    });
};


//4.Function to Modify List Elements

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
   
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    //let user = userName.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    
    if(edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disablebuttons(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};


//Function to Create Expenses List

const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sub-content", "flex-space");
    list.appendChild(sublistContent);

    sublistContent.innerHTML = `<p class = "product">${expenseName}</p>
        <p class = "amount">${expenseValue}</p>`;

        let editButton = document.createElement("div");
        editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
        editButton.style.fontSize = "24px";
        editButton.addEventListener("click", () => {
            modifyElement(editButton, true);
        });
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("fa-solid","fa-trash-can","delete");
        deleteButton.style.fontSize ="24px";
        deleteButton.addEventListener("click", () => {
            modifyElement(deleteButton);
        });

        sublistContent.appendChild(editButton);
        sublistContent.appendChild(deleteButton);
        document.getElementById("list").appendChild(sublistContent);
};


//Function To Calculate Expenses & Balance

checkAmountButton.addEventListener("click", ()=>{
    //empty checks
    if(!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }
    //Enable buttons
    disablebuttons(false);

    //Expense
    let expenditure = parseInt(userAmount.value);
   
    //total expense (existing + new)
     let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;

    //Total balance (budget - total expense)

    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;

    //create list
    listCreator(productTitle.value, userAmount.value);
    

    //Empty inputs
    productTitle.value = "";
    userAmount.value = "";
    
});
