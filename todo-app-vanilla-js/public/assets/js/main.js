// Local storage UTILS
// assigning name to the storage
const STORAGE_KEY = "todos";

// getTodos from the storage

const getTodos = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// saveTodos to the storage

const saveTodos = (todos) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));

// DOM Selectors
const getDOMElement = (id) => {
  return document.getElementById(id);
};

const form = getDOMElement("todo-form");
const input = getDOMElement("todo-input");
const list = getDOMElement("todo-list");

// render the tasks to the DOM

const renderTodos = () => {
  const todos = getTodos();

  list.innerHTML = "";

  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.className = `todo-item ${todo.completed ? "completed" : ""}`;
    const p = document.createElement("p");
    p.textContent = todo.text;

    p.onclick = () => toggleTodo(todo.id);
    // actions

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "<i class='bx bx-edit'></i>";
    editBtn.onclick = () => editTodo(todo.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='bx bxs-trash' ></i>";
    deleteBtn.onclick = () => deleteTodo(todo.id);

    actions.append(editBtn, deleteBtn);
    div.append(p, actions);

    list.appendChild(div);
  });
};

// CRUD Operations
// addTodo funciton
const addTodo = (text) => {
  const todos = getTodos();
  todos.push({
    id: Date.now(),
    text,
    completed: false,
  });

  saveTodos(todos);
  renderTodos();
};

// toggleTodo function
const toggleTodo = (id) => {
  const todos = getTodos().map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  saveTodos(todos);
  renderTodos();
};
// editTodo function

const editTodo = (id) => {
  const todos = getTodos();
  const todoToEdit = todos.find((todo) => todo.id === id);

  const newText = prompt("Edit your todo:", todoToEdit.text);

  if (!newText) return;

  todoToEdit.text = newText;
  saveTodos(todos);
  renderTodos();
};

// deleteTodo function
const deleteTodo = (id) => {
  const todos = getTodos().filter((todo) => todo.id !== id);
  saveTodos(todos);
  renderTodos();
};

//event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addTodo(text);
  input.value = "";
});

//  initial render - todos
renderTodos();
