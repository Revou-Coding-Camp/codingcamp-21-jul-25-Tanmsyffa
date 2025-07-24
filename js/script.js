let todos = [];
let showCompleted = false;
let editIdx = null;

// Elemen DOM
const todoInput = document.getElementById('todoInput');
const dueDateInput = document.getElementById('dueDateInput');
const addTodoButton = document.getElementById('addTodoButton');
const editTodoButton = document.getElementById('editTodoButton');
const cancelEditButton = document.getElementById('cancelEditButton');
const buttonFilter = document.getElementById('buttonFilter');
const deleteAllButton = document.querySelector('.delete-all');
const tbody = document.querySelector('.todo-table tbody');

// Render daftar todo
function renderTodos() {
    tbody.innerHTML = '';

    const hasData = showCompleted
        ? todos.some(todo => todo.completed)
        : todos.length > 0;

    if (!hasData) {
        tbody.innerHTML = `<tr><td class="no-task" colspan="4">No task found</td></tr>`;
        return;
    }

    todos.forEach((todo, realIdx) => {
        if (showCompleted && !todo.completed) return;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${todo.text}</td>
            <td>${todo.dueDate || '-'}</td>
            <td>
                <input type="checkbox" data-idx="${realIdx}" ${todo.completed ? 'checked' : ''}>
                ${todo.completed
                    ? '<span style="color:#6d7cff;font-weight:600;">Done</span>'
                    : '<span style="color:#bfc8e6;">Pending</span>'}
            </td>
            <td>
                <button class="edit-btn" data-idx="${realIdx}">Edit</button>
                <button class="delete-btn" data-idx="${realIdx}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Tambah todo
addTodoButton.onclick = () => {
    const text = todoInput.value.trim();
    const dueDate = dueDateInput.value;

    if (!text) return;

    todos.push({ text, dueDate, completed: false });

    todoInput.value = '';
    dueDateInput.value = '';

    renderTodos();
};

// Event delegasi untuk tombol edit/delete dan checkbox
tbody.onclick = (e) => {
    const target = e.target;
    const idx = parseInt(target.getAttribute('data-idx'));

    if (target.type === 'checkbox') {
        todos[idx].completed = target.checked;
        renderTodos();
    }

    if (target.classList.contains('delete-btn')) {
        todos.splice(idx, 1);
        renderTodos();
    }

    if (target.classList.contains('edit-btn')) {
        editIdx = idx;
        const todo = todos[editIdx];
        todoInput.value = todo.text;
        dueDateInput.value = todo.dueDate;

        // Tampilkan tombol edit
        addTodoButton.style.display = 'none';
        editTodoButton.style.display = 'inline-block';
        cancelEditButton.style.display = 'inline-block';
    }
};

// Simpan hasil edit
editTodoButton.onclick = () => {
    if (editIdx !== null && todoInput.value.trim()) {
        todos[editIdx].text = todoInput.value.trim();
        todos[editIdx].dueDate = dueDateInput.value;

        clearEditState();
        renderTodos();
    }
};

// Batal edit
cancelEditButton.onclick = () => {
    clearEditState();
};

// Toggle filter selesai
buttonFilter.onclick = () => {
    showCompleted = !showCompleted;
    buttonFilter.textContent = showCompleted ? 'SHOW ALL' : 'FILTER';
    renderTodos();
};

// Hapus semua
deleteAllButton.onclick = () => {
    todos = [];
    renderTodos();
};

// Reset form dan tombol ke keadaan awal
function clearEditState() {
    editIdx = null;
    todoInput.value = '';
    dueDateInput.value = '';
    addTodoButton.style.display = 'inline-block';
    editTodoButton.style.display = 'none';
    cancelEditButton.style.display = 'none';
}

// Inisialisasi tampilan
clearEditState();
renderTodos();
