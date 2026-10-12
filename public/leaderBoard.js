async function addExpense(e) {
    e.preventDefault();
    const name = document.getElementById('username').value;
    const expenseamount = document.getElementById('expenseamount').value;
    const description = document.getElementById('description').value;

    const obj = { name, expenseamount, description };

    try {
        const res = await fetch('http://localhost:3000/expense/addexpense', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        });
        if(res.ok) {
            const data = await res.json();
            alert(`Added successfully! AI categorized it as: ${data.expense.category}`);
            showLeaderboard();
        }
    } catch(err) { console.log(err); }
}

async function showLeaderboard() {
    try {
        const res = await fetch('http://localhost:3000/premium/showLeaderBoard');
        const data = await res.json();
        const list = document.getElementById('leaderboardList');
        list.innerHTML = '<h3>Leaderboard</h3>';
        data.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Name: ${user.name} --- Total Expense: ${user.totalExpense}`;
            list.appendChild(li);
        });
    } catch(err) { console.log(err); }
}