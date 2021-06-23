document.addEventListener("DOMContentLoaded", function() {
  const todoForm = document.getElementById('newTodo');
  const todoInput = document.getElementById("newTodoTask");
  const todoList = document.getElementById("todoList");


  // array which stores every todos
  let todos = [];

  // add an eventListener on form, and listen for submit event
  todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value); 
  });

  function addTodo(item) {
    if (item !== '') {
      const todo = {
        id: Date.now(),
        name: item,
        completed: false
      };

      todos.push(todo);
      addToLocalStorage(todos);

      todoInput.value = '';
    }
  }

  function renderTodos(todos) {
    todoList.innerHTML = '';

    todos.forEach(function(item) {
      const li = document.createElement('li');
      li.setAttribute('data-key', item.id);
      console.log(li)
      li.style.textDecoration = item.completed ? "line-through orangered": "";

      li.innerHTML = `
        ${item.name}
        <button class="delete-button">X</button>
      `;

      todoList.append(li);
    });

  }

  function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));

    renderTodos(todos);
  }

  function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
      todos = JSON.parse(reference);
      renderTodos(todos);
    }
  }

  function toggle(id) {
    todos.forEach(function(item) {
      if (item.id == id) {
        item.completed = !item.completed;
        // console.log(item)
        const currentLi = document.querySelector(`[data-key="${id}"]`)
        // console.log(currentLi)
        currentLi.style.textDecoration = item.completed ? "line-through orangered": "";
        }
    });

    addToLocalStorage(todos);
  }

  function deleteTodo(id) {
    todos = todos.filter(function(item) {
          return item.id != id;
    });

    addToLocalStorage(todos);
  }

  getFromLocalStorage();


  todoList.addEventListener("click", function(event) {
    const targetTagToLowerCase = event.target.tagName.toLowerCase();
    if (targetTagToLowerCase === "li") {
      toggle(event.target.getAttribute('data-key'));
    } else if (targetTagToLowerCase === "button") {
      deleteTodo(event.target.parentElement.getAttribute('data-key'));
      event.target.parentNode.remove();
    }
  });
});