
let totalIncome = 0;
let totalExpenses = 0;
let monthlyBudget = 0;
let transactions = [];

function saveData() {
    localStorage.setItem("budgetData", JSON.stringify({
        totalIncome,
        totalExpenses,
        monthlyBudget,
        transactions
    }));
}

function loadData() {
    const saved = localStorage.getItem("budgetData");

    if (saved) {
        try {
            const data = JSON.parse(saved);
            totalIncome = data.totalIncome || 0;
            totalExpenses = data.totalExpenses || 0;
            monthlyBudget = data.monthlyBudget || 0;
            transactions = data.transactions || [];
        } catch {
            localStorage.removeItem("budgetData");
        }
    }
}

function updateDisplay() {
    let balance = monthlyBudget - totalExpenses;

    document.getElementById("totalBudget").innerText =
        "₹" + monthlyBudget.toFixed(2);

    document.getElementById("expenses").innerText =
        "₹" + totalExpenses.toFixed(2);

    document.getElementById("balance").innerText =
        "₹" + balance.toFixed(2);

    document.getElementById("budgetMessage").innerText =
        "Remaining Budget: ₹" + balance.toFixed(2);

    const history = document.getElementById("history");
    history.innerHTML = "";

    transactions.forEach(function(t) {
        const item = document.createElement("li");
        item.innerText =
            t.description + " - ₹" + t.amount + " (" + t.type + ")";
        history.appendChild(item);
    });
}

function setBudget() {
    const value = Number(document.getElementById("budget").value);

    if (!Number.isFinite(value) || value <= 0) {
        alert("Enter a valid budget!");
        return;
    }

    monthlyBudget = value;
    saveData();
    updateDisplay();

    document.getElementById("budget").value = "";
}

function addTransaction() {
    const description =
        document.getElementById("description").value.trim();

    const amount =
        Number(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;

    if (!description || !Number.isFinite(amount) || amount <= 0) {
        alert("Enter a valid description and amount!");
        return;
    }

    if (type === "income") {
        monthlyBudget += amount;
    } else {
        totalExpenses += amount;
    }

    transactions.unshift({
        description: description,
        amount: amount,
        type: type
    });

    saveData();
    updateDisplay();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

loadData();
updateDisplay();
