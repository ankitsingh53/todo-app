const inputBox = document.getElementById("inputBox");
const addbtn = document.getElementById("addbtn");
const todolist = document.getElementById("todolist");

let editTodo = null;

// --------Add to do----------

const addTodo = () => {
  console.log(inputBox.value);

  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) alert("You must write something in your to do");
  else if (addbtn.value === "Edit") {
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addbtn.value = "Add";
    inputBox.value = "";
    console.log(editTodo.target);
  } else {
    const li = document.createElement("li");
    const para = document.createElement("p");
    para.innerText = inputText;
    li.appendChild(para);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    li.appendChild(deleteBtn);

    // adding time

    const now = new Date();
    const time = now.toLocaleTimeString();

    const span = document.createElement("span");
    span.innerHTML = `  ${time}`;
    li.appendChild(span);

    todolist.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
  }
};

// ---Update Todo to edit and remove------------

const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todolist.removeChild(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;

    inputBox.focus();
    addbtn.value = "Edit";
    editTodo = e;
  }
};

const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));

    todos.forEach((todo) => {

      const li = document.createElement("li");
      const para = document.createElement("p");
      para.innerText = todo ;
      li.appendChild(para);

      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      li.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";
      li.appendChild(deleteBtn);

      // adding time

      const now = new Date();
      const time = now.toLocaleTimeString();

      const span = document.createElement("span");
      span.innerHTML = `  ${time}`;
      li.appendChild(span);

      todolist.appendChild(li);

    });
}
};


document.addEventListener('DOMContentLoaded', getLocalTodos)
addbtn.addEventListener("click", addTodo);
todolist.addEventListener("click", updateTodo);
