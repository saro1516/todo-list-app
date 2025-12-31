const inputtdl = document.querySelector('.textarea');
const buttontdl = document.querySelector('.buttoninput');
const listtdl = document.querySelector('.todolist');


document.addEventListener('DOMContentLoaded', loadTodoLists);


buttontdl.addEventListener('click', clickButton);
listtdl.addEventListener('click', okdel);


function clickButton(e) {
    e.preventDefault();
    addTodo();
}


function addTodo() {
    if (inputtdl.value === '') return;

    const todo = {
        text: inputtdl.value,
        id: Date.now()
    };

    createTodoElement(todo);
    saveTodoList(todo);

    inputtdl.value = '';
}


function createTodoElement(todo) {
    const itemall = document.createElement('div');
    itemall.classList.add('itemall');
    itemall.setAttribute('data-id', todo.id);

    const item = document.createElement('p');
    item.classList.add('item');
    item.innerText = todo.text;
    itemall.appendChild(item);

    const checkbutton = document.createElement("button");
    checkbutton.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkbutton.classList.add("check-button");
    itemall.appendChild(checkbutton);

    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashbutton.classList.add("trash-button");
    itemall.appendChild(trashbutton);

    listtdl.appendChild(itemall);
}

e
function saveTodoList(todo) {
    const todos = getTodosFromStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


function loadTodoLists() {
    const todos = getTodosFromStorage();
    todos.forEach(todo => {
        createTodoElement(todo);
    });
}


function getTodosFromStorage() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

function okdel(e) {
    const item = e.target;

    if (item.classList[0] === 'check-button') {
        const todolist = item.parentElement;
        todolist.classList.toggle('checklist');
    }

    if (item.classList[0] === 'trash-button') {
        const todolist = item.parentElement;
        const todoId = todolist.getAttribute('data-id');
        todolist.remove();
        removeTodoFromStorage(todoId);
    }
}


function removeTodoFromStorage(todoId) {
    const todos = getTodosFromStorage();
    const updatedTodos = todos.filter(todo => todo.id != todoId);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}