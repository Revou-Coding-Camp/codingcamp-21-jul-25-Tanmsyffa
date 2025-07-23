let todos = [];
let showCompleted = false;

const todoInput = document.getElementById('todoInput');
const dueDateInput = document.getElementById('dueDateInput');
const addTodoButton = document.getElementById('addTodoButton');
const buttonFilter = document.getElementById('buttonFilter');
const deleteAllButton = document.querySelector('.delete-all');
const tbody = document.querySelector('.todo-table tbody');

function renderTodos() {
    tbody.innerHTML = '';
    let filtered = todos;
    if (showCompleted) {
        filtered = todos.filter(todo => todo.completed);
    }
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td class="no-task" colspan="4">No task found</td></tr>`;
        return;
    }
    filtered.forEach((todo, idx) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${todo.text}</td>
            <td>${todo.dueDate || '-'}</td>
            <td>
                <input type="checkbox" ${todo.completed ? 'checked' : ''} data-idx="${idx}">
                ${todo.completed ? '<span style="color:#6d7cff;font-weight:600;">Done</span>' : '<span style="color:#bfc8e6;">Pending</span>'}
            </td>
            <td>
                <button class="delete-btn" data-idx="${idx}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

addTodoButton.onclick = () => {
    const text = todoInput.value.trim();
    const dueDate = dueDateInput.value;
    if (!text) return;
    todos.push({ text, dueDate, completed: false });
    todoInput.value = '';
    dueDateInput.value = '';
    renderTodos();
};

tbody.onclick = (e) => {
    if (e.target.type === 'checkbox') {
        const idx = e.target.getAttribute('data-idx');
        todos[idx].completed = e.target.checked;
        renderTodos();
    }
    if (e.target.classList.contains('delete-btn')) {
        const idx = e.target.getAttribute('data-idx');
        todos.splice(idx, 1);
        renderTodos();
    }
};

buttonFilter.onclick = () => {
    showCompleted = !showCompleted;
    buttonFilter.textContent = showCompleted ? 'SHOW ALL' : 'FILTER';
    renderTodos();
};

deleteAllButton.onclick = () => {
    todos = [];
    renderTodos();
};

renderTodos();